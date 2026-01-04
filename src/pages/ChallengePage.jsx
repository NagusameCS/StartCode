// Challenge Page - Jupyter-style coding challenge environment
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
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
    FiCpu,
    FiZap,
    FiHelpCircle,
    FiCheckCircle,
    FiAlertCircle,
    FiLock
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import styles from './ChallengePage.module.css';

// Challenge database with test cases
const CHALLENGES = {
    // Beginner Challenges
    'hello-world': {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'beginner',
        category: 'basics',
        description: 'Write a program that prints "Hello, World!" to the console.',
        instructions: `Your task is to write a simple program that outputs the text "Hello, World!" to the console.

This is traditionally the first program written when learning a new programming language.`,
        starterCode: {
            javascript: '// Write your solution here\n\n',
            python: '# Write your solution here\n\n',
            java: '// Write your solution here\npublic class Solution {\n    public static void main(String[] args) {\n        \n    }\n}'
        },
        solution: {
            javascript: 'console.log("Hello, World!");',
            python: 'print("Hello, World!")',
            java: 'public class Solution {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}'
        },
        tests: {
            visible: [
                { input: null, expected: 'Hello, World!', description: 'Should print "Hello, World!"' },
            ],
            hidden: []
        }
    },
    'sum-two-numbers': {
        id: 'sum-two-numbers',
        title: 'Sum Two Numbers',
        difficulty: 'beginner',
        category: 'math',
        description: 'Create a function that takes two numbers and returns their sum.',
        instructions: `Write a function called \`sum\` that:
- Takes two parameters: \`a\` and \`b\`
- Returns the sum of \`a\` and \`b\`

Example:
- sum(2, 3) should return 5
- sum(-1, 1) should return 0`,
        starterCode: {
            javascript: '// Create a function called sum\nfunction sum(a, b) {\n    // Your code here\n}\n',
            python: '# Create a function called sum\ndef sum(a, b):\n    # Your code here\n    pass\n',
            java: 'public class Solution {\n    public static int sum(int a, int b) {\n        // Your code here\n        return 0;\n    }\n}'
        },
        tests: {
            visible: [
                { input: [2, 3], expected: 5, description: 'sum(2, 3) should return 5' },
                { input: [0, 0], expected: 0, description: 'sum(0, 0) should return 0' },
                { input: [-1, 1], expected: 0, description: 'sum(-1, 1) should return 0' },
                { input: [10, -5], expected: 5, description: 'sum(10, -5) should return 5' },
                { input: [100, 200], expected: 300, description: 'sum(100, 200) should return 300' },
                { input: [-10, -20], expected: -30, description: 'sum(-10, -20) should return -30' },
                { input: [1, 1], expected: 2, description: 'sum(1, 1) should return 2' },
                { input: [999, 1], expected: 1000, description: 'sum(999, 1) should return 1000' },
                { input: [50, 50], expected: 100, description: 'sum(50, 50) should return 100' },
                { input: [7, 8], expected: 15, description: 'sum(7, 8) should return 15' },
                { input: [123, 456], expected: 579, description: 'sum(123, 456) should return 579' },
                { input: [-100, 100], expected: 0, description: 'sum(-100, 100) should return 0' },
            ],
            hidden: [
                { input: [1000000, 1000000], expected: 2000000, description: 'Large numbers' },
                { input: [-999, 999], expected: 0, description: 'Negative and positive' },
                { input: [42, 0], expected: 42, description: 'Adding zero' },
                { input: [0, 42], expected: 42, description: 'Zero first' },
                { input: [1, 2], expected: 3, description: 'Simple addition' },
                { input: [5, 5], expected: 10, description: 'Same numbers' },
                { input: [-5, -5], expected: -10, description: 'Two negatives' },
                { input: [11, 22], expected: 33, description: 'Double digits' },
                { input: [111, 222], expected: 333, description: 'Triple digits' },
                { input: [7, 3], expected: 10, description: 'Sum to 10' },
                { input: [25, 75], expected: 100, description: 'Sum to 100' },
                { input: [333, 667], expected: 1000, description: 'Sum to 1000' },
                { input: [1, -1], expected: 0, description: 'Additive inverse' },
                { input: [99, 1], expected: 100, description: 'Edge to 100' },
                { input: [-50, 25], expected: -25, description: 'Mixed signs negative result' },
                { input: [0, -1], expected: -1, description: 'Zero with negative' },
                { input: [15, 15], expected: 30, description: 'Fifteen doubled' },
                { input: [8, 12], expected: 20, description: 'Sum to 20' },
                { input: [1234, 4321], expected: 5555, description: 'Four digit sum' },
                { input: [9, 91], expected: 100, description: 'Nine and ninety-one' },
                { input: [13, 7], expected: 20, description: 'Lucky numbers' },
                { input: [64, 36], expected: 100, description: 'Powers and complements' },
                { input: [101, 99], expected: 200, description: 'Around 100' },
                { input: [500, -250], expected: 250, description: 'Half subtraction' },
            ]
        }
    },
    'fizzbuzz': {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'intermediate',
        category: 'logic',
        description: 'Implement the classic FizzBuzz algorithm.',
        instructions: `Write a function called \`fizzBuzz\` that takes a number \`n\` and returns:
- "FizzBuzz" if the number is divisible by both 3 and 5
- "Fizz" if the number is only divisible by 3
- "Buzz" if the number is only divisible by 5
- The number as a string otherwise

Examples:
- fizzBuzz(15) returns "FizzBuzz"
- fizzBuzz(9) returns "Fizz"
- fizzBuzz(10) returns "Buzz"
- fizzBuzz(7) returns "7"`,
        starterCode: {
            javascript: 'function fizzBuzz(n) {\n    // Your code here\n}\n',
            python: 'def fizz_buzz(n):\n    # Your code here\n    pass\n',
            java: 'public class Solution {\n    public static String fizzBuzz(int n) {\n        // Your code here\n        return "";\n    }\n}'
        },
        tests: {
            visible: [
                { input: [15], expected: 'FizzBuzz', description: 'fizzBuzz(15) should return "FizzBuzz"' },
                { input: [3], expected: 'Fizz', description: 'fizzBuzz(3) should return "Fizz"' },
                { input: [5], expected: 'Buzz', description: 'fizzBuzz(5) should return "Buzz"' },
                { input: [7], expected: '7', description: 'fizzBuzz(7) should return "7"' },
                { input: [30], expected: 'FizzBuzz', description: 'fizzBuzz(30) should return "FizzBuzz"' },
                { input: [9], expected: 'Fizz', description: 'fizzBuzz(9) should return "Fizz"' },
                { input: [10], expected: 'Buzz', description: 'fizzBuzz(10) should return "Buzz"' },
                { input: [1], expected: '1', description: 'fizzBuzz(1) should return "1"' },
                { input: [2], expected: '2', description: 'fizzBuzz(2) should return "2"' },
                { input: [45], expected: 'FizzBuzz', description: 'fizzBuzz(45) should return "FizzBuzz"' },
                { input: [12], expected: 'Fizz', description: 'fizzBuzz(12) should return "Fizz"' },
                { input: [20], expected: 'Buzz', description: 'fizzBuzz(20) should return "Buzz"' },
            ],
            hidden: [
                { input: [60], expected: 'FizzBuzz', description: 'Divisible by 3 and 5' },
                { input: [75], expected: 'FizzBuzz', description: 'Divisible by 3 and 5' },
                { input: [90], expected: 'FizzBuzz', description: 'Divisible by 3 and 5' },
                { input: [6], expected: 'Fizz', description: 'Divisible by 3 only' },
                { input: [18], expected: 'Fizz', description: 'Divisible by 3 only' },
                { input: [21], expected: 'Fizz', description: 'Divisible by 3 only' },
                { input: [24], expected: 'Fizz', description: 'Divisible by 3 only' },
                { input: [25], expected: 'Buzz', description: 'Divisible by 5 only' },
                { input: [35], expected: 'Buzz', description: 'Divisible by 5 only' },
                { input: [40], expected: 'Buzz', description: 'Divisible by 5 only' },
                { input: [50], expected: 'Buzz', description: 'Divisible by 5 only' },
                { input: [4], expected: '4', description: 'Not divisible by 3 or 5' },
                { input: [8], expected: '8', description: 'Not divisible by 3 or 5' },
                { input: [11], expected: '11', description: 'Not divisible by 3 or 5' },
                { input: [13], expected: '13', description: 'Not divisible by 3 or 5' },
                { input: [14], expected: '14', description: 'Not divisible by 3 or 5' },
                { input: [16], expected: '16', description: 'Not divisible by 3 or 5' },
                { input: [17], expected: '17', description: 'Not divisible by 3 or 5' },
                { input: [19], expected: '19', description: 'Not divisible by 3 or 5' },
                { input: [22], expected: '22', description: 'Not divisible by 3 or 5' },
                { input: [23], expected: '23', description: 'Not divisible by 3 or 5' },
                { input: [26], expected: '26', description: 'Not divisible by 3 or 5' },
                { input: [100], expected: 'Buzz', description: 'Large buzz' },
                { input: [99], expected: 'Fizz', description: 'Large fizz' },
            ]
        }
    },
    'palindrome': {
        id: 'palindrome',
        title: 'Palindrome Checker',
        difficulty: 'intermediate',
        category: 'strings',
        description: 'Check if a string is a palindrome.',
        instructions: `Write a function called \`isPalindrome\` that:
- Takes a string as input
- Returns true if the string is a palindrome (reads the same forwards and backwards)
- Returns false otherwise
- Should be case-insensitive and ignore spaces

Examples:
- isPalindrome("racecar") returns true
- isPalindrome("hello") returns false
- isPalindrome("A man a plan a canal Panama") returns true`,
        starterCode: {
            javascript: 'function isPalindrome(str) {\n    // Your code here\n}\n',
            python: 'def is_palindrome(s):\n    # Your code here\n    pass\n',
            java: 'public class Solution {\n    public static boolean isPalindrome(String str) {\n        // Your code here\n        return false;\n    }\n}'
        },
        tests: {
            visible: [
                { input: ['racecar'], expected: true, description: '"racecar" is a palindrome' },
                { input: ['hello'], expected: false, description: '"hello" is not a palindrome' },
                { input: ['A man a plan a canal Panama'], expected: true, description: 'Famous palindrome' },
                { input: ['Was it a car or a cat I saw'], expected: true, description: 'Another famous one' },
                { input: ['not a palindrome'], expected: false, description: 'Not a palindrome' },
                { input: ['level'], expected: true, description: '"level" is a palindrome' },
                { input: ['noon'], expected: true, description: '"noon" is a palindrome' },
                { input: ['Madam'], expected: true, description: 'Case insensitive' },
                { input: ['ab'], expected: false, description: 'Two different chars' },
                { input: ['a'], expected: true, description: 'Single char' },
                { input: ['aa'], expected: true, description: 'Two same chars' },
                { input: ['aba'], expected: true, description: 'Three char palindrome' },
            ],
            hidden: [
                { input: ['civic'], expected: true, description: 'Hidden palindrome' },
                { input: ['kayak'], expected: true, description: 'Hidden palindrome' },
                { input: ['refer'], expected: true, description: 'Hidden palindrome' },
                { input: ['rotor'], expected: true, description: 'Hidden palindrome' },
                { input: ['radar'], expected: true, description: 'Hidden palindrome' },
                { input: ['Never odd or even'], expected: true, description: 'Sentence palindrome' },
                { input: ['Do geese see God'], expected: true, description: 'Sentence palindrome' },
                { input: ['abc'], expected: false, description: 'Not palindrome' },
                { input: ['abcd'], expected: false, description: 'Not palindrome' },
                { input: ['javascript'], expected: false, description: 'Not palindrome' },
                { input: ['python'], expected: false, description: 'Not palindrome' },
                { input: ['abcba'], expected: true, description: 'Five char palindrome' },
                { input: ['abccba'], expected: true, description: 'Even length palindrome' },
                { input: ['abcdcba'], expected: true, description: 'Seven char palindrome' },
                { input: ['Step on no pets'], expected: true, description: 'Sentence' },
                { input: ['Top spot'], expected: true, description: 'Two words' },
                { input: ['Eva can I see bees in a cave'], expected: true, description: 'Long sentence' },
                { input: ['Yo banana boy'], expected: true, description: 'Fun palindrome' },
                { input: ['Almost a palindrome'], expected: false, description: 'Close but no' },
                { input: ['programming'], expected: false, description: 'Regular word' },
                { input: ['deified'], expected: true, description: 'Real word palindrome' },
                { input: ['rotator'], expected: true, description: 'Real word palindrome' },
                { input: ['reviver'], expected: true, description: 'Real word palindrome' },
                { input: ['redder'], expected: true, description: 'Comparative palindrome' },
            ]
        }
    },
    'fibonacci': {
        id: 'fibonacci',
        title: 'Fibonacci Sequence',
        difficulty: 'advanced',
        category: 'algorithms',
        description: 'Generate Fibonacci numbers up to n.',
        instructions: `Write a function called \`fibonacci\` that:
- Takes a number \`n\` as input
- Returns the nth Fibonacci number (0-indexed)
- The sequence starts: 0, 1, 1, 2, 3, 5, 8, 13, 21...

Examples:
- fibonacci(0) returns 0
- fibonacci(1) returns 1
- fibonacci(6) returns 8
- fibonacci(10) returns 55`,
        starterCode: {
            javascript: 'function fibonacci(n) {\n    // Your code here\n}\n',
            python: 'def fibonacci(n):\n    # Your code here\n    pass\n',
            java: 'public class Solution {\n    public static long fibonacci(int n) {\n        // Your code here\n        return 0;\n    }\n}'
        },
        tests: {
            visible: [
                { input: [0], expected: 0, description: 'fibonacci(0) = 0' },
                { input: [1], expected: 1, description: 'fibonacci(1) = 1' },
                { input: [2], expected: 1, description: 'fibonacci(2) = 1' },
                { input: [3], expected: 2, description: 'fibonacci(3) = 2' },
                { input: [4], expected: 3, description: 'fibonacci(4) = 3' },
                { input: [5], expected: 5, description: 'fibonacci(5) = 5' },
                { input: [6], expected: 8, description: 'fibonacci(6) = 8' },
                { input: [7], expected: 13, description: 'fibonacci(7) = 13' },
                { input: [8], expected: 21, description: 'fibonacci(8) = 21' },
                { input: [9], expected: 34, description: 'fibonacci(9) = 34' },
                { input: [10], expected: 55, description: 'fibonacci(10) = 55' },
                { input: [15], expected: 610, description: 'fibonacci(15) = 610' },
            ],
            hidden: [
                { input: [11], expected: 89, description: 'Medium fib' },
                { input: [12], expected: 144, description: 'Medium fib' },
                { input: [13], expected: 233, description: 'Medium fib' },
                { input: [14], expected: 377, description: 'Medium fib' },
                { input: [16], expected: 987, description: 'Medium fib' },
                { input: [17], expected: 1597, description: 'Medium fib' },
                { input: [18], expected: 2584, description: 'Medium fib' },
                { input: [19], expected: 4181, description: 'Medium fib' },
                { input: [20], expected: 6765, description: 'Larger fib' },
                { input: [21], expected: 10946, description: 'Larger fib' },
                { input: [22], expected: 17711, description: 'Larger fib' },
                { input: [23], expected: 28657, description: 'Larger fib' },
                { input: [24], expected: 46368, description: 'Larger fib' },
                { input: [25], expected: 75025, description: 'Larger fib' },
                { input: [26], expected: 121393, description: 'Large fib' },
                { input: [27], expected: 196418, description: 'Large fib' },
                { input: [28], expected: 317811, description: 'Large fib' },
                { input: [29], expected: 514229, description: 'Large fib' },
                { input: [30], expected: 832040, description: 'Very large fib' },
                { input: [31], expected: 1346269, description: 'Very large fib' },
                { input: [32], expected: 2178309, description: 'Very large fib' },
                { input: [33], expected: 3524578, description: 'Very large fib' },
                { input: [34], expected: 5702887, description: 'Very large fib' },
                { input: [35], expected: 9227465, description: 'Very large fib' },
            ]
        }
    }
};

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
        runner: null // Would need pyodide or server
    },
    java: {
        name: 'Java',
        extension: java,
        runner: null // Would need server
    }
};

