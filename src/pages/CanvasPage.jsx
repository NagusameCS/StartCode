// Canvas Page - Interactive Natural Language Code Editor
// Users can write and execute natural language code freely

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
    FiPlay,
    FiTrash2,
    FiSave,
    FiCopy,
    FiInfo,
    FiCode,
    FiBook,
    FiChevronDown,
    FiChevronUp
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { executeCode } from '../engine/executor';
import { createTranspiler, STAGES } from '../engine/transpiler';
import styles from './CanvasPage.module.css';

// Example code snippets for quick start
const EXAMPLES = {
    hello: {
        name: 'Hello World',
        code: `display "Hello, World!"`
    },
    variables: {
        name: 'Variables',
        code: `create variable name to "Alice"
create variable age to 25
display "Name: " plus name
display "Age: " plus age`
    },
    math: {
        name: 'Math Operations',
        code: `create variable a to 10
create variable b to 5
display "Addition: " plus a plus b
display "Product: " plus a times b`
    },
    conditions: {
        name: 'If Statements',
        code: `create variable score to 85

if score is greater than or equal to 90 then
    display "Grade: A"
otherwise if score is greater than or equal to 80 then
    display "Grade: B"
otherwise if score is greater than or equal to 70 then
    display "Grade: C"
otherwise
    display "Grade: F"
end if`
    },
    loops: {
        name: 'Loops',
        code: `display "Counting to 5:"
repeat 5 times
    display "Count!"
end loop

display "---"
display "While loop:"
create variable i to 1
repeat while i is less than or equal to 3 do
    display "Number: " plus i
    set i to i plus 1
end repeat`
    },
    lists: {
        name: 'Lists',
        code: `create variable colors to create list with "red", "green", "blue" end list

display "My favorite colors:"
for each color in list colors do
    display color
end loop`
    },
    functions: {
        name: 'Functions',
        code: `define function greet with parameters name
    display "Hello, " plus name plus "!"
end function

greet "Alice"
greet "Bob"
greet "Charlie"`
    },
    countdown: {
        name: 'Countdown',
        code: `create variable count to 5

repeat while count is greater than 0 do
    display count
    set count to count minus 1
end repeat

display "Blast off! 🚀"`
    }
};

// Syntax reference content
const SYNTAX_REFERENCE = [
    {
        category: 'Output',
        items: [
            { syntax: 'display "text"', description: 'Show text on screen' },
            { syntax: 'display variable', description: 'Show variable value' },
            { syntax: 'display a plus b', description: 'Show combined values' }
        ]
    },
    {
        category: 'Variables',
        items: [
            { syntax: 'create variable x to 10', description: 'Create a variable' },
            { syntax: 'set x to 20', description: 'Change a variable' },
            { syntax: 'create constant PI to 3.14', description: 'Create unchangeable value' }
        ]
    },
    {
        category: 'Math',
        items: [
            { syntax: 'a plus b', description: 'Addition' },
            { syntax: 'a minus b', description: 'Subtraction' },
            { syntax: 'a times b', description: 'Multiplication' },
            { syntax: 'a divided by b', description: 'Division' },
            { syntax: 'a modulo b', description: 'Remainder' }
        ]
    },
    {
        category: 'Comparisons',
        items: [
            { syntax: 'a is equal to b', description: 'Equals (==)' },
            { syntax: 'a is not equal to b', description: 'Not equals (!=)' },
            { syntax: 'a is greater than b', description: 'Greater than (>)' },
            { syntax: 'a is less than b', description: 'Less than (<)' },
            { syntax: 'a is greater than or equal to b', description: 'Greater/equal (>=)' },
            { syntax: 'a is less than or equal to b', description: 'Less/equal (<=)' }
        ]
    },
    {
        category: 'Conditions',
        items: [
            { syntax: 'if condition then\\n    ...\\nend if', description: 'Basic if' },
            { syntax: 'if condition then\\n    ...\\notherwise\\n    ...\\nend if', description: 'If/else' },
            { syntax: 'condition and condition', description: 'Both must be true' },
            { syntax: 'condition or condition', description: 'At least one true' }
        ]
    },
    {
        category: 'Loops',
        items: [
            { syntax: 'repeat N times\\n    ...\\nend loop', description: 'Repeat N times' },
            { syntax: 'repeat while condition do\\n    ...\\nend repeat', description: 'While loop' },
            { syntax: 'for each item in list items do\\n    ...\\nend loop', description: 'For each loop' }
        ]
    },
    {
        category: 'Lists',
        items: [
            { syntax: 'create list with "a", "b", "c" end list', description: 'Create a list' },
            { syntax: 'get item 0 from list end get', description: 'Get item by index' }
        ]
    },
    {
        category: 'Functions',
        items: [
            { syntax: 'define function name with no parameters\\n    ...\\nend function', description: 'Simple function' },
            { syntax: 'define function name with parameters a, b\\n    ...\\nend function', description: 'Function with params' },
            { syntax: 'return value', description: 'Return a value' }
        ]
    },
    {
        category: 'Boolean Values',
        items: [
            { syntax: 'true value', description: 'True' },
            { syntax: 'false value', description: 'False' }
        ]
    }
];

