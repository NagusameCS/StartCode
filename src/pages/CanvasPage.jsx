// Canvas Page - Natural Language Programming Environment
// A professional documentation-style IDE for natural language code

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlay,
    FiTrash2,
    FiCopy,
    FiCode,
    FiBook,
    FiChevronRight,
    FiSearch,
    FiTerminal,
    FiZap,
    FiHash,
    FiType,
    FiList,
    FiRepeat,
    FiGitBranch,
    FiBox,
    FiCheck,
    FiX,
    FiCpu
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { executeCode } from '../engine/executor';
import { createTranspiler, STAGES } from '../engine/transpiler';
import styles from './CanvasPage.module.css';

// Complete Language Documentation (Java-docs style)
const DOCUMENTATION = {
    overview: {
        title: 'Overview',
        icon: FiBook,
        content: `StartCode Natural Language is a beginner-friendly programming language that uses plain English syntax. 
        
It's designed to help beginners understand programming concepts without getting stuck on syntax. The code you write is automatically translated to JavaScript for execution.

**Key Features:**
- Write code in plain English
- No semicolons, brackets, or special characters needed
- Automatic variable typing
- Built-in error messages in plain English`
    },
    output: {
        title: 'Output',
        icon: FiTerminal,
        description: 'Display values to the console',
        syntax: [
            {
                signature: 'display <value>',
                description: 'Outputs a value to the console. Can display strings, numbers, variables, or expressions.',
                examples: [
                    { code: 'display "Hello, World!"', output: 'Hello, World!' },
                    { code: 'display 42', output: '42' },
                    { code: 'display "Sum: " plus 5 plus 3', output: 'Sum: 8' }
                ],
                parameters: [
                    { name: 'value', type: 'any', description: 'The value to display (string, number, variable, or expression)' }
                ]
            }
        ]
    },
    variables: {
        title: 'Variables',
        icon: FiBox,
        description: 'Store and manipulate data',
        syntax: [
            {
                signature: 'create variable <name> to <value>',
                description: 'Creates a new variable with the specified name and initial value. Variables can store strings, numbers, booleans, or lists.',
                examples: [
                    { code: 'create variable age to 25', output: '// Creates variable age = 25' },
                    { code: 'create variable name to "Alice"', output: '// Creates variable name = "Alice"' },
                    { code: 'create variable isStudent to true value', output: '// Creates variable isStudent = true' }
                ],
                parameters: [
                    { name: 'name', type: 'identifier', description: 'The name of the variable (no spaces, start with letter)' },
                    { name: 'value', type: 'any', description: 'The initial value' }
                ]
            },
            {
                signature: 'set <name> to <value>',
                description: 'Updates an existing variable with a new value.',
                examples: [
                    { code: 'set age to 26', output: '// Updates age to 26' },
                    { code: 'set count to count plus 1', output: '// Increments count by 1' }
                ],
                parameters: [
                    { name: 'name', type: 'identifier', description: 'The variable to update' },
                    { name: 'value', type: 'any', description: 'The new value' }
                ]
            },
            {
                signature: 'create constant <name> to <value>',
                description: 'Creates an immutable constant that cannot be changed after creation.',
                examples: [
                    { code: 'create constant PI to 3.14159', output: '// Creates constant PI = 3.14159' },
                    { code: 'create constant MAX_SIZE to 100', output: '// Creates constant MAX_SIZE = 100' }
                ],
                parameters: [
                    { name: 'name', type: 'identifier', description: 'The constant name (conventionally UPPERCASE)' },
                    { name: 'value', type: 'any', description: 'The immutable value' }
                ]
            }
        ]
    },
    operators: {
        title: 'Operators',
        icon: FiHash,
        description: 'Mathematical and logical operations',
        syntax: [
            {
                signature: '<a> plus <b>',
                description: 'Adds two numbers or concatenates strings.',
                examples: [
                    { code: '5 plus 3', output: '8' },
                    { code: '"Hello " plus "World"', output: 'Hello World' }
                ]
            },
            {
                signature: '<a> minus <b>',
                description: 'Subtracts the second number from the first.',
                examples: [
                    { code: '10 minus 4', output: '6' }
                ]
            },
            {
                signature: '<a> times <b>',
                description: 'Multiplies two numbers.',
                examples: [
                    { code: '6 times 7', output: '42' }
                ]
            },
            {
                signature: '<a> divided by <b>',
                description: 'Divides the first number by the second.',
                examples: [
                    { code: '20 divided by 4', output: '5' }
                ]
            },
            {
                signature: '<a> modulo <b>',
                description: 'Returns the remainder after division.',
                examples: [
                    { code: '17 modulo 5', output: '2' }
                ]
            }
        ]
    },
    comparisons: {
        title: 'Comparisons',
        icon: FiGitBranch,
        description: 'Compare values and create conditions',
        syntax: [
            {
                signature: '<a> is equal to <b>',
                description: 'Returns true if both values are equal.',
                examples: [
                    { code: '5 is equal to 5', output: 'true' },
                    { code: '"hello" is equal to "hello"', output: 'true' }
                ]
            },
            {
                signature: '<a> is not equal to <b>',
                description: 'Returns true if values are different.',
                examples: [
                    { code: '5 is not equal to 3', output: 'true' }
                ]
            },
            {
                signature: '<a> is greater than <b>',
                description: 'Returns true if a is larger than b.',
                examples: [
                    { code: '10 is greater than 5', output: 'true' }
                ]
            },
            {
                signature: '<a> is less than <b>',
                description: 'Returns true if a is smaller than b.',
                examples: [
                    { code: '3 is less than 8', output: 'true' }
                ]
            },
            {
                signature: '<a> is greater than or equal to <b>',
                description: 'Returns true if a is larger than or equal to b.',
                examples: [
                    { code: '5 is greater than or equal to 5', output: 'true' }
                ]
            },
            {
                signature: '<a> is less than or equal to <b>',
                description: 'Returns true if a is smaller than or equal to b.',
                examples: [
                    { code: '3 is less than or equal to 5', output: 'true' }
                ]
            }
        ]
    },
    conditionals: {
        title: 'Conditionals',
        icon: FiGitBranch,
        description: 'Control flow with if/else statements',
        syntax: [
            {
                signature: 'if <condition> then\\n    <statements>\\nend if',
                description: 'Executes statements only if the condition is true.',
                examples: [
                    {
                        code: `if age is greater than 18 then
    display "Adult"
end if`,
                        output: '// Displays "Adult" if age > 18'
                    }
                ],
                parameters: [
                    { name: 'condition', type: 'boolean', description: 'A comparison or boolean expression' },
                    { name: 'statements', type: 'code block', description: 'Code to execute if condition is true' }
                ]
            },
            {
                signature: 'if <condition> then\\n    <statements>\\notherwise\\n    <statements>\\nend if',
                description: 'Executes one block if condition is true, another if false.',
                examples: [
                    {
                        code: `if score is greater than or equal to 60 then
    display "Pass"
otherwise
    display "Fail"
end if`,
                        output: '// Displays "Pass" or "Fail" based on score'
                    }
                ]
            },
            {
                signature: 'otherwise if <condition> then',
                description: 'Adds additional conditions to check.',
                examples: [
                    {
                        code: `if grade is equal to "A" then
    display "Excellent"
otherwise if grade is equal to "B" then
    display "Good"
otherwise
    display "Keep trying"
end if`,
                        output: '// Multi-branch conditional'
                    }
                ]
            },
            {
                signature: '<condition> and <condition>',
                description: 'Both conditions must be true.',
                examples: [
                    { code: 'age is greater than 18 and hasLicense is equal to true value', output: '// Both must be true' }
                ]
            },
            {
                signature: '<condition> or <condition>',
                description: 'At least one condition must be true.',
                examples: [
                    { code: 'isAdmin is equal to true value or isModerator is equal to true value', output: '// Either can be true' }
                ]
            }
        ]
    },
    loops: {
        title: 'Loops',
        icon: FiRepeat,
        description: 'Repeat code multiple times',
        syntax: [
            {
                signature: 'repeat <n> times\\n    <statements>\\nend loop',
                description: 'Executes the statements a fixed number of times.',
                examples: [
                    {
                        code: `repeat 5 times
    display "Hello!"
end loop`,
                        output: 'Hello!\\nHello!\\nHello!\\nHello!\\nHello!'
                    }
                ],
                parameters: [
                    { name: 'n', type: 'number', description: 'Number of iterations' }
                ]
            },
            {
                signature: 'repeat while <condition> do\\n    <statements>\\nend repeat',
                description: 'Continues executing while the condition remains true.',
                examples: [
                    {
                        code: `create variable count to 1
repeat while count is less than or equal to 3 do
    display count
    set count to count plus 1
end repeat`,
                        output: '1\\n2\\n3'
                    }
                ],
                parameters: [
                    { name: 'condition', type: 'boolean', description: 'Loop continues while this is true' }
                ]
            },
            {
                signature: 'for each <item> in list <listName> do\\n    <statements>\\nend loop',
                description: 'Iterates over each element in a list.',
                examples: [
                    {
                        code: `create variable colors to create list with "red", "green", "blue" end list
for each color in list colors do
    display color
end loop`,
                        output: 'red\\ngreen\\nblue'
                    }
                ],
                parameters: [
                    { name: 'item', type: 'identifier', description: 'Variable to hold current element' },
                    { name: 'listName', type: 'identifier', description: 'The list to iterate over' }
                ]
            }
        ]
    },
    lists: {
        title: 'Lists',
        icon: FiList,
        description: 'Store collections of values',
        syntax: [
            {
                signature: 'create list with <items> end list',
                description: 'Creates a new list with the specified items.',
                examples: [
                    { code: 'create list with 1, 2, 3, 4, 5 end list', output: '[1, 2, 3, 4, 5]' },
                    { code: 'create list with "apple", "banana", "cherry" end list', output: '["apple", "banana", "cherry"]' }
                ],
                parameters: [
                    { name: 'items', type: 'comma-separated values', description: 'The elements to include' }
                ]
            },
            {
                signature: 'get item <index> from <list> end get',
                description: 'Retrieves an item at a specific position (0-indexed).',
                examples: [
                    {
                        code: `create variable fruits to create list with "apple", "banana" end list
display get item 0 from fruits end get`,
                        output: 'apple'
                    }
                ],
                parameters: [
                    { name: 'index', type: 'number', description: 'Position (starting from 0)' },
                    { name: 'list', type: 'list variable', description: 'The list to access' }
                ]
            }
        ]
    },
    functions: {
        title: 'Functions',
        icon: FiZap,
        description: 'Reusable blocks of code',
        syntax: [
            {
                signature: 'define function <name> with no parameters\\n    <statements>\\nend function',
                description: 'Creates a function that takes no arguments.',
                examples: [
                    {
                        code: `define function sayHello with no parameters
    display "Hello, World!"
end function

sayHello`,
                        output: 'Hello, World!'
                    }
                ]
            },
            {
                signature: 'define function <name> with parameters <params>\\n    <statements>\\nend function',
                description: 'Creates a function that accepts parameters.',
                examples: [
                    {
                        code: `define function greet with parameters name
    display "Hello, " plus name plus "!"
end function

greet "Alice"`,
                        output: 'Hello, Alice!'
                    },
                    {
                        code: `define function add with parameters a, b
    return a plus b
end function

display add 5, 3`,
                        output: '8'
                    }
                ],
                parameters: [
                    { name: 'name', type: 'identifier', description: 'The function name' },
                    { name: 'params', type: 'comma-separated identifiers', description: 'Parameter names' }
                ]
            },
            {
                signature: 'return <value>',
                description: 'Returns a value from a function.',
                examples: [
                    {
                        code: `define function square with parameters n
    return n times n
end function

display square 4`,
                        output: '16'
                    }
                ]
            }
        ]
    },
    types: {
        title: 'Data Types',
        icon: FiType,
        description: 'Types of values in the language',
        syntax: [
            {
                signature: 'Strings',
                description: 'Text values enclosed in double quotes.',
                examples: [
                    { code: '"Hello, World!"', output: 'A string value' },
                    { code: '"Line 1" plus "Line 2"', output: 'String concatenation' }
                ]
            },
            {
                signature: 'Numbers',
                description: 'Integer or decimal numeric values.',
                examples: [
                    { code: '42', output: 'An integer' },
                    { code: '3.14159', output: 'A decimal number' }
                ]
            },
            {
                signature: 'Booleans',
                description: 'True or false values.',
                examples: [
                    { code: 'true value', output: 'Boolean true' },
                    { code: 'false value', output: 'Boolean false' }
                ]
            },
            {
                signature: 'Lists',
                description: 'Ordered collections of values.',
                examples: [
                    { code: 'create list with 1, 2, 3 end list', output: 'A list of numbers' }
                ]
            }
        ]
    }
};

