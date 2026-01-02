// Natural Language to Code Transpiler Engine
// This is the core engine that converts natural language syntax to actual code
// and vice versa based on the progression stage

// Stage 1: Full natural language
// Stage 2: Partial natural language (operators become symbols)
// Stage 3: Code-like (structure becomes code-like)
// Stage 4: Full code

export const STAGES = {
    NATURAL: 1,
    PARTIAL: 2,
    CODELIKE: 3,
    FULL: 4
};

// Language-specific transformation rules
export const transformations = {
    // JavaScript transformations
    javascript: {
        // Operators
        operators: {
            ' is less than ': ' < ',
            ' is greater than ': ' > ',
            ' is less than or equal to ': ' <= ',
            ' is greater than or equal to ': ' >= ',
            ' is equal to ': ' === ',
            ' is not equal to ': ' !== ',
            ' equals ': ' = ',
            ' plus ': ' + ',
            ' minus ': ' - ',
            ' times ': ' * ',
            ' multiplied by ': ' * ',
            ' divided by ': ' / ',
            ' modulo ': ' % ',
            ' remainder of ': ' % ',
            ' and ': ' && ',
            ' or ': ' || ',
            ' not ': '!'
        },
        // Keywords and structures
        keywords: {
            'if ': 'if (',
            ' then': ') {',
            'otherwise if ': '} else if (',
            'otherwise': '} else {',
            'end if': '}',
            'repeat while ': 'while (',
            ' do': ') {',
            'end repeat': '}',
            'repeat ': 'for (let i = 0; i < ',
            ' times': '; i++) {',
            'end loop': '}',
            'for each ': 'for (const ',
            ' in list ': ' of ',
            'define function ': 'function ',
            ' with parameters ': '(',
            ' with no parameters': '()',
            'end function': '}',
            'return ': 'return ',
            'create variable ': 'let ',
            'create constant ': 'const ',
            'set ': '',
            ' to ': ' = ',
            'display ': 'console.log(',
            'show ': 'console.log(',
            'print ': 'console.log(',
            'end display': ')',
            'end show': ')',
            'end print': ')',
            'true value': 'true',
            'false value': 'false',
            'nothing': 'null',
            'undefined value': 'undefined',
            'empty text': '""',
            'new line': '\\n'
        },
        // Data structures
        structures: {
            'create list with ': '[',
            'end list': ']',
            'create object with ': '{',
            'end object': '}',
            'key ': '',
            ' value ': ': ',
            'get item ': '[',
            ' from ': '',
            'end get': ']'
        }
    },

    // Python transformations
    python: {
        operators: {
            ' is less than ': ' < ',
            ' is greater than ': ' > ',
            ' is less than or equal to ': ' <= ',
            ' is greater than or equal to ': ' >= ',
            ' is equal to ': ' == ',
            ' is not equal to ': ' != ',
            ' equals ': ' = ',
            ' plus ': ' + ',
            ' minus ': ' - ',
            ' times ': ' * ',
            ' multiplied by ': ' * ',
            ' divided by ': ' / ',
            ' integer divided by ': ' // ',
            ' modulo ': ' % ',
            ' remainder of ': ' % ',
            ' and ': ' and ',
            ' or ': ' or ',
            ' not ': 'not '
        },
        keywords: {
            'if ': 'if ',
            ' then': ':',
            'otherwise if ': 'elif ',
            'otherwise': 'else:',
            'end if': '',
            'repeat while ': 'while ',
            ' do': ':',
            'end repeat': '',
            'repeat ': 'for i in range(',
            ' times': '):',
            'end loop': '',
            'for each ': 'for ',
            ' in list ': ' in ',
            'define function ': 'def ',
            ' with parameters ': '(',
            ' with no parameters': '():',
            'end function': '',
            'return ': 'return ',
            'create variable ': '',
            'set ': '',
            ' to ': ' = ',
            'display ': 'print(',
            'show ': 'print(',
            'print ': 'print(',
            'end display': ')',
            'end show': ')',
            'end print': ')',
            'true value': 'True',
            'false value': 'False',
            'nothing': 'None',
            'empty text': '""',
            'new line': '\\n'
        },
        structures: {
            'create list with ': '[',
            'end list': ']',
            'create dictionary with ': '{',
            'end dictionary': '}',
            'key ': '',
            ' value ': ': ',
            'get item ': '[',
            ' from ': '',
            'end get': ']'
        }
    },

    // Java transformations
    java: {
        operators: {
            ' is less than ': ' < ',
            ' is greater than ': ' > ',
            ' is less than or equal to ': ' <= ',
            ' is greater than or equal to ': ' >= ',
            ' is equal to ': ' == ',
            ' is not equal to ': ' != ',
            ' equals ': ' = ',
            ' plus ': ' + ',
            ' minus ': ' - ',
            ' times ': ' * ',
            ' multiplied by ': ' * ',
            ' divided by ': ' / ',
            ' modulo ': ' % ',
            ' remainder of ': ' % ',
            ' and ': ' && ',
            ' or ': ' || ',
            ' not ': '!'
        },
        keywords: {
            'if ': 'if (',
            ' then': ') {',
            'otherwise if ': '} else if (',
            'otherwise': '} else {',
            'end if': '}',
            'repeat while ': 'while (',
            ' do': ') {',
            'end repeat': '}',
            'repeat ': 'for (int i = 0; i < ',
            ' times': '; i++) {',
            'end loop': '}',
            'for each ': 'for (var ',
            ' in list ': ' : ',
            'define function ': 'public static void ',
            'define function returning number ': 'public static int ',
            'define function returning text ': 'public static String ',
            ' with parameters ': '(',
            ' with no parameters': '()',
            'end function': '}',
            'return ': 'return ',
            'create number variable ': 'int ',
            'create decimal variable ': 'double ',
            'create text variable ': 'String ',
            'create boolean variable ': 'boolean ',
            'set ': '',
            ' to ': ' = ',
            'display ': 'System.out.println(',
            'show ': 'System.out.println(',
            'print ': 'System.out.println(',
            'end display': ');',
            'end show': ');',
            'end print': ');',
            'true value': 'true',
            'false value': 'false',
            'nothing': 'null',
            'empty text': '""',
            'new line': '\\n',
            'end statement': ';'
        },
        structures: {
            'create array with ': 'new int[]{',
            'end array': '}',
            'create list with ': 'Arrays.asList(',
            'end list': ')',
            'get item ': '[',
            ' from ': '',
            'end get': ']'
        }
    },

    // HTML transformations
    html: {
        operators: {},
        keywords: {
            'begin document': '<!DOCTYPE html>\n<html>',
            'end document': '</html>',
            'begin head section': '<head>',
            'end head section': '</head>',
            'begin body section': '<body>',
            'end body section': '</body>',
            'page title is ': '<title>',
            'end title': '</title>',
            'heading level 1 ': '<h1>',
            'end heading 1': '</h1>',
            'heading level 2 ': '<h2>',
            'end heading 2': '</h2>',
            'heading level 3 ': '<h3>',
            'end heading 3': '</h3>',
            'paragraph ': '<p>',
            'end paragraph': '</p>',
            'line break': '<br>',
            'horizontal line': '<hr>',
            'begin link to ': '<a href="',
            ' with text ': '">',
            'end link': '</a>',
            'image from ': '<img src="',
            ' with description ': '" alt="',
            'end image': '">',
            'begin unordered list': '<ul>',
            'end unordered list': '</ul>',
            'begin ordered list': '<ol>',
            'end ordered list': '</ol>',
            'list item ': '<li>',
            'end list item': '</li>',
            'begin division': '<div>',
            'begin division with class ': '<div class="',
            'end class': '">',
            'end division': '</div>',
            'begin span': '<span>',
            'end span': '</span>',
            'begin section': '<section>',
            'end section': '</section>',
            'begin navigation': '<nav>',
            'end navigation': '</nav>',
            'begin header': '<header>',
            'end header': '</header>',
            'begin footer': '<footer>',
            'end footer': '</footer>',
            'begin form': '<form>',
            'end form': '</form>',
            'text input named ': '<input type="text" name="',
            'password input named ': '<input type="password" name="',
            'submit button with text ': '<button type="submit">',
            'end button': '</button>',
            'end input': '">'
        },
        structures: {}
    },

    // CSS transformations
    css: {
        operators: {},
        keywords: {
            'style for ': '',
            ' starts': ' {',
            'end style': '}',
            'background color is ': 'background-color: ',
            'text color is ': 'color: ',
            'font size is ': 'font-size: ',
            'font family is ': 'font-family: ',
            'font weight is ': 'font-weight: ',
            'width is ': 'width: ',
            'height is ': 'height: ',
            'margin is ': 'margin: ',
            'margin top is ': 'margin-top: ',
            'margin bottom is ': 'margin-bottom: ',
            'margin left is ': 'margin-left: ',
            'margin right is ': 'margin-right: ',
            'padding is ': 'padding: ',
            'padding top is ': 'padding-top: ',
            'padding bottom is ': 'padding-bottom: ',
            'padding left is ': 'padding-left: ',
            'padding right is ': 'padding-right: ',
            'border is ': 'border: ',
            'border radius is ': 'border-radius: ',
            'display as ': 'display: ',
            'position is ': 'position: ',
            'top is ': 'top: ',
            'bottom is ': 'bottom: ',
            'left is ': 'left: ',
            'right is ': 'right: ',
            'text align ': 'text-align: ',
            'center': 'center',
            'left': 'left',
            'right': 'right',
            'end property': ';',
            'pixels': 'px',
            'percent': '%',
            'bold': 'bold',
            'italic': 'italic',
            'block': 'block',
            'inline': 'inline',
            'flex': 'flex',
            'grid': 'grid'
        },
        structures: {}
    }
};

