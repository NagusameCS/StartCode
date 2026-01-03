#!/usr/bin/env node
/**
 * Natural Language Exercise Converter
 * 
 * This script converts code exercises to use natural language syntax
 * for beginner-friendly learning experiences.
 * 
 * Usage: node scripts/convertToNatural.js [--dry-run] [--course=<courseId>]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Natural language templates for different languages
const templates = {
    // Python exercises
    python: {
        displayText: (text) => ({
            prompt: `Display the message "${text}"`,
            type: 'code',
            language: 'natural',
            expectedOutput: text,
            hint: `Use: display "${text}"`
        }),
        displayVariable: (varName, value) => ({
            prompt: `Create a variable called "${varName}" with value ${JSON.stringify(value)} and display it`,
            type: 'code',
            language: 'natural',
            expectedOutput: String(value),
            hint: `create variable ${varName} to ${JSON.stringify(value)}\\ndisplay ${varName}`
        }),
        createVariable: (varName, value) => ({
            prompt: `Create a variable called "${varName}" set to ${JSON.stringify(value)}`,
            type: 'code',
            language: 'natural',
            expectedOutput: '',
            hint: `Use: create variable ${varName} to ${JSON.stringify(value)}`
        }),
        conditionalSimple: (condition, trueResult, falseResult) => ({
            prompt: `Write code that displays "${trueResult}" if condition is true, otherwise "${falseResult}"`,
            type: 'code',
            language: 'natural',
            hint: `if ${condition} then\\n    display "${trueResult}"\\notherwise\\n    display "${falseResult}"\\nend if`
        }),
        loop: (times, action) => ({
            prompt: `Display "${action}" ${times} times using a loop`,
            type: 'code',
            language: 'natural',
            expectedOutput: Array(times).fill(action).join('\\n'),
            hint: `repeat ${times} times\\n    display "${action}"\\nend repeat`
        }),
        function: (name, params, body) => ({
            prompt: `Define a function called "${name}" ${params.length ? `with parameters ${params.join(', ')}` : 'with no parameters'}`,
            type: 'code',
            language: 'natural',
            hint: params.length 
                ? `define function ${name} with parameters ${params.join(', ')}\\n    ${body}\\nend function`
                : `define function ${name} with no parameters\\n    ${body}\\nend function`
        })
    },

    // JavaScript exercises  
    javascript: {
        displayText: (text) => ({
            prompt: `Display the message "${text}"`,
            type: 'code',
            language: 'natural',
            expectedOutput: text,
            hint: `Use: display "${text}"`
        }),
        displayVariable: (varName, value) => ({
            prompt: `Create a variable called "${varName}" with value ${JSON.stringify(value)} and display it`,
            type: 'code',
            language: 'natural',
            expectedOutput: String(value),
            hint: `create variable ${varName} to ${JSON.stringify(value)}\\ndisplay ${varName}`
        }),
        createVariable: (varName, value) => ({
            prompt: `Create a variable called "${varName}" set to ${JSON.stringify(value)}`,
            type: 'code',
            language: 'natural',
            expectedOutput: '',
            hint: `Use: create variable ${varName} to ${JSON.stringify(value)}`
        }),
        loop: (times, action) => ({
            prompt: `Display "${action}" ${times} times using a loop`,
            type: 'code',
            language: 'natural',
            expectedOutput: Array(times).fill(action).join('\\n'),
            hint: `repeat ${times} times\\n    display "${action}"\\nend loop`
        })
    },

    // Java exercises
    java: {
        displayText: (text) => ({
            prompt: `Display the message "${text}"`,
            type: 'code',
            language: 'natural',
            expectedOutput: text,
            hint: `Use: display "${text}" end display`
        }),
        createVariable: (type, varName, value) => ({
            prompt: `Create a ${type} variable called "${varName}" set to ${JSON.stringify(value)}`,
            type: 'code',
            language: 'natural',
            hint: `Use: create ${type} variable ${varName} to ${JSON.stringify(value)}`
        })
    },

    // HTML exercises (structure-based)
    html: {
        heading: (level, text) => ({
            prompt: `Create a level ${level} heading with text "${text}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: heading level ${level} "${text}" end heading ${level}`
        }),
        paragraph: (text) => ({
            prompt: `Create a paragraph with text "${text}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: paragraph "${text}" end paragraph`
        }),
        link: (url, text) => ({
            prompt: `Create a link to "${url}" with text "${text}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: link to "${url}" with text "${text}" end link`
        }),
        image: (src, alt) => ({
            prompt: `Add an image from "${src}" with description "${alt}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: image from "${src}" with description "${alt}"`
        }),
        list: (items) => ({
            prompt: `Create an unordered list with items: ${items.join(', ')}`,
            type: 'code',
            language: 'natural',
            hint: `unordered list\\n${items.map(i => `    item "${i}" end item`).join('\\n')}\\nend list`
        })
    },

    // CSS exercises (style-based)
    css: {
        styleProperty: (selector, property, value) => ({
            prompt: `Style ${selector} to have ${property} of ${value}`,
            type: 'code',
            language: 'natural',
            hint: `style ${selector}\\n    ${property} is "${value}"\\nend style`
        }),
        multipleStyles: (selector, styles) => ({
            prompt: `Style ${selector} with multiple properties`,
            type: 'code',
            language: 'natural',
            hint: `style ${selector}\\n${Object.entries(styles).map(([k,v]) => `    ${k} is "${v}"`).join('\\n')}\\nend style`
        })
    },

    // SQL exercises
    sql: {
        selectAll: (table) => ({
            prompt: `Get all records from the "${table}" table`,
            type: 'code',
            language: 'natural',
            hint: `Use: get all from ${table}`
        }),
        selectWhere: (table, condition) => ({
            prompt: `Get all records from "${table}" where ${condition}`,
            type: 'code',
            language: 'natural',
            hint: `Use: get all from ${table} where ${condition}`
        }),
        insert: (table, values) => ({
            prompt: `Add a new record to "${table}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: add to ${table} values ${values}`
        }),
        count: (table) => ({
            prompt: `Count all records in "${table}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: count rows in ${table}`
        })
    },

    // Bash/Terminal exercises
    bash: {
        echo: (text) => ({
            prompt: `Display the message "${text}"`,
            type: 'code',
            language: 'natural',
            expectedOutput: text,
            hint: `Use: display "${text}"`
        }),
        variable: (name, value) => ({
            prompt: `Create a variable ${name} with value "${value}"`,
            type: 'code',
            language: 'natural',
            hint: `Use: create variable ${name} to "${value}"`
        })
    },

    // Generic templates for any language
    generic: {
        displayText: (text) => ({
            prompt: `Display the message "${text}"`,
            type: 'code',
            language: 'natural',
            expectedOutput: text,
            hint: `Use: display "${text}"`
        }),
        displayVariable: (varName, value) => ({
            prompt: `Create a variable "${varName}" with value ${JSON.stringify(value)} and display it`,
            type: 'code',
            language: 'natural',
            expectedOutput: String(value),
            hint: `create variable ${varName} to ${JSON.stringify(value)}\\ndisplay ${varName}`
        }),
        createVariable: (varName, value) => ({
            prompt: `Create a variable "${varName}" set to ${JSON.stringify(value)}`,
            type: 'code',
            language: 'natural',
            hint: `Use: create variable ${varName} to ${JSON.stringify(value)}`
        }),
        conditional: () => ({
            prompt: 'Write a conditional statement',
            type: 'code',
            language: 'natural',
            hint: 'if condition then\\n    action\\nend if'
        }),
        loop: (times) => ({
            prompt: `Repeat an action ${times} times`,
            type: 'code',
            language: 'natural',
            hint: `repeat ${times} times\\n    action\\nend repeat`
        })
    }
};

/**
 * Determine if an exercise can be converted to natural language
 */
