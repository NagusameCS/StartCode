// Natural Language Mapping for All Programming Languages
// Maps common programming constructs to natural language equivalents

export const naturalLanguagePatterns = {
    // Python mappings
    python: {
        patterns: [
            { code: /print\((.*?)\)/g, natural: 'display $1' },
            { code: /input\((.*?)\)/g, natural: 'get input $1' },
            { code: /if (.*?):/g, natural: 'if $1 then' },
            { code: /elif (.*?):/g, natural: 'else if $1 then' },
            { code: /else:/g, natural: 'else' },
            { code: /for (.*?) in (.*?):/g, natural: 'for each $1 in $2 do' },
            { code: /while (.*?):/g, natural: 'while $1 do' },
            { code: /def (.*?)\((.*?)\):/g, natural: 'create function $1 with $2' },
            { code: /return (.*)/g, natural: 'return $1' },
            { code: /class (.*?):/g, natural: 'create class $1' },
            { code: /import (.*)/g, natural: 'import $1' },
            { code: /from (.*?) import (.*)/g, natural: 'from $1 import $2' },
            { code: /len\((.*?)\)/g, natural: 'length of $1' },
            { code: /range\((.*?)\)/g, natural: 'range $1' },
            { code: /append\((.*?)\)/g, natural: 'add $1' },
        ],
        keywords: {
            'print': 'display',
            'input': 'get input',
            'if': 'if',
            'else': 'else',
            'elif': 'else if',
            'for': 'for each',
            'while': 'while',
            'def': 'create function',
            'return': 'return',
            'class': 'create class',
            'import': 'import',
            'True': 'true',
            'False': 'false',
            'None': 'nothing',
            'and': 'and',
            'or': 'or',
            'not': 'not',
            'in': 'in',
            'is': 'is',
        }
    },

    // JavaScript mappings
    javascript: {
        patterns: [
            { code: /console\.log\((.*?)\)/g, natural: 'display $1' },
            { code: /alert\((.*?)\)/g, natural: 'show alert $1' },
            { code: /prompt\((.*?)\)/g, natural: 'get input $1' },
            { code: /if\s*\((.*?)\)\s*\{/g, natural: 'if $1 then' },
            { code: /else\s*if\s*\((.*?)\)\s*\{/g, natural: 'else if $1 then' },
            { code: /else\s*\{/g, natural: 'else' },
            { code: /for\s*\((.*?)\)\s*\{/g, natural: 'for $1 do' },
            { code: /while\s*\((.*?)\)\s*\{/g, natural: 'while $1 do' },
            { code: /function\s+(.*?)\((.*?)\)\s*\{/g, natural: 'create function $1 with $2' },
            { code: /const\s+(.*?)\s*=/g, natural: 'create constant $1 as' },
            { code: /let\s+(.*?)\s*=/g, natural: 'create variable $1 as' },
            { code: /var\s+(.*?)\s*=/g, natural: 'create variable $1 as' },
            { code: /return\s+(.*)/g, natural: 'return $1' },
            { code: /class\s+(.*?)\s*\{/g, natural: 'create class $1' },
        ],
        keywords: {
            'console.log': 'display',
            'alert': 'show alert',
            'prompt': 'get input',
            'if': 'if',
            'else': 'else',
            'for': 'for',
            'while': 'while',
            'function': 'create function',
            'return': 'return',
            'true': 'true',
            'false': 'false',
            'null': 'nothing',
            'undefined': 'nothing',
        }
    },

    // Java mappings
    java: {
        patterns: [
            { code: /System\.out\.println\((.*?)\)/g, natural: 'display $1' },
            { code: /System\.out\.print\((.*?)\)/g, natural: 'display $1 without newline' },
            { code: /Scanner.*?\.nextLine\(\)/g, natural: 'get input line' },
            { code: /Scanner.*?\.nextInt\(\)/g, natural: 'get input number' },
            { code: /if\s*\((.*?)\)\s*\{/g, natural: 'if $1 then' },
            { code: /else\s*if\s*\((.*?)\)\s*\{/g, natural: 'else if $1 then' },
            { code: /else\s*\{/g, natural: 'else' },
            { code: /for\s*\((.*?)\)\s*\{/g, natural: 'for $1 do' },
            { code: /while\s*\((.*?)\)\s*\{/g, natural: 'while $1 do' },
            { code: /public\s+static\s+void\s+(.*?)\((.*?)\)\s*\{/g, natural: 'create function $1 with $2' },
            { code: /return\s+(.*);/g, natural: 'return $1' },
            { code: /class\s+(.*?)\s*\{/g, natural: 'create class $1' },
            { code: /int\s+(.*?)\s*=/g, natural: 'create number variable $1 as' },
            { code: /String\s+(.*?)\s*=/g, natural: 'create text variable $1 as' },
            { code: /boolean\s+(.*?)\s*=/g, natural: 'create boolean variable $1 as' },
        ],
        keywords: {
            'System.out.println': 'display',
            'System.out.print': 'display without newline',
            'if': 'if',
            'else': 'else',
            'for': 'for',
            'while': 'while',
            'return': 'return',
            'true': 'true',
            'false': 'false',
            'null': 'nothing',
        }
    },

    // C++ mappings
    cpp: {
        patterns: [
            { code: /std::cout\s*<<\s*(.*?)\s*<<\s*std::endl/g, natural: 'display $1' },
            { code: /std::cout\s*<<\s*(.*)/g, natural: 'display $1' },
            { code: /std::cin\s*>>\s*(.*)/g, natural: 'get input into $1' },
            { code: /if\s*\((.*?)\)\s*\{/g, natural: 'if $1 then' },
            { code: /else\s*if\s*\((.*?)\)\s*\{/g, natural: 'else if $1 then' },
            { code: /else\s*\{/g, natural: 'else' },
            { code: /for\s*\((.*?)\)\s*\{/g, natural: 'for $1 do' },
            { code: /while\s*\((.*?)\)\s*\{/g, natural: 'while $1 do' },
            { code: /int\s+(.*?)\s*=/g, natural: 'create number variable $1 as' },
            { code: /string\s+(.*?)\s*=/g, natural: 'create text variable $1 as' },
            { code: /bool\s+(.*?)\s*=/g, natural: 'create boolean variable $1 as' },
        ],
        keywords: {
            'std::cout': 'display',
            'std::cin': 'get input',
            'if': 'if',
            'else': 'else',
            'for': 'for',
            'while': 'while',
            'return': 'return',
            'true': 'true',
            'false': 'false',
            'nullptr': 'nothing',
        }
    },

    // Natural language (identity mapping)
    natural: {
        patterns: [],
        keywords: {}
    }
};

// Convert code to natural language
export function codeToNatural(code, language) {
    if (!language || language === 'natural') return code;
    
    const langPatterns = naturalLanguagePatterns[language];
    if (!langPatterns) return code;

    let natural = code;
    
    // Apply pattern replacements
    for (const pattern of langPatterns.patterns) {
        natural = natural.replace(pattern.code, pattern.natural);
    }

    return natural.trim();
}

// Convert natural language to code
export function naturalToCode(natural, language) {
    if (!language || language === 'natural') return natural;
    
    const langPatterns = naturalLanguagePatterns[language];
    if (!langPatterns) return natural;

    let code = natural;
    
    // Reverse pattern replacements
    for (const pattern of langPatterns.patterns) {
        // This is a simplified reverse - real implementation would be more sophisticated
        code = code.replace(new RegExp(pattern.natural.replace(/\$\d+/g, '(.+?)'), 'g'), pattern.code);
    }

    return code.trim();
}

// Check if exercise should use natural language
export function shouldUseNaturalLanguage(exercise, lessonStage) {
    // Use natural language for early stage lessons (1-2)
    if (lessonStage <= 2) return true;
    
    // Use natural language for specific exercise types
    if (exercise.type === 'code' && exercise.language === 'natural') return true;
    
    // Check if the code is simple enough for natural language
    if (exercise.expectedOutput) {
        const lines = exercise.expectedOutput.split('\n').length;
        const complexity = exercise.expectedOutput.length;
        
        // Simple, short code snippets are good candidates
        if (lines <= 3 && complexity < 100) return true;
    }
    
    return false;
}

export default {
    naturalLanguagePatterns,
    codeToNatural,
    naturalToCode,
    shouldUseNaturalLanguage
};