// Transpiler class
export class NaturalLangTranspiler {
    constructor(language, stage = STAGES.NATURAL) {
        this.language = language;
        this.stage = stage;
        this.rules = transformations[language] || {};
    }

    // Set the current stage
    setStage(stage) {
        this.stage = stage;
    }

    // Get rules to apply based on stage
    getActiveRules() {
        const rules = {};

        if (this.stage >= STAGES.NATURAL) {
            // Stage 1+: All transformations available (reverse for display)
        }

        if (this.stage >= STAGES.PARTIAL) {
            // Stage 2+: Operators become symbols
            Object.assign(rules, this.rules.operators || {});
        }

        if (this.stage >= STAGES.CODELIKE) {
            // Stage 3+: Keywords become code-like
            Object.assign(rules, this.rules.keywords || {});
        }

        if (this.stage >= STAGES.FULL) {
            // Stage 4: Full code including structures
            Object.assign(rules, this.rules.structures || {});
        }

        return rules;
    }

    // Convert natural language to code
    toCode(naturalText) {
        let code = naturalText;
        const rules = this.getActiveRules();

        // Apply transformations in order
        for (const [natural, codeEquiv] of Object.entries(rules)) {
            code = code.split(natural).join(codeEquiv);
        }

        return code;
    }

    // Convert code to natural language (for display in early stages)
    toNatural(code) {
        let natural = code;
        const rules = this.getActiveRules();

        // Reverse transformations
        for (const [naturalEquiv, codeEquiv] of Object.entries(rules)) {
            if (codeEquiv) {
                natural = natural.split(codeEquiv).join(naturalEquiv);
            }
        }

        return natural;
    }