function canConvertToNatural(exercise, courseLanguage) {
    // Already natural
    if (exercise.language === 'natural') return false;
    
    // Multiple choice doesn't need conversion
    if (exercise.type === 'multiple-choice') return false;
    
    // Terminal commands stay as-is
    if (exercise.type === 'terminal') return false;
    
    // Code exercises can be converted
    if (exercise.type === 'code') {
        // Check if language is supported
        const supportedLanguages = ['python', 'javascript', 'java', 'html', 'css', 'sql', 'bash', 'ruby', 'php'];
        return supportedLanguages.includes(courseLanguage) || supportedLanguages.includes(exercise.language);
    }
    
    return false;
}

/**
 * Convert a single exercise to natural language
 */
function convertExercise(exercise, courseLanguage) {
    const lang = exercise.language || courseLanguage;
    const langTemplates = templates[lang] || templates.generic;
    
    // Analyze the prompt to determine what type of exercise it is
    const prompt = exercise.prompt.toLowerCase();
    
    // Display/Print exercises
    if (prompt.includes('display') || prompt.includes('print') || prompt.includes('output') || prompt.includes('show')) {
        // Extract what to display
        const textMatch = exercise.prompt.match(/"([^"]+)"/);
        if (textMatch) {
            const converted = langTemplates.displayText?.(textMatch[1]) || templates.generic.displayText(textMatch[1]);
            return { ...converted, prompt: exercise.prompt };
        }
    }
    
    // Variable exercises
    if (prompt.includes('variable') || prompt.includes('create') || prompt.includes('store')) {
        return {
            ...exercise,
            language: 'natural',
            hint: exercise.hint || 'Use: create variable name to value'
        };
    }
    
    // Conditional exercises
    if (prompt.includes('if ') || prompt.includes('condition') || prompt.includes('check')) {
        return {
            ...exercise,
            language: 'natural',
            hint: exercise.hint || 'Use: if condition then ... end if'
        };
    }
    
    // Loop exercises
    if (prompt.includes('loop') || prompt.includes('repeat') || prompt.includes('times') || prompt.includes('iterate')) {
        return {
            ...exercise,
            language: 'natural',
            hint: exercise.hint || 'Use: repeat N times ... end repeat'
        };
    }
    
    // Function exercises
    if (prompt.includes('function') || prompt.includes('define') || prompt.includes('method')) {
        return {
            ...exercise,
            language: 'natural',
            hint: exercise.hint || 'Use: define function name with parameters ... end function'
        };
    }
    
    // Default: just add natural language marker
    return {
        ...exercise,
        language: 'natural',
        hint: exercise.hint || `Write in natural language syntax`
    };
}

