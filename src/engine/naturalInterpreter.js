// Natural Language Interpreter
// Executes pseudocode written in natural language syntax

export class NaturalInterpreter {
    constructor() {
        this.variables = {};
        this.functions = {};
        this.output = [];
    }

    reset() {
        this.variables = {};
        this.functions = {};
        this.output = [];
    }

    execute(code) {
        this.reset();
        const lines = code.split('\n').map(l => l.trim()).filter(l => l);
        
        try {
            this.executeLines(lines, 0, lines.length);
            return {
                success: true,
                output: this.output.join('\n'),
                error: null
            };
        } catch (error) {
            return {
                success: false,
                output: this.output.join('\n'),
                error: error.message
            };
        }
    }

    executeLines(lines, start, end) {
        let i = start;
        while (i < end) {
            const line = lines[i];
            const result = this.executeLine(line, lines, i, end);
            if (result.skip) {
                i = result.skip;
            } else {
                i++;
            }
        }
    }

    executeLine(line, allLines, currentIndex, endIndex) {
        const lower = line.toLowerCase();

        // Variable creation: create variable X to Y
        if (lower.startsWith('create variable ')) {
            return this.handleVariableCreation(line);
        }

        // Set variable: set X to Y
        if (lower.startsWith('set ')) {
            return this.handleSetVariable(line);
        }

        // Display: display X
        if (lower.startsWith('display ') || lower.startsWith('show ') || lower.startsWith('print ')) {
            return this.handleDisplay(line);
        }

        // If statement
        if (lower.startsWith('if ')) {
            return this.handleIf(line, allLines, currentIndex, endIndex);
        }

        // Repeat N times
        if (lower.startsWith('repeat ') && lower.includes(' times')) {
            return this.handleRepeatTimes(line, allLines, currentIndex, endIndex);
        }

        // Repeat while
        if (lower.startsWith('repeat while ')) {
            return this.handleRepeatWhile(line, allLines, currentIndex, endIndex);
        }

        // For each
        if (lower.startsWith('for each ')) {
            return this.handleForEach(line, allLines, currentIndex, endIndex);
        }

        // Function definition
        if (lower.startsWith('define function ')) {
            return this.handleFunctionDefinition(line, allLines, currentIndex, endIndex);
        }

        // Function call (simple, just the function name)
        if (this.functions[lower.trim()]) {
            this.executeFunction(lower.trim());
            return {};
        }

        // End statements (handled by their parent blocks)
        if (lower === 'end if' || lower === 'end loop' || lower === 'end repeat' || lower === 'end function') {
            return {};
        }

        // Otherwise handled by if
        if (lower === 'otherwise') {
            return {};
        }

        return {};
    }

    handleVariableCreation(line) {
        // create variable X to Y
        // create variable X to create list with ... end list
        const match = line.match(/create variable (\w+) to (.+)/i);
        if (match) {
            const varName = match[1];
            const valueStr = match[2];
            this.variables[varName] = this.evaluateExpression(valueStr);
        }
        return {};
    }

    handleSetVariable(line) {
        // set X to Y
        const match = line.match(/set (\w+) to (.+)/i);
        if (match) {
            const varName = match[1];
            const valueStr = match[2];
            this.variables[varName] = this.evaluateExpression(valueStr);
        }
        return {};
    }

    handleDisplay(line) {
        // display X or display "text" or display X plus Y
        let content = line.replace(/^(display|show|print)\s+/i, '');
        const value = this.evaluateExpression(content);
        this.output.push(String(value));
        return {};
    }

    handleIf(line, allLines, currentIndex, endIndex) {
        // if <condition> then
        const conditionMatch = line.match(/if (.+) then/i);
        if (!conditionMatch) return {};

        const condition = this.evaluateCondition(conditionMatch[1]);
        
        // Find end if, otherwise
        let ifEnd = -1;
        let otherwiseIndex = -1;
        let depth = 1;
        
        for (let i = currentIndex + 1; i < endIndex; i++) {
            const l = allLines[i].toLowerCase().trim();
            if (l.startsWith('if ') && l.includes(' then')) depth++;
            if (l === 'end if') {
                depth--;
                if (depth === 0) {
                    ifEnd = i;
                    break;
                }
            }
            if (depth === 1 && l === 'otherwise') {
                otherwiseIndex = i;
            }
        }

        if (condition) {
            // Execute if block
            const blockEnd = otherwiseIndex > -1 ? otherwiseIndex : ifEnd;
            this.executeLines(allLines, currentIndex + 1, blockEnd);
        } else if (otherwiseIndex > -1) {
            // Execute otherwise block
            this.executeLines(allLines, otherwiseIndex + 1, ifEnd);
        }

        return { skip: ifEnd + 1 };
    }