    // Validate user input against expected natural language
    validate(userInput, expectedNatural) {
        // No tolerance for typos - exact match required
        const normalizedInput = userInput.trim().toLowerCase();
        const normalizedExpected = expectedNatural.trim().toLowerCase();

        return normalizedInput === normalizedExpected;
    }

    // Get expected keywords for current stage
    getExpectedKeywords() {
        const keywords = [];

        if (this.stage === STAGES.NATURAL) {
            // Return all natural language keywords
            keywords.push(...Object.keys(this.rules.operators || {}));
            keywords.push(...Object.keys(this.rules.keywords || {}));
            keywords.push(...Object.keys(this.rules.structures || {}));
        } else if (this.stage === STAGES.PARTIAL) {
            // Return natural keywords for non-operators
            keywords.push(...Object.keys(this.rules.keywords || {}));
            keywords.push(...Object.keys(this.rules.structures || {}));
            keywords.push(...Object.values(this.rules.operators || {}));
        } else if (this.stage === STAGES.CODELIKE) {
            // Return mostly code
            keywords.push(...Object.values(this.rules.operators || {}));
            keywords.push(...Object.values(this.rules.keywords || {}));
            keywords.push(...Object.keys(this.rules.structures || {}));
        } else {
            // Full code keywords
            keywords.push(...Object.values(this.rules.operators || {}));
            keywords.push(...Object.values(this.rules.keywords || {}));
            keywords.push(...Object.values(this.rules.structures || {}));
        }

        return [...new Set(keywords)].filter(k => k.trim());
    }

    // Get hint for a given construct
    getHint(construct) {
        const allRules = {
            ...this.rules.operators,
            ...this.rules.keywords,
            ...this.rules.structures
        };

        // Find matching rule
        for (const [natural, code] of Object.entries(allRules)) {
            if (natural.includes(construct) || code.includes(construct)) {
                if (this.stage === STAGES.NATURAL) {
                    return `Try using: ${natural.trim()}`;
                } else if (this.stage === STAGES.PARTIAL) {
                    if (this.rules.operators && natural in this.rules.operators) {
                        return `Use the symbol: ${code.trim()}`;
                    }
                    return `Try using: ${natural.trim()}`;
                } else {
                    return `In code this is: ${code.trim()}`;
                }
            }
        }

        return 'Think about what you want the computer to do, step by step.';
    }
}

// Create transpiler instance
export const createTranspiler = (language, stage) => {
    return new NaturalLangTranspiler(language, stage);
};

// Get available languages
export const getAvailableLanguages = () => {
    return Object.keys(transformations);
};

// Validate that a language is supported
export const isLanguageSupported = (language) => {
    return language in transformations;
};

export default NaturalLangTranspiler;