const CanvasPage = () => {
    const [code, setCode] = useState(EXAMPLES.hello.code);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [showReference, setShowReference] = useState(false);
    const [showTranspiled, setShowTranspiled] = useState(false);
    const [transpiledCode, setTranspiledCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    // Create transpiler for showing real code
    const transpiler = createTranspiler(selectedLanguage, STAGES.NATURAL);

    // Run the natural language code
    const handleRun = useCallback(async () => {
        if (!code.trim()) {
            toast.error('Write some code first!');
            return;
        }

        setIsRunning(true);
        setOutput('');

        try {
            // Execute directly as natural language
            const result = await executeCode(code, null);

            if (result.success) {
                setOutput(result.output || '(No output - try using display)');

                // Also update transpiled code
                if (transpiler) {
                    setTranspiledCode(transpiler.toCode(code));
                }
            } else {
                setOutput(`Error: ${result.error}`);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }

        setIsRunning(false);
    }, [code, transpiler]);

    // Clear code
    const handleClear = () => {
        setCode('');
        setOutput('');
        setTranspiledCode('');
    };

    // Copy code
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied!');
    };

    // Load example
    const loadExample = (key) => {
        setCode(EXAMPLES[key].code);
        setOutput('');
        setTranspiledCode('');
        toast.success(`Loaded: ${EXAMPLES[key].name}`);
    };

    // Update transpiled view when code or language changes
    const handleShowTranspiled = () => {
        if (!showTranspiled && transpiler) {
            setTranspiledCode(transpiler.toCode(code));
        }
        setShowTranspiled(!showTranspiled);
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.title}>
                    <FiCode className={styles.titleIcon} />
                    <h1>Natural Language Canvas</h1>
                </div>
                <p className={styles.subtitle}>
                    Write and run code in natural language - no syntax to memorize!
                </p>
            </div>

            <div className={styles.mainContent}>
                {/* Left Panel - Editor */}
                <div className={styles.editorPanel}>
                    {/* Examples Bar */}
                    <div className={styles.examplesBar}>
                        <span className={styles.examplesLabel}>Examples:</span>
                        <div className={styles.examplesButtons}>
                            {Object.entries(EXAMPLES).map(([key, example]) => (
                                <button
                                    key={key}
                                    className={styles.exampleButton}
                                    onClick={() => loadExample(key)}
                                >
                                    {example.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className={styles.editorWrapper}>
                        <div className={styles.editorHeader}>
                            <span>Natural Language Code</span>
                            <div className={styles.editorActions}>
                                <button
                                    className={styles.iconButton}
                                    onClick={handleCopy}
                                    title="Copy code"
                                >
                                    <FiCopy />
                                </button>
                                <button
                                    className={styles.iconButton}
                                    onClick={handleClear}
                                    title="Clear code"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                        <CodeMirror
                            value={code}
                            onChange={setCode}
                            height="300px"
                            className={styles.editor}
                            placeholder="Write your natural language code here..."
                            basicSetup={{
                                lineNumbers: true,
                                highlightActiveLineGutter: true,
                                highlightActiveLine: true,
                            }}
                        />
                    </div>

                    {/* Run Button */}
                    <motion.button
                        className={styles.runButton}
                        onClick={handleRun}
                        disabled={isRunning}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <FiPlay />
                        {isRunning ? 'Running...' : 'Run Code'}
                    </motion.button>

                    {/* Output */}
                    <div className={styles.outputWrapper}>
                        <div className={styles.outputHeader}>
                            <span>Output</span>
                        </div>
                        <pre className={styles.output}>
                            {output || 'Output will appear here...'}
                        </pre>
                    </div>

                    {/* Transpiled Code Toggle */}
                    <div className={styles.transpiledSection}>
                        <button
                            className={styles.transpiledToggle}
                            onClick={handleShowTranspiled}
                        >
                            <FiCode />
                            See as {selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)} Code
                            {showTranspiled ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {showTranspiled && (
                            <motion.div
                                className={styles.transpiledWrapper}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                            >
                                <div className={styles.languageSelector}>
                                    <label>Language:</label>
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => {
                                            setSelectedLanguage(e.target.value);
                                            const newTranspiler = createTranspiler(e.target.value, STAGES.NATURAL);
                                            if (newTranspiler) {
                                                setTranspiledCode(newTranspiler.toCode(code));
                                            }
                                        }}
                                    >
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                    </select>
                                </div>
                                <pre className={styles.transpiledCode}>
                                    {transpiledCode || 'Transpiled code will appear here...'}
                                </pre>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Right Panel - Reference */}
                <div className={styles.referencePanel}>
                    <button
                        className={styles.referenceToggle}
                        onClick={() => setShowReference(!showReference)}
                    >
                        <FiBook />
                        Syntax Reference
                        {showReference ? <FiChevronUp /> : <FiChevronDown />}
                    </button>

                    {showReference && (
                        <motion.div
                            className={styles.referenceContent}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {SYNTAX_REFERENCE.map((section) => (
                                <div key={section.category} className={styles.referenceSection}>
                                    <h3>{section.category}</h3>
                                    <div className={styles.referenceItems}>
                                        {section.items.map((item, idx) => (
                                            <div key={idx} className={styles.referenceItem}>
                                                <code>{item.syntax}</code>
                                                <span>{item.description}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Quick Tips */}
                    <div className={styles.tips}>
                        <h3><FiInfo /> Quick Tips</h3>
                        <ul>
                            <li>Use <code>display</code> to show output</li>
                            <li>Variables are created with <code>create variable</code></li>
                            <li>Use words like <code>plus</code>, <code>times</code> for math</li>
                            <li>End blocks with <code>end if</code>, <code>end loop</code>, etc.</li>
                            <li>Strings need quotes: <code>"text"</code></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CanvasPage;