    handleRepeatTimes(line, allLines, currentIndex, endIndex) {
        // repeat N times
        const match = line.match(/repeat (\d+) times/i);
        if (!match) return {};

        const times = parseInt(match[1]);
        
        // Find end loop
        let loopEnd = -1;
        let depth = 1;
        
        for (let i = currentIndex + 1; i < endIndex; i++) {
            const l = allLines[i].toLowerCase().trim();
            if (l.startsWith('repeat ')) depth++;
            if (l === 'end loop' || l === 'end repeat') {
                depth--;
                if (depth === 0) {
                    loopEnd = i;
                    break;
                }
            }
        }

        for (let t = 0; t < times; t++) {
            this.executeLines(allLines, currentIndex + 1, loopEnd);
        }

        return { skip: loopEnd + 1 };
    }

    handleRepeatWhile(line, allLines, currentIndex, endIndex) {
        // repeat while <condition> do
        const match = line.match(/repeat while (.+) do/i);
        if (!match) return {};

        // Find end repeat
        let loopEnd = -1;
        let depth = 1;
        
        for (let i = currentIndex + 1; i < endIndex; i++) {
            const l = allLines[i].toLowerCase().trim();
            if (l.startsWith('repeat ')) depth++;
            if (l === 'end loop' || l === 'end repeat') {
                depth--;
                if (depth === 0) {
                    loopEnd = i;
                    break;
                }
            }
        }

        let iterations = 0;
        const maxIterations = 1000; // Safety limit
        
        while (this.evaluateCondition(match[1]) && iterations < maxIterations) {
            this.executeLines(allLines, currentIndex + 1, loopEnd);
            iterations++;
        }

        return { skip: loopEnd + 1 };
    }

    handleForEach(line, allLines, currentIndex, endIndex) {
        // for each X in list Y do
        const match = line.match(/for each (\w+) in list (\w+) do/i);
        if (!match) return {};

        const itemVar = match[1];
        const listVar = match[2];
        const list = this.variables[listVar];

        if (!Array.isArray(list)) return {};

        // Find end loop
        let loopEnd = -1;
        let depth = 1;
        
        for (let i = currentIndex + 1; i < endIndex; i++) {
            const l = allLines[i].toLowerCase().trim();
            if (l.startsWith('for each ') || l.startsWith('repeat ')) depth++;
            if (l === 'end loop' || l === 'end repeat') {
                depth--;
                if (depth === 0) {
                    loopEnd = i;
                    break;
                }
            }
        }

        for (const item of list) {
            this.variables[itemVar] = item;
            this.executeLines(allLines, currentIndex + 1, loopEnd);
        }

        return { skip: loopEnd + 1 };
    }

    handleFunctionDefinition(line, allLines, currentIndex, endIndex) {
        // define function X with no parameters
        // define function X with parameters a, b
        const match = line.match(/define function (\w+)/i);
        if (!match) return {};

        const funcName = match[1].toLowerCase();

        // Find end function
        let funcEnd = -1;
        let depth = 1;
        
        for (let i = currentIndex + 1; i < endIndex; i++) {
            const l = allLines[i].toLowerCase().trim();
            if (l.startsWith('define function ')) depth++;
            if (l === 'end function') {
                depth--;
                if (depth === 0) {
                    funcEnd = i;
                    break;
                }
            }
        }

        // Store function body
        this.functions[funcName] = {
            start: currentIndex + 1,
            end: funcEnd,
            lines: allLines.slice(currentIndex + 1, funcEnd)
        };

        return { skip: funcEnd + 1 };
    }

    executeFunction(funcName) {
        const func = this.functions[funcName];
        if (func) {
            this.executeLines(func.lines, 0, func.lines.length);
        }
    }

