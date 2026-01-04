// Import challenges from NagusameCS/404 repo into Firebase
// Run this once to seed the database with community challenges

import { db } from '../config/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';

// Challenges from https://github.com/NagusameCS/404/tree/main/Individual%20Questions%20(Easy%20Questions)
const CHALLENGES_404 = [
    {
        title: 'Alphabetical Sorter',
        description: 'Create a program that sorts a list of words alphabetically. This is a fundamental sorting challenge that tests your understanding of string comparison and sorting algorithms.',
        difficulty: 'easy',
        category: 'strings',
        starterCode: `function alphabeticalSort(words) {
    // Your code here
    // Sort the array of words alphabetically
    // Return the sorted array
}`,
        testCases: [
            { input: [['banana', 'apple', 'cherry']], expected: ['apple', 'banana', 'cherry'] },
            { input: [['zebra', 'ant', 'monkey']], expected: ['ant', 'monkey', 'zebra'] },
            { input: [['Dog', 'cat', 'Bird']], expected: ['Bird', 'Dog', 'cat'] },
            { input: [['a', 'A', 'b', 'B']], expected: ['A', 'B', 'a', 'b'] },
            { input: [['single']], expected: ['single'] }
        ],
        hints: [
            'JavaScript has a built-in sort() method for arrays',
            'String comparison uses lexicographical order by default',
            'Consider case sensitivity when sorting'
        ],
        constraints: {},
        tags: ['sorting', 'strings', 'arrays']
    },
    {
        title: 'Audio Frequency Analyzer',
        description: 'Analyze audio frequency data and identify patterns. Given an array of frequency values, determine characteristics like dominant frequency, average, and frequency range.',
        difficulty: 'medium',
        category: 'arrays',
        starterCode: `function analyzeFrequencies(frequencies) {
    // Your code here
    // Return an object with:
    // - dominant: the highest frequency value
    // - average: the average of all frequencies
    // - range: difference between max and min
}`,
        testCases: [
            {
                input: [[440, 880, 220, 660]],
                expected: { dominant: 880, average: 550, range: 660 }
            },
            {
                input: [[100, 200, 300, 400, 500]],
                expected: { dominant: 500, average: 300, range: 400 }
            },
            {
                input: [[1000]],
                expected: { dominant: 1000, average: 1000, range: 0 }
            }
        ],
        hints: [
            'Use Math.max() and Math.min() for finding extremes',
            'Calculate average by summing and dividing by length',
            'Range is simply max - min'
        ],
        constraints: {},
        tags: ['arrays', 'math', 'analysis']
    },
    {
        title: 'Caesar Cipher',
        description: 'Implement the classic Caesar cipher encryption algorithm. Shift each letter in the input string by a specified number of positions in the alphabet, wrapping around from Z to A.',
        difficulty: 'medium',
        category: 'strings',
        starterCode: `function caesarCipher(text, shift) {
    // Your code here
    // Shift each letter by 'shift' positions
    // Preserve case and non-letter characters
    // Return the encrypted string
}`,
        testCases: [
            { input: ['HELLO', 3], expected: 'KHOOR' },
            { input: ['abc', 1], expected: 'bcd' },
            { input: ['XYZ', 3], expected: 'ABC' },
            { input: ['Hello, World!', 5], expected: 'Mjqqt, Btwqi!' },
            { input: ['Test', 26], expected: 'Test' },
            { input: ['Cipher', -3], expected: 'Zfmebo' }
        ],
        hints: [
            'Use charCodeAt() to get ASCII values',
            'A-Z are codes 65-90, a-z are codes 97-122',
            'Use modulo (%) for wrapping around the alphabet',
            'Preserve non-letter characters unchanged'
        ],
        constraints: {},
        tags: ['strings', 'encryption', 'algorithms']
    },
    {
        title: 'Card Sorting',
        description: 'Sort a deck of playing cards. Cards have a suit (Hearts, Diamonds, Clubs, Spades) and a value (2-10, J, Q, K, A). Sort them first by suit, then by value within each suit.',
        difficulty: 'medium',
        category: 'sorting',
        starterCode: `function sortCards(cards) {
    // Your code here
    // cards is an array of objects: { suit: 'Hearts', value: 'A' }
    // Sort by suit order: Clubs, Diamonds, Hearts, Spades
    // Then by value: 2-10, J, Q, K, A
    // Return sorted array
}`,
        testCases: [
            {
                input: [[
                    { suit: 'Hearts', value: 'K' },
                    { suit: 'Hearts', value: '2' },
                    { suit: 'Clubs', value: 'A' }
                ]],
                expected: [
                    { suit: 'Clubs', value: 'A' },
                    { suit: 'Hearts', value: '2' },
                    { suit: 'Hearts', value: 'K' }
                ]
            },
            {
                input: [[
                    { suit: 'Spades', value: '10' },
                    { suit: 'Diamonds', value: 'J' },
                    { suit: 'Spades', value: '2' }
                ]],
                expected: [
                    { suit: 'Diamonds', value: 'J' },
                    { suit: 'Spades', value: '2' },
                    { suit: 'Spades', value: '10' }
                ]
            }
        ],
        hints: [
            'Create an order mapping for suits and values',
            'Use a custom comparator function with sort()',
            'Compare suits first, then values if suits match'
        ],
        constraints: {},
        tags: ['sorting', 'objects', 'comparators']
    },
    {
        title: 'Credit Card Checker',
        description: 'Validate credit card numbers using the Luhn algorithm. This algorithm is used to validate various identification numbers including credit cards.',
        difficulty: 'medium',
        category: 'algorithms',
        starterCode: `function validateCard(cardNumber) {
    // Your code here
    // Implement the Luhn algorithm:
    // 1. Double every second digit from right to left
    // 2. If doubling results in > 9, subtract 9
    // 3. Sum all digits
    // 4. Valid if sum is divisible by 10
    // Return true if valid, false otherwise
}`,
        testCases: [
            { input: ['4539148803436467'], expected: true },
            { input: ['4539148803436468'], expected: false },
            { input: ['79927398713'], expected: true },
            { input: ['79927398714'], expected: false },
            { input: ['0'], expected: true }
        ],
        hints: [
            'Convert the string to an array of digits',
            'Work from right to left, doubling every second digit',
            'If a doubled digit is > 9, subtract 9',
            'Check if the total sum is divisible by 10'
        ],
        constraints: {},
        tags: ['algorithms', 'validation', 'math']
    },
    {
        title: 'Deobfuscating Programs',
        description: 'Write a function that cleans up obfuscated code by identifying and extracting meaningful variable names, function names, and strings from messy code.',
        difficulty: 'hard',
        category: 'strings',
        starterCode: `function deobfuscate(code) {
    // Your code here
    // Extract all identifiers (variable/function names)
    // Extract all string literals
    // Return an object with:
    // - identifiers: array of unique identifiers
    // - strings: array of string literals found
}`,
        testCases: [
            {
                input: ['var _0x1a2b = "hello"; function _0xabcd() { return _0x1a2b; }'],
                expected: {
                    identifiers: ['_0x1a2b', '_0xabcd'],
                    strings: ['hello']
                }
            },
            {
                input: ['const x = "test"; const y = "demo";'],
                expected: {
                    identifiers: ['x', 'y'],
                    strings: ['test', 'demo']
                }
            }
        ],
        hints: [
            'Use regular expressions to match patterns',
            'Identifiers typically match [a-zA-Z_$][a-zA-Z0-9_$]*',
            'String literals are enclosed in quotes',
            'Be careful to avoid keywords like var, const, function'
        ],
        constraints: {},
        tags: ['strings', 'regex', 'parsing']
    },
    {
        title: 'Interpreting Programs',
        description: 'Build a simple interpreter that can execute basic arithmetic expressions. Support addition, subtraction, multiplication, and division with proper operator precedence.',
        difficulty: 'hard',
        category: 'algorithms',
        starterCode: `function interpret(expression) {
    // Your code here
    // Parse and evaluate the arithmetic expression
    // Support +, -, *, / with proper precedence
    // Support parentheses for grouping
    // Return the numeric result
}`,
        testCases: [
            { input: ['2 + 3'], expected: 5 },
            { input: ['10 - 4 * 2'], expected: 2 },
            { input: ['(2 + 3) * 4'], expected: 20 },
            { input: ['20 / 4 + 3'], expected: 8 },
            { input: ['((2 + 3) * (4 - 1))'], expected: 15 }
        ],
        hints: [
            'Consider using the Shunting Yard algorithm',
            'Handle operator precedence: * and / before + and -',
            'Process parentheses recursively or with a stack',
            'Tokenize the input first, then evaluate'
        ],
        constraints: {},
        tags: ['algorithms', 'parsing', 'interpreter']
    },
    {
        title: 'JSON Verifier',
        description: 'Create a function that validates whether a string is valid JSON. Check for proper syntax including matching brackets, valid string escapes, and correct value types.',
        difficulty: 'medium',
        category: 'strings',
        starterCode: `function verifyJSON(jsonString) {
    // Your code here
    // Validate if the string is valid JSON
    // Return { valid: true/false, error: null or error message }
}`,
        testCases: [
            {
                input: ['{"name": "John", "age": 30}'],
                expected: { valid: true, error: null }
            },
            {
                input: ['{"name": "John",}'],
                expected: { valid: false, error: 'Unexpected token' }
            },
            {
                input: ['[1, 2, 3]'],
                expected: { valid: true, error: null }
            },
            {
                input: ['{"key": undefined}'],
                expected: { valid: false, error: 'Unexpected token' }
            }
        ],
        hints: [
            'You can use try-catch with JSON.parse()',
            'For custom validation, check bracket matching',
            'Valid JSON values: string, number, object, array, true, false, null',
            'Trailing commas are not allowed in JSON'
        ],
        constraints: {},
        tags: ['strings', 'validation', 'json']
    },
    {
        title: 'Scheduling Optimizer',
        description: 'Given a list of tasks with start times, end times, and priorities, find the optimal schedule that maximizes the total priority of non-overlapping tasks.',
        difficulty: 'hard',
        category: 'algorithms',
        starterCode: `function optimizeSchedule(tasks) {
    // Your code here
    // tasks is an array of { id, start, end, priority }
    // Find non-overlapping tasks that maximize total priority
    // Return array of task ids in the optimal schedule
}`,
        testCases: [
            {
                input: [[
                    { id: 1, start: 0, end: 3, priority: 5 },
                    { id: 2, start: 2, end: 5, priority: 6 },
                    { id: 3, start: 4, end: 6, priority: 5 }
                ]],
                expected: [1, 3]
            },
            {
                input: [[
                    { id: 1, start: 0, end: 2, priority: 10 },
                    { id: 2, start: 1, end: 3, priority: 5 }
                ]],
                expected: [1]
            }
        ],
        hints: [
            'This is a weighted job scheduling problem',
            'Consider using dynamic programming',
            'Sort tasks by end time first',
            'For each task, decide whether to include it or not'
        ],
        constraints: {},
        tags: ['algorithms', 'dynamic-programming', 'optimization']
    },
    {
        title: 'Solitaire Solver',
        description: 'Implement logic to determine if a simplified solitaire game state is solvable. Given a deck arrangement, check if all cards can be successfully moved to foundation piles.',
        difficulty: 'hard',
        category: 'algorithms',
        starterCode: `function isSolvable(tableau, stock) {
    // Your code here
    // tableau: array of card stacks (arrays)
    // stock: remaining cards in draw pile
    // Simplified rules: cards stack in descending order, alternating colors
    // Return true if the game can be won, false otherwise
}`,
        testCases: [
            {
                input: [
                    [['RK', 'BQ', 'RJ'], ['B10']],
                    ['R9', 'B8']
                ],
                expected: true
            },
            {
                input: [
                    [['RK'], ['RQ']],
                    []
                ],
                expected: false
            }
        ],
        hints: [
            'Red cards go on black, black on red',
            'Cards must be placed in descending order',
            'Consider using backtracking to explore moves',
            'Track which cards have been moved to foundations'
        ],
        constraints: {},
        tags: ['algorithms', 'backtracking', 'games']
    }
];

