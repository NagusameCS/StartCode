// Challenge Page - Jupyter-style coding challenge environment
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlay,
    FiCheck,
    FiX,
    FiChevronLeft,
    FiCode,
    FiTerminal,
    FiEye,
    FiEyeOff,
    FiRefreshCw,
    FiClock,
    FiAward,
    FiHelpCircle,
    FiCheckCircle,
    FiLock,
    FiTrendingUp,
    FiUser,
    FiHeart,
    FiAlertTriangle
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { useProgressStore } from '../store/progressStore';
import { useChallengeStore, CHALLENGE_CONSTRAINTS } from '../store/challengeStore';
import { CATEGORIES, DIFFICULTIES, getChallenge } from '../data/challenges';
import styles from './ChallengePage.module.css';

// Language configurations
const LANGUAGES = {
    javascript: {
        name: 'JavaScript',
        extension: javascript,
        runner: (code, fn, args) => {
            try {
                const func = new Function(`${code}; return ${fn}(${args.map(a => JSON.stringify(a)).join(', ')});`);
                return { result: func(), error: null };
            } catch (e) {
                return { result: null, error: e.message };
            }
        }
    },
    python: {
        name: 'Python',
        extension: python,
        runner: null
    },
    java: {
        name: 'Java',
        extension: java,
        runner: null
    }
};

