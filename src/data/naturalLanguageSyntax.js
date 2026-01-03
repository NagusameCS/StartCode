// Natural Language Syntax Definitions
// Provides natural language equivalents for each programming language
// Used to create beginner-friendly exercises across all courses

/**
 * Each language has:
 * - display: How to show output
 * - variable: How to create/set variables
 * - conditional: If/else structures
 * - loops: Repeat/for structures
 * - functions: Function definitions
 * - operators: Math and comparison operators
 * - dataTypes: Language-specific types
 * - comments: How to add comments
 */

export const naturalLanguageSyntax = {
    // Python - uses natural language extensively
    python: {
        display: {
            natural: 'display "text"',
            real: 'print("text")',
            naturalWithVar: 'display variable_name',
            realWithVar: 'print(variable_name)'
        },
        variable: {
            create: 'create variable name to value',
            set: 'set name to value',
            realCreate: 'name = value',
            realSet: 'name = value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if condition:',
            realElif: 'elif condition:',
            realElse: 'else:',
            realEndif: ''
        },
        loops: {
            repeat: 'repeat N times',
            endRepeat: 'end repeat',
            while: 'repeat while condition do',
            endWhile: 'end repeat',
            forEach: 'for each item in list items do',
            endForEach: 'end for each',
            realRepeat: 'for i in range(N):',
            realWhile: 'while condition:',
            realForEach: 'for item in items:'
        },
        functions: {
            define: 'define function name with parameters param1, param2',
            defineNoParams: 'define function name with no parameters',
            endFunction: 'end function',
            return: 'return value',
            call: 'call function name with arguments arg1, arg2',
            realDefine: 'def name(param1, param2):',
            realReturn: 'return value'
        },
        operators: {
            plus: 'plus',
            minus: 'minus',
            times: 'times',
            dividedBy: 'divided by',
            equals: 'is equal to',
            notEquals: 'is not equal to',
            lessThan: 'is less than',
            greaterThan: 'is greater than',
            and: 'and',
            or: 'or',
            not: 'not'
        },
        dataTypes: {
            number: 'number',
            text: 'text (string)',
            boolean: 'true value / false value',
            list: 'list',
            nothing: 'nothing (None)'
        },
        input: {
            natural: 'ask user for input',
            real: 'input("prompt")'
        }
    },

    // JavaScript - web programming
    javascript: {
        display: {
            natural: 'display "text"',
            real: 'console.log("text")',
            naturalWithVar: 'display variable_name',
            realWithVar: 'console.log(variable_name)'
        },
        variable: {
            create: 'create variable name to value',
            createConst: 'create constant name to value',
            set: 'set name to value',
            realCreate: 'let name = value;',
            realCreateConst: 'const name = value;',
            realSet: 'name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} else if (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            endRepeat: 'end loop',
            while: 'repeat while condition do',
            endWhile: 'end repeat',
            forEach: 'for each item in list items do',
            endForEach: 'end for each',
            realRepeat: 'for (let i = 0; i < N; i++) {',
            realWhile: 'while (condition) {',
            realForEach: 'for (const item of items) {'
        },
        functions: {
            define: 'define function name with parameters param1, param2',
            defineNoParams: 'define function name with no parameters',
            endFunction: 'end function',
            return: 'return value',
            call: 'call function name with arguments arg1, arg2',
            realDefine: 'function name(param1, param2) {',
            realReturn: 'return value;'
        },
        operators: {
            plus: 'plus',
            minus: 'minus',
            times: 'times',
            dividedBy: 'divided by',
            equals: 'is equal to',
            notEquals: 'is not equal to',
            lessThan: 'is less than',
            greaterThan: 'is greater than',
            and: 'and',
            or: 'or',
            not: 'not'
        },
        dataTypes: {
            number: 'number',
            text: 'text (string)',
            boolean: 'true value / false value',
            array: 'list (array)',
            object: 'object',
            nothing: 'nothing (null)',
            undefined: 'undefined value'
        },
        input: {
            natural: 'ask user for input',
            real: 'prompt("question")'
        }
    },

    // Java - statically typed
    java: {
        display: {
            natural: 'display "text"',
            real: 'System.out.println("text");',
            naturalWithVar: 'display variable_name',
            realWithVar: 'System.out.println(variable_name);'
        },
        variable: {
            createNumber: 'create number variable name to value',
            createText: 'create text variable name to value',
            createBoolean: 'create boolean variable name to value',
            createDecimal: 'create decimal variable name to value',
            set: 'set name to value',
            realCreateNumber: 'int name = value;',
            realCreateText: 'String name = value;',
            realCreateBoolean: 'boolean name = value;',
            realCreateDecimal: 'double name = value;',
            realSet: 'name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} else if (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            endRepeat: 'end loop',
            while: 'repeat while condition do',
            endWhile: 'end repeat',
            forEach: 'for each item in list items do',
            endForEach: 'end for each',
            realRepeat: 'for (int i = 0; i < N; i++) {',
            realWhile: 'while (condition) {',
            realForEach: 'for (Type item : items) {'
        },
        functions: {
            define: 'define function name with parameters param1, param2',
            defineNoParams: 'define function name with no parameters',
            endFunction: 'end function',
            return: 'return value',
            realDefine: 'public static void name(int param1, String param2) {',
            realReturn: 'return value;'
        },
        operators: {
            plus: 'plus',
            minus: 'minus',
            times: 'times',
            dividedBy: 'divided by',
            equals: 'is equal to',
            notEquals: 'is not equal to',
            lessThan: 'is less than',
            greaterThan: 'is greater than',
            and: 'and',
            or: 'or',
            not: 'not'
        },
        dataTypes: {
            int: 'whole number (int)',
            double: 'decimal number (double)',
            String: 'text (String)',
            boolean: 'true/false (boolean)',
            array: 'array',
            nothing: 'nothing (null)'
        },
        input: {
            natural: 'read input from user',
            real: 'Scanner scanner = new Scanner(System.in); scanner.nextLine();'
        }
    },

    // HTML - markup language
    html: {
        display: {
            natural: 'paragraph "text" end paragraph',
            real: '<p>text</p>'
        },
        elements: {
            heading1: 'heading level 1 "text" end heading 1',
            heading2: 'heading level 2 "text" end heading 2',
            paragraph: 'paragraph "text" end paragraph',
            link: 'link to "url" with text "label" end link',
            image: 'image from "source" with description "alt"',
            list: 'unordered list item "text" end item end list',
            orderedList: 'ordered list item "text" end item end list',
            div: 'container end container',
            span: 'inline text "text" end inline',
            realHeading1: '<h1>text</h1>',
            realHeading2: '<h2>text</h2>',
            realParagraph: '<p>text</p>',
            realLink: '<a href="url">label</a>',
            realImage: '<img src="source" alt="alt">',
            realList: '<ul><li>text</li></ul>',
            realOrderedList: '<ol><li>text</li></ol>',
            realDiv: '<div></div>',
            realSpan: '<span>text</span>'
        },
        structure: {
            document: 'begin document',
            endDocument: 'end document',
            head: 'begin head section',
            endHead: 'end head section',
            body: 'begin body section',
            endBody: 'end body section',
            title: 'page title is "text"',
            realDocument: '<!DOCTYPE html><html>',
            realEndDocument: '</html>',
            realHead: '<head>',
            realEndHead: '</head>',
            realBody: '<body>',
            realEndBody: '</body>',
            realTitle: '<title>text</title>'
        }
    },

    // CSS - styling
    css: {
        selectors: {
            element: 'style element',
            class: 'style class "name"',
            id: 'style id "name"',
            realElement: 'element { }',
            realClass: '.name { }',
            realId: '#name { }'
        },
        properties: {
            color: 'text color is "value"',
            backgroundColor: 'background color is "value"',
            fontSize: 'text size is "value"',
            margin: 'outer spacing is "value"',
            padding: 'inner spacing is "value"',
            border: 'border is "value"',
            width: 'width is "value"',
            height: 'height is "value"',
            realColor: 'color: value;',
            realBackgroundColor: 'background-color: value;',
            realFontSize: 'font-size: value;',
            realMargin: 'margin: value;',
            realPadding: 'padding: value;',
            realBorder: 'border: value;',
            realWidth: 'width: value;',
            realHeight: 'height: value;'
        }
    },

    // C++ - systems programming
    cpp: {
        display: {
            natural: 'display "text"',
            real: 'std::cout << "text" << std::endl;',
            naturalWithVar: 'display variable_name',
            realWithVar: 'std::cout << variable_name << std::endl;'
        },
        variable: {
            createInt: 'create number variable name to value',
            createDouble: 'create decimal variable name to value',
            createString: 'create text variable name to value',
            createBool: 'create boolean variable name to value',
            set: 'set name to value',
            realCreateInt: 'int name = value;',
            realCreateDouble: 'double name = value;',
            realCreateString: 'std::string name = value;',
            realCreateBool: 'bool name = value;',
            realSet: 'name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} else if (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            while: 'repeat while condition do',
            forEach: 'for each item in collection do',
            realRepeat: 'for (int i = 0; i < N; i++) {',
            realWhile: 'while (condition) {',
            realForEach: 'for (auto& item : collection) {'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'void name(parameters) {',
            realReturn: 'return value;'
        },
        input: {
            natural: 'read input into variable',
            real: 'std::cin >> variable;'
        }
    },

    // Rust - safe systems programming
    rust: {
        display: {
            natural: 'display "text"',
            real: 'println!("text");',
            naturalWithVar: 'display variable_name',
            realWithVar: 'println!("{}", variable_name);'
        },
        variable: {
            create: 'create variable name to value',
            createMutable: 'create mutable variable name to value',
            set: 'set name to value',
            realCreate: 'let name = value;',
            realCreateMutable: 'let mut name = value;',
            realSet: 'name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if condition {',
            realElif: '} else if condition {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            while: 'repeat while condition do',
            forEach: 'for each item in collection do',
            realRepeat: 'for _ in 0..N {',
            realWhile: 'while condition {',
            realForEach: 'for item in collection {'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'fn name(parameters) {',
            realReturn: 'value'
        },
        dataTypes: {
            i32: 'whole number (i32)',
            f64: 'decimal (f64)',
            String: 'owned text (String)',
            str: 'text slice (&str)',
            bool: 'boolean',
            Vec: 'growable list (Vec)'
        }
    },

    // TypeScript - typed JavaScript
    typescript: {
        display: {
            natural: 'display "text"',
            real: 'console.log("text");',
            naturalWithVar: 'display variable_name',
            realWithVar: 'console.log(variable_name);'
        },
        variable: {
            create: 'create variable name of type Type to value',
            createConst: 'create constant name of type Type to value',
            set: 'set name to value',
            realCreate: 'let name: Type = value;',
            realCreateConst: 'const name: Type = value;',
            realSet: 'name = value;'
        },
        types: {
            number: 'number type',
            string: 'text type (string)',
            boolean: 'boolean type',
            array: 'list type (Type[])',
            object: 'object type ({ key: Type })',
            any: 'any type',
            void: 'no return (void)',
            interface: 'define shape interface Name'
        },
        functions: {
            define: 'define function name with typed parameters',
            return: 'return value',
            realDefine: 'function name(param: Type): ReturnType {',
            realReturn: 'return value;'
        }
    },

    // SQL - database queries
    sql: {
        queries: {
            select: 'get all from table',
            selectColumns: 'get columns from table',
            selectWhere: 'get all from table where condition',
            insert: 'add to table values data',
            update: 'change table set column to value where condition',
            delete: 'remove from table where condition',
            realSelect: 'SELECT * FROM table;',
            realSelectColumns: 'SELECT columns FROM table;',
            realSelectWhere: 'SELECT * FROM table WHERE condition;',
            realInsert: 'INSERT INTO table VALUES (data);',
            realUpdate: 'UPDATE table SET column = value WHERE condition;',
            realDelete: 'DELETE FROM table WHERE condition;'
        },
        joins: {
            innerJoin: 'combine table1 with table2 on matching column',
            leftJoin: 'combine table1 with table2 keeping all from table1',
            realInnerJoin: 'SELECT * FROM table1 INNER JOIN table2 ON table1.col = table2.col;',
            realLeftJoin: 'SELECT * FROM table1 LEFT JOIN table2 ON table1.col = table2.col;'
        },
        aggregate: {
            count: 'count rows in table',
            sum: 'total of column in table',
            average: 'average of column in table',
            max: 'maximum of column in table',
            min: 'minimum of column in table',
            realCount: 'SELECT COUNT(*) FROM table;',
            realSum: 'SELECT SUM(column) FROM table;',
            realAverage: 'SELECT AVG(column) FROM table;',
            realMax: 'SELECT MAX(column) FROM table;',
            realMin: 'SELECT MIN(column) FROM table;'
        }
    },

    // Ruby - elegant scripting
    ruby: {
        display: {
            natural: 'display "text"',
            real: 'puts "text"',
            naturalWithVar: 'display variable_name',
            realWithVar: 'puts variable_name'
        },
        variable: {
            create: 'create variable name to value',
            set: 'set name to value',
            realCreate: 'name = value',
            realSet: 'name = value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if condition',
            realElif: 'elsif condition',
            realElse: 'else',
            realEndif: 'end'
        },
        loops: {
            repeat: 'repeat N times',
            forEach: 'for each item in collection do',
            realRepeat: 'N.times do',
            realForEach: 'collection.each do |item|'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'def name(parameters)',
            realReturn: 'value'
        }
    },

    // PHP - web server scripting
    php: {
        display: {
            natural: 'display "text"',
            real: 'echo "text";',
            naturalWithVar: 'display $variable_name',
            realWithVar: 'echo $variable_name;'
        },
        variable: {
            create: 'create variable $name to value',
            set: 'set $name to value',
            realCreate: '$name = value;',
            realSet: '$name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} elseif (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            forEach: 'for each item in array as value do',
            realRepeat: 'for ($i = 0; $i < N; $i++) {',
            realForEach: 'foreach ($array as $value) {'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'function name($parameters) {',
            realReturn: 'return $value;'
        }
    },

    // Bash - shell scripting
    bash: {
        display: {
            natural: 'display "text"',
            real: 'echo "text"',
            naturalWithVar: 'display $variable',
            realWithVar: 'echo "$variable"'
        },
        variable: {
            create: 'create variable NAME to value',
            set: 'set NAME to value',
            realCreate: 'NAME=value',
            realSet: 'NAME=value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if [ condition ]; then',
            realElif: 'elif [ condition ]; then',
            realElse: 'else',
            realEndif: 'fi'
        },
        loops: {
            repeat: 'repeat for values in list do',
            while: 'repeat while condition do',
            realRepeat: 'for value in list; do',
            realWhile: 'while [ condition ]; do'
        },
        functions: {
            define: 'define function name',
            call: 'call name with arguments',
            realDefine: 'name() {',
            realCall: 'name arguments'
        }
    },

    // Swift - Apple development
    swift: {
        display: {
            natural: 'display "text"',
            real: 'print("text")',
            naturalWithVar: 'display variable_name',
            realWithVar: 'print(variable_name)'
        },
        variable: {
            create: 'create variable name to value',
            createConstant: 'create constant name to value',
            set: 'set name to value',
            realCreate: 'var name = value',
            realCreateConstant: 'let name = value',
            realSet: 'name = value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if condition {',
            realElif: '} else if condition {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            forEach: 'for each item in collection do',
            realRepeat: 'for _ in 0..<N {',
            realForEach: 'for item in collection {'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'func name(parameters) {',
            realReturn: 'return value'
        },
        optionals: {
            optional: 'value that might be nothing',
            unwrap: 'if value exists then use it',
            realOptional: 'Type?',
            realUnwrap: 'if let value = optional {'
        }
    },

    // C# - Microsoft development
    csharp: {
        display: {
            natural: 'display "text"',
            real: 'Console.WriteLine("text");',
            naturalWithVar: 'display variable_name',
            realWithVar: 'Console.WriteLine(variable_name);'
        },
        variable: {
            createInt: 'create number variable name to value',
            createString: 'create text variable name to value',
            createBool: 'create boolean variable name to value',
            createVar: 'create variable name to value',
            set: 'set name to value',
            realCreateInt: 'int name = value;',
            realCreateString: 'string name = value;',
            realCreateBool: 'bool name = value;',
            realCreateVar: 'var name = value;',
            realSet: 'name = value;'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} else if (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            forEach: 'for each item in collection do',
            realRepeat: 'for (int i = 0; i < N; i++) {',
            realForEach: 'foreach (var item in collection) {'
        },
        functions: {
            define: 'define function name with parameters',
            return: 'return value',
            realDefine: 'void Name(parameters) {',
            realReturn: 'return value;'
        }
    },

    // Go - concurrent programming
    go: {
        display: {
            natural: 'display "text"',
            real: 'fmt.Println("text")',
            naturalWithVar: 'display variable_name',
            realWithVar: 'fmt.Println(variable_name)'
        },
        variable: {
            create: 'create variable name to value',
            createShort: 'quick create name to value',
            set: 'set name to value',
            realCreate: 'var name Type = value',
            realCreateShort: 'name := value',
            realSet: 'name = value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if condition {',
            realElif: '} else if condition {',
            realElse: '} else {',
            realEndif: '}'
        },
        loops: {
            repeat: 'repeat N times',
            forEach: 'for each index, item in collection do',
            realRepeat: 'for i := 0; i < N; i++ {',
            realForEach: 'for i, item := range collection {'
        },
        functions: {
            define: 'define function name with parameters returning Type',
            return: 'return value',
            realDefine: 'func name(parameters) Type {',
            realReturn: 'return value'
        }
    },

    // Kotlin - modern JVM language
    kotlin: {
        display: {
            natural: 'display "text"',
            real: 'println("text")',
            naturalWithVar: 'display variable_name',
            realWithVar: 'println(variable_name)'
        },
        variable: {
            create: 'create mutable variable name to value',
            createConstant: 'create constant name to value',
            set: 'set name to value',
            realCreate: 'var name = value',
            realCreateConstant: 'val name = value',
            realSet: 'name = value'
        },
        conditional: {
            if: 'if condition then',
            elif: 'otherwise if condition then',
            else: 'otherwise',
            endif: 'end if',
            realIf: 'if (condition) {',
            realElif: '} else if (condition) {',
            realElse: '} else {',
            realEndif: '}'
        },
        functions: {
            define: 'define function name with parameters returning Type',
            return: 'return value',
            realDefine: 'fun name(parameters): Type {',
            realReturn: 'return value'
        }
    }
};

