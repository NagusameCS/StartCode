// Test Page - Timed assessments for certificates
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiClock,
    FiAlertCircle,
    FiCheck,
    FiX,
    FiChevronLeft,
    FiChevronRight,
    FiFlag
} from 'react-icons/fi';
import { getCourse } from '../data/courses';
import { useProgressStore } from '../store/progressStore';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import styles from './TestPage.module.css';

const TestPage = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { addCertificate, logActivity } = useProgressStore();

    const course = getCourse(courseId);

    const [testState, setTestState] = useState('intro'); // intro, active, finished
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
    const [score, setScore] = useState(null);

    const timerRef = useRef(null);

    // Generate test questions based on course
    const [questions] = useState(() => generateQuestions(courseId));

    // Timer countdown
    useEffect(() => {
        if (testState === 'active' && timeRemaining > 0) {
            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        handleSubmit();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timerRef.current);
        }
    }, [testState, timeRemaining]);

    // Prevent copy/paste
    useEffect(() => {
        if (testState === 'active') {
            const preventCopyPaste = (e) => {
                e.preventDefault();
                toast.error('Copy/Paste is disabled during tests');
            };

            document.addEventListener('copy', preventCopyPaste);
            document.addEventListener('paste', preventCopyPaste);
            document.addEventListener('cut', preventCopyPaste);

            // Prevent context menu
            const preventContext = (e) => e.preventDefault();
            document.addEventListener('contextmenu', preventContext);

            // Warn on visibility change
            const handleVisibility = () => {
                if (document.hidden) {
                    toast.error('Warning: Leaving the test may be recorded');
                }
            };
            document.addEventListener('visibilitychange', handleVisibility);

            return () => {
                document.removeEventListener('copy', preventCopyPaste);
                document.removeEventListener('paste', preventCopyPaste);
                document.removeEventListener('cut', preventCopyPaste);
                document.removeEventListener('contextmenu', preventContext);
                document.removeEventListener('visibilitychange', handleVisibility);
            };
        }
    }, [testState]);

    // Start test
    const handleStartTest = () => {
        setTestState('active');
        setTimeRemaining(questions.length * 60); // 1 minute per question
        setCurrentQuestion(0);
        setAnswers({});
    };

    // Select answer
    const handleSelectAnswer = (questionIndex, answerIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    // Toggle flagged
    const toggleFlagged = (index) => {
        setFlaggedQuestions(prev => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    // Navigate questions
    const goToQuestion = (index) => {
        if (index >= 0 && index < questions.length) {
            setCurrentQuestion(index);
        }
    };

    // Submit test
    const handleSubmit = useCallback(async () => {
        clearInterval(timerRef.current);

        // Calculate score
        let correct = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correctAnswer) {
                correct++;
            }
        });

        const finalScore = Math.round((correct / questions.length) * 100);
        setScore(finalScore);
        setTestState('finished');

        // Award certificate if passed (70%+)
        if (finalScore >= 70 && user) {
            await addCertificate({
                courseId,
                courseName: course?.title || courseId,
                score: finalScore
            });
            logActivity('certificate');
        }
    }, [answers, questions, courseId, course, user, addCertificate, logActivity]);

    // Format time
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    if (!course) {
        return (
            <div className={styles.error}>
                <FiAlertCircle />
                <h2>Course not found</h2>
                <button className="btn btn-primary" onClick={() => navigate('/courses')}>
                    Back to Courses
                </button>
            </div>
        );
    }

    return (
        <div className={styles.test}>
            <AnimatePresence mode="wait">
                {/* Intro Screen */}
                {testState === 'intro' && (
                    <motion.div
                        key="intro"
                        className={styles.intro}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div
                            className={styles.courseIcon}
                            style={{ backgroundColor: course.color }}
                        >
                            {course.icon}
                        </div>
                        <h1>{course.title} Certification Test</h1>
                        <p className={styles.description}>
                            Complete this test to earn your {course.title} certificate.
                        </p>

                        <div className={styles.rules}>
                            <h3>Test Rules</h3>
                            <ul>
                                <li>
                                    <FiClock /> You have {questions.length} minutes ({questions.length} questions)
                                </li>
                                <li>
                                    <FiX /> Copy and paste are disabled
                                </li>
                                <li>
                                    <FiAlertCircle /> Leaving the test will be recorded
                                </li>
                                <li>
                                    <FiCheck /> You need 70% to pass and receive a certificate
                                </li>
                            </ul>
                        </div>

                        <div className={styles.introActions}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate(`/courses/${courseId}`)}
                            >
                                Go Back
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleStartTest}
                            >
                                Start Test
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Active Test */}
                {testState === 'active' && (
                    <motion.div
                        key="active"
                        className={styles.active}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Timer Bar */}
                        <div className={styles.timerBar}>
                            <div
                                className={styles.timerProgress}
                                style={{
                                    width: `${(timeRemaining / (questions.length * 60)) * 100}%`,
                                    backgroundColor: timeRemaining < 60 ? 'var(--color-error)' : 'var(--color-primary)'
                                }}
                            />
                        </div>

                        <div className={styles.testLayout}>
                            {/* Question Navigation */}
                            <aside className={styles.questionNav}>
                                <div className={styles.timer}>
                                    <FiClock />
                                    <span className={timeRemaining < 60 ? styles.urgent : ''}>
                                        {formatTime(timeRemaining)}
                                    </span>
                                </div>

                                <div className={styles.questionGrid}>
                                    {questions.map((_, index) => (
                                        <button
                                            key={index}
                                            className={`
                        ${styles.questionBtn}
                        ${currentQuestion === index ? styles.current : ''}
                        ${answers[index] !== undefined ? styles.answered : ''}
                        ${flaggedQuestions.has(index) ? styles.flagged : ''}
                      `}
                                            onClick={() => goToQuestion(index)}
                                        >
                                            {index + 1}
                                            {flaggedQuestions.has(index) && <FiFlag className={styles.flagIcon} />}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    className={styles.submitBtn}
                                    onClick={() => {
                                        if (confirm('Are you sure you want to submit? You cannot change your answers after.')) {
                                            handleSubmit();
                                        }
                                    }}
                                >
                                    Submit Test
                                </button>
                            </aside>

                            {/* Question Content */}
                            <main className={styles.questionArea}>
                                <div className={styles.questionHeader}>
                                    <span>Question {currentQuestion + 1} of {questions.length}</span>
                                    <button
                                        className={`${styles.flagBtn} ${flaggedQuestions.has(currentQuestion) ? styles.active : ''}`}
                                        onClick={() => toggleFlagged(currentQuestion)}
                                    >
                                        <FiFlag /> {flaggedQuestions.has(currentQuestion) ? 'Flagged' : 'Flag'}
                                    </button>
                                </div>

                                <div className={styles.question}>
                                    <h2>{questions[currentQuestion].question}</h2>

                                    {questions[currentQuestion].code && (
                                        <pre className={styles.codeBlock}>
                                            <code>{questions[currentQuestion].code}</code>
                                        </pre>
                                    )}

                                    <div className={styles.options}>
                                        {questions[currentQuestion].options.map((option, index) => (
                                            <button
                                                key={index}
                                                className={`${styles.option} ${answers[currentQuestion] === index ? styles.selected : ''}`}
                                                onClick={() => handleSelectAnswer(currentQuestion, index)}
                                            >
                                                <span className={styles.optionLetter}>
                                                    {String.fromCharCode(65 + index)}
                                                </span>
                                                <span className={styles.optionText}>{option}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.questionNav}>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => goToQuestion(currentQuestion - 1)}
                                        disabled={currentQuestion === 0}
                                    >
                                        <FiChevronLeft /> Previous
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => goToQuestion(currentQuestion + 1)}
                                        disabled={currentQuestion === questions.length - 1}
                                    >
                                        Next <FiChevronRight />
                                    </button>
                                </div>
                            </main>
                        </div>
                    </motion.div>
                )}

                {/* Results Screen */}
                {testState === 'finished' && (
                    <motion.div
                        key="finished"
                        className={styles.finished}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div
                            className={`${styles.resultIcon} ${score >= 70 ? styles.pass : styles.fail}`}
                        >
                            {score >= 70 ? <FiCheck /> : <FiX />}
                        </div>

                        <h1>{score >= 70 ? 'Congratulations!' : 'Test Complete'}</h1>

                        <div className={styles.scoreDisplay}>
                            <span className={styles.scoreValue}>{score}%</span>
                            <span className={styles.scoreLabel}>
                                {score >= 70 ? 'You passed!' : 'You need 70% to pass'}
                            </span>
                        </div>

                        {score >= 70 && (
                            <p className={styles.certMessage}>
                                Your certificate has been added to your profile!
                            </p>
                        )}

                        <div className={styles.resultActions}>
                            <button
                                className="btn btn-secondary"
                                onClick={() => navigate('/courses')}
                            >
                                Back to Courses
                            </button>
                            {score >= 70 ? (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/profile')}
                                >
                                    View Certificate
                                </button>
                            ) : (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        setTestState('intro');
                                        setAnswers({});
                                        setFlaggedQuestions(new Set());
                                        setScore(null);
                                    }}
                                >
                                    Try Again
                                </button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Generate questions based on course
function generateQuestions(courseId) {
    const questionBanks = {
        python: [
            {
                question: 'What is the output of print(2 ** 3)?',
                options: ['6', '8', '9', '5'],
                correctAnswer: 1
            },
            {
                question: 'Which keyword is used to define a function in Python?',
                options: ['function', 'def', 'fun', 'define'],
                correctAnswer: 1
            },
            {
                question: 'What does the len() function return?',
                options: ['The length of an object', 'The last element', 'The type of object', 'A new list'],
                correctAnswer: 0
            },
            {
                question: 'What will be the output?',
                code: 'x = [1, 2, 3]\nprint(x[-1])',
                options: ['1', '2', '3', 'Error'],
                correctAnswer: 2
            },
            {
                question: 'Which of these is NOT a valid Python data type?',
                options: ['list', 'tuple', 'array', 'dictionary'],
                correctAnswer: 2
            }
        ],
        javascript: [
            {
                question: 'What is the output of typeof null?',
                options: ['"null"', '"undefined"', '"object"', '"number"'],
                correctAnswer: 2
            },
            {
                question: 'Which method adds an element to the end of an array?',
                options: ['push()', 'pop()', 'shift()', 'unshift()'],
                correctAnswer: 0
            },
            {
                question: 'What does === compare?',
                options: ['Value only', 'Type only', 'Value and type', 'Reference'],
                correctAnswer: 2
            },
            {
                question: 'What will be logged?',
                code: 'console.log(1 + "2")',
                options: ['3', '"12"', 'NaN', 'Error'],
                correctAnswer: 1
            },
            {
                question: 'Which is NOT a JavaScript framework/library?',
                options: ['React', 'Vue', 'Angular', 'Django'],
                correctAnswer: 3
            }
        ],
        java: [
            {
                question: 'What is the entry point of a Java program?',
                options: ['start()', 'main()', 'run()', 'init()'],
                correctAnswer: 1
            },
            {
                question: 'Which keyword is used to inherit a class?',
                options: ['inherits', 'extends', 'implements', 'super'],
                correctAnswer: 1
            },
            {
                question: 'What is the default value of an int variable?',
                options: ['null', '0', 'undefined', '1'],
                correctAnswer: 1
            },
            {
                question: 'Which is NOT a primitive type in Java?',
                options: ['int', 'boolean', 'String', 'char'],
                correctAnswer: 2
            },
            {
                question: 'What does JVM stand for?',
                options: ['Java Virtual Machine', 'Java Variable Manager', 'Java Version Module', 'Just Virtual Memory'],
                correctAnswer: 0
            }
        ],
        html: [
            {
                question: 'What does HTML stand for?',
                options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Language', 'Home Tool Markup Language'],
                correctAnswer: 0
            },
            {
                question: 'Which tag is used for the largest heading?',
                options: ['<heading>', '<h6>', '<h1>', '<head>'],
                correctAnswer: 2
            },
            {
                question: 'Which attribute specifies a link destination?',
                options: ['src', 'href', 'link', 'url'],
                correctAnswer: 1
            },
            {
                question: 'Which tag is self-closing?',
                options: ['<div>', '<p>', '<img>', '<a>'],
                correctAnswer: 2
            },
            {
                question: 'What is the correct HTML element for inserting a line break?',
                options: ['<break>', '<lb>', '<br>', '<newline>'],
                correctAnswer: 2
            }
        ],
        css: [
            {
                question: 'What does CSS stand for?',
                options: ['Cascading Style Sheets', 'Creative Style System', 'Computer Style Sheets', 'Colorful Style Sheets'],
                correctAnswer: 0
            },
            {
                question: 'Which property changes text color?',
                options: ['text-color', 'font-color', 'color', 'foreground'],
                correctAnswer: 2
            },
            {
                question: 'Which selector targets an element with id="header"?',
                options: ['.header', '#header', '*header', 'header'],
                correctAnswer: 1
            },
            {
                question: 'What is the default position value?',
                options: ['relative', 'absolute', 'fixed', 'static'],
                correctAnswer: 3
            },
            {
                question: 'Which property creates space inside an element?',
                options: ['margin', 'padding', 'border', 'spacing'],
                correctAnswer: 1
            }
        ]
    };

    // Return questions for the course, or default questions
    return questionBanks[courseId] || questionBanks.python;
}

export default TestPage;