const ChallengePage = () => {
    const { challengeId, userChallengeId } = useParams();
    const navigate = useNavigate();

    // Progress store
    const {
        completeChallenge,
        isChallengeCompleted,
        getChallengeBestTime
    } = useProgressStore();

    // Challenge store for user-submitted challenges
    const { getUserChallenge, recordPlay, recordCompletion } = useChallengeStore();

    // State for user challenge
    const [userChallenge, setUserChallenge] = useState(null);
    const [loadingUserChallenge, setLoadingUserChallenge] = useState(false);

    // Determine if this is a user challenge
    const isUserChallenge = !!userChallengeId;

    // Load user challenge if needed
    useEffect(() => {
        if (isUserChallenge && userChallengeId) {
            setLoadingUserChallenge(true);
            getUserChallenge(userChallengeId).then(challenge => {
                setUserChallenge(challenge);
                setLoadingUserChallenge(false);
                if (challenge) {
                    recordPlay(userChallengeId);
                }
            });
        }
    }, [isUserChallenge, userChallengeId, getUserChallenge, recordPlay]);

    // Get challenge from data or user challenge
    const challenge = isUserChallenge
        ? userChallenge
        : (getChallenge(challengeId) || getChallenge('hello-world'));

    const isCompleted = challenge ? isChallengeCompleted(challenge.id) : false;
    const bestTime = challenge ? getChallengeBestTime(challenge.id) : null;

    // State
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [showHiddenTests, setShowHiddenTests] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(true);
    const [constraintViolations, setConstraintViolations] = useState([]);

    // Initialize code with starter code
    useEffect(() => {
        if (!challenge) return;

        // For user challenges, starterCode is a string; for built-in, it's an object
        const starter = isUserChallenge
            ? (challenge.starterCode || '')
            : (challenge.starterCode?.[language] || '');

        const commentChar = language === 'python' ? '#' : '//';
        const header = `${commentChar} Challenge: ${challenge.title}\n${commentChar} ${challenge.description}\n\n`;
        setCode(header + starter);
        setTestResults(null);
        setOutput('');
        setTimer(0);
        setTimerActive(true);
        setHintLevel(0);
        setShowHint(false);
        setConstraintViolations([]);
    }, [challenge, language, isUserChallenge]);

    // Timer
    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => setTimer(t => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    // Format timer
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Check constraints
    const checkConstraints = useCallback((codeToCheck) => {
        if (!challenge?.constraints) return [];

        const violations = [];
        const constraints = challenge.constraints;

        // Strip comments for analysis
        const codeWithoutComments = codeToCheck
            .replace(/\/\/.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/#.*$/gm, '');

        // Max line count
        if (constraints.maxLineCount) {
            const lines = codeWithoutComments.split('\n').filter(l => l.trim()).length;
            if (lines > constraints.maxLineCount) {
                violations.push(`Line count: ${lines}/${constraints.maxLineCount} (exceeded)`);
            }
        }

        // Max char count
        if (constraints.maxCharCount) {
            const chars = codeWithoutComments.replace(/\s/g, '').length;
            if (chars > constraints.maxCharCount) {
                violations.push(`Character count: ${chars}/${constraints.maxCharCount} (exceeded)`);
            }
        }

        // No loops
        if (constraints.noLoops) {
            if (/\b(for|while|do)\s*\(/.test(codeWithoutComments)) {
                violations.push('No loops allowed (for, while, do-while detected)');
            }
        }

        // No recursion (basic check - function calls itself)
        if (constraints.noRecursion) {
            const fnMatch = codeWithoutComments.match(/function\s+(\w+)/);
            if (fnMatch) {
                const fnName = fnMatch[1];
                const fnBody = codeWithoutComments.split(fnMatch[0])[1] || '';
                if (new RegExp(`\\b${fnName}\\s*\\(`).test(fnBody)) {
                    violations.push('No recursion allowed (function calls itself)');
                }
            }
        }

        // Must use recursion
        if (constraints.mustUseRecursion) {
            const fnMatch = codeWithoutComments.match(/function\s+(\w+)/);
            if (fnMatch) {
                const fnName = fnMatch[1];
                const fnBody = codeWithoutComments.split(fnMatch[0])[1] || '';
                if (!new RegExp(`\\b${fnName}\\s*\\(`).test(fnBody)) {
                    violations.push('Must use recursion (function must call itself)');
                }
            }
        }

        // No built-ins
        if (constraints.noBuiltIns) {
            const builtIns = ['map', 'filter', 'reduce', 'sort', 'reverse', 'find', 'findIndex', 'some', 'every', 'includes', 'indexOf', 'join', 'split', 'slice', 'splice'];
            for (const method of builtIns) {
                if (new RegExp(`\\.${method}\\s*\\(`).test(codeWithoutComments)) {
                    violations.push(`No built-in methods allowed (.${method} detected)`);
                    break;
                }
            }
        }

        // Single expression
        if (constraints.singleExpression) {
            const fnBody = codeWithoutComments.match(/function[^{]*\{([\s\S]*)\}/);
            if (fnBody) {
                const body = fnBody[1].trim();
                const statements = body.split(';').filter(s => s.trim());
                if (statements.length > 1 || !body.startsWith('return')) {
                    violations.push('Must be a single return expression');
                }
            }
        }

        // No extra variables
        if (constraints.noVariables) {
            if (/\b(const|let|var)\s+/.test(codeWithoutComments)) {
                violations.push('No variable declarations allowed (const, let, var detected)');
            }
        }

        return violations;
    }, [challenge?.constraints]);

    // Run tests
    const runTests = useCallback(async () => {
        if (!challenge) return;

        if (language !== 'javascript') {
            toast.error(`${LANGUAGES[language].name} execution requires a server. Try JavaScript for now.`);
            return;
        }

        setIsRunning(true);
        setOutput('Running tests...');

        // Check constraints first
        const violations = checkConstraints(code);
        setConstraintViolations(violations);

        if (violations.length > 0) {
            setOutput(`Constraint violations:\n${violations.join('\n')}`);
            setIsRunning(false);
            toast.error('Fix constraint violations before running tests');
            return;
        }

        // Get tests - user challenges have a flat array, built-in have visible/hidden
        const allTests = isUserChallenge
            ? (challenge.tests || [])
            : [...(challenge.tests?.visible || []), ...(challenge.tests?.hidden || [])];

        const results = { visible: [], hidden: [], passed: 0, total: allTests.length };

        for (let i = 0; i < allTests.length; i++) {
            const test = allTests[i];
            const isHidden = isUserChallenge ? false : i >= (challenge.tests?.visible?.length || 0);

            try {
                const fnName = challenge.testFunction || code.match(/function\s+(\w+)/)?.[1];
                if (!fnName) {
                    throw new Error('Could not find function definition');
                }

                const langConfig = LANGUAGES[language];

                // For user challenges, parse input string
                let testInput;
                if (isUserChallenge && typeof test.input === 'string') {
                    try {
                        testInput = JSON.parse(`[${test.input}]`);
                    } catch {
                        testInput = [test.input];
                    }
                } else {
                    testInput = test.input || [];
                }

                // Parse expected for user challenges
                let expectedValue;
                if (isUserChallenge && typeof test.expected === 'string') {
                    try {
                        expectedValue = JSON.parse(test.expected);
                    } catch {
                        expectedValue = test.expected;
                    }
                } else {
                    expectedValue = test.expected;
                }

                const { result, error } = langConfig.runner(code, fnName, testInput);

                if (error) {
                    throw new Error(error);
                }

                const passed = JSON.stringify(result) === JSON.stringify(expectedValue);
                const testResult = { ...test, expected: expectedValue, actual: result, passed, hidden: isHidden };

                if (passed) results.passed++;
                if (isHidden) {
                    results.hidden.push(testResult);
                } else {
                    results.visible.push(testResult);
                }
            } catch (e) {
                const testResult = { ...test, actual: `Error: ${e.message}`, passed: false, error: true, hidden: isHidden };
                if (isHidden) {
                    results.hidden.push(testResult);
                } else {
                    results.visible.push(testResult);
                }
            }
        }

        setTestResults(results);
        setOutput(`Tests completed: ${results.passed}/${results.total} passed`);

        if (results.passed === results.total && results.total > 0) {
            setTimerActive(false);

            // Record completion for user challenges
            if (isUserChallenge) {
                await recordCompletion(userChallengeId);
            }

            const isNewCompletion = await completeChallenge(challenge.id, challenge.category, challenge.difficulty, timer);
            const points = DIFFICULTIES[challenge.difficulty]?.points || challenge.points || 10;

            if (isNewCompletion) {
                toast.success(`🎉 Challenge complete! +${points} points!`);
            } else if (bestTime && timer < bestTime) {
                toast.success(`⚡ New best time: ${formatTime(timer)}!`);
            } else {
                toast.success('✅ All tests passed!');
            }
        }

        setIsRunning(false);
    }, [code, challenge, language, timer, completeChallenge, bestTime, isUserChallenge, userChallengeId, recordCompletion, checkConstraints]);

    // Run code without tests
    const runCode = useCallback(() => {
        if (language !== 'javascript') {
            toast.error(`${LANGUAGES[language].name} execution requires a server.`);
            return;
        }

        try {
            let output = '';
            const customConsole = { log: (...args) => { output += args.join(' ') + '\n'; } };
            const fn = new Function('console', code);
            fn(customConsole);
            setOutput(output || 'Code executed (no output)');
        } catch (e) {
            setOutput(`Error: ${e.message}`);
        }
    }, [code, language]);

    // Reset code
    const resetCode = useCallback(() => {
        if (!challenge) return;

        const starter = isUserChallenge
            ? (challenge.starterCode || '')
            : (challenge.starterCode?.[language] || '');
        const commentChar = language === 'python' ? '#' : '//';
        const header = `${commentChar} Challenge: ${challenge.title}\n${commentChar} ${challenge.description}\n\n`;
        setCode(header + starter);
        setTestResults(null);
        setOutput('');
        setConstraintViolations([]);
        toast('Code reset to starter template');
    }, [challenge, language, isUserChallenge]);

    // Get next hint
    const showNextHint = useCallback(() => {
        if (challenge?.hints && hintLevel < challenge.hints.length) {
            setHintLevel(h => h + 1);
            setShowHint(true);
        }
    }, [challenge?.hints, hintLevel]);

    // Loading state
    if (loadingUserChallenge) {
        return (
            <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <span>Loading challenge...</span>
            </div>
        );
    }

    // Not found state
    if (!challenge) {
        return (
            <div className={styles.notFound}>
                <h2>Challenge not found</h2>
                <button onClick={() => navigate('/challenges')}>Back to Challenges</button>
            </div>
        );
    }

    const langExtension = useMemo(() => LANGUAGES[language]?.extension?.() || [], [language]);
    const difficultyConfig = DIFFICULTIES[challenge.difficulty] || DIFFICULTIES.beginner;
    const categoryConfig = CATEGORIES[challenge.category] || CATEGORIES.basics;

    return (
        <div className={styles.challenge}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(isUserChallenge ? '/challenges/community' : '/challenges')}>
                    <FiChevronLeft /> {isUserChallenge ? 'Community' : 'Challenges'}
                </button>
                <div className={styles.titleSection}>
                    <h1>
                        {challenge.title}
                        {isCompleted && <FiCheckCircle className={styles.completedIcon} />}
                    </h1>
                    <div className={styles.badges}>
                        <span className={styles.difficulty} style={{ background: difficultyConfig.color }}>
                            {difficultyConfig.icon} {difficultyConfig.name}
                        </span>
                        <span className={styles.category}>
                            {categoryConfig.icon} {categoryConfig.name}
                        </span>
                        <span className={styles.points}>
                            <FiAward /> {challenge.points || difficultyConfig.points} pts
                        </span>
                        {isUserChallenge && challenge.authorName && (
                            <span className={styles.author}>
                                <FiUser /> {challenge.authorName}
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.headerRight}>
                    {bestTime && (
                        <div className={styles.bestTime}>
                            <FiTrendingUp />
                            <span>Best: {formatTime(bestTime)}</span>
                        </div>
                    )}
                    <div className={styles.timer}>
                        <FiClock />
                        <span>{formatTime(timer)}</span>
                    </div>
                </div>
            </div>

            {/* Constraint Violations Warning */}
            {constraintViolations.length > 0 && (
                <div className={styles.constraintWarning}>
                    <FiAlertTriangle />
                    <div>
                        <strong>Constraint Violations:</strong>
                        <ul>
                            {constraintViolations.map((v, i) => (
                                <li key={i}>{v}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {/* Active Constraints Display */}
            {isUserChallenge && challenge.constraints && Object.keys(challenge.constraints).length > 0 && (
                <div className={styles.constraintsBar}>
                    <span className={styles.constraintsLabel}><FiLock /> Constraints:</span>
                    {Object.entries(challenge.constraints).map(([key, value]) => (
                        <span key={key} className={styles.constraintBadge}>
                            {CHALLENGE_CONSTRAINTS[key]?.icon}{' '}
                            {typeof value === 'boolean'
                                ? CHALLENGE_CONSTRAINTS[key]?.label
                                : `${CHALLENGE_CONSTRAINTS[key]?.label}: ${value}`
                            }
                        </span>
                    ))}
                </div>
            )}

            <div className={styles.content}>
                {/* Left Panel - Instructions */}
                <div className={styles.instructions}>
                    <div className={styles.instructionsHeader}>
                        <h2>Instructions</h2>
                        {challenge.hints && challenge.hints.length > 0 && (
                            <button className={styles.hintBtn} onClick={showNextHint} disabled={hintLevel >= challenge.hints.length}>
                                <FiHelpCircle />
                                {hintLevel >= challenge.hints.length ? 'No more hints' : `Hint ${hintLevel + 1}/${challenge.hints.length}`}
                            </button>
                        )}
                    </div>
                    <div className={styles.instructionsContent}>
                        <p className={styles.description}>{challenge.description}</p>
                        <pre className={styles.instructionsText}>{challenge.instructions}</pre>

                        <AnimatePresence>
                            {showHint && challenge.hints && (
                                <motion.div className={styles.hints} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                    <h4>💡 Hints</h4>
                                    {challenge.hints.slice(0, hintLevel).map((hint, i) => (
                                        <div key={i} className={styles.hintItem}>
                                            <span className={styles.hintNumber}>{i + 1}</span>
                                            <span>{hint}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel - Editor & Tests */}
                <div className={styles.workspace}>
                    <div className={styles.toolbar}>
                        <div className={styles.languageSelect}>
                            <label>Language:</label>
                            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                                {Object.entries(LANGUAGES).map(([key, lang]) => (
                                    <option key={key} value={key}>{lang.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.actions}>
                            <button onClick={resetCode} className={styles.resetBtn} title="Reset code">
                                <FiRefreshCw />
                            </button>
                            <button onClick={runCode} className={styles.runBtn}>
                                <FiPlay /> Run
                            </button>
                            <button onClick={runTests} className={styles.submitBtn} disabled={isRunning}>
                                <FiCheckCircle />
                                {isRunning ? 'Testing...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                    <div className={styles.editorContainer}>
                        <CodeMirror
                            value={code}
                            onChange={setCode}
                            height="100%"
                            className={styles.editor}
                            extensions={[langExtension]}
                            theme="dark"
                            basicSetup={{ lineNumbers: true, highlightActiveLineGutter: true, highlightActiveLine: true, foldGutter: true }}
                        />
                    </div>

                    <div className={styles.resultsPanel}>
                        <div className={styles.outputSection}>
                            <div className={styles.sectionHeader}>
                                <FiTerminal />
                                <span>Output</span>
                            </div>
                            <pre className={styles.outputContent}>{output || 'Run your code to see output...'}</pre>
                        </div>

                        {testResults && (
                            <div className={styles.testsSection}>
                                <div className={styles.testsHeader}>
                                    <div className={styles.testsTitle}>
                                        <FiCode />
                                        <span>Test Results</span>
                                        <span className={`${styles.testScore} ${testResults.passed === testResults.total ? styles.allPassed : ''}`}>
                                            {testResults.passed}/{testResults.total}
                                        </span>
                                    </div>
                                    {testResults.hidden.length > 0 && (
                                        <button className={styles.toggleHidden} onClick={() => setShowHiddenTests(!showHiddenTests)}>
                                            {showHiddenTests ? <FiEyeOff /> : <FiEye />}
                                            {showHiddenTests ? 'Hide' : 'Show'} Hidden
                                        </button>
                                    )}
                                </div>

                                <div className={styles.testsList}>
                                    <div className={styles.testGroup}>
                                        <h4>Visible Tests ({testResults.visible.filter(t => t.passed).length}/{testResults.visible.length})</h4>
                                        {testResults.visible.map((test, i) => (
                                            <div key={i} className={`${styles.testCase} ${test.passed ? styles.passed : styles.failed}`}>
                                                <div className={styles.testIcon}>{test.passed ? <FiCheck /> : <FiX />}</div>
                                                <div className={styles.testInfo}>
                                                    <span className={styles.testDesc}>{test.description}</span>
                                                    {!test.passed && (
                                                        <div className={styles.testDetails}>
                                                            <span>Expected: <code>{JSON.stringify(test.expected)}</code></span>
                                                            <span>Got: <code>{JSON.stringify(test.actual)}</code></span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {testResults.hidden.length > 0 && (
                                        <div className={styles.testGroup}>
                                            <h4><FiLock /> Hidden Tests ({testResults.hidden.filter(t => t.passed).length}/{testResults.hidden.length})</h4>
                                            {showHiddenTests ? (
                                                testResults.hidden.map((test, i) => (
                                                    <div key={i} className={`${styles.testCase} ${test.passed ? styles.passed : styles.failed}`}>
                                                        <div className={styles.testIcon}>{test.passed ? <FiCheck /> : <FiX />}</div>
                                                        <div className={styles.testInfo}>
                                                            <span className={styles.testDesc}>Hidden Test #{i + 1}</span>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className={styles.hiddenPlaceholder}>
                                                    <FiLock />
                                                    <span>{testResults.hidden.length} hidden test cases</span>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChallengePage;