    evaluateExpression(expr) {
        expr = expr.trim();

        // List creation: create list with "a", "b", "c" end list
        if (expr.toLowerCase().startsWith('create list with ')) {
            const listContent = expr.replace(/create list with /i, '').replace(/ end list$/i, '');
            return this.parseListItems(listContent);
        }

        // Get item from list: get item 0 from X end get
        const getMatch = expr.match(/get item (\d+) from (\w+) end get/i);
        if (getMatch) {
            const index = parseInt(getMatch[1]);
            const list = this.variables[getMatch[2]];
            if (Array.isArray(list)) {
                return list[index];
            }
        }

        // String concatenation: X plus Y
        if (expr.includes(' plus ')) {
            const parts = expr.split(' plus ');
            const values = parts.map(p => this.evaluateExpression(p.trim()));
            // If any is string, concat; otherwise add
            if (values.some(v => typeof v === 'string')) {
                return values.join('');
            }
            return values.reduce((a, b) => a + b, 0);
        }

        // Arithmetic: X minus Y
        if (expr.includes(' minus ')) {
            const parts = expr.split(' minus ');
            const left = this.evaluateExpression(parts[0].trim());
            const right = this.evaluateExpression(parts[1].trim());
            return left - right;
        }

        // String literal
        if ((expr.startsWith('"') && expr.endsWith('"')) || (expr.startsWith("'") && expr.endsWith("'"))) {
            return expr.slice(1, -1);
        }

        // Number
        if (!isNaN(expr)) {
            return parseFloat(expr);
        }

        // Boolean
        if (expr.toLowerCase() === 'true value' || expr.toLowerCase() === 'true') return true;
        if (expr.toLowerCase() === 'false value' || expr.toLowerCase() === 'false') return false;

        // Variable
        if (this.variables.hasOwnProperty(expr)) {
            return this.variables[expr];
        }

        return expr;
    }

    parseListItems(content) {
        const items = [];
        let current = '';
        let inString = false;
        let stringChar = '';

        for (let i = 0; i < content.length; i++) {
            const char = content[i];
            
            if ((char === '"' || char === "'") && !inString) {
                inString = true;
                stringChar = char;
                current += char;
            } else if (char === stringChar && inString) {
                inString = false;
                current += char;
            } else if (char === ',' && !inString) {
                if (current.trim()) {
                    items.push(this.evaluateExpression(current.trim()));
                }
                current = '';
            } else {
                current += char;
            }
        }
        
        if (current.trim()) {
            items.push(this.evaluateExpression(current.trim()));
        }

        return items;
    }

    evaluateCondition(condition) {
        condition = condition.trim();

        // is less than
        if (condition.includes(' is less than ')) {
            const [left, right] = condition.split(' is less than ');
            return this.evaluateExpression(left.trim()) < this.evaluateExpression(right.trim());
        }

        // is greater than
        if (condition.includes(' is greater than ')) {
            const [left, right] = condition.split(' is greater than ');
            return this.evaluateExpression(left.trim()) > this.evaluateExpression(right.trim());
        }

        // is less than or equal to
        if (condition.includes(' is less than or equal to ')) {
            const [left, right] = condition.split(' is less than or equal to ');
            return this.evaluateExpression(left.trim()) <= this.evaluateExpression(right.trim());
        }

        // is greater than or equal to
        if (condition.includes(' is greater than or equal to ')) {
            const [left, right] = condition.split(' is greater than or equal to ');
            return this.evaluateExpression(left.trim()) >= this.evaluateExpression(right.trim());
        }

        // is equal to
        if (condition.includes(' is equal to ')) {
            const [left, right] = condition.split(' is equal to ');
            return this.evaluateExpression(left.trim()) === this.evaluateExpression(right.trim());
        }

        // is not equal to
        if (condition.includes(' is not equal to ')) {
            const [left, right] = condition.split(' is not equal to ');
            return this.evaluateExpression(left.trim()) !== this.evaluateExpression(right.trim());
        }

        // AND
        if (condition.includes(' and ')) {
            const [left, right] = condition.split(' and ');
            return this.evaluateCondition(left.trim()) && this.evaluateCondition(right.trim());
        }

        // OR
        if (condition.includes(' or ')) {
            const [left, right] = condition.split(' or ');
            return this.evaluateCondition(left.trim()) || this.evaluateCondition(right.trim());
        }

        // Simple boolean
        const val = this.evaluateExpression(condition);
        return Boolean(val);
    }
}

// Execute natural language code
export const executeNatural = (code) => {
    const interpreter = new NaturalInterpreter();
    return interpreter.execute(code);
};

export default NaturalInterpreter;
