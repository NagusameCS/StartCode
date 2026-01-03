// Lesson Page - Interactive learning with code editor
import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiArrowLeft,
    FiArrowRight,
    FiPlay,
    FiCheck,
    FiX,
    FiHelpCircle,
    FiClock,
    FiTerminal
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

    // Terminal simulation state
    const [terminalHistory, setTerminalHistory] = useState([]);
    const [terminalInput, setTerminalInput] = useState('');
    const terminalRef = useRef(null);

    // Check if this is a terminal/bash course
    const isTerminalCourse = course?.language === 'bash' || course?.language === 'shell' || courseId === 'terminal';

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
            // For pure logic exercises OR stage 1 natural language lessons
            const isNaturalLanguageStage = lesson?.stage === 1 || lesson?.exercise?.language === 'natural';
            if (!course?.language || isNaturalLanguageStage) {
                // Execute the natural language code using natural interpreter
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

    // Virtual file system state for terminal
    const [virtualFS, setVirtualFS] = useState({
        '/': { type: 'dir', children: ['home'] },
        '/home': { type: 'dir', children: ['user'] },
        '/home/user': { type: 'dir', children: ['Documents', 'Downloads', 'Pictures', 'projects', '.bashrc', 'README.md'] },
        '/home/user/Documents': { type: 'dir', children: ['notes.txt', 'report.pdf'] },
        '/home/user/Downloads': { type: 'dir', children: [] },
        '/home/user/Pictures': { type: 'dir', children: ['photo.jpg'] },
        '/home/user/projects': { type: 'dir', children: ['app.js', 'index.html', 'styles.css'] },
        '/home/user/.bashrc': { type: 'file', content: '# ~/.bashrc\nexport PATH=$HOME/bin:$PATH\nalias ll="ls -la"' },
        '/home/user/README.md': { type: 'file', content: '# My Projects\n\nWelcome to my projects folder!' },
        '/home/user/Documents/notes.txt': { type: 'file', content: 'Remember to practice terminal commands!' },
        '/home/user/Documents/report.pdf': { type: 'file', content: '[Binary PDF content]' },
        '/home/user/Pictures/photo.jpg': { type: 'file', content: '[Binary image content]' },
        '/home/user/projects/app.js': { type: 'file', content: 'console.log("Hello World!");' },
        '/home/user/projects/index.html': { type: 'file', content: '<!DOCTYPE html>\n<html>\n<head><title>My App</title></head>\n<body><h1>Hello!</h1></body>\n</html>' },
        '/home/user/projects/styles.css': { type: 'file', content: 'body { font-family: Arial; }' }
    });
    const [currentDir, setCurrentDir] = useState('/home/user');

    // Handle terminal command
    const handleTerminalCommand = useCallback((e) => {
        if (e.key !== 'Enter' || !terminalInput.trim()) return;

        const command = terminalInput.trim();

        // Advanced terminal simulation with virtual file system
        const simulateCommand = (cmd) => {
            const parts = cmd.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
            const baseCmd = parts[0];
            const args = parts.slice(1).map(a => a.replace(/^"|"$/g, ''));

            const resolvePath = (path) => {
                if (!path) return currentDir;
                if (path.startsWith('/')) return path;
                if (path === '..') {
                    const parts = currentDir.split('/').filter(Boolean);
                    parts.pop();
                    return '/' + parts.join('/') || '/';
                }
                if (path === '.') return currentDir;
                if (path === '~') return '/home/user';
                if (path.startsWith('~/')) return '/home/user/' + path.slice(2);
                return currentDir === '/' ? '/' + path : currentDir + '/' + path;
            };

            switch (baseCmd) {
                case 'pwd':
                    return currentDir;
                
                case 'whoami':
                    return 'user';
                
                case 'hostname':
                    return 'startcode-terminal';
                
                case 'date':
                    return new Date().toString();
                
                case 'echo':
                    return args.map(a => {
                        if (a.startsWith('$')) {
                            const varName = a.slice(1);
                            const envVars = { HOME: '/home/user', USER: 'user', PATH: '/usr/bin:/bin', SHELL: '/bin/bash' };
                            return envVars[varName] || '';
                        }
                        return a;
                    }).join(' ');
                
                case 'ls': {
                    const showHidden = args.includes('-a') || args.includes('-la') || args.includes('-al');
                    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
                    const targetPath = args.find(a => !a.startsWith('-')) || currentDir;
                    const resolved = resolvePath(targetPath);
                    const node = virtualFS[resolved];
                    
                    if (!node) return `ls: cannot access '${targetPath}': No such file or directory`;
                    if (node.type !== 'dir') return targetPath;
                    
                    let items = node.children.filter(c => showHidden || !c.startsWith('.'));
                    if (showHidden) items = ['.', '..', ...items];
                    
                    if (longFormat) {
                        return items.map(item => {
                            if (item === '.' || item === '..') return `drwxr-xr-x  user user  4096 Jan  3 10:00 ${item}`;
                            const itemPath = resolved === '/' ? '/' + item : resolved + '/' + item;
                            const itemNode = virtualFS[itemPath];
                            if (!itemNode) return `?????????? ${item}`;
                            const type = itemNode.type === 'dir' ? 'd' : '-';
                            const perms = itemNode.type === 'dir' ? 'rwxr-xr-x' : 'rw-r--r--';
                            const size = itemNode.content?.length || 4096;
                            return `${type}${perms}  user user  ${String(size).padStart(5)} Jan  3 10:00 ${item}`;
                        }).join('\n');
                    }
                    return items.join('  ');
                }
                
                case 'cd': {
                    const target = args[0] || '/home/user';
                    const resolved = resolvePath(target);
                    const node = virtualFS[resolved];
                    
                    if (!node) return `cd: ${target}: No such file or directory`;
                    if (node.type !== 'dir') return `cd: ${target}: Not a directory`;
                    
                    setCurrentDir(resolved);
                    return '';
                }
                
                case 'cat': {
                    if (!args[0]) return 'cat: missing operand';
                    const resolved = resolvePath(args[0]);
                    const node = virtualFS[resolved];
                    
                    if (!node) return `cat: ${args[0]}: No such file or directory`;
                    if (node.type === 'dir') return `cat: ${args[0]}: Is a directory`;
                    
                    return node.content;
                }
                
                case 'head': {
                    if (!args[0] && !args.includes('-n')) return 'head: missing operand';
                    const nIndex = args.indexOf('-n');
                    let lines = 10;
                    let file = args[0];
                    if (nIndex !== -1 && args[nIndex + 1]) {
                        lines = parseInt(args[nIndex + 1]) || 10;
                        file = args.find((a, i) => i !== nIndex && i !== nIndex + 1 && !a.startsWith('-'));
                    }
                    const resolved = resolvePath(file);
                    const node = virtualFS[resolved];
                    if (!node) return `head: ${file}: No such file or directory`;
                    return node.content.split('\n').slice(0, lines).join('\n');
                }
                
                case 'tail': {
                    if (!args[0]) return 'tail: missing operand';
                    const resolved = resolvePath(args[0]);
                    const node = virtualFS[resolved];
                    if (!node) return `tail: ${args[0]}: No such file or directory`;
                    return node.content.split('\n').slice(-10).join('\n');
                }
                
                case 'mkdir': {
                    if (!args[0]) return 'mkdir: missing operand';
                    const resolved = resolvePath(args[0]);
                    const parentPath = resolved.substring(0, resolved.lastIndexOf('/')) || '/';
                    const dirName = resolved.substring(resolved.lastIndexOf('/') + 1);
                    
                    if (virtualFS[resolved]) return `mkdir: cannot create directory '${args[0]}': File exists`;
                    
                    setVirtualFS(prev => ({
                        ...prev,
                        [resolved]: { type: 'dir', children: [] },
                        [parentPath]: { ...prev[parentPath], children: [...prev[parentPath].children, dirName] }
                    }));
                    return '';
                }
                
                case 'touch': {
                    if (!args[0]) return 'touch: missing operand';
                    const resolved = resolvePath(args[0]);
                    const parentPath = resolved.substring(0, resolved.lastIndexOf('/')) || '/';
                    const fileName = resolved.substring(resolved.lastIndexOf('/') + 1);
                    
                    if (!virtualFS[resolved]) {
                        setVirtualFS(prev => ({
                            ...prev,
                            [resolved]: { type: 'file', content: '' },
                            [parentPath]: { ...prev[parentPath], children: [...(prev[parentPath]?.children || []), fileName] }
                        }));
                    }
                    return '';
                }
                
                case 'rm': {
                    if (!args[0]) return 'rm: missing operand';
                    const resolved = resolvePath(args.find(a => !a.startsWith('-')) || '');
                    const node = virtualFS[resolved];
                    
                    if (!node) return `rm: cannot remove '${args[0]}': No such file or directory`;
                    if (node.type === 'dir' && !args.includes('-r') && !args.includes('-rf')) {
                        return `rm: cannot remove '${args[0]}': Is a directory`;
                    }
                    
                    const parentPath = resolved.substring(0, resolved.lastIndexOf('/')) || '/';
                    const name = resolved.substring(resolved.lastIndexOf('/') + 1);
                    
                    setVirtualFS(prev => {
                        const newFS = { ...prev };
                        delete newFS[resolved];
                        if (newFS[parentPath]) {
                            newFS[parentPath] = {
                                ...newFS[parentPath],
                                children: newFS[parentPath].children.filter(c => c !== name)
                            };
                        }
                        return newFS;
                    });
                    return '';
                }
                
                case 'cp': {
                    if (args.length < 2) return 'cp: missing operand';
                    const srcResolved = resolvePath(args[0]);
                    const destResolved = resolvePath(args[1]);
                    const srcNode = virtualFS[srcResolved];
                    
                    if (!srcNode) return `cp: cannot stat '${args[0]}': No such file or directory`;
                    
                    const destName = destResolved.substring(destResolved.lastIndexOf('/') + 1);
                    const destParent = destResolved.substring(0, destResolved.lastIndexOf('/')) || '/';
                    
                    setVirtualFS(prev => ({
                        ...prev,
                        [destResolved]: { ...srcNode },
                        [destParent]: { ...prev[destParent], children: [...(prev[destParent]?.children || []), destName] }
                    }));
                    return '';
                }
                
                case 'mv': {
                    if (args.length < 2) return 'mv: missing operand';
                    const srcResolved = resolvePath(args[0]);
                    const destResolved = resolvePath(args[1]);
                    const srcNode = virtualFS[srcResolved];
                    
                    if (!srcNode) return `mv: cannot stat '${args[0]}': No such file or directory`;
                    
                    const srcName = srcResolved.substring(srcResolved.lastIndexOf('/') + 1);
                    const srcParent = srcResolved.substring(0, srcResolved.lastIndexOf('/')) || '/';
                    const destName = destResolved.substring(destResolved.lastIndexOf('/') + 1);
                    const destParent = destResolved.substring(0, destResolved.lastIndexOf('/')) || '/';
                    
                    setVirtualFS(prev => {
                        const newFS = { ...prev };
                        delete newFS[srcResolved];
                        newFS[destResolved] = { ...srcNode };
                        newFS[srcParent] = { ...newFS[srcParent], children: newFS[srcParent].children.filter(c => c !== srcName) };
                        if (newFS[destParent]) {
                            newFS[destParent] = { ...newFS[destParent], children: [...newFS[destParent].children, destName] };
                        }
                        return newFS;
                    });
                    return '';
                }
                
                case 'grep': {
                    if (args.length < 2) return 'grep: missing operand';
                    const pattern = args[0];
                    const resolved = resolvePath(args[1]);
                    const node = virtualFS[resolved];
                    
                    if (!node) return `grep: ${args[1]}: No such file or directory`;
                    if (node.type === 'dir') return `grep: ${args[1]}: Is a directory`;
                    
                    const lines = node.content.split('\n').filter(line => line.includes(pattern));
                    return lines.length > 0 ? lines.join('\n') : '';
                }
                
                case 'wc': {
                    if (!args[0] && !args.includes('-l')) return 'wc: missing operand';
                    const file = args.find(a => !a.startsWith('-'));
                    if (!file) return 'wc: missing operand';
                    const resolved = resolvePath(file);
                    const node = virtualFS[resolved];
                    
                    if (!node) return `wc: ${file}: No such file or directory`;
                    
                    const lines = node.content.split('\n').length;
                    const words = node.content.split(/\s+/).filter(Boolean).length;
                    const chars = node.content.length;
                    
                    if (args.includes('-l')) return `${lines} ${file}`;
                    return `${lines} ${words} ${chars} ${file}`;
                }
                
                case 'find': {
                    const results = [];
                    const nameArg = args.indexOf('-name');
                    const pattern = nameArg !== -1 ? args[nameArg + 1]?.replace(/\*/g, '.*') : null;
                    
                    Object.keys(virtualFS).forEach(path => {
                        const name = path.substring(path.lastIndexOf('/') + 1);
                        if (!pattern || new RegExp(pattern).test(name)) {
                            results.push(path);
                        }
                    });
                    return results.join('\n');
                }
                
                case 'chmod':
                case 'chown':
                    return ''; // Simulated as success
                
                case 'clear':
                    return '__CLEAR__';
                
                case 'history':
                    return terminalHistory.map((h, i) => `${i + 1}  ${h.command}`).join('\n');
                
                case 'help':
                    return `Available commands:
  ls [options] [path]   - List directory contents (-l, -a, -la)
  cd [path]             - Change directory
  pwd                   - Print working directory
  cat [file]            - Display file contents
  head/tail [file]      - Show first/last lines
  mkdir [dir]           - Create directory
  touch [file]          - Create empty file
  rm [-r] [file/dir]    - Remove file or directory
  cp [src] [dest]       - Copy file
  mv [src] [dest]       - Move/rename file
  grep [pattern] [file] - Search in file
  wc [-l] [file]        - Count lines/words/chars
  find [-name pattern]  - Find files
  echo [text]           - Print text
  clear                 - Clear terminal
  help                  - Show this help`;
                
                case 'man':
                    return `${args[0] || 'command'} - Manual page\n\nUsage: ${args[0] || 'command'} [options] [arguments]\n\nTry 'help' to see available commands.`;
                
                default:
                    return `${baseCmd}: command not found. Type 'help' for available commands.`;
            }
        };

        const output = simulateCommand(command);

        if (output === '__CLEAR__') {
            setTerminalHistory([]);
        } else {
            setTerminalHistory(prev => [...prev, { command, output, dir: currentDir }]);
        }

        setTerminalInput('');
        setCode(command); // Store for checking

        // Check if command matches expected
        if (lesson?.exercise?.expectedOutput) {
            const normalize = (s) => s?.trim().toLowerCase() || '';
            const isCorrect = normalize(command) === normalize(lesson.exercise.expectedOutput);
            setExerciseResult(isCorrect ? 'correct' : 'incorrect');

            if (isCorrect) {
                toast.success('Correct command!');
                saveCodeToHistory(lessonId, command, 'correct');
            } else {
                saveCodeToHistory(lessonId, command, 'incorrect');
            }
        }

        // Scroll terminal to bottom
        setTimeout(() => {
            if (terminalRef.current) {
                terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
        }, 0);
    }, [terminalInput, lesson, lessonId, saveCodeToHistory]);

    // Reset terminal on lesson change
    useEffect(() => {
        setTerminalHistory([]);
        setTerminalInput('');
    }, [lessonId]);

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
                    <motion.div
                        className={styles.content}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <h1>{lesson.title}</h1>
                        <p className={styles.lessonDescription}>{lesson.description}</p>
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
                    ) : isTerminalCourse ? (
                        <>
                            {/* Terminal Simulation */}
                            <div className={styles.terminalWrapper}>
                                <div className={styles.terminalHeader}>
                                    <FiTerminal />
                                    <span>Terminal</span>
                                    <div className={styles.terminalDots}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className={styles.terminal} ref={terminalRef}>
                                    <div className={styles.terminalWelcome}>
                                        Welcome to StartCode Terminal Simulator
                                        <br />
                                        Type commands and press Enter to execute. Type 'help' for a list of commands.
                                    </div>
                                    {terminalHistory.map((entry, idx) => (
                                        <div key={idx} className={styles.terminalEntry}>
                                            <div className={styles.terminalCommand}>
                                                <span className={styles.terminalPrompt}>user@startcode:{entry.dir === '/home/user' ? '~' : entry.dir}$</span>
                                                <span>{entry.command}</span>
                                            </div>
                                            {entry.output && (
                                                <pre className={styles.terminalOutput}>{entry.output}</pre>
                                            )}
                                        </div>
                                    ))}
                                    <div className={styles.terminalInputLine}>
                                        <span className={styles.terminalPrompt}>user@startcode:{currentDir === '/home/user' ? '~' : currentDir}$</span>
                                        <input
                                            type="text"
                                            value={terminalInput}
                                            onChange={(e) => setTerminalInput(e.target.value)}
                                            onKeyDown={handleTerminalCommand}
                                            className={styles.terminalInput}
                                            placeholder="Type a command..."
                                            autoFocus
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
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
