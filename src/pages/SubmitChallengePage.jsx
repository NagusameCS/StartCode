// Submit Challenge Page - Create user-submitted challenges
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FiArrowLeft,
    FiPlus,
    FiTrash2,
    FiSave,
    FiPlay,
    FiEye,
    FiCode,
    FiHelpCircle,
    FiSettings,
    FiCheckCircle,
    FiAlertCircle
} from 'react-icons/fi';
import { useAuthStore } from '../store/authStore';
import { useChallengeStore, CHALLENGE_CONSTRAINTS } from '../store/challengeStore';
import { CATEGORIES, DIFFICULTIES } from '../data/challenges';
import styles from './SubmitChallengePage.module.css';

const defaultStarterCode = `function solution() {
    // Write your solution here
    
}`;

const defaultTestCase = {
    input: '',
    expected: '',
    description: ''
};

const SubmitChallengePage = () => {
    const navigate = useNavigate();
    const { user, userProfile } = useAuthStore();
    const { submitChallenge, loading, error } = useChallengeStore();

    // Form state
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('basics');
    const [difficulty, setDifficulty] = useState('beginner');
    const [starterCode, setStarterCode] = useState(defaultStarterCode);
    const [solutionCode, setSolutionCode] = useState('');
    const [testCases, setTestCases] = useState([{ ...defaultTestCase }]);
    const [hints, setHints] = useState(['']);
    const [constraints, setConstraints] = useState({});
    const [showPreview, setShowPreview] = useState(false);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    // Add a test case
    const addTestCase = () => {
        setTestCases([...testCases, { ...defaultTestCase }]);
    };

    // Remove a test case
    const removeTestCase = (index) => {
        if (testCases.length > 1) {
            setTestCases(testCases.filter((_, i) => i !== index));
        }
    };

    // Update a test case
    const updateTestCase = (index, field, value) => {
        const updated = [...testCases];
        updated[index] = { ...updated[index], [field]: value };
        setTestCases(updated);
    };

    // Add a hint
    const addHint = () => {
        setHints([...hints, '']);
    };

    // Remove a hint
    const removeHint = (index) => {
        if (hints.length > 1) {
            setHints(hints.filter((_, i) => i !== index));
        }
    };

    // Update a hint
    const updateHint = (index, value) => {
        const updated = [...hints];
        updated[index] = value;
        setHints(updated);
    };

    // Toggle a constraint
    const toggleConstraint = (constraintId, value) => {
        const constraint = CHALLENGE_CONSTRAINTS[constraintId];
        if (constraint.type === 'boolean') {
            setConstraints(prev => ({
                ...prev,
                [constraintId]: value
            }));
        } else {
            setConstraints(prev => ({
                ...prev,
                [constraintId]: value === '' ? null : value
            }));
        }
    };

    // Validate the challenge
    const validateChallenge = () => {
        const errors = [];

        if (!title.trim()) errors.push('Title is required');
        if (title.length < 3) errors.push('Title must be at least 3 characters');
        if (title.length > 100) errors.push('Title must be less than 100 characters');

        if (!description.trim()) errors.push('Description is required');
        if (description.length < 20) errors.push('Description must be at least 20 characters');

        if (!starterCode.trim()) errors.push('Starter code is required');

        const validTests = testCases.filter(t => t.input.trim() && t.expected.trim());
        if (validTests.length < 1) errors.push('At least one complete test case is required');

        setValidationErrors(errors);
        return errors.length === 0;
    };

    // Test the challenge locally
    const testChallenge = () => {
        if (!solutionCode.trim()) {
            alert('Please provide a solution to test');
            return;
        }

        try {
            // Create a function from solution code
            const solutionFn = new Function('return ' + solutionCode)();

            let passed = 0;
            let failed = 0;
            const results = [];

            testCases.forEach((test, idx) => {
                if (!test.input.trim() || !test.expected.trim()) return;

                try {
                    // Parse input and expected
                    const args = JSON.parse(`[${test.input}]`);
                    const expected = JSON.parse(test.expected);

                    const result = solutionFn(...args);
                    const pass = JSON.stringify(result) === JSON.stringify(expected);

                    if (pass) passed++;
                    else failed++;

                    results.push({
                        test: idx + 1,
                        pass,
                        expected,
                        got: result
                    });
                } catch (e) {
                    failed++;
                    results.push({
                        test: idx + 1,
                        pass: false,
                        error: e.message
                    });
                }
            });

            const summary = results.map(r =>
                r.pass
                    ? `✅ Test ${r.test}: Passed`
                    : `❌ Test ${r.test}: Failed ${r.error ? `(${r.error})` : `- Expected ${JSON.stringify(r.expected)}, got ${JSON.stringify(r.got)}`}`
            ).join('\n');

            alert(`Test Results:\n\n${summary}\n\n${passed} passed, ${failed} failed`);
        } catch (e) {
            alert(`Error running solution: ${e.message}`);
        }
    };

    // Submit the challenge
    const handleSubmit = async () => {
        if (!validateChallenge()) return;

        // Filter out empty hints and invalid test cases
        const validHints = hints.filter(h => h.trim());
        const validTests = testCases
            .filter(t => t.input.trim() && t.expected.trim())
            .map(t => ({
                input: t.input.trim(),
                expected: t.expected.trim(),
                description: t.description.trim()
            }));

        // Filter active constraints
        const activeConstraints = {};
        Object.entries(constraints).forEach(([key, value]) => {
            if (value !== null && value !== false && value !== '') {
                activeConstraints[key] = value;
            }
        });

        const challengeData = {
            title: title.trim(),
            description: description.trim(),
            category,
            difficulty,
            starterCode: starterCode.trim(),
            tests: validTests,
            hints: validHints,
            constraints: activeConstraints,
            points: DIFFICULTIES[difficulty]?.points || 10
        };

        const result = await submitChallenge(
            challengeData,
            user.uid,
            userProfile?.displayName || 'Anonymous'
        );

        if (result.success) {
            setSubmitSuccess(true);
            setTimeout(() => {
                navigate(`/challenges/community`);
            }, 2000);
        }
    };

    if (submitSuccess) {
        return (
            <div className={styles.successPage}>
                <motion.div
                    className={styles.successContent}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                >
                    <FiCheckCircle className={styles.successIcon} />
                    <h1>Challenge Submitted!</h1>
                    <p>Your challenge is now live for others to try.</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate(-1)}>
                    <FiArrowLeft /> Back
                </button>
                <h1>Create a Challenge</h1>
                <div className={styles.headerActions}>
                    <button
                        className={styles.previewBtn}
                        onClick={() => setShowPreview(!showPreview)}
                    >
                        <FiEye /> {showPreview ? 'Edit' : 'Preview'}
                    </button>
                    <button
                        className={styles.submitBtn}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <FiSave /> {loading ? 'Submitting...' : 'Submit Challenge'}
                    </button>
                </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
                <div className={styles.errorBox}>
                    <FiAlertCircle />
                    <div>
                        {validationErrors.map((err, i) => (
                            <p key={i}>{err}</p>
                        ))}
                    </div>
                </div>
            )}

            {error && (
                <div className={styles.errorBox}>
                    <FiAlertCircle />
                    <p>{error}</p>
                </div>
            )}

            <div className={styles.content}>
                {/* Main Form */}
                <div className={styles.mainForm}>
                    {/* Basic Info */}
                    <section className={styles.section}>
                        <h2><FiCode /> Basic Information</h2>

                        <div className={styles.field}>
                            <label>Title *</label>
                            <input
                                type="text"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g., Reverse a String"
                                maxLength={100}
                            />
                            <span className={styles.charCount}>{title.length}/100</span>
                        </div>

                        <div className={styles.field}>
                            <label>Description *</label>
                            <textarea
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Describe the challenge. What should the solution do? Include examples if helpful."
                                rows={4}
                            />
                        </div>

                        <div className={styles.row}>
                            <div className={styles.field}>
                                <label>Category</label>
                                <select value={category} onChange={e => setCategory(e.target.value)}>
                                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                                        <option key={key} value={key}>
                                            {cat.icon} {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.field}>
                                <label>Difficulty</label>
                                <select value={difficulty} onChange={e => setDifficulty(e.target.value)}>
                                    {Object.entries(DIFFICULTIES).map(([key, diff]) => (
                                        <option key={key} value={key}>
                                            {diff.icon} {diff.name} ({diff.points} pts)
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Starter Code */}
                    <section className={styles.section}>
                        <h2><FiCode /> Starter Code</h2>
                        <p className={styles.hint}>
                            This is the code users will start with. Include a function signature.
                        </p>
                        <div className={styles.codeEditor}>
                            <textarea
                                value={starterCode}
                                onChange={e => setStarterCode(e.target.value)}
                                className={styles.codeArea}
                                spellCheck={false}
                                placeholder="function solution(input) {&#10;    // Your code here&#10;}"
                            />
                        </div>
                    </section>

                    {/* Test Cases */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2><FiCheckCircle /> Test Cases</h2>
                            <button className={styles.addBtn} onClick={addTestCase}>
                                <FiPlus /> Add Test
                            </button>
                        </div>
                        <p className={styles.hint}>
                            Define inputs and expected outputs. Use JSON format for values.
                        </p>

                        {testCases.map((test, idx) => (
                            <div key={idx} className={styles.testCase}>
                                <div className={styles.testHeader}>
                                    <span>Test #{idx + 1}</span>
                                    {testCases.length > 1 && (
                                        <button
                                            className={styles.removeBtn}
                                            onClick={() => removeTestCase(idx)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    )}
                                </div>

                                <div className={styles.testFields}>
                                    <div className={styles.field}>
                                        <label>Input (comma-separated args)</label>
                                        <input
                                            type="text"
                                            value={test.input}
                                            onChange={e => updateTestCase(idx, 'input', e.target.value)}
                                            placeholder='e.g., "hello", 5 or [1,2,3]'
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label>Expected Output</label>
                                        <input
                                            type="text"
                                            value={test.expected}
                                            onChange={e => updateTestCase(idx, 'expected', e.target.value)}
                                            placeholder='e.g., "olleh" or 15'
                                        />
                                    </div>
                                </div>
                                <div className={styles.field}>
                                    <label>Description (optional)</label>
                                    <input
                                        type="text"
                                        value={test.description}
                                        onChange={e => updateTestCase(idx, 'description', e.target.value)}
                                        placeholder="e.g., Should handle empty strings"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Solution (for testing) */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2><FiCode /> Your Solution (for testing)</h2>
                            <button className={styles.testBtn} onClick={testChallenge}>
                                <FiPlay /> Run Tests
                            </button>
                        </div>
                        <p className={styles.hint}>
                            Write your solution to verify your test cases work correctly. This won't be shared.
                        </p>
                        <div className={styles.codeEditor}>
                            <textarea
                                value={solutionCode}
                                onChange={e => setSolutionCode(e.target.value)}
                                className={styles.codeArea}
                                spellCheck={false}
                                placeholder="function solution(input) {&#10;    // Your working solution&#10;}"
                            />
                        </div>
                    </section>

                    {/* Hints */}
                    <section className={styles.section}>
                        <div className={styles.sectionHeader}>
                            <h2><FiHelpCircle /> Hints (Optional)</h2>
                            <button className={styles.addBtn} onClick={addHint}>
                                <FiPlus /> Add Hint
                            </button>
                        </div>

                        {hints.map((hint, idx) => (
                            <div key={idx} className={styles.hintRow}>
                                <span className={styles.hintNumber}>#{idx + 1}</span>
                                <input
                                    type="text"
                                    value={hint}
                                    onChange={e => updateHint(idx, e.target.value)}
                                    placeholder="Enter a helpful hint..."
                                />
                                {hints.length > 1 && (
                                    <button
                                        className={styles.removeBtn}
                                        onClick={() => removeHint(idx)}
                                    >
                                        <FiTrash2 />
                                    </button>
                                )}
                            </div>
                        ))}
                    </section>
                </div>

                {/* Sidebar - Constraints */}
                <aside className={styles.sidebar}>
                    <section className={styles.section}>
                        <h2><FiSettings /> Constraints</h2>
                        <p className={styles.hint}>
                            Add optional restrictions to make the challenge more interesting.
                        </p>

                        <div className={styles.constraintsList}>
                            {Object.entries(CHALLENGE_CONSTRAINTS).map(([key, constraint]) => (
                                <div key={key} className={styles.constraint}>
                                    <div className={styles.constraintHeader}>
                                        <span className={styles.constraintIcon}>{constraint.icon}</span>
                                        <span className={styles.constraintLabel}>{constraint.label}</span>
                                    </div>
                                    <p className={styles.constraintDesc}>{constraint.description}</p>

                                    {constraint.type === 'boolean' && (
                                        <label className={styles.toggle}>
                                            <input
                                                type="checkbox"
                                                checked={constraints[key] || false}
                                                onChange={e => toggleConstraint(key, e.target.checked)}
                                            />
                                            <span className={styles.toggleSlider}></span>
                                        </label>
                                    )}

                                    {constraint.type === 'number' && (
                                        <input
                                            type="number"
                                            value={constraints[key] || ''}
                                            onChange={e => toggleConstraint(key, e.target.value)}
                                            placeholder="Not set"
                                            className={styles.constraintInput}
                                            min={0}
                                        />
                                    )}

                                    {constraint.type === 'select' && (
                                        <select
                                            value={constraints[key] || ''}
                                            onChange={e => toggleConstraint(key, e.target.value)}
                                            className={styles.constraintSelect}
                                        >
                                            <option value="">Not set</option>
                                            {constraint.options.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Active Constraints Summary */}
                    {Object.keys(constraints).filter(k => constraints[k]).length > 0 && (
                        <section className={styles.section}>
                            <h3>Active Constraints</h3>
                            <div className={styles.activeConstraints}>
                                {Object.entries(constraints)
                                    .filter(([_, v]) => v)
                                    .map(([key, value]) => (
                                        <span key={key} className={styles.activeTag}>
                                            {CHALLENGE_CONSTRAINTS[key].icon}{' '}
                                            {typeof value === 'boolean'
                                                ? CHALLENGE_CONSTRAINTS[key].label
                                                : `${CHALLENGE_CONSTRAINTS[key].label}: ${value}`
                                            }
                                        </span>
                                    ))}
                            </div>
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default SubmitChallengePage;