/**
 * Process a course file and convert exercises
 */
function processFile(filePath, dryRun = false) {
    console.log(`Processing: ${filePath}`);
    
    let content = fs.readFileSync(filePath, 'utf-8');
    let convertedCount = 0;
    let skippedCount = 0;
    
    // Find all exercises in the file
    // This is a simplified approach - in reality we'd parse the JS properly
    
    // Pattern to find code exercises without language: 'natural'
    const exercisePattern = /(\{[^}]*type:\s*['"]code['"][^}]*\})/g;
    
    const matches = content.match(exercisePattern) || [];
    console.log(`Found ${matches.length} potential code exercises`);
    
    // For each match, check if it already has language: 'natural'
    for (const match of matches) {
        if (!match.includes("language: 'natural'") && !match.includes('language: "natural"')) {
            // This exercise could be converted
            if (!dryRun) {
                // Add language: 'natural' after type: 'code'
                const updated = match.replace(
                    /(type:\s*['"]code['"])/,
                    "$1,\n                        language: 'natural'"
                );
                content = content.replace(match, updated);
                convertedCount++;
            } else {
                convertedCount++;
            }
        } else {
            skippedCount++;
        }
    }
    
    if (!dryRun && convertedCount > 0) {
        fs.writeFileSync(filePath, content);
    }
    
    console.log(`  Converted: ${convertedCount}, Already natural: ${skippedCount}`);
    return { converted: convertedCount, skipped: skippedCount };
}

// Main execution
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const courseArg = args.find(a => a.startsWith('--course='));
const targetCourse = courseArg ? courseArg.split('=')[1] : null;

console.log('Natural Language Exercise Converter');
console.log('====================================');
console.log(`Mode: ${dryRun ? 'DRY RUN' : 'LIVE'}`);
if (targetCourse) console.log(`Target course: ${targetCourse}`);
console.log('');

const dataDir = path.join(__dirname, '..', 'src', 'data');
const files = ['courses.js', 'additionalCourses.js'];

let totalConverted = 0;
let totalSkipped = 0;

for (const file of files) {
    const filePath = path.join(dataDir, file);
    if (fs.existsSync(filePath)) {
        const result = processFile(filePath, dryRun);
        totalConverted += result.converted;
        totalSkipped += result.skipped;
    }
}

console.log('');
console.log('Summary');
console.log('-------');
console.log(`Total exercises converted: ${totalConverted}`);
console.log(`Total already natural: ${totalSkipped}`);

if (dryRun) {
    console.log('');
    console.log('This was a dry run. Run without --dry-run to apply changes.');
}
