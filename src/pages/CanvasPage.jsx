// Canvas Page - VS Code Style IDE Environment
import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlay,
    FiTrash2,
    FiCopy,
    FiCode,
    FiBook,
    FiChevronRight,
    FiChevronDown,
    FiTerminal,
    FiFile,
    FiFolder,
    FiFolderPlus,
    FiSettings,
    FiCheck,
    FiX,
    FiMaximize2,
    FiMinimize2,
    FiSidebar
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import CodeMirror from '@uiw/react-codemirror';
import { executeCode } from '../engine/executor';
import { createTranspiler, STAGES } from '../engine/transpiler';
import styles from './CanvasPage.module.css';

// Quick reference documentation
const DOCS = {
    output: { title: 'Output', syntax: 'display <value>', desc: 'Print to console' },
    variables: { title: 'Variables', syntax: 'create variable <name> to <value>', desc: 'Store data' },
    constants: { title: 'Constants', syntax: 'create constant <name> to <value>', desc: 'Immutable values' },
    math: { title: 'Math', syntax: 'plus, minus, times, divided by, modulo', desc: 'Arithmetic' },
    compare: { title: 'Compare', syntax: 'is equal to, is greater than, is less than', desc: 'Comparisons' },
    conditions: { title: 'Conditions', syntax: 'if <cond> then ... end if', desc: 'Branching' },
    loops: { title: 'Loops', syntax: 'repeat <n> times ... end repeat', desc: 'Iteration' },
    lists: { title: 'Lists', syntax: 'create list <name> with [...]', desc: 'Arrays' },
    functions: { title: 'Functions', syntax: 'define function <name> ... end function', desc: 'Reusable code' },
};

