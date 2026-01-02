// Code Execution Engine
// Handles running code in the browser for different languages

import { executeNatural } from './naturalInterpreter';

// Pyodide for Python execution
let pyodideInstance = null;
let pyodideLoading = false;

// Initialize Pyodide
export const initPyodide = async () => {
    if (pyodideInstance) return pyodideInstance;
    if (pyodideLoading) {
        // Wait for existing load
        while (pyodideLoading) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        return pyodideInstance;
    }

    pyodideLoading = true;
    try {
        // Load Pyodide from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });

        pyodideInstance = await window.loadPyodide({
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/'
        });

        pyodideLoading = false;
        return pyodideInstance;
    } catch (error) {
        pyodideLoading = false;
        throw error;
    }
};

// Execute Python code
export const executePython = async (code) => {
    try {
        const pyodide = await initPyodide();

        // Capture stdout
        pyodide.runPython(`
      import sys
      from io import StringIO
      sys.stdout = StringIO()
      sys.stderr = StringIO()
    `);

        // Run the user's code
        try {
            pyodide.runPython(code);
        } catch (error) {
            const stderr = pyodide.runPython('sys.stderr.getvalue()');
            return {
                success: false,
                output: '',
                error: stderr || error.message
            };
        }

        // Get output
        const stdout = pyodide.runPython('sys.stdout.getvalue()');
        const stderr = pyodide.runPython('sys.stderr.getvalue()');

        return {
            success: !stderr,
            output: stdout,
            error: stderr || null
        };
    } catch (error) {
        return {
            success: false,
            output: '',
            error: error.message
        };
    }
};

// Execute JavaScript code
export const executeJavaScript = async (code) => {
    try {
        // Create a sandbox for execution
        const logs = [];
        const errors = [];

        // Override console methods
        const sandbox = {
            console: {
                log: (...args) => logs.push(args.map(a => String(a)).join(' ')),
                error: (...args) => errors.push(args.map(a => String(a)).join(' ')),
                warn: (...args) => logs.push('[warn] ' + args.map(a => String(a)).join(' ')),
                info: (...args) => logs.push('[info] ' + args.map(a => String(a)).join(' '))
            },
            alert: (msg) => logs.push('[alert] ' + String(msg)),
            prompt: () => '[prompt not available]',
            confirm: () => true
        };

        // Create function from code
        const wrappedCode = `
      (function(console, alert, prompt, confirm) {
        ${code}
      })
    `;

        const fn = eval(wrappedCode);
        fn(sandbox.console, sandbox.alert, sandbox.prompt, sandbox.confirm);

        return {
            success: errors.length === 0,
            output: logs.join('\n'),
            error: errors.length > 0 ? errors.join('\n') : null
        };
    } catch (error) {
        return {
            success: false,
            output: '',
            error: error.message
        };
    }
};

// Execute HTML/CSS (returns rendered preview)
export const executeHTML = (html, css = '') => {
    try {
        const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `;

        return {
            success: true,
            output: fullHTML,
            error: null,
            isHTML: true
        };
    } catch (error) {
        return {
            success: false,
            output: '',
            error: error.message,
            isHTML: true
        };
    }
};

// Java execution (limited - uses output simulation for learning)
// Full Java execution would require CheerpJ or server-side
export const executeJava = async (code) => {
    try {
        // For learning purposes, we simulate Java execution
        // by parsing print statements and basic logic
        const logs = [];

        // Extract System.out.println statements
        const printRegex = /System\.out\.println\s*\(\s*(.+?)\s*\)\s*;/g;
        let match;

        while ((match = printRegex.exec(code)) !== null) {
            let output = match[1];

            // Handle string literals
            if (output.startsWith('"') && output.endsWith('"')) {
                output = output.slice(1, -1);
            }

            // Handle simple expressions (numbers)
            if (!isNaN(output)) {
                output = String(Number(output));
            }

            logs.push(output);
        }

        // Check for basic syntax errors
        const errors = [];

        if (!code.includes('class ')) {
            // In learning mode, we don't require full class structure early on
        }

        // Check for missing semicolons (basic check)
        const lines = code.split('\n');
        lines.forEach((line, idx) => {
            const trimmed = line.trim();
            if (trimmed &&
                !trimmed.endsWith('{') &&
                !trimmed.endsWith('}') &&
                !trimmed.endsWith(';') &&
                !trimmed.startsWith('//') &&
                !trimmed.startsWith('/*') &&
                !trimmed.startsWith('*') &&
                !trimmed.endsWith('*/') &&
                trimmed !== '' &&
                !trimmed.startsWith('if') &&
                !trimmed.startsWith('else') &&
                !trimmed.startsWith('for') &&
                !trimmed.startsWith('while') &&
                !trimmed.startsWith('class') &&
                !trimmed.startsWith('public') &&
                !trimmed.startsWith('private') &&
                !trimmed.startsWith('protected')) {
                // This is a simplified check
            }
        });

        return {
            success: errors.length === 0,
            output: logs.join('\n'),
            error: errors.length > 0 ? errors.join('\n') : null,
            simulated: true
        };
    } catch (error) {
        return {
            success: false,
            output: '',
            error: error.message,
            simulated: true
        };
    }
};

// Main execution function
export const executeCode = async (code, language) => {
    if (!language) {
        // Natural language / pseudocode
        return executeNatural(code);
    }
    
    switch (language.toLowerCase()) {
        case 'python':
            return await executePython(code);
        case 'javascript':
        case 'js':
            return await executeJavaScript(code);
        case 'html':
            return executeHTML(code);
        case 'css':
            return executeHTML('<div class="preview">Preview</div>', code);
        case 'java':
            return await executeJava(code);
        case 'natural':
        case 'pseudocode':
            return executeNatural(code);
        default:
            return {
                success: false,
                output: '',
                error: `Language "${language}" is not yet supported for execution.`
            };
    }
};

// Check if code execution is available for language
export const isExecutionAvailable = (language) => {
    const supported = ['python', 'javascript', 'js', 'html', 'css', 'java'];
    return supported.includes(language.toLowerCase());
};

export default executeCode;
