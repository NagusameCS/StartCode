// Comprehensive Challenge Database
// Categories: basics, math, strings, arrays, logic, algorithms, recursion, objects, sorting, searching

export const CATEGORIES = {
    basics: { name: 'Basics', icon: '📝', description: 'Fundamental programming concepts' },
    math: { name: 'Math', icon: '🔢', description: 'Mathematical operations and formulas' },
    strings: { name: 'Strings', icon: '📜', description: 'Text manipulation and processing' },
    arrays: { name: 'Arrays', icon: '📊', description: 'List and array operations' },
    logic: { name: 'Logic', icon: '🧠', description: 'Conditional logic and decision making' },
    algorithms: { name: 'Algorithms', icon: '⚙️', description: 'Classic algorithmic problems' },
    recursion: { name: 'Recursion', icon: '🔄', description: 'Recursive problem solving' },
    objects: { name: 'Objects', icon: '📦', description: 'Object manipulation' },
    sorting: { name: 'Sorting', icon: '📈', description: 'Sorting algorithms' },
    searching: { name: 'Searching', icon: '🔍', description: 'Search algorithms' }
};

export const DIFFICULTIES = {
    beginner: { name: 'Beginner', color: '#22c55e', icon: '🌱', points: 10 },
    intermediate: { name: 'Intermediate', color: '#f59e0b', icon: '🌿', points: 25 },
    advanced: { name: 'Advanced', color: '#ef4444', icon: '🔥', points: 50 },
    expert: { name: 'Expert', color: '#8b5cf6', icon: '⚡', points: 100 }
};