const DOC_ORDER = ['overview', 'output', 'variables', 'types', 'operators', 'comparisons', 'conditionals', 'loops', 'lists', 'functions'];

const CanvasPage = () => {
    const [code, setCode] = useState('display "Hello, World!"');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [activeDoc, setActiveDoc] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [showTranspiled, setShowTranspiled] = useState(false);
    const [transpiledCode, setTranspiledCode] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');

    const transpiler = createTranspiler(selectedLanguage, STAGES.NATURAL);

    // Filter documentation based on search
    const filteredDocs = useMemo(() => {
        if (!searchQuery.trim()) return DOC_ORDER;
        const query = searchQuery.toLowerCase();
        return DOC_ORDER.filter(key => {
            const doc = DOCUMENTATION[key];
            if (doc.title.toLowerCase().includes(query)) return true;
            if (doc.description?.toLowerCase().includes(query)) return true;
            if (doc.syntax) {
                return doc.syntax.some(s =>
                    s.signature.toLowerCase().includes(query) ||
                    s.description.toLowerCase().includes(query)
                );
            }
            return false;
        });
    }, [searchQuery]);

    // Run code
    const handleRun = useCallback(async () => {
        if (!code.trim()) {
            toast.error('Write some code first!');
            return;
        }

        setIsRunning(true);
        setOutput('');

        try {
            const result = await executeCode(code, null);

            if (result.success) {
                setOutput(result.output || '(No output - use display to show values)');
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

    // Insert code example into editor
    const insertExample = (exampleCode) => {
        setCode(exampleCode);
        toast.success('Example loaded!');
    };

    // Copy code
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        toast.success('Code copied!');
    };

    // Render documentation section
    const renderDocSection = () => {
        const doc = DOCUMENTATION[activeDoc];
        if (!doc) return null;

        const Icon = doc.icon || FiBook;

        return (
            <div className={styles.docContent}>
                <div className={styles.docHeader}>
                    <Icon className={styles.docIcon} />
                    <h2>{doc.title}</h2>
                </div>

                {doc.content && (
                    <div className={styles.docOverview}>
                        {doc.content.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                )}

                {doc.description && (
                    <p className={styles.docDescription}>{doc.description}</p>
                )}

                {doc.syntax && (
                    <div className={styles.syntaxList}>
                        {doc.syntax.map((item, idx) => (
                            <div key={idx} className={styles.syntaxItem}>
                                <div className={styles.signature}>
                                    <code>{item.signature.replace(/\\n/g, '\n')}</code>
                                </div>

                                <p className={styles.syntaxDescription}>{item.description}</p>

                                {item.parameters && item.parameters.length > 0 && (
                                    <div className={styles.parameters}>
                                        <h4>Parameters</h4>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Type</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item.parameters.map((param, pIdx) => (
                                                    <tr key={pIdx}>
                                                        <td><code>{param.name}</code></td>
                                                        <td><span className={styles.typeTag}>{param.type}</span></td>
                                                        <td>{param.description}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {item.examples && item.examples.length > 0 && (
                                    <div className={styles.examples}>
                                        <h4>Examples</h4>
                                        {item.examples.map((ex, eIdx) => (
                                            <div key={eIdx} className={styles.exampleBlock}>
                                                <div className={styles.exampleCode}>
                                                    <pre>{ex.code}</pre>
                                                    <button
                                                        className={styles.tryButton}
                                                        onClick={() => insertExample(ex.code)}
                                                        title="Try this example"
                                                    >
                                                        <FiPlay /> Try
                                                    </button>
                                                </div>
                                                {ex.output && (
                                                    <div className={styles.exampleOutput}>
                                                        <span>Output:</span>
                                                        <code>{ex.output}</code>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={styles.canvas}>
            {/* Left Panel - Documentation */}
            <div className={styles.docPanel}>
                <div className={styles.docSearch}>
                    <FiSearch />
                    <input
                        type="text"
                        placeholder="Search documentation..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery('')}>
                            <FiX />
                        </button>
                    )}
                </div>

                <nav className={styles.docNav}>
                    <div className={styles.navHeader}>Documentation</div>
                    {filteredDocs.map(key => {
                        const doc = DOCUMENTATION[key];
                        const Icon = doc.icon || FiBook;
                        return (
                            <button
                                key={key}
                                className={`${styles.navItem} ${activeDoc === key ? styles.active : ''}`}
                                onClick={() => setActiveDoc(key)}
                            >
                                <Icon />
                                <span>{doc.title}</span>
                                <FiChevronRight className={styles.navArrow} />
                            </button>
                        );
                    })}
                </nav>

                <div className={styles.docBody}>
                    {renderDocSection()}
                </div>
            </div>

            {/* Right Panel - Editor */}
            <div className={styles.editorPanel}>
                <div className={styles.editorHeader}>
                    <div className={styles.editorTitle}>
                        <FiCpu />
                        <span>Playground</span>
                    </div>
                    <div className={styles.editorActions}>
                        <button onClick={handleCopy} title="Copy code">
                            <FiCopy />
                        </button>
                        <button onClick={() => { setCode(''); setOutput(''); }} title="Clear">
                            <FiTrash2 />
                        </button>
                    </div>
                </div>

                <div className={styles.editorWrapper}>
                    <CodeMirror
                        value={code}
                        onChange={setCode}
                        height="250px"
                        className={styles.editor}
                        placeholder="Write your natural language code here..."
                        basicSetup={{
                            lineNumbers: true,
                            highlightActiveLineGutter: true,
                            highlightActiveLine: true,
                        }}
                    />
                </div>

                <div className={styles.runBar}>
                    <motion.button
                        className={styles.runButton}
                        onClick={handleRun}
                        disabled={isRunning}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isRunning ? (
                            <>Running...</>
                        ) : (
                            <><FiPlay /> Run Code</>
                        )}
                    </motion.button>

                    <button
                        className={`${styles.transpileToggle} ${showTranspiled ? styles.active : ''}`}
                        onClick={() => {
                            if (!showTranspiled && transpiler) {
                                setTranspiledCode(transpiler.toCode(code));
                            }
                            setShowTranspiled(!showTranspiled);
                        }}
                    >
                        <FiCode />
                        See as {selectedLanguage === 'javascript' ? 'JS' : 'Python'}
                    </button>

                    {showTranspiled && (
                        <select
                            value={selectedLanguage}
                            onChange={(e) => {
                                setSelectedLanguage(e.target.value);
                                const newTranspiler = createTranspiler(e.target.value, STAGES.NATURAL);
                                if (newTranspiler) {
                                    setTranspiledCode(newTranspiler.toCode(code));
                                }
                            }}
                            className={styles.langSelect}
                        >
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                        </select>
                    )}
                </div>

                <div className={styles.outputSection}>
                    <div className={styles.outputHeader}>
                        <FiTerminal />
                        <span>Output</span>
                        {output && (
                            <span className={`${styles.outputStatus} ${output.startsWith('Error') ? styles.error : styles.success}`}>
                                {output.startsWith('Error') ? <FiX /> : <FiCheck />}
                            </span>
                        )}
                    </div>
                    <pre className={styles.outputContent}>
                        {output || 'Run your code to see output...'}
                    </pre>
                </div>

                <AnimatePresence>
                    {showTranspiled && (
                        <motion.div
                            className={styles.transpiledSection}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className={styles.transpiledHeader}>
                                <FiCode />
                                <span>Transpiled {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}</span>
                            </div>
                            <pre className={styles.transpiledCode}>
                                {transpiledCode || '// Transpiled code will appear here'}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CanvasPage;