/**
 * Get natural language syntax for a specific language
 */
export const getSyntaxForLanguage = (language) => {
    return naturalLanguageSyntax[language] || null;
};

/**
 * Get all supported languages
 */
export const getSupportedLanguages = () => {
    return Object.keys(naturalLanguageSyntax);
};

/**
 * Check if a language has natural language support
 */
export const hasNaturalLanguageSupport = (language) => {
    return language in naturalLanguageSyntax;
};

/**
 * Generate a natural language example for displaying text
 */
export const generateDisplayExample = (language, text) => {
    const syntax = naturalLanguageSyntax[language];
    if (!syntax || !syntax.display) return null;

    return {
        natural: syntax.display.natural.replace('"text"', `"${text}"`),
        real: syntax.display.real.replace('"text"', `"${text}"`)
    };
};

/**
 * Generate a natural language example for creating a variable
 */
export const generateVariableExample = (language, name, value) => {
    const syntax = naturalLanguageSyntax[language];
    if (!syntax || !syntax.variable) return null;

    const create = syntax.variable.create || syntax.variable.createInt || Object.values(syntax.variable)[0];
    const real = syntax.variable.realCreate || syntax.variable.realCreateInt || Object.values(syntax.variable).find(v => v.includes('='));

    return {
        natural: create.replace('name', name).replace('value', value),
        real: real ? real.replace('name', name).replace('value', value) : null
    };
};

export default naturalLanguageSyntax;