// Function to import challenges to Firebase
export async function importChallengesFromRepo() {
    const results = {
        success: [],
        skipped: [],
        errors: []
    };

    for (const challenge of CHALLENGES_404) {
        try {
            // Check if challenge already exists (by title and author)
            const existingQuery = query(
                collection(db, 'userChallenges'),
                where('title', '==', challenge.title),
                where('authorName', '==', 'NagusameCS')
            );
            const existing = await getDocs(existingQuery);

            if (!existing.empty) {
                results.skipped.push(challenge.title);
                console.log(`Skipped (already exists): ${challenge.title}`);
                continue;
            }

            // Add to Firebase
            await addDoc(collection(db, 'userChallenges'), {
                ...challenge,
                authorId: 'github:NagusameCS',
                authorName: 'NagusameCS',
                sourceRepo: 'https://github.com/NagusameCS/404',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                plays: 0,
                completions: 0,
                likes: 0,
                likedBy: [],
                status: 'published',
                featured: true, // Mark as featured since these are curated
                isImported: true
            });

            results.success.push(challenge.title);
            console.log(`Imported: ${challenge.title}`);
        } catch (error) {
            results.errors.push({ title: challenge.title, error: error.message });
            console.error(`Error importing ${challenge.title}:`, error);
        }
    }

    return results;
}

// Export the challenges data for reference
export { CHALLENGES_404 };