// Helper to generate test arrays
const range = (start, end) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const CHALLENGES = {
    // ==================== BASICS ====================
    'hello-world': {
        id: 'hello-world',
        title: 'Hello World',
        difficulty: 'beginner',
        category: 'basics',
        description: 'Write a function that returns "Hello, World!"',
        instructions: `Create a function called \`helloWorld\` that returns the string "Hello, World!"

This is the classic first program in any language!`,
        hints: ['Just return a string literal', 'Remember the exact capitalization and punctuation'],
        starterCode: {
            javascript: 'function helloWorld() {\n    // Return "Hello, World!"\n}',
            python: 'def hello_world():\n    # Return "Hello, World!"\n    pass',
            java: 'public class Solution {\n    public static String helloWorld() {\n        // Return "Hello, World!"\n        return "";\n    }\n}'
        },
        testFunction: 'helloWorld',
        tests: {
            visible: [
                { input: [], expected: 'Hello, World!', description: 'Should return "Hello, World!"' }
            ],
            hidden: []
        }
    },

    'double-number': {
        id: 'double-number',
        title: 'Double a Number',
        difficulty: 'beginner',
        category: 'basics',
        description: 'Write a function that doubles a number.',
        instructions: `Create a function called \`double\` that takes a number and returns it multiplied by 2.`,
        hints: ['Multiply the input by 2', 'Use the * operator'],
        starterCode: {
            javascript: 'function double(n) {\n    // Return n * 2\n}',
            python: 'def double(n):\n    # Return n * 2\n    pass',
            java: 'public class Solution {\n    public static int double_(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'double',
        tests: {
            visible: [
                { input: [5], expected: 10, description: 'double(5) = 10' },
                { input: [0], expected: 0, description: 'double(0) = 0' },
                { input: [-3], expected: -6, description: 'double(-3) = -6' },
                { input: [100], expected: 200, description: 'double(100) = 200' }
            ],
            hidden: [
                { input: [1], expected: 2 },
                { input: [50], expected: 100 },
                { input: [-100], expected: -200 },
                { input: [999], expected: 1998 }
            ]
        }
    },

    'is-positive': {
        id: 'is-positive',
        title: 'Is Positive?',
        difficulty: 'beginner',
        category: 'basics',
        description: 'Check if a number is positive.',
        instructions: `Create a function called \`isPositive\` that returns true if the number is greater than 0, false otherwise.`,
        hints: ['Use a comparison operator', 'n > 0 checks if positive'],
        starterCode: {
            javascript: 'function isPositive(n) {\n    // Return true if n > 0\n}',
            python: 'def is_positive(n):\n    # Return True if n > 0\n    pass',
            java: 'public class Solution {\n    public static boolean isPositive(int n) {\n        return false;\n    }\n}'
        },
        testFunction: 'isPositive',
        tests: {
            visible: [
                { input: [5], expected: true, description: 'isPositive(5) = true' },
                { input: [0], expected: false, description: 'isPositive(0) = false' },
                { input: [-3], expected: false, description: 'isPositive(-3) = false' },
                { input: [1], expected: true, description: 'isPositive(1) = true' }
            ],
            hidden: [
                { input: [100], expected: true },
                { input: [-1], expected: false },
                { input: [999], expected: true },
                { input: [-999], expected: false }
            ]
        }
    },

    // ==================== MATH ====================
    'sum-two-numbers': {
        id: 'sum-two-numbers',
        title: 'Sum Two Numbers',
        difficulty: 'beginner',
        category: 'math',
        description: 'Add two numbers together.',
        instructions: `Create a function called \`sum\` that takes two numbers and returns their sum.`,
        hints: ['Use the + operator', 'return a + b'],
        starterCode: {
            javascript: 'function sum(a, b) {\n    // Return a + b\n}',
            python: 'def sum(a, b):\n    # Return a + b\n    pass',
            java: 'public class Solution {\n    public static int sum(int a, int b) {\n        return 0;\n    }\n}'
        },
        testFunction: 'sum',
        tests: {
            visible: [
                { input: [2, 3], expected: 5, description: 'sum(2, 3) = 5' },
                { input: [0, 0], expected: 0, description: 'sum(0, 0) = 0' },
                { input: [-1, 1], expected: 0, description: 'sum(-1, 1) = 0' },
                { input: [10, -5], expected: 5, description: 'sum(10, -5) = 5' }
            ],
            hidden: [
                { input: [100, 200], expected: 300 },
                { input: [-10, -20], expected: -30 },
                { input: [999, 1], expected: 1000 },
                { input: [50, 50], expected: 100 }
            ]
        }
    },

    'multiply': {
        id: 'multiply',
        title: 'Multiply Numbers',
        difficulty: 'beginner',
        category: 'math',
        description: 'Multiply two numbers together.',
        instructions: `Create a function called \`multiply\` that takes two numbers and returns their product.`,
        hints: ['Use the * operator'],
        starterCode: {
            javascript: 'function multiply(a, b) {\n    // Return a * b\n}',
            python: 'def multiply(a, b):\n    # Return a * b\n    pass',
            java: 'public class Solution {\n    public static int multiply(int a, int b) {\n        return 0;\n    }\n}'
        },
        testFunction: 'multiply',
        tests: {
            visible: [
                { input: [2, 3], expected: 6, description: 'multiply(2, 3) = 6' },
                { input: [0, 5], expected: 0, description: 'multiply(0, 5) = 0' },
                { input: [-2, 3], expected: -6, description: 'multiply(-2, 3) = -6' },
                { input: [4, 4], expected: 16, description: 'multiply(4, 4) = 16' }
            ],
            hidden: [
                { input: [10, 10], expected: 100 },
                { input: [-5, -5], expected: 25 },
                { input: [7, 8], expected: 56 },
                { input: [100, 0], expected: 0 }
            ]
        }
    },

    'square': {
        id: 'square',
        title: 'Square a Number',
        difficulty: 'beginner',
        category: 'math',
        description: 'Return the square of a number.',
        instructions: `Create a function called \`square\` that returns the number multiplied by itself.`,
        hints: ['n * n or n ** 2'],
        starterCode: {
            javascript: 'function square(n) {\n    // Return n squared\n}',
            python: 'def square(n):\n    # Return n squared\n    pass',
            java: 'public class Solution {\n    public static int square(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'square',
        tests: {
            visible: [
                { input: [2], expected: 4, description: 'square(2) = 4' },
                { input: [5], expected: 25, description: 'square(5) = 25' },
                { input: [0], expected: 0, description: 'square(0) = 0' },
                { input: [-3], expected: 9, description: 'square(-3) = 9' }
            ],
            hidden: [
                { input: [10], expected: 100 },
                { input: [12], expected: 144 },
                { input: [-7], expected: 49 },
                { input: [1], expected: 1 }
            ]
        }
    },

    'is-even': {
        id: 'is-even',
        title: 'Is Even?',
        difficulty: 'beginner',
        category: 'math',
        description: 'Check if a number is even.',
        instructions: `Create a function called \`isEven\` that returns true if the number is even, false if odd.`,
        hints: ['Use modulo operator %', 'n % 2 === 0 means even'],
        starterCode: {
            javascript: 'function isEven(n) {\n    // Return true if n is even\n}',
            python: 'def is_even(n):\n    # Return True if n is even\n    pass',
            java: 'public class Solution {\n    public static boolean isEven(int n) {\n        return false;\n    }\n}'
        },
        testFunction: 'isEven',
        tests: {
            visible: [
                { input: [2], expected: true, description: 'isEven(2) = true' },
                { input: [3], expected: false, description: 'isEven(3) = false' },
                { input: [0], expected: true, description: 'isEven(0) = true' },
                { input: [-4], expected: true, description: 'isEven(-4) = true' }
            ],
            hidden: [
                { input: [100], expected: true },
                { input: [99], expected: false },
                { input: [-7], expected: false },
                { input: [1000], expected: true }
            ]
        }
    },

    'absolute-value': {
        id: 'absolute-value',
        title: 'Absolute Value',
        difficulty: 'beginner',
        category: 'math',
        description: 'Return the absolute value of a number.',
        instructions: `Create a function called \`absolute\` that returns the absolute value (always positive).`,
        hints: ['If negative, multiply by -1', 'Or use Math.abs()'],
        starterCode: {
            javascript: 'function absolute(n) {\n    // Return absolute value of n\n}',
            python: 'def absolute(n):\n    # Return absolute value of n\n    pass',
            java: 'public class Solution {\n    public static int absolute(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'absolute',
        tests: {
            visible: [
                { input: [5], expected: 5, description: 'absolute(5) = 5' },
                { input: [-5], expected: 5, description: 'absolute(-5) = 5' },
                { input: [0], expected: 0, description: 'absolute(0) = 0' },
                { input: [-100], expected: 100, description: 'absolute(-100) = 100' }
            ],
            hidden: [
                { input: [1], expected: 1 },
                { input: [-1], expected: 1 },
                { input: [999], expected: 999 },
                { input: [-999], expected: 999 }
            ]
        }
    },

    'max-of-two': {
        id: 'max-of-two',
        title: 'Maximum of Two',
        difficulty: 'beginner',
        category: 'math',
        description: 'Find the larger of two numbers.',
        instructions: `Create a function called \`max\` that returns the larger of two numbers.`,
        hints: ['Use comparison operator', 'Or use Math.max()'],
        starterCode: {
            javascript: 'function max(a, b) {\n    // Return the larger number\n}',
            python: 'def max_(a, b):\n    # Return the larger number\n    pass',
            java: 'public class Solution {\n    public static int max(int a, int b) {\n        return 0;\n    }\n}'
        },
        testFunction: 'max',
        tests: {
            visible: [
                { input: [5, 3], expected: 5, description: 'max(5, 3) = 5' },
                { input: [2, 8], expected: 8, description: 'max(2, 8) = 8' },
                { input: [5, 5], expected: 5, description: 'max(5, 5) = 5' },
                { input: [-1, -5], expected: -1, description: 'max(-1, -5) = -1' }
            ],
            hidden: [
                { input: [0, 0], expected: 0 },
                { input: [100, 99], expected: 100 },
                { input: [-10, 10], expected: 10 },
                { input: [1, 1000], expected: 1000 }
            ]
        }
    },

    'power': {
        id: 'power',
        title: 'Power of a Number',
        difficulty: 'intermediate',
        category: 'math',
        description: 'Calculate base raised to exponent.',
        instructions: `Create a function called \`power\` that returns base^exponent.`,
        hints: ['Use ** operator or Math.pow()', 'Loop multiplication also works'],
        starterCode: {
            javascript: 'function power(base, exp) {\n    // Return base raised to exp\n}',
            python: 'def power(base, exp):\n    # Return base raised to exp\n    pass',
            java: 'public class Solution {\n    public static int power(int base, int exp) {\n        return 0;\n    }\n}'
        },
        testFunction: 'power',
        tests: {
            visible: [
                { input: [2, 3], expected: 8, description: 'power(2, 3) = 8' },
                { input: [5, 2], expected: 25, description: 'power(5, 2) = 25' },
                { input: [10, 0], expected: 1, description: 'power(10, 0) = 1' },
                { input: [3, 4], expected: 81, description: 'power(3, 4) = 81' }
            ],
            hidden: [
                { input: [2, 10], expected: 1024 },
                { input: [1, 100], expected: 1 },
                { input: [7, 2], expected: 49 },
                { input: [4, 3], expected: 64 }
            ]
        }
    },

    'factorial': {
        id: 'factorial',
        title: 'Factorial',
        difficulty: 'intermediate',
        category: 'math',
        description: 'Calculate the factorial of n.',
        instructions: `Create a function called \`factorial\` that returns n! (n factorial).
        
factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
factorial(0) = 1 by definition`,
        hints: ['Use a loop or recursion', 'Start from 1, multiply up to n', '0! = 1'],
        starterCode: {
            javascript: 'function factorial(n) {\n    // Return n!\n}',
            python: 'def factorial(n):\n    # Return n!\n    pass',
            java: 'public class Solution {\n    public static long factorial(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'factorial',
        tests: {
            visible: [
                { input: [0], expected: 1, description: 'factorial(0) = 1' },
                { input: [1], expected: 1, description: 'factorial(1) = 1' },
                { input: [5], expected: 120, description: 'factorial(5) = 120' },
                { input: [3], expected: 6, description: 'factorial(3) = 6' }
            ],
            hidden: [
                { input: [2], expected: 2 },
                { input: [4], expected: 24 },
                { input: [6], expected: 720 },
                { input: [7], expected: 5040 },
                { input: [8], expected: 40320 },
                { input: [10], expected: 3628800 }
            ]
        }
    },

    // ==================== STRINGS ====================
    'string-length': {
        id: 'string-length',
        title: 'String Length',
        difficulty: 'beginner',
        category: 'strings',
        description: 'Return the length of a string.',
        instructions: `Create a function called \`stringLength\` that returns the number of characters in a string.`,
        hints: ['Use .length property in JS', 'Use len() in Python'],
        starterCode: {
            javascript: 'function stringLength(str) {\n    // Return the length\n}',
            python: 'def string_length(s):\n    # Return the length\n    pass',
            java: 'public class Solution {\n    public static int stringLength(String str) {\n        return 0;\n    }\n}'
        },
        testFunction: 'stringLength',
        tests: {
            visible: [
                { input: ['hello'], expected: 5, description: '"hello" has 5 chars' },
                { input: [''], expected: 0, description: 'Empty string has 0 chars' },
                { input: ['a'], expected: 1, description: '"a" has 1 char' },
                { input: ['hello world'], expected: 11, description: '"hello world" has 11 chars' }
            ],
            hidden: [
                { input: ['test'], expected: 4 },
                { input: ['JavaScript'], expected: 10 },
                { input: ['   '], expected: 3 },
                { input: ['12345'], expected: 5 }
            ]
        }
    },

    'reverse-string': {
        id: 'reverse-string',
        title: 'Reverse String',
        difficulty: 'beginner',
        category: 'strings',
        description: 'Reverse a string.',
        instructions: `Create a function called \`reverseString\` that returns the string reversed.`,
        hints: ['Split, reverse, join in JS', 'Use slicing [::-1] in Python'],
        starterCode: {
            javascript: 'function reverseString(str) {\n    // Return reversed string\n}',
            python: 'def reverse_string(s):\n    # Return reversed string\n    pass',
            java: 'public class Solution {\n    public static String reverseString(String str) {\n        return "";\n    }\n}'
        },
        testFunction: 'reverseString',
        tests: {
            visible: [
                { input: ['hello'], expected: 'olleh', description: 'reverse("hello") = "olleh"' },
                { input: ['ab'], expected: 'ba', description: 'reverse("ab") = "ba"' },
                { input: ['a'], expected: 'a', description: 'Single char stays same' },
                { input: [''], expected: '', description: 'Empty stays empty' }
            ],
            hidden: [
                { input: ['JavaScript'], expected: 'tpircSavaJ' },
                { input: ['12345'], expected: '54321' },
                { input: ['racecar'], expected: 'racecar' },
                { input: ['hello world'], expected: 'dlrow olleh' }
            ]
        }
    },

    'to-uppercase': {
        id: 'to-uppercase',
        title: 'To Uppercase',
        difficulty: 'beginner',
        category: 'strings',
        description: 'Convert a string to uppercase.',
        instructions: `Create a function called \`toUpperCase\` that converts all letters to uppercase.`,
        hints: ['Use .toUpperCase() in JS', 'Use .upper() in Python'],
        starterCode: {
            javascript: 'function toUpperCase(str) {\n    // Return uppercase string\n}',
            python: 'def to_uppercase(s):\n    # Return uppercase string\n    pass',
            java: 'public class Solution {\n    public static String toUpperCase(String str) {\n        return "";\n    }\n}'
        },
        testFunction: 'toUpperCase',
        tests: {
            visible: [
                { input: ['hello'], expected: 'HELLO', description: '"hello" -> "HELLO"' },
                { input: ['Hello World'], expected: 'HELLO WORLD', description: 'Mixed case' },
                { input: ['ABC'], expected: 'ABC', description: 'Already uppercase' },
                { input: [''], expected: '', description: 'Empty string' }
            ],
            hidden: [
                { input: ['javascript'], expected: 'JAVASCRIPT' },
                { input: ['Python'], expected: 'PYTHON' },
                { input: ['123abc'], expected: '123ABC' },
                { input: ['a'], expected: 'A' }
            ]
        }
    },

    'count-vowels': {
        id: 'count-vowels',
        title: 'Count Vowels',
        difficulty: 'intermediate',
        category: 'strings',
        description: 'Count the vowels in a string.',
        instructions: `Create a function called \`countVowels\` that counts a, e, i, o, u (case insensitive).`,
        hints: ['Convert to lowercase first', 'Check each character against vowels'],
        starterCode: {
            javascript: 'function countVowels(str) {\n    // Count and return vowels\n}',
            python: 'def count_vowels(s):\n    # Count and return vowels\n    pass',
            java: 'public class Solution {\n    public static int countVowels(String str) {\n        return 0;\n    }\n}'
        },
        testFunction: 'countVowels',
        tests: {
            visible: [
                { input: ['hello'], expected: 2, description: '"hello" has 2 vowels' },
                { input: ['AEIOU'], expected: 5, description: 'All vowels uppercase' },
                { input: ['xyz'], expected: 0, description: 'No vowels' },
                { input: ['aEiOu'], expected: 5, description: 'Mixed case vowels' }
            ],
            hidden: [
                { input: ['programming'], expected: 3 },
                { input: ['rhythm'], expected: 0 },
                { input: ['beautiful'], expected: 5 },
                { input: [''], expected: 0 }
            ]
        }
    },

    'palindrome': {
        id: 'palindrome',
        title: 'Palindrome Checker',
        difficulty: 'intermediate',
        category: 'strings',
        description: 'Check if a string is a palindrome.',
        instructions: `Create a function called \`isPalindrome\` that returns true if the string reads the same forwards and backwards.

Should be case-insensitive and ignore spaces.`,
        hints: ['Remove spaces and convert to lowercase', 'Compare with reversed version'],
        starterCode: {
            javascript: 'function isPalindrome(str) {\n    // Return true if palindrome\n}',
            python: 'def is_palindrome(s):\n    # Return True if palindrome\n    pass',
            java: 'public class Solution {\n    public static boolean isPalindrome(String str) {\n        return false;\n    }\n}'
        },
        testFunction: 'isPalindrome',
        tests: {
            visible: [
                { input: ['racecar'], expected: true, description: '"racecar" is a palindrome' },
                { input: ['hello'], expected: false, description: '"hello" is not' },
                { input: ['A man a plan a canal Panama'], expected: true, description: 'Classic palindrome' },
                { input: ['level'], expected: true, description: '"level" is a palindrome' }
            ],
            hidden: [
                { input: ['Madam'], expected: true },
                { input: ['Was it a car or a cat I saw'], expected: true },
                { input: ['noon'], expected: true },
                { input: ['javascript'], expected: false },
                { input: ['a'], expected: true },
                { input: ['ab'], expected: false }
            ]
        }
    },

    'capitalize-words': {
        id: 'capitalize-words',
        title: 'Capitalize Words',
        difficulty: 'intermediate',
        category: 'strings',
        description: 'Capitalize the first letter of each word.',
        instructions: `Create a function called \`capitalizeWords\` that capitalizes the first letter of every word.`,
        hints: ['Split by spaces', 'Capitalize first letter of each word', 'Join back together'],
        starterCode: {
            javascript: 'function capitalizeWords(str) {\n    // Capitalize each word\n}',
            python: 'def capitalize_words(s):\n    # Capitalize each word\n    pass',
            java: 'public class Solution {\n    public static String capitalizeWords(String str) {\n        return "";\n    }\n}'
        },
        testFunction: 'capitalizeWords',
        tests: {
            visible: [
                { input: ['hello world'], expected: 'Hello World', description: 'Two words' },
                { input: ['the quick brown fox'], expected: 'The Quick Brown Fox', description: 'Four words' },
                { input: ['a'], expected: 'A', description: 'Single letter' },
                { input: ['HELLO'], expected: 'HELLO', description: 'Already caps' }
            ],
            hidden: [
                { input: ['javascript is fun'], expected: 'Javascript Is Fun' },
                { input: ['one'], expected: 'One' },
                { input: ['TWO WORDS'], expected: 'TWO WORDS' },
                { input: [''], expected: '' }
            ]
        }
    },

    // ==================== ARRAYS ====================
    'array-sum': {
        id: 'array-sum',
        title: 'Sum Array',
        difficulty: 'beginner',
        category: 'arrays',
        description: 'Return the sum of all numbers in an array.',
        instructions: `Create a function called \`arraySum\` that adds up all numbers in the array.`,
        hints: ['Use a loop or reduce()', 'Start with sum = 0'],
        starterCode: {
            javascript: 'function arraySum(arr) {\n    // Return sum of all elements\n}',
            python: 'def array_sum(arr):\n    # Return sum of all elements\n    pass',
            java: 'public class Solution {\n    public static int arraySum(int[] arr) {\n        return 0;\n    }\n}'
        },
        testFunction: 'arraySum',
        tests: {
            visible: [
                { input: [[1, 2, 3]], expected: 6, description: '[1,2,3] sums to 6' },
                { input: [[]], expected: 0, description: 'Empty array = 0' },
                { input: [[5]], expected: 5, description: 'Single element' },
                { input: [[-1, 1]], expected: 0, description: 'Negative and positive' }
            ],
            hidden: [
                { input: [[10, 20, 30]], expected: 60 },
                { input: [[1, 1, 1, 1, 1]], expected: 5 },
                { input: [[-5, -5, 10]], expected: 0 },
                { input: [[100]], expected: 100 }
            ]
        }
    },

    'find-max': {
        id: 'find-max',
        title: 'Find Maximum',
        difficulty: 'beginner',
        category: 'arrays',
        description: 'Find the largest number in an array.',
        instructions: `Create a function called \`findMax\` that returns the largest number. Assume array is not empty.`,
        hints: ['Use Math.max(...arr) or loop through', 'Keep track of the largest seen'],
        starterCode: {
            javascript: 'function findMax(arr) {\n    // Return the maximum value\n}',
            python: 'def find_max(arr):\n    # Return the maximum value\n    pass',
            java: 'public class Solution {\n    public static int findMax(int[] arr) {\n        return 0;\n    }\n}'
        },
        testFunction: 'findMax',
        tests: {
            visible: [
                { input: [[1, 5, 3]], expected: 5, description: 'Max of [1,5,3] is 5' },
                { input: [[10]], expected: 10, description: 'Single element' },
                { input: [[-1, -5, -3]], expected: -1, description: 'All negative' },
                { input: [[1, 2, 3, 4, 5]], expected: 5, description: 'Ascending' }
            ],
            hidden: [
                { input: [[5, 4, 3, 2, 1]], expected: 5 },
                { input: [[100, 200, 50]], expected: 200 },
                { input: [[0, 0, 0]], expected: 0 },
                { input: [[-100, 0, 100]], expected: 100 }
            ]
        }
    },

    'find-min': {
        id: 'find-min',
        title: 'Find Minimum',
        difficulty: 'beginner',
        category: 'arrays',
        description: 'Find the smallest number in an array.',
        instructions: `Create a function called \`findMin\` that returns the smallest number. Assume array is not empty.`,
        hints: ['Use Math.min(...arr) or loop through', 'Keep track of the smallest seen'],
        starterCode: {
            javascript: 'function findMin(arr) {\n    // Return the minimum value\n}',
            python: 'def find_min(arr):\n    # Return the minimum value\n    pass',
            java: 'public class Solution {\n    public static int findMin(int[] arr) {\n        return 0;\n    }\n}'
        },
        testFunction: 'findMin',
        tests: {
            visible: [
                { input: [[1, 5, 3]], expected: 1, description: 'Min of [1,5,3] is 1' },
                { input: [[10]], expected: 10, description: 'Single element' },
                { input: [[-1, -5, -3]], expected: -5, description: 'All negative' },
                { input: [[5, 4, 3, 2, 1]], expected: 1, description: 'Descending' }
            ],
            hidden: [
                { input: [[1, 2, 3, 4, 5]], expected: 1 },
                { input: [[100, 200, 50]], expected: 50 },
                { input: [[0, 0, 0]], expected: 0 },
                { input: [[-100, 0, 100]], expected: -100 }
            ]
        }
    },

    'array-length': {
        id: 'array-length',
        title: 'Array Length',
        difficulty: 'beginner',
        category: 'arrays',
        description: 'Return the number of elements in an array.',
        instructions: `Create a function called \`arrayLength\` that returns how many elements are in the array.`,
        hints: ['Use .length property'],
        starterCode: {
            javascript: 'function arrayLength(arr) {\n    // Return the length\n}',
            python: 'def array_length(arr):\n    # Return the length\n    pass',
            java: 'public class Solution {\n    public static int arrayLength(int[] arr) {\n        return 0;\n    }\n}'
        },
        testFunction: 'arrayLength',
        tests: {
            visible: [
                { input: [[1, 2, 3]], expected: 3, description: '3 elements' },
                { input: [[]], expected: 0, description: 'Empty array' },
                { input: [[5]], expected: 1, description: 'One element' },
                { input: [[1, 2, 3, 4, 5]], expected: 5, description: '5 elements' }
            ],
            hidden: [
                { input: [[1, 1, 1, 1]], expected: 4 },
                { input: [[0]], expected: 1 },
                { input: [[1, 2]], expected: 2 },
                { input: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]], expected: 10 }
            ]
        }
    },

    'filter-evens': {
        id: 'filter-evens',
        title: 'Filter Even Numbers',
        difficulty: 'intermediate',
        category: 'arrays',
        description: 'Return only the even numbers from an array.',
        instructions: `Create a function called \`filterEvens\` that returns a new array with only even numbers.`,
        hints: ['Use filter() or loop with condition', 'n % 2 === 0 is even'],
        starterCode: {
            javascript: 'function filterEvens(arr) {\n    // Return array of even numbers\n}',
            python: 'def filter_evens(arr):\n    # Return list of even numbers\n    pass',
            java: 'public class Solution {\n    public static int[] filterEvens(int[] arr) {\n        return new int[0];\n    }\n}'
        },
        testFunction: 'filterEvens',
        tests: {
            visible: [
                { input: [[1, 2, 3, 4, 5]], expected: [2, 4], description: 'Filter [1,2,3,4,5]' },
                { input: [[2, 4, 6]], expected: [2, 4, 6], description: 'All even' },
                { input: [[1, 3, 5]], expected: [], description: 'All odd' },
                { input: [[]], expected: [], description: 'Empty array' }
            ],
            hidden: [
                { input: [[0, 1, 2]], expected: [0, 2] },
                { input: [[10, 15, 20, 25]], expected: [10, 20] },
                { input: [[-2, -1, 0, 1, 2]], expected: [-2, 0, 2] },
                { input: [[100]], expected: [100] }
            ]
        }
    },

    'double-array': {
        id: 'double-array',
        title: 'Double Array Elements',
        difficulty: 'intermediate',
        category: 'arrays',
        description: 'Double every element in an array.',
        instructions: `Create a function called \`doubleArray\` that returns a new array where each element is doubled.`,
        hints: ['Use map() or loop', 'Multiply each element by 2'],
        starterCode: {
            javascript: 'function doubleArray(arr) {\n    // Return array with doubled values\n}',
            python: 'def double_array(arr):\n    # Return list with doubled values\n    pass',
            java: 'public class Solution {\n    public static int[] doubleArray(int[] arr) {\n        return new int[0];\n    }\n}'
        },
        testFunction: 'doubleArray',
        tests: {
            visible: [
                { input: [[1, 2, 3]], expected: [2, 4, 6], description: 'Double [1,2,3]' },
                { input: [[5]], expected: [10], description: 'Single element' },
                { input: [[]], expected: [], description: 'Empty array' },
                { input: [[0, -1, 1]], expected: [0, -2, 2], description: 'Mixed numbers' }
            ],
            hidden: [
                { input: [[10, 20, 30]], expected: [20, 40, 60] },
                { input: [[-5, -10]], expected: [-10, -20] },
                { input: [[100]], expected: [200] },
                { input: [[1, 1, 1]], expected: [2, 2, 2] }
            ]
        }
    },

    // ==================== LOGIC ====================
    'fizzbuzz': {
        id: 'fizzbuzz',
        title: 'FizzBuzz',
        difficulty: 'intermediate',
        category: 'logic',
        description: 'The classic FizzBuzz problem.',
        instructions: `Create a function called \`fizzBuzz\` that returns:
- "FizzBuzz" if divisible by both 3 and 5
- "Fizz" if only divisible by 3
- "Buzz" if only divisible by 5
- The number as a string otherwise`,
        hints: ['Check divisibility with modulo %', 'Check 15 first (3 and 5)'],
        starterCode: {
            javascript: 'function fizzBuzz(n) {\n    // Return "Fizz", "Buzz", "FizzBuzz", or n as string\n}',
            python: 'def fizz_buzz(n):\n    # Return "Fizz", "Buzz", "FizzBuzz", or n as string\n    pass',
            java: 'public class Solution {\n    public static String fizzBuzz(int n) {\n        return "";\n    }\n}'
        },
        testFunction: 'fizzBuzz',
        tests: {
            visible: [
                { input: [15], expected: 'FizzBuzz', description: '15 is FizzBuzz' },
                { input: [3], expected: 'Fizz', description: '3 is Fizz' },
                { input: [5], expected: 'Buzz', description: '5 is Buzz' },
                { input: [7], expected: '7', description: '7 is just 7' }
            ],
            hidden: [
                { input: [30], expected: 'FizzBuzz' },
                { input: [9], expected: 'Fizz' },
                { input: [10], expected: 'Buzz' },
                { input: [1], expected: '1' },
                { input: [45], expected: 'FizzBuzz' },
                { input: [12], expected: 'Fizz' },
                { input: [20], expected: 'Buzz' },
                { input: [17], expected: '17' }
            ]
        }
    },

    'leap-year': {
        id: 'leap-year',
        title: 'Leap Year',
        difficulty: 'intermediate',
        category: 'logic',
        description: 'Determine if a year is a leap year.',
        instructions: `Create a function called \`isLeapYear\` that returns true if the year is a leap year.

Rules:
- Divisible by 4: leap year
- BUT divisible by 100: not a leap year
- BUT divisible by 400: leap year`,
        hints: ['Check 400 first, then 100, then 4', 'Use modulo for divisibility'],
        starterCode: {
            javascript: 'function isLeapYear(year) {\n    // Return true if leap year\n}',
            python: 'def is_leap_year(year):\n    # Return True if leap year\n    pass',
            java: 'public class Solution {\n    public static boolean isLeapYear(int year) {\n        return false;\n    }\n}'
        },
        testFunction: 'isLeapYear',
        tests: {
            visible: [
                { input: [2020], expected: true, description: '2020 is a leap year' },
                { input: [2021], expected: false, description: '2021 is not' },
                { input: [2000], expected: true, description: '2000 is (div by 400)' },
                { input: [1900], expected: false, description: '1900 is not (div by 100)' }
            ],
            hidden: [
                { input: [2024], expected: true },
                { input: [2100], expected: false },
                { input: [1600], expected: true },
                { input: [2019], expected: false },
                { input: [2400], expected: true },
                { input: [1700], expected: false }
            ]
        }
    },

    'grade-calculator': {
        id: 'grade-calculator',
        title: 'Grade Calculator',
        difficulty: 'intermediate',
        category: 'logic',
        description: 'Convert a score to a letter grade.',
        instructions: `Create a function called \`getGrade\` that returns:
- "A" for 90-100
- "B" for 80-89
- "C" for 70-79
- "D" for 60-69
- "F" for below 60`,
        hints: ['Use if/else chain', 'Check from highest to lowest'],
        starterCode: {
            javascript: 'function getGrade(score) {\n    // Return letter grade\n}',
            python: 'def get_grade(score):\n    # Return letter grade\n    pass',
            java: 'public class Solution {\n    public static String getGrade(int score) {\n        return "";\n    }\n}'
        },
        testFunction: 'getGrade',
        tests: {
            visible: [
                { input: [95], expected: 'A', description: '95 is an A' },
                { input: [85], expected: 'B', description: '85 is a B' },
                { input: [75], expected: 'C', description: '75 is a C' },
                { input: [65], expected: 'D', description: '65 is a D' },
                { input: [55], expected: 'F', description: '55 is an F' }
            ],
            hidden: [
                { input: [100], expected: 'A' },
                { input: [90], expected: 'A' },
                { input: [89], expected: 'B' },
                { input: [80], expected: 'B' },
                { input: [70], expected: 'C' },
                { input: [60], expected: 'D' },
                { input: [59], expected: 'F' },
                { input: [0], expected: 'F' }
            ]
        }
    },

    // ==================== ALGORITHMS ====================
    'fibonacci': {
        id: 'fibonacci',
        title: 'Fibonacci',
        difficulty: 'advanced',
        category: 'algorithms',
        description: 'Return the nth Fibonacci number.',
        instructions: `Create a function called \`fibonacci\` that returns the nth Fibonacci number (0-indexed).

Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21...`,
        hints: ['F(n) = F(n-1) + F(n-2)', 'Base cases: F(0)=0, F(1)=1', 'Use iteration for efficiency'],
        starterCode: {
            javascript: 'function fibonacci(n) {\n    // Return nth Fibonacci number\n}',
            python: 'def fibonacci(n):\n    # Return nth Fibonacci number\n    pass',
            java: 'public class Solution {\n    public static long fibonacci(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'fibonacci',
        tests: {
            visible: [
                { input: [0], expected: 0, description: 'fib(0) = 0' },
                { input: [1], expected: 1, description: 'fib(1) = 1' },
                { input: [5], expected: 5, description: 'fib(5) = 5' },
                { input: [10], expected: 55, description: 'fib(10) = 55' }
            ],
            hidden: [
                { input: [2], expected: 1 },
                { input: [3], expected: 2 },
                { input: [6], expected: 8 },
                { input: [7], expected: 13 },
                { input: [15], expected: 610 },
                { input: [20], expected: 6765 }
            ]
        }
    },

    'is-prime': {
        id: 'is-prime',
        title: 'Prime Number Check',
        difficulty: 'advanced',
        category: 'algorithms',
        description: 'Check if a number is prime.',
        instructions: `Create a function called \`isPrime\` that returns true if the number is prime.

A prime number is only divisible by 1 and itself.`,
        hints: ['Check divisibility from 2 to sqrt(n)', '2 is the smallest prime', '1 is not prime'],
        starterCode: {
            javascript: 'function isPrime(n) {\n    // Return true if n is prime\n}',
            python: 'def is_prime(n):\n    # Return True if n is prime\n    pass',
            java: 'public class Solution {\n    public static boolean isPrime(int n) {\n        return false;\n    }\n}'
        },
        testFunction: 'isPrime',
        tests: {
            visible: [
                { input: [2], expected: true, description: '2 is prime' },
                { input: [17], expected: true, description: '17 is prime' },
                { input: [4], expected: false, description: '4 is not prime' },
                { input: [1], expected: false, description: '1 is not prime' }
            ],
            hidden: [
                { input: [3], expected: true },
                { input: [5], expected: true },
                { input: [7], expected: true },
                { input: [11], expected: true },
                { input: [9], expected: false },
                { input: [15], expected: false },
                { input: [97], expected: true },
                { input: [100], expected: false }
            ]
        }
    },

    'binary-search': {
        id: 'binary-search',
        title: 'Binary Search',
        difficulty: 'advanced',
        category: 'searching',
        description: 'Find an element in a sorted array.',
        instructions: `Create a function called \`binarySearch\` that returns the index of target in a sorted array, or -1 if not found.`,
        hints: ['Array must be sorted', 'Check middle, eliminate half each time', 'O(log n) complexity'],
        starterCode: {
            javascript: 'function binarySearch(arr, target) {\n    // Return index of target or -1\n}',
            python: 'def binary_search(arr, target):\n    # Return index of target or -1\n    pass',
            java: 'public class Solution {\n    public static int binarySearch(int[] arr, int target) {\n        return -1;\n    }\n}'
        },
        testFunction: 'binarySearch',
        tests: {
            visible: [
                { input: [[1, 2, 3, 4, 5], 3], expected: 2, description: 'Find 3 in [1,2,3,4,5]' },
                { input: [[1, 2, 3, 4, 5], 1], expected: 0, description: 'Find first element' },
                { input: [[1, 2, 3, 4, 5], 5], expected: 4, description: 'Find last element' },
                { input: [[1, 2, 3, 4, 5], 6], expected: -1, description: 'Not found' }
            ],
            hidden: [
                { input: [[10, 20, 30, 40, 50], 30], expected: 2 },
                { input: [[1], 1], expected: 0 },
                { input: [[1, 3, 5, 7, 9], 7], expected: 3 },
                { input: [[2, 4, 6, 8], 5], expected: -1 },
                { input: [[], 1], expected: -1 },
                { input: [[1, 2], 2], expected: 1 }
            ]
        }
    },

    // ==================== RECURSION ====================
    'sum-recursive': {
        id: 'sum-recursive',
        title: 'Recursive Sum',
        difficulty: 'advanced',
        category: 'recursion',
        description: 'Sum numbers 1 to n using recursion.',
        instructions: `Create a function called \`sumRecursive\` that returns 1 + 2 + ... + n using recursion.`,
        hints: ['Base case: n <= 0 returns 0', 'Recursive: n + sumRecursive(n-1)'],
        starterCode: {
            javascript: 'function sumRecursive(n) {\n    // Sum 1 to n recursively\n}',
            python: 'def sum_recursive(n):\n    # Sum 1 to n recursively\n    pass',
            java: 'public class Solution {\n    public static int sumRecursive(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'sumRecursive',
        tests: {
            visible: [
                { input: [5], expected: 15, description: '1+2+3+4+5 = 15' },
                { input: [1], expected: 1, description: 'Just 1' },
                { input: [0], expected: 0, description: 'Zero' },
                { input: [10], expected: 55, description: '1 to 10' }
            ],
            hidden: [
                { input: [3], expected: 6 },
                { input: [7], expected: 28 },
                { input: [100], expected: 5050 },
                { input: [20], expected: 210 }
            ]
        }
    },

    'count-digits': {
        id: 'count-digits',
        title: 'Count Digits',
        difficulty: 'intermediate',
        category: 'recursion',
        description: 'Count the digits in a number recursively.',
        instructions: `Create a function called \`countDigits\` that returns the number of digits using recursion.`,
        hints: ['Base case: n < 10 has 1 digit', 'Recursive: divide by 10'],
        starterCode: {
            javascript: 'function countDigits(n) {\n    // Count digits recursively\n}',
            python: 'def count_digits(n):\n    # Count digits recursively\n    pass',
            java: 'public class Solution {\n    public static int countDigits(int n) {\n        return 0;\n    }\n}'
        },
        testFunction: 'countDigits',
        tests: {
            visible: [
                { input: [12345], expected: 5, description: '12345 has 5 digits' },
                { input: [1], expected: 1, description: '1 has 1 digit' },
                { input: [100], expected: 3, description: '100 has 3 digits' },
                { input: [9999], expected: 4, description: '9999 has 4 digits' }
            ],
            hidden: [
                { input: [10], expected: 2 },
                { input: [999], expected: 3 },
                { input: [1000000], expected: 7 },
                { input: [42], expected: 2 }
            ]
        }
    },

    // ==================== SORTING ====================
    'bubble-sort': {
        id: 'bubble-sort',
        title: 'Bubble Sort',
        difficulty: 'advanced',
        category: 'sorting',
        description: 'Implement bubble sort algorithm.',
        instructions: `Create a function called \`bubbleSort\` that sorts an array in ascending order using bubble sort.`,
        hints: ['Compare adjacent elements', 'Swap if out of order', 'Repeat until no swaps needed'],
        starterCode: {
            javascript: 'function bubbleSort(arr) {\n    // Sort array using bubble sort\n}',
            python: 'def bubble_sort(arr):\n    # Sort array using bubble sort\n    pass',
            java: 'public class Solution {\n    public static int[] bubbleSort(int[] arr) {\n        return arr;\n    }\n}'
        },
        testFunction: 'bubbleSort',
        tests: {
            visible: [
                { input: [[5, 3, 1, 4, 2]], expected: [1, 2, 3, 4, 5], description: 'Sort random' },
                { input: [[1, 2, 3]], expected: [1, 2, 3], description: 'Already sorted' },
                { input: [[3, 2, 1]], expected: [1, 2, 3], description: 'Reverse order' },
                { input: [[]], expected: [], description: 'Empty array' }
            ],
            hidden: [
                { input: [[1]], expected: [1] },
                { input: [[2, 1]], expected: [1, 2] },
                { input: [[10, 5, 15, 0]], expected: [0, 5, 10, 15] },
                { input: [[-1, -5, -3]], expected: [-5, -3, -1] }
            ]
        }
    },

    // ==================== OBJECTS ====================
    'count-properties': {
        id: 'count-properties',
        title: 'Count Object Properties',
        difficulty: 'intermediate',
        category: 'objects',
        description: 'Count the number of properties in an object.',
        instructions: `Create a function called \`countProps\` that returns the number of properties in an object.`,
        hints: ['Use Object.keys()', 'Get the length of the keys array'],
        starterCode: {
            javascript: 'function countProps(obj) {\n    // Return number of properties\n}',
            python: 'def count_props(obj):\n    # Return number of properties\n    pass',
            java: '// Java version uses Map\npublic class Solution {\n    public static int countProps(java.util.Map obj) {\n        return 0;\n    }\n}'
        },
        testFunction: 'countProps',
        tests: {
            visible: [
                { input: [{ a: 1, b: 2 }], expected: 2, description: '2 properties' },
                { input: [{}], expected: 0, description: 'Empty object' },
                { input: [{ x: 1 }], expected: 1, description: '1 property' },
                { input: [{ a: 1, b: 2, c: 3 }], expected: 3, description: '3 properties' }
            ],
            hidden: [
                { input: [{ name: 'test', value: 42, active: true }], expected: 3 },
                { input: [{ single: 'property' }], expected: 1 },
                { input: [{ a: 1, b: 2, c: 3, d: 4, e: 5 }], expected: 5 }
            ]
        }
    }
};

// Get all challenges as array
export const getAllChallenges = () => Object.values(CHALLENGES);

// Get challenges by category
export const getChallengesByCategory = (category) =>
    Object.values(CHALLENGES).filter(c => c.category === category);

// Get challenges by difficulty
export const getChallengesByDifficulty = (difficulty) =>
    Object.values(CHALLENGES).filter(c => c.difficulty === difficulty);

// Get challenge by ID
export const getChallenge = (id) => CHALLENGES[id];

// Get random challenges
export const getRandomChallenges = (count = 3, difficulty = null) => {
    let pool = Object.values(CHALLENGES);
    if (difficulty) {
        pool = pool.filter(c => c.difficulty === difficulty);
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

// Get challenge count by category
export const getChallengeCountByCategory = () => {
    const counts = {};
    Object.values(CHALLENGES).forEach(c => {
        counts[c.category] = (counts[c.category] || 0) + 1;
    });
    return counts;
};

// Get challenge count by difficulty
export const getChallengeCountByDifficulty = () => {
    const counts = {};
    Object.values(CHALLENGES).forEach(c => {
        counts[c.difficulty] = (counts[c.difficulty] || 0) + 1;
    });
    return counts;
};