const ChallengePage = () => {
    const { challengeId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get challenge from URL or use default
    const challenge = CHALLENGES[challengeId] || CHALLENGES['sum-two-numbers'];

    // State
    const [language, setLanguage] = useState(searchParams.get('lang') || 'javascript');
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [testResults, setTestResults] = useState(null);
    const [showHiddenTests, setShowHiddenTests] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerActive, setTimerActive] = useState(true);

    // Initialize code with starter code including challenge as comment
    useEffect(() => {
        const starter = challenge.starterCode[language] || '';
        const commentChar = language === 'python' ? '#' : '//';
        const header = `${commentChar} Challenge: ${challenge.title}\n${commentChar} ${challenge.description}\n${commentChar}\n${commentChar} Instructions:\n${challenge.instructions.split('\n').map(l => `${commentChar} ${l}`).join('\n')}\n\n`;
        setCode(header + starter);
        setTestResults(null);
        setOutput('');
    }, [challenge, language]);

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

    // Run tests
    const runTests = useCallback(async () => {
        if (language !== 'javascript') {
            toast.error(`${LANGUAGES[language].name} execution requires a server. Try JavaScript for now.`);
            return;
        }

        setIsRunning(true);
        setOutput('Running tests...');

        const allTests = [...challenge.tests.visible, ...challenge.tests.hidden];
        const results = { visible: [], hidden: [], passed: 0, total: allTests.length };

        for (let i = 0; i < allTests.length; i++) {
            const test = allTests[i];
            const isHidden = i >= challenge.tests.visible.length;

            try {
                // Extract function name from code
                const fnMatch = code.match(/function\s+(\w+)/);
                if (!fnMatch) {
                    throw new Error('Could not find function definition');
                }
                const fnName = fnMatch[1];

                const langConfig = LANGUAGES[language];
                const { result, error } = langConfig.runner(code, fnName, test.input || []);

                if (error) {
                    throw new Error(error);
                }

                const passed = JSON.stringify(result) === JSON.stringify(test.expected);
                const testResult = {
                    ...test,
                    actual: result,
                    passed,
                    hidden: isHidden
                };

                if (passed) results.passed++;

                if (isHidden) {
                    results.hidden.push(testResult);
                } else {
                    results.visible.push(testResult);
                }
            } catch (e) {
                const testResult = {
                    ...test,
                    actual: `Error: ${e.message}`,
                    passed: false,
                    error: true,
                    hidden: isHidden
                };

                if (isHidden) {
                    results.hidden.push(testResult);
                } else {
                    results.visible.push(testResult);
                }
            }
        }

        setTestResults(results);
        setOutput(`Tests completed: ${results.passed}/${results.total} passed`);

        if (results.passed === results.total) {
            setTimerActive(false);
            toast.success('🎉 All tests passed! Challenge complete!');
        }

        setIsRunning(false);
    }, [code, challenge, language]);

    // Run code without tests (just execute)
    const runCode = useCallback(() => {
        if (language !== 'javascript') {
            toast.error(`${LANGUAGES[language].name} execution requires a server.`);
            return;
        }

        try {
            let output = '';
            const customConsole = {
                log: (...args) => { output += args.join(' ') + '\n'; }
            };
            const fn = new Function('console', code);
            fn(customConsole);
            setOutput(output || 'Code executed (no output)');
        } catch (e) {
            setOutput(`Error: ${e.message}`);
        }
    }, [code, language]);

    const langExtension = useMemo(() => {
        return LANGUAGES[language]?.extension?.() || [];
    }, [language]);

    return (
        <div className={styles.challenge}>
            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={() => navigate('/dashboard')}>
                    <FiChevronLeft /> Back
                </button>
                <div className={styles.titleSection}>
                    <h1>{challenge.title}</h1>
                    <div className={styles.badges}>
                        <span className={`${styles.difficulty} ${styles[challenge.difficulty]}`}>
                            {challenge.difficulty}
                        </span>
                        <span className={styles.category}>{challenge.category}</span>
                    </div>
                </div>
                <div className={styles.timer}>
                    <FiClock />
                    <span>{formatTime(timer)}</span>
                </div>
            </div>

            <div className={styles.content}>
                {/* Left Panel - Instructions */}
                <div className={styles.instructions}>
                    <div className={styles.instructionsHeader}>
                        <h2>Instructions</h2>
                        <button
                            className={styles.hintBtn}
                            onClick={() => setShowHint(!showHint)}
                        >
                            <FiHelpCircle />
                            {showHint ? 'Hide Hint' : 'Show Hint'}
                        </button>
                    </div>
                    <div className={styles.instructionsContent}>
                        <p className={styles.description}>{challenge.description}</p>
                        <pre className={styles.instructionsText}>{challenge.instructions}</pre>

                        <AnimatePresence>
                            {showHint && challenge.solution && (
                                <motion.div
                                    className={styles.hint}
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    <h4>💡 Solution Hint</h4>
                                    <pre>{challenge.solution[language]}</pre>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Panel - Editor & Tests */}
                <div className={styles.workspace}>
                    {/* Language Selector */}
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
                            <button onClick={runCode} className={styles.runBtn}>
                                <FiPlay /> Run
                            </button>
                            <button
                                onClick={runTests}
                                className={styles.submitBtn}
                                disabled={isRunning}
                            >
                                <FiCheckCircle />
                                {isRunning ? 'Testing...' : 'Submit'}
                            </button>
                        </div>
                    </div>

                    {/* Editor */}
                    <div className={styles.editorContainer}>
                        <CodeMirror
                            value={code}
                            onChange={setCode}
                            height="100%"
                            className={styles.editor}
                            extensions={[langExtension]}
                            theme="dark"
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightActiveLine: true,
                                foldGutter: true,
                            }}
                        />
                    </div>

                    {/* Output & Tests */}
                    <div className={styles.resultsPanel}>
                        {/* Output */}
                        <div className={styles.outputSection}>
                            <div className={styles.sectionHeader}>
                                <FiTerminal />
                                <span>Output</span>
                            </div>
                            <pre className={styles.outputContent}>{output || 'Run your code to see output...'}</pre>
                        </div>

                        {/* Test Results */}
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
                                    <button
                                        className={styles.toggleHidden}
                                        onClick={() => setShowHiddenTests(!showHiddenTests)}
                                    >
                                        {showHiddenTests ? <FiEyeOff /> : <FiEye />}
                                        {showHiddenTests ? 'Hide' : 'Show'} Hidden Tests
                                    </button>
                                </div>

                                <div className={styles.testsList}>
                                    {/* Visible Tests */}
                                    <div className={styles.testGroup}>
                                        <h4>Visible Tests ({testResults.visible.filter(t => t.passed).length}/{testResults.visible.length})</h4>
                                        {testResults.visible.map((test, i) => (
                                            <div key={i} className={`${styles.testCase} ${test.passed ? styles.passed : styles.failed}`}>
                                                <div className={styles.testIcon}>
                                                    {test.passed ? <FiCheck /> : <FiX />}
                                                </div>
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

                                    {/* Hidden Tests */}
                                    <div className={styles.testGroup}>
                                        <h4>
                                            <FiLock />
                                            Hidden Tests ({testResults.hidden.filter(t => t.passed).length}/{testResults.hidden.length})
                                        </h4>
                                        {showHiddenTests ? (
                                            testResults.hidden.map((test, i) => (
                                                <div key={i} className={`${styles.testCase} ${test.passed ? styles.passed : styles.failed}`}>
                                                    <div className={styles.testIcon}>
                                                        {test.passed ? <FiCheck /> : <FiX />}
                                                    </div>
                                                    <div className={styles.testInfo}>
                                                        <span className={styles.testDesc}>Hidden Test #{i + 1}</span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className={styles.hiddenPlaceholder}>
                                                <FiLock />
                                                <span>24 hidden test cases</span>
                                            </div>
                                        )}
                                    </div>
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