const CanvasPage = () => {
    // Editor state
    const [code, setCode] = useState(`// Welcome to StartCode Canvas!
// Write natural language code below:

display "Hello, World!"
create variable count to 0
repeat 5 times
    set count to count plus 1
    display "Count: " plus count
end repeat
`);
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    // Panel states
    const [showSidebar, setShowSidebar] = useState(false);
    const [showDocs, setShowDocs] = useState(false);
    const [showTranspiled, setShowTranspiled] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('javascript');
    const [transpiledCode, setTranspiledCode] = useState('');
    const [activeTab] = useState('main.sc');
    const [terminalExpanded, setTerminalExpanded] = useState(false);
    const [activeActivity, setActiveActivity] = useState('explorer');

    // Workspace files
    const [files] = useState([
        { name: 'main.sc', type: 'file' },
        {
            name: 'examples', type: 'folder', expanded: false, children: [
                { name: 'hello.sc', type: 'file' },
                { name: 'loops.sc', type: 'file' },
            ]
        },
    ]);

    // Transpiler
    const transpiler = useMemo(() => createTranspiler(selectedLanguage, STAGES.NATURAL), [selectedLanguage]);

    // Run code
    const handleRun = useCallback(async () => {
        if (!code.trim()) {
            setOutput('No code to run');
            return;
        }

        setIsRunning(true);
        setOutput('');

        try {
            const result = await executeCode(code);
            setOutput(result.output || 'Code executed successfully (no output)');

            if (showTranspiled && transpiler) {
                setTranspiledCode(transpiler.toCode(code));
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    }, [code, showTranspiled, transpiler]);

    // Copy code
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(code);
        toast.success('Copied to clipboard');
    }, [code]);

    // Keyboard shortcuts
    const handleKeyDown = useCallback((e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            handleRun();
        }
    }, [handleRun]);

    // Render file tree
    const renderFileItem = (file, depth = 0) => {
        if (file.type === 'folder') {
            return (
                <div key={file.name}>
                    <button className={styles.fileItem} style={{ paddingLeft: `${12 + depth * 12}px` }}>
                        {file.expanded ? <FiChevronDown size={12} /> : <FiChevronRight size={12} />}
                        <FiFolder size={14} />
                        <span>{file.name}</span>
                    </button>
                </div>
            );
        }
        return (
            <button
                key={file.name}
                className={`${styles.fileItem} ${activeTab === file.name ? styles.activeFile : ''}`}
                style={{ paddingLeft: `${12 + depth * 12}px` }}
            >
                <FiFile size={14} />
                <span>{file.name}</span>
            </button>
        );
    };

    return (
        <div className={styles.ide} onKeyDown={handleKeyDown}>
            {/* Activity Bar */}
            <div className={styles.activityBar}>
                <button
                    className={`${styles.activityItem} ${activeActivity === 'explorer' && showSidebar ? styles.active : ''}`}
                    onClick={() => {
                        setActiveActivity('explorer');
                        setShowSidebar(!showSidebar || activeActivity !== 'explorer');
                        setShowDocs(false);
                    }}
                    title="Explorer"
                >
                    <FiFile />
                </button>
                <button
                    className={`${styles.activityItem} ${activeActivity === 'docs' && showDocs ? styles.active : ''}`}
                    onClick={() => {
                        setActiveActivity('docs');
                        setShowDocs(!showDocs || activeActivity !== 'docs');
                        setShowSidebar(false);
                    }}
                    title="Documentation"
                >
                    <FiBook />
                </button>
                <button
                    className={`${styles.activityItem} ${showTranspiled ? styles.active : ''}`}
                    onClick={() => {
                        setShowTranspiled(!showTranspiled);
                        if (!showTranspiled && transpiler) {
                            setTranspiledCode(transpiler.toCode(code));
                        }
                    }}
                    title="View Transpiled Code"
                >
                    <FiCode />
                </button>
                <div className={styles.activitySpacer} />
                <button className={styles.activityItem} title="Settings">
                    <FiSettings />
                </button>
            </div>

            {/* Sidebar - Explorer */}
            <AnimatePresence>
                {showSidebar && activeActivity === 'explorer' && (
                    <motion.div
                        className={styles.sidebar}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 200, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className={styles.sidebarHeader}>
                            <span>EXPLORER</span>
                            <button title="New File"><FiFolderPlus size={14} /></button>
                        </div>
                        <div className={styles.sidebarSection}>
                            <div className={styles.sectionHeader}>
                                <FiChevronDown size={12} />
                                <span>WORKSPACE</span>
                            </div>
                            <div className={styles.fileTree}>
                                {files.map(file => renderFileItem(file))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Sidebar - Documentation */}
            <AnimatePresence>
                {showDocs && activeActivity === 'docs' && (
                    <motion.div
                        className={styles.sidebar}
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 260, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    >
                        <div className={styles.sidebarHeader}>
                            <span>QUICK REFERENCE</span>
                        </div>
                        <div className={styles.docsContent}>
                            {Object.entries(DOCS).map(([key, doc]) => (
                                <div key={key} className={styles.docItem}>
                                    <h4>{doc.title}</h4>
                                    <code>{doc.syntax}</code>
                                    <p>{doc.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Editor Area */}
            <div className={styles.mainArea}>
                {/* Tab Bar */}
                <div className={styles.tabBar}>
                    <div className={styles.tabs}>
                        <button className={`${styles.tab} ${styles.activeTab}`}>
                            <FiFile size={14} />
                            <span>{activeTab}</span>
                            <FiX size={12} className={styles.tabClose} />
                        </button>
                    </div>
                    <div className={styles.tabActions}>
                        <button onClick={() => setShowSidebar(!showSidebar)} title="Toggle Sidebar">
                            <FiSidebar size={14} />
                        </button>
                    </div>
                </div>

                {/* Editors Container */}
                <div className={styles.editorsContainer}>
                    {/* Main Editor */}
                    <div className={`${styles.editorPane} ${showTranspiled ? styles.splitView : ''}`}>
                        <div className={styles.editorHeader}>
                            <span className={styles.editorPath}>workspace / {activeTab}</span>
                            <div className={styles.editorTools}>
                                <button onClick={handleCopy} title="Copy"><FiCopy size={14} /></button>
                                <button onClick={() => { setCode(''); setOutput(''); }} title="Clear"><FiTrash2 size={14} /></button>
                            </div>
                        </div>
                        <div className={styles.editorWrapper}>
                            <CodeMirror
                                value={code}
                                onChange={setCode}
                                height="100%"
                                className={styles.editor}
                                placeholder="Write natural language code..."
                                basicSetup={{
                                    lineNumbers: true,
                                    highlightActiveLineGutter: true,
                                    highlightActiveLine: true,
                                    foldGutter: true,
                                }}
                                theme="dark"
                            />
                        </div>
                    </div>

                    {/* Transpiled Code Panel */}
                    <AnimatePresence>
                        {showTranspiled && (
                            <motion.div
                                className={styles.transpiledPane}
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: '50%', opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                            >
                                <div className={styles.editorHeader}>
                                    <span className={styles.editorPath}>
                                        Transpiled • {selectedLanguage === 'javascript' ? 'JavaScript' : 'Python'}
                                    </span>
                                    <select
                                        value={selectedLanguage}
                                        onChange={(e) => {
                                            setSelectedLanguage(e.target.value);
                                            const newTranspiler = createTranspiler(e.target.value, STAGES.NATURAL);
                                            if (newTranspiler) setTranspiledCode(newTranspiler.toCode(code));
                                        }}
                                        className={styles.langSelect}
                                    >
                                        <option value="javascript">JavaScript</option>
                                        <option value="python">Python</option>
                                    </select>
                                </div>
                                <pre className={styles.transpiledCode}>
                                    {transpiledCode || '// Run code to see transpiled output'}
                                </pre>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Terminal / Output Panel */}
                <div className={`${styles.terminal} ${terminalExpanded ? styles.expanded : ''}`}>
                    <div className={styles.terminalHeader}>
                        <div className={styles.terminalTabs}>
                            <button className={`${styles.terminalTab} ${styles.activeTerminalTab}`}>
                                <FiTerminal size={12} />
                                <span>Output</span>
                            </button>
                        </div>
                        <div className={styles.terminalActions}>
                            <motion.button
                                className={styles.runBtn}
                                onClick={handleRun}
                                disabled={isRunning}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <FiPlay size={12} />
                                {isRunning ? 'Running...' : 'Run (Ctrl+Enter)'}
                            </motion.button>
                            <button onClick={() => setTerminalExpanded(!terminalExpanded)} title="Toggle Size">
                                {terminalExpanded ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
                            </button>
                            <button onClick={() => setOutput('')} title="Clear">
                                <FiTrash2 size={14} />
                            </button>
                        </div>
                    </div>
                    <pre className={styles.terminalOutput}>
                        {output || '> Ready. Press Ctrl+Enter or click Run to execute.'}
                    </pre>
                </div>

                {/* Status Bar */}
                <div className={styles.statusBar}>
                    <div className={styles.statusLeft}>
                        <span className={styles.statusItem}>
                            {output.startsWith('Error') ? (
                                <><FiX className={styles.statusError} /> Error</>
                            ) : output ? (
                                <><FiCheck className={styles.statusSuccess} /> Success</>
                            ) : (
                                <>Ready</>
                            )}
                        </span>
                    </div>
                    <div className={styles.statusRight}>
                        <span className={styles.statusItem}>Natural Language</span>
                        <span className={styles.statusItem}>Ln {code.split('\n').length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CanvasPage;
