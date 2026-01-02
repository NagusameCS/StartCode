// Lesson Page - Interactive learning with code editor
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft,
    FiArrowRight,
    FiPlay,
    FiCheck,
    FiX,
    FiHelpCircle,
    FiBook,
    FiClock
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { java } from '@codemirror/lang-java';
import { useProgressStore } from '../store/progressStore';
import { getCourse, getLesson, getNextLesson, getLessons } from '../data/courses';
import { createTranspiler, STAGES } from '../engine/transpiler';
import { executeCode } from '../engine/executor';
import styles from './LessonPage.module.css';

const LessonPage = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const { saveCode, getCode, completeLesson, isLessonCompleted, saveCodeToHistory, getCodeHistory, awardCertificate, certificates } = useProgressStore();

    const course = getCourse(courseId);
    const lesson = getLesson(courseId, lessonId);
    const lessons = getLessons(courseId);
    const nextLesson = getNextLesson(courseId, lessonId);
    const currentIndex = lessons.findIndex(l => l.id === lessonId);

    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [exerciseResult, setExerciseResult] = useState(null);
    const [multipleChoiceAnswer, setMultipleChoiceAnswer] = useState(null);
    const [showHistory, setShowHistory] = useState(false);

    // Initialize transpiler
    const transpiler = lesson?.language
        ? createTranspiler(lesson.language, lesson.stage || STAGES.NATURAL)
        : null;

    // Get language extension for CodeMirror
    const getLanguageExtension = () => {
        switch (course?.language) {
            case 'python': return [python()];
            case 'javascript': return [javascript()];
            case 'html': return [html()];
            case 'css': return [css()];
            case 'java': return [java()];
            default: return [];
        }
    };

    // Load saved code
    useEffect(() => {
        const savedCode = getCode(lessonId);
        if (savedCode) {
            setCode(savedCode);
        } else if (lesson?.exercise?.starterCode) {
            setCode(lesson.exercise.starterCode);
        } else {
            setCode('');
        }
        setOutput('');
        setExerciseResult(null);
        setMultipleChoiceAnswer(null);
        setShowHint(false);
    }, [lessonId, lesson, getCode]);

    // Auto-save code
    useEffect(() => {
        if (code) {
            saveCode(lessonId, code);
        }
    }, [code, lessonId, saveCode]);

    // Run code
    const handleRunCode = useCallback(async () => {
        if (!code.trim()) return;

        setIsRunning(true);
        setOutput('');
        setExerciseResult(null);

        try {
            // For pure logic exercises with no language, run natural language interpreter
            if (!course?.language) {
                // Execute the natural language code
                const result = await executeCode(code, null);

                if (result.success) {
                    setOutput(result.output || '(No output)');

                    // Check expected output if specified
                    if (lesson?.exercise?.expectedOutput) {
                        const normalize = (s) => s?.trim().toLowerCase().replace(/\s+/g, ' ') || '';
                        const isCorrect = normalize(result.output) === normalize(lesson.exercise.expectedOutput);
                        setExerciseResult(isCorrect ? 'correct' : 'incorrect');

                        if (isCorrect) {
                            toast.success('Correct! Great job!');
                            saveCodeToHistory(lessonId, code, 'correct');
                        } else {
                            saveCodeToHistory(lessonId, code, 'incorrect');
                        }
                    } else {
                        // No expected output, just show result
                        setExerciseResult('correct');
                        saveCodeToHistory(lessonId, code, 'correct');
                    }
                } else {
                    setOutput(`Error: ${result.error}`);
                    setExerciseResult('incorrect');
                    saveCodeToHistory(lessonId, code, 'error');
                }

                setIsRunning(false);
                return;
            }

            // Get transpiled code (works for any stage)
            let actualCode = code;
            if (transpiler) {
                actualCode = transpiler.toCode(code);
            }

            // Execute the code
            const result = await executeCode(actualCode, course.language);

            if (result.isHTML) {
                // For HTML/CSS, show preview
                setOutput(result.output);
            } else if (result.success) {
                setOutput(result.output || 'Code executed successfully (no output)');
            } else {
                setOutput(`Error: ${result.error}`);
            }

            // Check if exercise is correct based on OUTPUT
            if (lesson?.exercise) {
                const exercise = lesson.exercise;

                if (exercise.expectedOutput && result.success) {
                    // Compare outputs, not code
                    const normalize = (s) => s?.trim().toLowerCase() || '';
                    const isCorrect = normalize(result.output) === normalize(exercise.expectedOutput);
                    setExerciseResult(isCorrect ? 'correct' : 'incorrect');

                    saveCodeToHistory(lessonId, code, isCorrect ? 'correct' : 'incorrect');

                    if (isCorrect) {
                        toast.success('Correct! Great job!');
                    }
                } else if (!result.success) {
                    setExerciseResult('incorrect');
                    saveCodeToHistory(lessonId, code, 'error');
                }
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
            saveCodeToHistory(lessonId, code, 'error');
        } finally {
            setIsRunning(false);
        }
    }, [code, transpiler, course, lesson, lessonId, saveCodeToHistory]);

    // Handle multiple choice answer
    const handleMultipleChoice = (index) => {
        setMultipleChoiceAnswer(index);
        const isCorrect = index === lesson.exercise.answer;
        setExerciseResult(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            toast.success('Correct!');
        } else {
            toast.error('Not quite. Try again!');
        }
    };

    // Complete lesson and go to next
    const handleComplete = async () => {
        await completeLesson(lessonId, courseId);
        toast.success('Lesson completed!');

        if (nextLesson) {
            navigate(`/lesson/${courseId}/${nextLesson.id}`);
        } else {
            // Last lesson - check if all lessons are completed and award certificate
            const allCompleted = lessons.every(l =>
                l.id === lessonId || isLessonCompleted(l.id)
            );

            if (allCompleted) {
                // Check if certificate already awarded for this course
                const hasCertificate = certificates.some(c => c.courseId === courseId);
                if (!hasCertificate) {
                    await awardCertificate(courseId, course.name);
                    toast.success('🏆 Certificate earned! Check your profile!');
                }
            }

            toast.success('🎉 Congratulations! You completed the course!');
            navigate(`/course/${courseId}`);
        }
    };

    // Get hint
    const handleHint = () => {
        setShowHint(!showHint);
    };

    if (!course || !lesson) {
        return (
            <div className={styles.notFound}>
                <h2>Lesson not found</h2>
                <Link to="/courses" className="btn btn-primary">
                    Back to Courses
                </Link>
            </div>
        );
    }

    const isCompleted = isLessonCompleted(lessonId);

    return (
        <div className={styles.lesson}>
            {/* Header */}
            <motion.header
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <Link to={`/course/${courseId}`} className={styles.backLink}>
                    <FiArrowLeft /> {course.name}
                </Link>

                <div className={styles.progress}>
                    <span>{currentIndex + 1} / {lessons.length}</span>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progressFill}
                            style={{
                                width: `${((currentIndex + 1) / lessons.length) * 100}%`,
                                backgroundColor: course.color
                            }}
                        />
                    </div>
                </div>

                <div className={styles.stageBadge}>
                    {/* Stage hidden from users */}
                </div>
            </motion.header>

            {/* Main content */}
            <div className={styles.main}>
                {/* Lesson content panel */}
                <motion.div
                    className={styles.contentPanel}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className={styles.panelHeader}>
                        <h2><FiBook /> Lesson</h2>
                    </div>

                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h1>{lesson.title}</h1>
                        <div
                            className={styles.markdown}
                            dangerouslySetInnerHTML={{
                                __html: lesson.content
                                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
                                    .replace(/`([^`]+)`/g, '<code>$1</code>')
                                    .replace(/## (.*)/g, '<h2>$1</h2>')
                                    .replace(/# (.*)/g, '<h1>$1</h1>')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    .replace(/\n\n/g, '</p><p>')
                                    .replace(/\|(.*)\|/g, (match) => {
                                        const cells = match.split('|').filter(Boolean);
                                        return `<tr>${cells.map(c => `<td>${c.trim()}</td>`).join('')}</tr>`;
                                    })
                            }}
                        />
                    </motion.div>
                </motion.div>

                {/* Exercise panel */}
                <motion.div
                    className={styles.exercisePanel}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className={styles.panelHeader}>
                        <h2>Exercise</h2>
                        <div className={styles.panelActions}>
                            {getCodeHistory(lessonId).length > 0 && (
                                <button
                                    className={`${styles.historyBtn} ${showHistory ? styles.active : ''}`}
                                    onClick={() => setShowHistory(!showHistory)}
                                >
                                    <FiClock /> History ({getCodeHistory(lessonId).length})
                                </button>
                            )}
                            {lesson.exercise?.hint && (
                                <button className={styles.hintBtn} onClick={handleHint}>
                                    <FiHelpCircle /> Hint
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Exercise prompt */}
                    <div className={styles.prompt}>
                        <p>{lesson.exercise?.prompt || 'Try writing some code!'}</p>

                        <AnimatePresence>
                            {showHint && lesson.exercise?.hint && (
                                <motion.div
                                    className={styles.hint}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    💡 {lesson.exercise.hint}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {showHistory && (
                                <motion.div
                                    className={styles.historyPanel}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <h4>Submission History</h4>
                                    <div className={styles.historyList}>
                                        {getCodeHistory(lessonId).map((entry, index) => (
                                            <div
                                                key={index}
                                                className={`${styles.historyEntry} ${styles[entry.result]}`}
                                                onClick={() => {
                                                    setCode(entry.code);
                                                    setShowHistory(false);
                                                    toast.success('Code restored from history');
                                                }}
                                            >
                                                <div className={styles.historyMeta}>
                                                    <span className={`${styles.historyStatus} ${styles[entry.result]}`}>
                                                        {entry.result === 'correct' ? <FiCheck /> : <FiX />}
                                                        {entry.result}
                                                    </span>
                                                    <span className={styles.historyTime}>
                                                        {new Date(entry.timestamp).toLocaleString()}
                                                    </span>
                                                </div>
                                                <pre className={styles.historyCode}>{entry.code.slice(0, 100)}{entry.code.length > 100 ? '...' : ''}</pre>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Multiple choice or code editor */}
                    {lesson.exercise?.type === 'multiple-choice' ? (
                        <div className={styles.multipleChoice}>
                            {lesson.exercise.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`${styles.option} ${multipleChoiceAnswer === index
                                        ? index === lesson.exercise.answer
                                            ? styles.correct
                                            : styles.incorrect
                                        : ''
                                        }`}
                                    onClick={() => handleMultipleChoice(index)}
                                    disabled={exerciseResult === 'correct'}
                                >
                                    <span className={styles.optionLetter}>
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                    <span>{option}</span>
                                    {multipleChoiceAnswer === index && (
                                        index === lesson.exercise.answer ? <FiCheck /> : <FiX />
                                    )}
                                </button>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Code editor */}
                            <div className={styles.editorWrapper}>
                                <CodeMirror
                                    value={code}
                                    height="200px"
                                    theme="dark"
                                    extensions={getLanguageExtension()}
                                    onChange={(value) => setCode(value)}
                                    className={styles.editor}
                                    placeholder="Write your code here..."
                                />
                            </div>

                            {/* Run button */}
                            <div className={styles.actions}>
                                <button
                                    className={`btn btn-primary ${styles.runBtn}`}
                                    onClick={handleRunCode}
                                    disabled={isRunning || !code.trim()}
                                >
                                    {isRunning ? (
                                        <>
                                            <span className={styles.spinner} />
                                            Checking...
                                        </>
                                    ) : (
                                        <>
                                            <FiPlay /> {course?.language ? 'Run Code' : 'Check Answer'}
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Output */}
                            <div className={styles.outputSection}>
                                <h3>Output</h3>
                                <div className={`${styles.output} ${exerciseResult === 'correct' ? styles.correct :
                                    exerciseResult === 'incorrect' ? styles.incorrect : ''
                                    }`}>
                                    {course?.language === 'html' || course?.language === 'css' ? (
                                        <iframe
                                            srcDoc={output}
                                            title="Preview"
                                            className={styles.preview}
                                            sandbox="allow-scripts"
                                        />
                                    ) : (
                                        <pre>{output || 'Run your code to see output'}</pre>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    {/* Result feedback */}
                    <AnimatePresence>
                        {exerciseResult && (
                            <motion.div
                                className={`${styles.result} ${styles[exerciseResult]}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                {exerciseResult === 'correct' ? (
                                    <>
                                        <FiCheck /> Correct! Well done!
                                    </>
                                ) : (
                                    <>
                                        <FiX /> Not quite right. Keep trying!
                                    </>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className={styles.navigation}>
                        {currentIndex > 0 && (
                            <Link
                                to={`/lesson/${courseId}/${lessons[currentIndex - 1].id}`}
                                className={`btn btn-secondary ${styles.navBtn}`}
                            >
                                <FiArrowLeft /> Previous
                            </Link>
                        )}

                        <div className={styles.navSpacer} />

                        {(exerciseResult === 'correct' || isCompleted) && (
                            <button
                                className={`btn btn-success ${styles.navBtn}`}
                                onClick={handleComplete}
                            >
                                {nextLesson ? (
                                    <>Next Lesson <FiArrowRight /></>
                                ) : (
                                    <>Complete Course <FiCheck /></>
                                )}
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default LessonPage;
