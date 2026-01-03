// Course and Lesson Definitions
// This defines all available courses and their lessons
import { additionalCourses } from './additionalCourses';

export const COURSE_CATEGORIES = {
    FUNDAMENTALS: 'fundamentals',
    LANGUAGE: 'language',
    SYSTEMS: 'systems',
    WEB: 'web',
    DATA: 'data',
    SCRIPTING: 'scripting',
    TOOLS: 'tools',
    EXTENSIONS: 'extensions',
    FULLSTACK: 'fullstack'
};

export const courses = {
    ...additionalCourses,
    // Introduction to Logic (prerequisite for all)
    'intro-logic': {
        id: 'intro-logic',
        name: 'Introduction to Logic',
        description: 'Learn the fundamentals of computational thinking and logic before diving into any programming language.',
        category: COURSE_CATEGORIES.FUNDAMENTALS,
        icon: '🧠',
        color: '#8b5cf6',
        language: null, // Language agnostic
        prerequisites: [],
        estimatedHours: 3,
        lessons: [
            {
                id: 'logic-1',
                title: 'What is Logic?',
                description: 'Understanding how computers think',
                stage: 1,
                content: `
# What is Logic?

Computers are very literal. They do exactly what you tell them to do - nothing more, nothing less.

Logic is the foundation of all programming. It's how we give computers a set of rules to follow.

## Key Concepts:
- **True and False**: The building blocks of decisions
- **Conditions**: Questions that have yes/no answers
- **Sequences**: Steps that happen in order

## Example:
Think about making a sandwich:
1. Get bread
2. If you want butter, spread butter
3. Add filling
4. Put second slice on top

This is logic! A sequence of steps with a condition (if you want butter).
        `,
                exercises: [
                    {
                        prompt: 'What are the two possible values in logic?',
                        type: 'multiple-choice',
                        options: ['True and False', 'Yes and Maybe', 'On and Off', 'All of the above except B'],
                        answer: 0
                    },
                    {
                        prompt: 'What do we call the "questions with yes/no answers" in programming?',
                        type: 'multiple-choice',
                        options: ['Variables', 'Conditions', 'Loops', 'Functions'],
                        answer: 1
                    },
                    {
                        prompt: 'In the sandwich example, what type of logic structure is "If you want butter, spread butter"?',
                        type: 'multiple-choice',
                        options: ['A sequence', 'A condition', 'A loop', 'A variable'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'logic-2',
                title: 'True and False',
                description: 'Understanding boolean values',
                stage: 1,
                content: `
# True and False

In programming, we call True and False **boolean values** (named after mathematician George Boole).

Everything in logic comes down to these two values.

## Examples of True/False questions:
- Is 5 greater than 3? **True**
- Is the sky green? **False**
- Is 10 equal to 10? **True**
- Is the user logged in? **True or False** (depends!)

## In Natural Language:
- "true value" means something is correct/yes
- "false value" means something is incorrect/no
        `,
                exercises: [
                    {
                        prompt: 'Is 7 greater than 10?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 1
                    },
                    {
                        prompt: 'Is 10 equal to 10?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 0
                    },
                    {
                        prompt: 'What are True and False values called in programming?',
                        type: 'multiple-choice',
                        options: ['Integer values', 'Boolean values', 'String values', 'Float values'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'logic-3',
                title: 'Comparisons',
                description: 'Comparing values to make decisions',
                stage: 1,
                content: `
# Comparisons

To make decisions, we need to compare things. Here are the comparison operations:

| Natural Language | Meaning |
|-----------------|---------|
| is equal to | Same value |
| is not equal to | Different values |
| is less than | Smaller number |
| is greater than | Bigger number |
| is less than or equal to | Smaller or same |
| is greater than or equal to | Bigger or same |

## Examples:
- 5 is less than 10 → **true value**
- "hello" is equal to "hello" → **true value**
- 7 is greater than 7 → **false value**
- 7 is greater than or equal to 7 → **true value**
        `,
                exercises: [
                    {
                        prompt: 'Write code that displays if 5 is less than 10. Hint: display "true" or display "false"',
                        type: 'code',
                        expectedOutput: 'true',
                        hint: 'Write: if 5 is less than 10 then\\n    display "true"\\nend if'
                    },
                    {
                        prompt: 'What is the result of: 8 is greater than 8?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the result of: 8 is greater than or equal to 8?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'logic-4',
                title: 'Combining Conditions',
                description: 'Using AND and OR',
                stage: 1,
                content: `
# Combining Conditions

Sometimes we need multiple conditions to be checked:

## AND
Both conditions must be true:
- "Is it raining AND cold?" - Only true if BOTH are true

## OR  
At least one condition must be true:
- "Is it Saturday OR Sunday?" - True if EITHER is true

## NOT
Reverses the value:
- "It is NOT raining" - If raining is false, this is true

## Truth Table for AND:
| A | B | A and B |
|---|---|---------|
| true | true | true |
| true | false | false |
| false | true | false |
| false | false | false |

## Truth Table for OR:
| A | B | A or B |
|---|---|--------|
| true | true | true |
| true | false | true |
| false | true | true |
| false | false | false |
        `,
                exercises: [
                    {
                        prompt: 'If A is true and B is false, what is "A and B"?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 1
                    },
                    {
                        prompt: 'If A is true and B is false, what is "A or B"?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 0
                    },
                    {
                        prompt: 'If A is false and B is false, what is "A or B"?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 1
                    },
                    {
                        prompt: 'If "raining" is true, what is "NOT raining"?',
                        type: 'multiple-choice',
                        options: ['true value', 'false value'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'logic-5',
                title: 'If-Then Decisions',
                description: 'Making choices based on conditions',
                stage: 1,
                content: `
# If-Then Decisions

The most fundamental structure in programming is the if-then decision:

\`\`\`
if <condition> then
    <do something>
end if
\`\`\`

## Example:
\`\`\`
if temperature is greater than 30 then
    display "It's hot outside!"
end if
\`\`\`

This checks if the temperature is above 30, and only then displays the message.

## With Otherwise (Else):
\`\`\`
if age is greater than or equal to 18 then
    display "You can vote"
otherwise
    display "You cannot vote yet"
end if
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What would this code do if x = 5?\n\nif x is equal to 5 then\n    display "Found it!"\nend if',
                        type: 'multiple-choice',
                        options: ['Display "Found it!"', 'Display nothing', 'Show an error', 'Display "x"'],
                        answer: 0
                    },
                    {
                        prompt: 'What would this code do if age = 16?\n\nif age is greater than or equal to 18 then\n    display "You can vote"\notherwise\n    display "You cannot vote yet"\nend if',
                        type: 'multiple-choice',
                        options: ['Display "You can vote"', 'Display "You cannot vote yet"', 'Display nothing', 'Show an error'],
                        answer: 1
                    },
                    {
                        prompt: 'What keyword do we use for the "else" case in our natural language?',
                        type: 'multiple-choice',
                        options: ['else', 'otherwise', 'or else', 'then not'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'logic-6',
                title: 'Variables - Storing Information',
                description: 'Giving names to values',
                stage: 1,
                content: `
# Variables

A variable is like a labeled box where you can store information.

## Creating Variables:
\`\`\`
create variable score
set score to 0
\`\`\`

Or in one line:
\`\`\`
create variable score to 0
\`\`\`

## Changing Variables:
\`\`\`
set score to score plus 10
\`\`\`

Now score is 10!

## Variable Names:
- Should be descriptive: \`playerName\`, \`totalScore\`, \`isGameOver\`
- No spaces allowed
- Start with a letter
        `,
                exercises: [
                    {
                        prompt: 'Create a variable called "age" set to 25, then display it.',
                        type: 'code',
                        expectedOutput: '25',
                        hint: 'First: create variable age to 25\\nThen: display age'
                    },
                    {
                        prompt: 'If score is 10, what is score after: set score to score plus 5?',
                        type: 'multiple-choice',
                        options: ['10', '15', '5', 'score plus 5'],
                        answer: 1
                    },
                    {
                        prompt: 'Which is a valid variable name?',
                        type: 'multiple-choice',
                        options: ['player name', '1stPlayer', 'playerName', 'player-name'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'logic-7',
                title: 'Loops - Repeating Actions',
                description: 'Doing things multiple times',
                stage: 1,
                content: `
# Loops

Loops let us repeat actions without writing the same code over and over.

## Repeat N Times:
\`\`\`
repeat 5 times
    display "Hello!"
end loop
\`\`\`

This displays "Hello!" five times.

## Repeat While (condition is true):
\`\`\`
create variable count to 0
repeat while count is less than 5 do
    display count
    set count to count plus 1
end repeat
\`\`\`

This displays: 0, 1, 2, 3, 4

## For Each (go through a list):
\`\`\`
for each item in list fruits do
    display item
end loop
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write a loop that repeats 3 times and displays "Hi"',
                        type: 'code',
                        expectedOutput: 'Hi\nHi\nHi',
                        hint: 'Use: repeat 3 times\\n    display "Hi"\\nend loop'
                    },
                    {
                        prompt: 'How many times will this display "Hello"?\n\nrepeat 4 times\n    display "Hello"\nend loop',
                        type: 'multiple-choice',
                        options: ['1 time', '3 times', '4 times', '5 times'],
                        answer: 2
                    },
                    {
                        prompt: 'What type of loop goes through each item in a list?',
                        type: 'multiple-choice',
                        options: ['repeat N times', 'repeat while', 'for each', 'do until'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'logic-8',
                title: 'Functions - Reusable Code',
                description: 'Creating reusable blocks of code',
                stage: 1,
                content: `
# Functions

Functions are named blocks of code that you can use over and over.

## Defining a Function:
\`\`\`
define function sayHello with no parameters
    display "Hello, World!"
end function
\`\`\`

## Calling a Function:
\`\`\`
sayHello
\`\`\`

## Functions with Parameters:
\`\`\`
define function greet with parameters name
    display "Hello, " plus name
end function

greet "Alice"
\`\`\`
Output: Hello, Alice

## Functions that Return Values:
\`\`\`
define function add with parameters a, b
    return a plus b
end function

create variable sum to add 5, 3
\`\`\`
sum is now 8
        `,
                exercises: [
                    {
                        prompt: 'Define a function called "shout" that displays "WOW!", then call it.',
                        type: 'code',
                        expectedOutput: 'WOW!',
                        hint: 'Define the function, then call it: shout'
                    },
                    {
                        prompt: 'What does the "return" keyword do in a function?',
                        type: 'multiple-choice',
                        options: ['Displays a value', 'Sends a value back to the caller', 'Creates a variable', 'Ends the program'],
                        answer: 1
                    },
                    {
                        prompt: 'What would add(3, 7) return if add is defined as:\ndefine function add with parameters a, b\n    return a plus b\nend function',
                        type: 'multiple-choice',
                        options: ['3', '7', '10', 'a plus b'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'logic-9',
                title: 'Lists - Collections of Items',
                description: 'Storing multiple values together',
                stage: 1,
                content: `
# Lists

Lists store multiple items in order.

## Creating a List:
\`\`\`
create variable fruits to create list with "apple", "banana", "orange" end list
\`\`\`

## Accessing Items:
Items are numbered starting from 0:
\`\`\`
get item 0 from fruits end get
\`\`\`
Returns: "apple"

## List Operations:
- Get length: how many items
- Add item: put new item at end
- Remove item: take an item out
- Check if contains: is item in list?

## Looping Through Lists:
\`\`\`
for each fruit in list fruits do
    display fruit
end loop
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a list of colors and display each one.',
                        type: 'code',
                        expectedOutput: 'red\nblue\ngreen',
                        hint: 'Create list, then use: for each color in list colors do\\n    display color\\nend loop'
                    },
                    {
                        prompt: 'What index is the first item in a list?',
                        type: 'multiple-choice',
                        options: ['0', '1', '-1', 'first'],
                        answer: 0
                    },
                    {
                        prompt: 'If fruits = ["apple", "banana", "orange"], what is get item 1 from fruits?',
                        type: 'multiple-choice',
                        options: ['apple', 'banana', 'orange', 'Error'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'logic-10',
                title: 'Putting It All Together',
                description: 'Combining everything you learned',
                stage: 1,
                content: `
# Putting It All Together

Let's combine everything to solve a real problem!

## Problem: Find the largest number in a list

\`\`\`
create variable numbers to create list with 5, 2, 9, 1, 7 end list
create variable largest to get item 0 from numbers end get

for each num in list numbers do
    if num is greater than largest then
        set largest to num
    end if
end loop

display "The largest number is: " plus largest
\`\`\`

Output: The largest number is: 9

## What we used:
- Variables ✓
- Lists ✓
- Loops ✓
- Conditions ✓
- Comparisons ✓
        `,
                exercises: [
                    {
                        prompt: 'What will this code display if numbers is [3, 7, 2]?',
                        type: 'multiple-choice',
                        options: ['3', '7', '2', '12'],
                        answer: 1
                    },
                    {
                        prompt: 'In the "find largest" algorithm, why do we start with largest = first item?',
                        type: 'multiple-choice',
                        options: ['It is always the largest', 'We need a starting point to compare against', 'Lists always start with the largest', 'It does not matter'],
                        answer: 1
                    },
                    {
                        prompt: 'What programming concepts did we combine in this lesson?',
                        type: 'multiple-choice',
                        options: ['Only variables', 'Only loops', 'Variables, lists, loops, and conditions', 'Only functions'],
                        answer: 2
                    }
                ]
            }
        ]
    },

    // Python Course - Complete Natural Language → Real Code Progression
    'python': {
        id: 'python',
        name: 'Python',
        description: 'Learn Python from natural language to real code. Perfect for beginners.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🐍',
        color: '#3776ab',
        language: 'python',
        prerequisites: ['intro-logic'],
        estimatedHours: 12,
        lessons: [
            // ============ STAGE 1: Pure Natural Language ============
            {
                id: 'py-1',
                title: 'Your First Python Program',
                description: 'Display messages to the screen',
                stage: 1,
                content: `
# Your First Python Program

Let's start with the classic first program - displaying "Hello, World!"

## In Natural Language:
\`\`\`
display "Hello, World!"
\`\`\`

When you run this, it shows: Hello, World!

## How It Works:
- \`display\` tells the computer to show something on screen
- The text in quotes is what gets shown
- No closing needed - just write what you mean!

## More Examples:
\`\`\`
display "Welcome to Python!"
display "My name is Alice"
display 42
\`\`\`

Try it yourself!
        `,
                exercises: [
                    {
                        prompt: 'Display the message "I am learning Python!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'I am learning Python!',
                        hint: 'Use: display "I am learning Python!"'
                    },
                    {
                        prompt: 'What keyword do we use to show text on the screen?',
                        type: 'multiple-choice',
                        options: ['show', 'display', 'print', 'output'],
                        answer: 1
                    },
                    {
                        prompt: 'Display the number 100',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '100',
                        hint: 'Use: display 100'
                    }
                ]
            },
            {
                id: 'py-2',
                title: 'Variables - Storing Information',
                description: 'Give names to values so you can use them later',
                stage: 1,
                content: `
# Variables in Python

A variable is like a labeled box where you store information.

## Creating Variables:
\`\`\`
create variable name to "Alice"
create variable age to 25
create variable price to 19.99
\`\`\`

## Using Variables:
Once created, just use the name!
\`\`\`
display name
display age
\`\`\`

Output:
Alice
25

## Why Variables?
You can change them later!
\`\`\`
create variable score to 0
display score
set score to 100
display score
\`\`\`

Output:
0
100
        `,
                exercises: [
                    {
                        prompt: 'Create a variable called "city" set to "Tokyo" and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Tokyo',
                        hint: 'First: create variable city to "Tokyo"\\nThen: display city'
                    },
                    {
                        prompt: 'What is a variable in programming?',
                        type: 'multiple-choice',
                        options: ['A type of loop', 'A labeled box that stores information', 'A function', 'A math operation'],
                        answer: 1
                    },
                    {
                        prompt: 'Create a variable "score" set to 50, then change it to 100 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '100',
                        hint: 'Use: create variable score to 50\\nset score to 100\\ndisplay score'
                    }
                ]
            },
            {
                id: 'py-3',
                title: 'Math with Words',
                description: 'Performing calculations using natural language',
                stage: 1,
                content: `
# Math Operations

You can do math by describing what you want!

## Basic Operations:
\`\`\`
display 10 plus 5
display 20 minus 8
display 6 times 7
display 100 divided by 4
\`\`\`

Output:
15
12
42
25

## With Variables:
\`\`\`
create variable price to 50
create variable quantity to 3
create variable total to price times quantity
display total
\`\`\`

Output: 150

## Combining Multiple Operations:
\`\`\`
display 10 plus 5 times 2
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Calculate 8 times 7 and display the result',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '56',
                        hint: 'Use: display 8 times 7'
                    },
                    {
                        prompt: 'What is 100 divided by 4?',
                        type: 'multiple-choice',
                        options: ['20', '25', '30', '40'],
                        answer: 1
                    },
                    {
                        prompt: 'Create variable x to 10, create variable y to 5, display x plus y',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '15',
                        hint: 'Create both variables, then display x plus y'
                    }
                ]
            },
            {
                id: 'py-4',
                title: 'Combining Text',
                description: 'Joining strings together',
                stage: 1,
                content: `
# Combining Text

You can join text together using "plus":

## Simple Joining:
\`\`\`
display "Hello, " plus "World!"
\`\`\`
Output: Hello, World!

## With Variables:
\`\`\`
create variable name to "Sarah"
display "Welcome, " plus name
\`\`\`
Output: Welcome, Sarah

## Multiple Parts:
\`\`\`
create variable first to "John"
create variable last to "Doe"
display first plus " " plus last
\`\`\`
Output: John Doe
        `,
                exercises: [
                    {
                        prompt: 'Create a variable "animal" set to "cat" and display "I have a " plus the animal',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'I have a cat',
                        hint: 'First create the variable, then: display "I have a " plus animal'
                    },
                    {
                        prompt: 'What operator joins text together?',
                        type: 'multiple-choice',
                        options: ['minus', 'plus', 'times', 'divided by'],
                        answer: 1
                    },
                    {
                        prompt: 'Display "Hello" plus " " plus "World"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hello World',
                        hint: 'Use: display "Hello" plus " " plus "World"'
                    }
                ]
            },
            {
                id: 'py-5',
                title: 'Making Decisions with If',
                description: 'Let your program choose what to do',
                stage: 1,
                content: `
# Making Decisions

Programs can make choices based on conditions!

## Basic If:
\`\`\`
create variable age to 20
if age is greater than or equal to 18 then
    display "You are an adult"
end if
\`\`\`
Output: You are an adult

## If with Otherwise:
\`\`\`
create variable temperature to 35
if temperature is greater than 30 then
    display "Hot day!"
otherwise
    display "Nice weather"
end if
\`\`\`
Output: Hot day!

## Comparison Words:
- is equal to
- is not equal to
- is greater than
- is less than
- is greater than or equal to
- is less than or equal to
        `,
                exercises: [
                    {
                        prompt: 'Create variable score to 85. If score is greater than or equal to 60, display "Pass!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Pass!',
                        hint: 'Use: if score is greater than or equal to 60 then\\n    display "Pass!"\\nend if'
                    },
                    {
                        prompt: 'What keyword handles the "else" case in natural language?',
                        type: 'multiple-choice',
                        options: ['else', 'otherwise', 'other', 'or'],
                        answer: 1
                    },
                    {
                        prompt: 'If x is 5, what will display?\nif x is equal to 10 then\n    display "Ten"\notherwise\n    display "Not ten"\nend if',
                        type: 'multiple-choice',
                        options: ['Ten', 'Not ten', 'Nothing', 'Error'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-6',
                title: 'Repeating with Loops',
                description: 'Do things multiple times automatically',
                stage: 1,
                content: `
# Loops - Repeating Actions

Instead of writing the same thing over and over, use loops!

## Repeat N Times:
\`\`\`
repeat 3 times
    display "Hello!"
end loop
\`\`\`

Output:
Hello!
Hello!
Hello!

## With Variables:
\`\`\`
create variable count to 1
repeat 4 times
    display count
    set count to count plus 1
end loop
\`\`\`

Output:
1
2
3
4
        `,
                exercises: [
                    {
                        prompt: 'Write a loop that displays "Python" 5 times',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Python\nPython\nPython\nPython\nPython',
                        hint: 'Use: repeat 5 times\\n    display "Python"\\nend loop'
                    },
                    {
                        prompt: 'How many times will this loop display "Hi"?\nrepeat 3 times\n    display "Hi"\nend loop',
                        type: 'multiple-choice',
                        options: ['1', '2', '3', '4'],
                        answer: 2
                    },
                    {
                        prompt: 'Display the numbers 1, 2, 3 using a loop with a counter variable',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '1\n2\n3',
                        hint: 'Create a count variable, repeat 3 times, display count, increment count'
                    }
                ]
            },
            {
                id: 'py-7',
                title: 'While Loops',
                description: 'Repeat while a condition is true',
                stage: 1,
                content: `
# While Loops

Keep repeating while something is true!

## Basic While:
\`\`\`
create variable count to 0
repeat while count is less than 3 do
    display count
    set count to count plus 1
end repeat
\`\`\`

Output:
0
1
2

## Countdown Example:
\`\`\`
create variable rocket to 5
repeat while rocket is greater than 0 do
    display rocket
    set rocket to rocket minus 1
end repeat
display "Liftoff!"
\`\`\`

Output:
5
4
3
2
1
Liftoff!
        `,
                exercises: [
                    {
                        prompt: 'Create a countdown from 3 to 1, then display "Go!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '3\n2\n1\nGo!',
                        hint: 'Create variable n to 3, repeat while n is greater than 0, display n, decrease n, end repeat, display "Go!"'
                    },
                    {
                        prompt: 'What type of loop repeats while a condition stays true?',
                        type: 'multiple-choice',
                        options: ['repeat N times', 'while loop', 'for each loop', 'if statement'],
                        answer: 1
                    },
                    {
                        prompt: 'How many times will this run?\ncount = 0\nrepeat while count < 2 do\n    display count\nend repeat',
                        type: 'multiple-choice',
                        options: ['0 times', '1 time', '2 times', 'Forever (infinite)'],
                        answer: 3
                    }
                ]
            },
            {
                id: 'py-8',
                title: 'Lists - Collections of Items',
                description: 'Store multiple values together',
                stage: 1,
                content: `
# Lists

Lists hold multiple items in order.

## Creating a List:
\`\`\`
create variable colors to create list with "red", "green", "blue" end list
\`\`\`

## Looping Through Lists:
\`\`\`
create variable fruits to create list with "apple", "banana", "orange" end list
for each fruit in list fruits do
    display fruit
end loop
\`\`\`

Output:
apple
banana
orange

## Getting Specific Items:
\`\`\`
create variable numbers to create list with 10, 20, 30 end list
display get item 0 from numbers end get
\`\`\`

Output: 10

Note: Lists start counting at 0!
        `,
                exercises: [
                    {
                        prompt: 'Create a list of animals with "cat", "dog", "bird" and display each one',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'cat\ndog\nbird',
                        hint: 'Create the list, then: for each animal in list animals do\\n    display animal\\nend loop'
                    },
                    {
                        prompt: 'What index is the first item in a list?',
                        type: 'multiple-choice',
                        options: ['1', '0', '-1', 'first'],
                        answer: 1
                    },
                    {
                        prompt: 'If nums = [10, 20, 30], what is get item 2 from nums?',
                        type: 'multiple-choice',
                        options: ['10', '20', '30', 'Error'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-9',
                title: 'Functions - Reusable Code',
                description: 'Create your own commands',
                stage: 1,
                content: `
# Functions

Functions are reusable blocks of code you can call by name.

## Simple Function:
\`\`\`
define function sayHello with no parameters
    display "Hello, World!"
end function

sayHello
\`\`\`

Output: Hello, World!

## Function with Input:
\`\`\`
define function greet with parameters name
    display "Hello, " plus name
end function

greet "Alice"
greet "Bob"
\`\`\`

Output:
Hello, Alice
Hello, Bob
        `,
                exercises: [
                    {
                        prompt: 'Define a function called "cheer" that displays "Hooray!" and call it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hooray!',
                        hint: 'define function cheer with no parameters\\n    display "Hooray!"\\nend function\\ncheer'
                    },
                    {
                        prompt: 'What is a function in programming?',
                        type: 'multiple-choice',
                        options: ['A type of variable', 'A reusable block of code', 'A loop structure', 'A comparison'],
                        answer: 1
                    },
                    {
                        prompt: 'Define a function "double" with parameter x that displays x * 2, then call it with 5',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '10',
                        hint: 'define function double with parameters x\\n    display x * 2\\nend function\\ndouble 5'
                    }
                ]
            },
            // ============ STAGE 2: Introducing Symbols ============
            {
                id: 'py-10',
                title: 'Introducing Symbols: Math',
                description: 'Start using +, -, *, / instead of words',
                stage: 2,
                content: `
# Time for Symbols!

Real programmers use symbols for math. Let's learn them!

## Symbol Translation:
| Words | Symbol |
|-------|--------|
| plus | + |
| minus | - |
| times | * |
| divided by | / |

## Before (Stage 1):
\`\`\`
display 10 plus 5
display 20 minus 8
display 6 times 7
\`\`\`

## Now (Stage 2):
\`\`\`
display 10 + 5
display 20 - 8
display 6 * 7
\`\`\`

Same output, shorter code!
        `,
                exercises: [
                    {
                        prompt: 'Calculate 15 * 4 + 10 and display the result',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '70',
                        hint: 'Use: display 15 * 4 + 10'
                    },
                    {
                        prompt: 'What symbol represents "times" (multiplication)?',
                        type: 'multiple-choice',
                        options: ['x', '*', 'X', '^'],
                        answer: 1
                    },
                    {
                        prompt: 'What symbol represents "divided by"?',
                        type: 'multiple-choice',
                        options: ['\\\\', '/', ':', '%'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-11',
                title: 'Comparison Symbols',
                description: 'Use <, >, ==, != for comparisons',
                stage: 2,
                content: `
# Comparison Symbols

Now let's use symbols for comparisons!

## Symbol Translation:
| Words | Symbol |
|-------|--------|
| is less than | < |
| is greater than | > |
| is less than or equal to | <= |
| is greater than or equal to | >= |
| is equal to | == |
| is not equal to | != |

## Before:
\`\`\`
if age is greater than or equal to 18 then
\`\`\`

## Now:
\`\`\`
if age >= 18 then
\`\`\`

Much shorter!
        `,
                exercises: [
                    {
                        prompt: 'Create variable x to 25. If x > 20, display "Big number"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Big number',
                        hint: 'Use: if x > 20 then\\n    display "Big number"\\nend if'
                    },
                    {
                        prompt: 'What symbol means "is equal to"?',
                        type: 'multiple-choice',
                        options: ['=', '==', '===', ':='],
                        answer: 1
                    },
                    {
                        prompt: 'What symbol means "is not equal to"?',
                        type: 'multiple-choice',
                        options: ['<>', '!=', '/=', '~='],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-12',
                title: 'Logical Operators',
                description: 'Combine conditions with and, or',
                stage: 2,
                content: `
# Combining Conditions

Use "and" and "or" to combine multiple conditions!

## Using AND:
\`\`\`
create variable age to 25
create variable hasTicket to true value
if age >= 18 and hasTicket then
    display "Welcome to the show!"
end if
\`\`\`
Output: Welcome to the show!

## Using OR:
\`\`\`
create variable day to "Saturday"
if day == "Saturday" or day == "Sunday" then
    display "Weekend!"
end if
\`\`\`
Output: Weekend!
        `,
                exercises: [
                    {
                        prompt: 'Create variable temp to 25. If temp >= 20 and temp <= 30, display "Perfect weather"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Perfect weather',
                        hint: 'Use: if temp >= 20 and temp <= 30 then'
                    },
                    {
                        prompt: 'If A is true and B is false, what is "A and B"?',
                        type: 'multiple-choice',
                        options: ['true', 'false'],
                        answer: 1
                    },
                    {
                        prompt: 'If A is true and B is false, what is "A or B"?',
                        type: 'multiple-choice',
                        options: ['true', 'false'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'py-13',
                title: 'Assignment with Equals',
                description: 'Use = instead of "to" for assignment',
                stage: 2,
                content: `
# Assignment with =

In real code, we use = to assign values!

## Before:
\`\`\`
create variable score to 100
set score to score + 10
\`\`\`

## Now:
\`\`\`
create variable score = 100
set score = score + 10
\`\`\`

## Even Shorter - Compound Assignment:
\`\`\`
create variable count = 0
set count = count + 1
\`\`\`

Coming in Stage 3: count += 1 (even shorter!)
        `,
                exercises: [
                    {
                        prompt: 'Create variable total = 50. Add 25 to it (set total = total + 25). Display total.',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '75',
                        hint: 'create variable total = 50\\nset total = total + 25\\ndisplay total'
                    },
                    {
                        prompt: 'What symbol is used for assignment in Python?',
                        type: 'multiple-choice',
                        options: [':', '==', '=', '<-'],
                        answer: 2
                    },
                    {
                        prompt: 'If x = 10, what is x after: set x = x * 2?',
                        type: 'multiple-choice',
                        options: ['10', '20', '12', 'x * 2'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 3: Code-Like Structure ============
            {
                id: 'py-14',
                title: 'Real Print Statements',
                description: 'Using print() instead of display',
                stage: 3,
                content: `
# Real Python: print()

Now let's use Python's actual print function!

## Translation:
| Natural | Python |
|---------|--------|
| display "Hello" | print("Hello") |
| display x | print(x) |
| display a + b | print(a + b) |

## Examples:
\`\`\`
print("Hello, Python!")
print(42)
print(10 + 5)
\`\`\`

Output:
Hello, Python!
42
15

## With Variables:
\`\`\`
create variable name = "Alice"
print(name)
print("Hello, " + name)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Use print() to display "Real Python!"',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'Real Python!',
                        hint: 'Use: print("Real Python!")'
                    },
                    {
                        prompt: 'What is the Python function to display output?',
                        type: 'multiple-choice',
                        options: ['display()', 'print()', 'show()', 'output()'],
                        answer: 1
                    },
                    {
                        prompt: 'Use print() to display the number 42',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '42',
                        hint: 'Use: print(42)'
                    }
                ]
            },
            {
                id: 'py-15',
                title: 'Variable Assignment',
                description: 'Drop "create variable" - just use name = value',
                stage: 3,
                content: `
# Python Variable Syntax

In real Python, creating variables is simple!

## Before:
\`\`\`
create variable name = "Alice"
create variable age = 25
\`\`\`

## Real Python:
\`\`\`python
name = "Alice"
age = 25
\`\`\`

Just name = value. That's it!

## Changing Variables:
\`\`\`python
score = 0
score = 100
score = score + 10
print(score)
\`\`\`

Output: 110
        `,
                exercises: [
                    {
                        prompt: 'Create variable greeting as "Hello" (Python style), then print it',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'Hello',
                        hint: 'Use: greeting = "Hello"\\nprint(greeting)'
                    },
                    {
                        prompt: 'In Python, how do you create a variable x with value 5?',
                        type: 'multiple-choice',
                        options: ['var x = 5', 'let x = 5', 'x = 5', 'create x = 5'],
                        answer: 2
                    },
                    {
                        prompt: 'Create two variables a = 10 and b = 20, then print their sum',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '30',
                        hint: 'a = 10\\nb = 20\\nprint(a + b)'
                    }
                ]
            },
            {
                id: 'py-16',
                title: 'Python If Statements',
                description: 'Real Python if/else with colons and indentation',
                stage: 3,
                content: `
# Python If Syntax

Python uses colons (:) and indentation instead of "then" and "end if"

## Before:
\`\`\`
if x > 5 then
    display "Big"
otherwise
    display "Small"
end if
\`\`\`

## Real Python:
\`\`\`python
if x > 5:
    print("Big")
else:
    print("Small")
\`\`\`

## Key Changes:
- \`then\` becomes \`:\`
- \`otherwise\` becomes \`else:\`
- \`end if\` disappears (indentation handles it!)
        `,
                exercises: [
                    {
                        prompt: 'Write Python: x = 10. If x > 5, print "Yes", else print "No"',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'Yes',
                        hint: 'x = 10\\nif x > 5:\\n    print("Yes")\\nelse:\\n    print("No")'
                    },
                    {
                        prompt: 'What replaces "then" in Python if statements?',
                        type: 'multiple-choice',
                        options: ['then', 'do', ':', '{'],
                        answer: 2
                    },
                    {
                        prompt: 'How does Python know where an if block ends?',
                        type: 'multiple-choice',
                        options: ['end if keyword', 'closing brace }', 'indentation level', 'semicolon'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-17',
                title: 'Python For Loops',
                description: 'The Python for loop syntax',
                stage: 3,
                content: `
# Python For Loops

Python has a clean for loop syntax!

## Looping Through a List:
\`\`\`python
fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)
\`\`\`

Output:
apple
banana
orange

## Looping N Times with range():
\`\`\`python
for i in range(3):
    print(i)
\`\`\`

Output:
0
1
2

## range() Examples:
- range(5) → 0, 1, 2, 3, 4
- range(1, 4) → 1, 2, 3
- range(0, 10, 2) → 0, 2, 4, 6, 8
        `,
                exercises: [
                    {
                        prompt: 'Use a for loop with range(4) to print numbers 0 through 3',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '0\n1\n2\n3',
                        hint: 'for i in range(4):\\n    print(i)'
                    },
                    {
                        prompt: 'What does range(3) produce?',
                        type: 'multiple-choice',
                        options: ['1, 2, 3', '0, 1, 2', '0, 1, 2, 3', '1, 2'],
                        answer: 1
                    },
                    {
                        prompt: 'Loop through fruits = ["a", "b", "c"] and print each',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'a\nb\nc',
                        hint: 'fruits = ["a", "b", "c"]\\nfor f in fruits:\\n    print(f)'
                    }
                ]
            },
            {
                id: 'py-18',
                title: 'Python Functions with def',
                description: 'Creating functions the Python way',
                stage: 3,
                content: `
# Python Functions

Use \`def\` to define functions in Python!

## Before:
\`\`\`
define function greet with parameters name
    display "Hello, " + name
end function
\`\`\`

## Real Python:
\`\`\`python
def greet(name):
    print("Hello, " + name)
\`\`\`

## Calling Functions:
\`\`\`python
def greet(name):
    print("Hello, " + name)

greet("Alice")
greet("Bob")
\`\`\`

Output:
Hello, Alice
Hello, Bob

## Functions that Return Values:
\`\`\`python
def add(a, b):
    return a + b

result = add(5, 3)
print(result)
\`\`\`

Output: 8
        `,
                exercises: [
                    {
                        prompt: 'Define a function "double" that takes n and returns n * 2. Call it with 7 and print the result.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '14',
                        hint: 'def double(n):\\n    return n * 2\\nprint(double(7))'
                    },
                    {
                        prompt: 'What keyword defines a function in Python?',
                        type: 'multiple-choice',
                        options: ['function', 'func', 'def', 'define'],
                        answer: 2
                    },
                    {
                        prompt: 'Define a function "add" that takes a and b and returns a + b. Print add(3, 5)',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '8',
                        hint: 'def add(a, b):\\n    return a + b\\nprint(add(3, 5))'
                    }
                ]
            },
            // ============ STAGE 4: Full Python ============
            {
                id: 'py-19',
                title: 'Python Lists Deep Dive',
                description: 'Full Python list operations',
                stage: 4,
                content: `
# Python Lists - Full Power

## Creating Lists:
\`\`\`python
numbers = [1, 2, 3, 4, 5]
names = ["Alice", "Bob", "Charlie"]
mixed = [1, "hello", True, 3.14]
\`\`\`

## List Operations:
\`\`\`python
fruits = ["apple", "banana"]

# Add to end
fruits.append("orange")

# Get length
print(len(fruits))

# Access by index
print(fruits[0])  # First
print(fruits[-1]) # Last

# Slice
print(fruits[0:2])
\`\`\`

## List Comprehensions (Advanced):
\`\`\`python
squares = [x * x for x in range(5)]
print(squares)  # [0, 1, 4, 9, 16]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a list [1, 2, 3], append 4, then print the length',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '4',
                        hint: 'nums = [1, 2, 3]\\nnums.append(4)\\nprint(len(nums))'
                    },
                    {
                        prompt: 'What method adds an item to the end of a list?',
                        type: 'multiple-choice',
                        options: ['add()', 'push()', 'append()', 'insert()'],
                        answer: 2
                    },
                    {
                        prompt: 'What is fruits[-1] if fruits = ["a", "b", "c"]?',
                        type: 'multiple-choice',
                        options: ['a', 'b', 'c', 'Error'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-20',
                title: 'String Methods',
                description: 'Working with text in Python',
                stage: 4,
                content: `
# Python String Methods

Strings have many useful methods!

## Common Methods:
\`\`\`python
text = "Hello, World!"

print(text.upper())      # HELLO, WORLD!
print(text.lower())      # hello, world!
print(text.replace("World", "Python"))  # Hello, Python!
print(len(text))         # 13
\`\`\`

## F-Strings (Formatted Strings):
\`\`\`python
name = "Alice"
age = 25
print(f"My name is {name} and I am {age}")
\`\`\`

Output: My name is Alice and I am 25

## Split and Join:
\`\`\`python
words = "apple,banana,orange".split(",")
print(words)  # ['apple', 'banana', 'orange']

joined = "-".join(words)
print(joined)  # apple-banana-orange
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create name = "python". Print name.upper()',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'PYTHON',
                        hint: 'name = "python"\\nprint(name.upper())'
                    },
                    {
                        prompt: 'What does .lower() do to a string?',
                        type: 'multiple-choice',
                        options: ['Makes it uppercase', 'Makes it lowercase', 'Reverses it', 'Trims spaces'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the syntax for f-strings?',
                        type: 'multiple-choice',
                        options: ['"Hello {name}"', 'f"Hello {name}"', '"Hello" + name', '"Hello $name"'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-21',
                title: 'Dictionaries',
                description: 'Key-value data storage',
                stage: 4,
                content: `
# Python Dictionaries

Dictionaries store key-value pairs.

## Creating Dictionaries:
\`\`\`python
person = {
    "name": "Alice",
    "age": 25,
    "city": "Tokyo"
}
\`\`\`

## Accessing Values:
\`\`\`python
print(person["name"])  # Alice
print(person.get("age"))  # 25
\`\`\`

## Adding/Modifying:
\`\`\`python
person["email"] = "alice@example.com"
person["age"] = 26
\`\`\`

## Looping:
\`\`\`python
for key, value in person.items():
    print(f"{key}: {value}")
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a dictionary with "name": "Bob" and "score": 100. Print the score.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '100',
                        hint: 'data = {"name": "Bob", "score": 100}\\nprint(data["score"])'
                    },
                    {
                        prompt: 'How do you access a value in a dictionary?',
                        type: 'multiple-choice',
                        options: ['dict.key', 'dict[key]', 'dict(key)', 'dict->key'],
                        answer: 1
                    },
                    {
                        prompt: 'What method returns both keys and values when looping?',
                        type: 'multiple-choice',
                        options: ['.keys()', '.values()', '.items()', '.pairs()'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-22',
                title: 'Error Handling',
                description: 'Catching and handling errors gracefully',
                stage: 4,
                content: `
# Error Handling with try/except

Sometimes things go wrong. Handle it gracefully!

## Basic Try/Except:
\`\`\`python
try:
    result = 10 / 0
except:
    print("Something went wrong!")
\`\`\`

Output: Something went wrong!

## Catching Specific Errors:
\`\`\`python
try:
    number = int("hello")
except ValueError:
    print("That's not a valid number!")
\`\`\`

## Try/Except/Finally:
\`\`\`python
try:
    file = open("data.txt")
except FileNotFoundError:
    print("File not found")
finally:
    print("This always runs")
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write try/except: try to divide 10 by 0, except print "Cannot divide by zero"',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'Cannot divide by zero',
                        hint: 'try:\\n    result = 10 / 0\\nexcept:\\n    print("Cannot divide by zero")'
                    },
                    {
                        prompt: 'What keyword starts error handling in Python?',
                        type: 'multiple-choice',
                        options: ['catch', 'try', 'handle', 'error'],
                        answer: 1
                    },
                    {
                        prompt: 'What block always executes regardless of errors?',
                        type: 'multiple-choice',
                        options: ['except', 'else', 'finally', 'always'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-23',
                title: 'Complete Python Project',
                description: 'Putting it all together',
                stage: 4,
                content: `
# Complete Python Program

You now know enough to write full Python programs!

## Example: Grade Calculator
\`\`\`python
def calculate_grade(score):
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    else:
        return "F"

students = [
    {"name": "Alice", "score": 95},
    {"name": "Bob", "score": 72},
    {"name": "Charlie", "score": 88}
]

for student in students:
    grade = calculate_grade(student["score"])
    print(f"{student['name']}: {grade}")
\`\`\`

Output:
Alice: A
Bob: C
Charlie: B

Keep practicing and building projects! 🎉
        `,
                exercises: [
                    {
                        prompt: 'Write a function that takes a number and returns "even" or "odd". Test it with 7.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'odd',
                        hint: 'def check(n):\\n    if n % 2 == 0:\\n        return "even"\\n    else:\\n        return "odd"\\nprint(check(7))'
                    },
                    {
                        prompt: 'What operator gives the remainder of division?',
                        type: 'multiple-choice',
                        options: ['/', '//', '%', '**'],
                        answer: 2
                    },
                    {
                        prompt: 'Write a function "is_positive" that returns True if n > 0, else False. Test with -5.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: 'False',
                        hint: 'def is_positive(n):\\n    return n > 0\\nprint(is_positive(-5))'
                    }
                ]
            },
            // ============ ADVANCED PYTHON - File I/O ============
            {
                id: 'py-24',
                title: 'Reading Files',
                description: 'How to read data from files',
                stage: 4,
                content: `
# Reading Files in Python

Python makes it easy to read files from your computer.

## Opening and Reading Files:
\`\`\`python
# Read entire file
with open("data.txt", "r") as file:
    content = file.read()
    print(content)

# Read line by line
with open("data.txt", "r") as file:
    for line in file:
        print(line.strip())
\`\`\`

## Key Concepts:
- \`open()\` opens a file
- \`"r"\` means read mode
- \`with\` ensures file closes automatically
- \`.read()\` gets entire content
- \`.readline()\` gets one line
- \`.readlines()\` returns list of lines
- \`.strip()\` removes whitespace

## Reading into a List:
\`\`\`python
with open("names.txt", "r") as file:
    names = file.readlines()
    names = [name.strip() for name in names]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What mode letter opens a file for reading?',
                        type: 'multiple-choice',
                        options: ['r', 'w', 'a', 'x'],
                        answer: 0
                    },
                    {
                        prompt: 'What keyword ensures a file is automatically closed?',
                        type: 'multiple-choice',
                        options: ['try', 'with', 'open', 'close'],
                        answer: 1
                    },
                    {
                        prompt: 'What method reads the entire file contents as a string?',
                        type: 'multiple-choice',
                        options: ['.readline()', '.readlines()', '.read()', '.content()'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-25',
                title: 'Writing Files',
                description: 'How to write data to files',
                stage: 4,
                content: `
# Writing Files in Python

Save data to files for permanent storage.

## Write Mode (creates/overwrites):
\`\`\`python
with open("output.txt", "w") as file:
    file.write("Hello, World!\\n")
    file.write("Second line\\n")
\`\`\`

## Append Mode (adds to end):
\`\`\`python
with open("log.txt", "a") as file:
    file.write("New log entry\\n")
\`\`\`

## Writing Multiple Lines:
\`\`\`python
lines = ["Line 1", "Line 2", "Line 3"]
with open("data.txt", "w") as file:
    for line in lines:
        file.write(line + "\\n")

# Or use writelines
with open("data.txt", "w") as file:
    file.writelines([line + "\\n" for line in lines])
\`\`\`

## Mode Summary:
- \`"w"\` - Write (overwrites existing)
- \`"a"\` - Append (adds to end)
- \`"x"\` - Create (fails if exists)
        `,
                exercises: [
                    {
                        prompt: 'Which mode adds content to the end of a file without erasing?',
                        type: 'multiple-choice',
                        options: ['w', 'a', 'r', 'x'],
                        answer: 1
                    },
                    {
                        prompt: 'Which mode overwrites existing file content?',
                        type: 'multiple-choice',
                        options: ['r', 'a', 'w', 'x'],
                        answer: 2
                    },
                    {
                        prompt: 'What method writes a string to a file?',
                        type: 'multiple-choice',
                        options: ['.put()', '.write()', '.save()', '.print()'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-26',
                title: 'Working with CSV Files',
                description: 'Read and write spreadsheet-like data',
                stage: 4,
                content: `
# CSV Files in Python

CSV (Comma-Separated Values) files store tabular data.

## Reading CSV:
\`\`\`python
import csv

with open("data.csv", "r") as file:
    reader = csv.reader(file)
    for row in reader:
        print(row)  # row is a list

# With headers
with open("data.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        print(row["name"], row["age"])
\`\`\`

## Writing CSV:
\`\`\`python
import csv

data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "NYC"],
    ["Bob", 25, "LA"]
]

with open("output.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerows(data)
\`\`\`

## DictWriter for dictionaries:
\`\`\`python
import csv

users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25}
]

with open("users.csv", "w", newline="") as file:
    fieldnames = ["name", "age"]
    writer = csv.DictWriter(file, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(users)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What module do you import to work with CSV files?',
                        type: 'multiple-choice',
                        options: ['csv', 'pandas', 'file', 'spreadsheet'],
                        answer: 0
                    },
                    {
                        prompt: 'What class reads CSV rows as dictionaries?',
                        type: 'multiple-choice',
                        options: ['csv.reader', 'csv.DictReader', 'csv.dict', 'csv.Parser'],
                        answer: 1
                    },
                    {
                        prompt: 'What argument is needed when writing CSV on Windows?',
                        type: 'multiple-choice',
                        options: ['mode="w"', 'newline=""', 'encoding="utf-8"', 'binary=True'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-27',
                title: 'JSON Data',
                description: 'Work with JSON data format',
                stage: 4,
                content: `
# JSON in Python

JSON (JavaScript Object Notation) is a common data format.

## Reading JSON:
\`\`\`python
import json

# From string
data = json.loads('{"name": "Alice", "age": 30}')
print(data["name"])  # Alice

# From file
with open("data.json", "r") as file:
    data = json.load(file)
\`\`\`

## Writing JSON:
\`\`\`python
import json

user = {"name": "Alice", "age": 30, "city": "NYC"}

# To string
json_string = json.dumps(user)
print(json_string)

# To file
with open("user.json", "w") as file:
    json.dump(user, file, indent=2)  # indent for pretty printing
\`\`\`

## Key Functions:
- \`json.loads()\` - Parse JSON string
- \`json.dumps()\` - Convert to JSON string
- \`json.load()\` - Read from file
- \`json.dump()\` - Write to file
        `,
                exercises: [
                    {
                        prompt: 'What function reads JSON from a file?',
                        type: 'multiple-choice',
                        options: ['json.loads()', 'json.load()', 'json.read()', 'json.parse()'],
                        answer: 1
                    },
                    {
                        prompt: 'What function converts Python dict to JSON string?',
                        type: 'multiple-choice',
                        options: ['json.dump()', 'json.dumps()', 'json.stringify()', 'json.encode()'],
                        answer: 1
                    },
                    {
                        prompt: 'What argument makes JSON output readable with indentation?',
                        type: 'multiple-choice',
                        options: ['pretty=True', 'format=True', 'indent=2', 'readable=True'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Error Handling ============
            {
                id: 'py-28',
                title: 'Exception Handling',
                description: 'Handle errors gracefully with try/except',
                stage: 4,
                content: `
# Exception Handling in Python

Errors happen! Handle them gracefully.

## Basic Try/Except:
\`\`\`python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

## Catching Multiple Exceptions:
\`\`\`python
try:
    number = int(input("Enter a number: "))
    result = 10 / number
except ValueError:
    print("That's not a valid number!")
except ZeroDivisionError:
    print("Cannot divide by zero!")
\`\`\`

## Catch All Exceptions:
\`\`\`python
try:
    risky_operation()
except Exception as e:
    print(f"An error occurred: {e}")
\`\`\`

## Finally Block:
\`\`\`python
try:
    file = open("data.txt", "r")
    data = file.read()
except FileNotFoundError:
    print("File not found!")
finally:
    file.close()  # Always runs!
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword is used to handle exceptions?',
                        type: 'multiple-choice',
                        options: ['catch', 'except', 'handle', 'error'],
                        answer: 1
                    },
                    {
                        prompt: 'What exception is raised when dividing by zero?',
                        type: 'multiple-choice',
                        options: ['DivisionError', 'ZeroDivisionError', 'MathError', 'ValueError'],
                        answer: 1
                    },
                    {
                        prompt: 'What block always executes whether or not an exception occurs?',
                        type: 'multiple-choice',
                        options: ['else', 'except', 'finally', 'always'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-29',
                title: 'Raising Exceptions',
                description: 'Create and raise your own exceptions',
                stage: 4,
                content: `
# Raising Exceptions

Sometimes YOU need to signal an error!

## Raising Built-in Exceptions:
\`\`\`python
def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero!")
    return a / b

try:
    result = divide(10, 0)
except ValueError as e:
    print(e)
\`\`\`

## Common Exception Types:
- \`ValueError\` - Wrong value type
- \`TypeError\` - Wrong data type
- \`IndexError\` - Index out of range
- \`KeyError\` - Dictionary key not found
- \`FileNotFoundError\` - File doesn't exist
- \`AttributeError\` - Missing attribute

## Custom Exceptions:
\`\`\`python
class InvalidAgeError(Exception):
    pass

def set_age(age):
    if age < 0:
        raise InvalidAgeError("Age cannot be negative!")
    return age

try:
    age = set_age(-5)
except InvalidAgeError as e:
    print(e)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword creates and throws an exception?',
                        type: 'multiple-choice',
                        options: ['throw', 'raise', 'error', 'exception'],
                        answer: 1
                    },
                    {
                        prompt: 'What class do custom exceptions inherit from?',
                        type: 'multiple-choice',
                        options: ['Error', 'Exception', 'BaseException', 'CustomError'],
                        answer: 1
                    },
                    {
                        prompt: 'What exception is raised for invalid dictionary keys?',
                        type: 'multiple-choice',
                        options: ['IndexError', 'KeyError', 'ValueError', 'LookupError'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED PYTHON - OOP Deep Dive ============
            {
                id: 'py-30',
                title: 'Class Inheritance',
                description: 'Create child classes that inherit from parents',
                stage: 4,
                content: `
# Inheritance in Python

Classes can inherit from other classes!

## Basic Inheritance:
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

dog = Dog("Rex")
cat = Cat("Whiskers")
print(dog.speak())  # Rex says Woof!
print(cat.speak())  # Whiskers says Meow!
\`\`\`

## Super() for Parent Methods:
\`\`\`python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # Call parent constructor
        self.breed = breed
\`\`\`

## Check Inheritance:
\`\`\`python
print(isinstance(dog, Dog))     # True
print(isinstance(dog, Animal))  # True
print(issubclass(Dog, Animal))  # True
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function calls the parent class method?',
                        type: 'multiple-choice',
                        options: ['parent()', 'super()', 'base()', 'self()'],
                        answer: 1
                    },
                    {
                        prompt: 'What function checks if an object is an instance of a class?',
                        type: 'multiple-choice',
                        options: ['typeof()', 'isinstance()', 'type()', 'isclass()'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you indicate inheritance in Python?',
                        type: 'multiple-choice',
                        options: ['class Dog extends Animal', 'class Dog(Animal)', 'class Dog : Animal', 'class Dog inherits Animal'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-31',
                title: 'Class Methods and Static Methods',
                description: 'Methods that belong to the class itself',
                stage: 4,
                content: `
# Class and Static Methods

Not all methods need an instance!

## Instance Methods (normal):
\`\`\`python
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):  # self = instance
        self.count += 1
\`\`\`

## Class Methods:
\`\`\`python
class Counter:
    total = 0  # Class variable
    
    @classmethod
    def increment_total(cls):  # cls = class
        cls.total += 1
    
    @classmethod
    def from_string(cls, string):
        # Alternative constructor
        return cls(int(string))
\`\`\`

## Static Methods:
\`\`\`python
class Math:
    @staticmethod
    def add(a, b):  # No self or cls
        return a + b
    
    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(Math.add(5, 3))      # 8
print(Math.is_even(4))     # True
\`\`\`

## When to Use:
- **Instance**: Needs access to self
- **Class**: Needs access to class, not instance
- **Static**: Doesn't need class or instance
        `,
                exercises: [
                    {
                        prompt: 'What decorator creates a method that belongs to the class?',
                        type: 'multiple-choice',
                        options: ['@staticmethod', '@classmethod', '@method', '@class'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the first parameter of a class method?',
                        type: 'multiple-choice',
                        options: ['self', 'cls', 'this', 'class'],
                        answer: 1
                    },
                    {
                        prompt: 'Static methods have access to:',
                        type: 'multiple-choice',
                        options: ['self', 'cls', 'Both self and cls', 'Neither self nor cls'],
                        answer: 3
                    }
                ]
            },
            {
                id: 'py-32',
                title: 'Properties and Encapsulation',
                description: 'Control access to class attributes',
                stage: 4,
                content: `
# Properties in Python

Control how attributes are accessed and modified!

## The Problem:
\`\`\`python
class Person:
    def __init__(self, age):
        self.age = age  # Anyone can set this to -5!
\`\`\`

## The Solution - Property:
\`\`\`python
class Person:
    def __init__(self, age):
        self._age = age  # Convention: _ means "private"
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative!")
        self._age = value

person = Person(25)
print(person.age)   # 25 (uses getter)
person.age = 30     # Uses setter
person.age = -5     # Raises ValueError!
\`\`\`

## Read-Only Property:
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2
    
    # No setter = read-only!

circle = Circle(5)
print(circle.area)  # 78.54
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What decorator creates a getter property?',
                        type: 'multiple-choice',
                        options: ['@getter', '@property', '@get', '@attribute'],
                        answer: 1
                    },
                    {
                        prompt: 'What naming convention indicates a "private" attribute in Python?',
                        type: 'multiple-choice',
                        options: ['private_name', '_name', '__name', 'p_name'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you create a read-only property?',
                        type: 'multiple-choice',
                        options: ['Use @readonly decorator', 'Don\'t define a setter', 'Use private keyword', 'Set readonly=True'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-33',
                title: 'Magic Methods (Dunder Methods)',
                description: 'Special methods that customize class behavior',
                stage: 4,
                content: `
# Magic Methods in Python

Methods with double underscores have special powers!

## Common Magic Methods:
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):  # For print()
        return f"Vector({self.x}, {self.y})"
    
    def __repr__(self):  # For debugging
        return f"Vector({self.x!r}, {self.y!r})"
    
    def __add__(self, other):  # For +
        return Vector(self.x + other.x, self.y + other.y)
    
    def __eq__(self, other):  # For ==
        return self.x == other.x and self.y == other.y
    
    def __len__(self):  # For len()
        return int((self.x**2 + self.y**2)**0.5)

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1)           # Vector(3, 4)
print(v1 + v2)      # Vector(4, 6)
print(v1 == v2)     # False
print(len(v1))      # 5
\`\`\`

## More Magic Methods:
- \`__sub__\` - Subtraction (-)
- \`__mul__\` - Multiplication (*)
- \`__getitem__\` - Indexing ([])
- \`__iter__\` - Make iterable
- \`__call__\` - Make callable ()
        `,
                exercises: [
                    {
                        prompt: 'What magic method customizes the + operator?',
                        type: 'multiple-choice',
                        options: ['__plus__', '__add__', '__sum__', '__concat__'],
                        answer: 1
                    },
                    {
                        prompt: 'What magic method is called by print()?',
                        type: 'multiple-choice',
                        options: ['__print__', '__str__', '__repr__', '__display__'],
                        answer: 1
                    },
                    {
                        prompt: 'What magic method enables len() on your class?',
                        type: 'multiple-choice',
                        options: ['__length__', '__size__', '__len__', '__count__'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Comprehensions ============
            {
                id: 'py-34',
                title: 'Advanced List Comprehensions',
                description: 'Powerful one-liners for list creation',
                stage: 4,
                content: `
# Advanced List Comprehensions

Go beyond basic comprehensions!

## Conditional Comprehensions:
\`\`\`python
# Filter only even numbers
evens = [x for x in range(20) if x % 2 == 0]
print(evens)  # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# If-else in comprehension
labels = ["even" if x % 2 == 0 else "odd" for x in range(5)]
print(labels)  # ['even', 'odd', 'even', 'odd', 'even']
\`\`\`

## Nested Loops:
\`\`\`python
# Flatten a 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6]

# Create pairs
pairs = [(x, y) for x in range(3) for y in range(3)]
# [(0,0), (0,1), (0,2), (1,0), ...]
\`\`\`

## Multiple Conditions:
\`\`\`python
# Numbers divisible by 2 AND 3
nums = [x for x in range(30) if x % 2 == 0 if x % 3 == 0]
print(nums)  # [0, 6, 12, 18, 24]
\`\`\`
        `,
                exercise: {
                    prompt: 'Create a list of squares of even numbers from 1-10.',
                    type: 'code',
                    language: 'python',
                    expectedOutput: '[4, 16, 36, 64, 100]',
                    hint: 'print([x**2 for x in range(1, 11) if x % 2 == 0])'
                }
            },
            {
                id: 'py-35',
                title: 'Dictionary and Set Comprehensions',
                description: 'Create dictionaries and sets efficiently',
                stage: 4,
                content: `
# Dictionary and Set Comprehensions

Not just for lists!

## Dictionary Comprehensions:
\`\`\`python
# Squares dictionary
squares = {x: x**2 for x in range(6)}
print(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# From two lists
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
people = {name: age for name, age in zip(names, ages)}
print(people)  # {'Alice': 25, 'Bob': 30, 'Charlie': 35}

# Filter dictionary
scores = {"Alice": 85, "Bob": 65, "Charlie": 90}
passed = {k: v for k, v in scores.items() if v >= 70}
print(passed)  # {'Alice': 85, 'Charlie': 90}
\`\`\`

## Set Comprehensions:
\`\`\`python
# Unique squares
squares = {x**2 for x in range(-5, 6)}
print(squares)  # {0, 1, 4, 9, 16, 25}

# First letters (unique)
words = ["apple", "banana", "avocado", "blueberry"]
first_letters = {word[0] for word in words}
print(first_letters)  # {'a', 'b'}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a dictionary mapping numbers 1-5 to their cubes.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '{1: 1, 2: 8, 3: 27, 4: 64, 5: 125}',
                        hint: 'print({x: x**3 for x in range(1, 6)})'
                    },
                    {
                        prompt: 'What brackets are used for set comprehensions?',
                        type: 'multiple-choice',
                        options: ['[]', '{}', '()', '<>'],
                        answer: 1
                    },
                    {
                        prompt: 'What function pairs elements from two lists?',
                        type: 'multiple-choice',
                        options: ['pair()', 'zip()', 'combine()', 'merge()'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Itertools ============
            {
                id: 'py-36',
                title: 'Itertools Module',
                description: 'Powerful iteration tools',
                stage: 4,
                content: `
# The itertools Module

Advanced iteration patterns made easy!

## Count, Cycle, Repeat:
\`\`\`python
from itertools import count, cycle, repeat

# Count infinitely from 10
for i in count(10):
    if i > 13:
        break
    print(i)  # 10, 11, 12, 13

# Cycle through items forever
colors = cycle(["red", "green", "blue"])
for _ in range(5):
    print(next(colors))  # red, green, blue, red, green

# Repeat n times
for x in repeat("Hello", 3):
    print(x)  # Hello, Hello, Hello
\`\`\`

## Chain, Zip Longest:
\`\`\`python
from itertools import chain, zip_longest

# Chain iterables together
a = [1, 2, 3]
b = [4, 5, 6]
print(list(chain(a, b)))  # [1, 2, 3, 4, 5, 6]

# Zip with fill value
x = [1, 2, 3]
y = ['a', 'b']
print(list(zip_longest(x, y, fillvalue='?')))
# [(1, 'a'), (2, 'b'), (3, '?')]
\`\`\`

## Combinations and Permutations:
\`\`\`python
from itertools import combinations, permutations

# All 2-item combinations
items = ['A', 'B', 'C']
print(list(combinations(items, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'C')]

# All permutations (order matters)
print(list(permutations(items, 2)))
# [('A', 'B'), ('A', 'C'), ('B', 'A'), ('B', 'C'), ('C', 'A'), ('C', 'B')]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function chains multiple iterables into one?',
                        type: 'multiple-choice',
                        options: ['concat()', 'chain()', 'join()', 'merge()'],
                        answer: 1
                    },
                    {
                        prompt: 'What itertools function generates all possible orderings?',
                        type: 'multiple-choice',
                        options: ['combinations()', 'permutations()', 'orderings()', 'arrangements()'],
                        answer: 1
                    },
                    {
                        prompt: 'What function creates an infinite counter?',
                        type: 'multiple-choice',
                        options: ['infinite()', 'counter()', 'count()', 'forever()'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'py-37',
                title: 'Generators',
                description: 'Memory-efficient iteration with yield',
                stage: 4,
                content: `
# Generators in Python

Create iterators without storing everything in memory!

## Generator Functions:
\`\`\`python
def count_up(n):
    i = 0
    while i < n:
        yield i  # Pause and return value
        i += 1

for num in count_up(5):
    print(num)  # 0, 1, 2, 3, 4
\`\`\`

## Why Generators?
\`\`\`python
# This creates a huge list in memory
big_list = [x**2 for x in range(1000000)]

# This only computes values as needed!
big_gen = (x**2 for x in range(1000000))
\`\`\`

## Generator Expression:
\`\`\`python
# Like list comprehension but with ()
squares = (x**2 for x in range(10))
print(next(squares))  # 0
print(next(squares))  # 1
print(sum(squares))   # Sum of remaining
\`\`\`

## Practical Example:
\`\`\`python
def read_large_file(filename):
    with open(filename, 'r') as file:
        for line in file:
            yield line.strip()

# Process file without loading all into memory
for line in read_large_file("huge_file.txt"):
    process(line)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword makes a function a generator?',
                        type: 'multiple-choice',
                        options: ['return', 'yield', 'generate', 'next'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the main advantage of generators over lists?',
                        type: 'multiple-choice',
                        options: ['Faster execution', 'Memory efficiency', 'Easier syntax', 'More features'],
                        answer: 1
                    },
                    {
                        prompt: 'What brackets are used for generator expressions?',
                        type: 'multiple-choice',
                        options: ['[]', '{}', '()', '<>'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Decorators ============
            {
                id: 'py-38',
                title: 'Function Decorators',
                description: 'Modify function behavior elegantly',
                stage: 4,
                content: `
# Decorators in Python

Add functionality to functions without modifying them!

## Basic Decorator:
\`\`\`python
def my_decorator(func):
    def wrapper():
        print("Before function")
        func()
        print("After function")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Before function
# Hello!
# After function
\`\`\`

## Decorator with Arguments:
\`\`\`python
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        result = func(*args, **kwargs)
        print(f"Result: {result}")
        return result
    return wrapper

@my_decorator
def add(a, b):
    return a + b

add(3, 5)
# Calling add
# Result: 8
\`\`\`

## Practical: Timer Decorator:
\`\`\`python
import time

def timer(func):
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end-start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return "Done"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What symbol is used to apply a decorator?',
                        type: 'multiple-choice',
                        options: ['#', '@', '$', '&'],
                        answer: 1
                    },
                    {
                        prompt: 'What do decorators do?',
                        type: 'multiple-choice',
                        options: ['Add functionality to functions', 'Create classes', 'Handle errors', 'Import modules'],
                        answer: 0
                    },
                    {
                        prompt: 'What is the inner function in a decorator typically called?',
                        type: 'multiple-choice',
                        options: ['inner', 'wrapper', 'decorator', 'handler'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-39',
                title: 'Built-in Decorators',
                description: 'Common Python decorators you should know',
                stage: 4,
                content: `
# Built-in Decorators

Python comes with useful decorators!

## @functools.lru_cache - Memoization:
\`\`\`python
from functools import lru_cache

@lru_cache(maxsize=100)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(100))  # Instant! (would be slow without cache)
\`\`\`

## @functools.wraps - Preserve metadata:
\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves func's name, docstring, etc.
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper
\`\`\`

## @dataclass - Easy classes:
\`\`\`python
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    city: str = "Unknown"  # Default value

# Automatically gets __init__, __repr__, __eq__
person = Person("Alice", 30)
print(person)  # Person(name='Alice', age=30, city='Unknown')
\`\`\`

## @property (reviewed earlier):
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def diameter(self):
        return self._radius * 2
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What decorator caches function results?',
                        type: 'multiple-choice',
                        options: ['@cache', '@lru_cache', '@memoize', '@remember'],
                        answer: 1
                    },
                    {
                        prompt: 'What decorator automatically creates __init__ and __repr__?',
                        type: 'multiple-choice',
                        options: ['@class', '@dataclass', '@auto', '@struct'],
                        answer: 1
                    },
                    {
                        prompt: 'What does @functools.wraps preserve?',
                        type: 'multiple-choice',
                        options: ['Function speed', 'Function metadata (name, docstring)', 'Return values', 'Parameter types'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Lambda and Functional ============
            {
                id: 'py-40',
                title: 'Lambda Functions',
                description: 'Anonymous one-line functions',
                stage: 4,
                content: `
# Lambda Functions

Small anonymous functions in one line!

## Basic Lambda:
\`\`\`python
# Regular function
def add(a, b):
    return a + b

# Lambda equivalent
add = lambda a, b: a + b
print(add(3, 5))  # 8
\`\`\`

## With Built-in Functions:
\`\`\`python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort by absolute value
print(sorted(numbers, key=lambda x: -x))
# [9, 6, 5, 4, 3, 2, 1, 1]

# Filter even numbers
evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [4, 2, 6]

# Transform all
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)  # [6, 2, 8, 2, 10, 18, 4, 12]
\`\`\`

## Practical Examples:
\`\`\`python
# Sort list of dicts
users = [{"name": "Bob", "age": 30}, {"name": "Alice", "age": 25}]
sorted_users = sorted(users, key=lambda u: u["age"])

# Quick math operations
square = lambda x: x ** 2
is_positive = lambda x: x > 0
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a lambda that squares a number and test it with 5.',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '25',
                        hint: 'square = lambda x: x ** 2\\nprint(square(5))'
                    },
                    {
                        prompt: 'What keyword creates anonymous functions?',
                        type: 'multiple-choice',
                        options: ['def', 'lambda', 'func', 'anon'],
                        answer: 1
                    },
                    {
                        prompt: 'What is lambda x, y: x + y equivalent to?',
                        type: 'multiple-choice',
                        options: ['def f(x, y): return x + y', 'def f: return x + y', 'x + y', 'add(x, y)'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'py-41',
                title: 'Map, Filter, Reduce',
                description: 'Functional programming essentials',
                stage: 4,
                content: `
# Map, Filter, Reduce

Functional programming in Python!

## Map - Transform all items:
\`\`\`python
numbers = [1, 2, 3, 4, 5]

# Square all
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Using function
def double(x):
    return x * 2
doubled = list(map(double, numbers))
\`\`\`

## Filter - Keep matching items:
\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

evens = list(filter(lambda x: x % 2 == 0, numbers))
print(evens)  # [2, 4, 6, 8, 10]

# Filter with function
def is_adult(age):
    return age >= 18
ages = [15, 22, 17, 30, 12]
adults = list(filter(is_adult, ages))  # [22, 30]
\`\`\`

## Reduce - Combine to single value:
\`\`\`python
from functools import reduce

numbers = [1, 2, 3, 4, 5]

# Sum all
total = reduce(lambda a, b: a + b, numbers)
print(total)  # 15

# Product of all
product = reduce(lambda a, b: a * b, numbers)
print(product)  # 120

# Find max
maximum = reduce(lambda a, b: a if a > b else b, numbers)
print(maximum)  # 5
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Use filter to get numbers greater than 5 from [2, 7, 3, 9, 4, 8].',
                        type: 'code',
                        language: 'python',
                        expectedOutput: '[7, 9, 8]',
                        hint: 'print(list(filter(lambda x: x > 5, [2, 7, 3, 9, 4, 8])))'
                    },
                    {
                        prompt: 'What function transforms all items in a list?',
                        type: 'multiple-choice',
                        options: ['filter()', 'map()', 'reduce()', 'transform()'],
                        answer: 1
                    },
                    {
                        prompt: 'What module contains reduce()?',
                        type: 'multiple-choice',
                        options: ['builtins', 'itertools', 'functools', 'collections'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED PYTHON - Regular Expressions ============
            {
                id: 'py-42',
                title: 'Regular Expressions Basics',
                description: 'Pattern matching with regex',
                stage: 4,
                content: `
# Regular Expressions in Python

Powerful pattern matching!

## Basic Patterns:
\`\`\`python
import re

text = "My email is alice@example.com"

# Search for pattern
match = re.search(r"\\w+@\\w+\\.\\w+", text)
if match:
    print(match.group())  # alice@example.com
\`\`\`

## Pattern Characters:
- \`.\` - Any character
- \`\\d\` - Digit (0-9)
- \`\\w\` - Word character (a-z, A-Z, 0-9, _)
- \`\\s\` - Whitespace
- \`*\` - 0 or more
- \`+\` - 1 or more
- \`?\` - 0 or 1
- \`{n}\` - Exactly n
- \`[abc]\` - a, b, or c
- \`^\` - Start of string
- \`$\` - End of string

## Common Functions:
\`\`\`python
import re

text = "The cat sat on the mat"

# Find all matches
matches = re.findall(r"\\w+at", text)
print(matches)  # ['cat', 'sat', 'mat']

# Replace
new_text = re.sub(r"cat", "dog", text)
print(new_text)  # The dog sat on the mat

# Split
words = re.split(r"\\s+", text)
print(words)  # ['The', 'cat', 'sat', 'on', 'the', 'mat']
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function finds all matches in a string?',
                        type: 'multiple-choice',
                        options: ['re.find()', 're.findall()', 're.search()', 're.match()'],
                        answer: 1
                    },
                    {
                        prompt: 'What regex pattern matches any digit?',
                        type: 'multiple-choice',
                        options: ['\\\\d', '\\\\w', '\\\\s', '[a-z]'],
                        answer: 0
                    },
                    {
                        prompt: 'What function replaces pattern matches?',
                        type: 'multiple-choice',
                        options: ['re.replace()', 're.sub()', 're.change()', 're.swap()'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'py-43',
                title: 'Advanced Regex',
                description: 'Groups, lookahead, and more',
                stage: 4,
                content: `
# Advanced Regular Expressions

Master pattern matching!

## Capture Groups:
\`\`\`python
import re

text = "John: 25, Jane: 30"

# Named groups
pattern = r"(?P<name>\\w+): (?P<age>\\d+)"
for match in re.finditer(pattern, text):
    print(f"{match.group('name')} is {match.group('age')}")

# Numbered groups
pattern = r"(\\w+): (\\d+)"
matches = re.findall(pattern, text)
print(matches)  # [('John', '25'), ('Jane', '30')]
\`\`\`

## Non-Capturing Groups:
\`\`\`python
# (?:...) groups but doesn't capture
pattern = r"(?:https?://)?\\w+\\.\\w+"
\`\`\`

## Lookahead and Lookbehind:
\`\`\`python
import re

# Positive lookahead (?=...)
text = "100USD 50EUR 30USD"
dollars = re.findall(r"\\d+(?=USD)", text)
print(dollars)  # ['100', '30']

# Negative lookahead (?!...)
not_dollars = re.findall(r"\\d+(?!USD)", text)

# Positive lookbehind (?<=...)
text = "$100 €50 $30"
dollars = re.findall(r"(?<=\\$)\\d+", text)
print(dollars)  # ['100', '30']
\`\`\`

## Flags:
\`\`\`python
# Case insensitive
re.findall(r"hello", "HELLO hello", re.IGNORECASE)

# Multiline
re.findall(r"^start", "start\\nstart", re.MULTILINE)
\`\`\`
        `,
                exercise: {
                    prompt: 'What syntax creates a named capture group?',
                    type: 'multiple-choice',
                    options: ['(name:...)', '(?P<name>...)', '[name:...]', '{name:...}'],
                    answer: 1
                }
            },
            // ============ ADVANCED PYTHON - Modules and Packages ============
            {
                id: 'py-44',
                title: 'Creating Modules',
                description: 'Organize code into reusable modules',
                stage: 4,
                content: `
# Python Modules

Organize your code into reusable files!

## Creating a Module:
\`\`\`python
# math_utils.py
def add(a, b):
    return a + b

def multiply(a, b):
    return a * b

PI = 3.14159
\`\`\`

## Importing Modules:
\`\`\`python
# Different ways to import
import math_utils
print(math_utils.add(5, 3))

from math_utils import add, multiply
print(add(5, 3))

from math_utils import *  # Import everything (not recommended)

import math_utils as mu  # Alias
print(mu.add(5, 3))
\`\`\`

## \`__name__\` Variable:
\`\`\`python
# math_utils.py
def main():
    print("Running as main program")

if __name__ == "__main__":
    main()  # Only runs when file is executed directly
\`\`\`

## Module Search Path:
\`\`\`python
import sys
print(sys.path)  # Where Python looks for modules
\`\`\`
        `,
                exercise: {
                    prompt: 'What variable checks if a file is run directly?',
                    type: 'multiple-choice',
                    options: ['__main__', '__name__', '__file__', '__module__'],
                    answer: 1
                }
            },
            {
                id: 'py-45',
                title: 'Creating Packages',
                description: 'Organize modules into packages',
                stage: 4,
                content: `
# Python Packages

Group related modules together!

## Package Structure:
\`\`\`
mypackage/
├── __init__.py
├── module1.py
├── module2.py
└── subpackage/
    ├── __init__.py
    └── module3.py
\`\`\`

## \`__init__.py\`:
\`\`\`python
# mypackage/__init__.py
from .module1 import function1
from .module2 import function2

__all__ = ['function1', 'function2']  # Controls * imports
\`\`\`

## Importing from Packages:
\`\`\`python
# Different import styles
import mypackage
mypackage.function1()

from mypackage import function1
function1()

from mypackage.module1 import function1

from mypackage.subpackage import module3
\`\`\`

## Relative Imports:
\`\`\`python
# Inside mypackage/module1.py
from . import module2  # Same level
from .module2 import something
from ..otherpackage import module  # Parent level
\`\`\`
        `,
                exercise: {
                    prompt: 'What file makes a directory a Python package?',
                    type: 'multiple-choice',
                    options: ['__main__.py', '__init__.py', 'package.py', 'setup.py'],
                    answer: 1
                }
            },
            // ============ ADVANCED PYTHON - Testing ============
            {
                id: 'py-46',
                title: 'Unit Testing with unittest',
                description: 'Write tests for your code',
                stage: 4,
                content: `
# Unit Testing in Python

Ensure your code works correctly!

## Basic Test Structure:
\`\`\`python
import unittest

def add(a, b):
    return a + b

class TestAdd(unittest.TestCase):
    def test_positive_numbers(self):
        self.assertEqual(add(2, 3), 5)
    
    def test_negative_numbers(self):
        self.assertEqual(add(-1, -1), -2)
    
    def test_mixed(self):
        self.assertEqual(add(-1, 1), 0)

if __name__ == "__main__":
    unittest.main()
\`\`\`

## Common Assertions:
\`\`\`python
self.assertEqual(a, b)      # a == b
self.assertNotEqual(a, b)   # a != b
self.assertTrue(x)          # x is True
self.assertFalse(x)         # x is False
self.assertIsNone(x)        # x is None
self.assertIn(a, b)         # a in b
self.assertRaises(Error)    # Raises exception
\`\`\`

## Setup and Teardown:
\`\`\`python
class TestDatabase(unittest.TestCase):
    def setUp(self):
        # Run before each test
        self.db = connect_to_db()
    
    def tearDown(self):
        # Run after each test
        self.db.close()
    
    def test_query(self):
        result = self.db.query("SELECT * FROM users")
        self.assertIsNotNone(result)
\`\`\`
        `,
                exercise: {
                    prompt: 'What assertion checks if two values are equal?',
                    type: 'multiple-choice',
                    options: ['assertSame', 'assertEqual', 'assertMatch', 'assertEquals'],
                    answer: 1
                }
            },
            {
                id: 'py-47',
                title: 'Testing with pytest',
                description: 'Modern testing with pytest',
                stage: 4,
                content: `
# Testing with pytest

The most popular Python testing framework!

## Basic Tests:
\`\`\`python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2
\`\`\`

## Run tests:
\`\`\`bash
pytest                    # Run all tests
pytest test_math.py       # Run specific file
pytest -v                 # Verbose output
pytest -k "add"           # Run tests matching pattern
\`\`\`

## Fixtures:
\`\`\`python
import pytest

@pytest.fixture
def sample_data():
    return [1, 2, 3, 4, 5]

def test_sum(sample_data):
    assert sum(sample_data) == 15

def test_length(sample_data):
    assert len(sample_data) == 5
\`\`\`

## Parameterized Tests:
\`\`\`python
import pytest

@pytest.mark.parametrize("a,b,expected", [
    (2, 3, 5),
    (0, 0, 0),
    (-1, 1, 0),
    (100, 200, 300),
])
def test_add(a, b, expected):
    assert add(a, b) == expected
\`\`\`

## Exception Testing:
\`\`\`python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ValueError):
        divide(10, 0)
\`\`\`
        `,
                exercise: {
                    prompt: 'What decorator marks a function as a pytest fixture?',
                    type: 'multiple-choice',
                    options: ['@pytest.test', '@pytest.fixture', '@fixture', '@setup'],
                    answer: 1
                }
            },
            // ============ ADVANCED PYTHON - Context Managers ============
            {
                id: 'py-48',
                title: 'Context Managers',
                description: 'Clean resource management with "with"',
                stage: 4,
                content: `
# Context Managers

Automatic cleanup with the \`with\` statement!

## Why Context Managers?
\`\`\`python
# Without context manager (risky)
file = open("data.txt", "r")
data = file.read()
file.close()  # What if an error happens before this?

# With context manager (safe)
with open("data.txt", "r") as file:
    data = file.read()
# File automatically closed!
\`\`\`

## Creating Context Managers (Class):
\`\`\`python
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.end = time.time()
        print(f"Elapsed: {self.end - self.start:.2f}s")

with Timer():
    # Do something slow
    sum(range(1000000))
# Prints: Elapsed: 0.05s
\`\`\`

## Creating Context Managers (Generator):
\`\`\`python
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.time()
    yield  # Control returns to with block
    end = time.time()
    print(f"Elapsed: {end - start:.2f}s")

with timer():
    sum(range(1000000))
\`\`\`

## Multiple Context Managers:
\`\`\`python
with open("input.txt") as infile, open("output.txt", "w") as outfile:
    outfile.write(infile.read())
\`\`\`
        `,
                exercise: {
                    prompt: 'What method runs when entering a "with" block?',
                    type: 'multiple-choice',
                    options: ['__enter__', '__exit__', '__start__', '__begin__'],
                    answer: 0
                }
            },
            // ============ ADVANCED PYTHON - Async/Await ============
            {
                id: 'py-49',
                title: 'Async/Await Basics',
                description: 'Asynchronous programming in Python',
                stage: 4,
                content: `
# Async/Await in Python

Handle concurrent operations efficiently!

## Why Async?
\`\`\`python
# Synchronous (blocking)
import time

def fetch_data():
    time.sleep(2)  # Simulates slow operation
    return "Data"

# This takes 6 seconds total
result1 = fetch_data()
result2 = fetch_data()
result3 = fetch_data()
\`\`\`

## Async Basics:
\`\`\`python
import asyncio

async def fetch_data():
    await asyncio.sleep(2)  # Non-blocking sleep
    return "Data"

async def main():
    # Run concurrently - only 2 seconds total!
    results = await asyncio.gather(
        fetch_data(),
        fetch_data(),
        fetch_data()
    )
    print(results)

asyncio.run(main())
\`\`\`

## Keywords:
- \`async def\` - Defines async function
- \`await\` - Wait for async operation
- \`asyncio.run()\` - Run async code
- \`asyncio.gather()\` - Run multiple async tasks

## Simple Example:
\`\`\`python
import asyncio

async def say_hello():
    print("Hello...")
    await asyncio.sleep(1)
    print("...World!")

asyncio.run(say_hello())
\`\`\`
        `,
                exercise: {
                    prompt: 'What keyword defines an asynchronous function?',
                    type: 'multiple-choice',
                    options: ['async def', 'await def', 'concurrent def', 'parallel def'],
                    answer: 0
                }
            },
            {
                id: 'py-50',
                title: 'Async HTTP Requests',
                description: 'Make concurrent web requests',
                stage: 4,
                content: `
# Async HTTP with aiohttp

Make many web requests concurrently!

## Installation:
\`\`\`bash
pip install aiohttp
\`\`\`

## Basic Usage:
\`\`\`python
import aiohttp
import asyncio

async def fetch_url(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            return await response.text()

async def main():
    html = await fetch_url("https://example.com")
    print(len(html))

asyncio.run(main())
\`\`\`

## Multiple Concurrent Requests:
\`\`\`python
import aiohttp
import asyncio

async def fetch(session, url):
    async with session.get(url) as response:
        return await response.text()

async def main():
    urls = [
        "https://example.com",
        "https://python.org",
        "https://github.com"
    ]
    
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        results = await asyncio.gather(*tasks)
        
        for url, html in zip(urls, results):
            print(f"{url}: {len(html)} chars")

asyncio.run(main())
\`\`\`

## Comparison:
- Synchronous: 3 requests × 1 second = 3 seconds
- Async: 3 requests at once = ~1 second!
        `,
                exercise: {
                    prompt: 'What function runs multiple async tasks concurrently?',
                    type: 'multiple-choice',
                    options: ['asyncio.run()', 'asyncio.gather()', 'asyncio.wait()', 'asyncio.all()'],
                    answer: 1
                }
            },
            // ============ FINAL PROJECT ============
            {
                id: 'py-51',
                title: 'Complete Python Mastery Project',
                description: 'Build a complete application',
                stage: 4,
                content: `
# Python Mastery Project

You've learned all the essentials! Here's a complete project combining everything:

## Task Manager Application:
\`\`\`python
import json
from dataclasses import dataclass
from datetime import datetime
from typing import List, Optional

@dataclass
class Task:
    id: int
    title: str
    completed: bool = False
    created_at: str = None
    
    def __post_init__(self):
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()

class TaskManager:
    def __init__(self, filename: str = "tasks.json"):
        self.filename = filename
        self.tasks: List[Task] = []
        self.load()
    
    def load(self):
        try:
            with open(self.filename, "r") as f:
                data = json.load(f)
                self.tasks = [Task(**t) for t in data]
        except FileNotFoundError:
            self.tasks = []
    
    def save(self):
        with open(self.filename, "w") as f:
            data = [t.__dict__ for t in self.tasks]
            json.dump(data, f, indent=2)
    
    def add(self, title: str) -> Task:
        task_id = max([t.id for t in self.tasks], default=0) + 1
        task = Task(id=task_id, title=title)
        self.tasks.append(task)
        self.save()
        return task
    
    def complete(self, task_id: int) -> Optional[Task]:
        for task in self.tasks:
            if task.id == task_id:
                task.completed = True
                self.save()
                return task
        return None
    
    def list_tasks(self, show_completed: bool = True):
        for task in self.tasks:
            if show_completed or not task.completed:
                status = "✓" if task.completed else " "
                print(f"[{status}] {task.id}: {task.title}")

# Usage
manager = TaskManager()
manager.add("Learn Python")
manager.add("Build projects")
manager.complete(1)
manager.list_tasks()
\`\`\`

Congratulations! You've mastered Python! 🎉🐍
        `,
                exercise: {
                    prompt: 'What decorator is used to create a data class?',
                    type: 'multiple-choice',
                    options: ['@data', '@dataclass', '@class', '@model'],
                    answer: 1
                }
            }
        ]
    },

    // JavaScript Course - Complete Natural Language → Real Code Progression
    'javascript': {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Learn JavaScript, the language of the web. From natural language to real code.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🟨',
        color: '#f7df1e',
        language: 'javascript',
        prerequisites: ['intro-logic'],
        estimatedHours: 14,
        lessons: [
            // ============ STAGE 1: Pure Natural Language ============
            {
                id: 'js-1',
                title: 'Hello JavaScript!',
                description: 'Your first JavaScript program',
                stage: 1,
                content: `
# Hello JavaScript!

JavaScript is the language of the web - every website uses it!

## Displaying Messages:
\`\`\`
display "Hello, World!"
\`\`\`

When you run this, it shows: Hello, World!

## More Examples:
\`\`\`
display "Welcome to coding!"
display 42
display "My favorite number is: " plus 7
\`\`\`

JavaScript can run in any web browser!
        `,
                exercises: [
                    {
                        prompt: 'Display "Welcome to JavaScript!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Welcome to JavaScript!',
                        hint: 'Use: display "Welcome to JavaScript!"'
                    },
                    {
                        prompt: 'Display the number 100',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '100',
                        hint: 'Use: display 100'
                    },
                    {
                        prompt: 'Display "JavaScript is fun!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'JavaScript is fun!',
                        hint: 'Use: display "JavaScript is fun!"'
                    }
                ]
            },
            {
                id: 'js-2',
                title: 'Variables - Storing Data',
                description: 'Save information for later use',
                stage: 1,
                content: `
# Variables in JavaScript

Variables are containers for storing data.

## Creating Variables:
\`\`\`
create variable playerName to "Hero"
create variable score to 0
create variable isPlaying to true value
\`\`\`

## Using Variables:
\`\`\`
display playerName
display score
\`\`\`

Output:
Hero
0

## Changing Variables:
\`\`\`
create variable lives to 3
display lives
set lives to lives minus 1
display lives
\`\`\`

Output:
3
2
        `,
                exercises: [
                    {
                        prompt: 'Create variable "game" set to "Chess" and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Chess',
                        hint: 'create variable game to "Chess"\\ndisplay game'
                    },
                    {
                        prompt: 'Create variable "age" set to 25 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '25',
                        hint: 'create variable age to 25\\ndisplay age'
                    },
                    {
                        prompt: 'Create variable "city" set to "Paris" and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Paris',
                        hint: 'create variable city to "Paris"\\ndisplay city'
                    }
                ]
            },
            {
                id: 'js-3',
                title: 'Constants - Unchangeable Values',
                description: 'Values that never change',
                stage: 1,
                content: `
# Constants

Sometimes you want a value that NEVER changes.

## Creating Constants:
\`\`\`
create constant PI to 3.14159
create constant MAX_LIVES to 5
create constant GAME_TITLE to "Space Adventure"
\`\`\`

## Using Constants:
\`\`\`
create constant TAX_RATE to 0.1
create variable price to 100
create variable tax to price times TAX_RATE
display tax
\`\`\`

Output: 10

## Why Constants?
- Prevent accidental changes
- Make code clearer
- Use ALL_CAPS names by convention
        `,
                exercises: [
                    {
                        prompt: 'Create constant MAX_SCORE to 1000 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '1000',
                        hint: 'create constant MAX_SCORE to 1000\\ndisplay MAX_SCORE'
                    },
                    {
                        prompt: 'Create constant SPEED_LIMIT to 65 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '65',
                        hint: 'create constant SPEED_LIMIT to 65\\ndisplay SPEED_LIMIT'
                    },
                    {
                        prompt: 'Create constant APP_NAME to "MyApp" and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'MyApp',
                        hint: 'create constant APP_NAME to "MyApp"\\ndisplay APP_NAME'
                    }
                ]
            },
            {
                id: 'js-4',
                title: 'Math Operations',
                description: 'Calculations with words',
                stage: 1,
                content: `
# Math in JavaScript

JavaScript can do all types of math!

## Basic Operations:
\`\`\`
display 10 plus 5
display 20 minus 8
display 6 times 7
display 100 divided by 4
display 17 modulo 5
\`\`\`

Output:
15
12
42
25
2

## With Variables:
\`\`\`
create variable width to 10
create variable height to 5
create variable area to width times height
display area
\`\`\`

Output: 50
        `,
                exercises: [
                    {
                        prompt: 'Calculate 12 times 8 and display the result',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '96',
                        hint: 'Use: display 12 times 8'
                    },
                    {
                        prompt: 'Calculate 100 divided by 4 and display the result',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '25',
                        hint: 'Use: display 100 divided by 4'
                    },
                    {
                        prompt: 'Calculate 50 plus 30 and display the result',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '80',
                        hint: 'Use: display 50 plus 30'
                    }
                ]
            },
            {
                id: 'js-5',
                title: 'Making Decisions',
                description: 'If statements for choices',
                stage: 1,
                content: `
# Making Decisions with If

Programs can make choices!

## Basic If:
\`\`\`
create variable age to 20
if age is greater than or equal to 18 then
    display "You can vote!"
end if
\`\`\`

Output: You can vote!

## If with Otherwise:
\`\`\`
create variable score to 45
if score is greater than or equal to 50 then
    display "Pass!"
otherwise
    display "Try again"
end if
\`\`\`

Output: Try again

## Comparison Words:
- is equal to
- is not equal to
- is greater than
- is less than
- is greater than or equal to
- is less than or equal to
        `,
                exercises: [
                    {
                        prompt: 'Create variable points to 100. If points is greater than 50, display "Winner!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Winner!',
                        hint: 'if points is greater than 50 then\\n    display "Winner!"\\nend if'
                    },
                    {
                        prompt: 'Create variable temp to 75. If temp is greater than 70, display "Warm day"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Warm day',
                        hint: 'if temp is greater than 70 then\\n    display "Warm day"\\nend if'
                    },
                    {
                        prompt: 'Create variable level to 5. If level is greater than or equal to 5, display "Boss fight!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Boss fight!',
                        hint: 'if level is greater than or equal to 5 then\\n    display "Boss fight!"\\nend if'
                    }
                ]
            },
            {
                id: 'js-6',
                title: 'Loops - Repeat Actions',
                description: 'Do things multiple times',
                stage: 1,
                content: `
# Loops

Loops repeat actions automatically!

## Repeat N Times:
\`\`\`
repeat 4 times
    display "JavaScript!"
end loop
\`\`\`

Output:
JavaScript!
JavaScript!
JavaScript!
JavaScript!

## Counting Loop:
\`\`\`
create variable count to 1
repeat 3 times
    display count
    set count to count plus 1
end loop
\`\`\`

Output:
1
2
3
        `,
                exercises: [
                    {
                        prompt: 'Write a loop that displays "Go!" 3 times',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Go!\nGo!\nGo!',
                        hint: 'repeat 3 times\\n    display "Go!"\\nend loop'
                    },
                    {
                        prompt: 'Write a loop that displays "Hi!" 4 times',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hi!\nHi!\nHi!\nHi!',
                        hint: 'repeat 4 times\\n    display "Hi!"\\nend loop'
                    },
                    {
                        prompt: 'Write a loop that displays "Yes!" 2 times',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Yes!\nYes!',
                        hint: 'repeat 2 times\\n    display "Yes!"\\nend loop'
                    }
                ]
            },
            {
                id: 'js-7',
                title: 'While Loops',
                description: 'Repeat while condition is true',
                stage: 1,
                content: `
# While Loops

Keep going while something is true!

## Basic While:
\`\`\`
create variable num to 0
repeat while num is less than 3 do
    display num
    set num to num plus 1
end repeat
\`\`\`

Output:
0
1
2

## Game Example:
\`\`\`
create variable lives to 3
repeat while lives is greater than 0 do
    display "Lives: " plus lives
    set lives to lives minus 1
end repeat
display "Game Over!"
\`\`\`

Output:
Lives: 3
Lives: 2
Lives: 1
Game Over!
        `,
                exercises: [
                    {
                        prompt: 'Create countdown from 5 to 1, then display "Blast off!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '5\n4\n3\n2\n1\nBlast off!',
                        hint: 'Create variable n to 5, repeat while n > 0, display n, decrease n, after loop display "Blast off!"'
                    },
                    {
                        prompt: 'Create variable x to 1. Repeat while x is less than 4, display x, then add 1 to x',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '1\n2\n3',
                        hint: 'repeat while x is less than 4 do\\n    display x\\n    set x to x plus 1\\nend repeat'
                    },
                    {
                        prompt: 'Create countdown from 3 to 1, then display "Done!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '3\n2\n1\nDone!',
                        hint: 'Create variable n to 3, use while loop, display "Done!" at end'
                    }
                ]
            },
            {
                id: 'js-8',
                title: 'Lists (Arrays)',
                description: 'Store multiple values together',
                stage: 1,
                content: `
# Lists

Lists store multiple items in order.

## Creating Lists:
\`\`\`
create variable colors to create list with "red", "green", "blue" end list
\`\`\`

## Looping Through Lists:
\`\`\`
create variable games to create list with "Chess", "Poker", "Uno" end list
for each game in list games do
    display game
end loop
\`\`\`

Output:
Chess
Poker
Uno

## Getting One Item:
\`\`\`
create variable fruits to create list with "apple", "banana", "cherry" end list
display get item 0 from fruits end get
\`\`\`

Output: apple (lists start at 0!)
        `,
                exercises: [
                    {
                        prompt: 'Create list of numbers 10, 20, 30 and display each one',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '10\n20\n30',
                        hint: 'Create list, then: for each num in list numbers do\\n    display num\\nend loop'
                    },
                    {
                        prompt: 'Create list with "cat", "dog", "fish" and display each one',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'cat\ndog\nfish',
                        hint: 'for each pet in list pets do\\n    display pet\\nend loop'
                    },
                    {
                        prompt: 'Create list with 1, 2, 3 and display each number',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '1\n2\n3',
                        hint: 'for each n in list numbers do\\n    display n\\nend loop'
                    }
                ]
            },
            {
                id: 'js-9',
                title: 'Functions',
                description: 'Reusable blocks of code',
                stage: 1,
                content: `
# Functions

Functions are reusable code blocks!

## Simple Function:
\`\`\`
define function celebrate with no parameters
    display "🎉 Party time!"
end function

celebrate
\`\`\`

Output: 🎉 Party time!

## Function with Input:
\`\`\`
define function greet with parameters name
    display "Hello, " plus name plus "!"
end function

greet "Alice"
greet "Bob"
\`\`\`

Output:
Hello, Alice!
Hello, Bob!
        `,
                exercises: [
                    {
                        prompt: 'Define function "shout" that displays "YEAH!" and call it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'YEAH!',
                        hint: 'define function shout with no parameters\\n    display "YEAH!"\\nend function\\nshout'
                    },
                    {
                        prompt: 'Define function "hello" that displays "Hi there!" and call it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hi there!',
                        hint: 'define function hello with no parameters\\n    display "Hi there!"\\nend function\\nhello'
                    },
                    {
                        prompt: 'Define function "cheer" that displays "Hooray!" and call it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hooray!',
                        hint: 'define function cheer with no parameters\\n    display "Hooray!"\\nend function\\ncheer'
                    }
                ]
            },
            // ============ STAGE 2: Introducing Symbols ============
            {
                id: 'js-10',
                title: 'Math Symbols',
                description: 'Using +, -, *, / instead of words',
                stage: 2,
                content: `
# Math Symbols

Let's use real programming symbols!

## Symbol Translation:
| Words | Symbol |
|-------|--------|
| plus | + |
| minus | - |
| times | * |
| divided by | / |
| modulo | % |

## Before (Stage 1):
\`\`\`
display 10 plus 5
display 20 minus 8
\`\`\`

## Now (Stage 2):
\`\`\`
display 10 + 5
display 20 - 8
\`\`\`

Same result, less typing!
        `,
                exercises: [
                    {
                        prompt: 'Calculate 25 * 4 - 10 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '90',
                        hint: 'Use: display 25 * 4 - 10'
                    },
                    {
                        prompt: 'Calculate 50 / 2 + 5 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '30',
                        hint: 'Use: display 50 / 2 + 5'
                    },
                    {
                        prompt: 'Calculate 100 - 20 * 3 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '40',
                        hint: 'Use: display 100 - 20 * 3'
                    }
                ]
            },
            {
                id: 'js-11',
                title: 'Comparison Symbols',
                description: 'Using <, >, ==, != for comparisons',
                stage: 2,
                content: `
# Comparison Symbols

Now use symbols for comparisons!

## Symbol Translation:
| Words | Symbol |
|-------|--------|
| is less than | < |
| is greater than | > |
| is less than or equal to | <= |
| is greater than or equal to | >= |
| is equal to | == |
| is not equal to | != |

## Before:
\`\`\`
if score is greater than or equal to 100 then
\`\`\`

## Now:
\`\`\`
if score >= 100 then
\`\`\`

Much shorter!
        `,
                exercises: [
                    {
                        prompt: 'Create variable x to 50. If x > 25, display "High"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'High',
                        hint: 'Use: if x > 25 then'
                    },
                    {
                        prompt: 'Create variable y to 10. If y < 20, display "Low"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Low',
                        hint: 'Use: if y < 20 then'
                    },
                    {
                        prompt: 'Create variable z to 100. If z == 100, display "Perfect"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Perfect',
                        hint: 'Use: if z == 100 then'
                    }
                ]
            },
            {
                id: 'js-12',
                title: 'Assignment with =',
                description: 'Use = instead of "to"',
                stage: 2,
                content: `
# Assignment with =

In real code, we use = to set values!

## Before:
\`\`\`
create variable score to 0
set score to score + 10
\`\`\`

## Now:
\`\`\`
create variable score = 0
set score = score + 10
\`\`\`

## Example:
\`\`\`
create variable count = 1
repeat 3 times
    display count
    set count = count + 1
end loop
\`\`\`

Output:
1
2
3
        `,
                exercises: [
                    {
                        prompt: 'Create variable sum = 100. Subtract 30 from it. Display sum.',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '70',
                        hint: 'create variable sum = 100\\nset sum = sum - 30\\ndisplay sum'
                    },
                    {
                        prompt: 'Create variable x = 10. Add 25 to it. Display x.',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '35',
                        hint: 'create variable x = 10\\nset x = x + 25\\ndisplay x'
                    },
                    {
                        prompt: 'Create variable val = 50. Multiply by 2. Display val.',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '100',
                        hint: 'create variable val = 50\\nset val = val * 2\\ndisplay val'
                    }
                ]
            },
            {
                id: 'js-13',
                title: 'Logical Operators',
                description: 'Combining conditions with and/or',
                stage: 2,
                content: `
# Combining Conditions

Use "and" and "or" for complex conditions!

## AND - Both must be true:
\`\`\`
create variable age = 25
create variable hasID = true value
if age >= 18 and hasID then
    display "Welcome!"
end if
\`\`\`
Output: Welcome!

## OR - At least one true:
\`\`\`
create variable day = "Sunday"
if day == "Saturday" or day == "Sunday" then
    display "Weekend!"
end if
\`\`\`
Output: Weekend!
        `,
                exercises: [
                    {
                        prompt: 'Create variable n = 15. If n >= 10 and n <= 20, display "In range"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'In range',
                        hint: 'Use: if n >= 10 and n <= 20 then'
                    },
                    {
                        prompt: 'Create variable a = 5. If a < 3 or a > 4, display "Outside"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Outside',
                        hint: 'Use: if a < 3 or a > 4 then'
                    },
                    {
                        prompt: 'Create variable b = 0. If b == 0 and true value, display "Zero"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Zero',
                        hint: 'Use: if b == 0 and true value then'
                    }
                ]
            },
            // ============ STAGE 3: Code-Like Structure ============
            {
                id: 'js-14',
                title: 'console.log()',
                description: 'Real JavaScript output',
                stage: 3,
                content: `
# Real JavaScript: console.log()

In JavaScript, we use console.log() to display output!

## Translation:
| Natural | JavaScript |
|---------|------------|
| display "Hello" | console.log("Hello") |
| display x | console.log(x) |

## Examples:
\`\`\`javascript
console.log("Hello, JavaScript!")
console.log(42)
console.log(10 + 5)
\`\`\`

Output:
Hello, JavaScript!
42
15

## With Variables:
\`\`\`javascript
create variable name = "Alice"
console.log(name)
console.log("Hi, " + name)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Use console.log() to display "Real JavaScript!"',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Real JavaScript!',
                        hint: 'Use: console.log("Real JavaScript!")'
                    },
                    {
                        prompt: 'Use console.log() to display the number 42',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '42',
                        hint: 'Use: console.log(42)'
                    },
                    {
                        prompt: 'Use console.log() to display 10 + 20',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '30',
                        hint: 'Use: console.log(10 + 20)'
                    }
                ]
            },
            {
                id: 'js-15',
                title: 'let and const',
                description: 'JavaScript variable declarations',
                stage: 3,
                content: `
# JavaScript Variables: let and const

JavaScript uses let and const for variables!

## Translation:
| Natural | JavaScript |
|---------|------------|
| create variable x = 5 | let x = 5 |
| create constant Y = 10 | const Y = 10 |

## Examples:
\`\`\`javascript
let score = 0
score = 100
console.log(score)

const MAX = 1000
console.log(MAX)
\`\`\`

Output:
100
1000

## Key Difference:
- \`let\` - can be changed
- \`const\` - cannot be changed
        `,
                exercises: [
                    {
                        prompt: 'Create let message = "Hi" and console.log it',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Hi',
                        hint: 'let message = "Hi"\\nconsole.log(message)'
                    },
                    {
                        prompt: 'Create const PI = 3.14 and console.log it',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '3.14',
                        hint: 'const PI = 3.14\\nconsole.log(PI)'
                    },
                    {
                        prompt: 'Create let count = 5, add 3 to it, and console.log it',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '8',
                        hint: 'let count = 5\\ncount = count + 3\\nconsole.log(count)'
                    }
                ]
            },
            {
                id: 'js-16',
                title: 'JavaScript If Statements',
                description: 'Braces and syntax',
                stage: 3,
                content: `
# JavaScript If Syntax

JavaScript uses braces {} instead of end if!

## Translation:
| Natural | JavaScript |
|---------|------------|
| if ... then | if (...) { |
| end if | } |
| otherwise | } else { |

## Example:
\`\`\`javascript
let age = 20
if (age >= 18) {
    console.log("Adult")
} else {
    console.log("Minor")
}
\`\`\`

Output: Adult

## Key Points:
- Condition goes in parentheses ()
- Code blocks use braces {}
- No semicolons after braces
        `,
                exercises: [
                    {
                        prompt: 'Write JavaScript: let x = 15. If x > 10, log "Big"',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Big',
                        hint: 'let x = 15\\nif (x > 10) {\\n    console.log("Big")\\n}'
                    },
                    {
                        prompt: 'Write JavaScript: let y = 5. If y < 10, log "Small"',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Small',
                        hint: 'let y = 5\\nif (y < 10) {\\n    console.log("Small")\\n}'
                    },
                    {
                        prompt: 'Write JavaScript: let z = 100. If z == 100, log "Match!"',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Match!',
                        hint: 'let z = 100\\nif (z == 100) {\\n    console.log("Match!")\\n}'
                    }
                ]
            },
            {
                id: 'js-17',
                title: 'JavaScript Loops',
                description: 'for and while loops',
                stage: 3,
                content: `
# JavaScript Loops

## For Loop:
\`\`\`javascript
for (let i = 0; i < 3; i++) {
    console.log(i)
}
\`\`\`

Output:
0
1
2

## While Loop:
\`\`\`javascript
let count = 0
while (count < 3) {
    console.log(count)
    count++
}
\`\`\`

Same output!

## For...of (array loop):
\`\`\`javascript
let colors = ["red", "green", "blue"]
for (let color of colors) {
    console.log(color)
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write a for loop that logs 0, 1, 2',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '0\n1\n2',
                        hint: 'for (let i = 0; i < 3; i++) {\\n    console.log(i)\\n}'
                    },
                    {
                        prompt: 'Write a for loop that logs 1, 2, 3',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '1\n2\n3',
                        hint: 'for (let i = 1; i <= 3; i++) {\\n    console.log(i)\\n}'
                    },
                    {
                        prompt: 'Write a while loop that logs 5, 4, 3 (countdown)',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '5\n4\n3',
                        hint: 'let i = 5\\nwhile (i >= 3) {\\n    console.log(i)\\n    i--\\n}'
                    }
                ]
            },
            {
                id: 'js-18',
                title: 'JavaScript Functions',
                description: 'function keyword and arrow functions',
                stage: 3,
                content: `
# JavaScript Functions

## Function Declaration:
\`\`\`javascript
function greet(name) {
    console.log("Hello, " + name)
}

greet("Alice")
\`\`\`

Output: Hello, Alice

## Arrow Functions (Modern):
\`\`\`javascript
const greet = (name) => {
    console.log("Hello, " + name)
}

greet("Bob")
\`\`\`

Output: Hello, Bob

## Returning Values:
\`\`\`javascript
function add(a, b) {
    return a + b
}

console.log(add(5, 3))
\`\`\`

Output: 8
        `,
                exercises: [
                    {
                        prompt: 'Write function double(n) that returns n * 2. Log double(7).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '14',
                        hint: 'function double(n) {\\n    return n * 2\\n}\\nconsole.log(double(7))'
                    },
                    {
                        prompt: 'Write function square(n) that returns n * n. Log square(5).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '25',
                        hint: 'function square(n) {\\n    return n * n\\n}\\nconsole.log(square(5))'
                    },
                    {
                        prompt: 'Write function add(a, b) that returns a + b. Log add(10, 5).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '15',
                        hint: 'function add(a, b) {\\n    return a + b\\n}\\nconsole.log(add(10, 5))'
                    }
                ]
            },
            // ============ STAGE 4: Full JavaScript ============
            {
                id: 'js-19',
                title: 'Arrays Deep Dive',
                description: 'Full array methods',
                stage: 4,
                content: `
# JavaScript Arrays

## Creating Arrays:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]
const mixed = [1, "hello", true]
\`\`\`

## Useful Methods:
\`\`\`javascript
const fruits = ["apple", "banana"]

fruits.push("orange")      // Add to end
console.log(fruits.length) // 3
console.log(fruits[0])     // apple

fruits.pop()               // Remove last
console.log(fruits)        // ["apple", "banana"]
\`\`\`

## Map - Transform Each Item:
\`\`\`javascript
const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)
console.log(doubled)  // [2, 4, 6]
\`\`\`

## Filter - Keep Matching Items:
\`\`\`javascript
const ages = [12, 18, 25, 16]
const adults = ages.filter(age => age >= 18)
console.log(adults)  // [18, 25]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create array [1, 2, 3], push 4, log the length',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '4',
                        hint: 'const nums = [1, 2, 3]\\nnums.push(4)\\nconsole.log(nums.length)'
                    },
                    {
                        prompt: 'Create array [5, 10, 15], log the first element',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '5',
                        hint: 'const nums = [5, 10, 15]\\nconsole.log(nums[0])'
                    },
                    {
                        prompt: 'Create array [2, 4, 6], use map to triple each, log result',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '6,12,18',
                        hint: 'const nums = [2, 4, 6]\\nconst tripled = nums.map(n => n * 3)\\nconsole.log(tripled.join(","))'
                    }
                ]
            },
            {
                id: 'js-20',
                title: 'Objects',
                description: 'Key-value pairs in JavaScript',
                stage: 4,
                content: `
# JavaScript Objects

Objects store related data together!

## Creating Objects:
\`\`\`javascript
const person = {
    name: "Alice",
    age: 25,
    city: "Tokyo"
}
\`\`\`

## Accessing Properties:
\`\`\`javascript
console.log(person.name)      // Alice
console.log(person["age"])    // 25
\`\`\`

## Modifying Objects:
\`\`\`javascript
person.email = "alice@mail.com"
person.age = 26
\`\`\`

## Looping:
\`\`\`javascript
for (let key in person) {
    console.log(key + ": " + person[key])
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create object with name: "Bob" and score: 95. Log the score.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '95',
                        hint: 'const player = {name: "Bob", score: 95}\\nconsole.log(player.score)'
                    },
                    {
                        prompt: 'Create object with city: "Paris" and pop: 2000000. Log the city.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Paris',
                        hint: 'const place = {city: "Paris", pop: 2000000}\\nconsole.log(place.city)'
                    },
                    {
                        prompt: 'Create object with x: 10, y: 20. Log x + y.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '30',
                        hint: 'const point = {x: 10, y: 20}\\nconsole.log(point.x + point.y)'
                    }
                ]
            },
            {
                id: 'js-21',
                title: 'Template Literals',
                description: 'Modern string formatting',
                stage: 4,
                content: `
# Template Literals

Use backticks for powerful strings!

## Basic Template:
\`\`\`javascript
const name = "Alice"
console.log(\`Hello, \${name}!\`)
\`\`\`

Output: Hello, Alice!

## Expressions:
\`\`\`javascript
const a = 5
const b = 3
console.log(\`Sum: \${a + b}\`)
\`\`\`

Output: Sum: 8

## Multi-line:
\`\`\`javascript
const message = \`
Line 1
Line 2
Line 3\`
console.log(message)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create x = 10, y = 5. Log "Result: (x + y)" using template literal.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Result: 15',
                        hint: 'const x = 10, y = 5\\nconsole.log(`Result: ${x + y}`)'
                    },
                    {
                        prompt: 'Create name = "Sam". Log "Hello, Sam!" using template literal.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Hello, Sam!',
                        hint: 'const name = "Sam"\\nconsole.log(`Hello, ${name}!`)'
                    },
                    {
                        prompt: 'Create a = 3, b = 4. Log "Product: 12" using template literal.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Product: 12',
                        hint: 'const a = 3, b = 4\\nconsole.log(`Product: ${a * b}`)'
                    }
                ]
            },
            {
                id: 'js-22',
                title: 'Error Handling',
                description: 'Try/catch for robust code',
                stage: 4,
                content: `
# Error Handling

Catch errors before they crash your program!

## Try/Catch:
\`\`\`javascript
try {
    // Code that might fail
    JSON.parse("invalid json")
} catch (error) {
    console.log("Something went wrong!")
}
\`\`\`

Output: Something went wrong!

## With Finally:
\`\`\`javascript
try {
    let result = riskyOperation()
} catch (error) {
    console.log("Error occurred")
} finally {
    console.log("This always runs")
}
\`\`\`

## Throwing Errors:
\`\`\`javascript
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero")
    }
    return a / b
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write try/catch: try JSON.parse("bad"), catch and log "Parse error"',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Parse error',
                        hint: 'try {\\n    JSON.parse("bad")\\n} catch (e) {\\n    console.log("Parse error")\\n}'
                    },
                    {
                        prompt: 'Which keyword is used to handle errors in JavaScript?',
                        type: 'multiple-choice',
                        options: ['error', 'catch', 'handle', 'except'],
                        answer: 1
                    },
                    {
                        prompt: 'What block always executes regardless of errors?',
                        type: 'multiple-choice',
                        options: ['catch', 'finally', 'always', 'end'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-23',
                title: 'Complete JavaScript Project',
                description: 'Putting it all together',
                stage: 4,
                content: `
# Complete JavaScript Program

You've mastered JavaScript! Here's a complete example:

## Shopping Cart:
\`\`\`javascript
const cart = []

function addItem(name, price) {
    cart.push({ name, price })
    console.log(\`Added \${name}\`)
}

function getTotal() {
    let total = 0
    for (let item of cart) {
        total += item.price
    }
    return total
}

addItem("Apple", 1.50)
addItem("Bread", 2.00)
addItem("Milk", 3.50)

console.log(\`Total: $\${getTotal()}\`)
\`\`\`

Output:
Added Apple
Added Bread
Added Milk
Total: $7

Keep building projects and exploring! 🎉
        `,
                exercises: [
                    {
                        prompt: 'Create function isEven(n) that returns true if n % 2 === 0. Log isEven(8).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'true',
                        hint: 'function isEven(n) {\\n    return n % 2 === 0\\n}\\nconsole.log(isEven(8))'
                    },
                    {
                        prompt: 'Create function isOdd(n) that returns true if n % 2 !== 0. Log isOdd(7).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'true',
                        hint: 'function isOdd(n) {\\n    return n % 2 !== 0\\n}\\nconsole.log(isOdd(7))'
                    },
                    {
                        prompt: 'Create function triple(n) that returns n * 3. Log triple(4).',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '12',
                        hint: 'function triple(n) {\\n    return n * 3\\n}\\nconsole.log(triple(4))'
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - ES6+ Features ============
            {
                id: 'js-24',
                title: 'Destructuring',
                description: 'Extract values elegantly from arrays and objects',
                stage: 4,
                content: `
# Destructuring in JavaScript

Unpack values from arrays and objects!

## Array Destructuring:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]

const [first, second] = numbers
console.log(first)   // 1
console.log(second)  // 2

// Skip elements
const [a, , c] = numbers  // Skip second
console.log(c)  // 3

// Rest pattern
const [head, ...tail] = numbers
console.log(tail)  // [2, 3, 4, 5]

// Default values
const [x = 10, y = 20] = [5]
console.log(y)  // 20 (default)
\`\`\`

## Object Destructuring:
\`\`\`javascript
const person = { name: "Alice", age: 30, city: "NYC" }

const { name, age } = person
console.log(name)  // Alice

// Rename variables
const { name: userName, age: userAge } = person
console.log(userName)  // Alice

// Default values
const { country = "USA" } = person
console.log(country)  // USA

// Nested destructuring
const user = { profile: { email: "a@b.com" } }
const { profile: { email } } = user
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Destructure [10, 20, 30] to get first and second values, log their sum.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '30',
                        hint: 'const [first, second] = [10, 20, 30]\\nconsole.log(first + second)'
                    },
                    {
                        prompt: 'Destructure {x: 5, y: 10} and log x.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '5',
                        hint: 'const {x, y} = {x: 5, y: 10}\\nconsole.log(x)'
                    },
                    {
                        prompt: 'Which syntax destructures an array?',
                        type: 'multiple-choice',
                        options: ['const {a, b} = arr', 'const [a, b] = arr', 'const a, b = arr', 'const (a, b) = arr'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-25',
                title: 'Spread and Rest Operators',
                description: 'The power of ... operator',
                stage: 4,
                content: `
# Spread and Rest Operators

The \`...\` operator has two purposes!

## Spread - Expand elements:
\`\`\`javascript
// Spread arrays
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]
const combined = [...arr1, ...arr2]
console.log(combined)  // [1, 2, 3, 4, 5, 6]

// Copy array
const copy = [...arr1]

// Spread objects
const defaults = { theme: "dark", lang: "en" }
const settings = { ...defaults, theme: "light" }
console.log(settings)  // { theme: "light", lang: "en" }

// Function arguments
const nums = [1, 2, 3]
console.log(Math.max(...nums))  // 3
\`\`\`

## Rest - Collect remaining:
\`\`\`javascript
// In function parameters
function sum(...numbers) {
    return numbers.reduce((a, b) => a + b, 0)
}
console.log(sum(1, 2, 3, 4))  // 10

// In destructuring
const [first, ...rest] = [1, 2, 3, 4]
console.log(rest)  // [2, 3, 4]

const { a, ...others } = { a: 1, b: 2, c: 3 }
console.log(others)  // { b: 2, c: 3 }
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create function sum that takes any number of args and returns their sum. Test with 1, 2, 3.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '6',
                        hint: 'function sum(...nums) { return nums.reduce((a, b) => a + b, 0) }\\nconsole.log(sum(1, 2, 3))'
                    },
                    {
                        prompt: 'Which operator spreads an array into individual elements?',
                        type: 'multiple-choice',
                        options: ['***', '...', ':::', '>>>'],
                        answer: 1
                    },
                    {
                        prompt: 'Combine [1, 2] and [3, 4] using spread operator and log length.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '4',
                        hint: 'const combined = [...[1, 2], ...[3, 4]]\\nconsole.log(combined.length)'
                    }
                ]
            },
            {
                id: 'js-26',
                title: 'Template Literals Advanced',
                description: 'Tagged templates and multiline strings',
                stage: 4,
                content: `
# Advanced Template Literals

More than just string interpolation!

## Multiline Strings:
\`\`\`javascript
const html = \`
    <div class="card">
        <h2>Title</h2>
        <p>Content goes here</p>
    </div>
\`
\`\`\`

## Expressions:
\`\`\`javascript
const a = 5, b = 10
console.log(\`Sum: \${a + b}\`)  // Sum: 15
console.log(\`Double: \${a * 2}\`)  // Double: 10
console.log(\`Max: \${Math.max(a, b)}\`)  // Max: 10
\`\`\`

## Tagged Templates:
\`\`\`javascript
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] ? \`<b>\${values[i]}</b>\` : '')
    }, '')
}

const name = "Alice"
const age = 30
const result = highlight\`Name: \${name}, Age: \${age}\`
console.log(result)
// Name: <b>Alice</b>, Age: <b>30</b>
\`\`\`

## Practical: SQL-like queries:
\`\`\`javascript
function sql(strings, ...values) {
    // Escape values to prevent injection
    return strings.reduce((query, str, i) => 
        query + str + (values[i] !== undefined ? escape(values[i]) : ''), '')
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Use template literal to log "5 + 3 = 8" using variables a=5 and b=3.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '5 + 3 = 8',
                        hint: 'const a = 5, b = 3\\nconsole.log(\`\${a} + \${b} = \${a + b}\`)'
                    },
                    {
                        prompt: 'What character is used for template literals in JavaScript?',
                        type: 'multiple-choice',
                        options: ['Single quote', 'Double quote', 'Backtick', 'Forward slash'],
                        answer: 2
                    },
                    {
                        prompt: 'Create name="World" and log "Hello, World!" using template literal.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'Hello, World!',
                        hint: 'const name = "World"\\nconsole.log(\`Hello, \${name}!\`)'
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Promises & Async ============
            {
                id: 'js-27',
                title: 'Promises Deep Dive',
                description: 'Master asynchronous JavaScript',
                stage: 4,
                content: `
# Promises in JavaScript

Handle async operations elegantly!

## Creating Promises:
\`\`\`javascript
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = true
        if (success) {
            resolve("Data loaded!")
        } else {
            reject("Error occurred!")
        }
    }, 1000)
})

myPromise
    .then(data => console.log(data))
    .catch(error => console.log(error))
\`\`\`

## Promise Chaining:
\`\`\`javascript
fetch('/api/user')
    .then(response => response.json())
    .then(user => fetch(\`/api/posts/\${user.id}\`))
    .then(response => response.json())
    .then(posts => console.log(posts))
    .catch(error => console.error(error))
\`\`\`

## Promise.all - Run in parallel:
\`\`\`javascript
const p1 = fetch('/api/users')
const p2 = fetch('/api/posts')
const p3 = fetch('/api/comments')

Promise.all([p1, p2, p3])
    .then(responses => {
        console.log("All requests complete!")
    })
\`\`\`

## Promise.race - First to finish:
\`\`\`javascript
Promise.race([slowRequest(), fastRequest()])
    .then(result => console.log("First result:", result))
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method runs multiple promises in parallel?',
                        type: 'multiple-choice',
                        options: ['Promise.parallel()', 'Promise.all()', 'Promise.multi()', 'Promise.concurrent()'],
                        answer: 1
                    },
                    {
                        prompt: 'Which method returns the first promise to complete?',
                        type: 'multiple-choice',
                        options: ['Promise.first()', 'Promise.race()', 'Promise.fastest()', 'Promise.any()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method is called when a Promise fails?',
                        type: 'multiple-choice',
                        options: ['then()', 'catch()', 'finally()', 'error()'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-28',
                title: 'Async/Await',
                description: 'Write async code that looks synchronous',
                stage: 4,
                content: `
# Async/Await in JavaScript

Cleaner syntax for promises!

## Basic Syntax:
\`\`\`javascript
async function fetchData() {
    const response = await fetch('/api/data')
    const data = await response.json()
    return data
}

fetchData().then(data => console.log(data))
\`\`\`

## Error Handling:
\`\`\`javascript
async function fetchUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`)
        if (!response.ok) {
            throw new Error("User not found")
        }
        return await response.json()
    } catch (error) {
        console.error("Error:", error.message)
        return null
    }
}
\`\`\`

## Parallel Execution:
\`\`\`javascript
async function getAllData() {
    // Wrong - sequential (slow)
    const users = await fetch('/api/users')
    const posts = await fetch('/api/posts')
    
    // Right - parallel (fast)
    const [users, posts] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/posts')
    ])
}
\`\`\`

## Async Arrow Functions:
\`\`\`javascript
const fetchData = async () => {
    const data = await getData()
    return data
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword pauses execution until a promise resolves?',
                        type: 'multiple-choice',
                        options: ['wait', 'await', 'pause', 'sync'],
                        answer: 1
                    },
                    {
                        prompt: 'What keyword must precede a function that uses await?',
                        type: 'multiple-choice',
                        options: ['promise', 'async', 'wait', 'defer'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you handle errors in async/await?',
                        type: 'multiple-choice',
                        options: ['try/catch', '.catch()', 'onError()', 'error callback'],
                        answer: 0
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Closures & Scope ============
            {
                id: 'js-29',
                title: 'Closures',
                description: 'Functions that remember their environment',
                stage: 4,
                content: `
# Closures in JavaScript

A closure is a function that remembers its outer scope!

## Basic Closure:
\`\`\`javascript
function createCounter() {
    let count = 0  // Private variable
    
    return function() {
        count++
        return count
    }
}

const counter = createCounter()
console.log(counter())  // 1
console.log(counter())  // 2
console.log(counter())  // 3
\`\`\`

## Practical Uses:
\`\`\`javascript
// Private data
function createBankAccount(initial) {
    let balance = initial
    
    return {
        deposit(amount) {
            balance += amount
            return balance
        },
        withdraw(amount) {
            if (amount <= balance) {
                balance -= amount
                return balance
            }
            return "Insufficient funds"
        },
        getBalance() {
            return balance
        }
    }
}

const account = createBankAccount(100)
console.log(account.deposit(50))   // 150
console.log(account.withdraw(30))  // 120
console.log(account.balance)       // undefined (private!)
\`\`\`

## Function Factory:
\`\`\`javascript
function createMultiplier(factor) {
    return function(number) {
        return number * factor
    }
}

const double = createMultiplier(2)
const triple = createMultiplier(3)
console.log(double(5))  // 10
console.log(triple(5))  // 15
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a counter closure that returns incremented values. Call it twice.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '1\n2',
                        hint: 'function makeCounter() { let n = 0; return () => ++n }\\nconst c = makeCounter()\\nconsole.log(c())\\nconsole.log(c())'
                    },
                    {
                        prompt: 'What is a closure?',
                        type: 'multiple-choice',
                        options: ['A function that closes the program', 'A function that remembers its outer scope', 'A function without parameters', 'A function that runs once'],
                        answer: 1
                    },
                    {
                        prompt: 'Why are closures useful?',
                        type: 'multiple-choice',
                        options: ['They make code run faster', 'They create private data', 'They reduce file size', 'They prevent all errors'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-30',
                title: 'The this Keyword',
                description: 'Understanding context in JavaScript',
                stage: 4,
                content: `
# The "this" Keyword

\`this\` depends on HOW a function is called!

## Global Context:
\`\`\`javascript
console.log(this)  // window (browser) or global (Node)
\`\`\`

## Object Methods:
\`\`\`javascript
const person = {
    name: "Alice",
    greet() {
        console.log(\`Hello, I'm \${this.name}\`)
    }
}
person.greet()  // Hello, I'm Alice
\`\`\`

## The Problem:
\`\`\`javascript
const person = {
    name: "Alice",
    greet() {
        setTimeout(function() {
            console.log(this.name)  // undefined! 'this' changed
        }, 100)
    }
}
\`\`\`

## Solutions:
\`\`\`javascript
// 1. Arrow function (inherits this)
const person = {
    name: "Alice",
    greet() {
        setTimeout(() => {
            console.log(this.name)  // Alice!
        }, 100)
    }
}

// 2. bind()
const greet = person.greet.bind(person)

// 3. call() and apply()
function greet() {
    console.log(\`Hello, \${this.name}\`)
}
greet.call({ name: "Bob" })   // Hello, Bob
greet.apply({ name: "Charlie" })  // Hello, Charlie
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method permanently binds a function to a specific "this" value?',
                        type: 'multiple-choice',
                        options: ['call()', 'apply()', 'bind()', 'this()'],
                        answer: 2
                    },
                    {
                        prompt: 'Which function type automatically inherits "this" from its parent scope?',
                        type: 'multiple-choice',
                        options: ['Regular function', 'Arrow function', 'Constructor function', 'Generator function'],
                        answer: 1
                    },
                    {
                        prompt: 'What does "this" refer to in a method called on an object?',
                        type: 'multiple-choice',
                        options: ['The global object', 'The function itself', 'The object the method belongs to', 'undefined'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Classes ============
            {
                id: 'js-31',
                title: 'Classes Deep Dive',
                description: 'Object-oriented JavaScript',
                stage: 4,
                content: `
# JavaScript Classes

Modern syntax for object-oriented programming!

## Basic Class:
\`\`\`javascript
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    
    greet() {
        return \`Hi, I'm \${this.name}\`
    }
    
    // Getter
    get info() {
        return \`\${this.name}, \${this.age}\`
    }
    
    // Setter
    set info(value) {
        [this.name, this.age] = value.split(", ")
    }
}

const alice = new Person("Alice", 30)
console.log(alice.greet())  // Hi, I'm Alice
console.log(alice.info)     // Alice, 30
\`\`\`

## Static Methods:
\`\`\`javascript
class MathUtils {
    static add(a, b) {
        return a + b
    }
    
    static PI = 3.14159
}

console.log(MathUtils.add(5, 3))  // 8
console.log(MathUtils.PI)  // 3.14159
\`\`\`

## Private Fields:
\`\`\`javascript
class Counter {
    #count = 0  // Private field
    
    increment() {
        this.#count++
    }
    
    get value() {
        return this.#count
    }
}

const counter = new Counter()
counter.increment()
console.log(counter.value)  // 1
console.log(counter.#count) // Error! Private
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What prefix makes a class field private?',
                        type: 'multiple-choice',
                        options: ['_', '#', 'private', '@'],
                        answer: 1
                    },
                    {
                        prompt: 'What keyword creates a class in JavaScript?',
                        type: 'multiple-choice',
                        options: ['class', 'Class', 'object', 'new'],
                        answer: 0
                    },
                    {
                        prompt: 'What method is called when creating a new instance?',
                        type: 'multiple-choice',
                        options: ['init()', 'new()', 'constructor()', 'create()'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'js-32',
                title: 'Class Inheritance',
                description: 'Extend and inherit from classes',
                stage: 4,
                content: `
# Class Inheritance

Create specialized classes from general ones!

## Basic Inheritance:
\`\`\`javascript
class Animal {
    constructor(name) {
        this.name = name
    }
    
    speak() {
        console.log(\`\${this.name} makes a sound\`)
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name)  // Call parent constructor
        this.breed = breed
    }
    
    speak() {
        console.log(\`\${this.name} barks!\`)
    }
    
    fetch() {
        console.log(\`\${this.name} fetches the ball!\`)
    }
}

const rex = new Dog("Rex", "German Shepherd")
rex.speak()  // Rex barks!
rex.fetch()  // Rex fetches the ball!
\`\`\`

## Call Parent Methods:
\`\`\`javascript
class Cat extends Animal {
    speak() {
        super.speak()  // Call parent method
        console.log("...then meows!")
    }
}

const whiskers = new Cat("Whiskers")
whiskers.speak()
// Whiskers makes a sound
// ...then meows!
\`\`\`

## Check Instance:
\`\`\`javascript
console.log(rex instanceof Dog)     // true
console.log(rex instanceof Animal)  // true
console.log(rex instanceof Cat)     // false
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword calls the parent class constructor?',
                        type: 'multiple-choice',
                        options: ['parent()', 'super()', 'base()', 'this()'],
                        answer: 1
                    },
                    {
                        prompt: 'What keyword extends one class from another?',
                        type: 'multiple-choice',
                        options: ['inherits', 'extends', 'from', 'derives'],
                        answer: 1
                    },
                    {
                        prompt: 'What operator checks if an object is an instance of a class?',
                        type: 'multiple-choice',
                        options: ['typeof', 'instanceof', 'istype', 'classof'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Array Methods ============
            {
                id: 'js-33',
                title: 'Advanced Array Methods',
                description: 'Master array transformations',
                stage: 4,
                content: `
# Advanced Array Methods

Power tools for array manipulation!

## reduce() - Accumulate values:
\`\`\`javascript
const numbers = [1, 2, 3, 4, 5]

// Sum
const sum = numbers.reduce((acc, curr) => acc + curr, 0)
console.log(sum)  // 15

// Max
const max = numbers.reduce((a, b) => a > b ? a : b)
console.log(max)  // 5

// Group by property
const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 25 },
    { name: "Charlie", age: 30 }
]

const byAge = people.reduce((groups, person) => {
    const age = person.age
    groups[age] = groups[age] || []
    groups[age].push(person)
    return groups
}, {})
\`\`\`

## flat() and flatMap():
\`\`\`javascript
const nested = [[1, 2], [3, 4], [5]]
console.log(nested.flat())  // [1, 2, 3, 4, 5]

const deep = [1, [2, [3, [4]]]]
console.log(deep.flat(2))  // [1, 2, 3, [4]]
console.log(deep.flat(Infinity))  // [1, 2, 3, 4]

// flatMap = map + flat(1)
const words = ["hello world", "foo bar"]
const letters = words.flatMap(w => w.split(" "))
console.log(letters)  // ["hello", "world", "foo", "bar"]
\`\`\`

## every() and some():
\`\`\`javascript
const nums = [2, 4, 6, 8]
console.log(nums.every(n => n % 2 === 0))  // true (all even)
console.log(nums.some(n => n > 5))  // true (at least one > 5)
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Use reduce to find the product of [2, 3, 4].',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '24',
                        hint: 'const nums = [2, 3, 4]\\nconsole.log(nums.reduce((a, b) => a * b))'
                    },
                    {
                        prompt: 'Which method accumulates array values into a single result?',
                        type: 'multiple-choice',
                        options: ['map()', 'filter()', 'reduce()', 'forEach()'],
                        answer: 2
                    },
                    {
                        prompt: 'Use reduce to sum [5, 10, 15].',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '30',
                        hint: 'console.log([5, 10, 15].reduce((a, b) => a + b, 0))'
                    }
                ]
            },
            {
                id: 'js-34',
                title: 'Array Search Methods',
                description: 'Finding elements in arrays',
                stage: 4,
                content: `
# Array Search Methods

Find exactly what you need!

## find() and findIndex():
\`\`\`javascript
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
]

const user = users.find(u => u.id === 2)
console.log(user)  // { id: 2, name: "Bob" }

const index = users.findIndex(u => u.name === "Charlie")
console.log(index)  // 2
\`\`\`

## includes() and indexOf():
\`\`\`javascript
const fruits = ["apple", "banana", "orange"]

console.log(fruits.includes("banana"))  // true
console.log(fruits.indexOf("orange"))   // 2
console.log(fruits.indexOf("grape"))    // -1 (not found)
\`\`\`

## findLast() and findLastIndex():
\`\`\`javascript
const nums = [1, 2, 3, 4, 5, 4, 3]

const last4 = nums.findLast(n => n === 4)
console.log(last4)  // 4 (the second occurrence)

const lastIndex = nums.findLastIndex(n => n === 4)
console.log(lastIndex)  // 5
\`\`\`

## Array.from():
\`\`\`javascript
// Create array from iterable
const str = "hello"
const chars = Array.from(str)
console.log(chars)  // ['h', 'e', 'l', 'l', 'o']

// With map function
const nums = Array.from({ length: 5 }, (_, i) => i * 2)
console.log(nums)  // [0, 2, 4, 6, 8]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Find the first number greater than 10 in [5, 8, 12, 3, 15].',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '12',
                        hint: 'console.log([5, 8, 12, 3, 15].find(n => n > 10))'
                    },
                    {
                        prompt: 'Which method returns the first matching element?',
                        type: 'multiple-choice',
                        options: ['filter()', 'find()', 'search()', 'get()'],
                        answer: 1
                    },
                    {
                        prompt: 'Check if [1, 2, 3] includes 2.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: 'true',
                        hint: 'console.log([1, 2, 3].includes(2))'
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Map and Set ============
            {
                id: 'js-35',
                title: 'Map and WeakMap',
                description: 'Key-value collections beyond objects',
                stage: 4,
                content: `
# Map in JavaScript

Better key-value storage than objects!

## Basic Map:
\`\`\`javascript
const map = new Map()

// Set values
map.set("name", "Alice")
map.set("age", 30)
map.set(1, "one")  // Keys can be any type!

// Get values
console.log(map.get("name"))  // Alice
console.log(map.get(1))       // one

// Check existence
console.log(map.has("age"))   // true
console.log(map.size)         // 3

// Delete
map.delete("age")
\`\`\`

## Why Map over Object?
\`\`\`javascript
// Objects only have string keys
const obj = {}
obj[1] = "one"
obj["1"] = "string one"
console.log(obj[1])  // "string one" (overwritten!)

// Map preserves key types
const map = new Map()
map.set(1, "one")
map.set("1", "string one")
console.log(map.get(1))    // "one"
console.log(map.get("1"))  // "string one"
\`\`\`

## Iterate Map:
\`\`\`javascript
const map = new Map([
    ["a", 1],
    ["b", 2],
    ["c", 3]
])

for (let [key, value] of map) {
    console.log(key, value)
}

map.forEach((value, key) => console.log(key, value))
\`\`\`

## WeakMap:
\`\`\`javascript
// Keys must be objects, allows garbage collection
const weakMap = new WeakMap()
let obj = { data: "secret" }
weakMap.set(obj, "private info")
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What data structure allows any type as keys?',
                        type: 'multiple-choice',
                        options: ['Object', 'Map', 'Array', 'Set'],
                        answer: 1
                    },
                    {
                        prompt: 'What method adds a key-value pair to a Map?',
                        type: 'multiple-choice',
                        options: ['add()', 'put()', 'set()', 'insert()'],
                        answer: 2
                    },
                    {
                        prompt: 'What property gives the number of entries in a Map?',
                        type: 'multiple-choice',
                        options: ['length', 'size', 'count', 'entries'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-36',
                title: 'Set and WeakSet',
                description: 'Collections of unique values',
                stage: 4,
                content: `
# Set in JavaScript

Store unique values only!

## Basic Set:
\`\`\`javascript
const set = new Set()

// Add values
set.add(1)
set.add(2)
set.add(2)  // Ignored! Already exists
set.add(3)

console.log(set.size)  // 3
console.log(set.has(2))  // true

// From array (removes duplicates!)
const numbers = [1, 2, 2, 3, 3, 3, 4]
const unique = new Set(numbers)
console.log([...unique])  // [1, 2, 3, 4]
\`\`\`

## Set Operations:
\`\`\`javascript
const a = new Set([1, 2, 3])
const b = new Set([2, 3, 4])

// Union
const union = new Set([...a, ...b])
console.log([...union])  // [1, 2, 3, 4]

// Intersection
const intersection = new Set([...a].filter(x => b.has(x)))
console.log([...intersection])  // [2, 3]

// Difference
const difference = new Set([...a].filter(x => !b.has(x)))
console.log([...difference])  // [1]
\`\`\`

## Iterate Set:
\`\`\`javascript
const set = new Set(["a", "b", "c"])

for (let item of set) {
    console.log(item)
}

set.forEach(item => console.log(item))
\`\`\`

## Practical Use:
\`\`\`javascript
// Remove duplicates from array
const dedupe = arr => [...new Set(arr)]
console.log(dedupe([1, 1, 2, 2, 3]))  // [1, 2, 3]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Remove duplicates from [1, 2, 2, 3, 3, 3] using Set.',
                        type: 'code',
                        language: 'javascript',
                        expectedOutput: '[ 1, 2, 3 ]',
                        hint: 'console.log([...new Set([1, 2, 2, 3, 3, 3])])'
                    },
                    {
                        prompt: 'What method adds an element to a Set?',
                        type: 'multiple-choice',
                        options: ['push()', 'add()', 'set()', 'insert()'],
                        answer: 1
                    },
                    {
                        prompt: 'Can a Set contain duplicate values?',
                        type: 'multiple-choice',
                        options: ['Yes', 'No', 'Only numbers', 'Only strings'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Modules ============
            {
                id: 'js-37',
                title: 'ES6 Modules',
                description: 'Organize code into modules',
                stage: 4,
                content: `
# ES6 Modules

Organize and share code between files!

## Export:
\`\`\`javascript
// math.js
export const PI = 3.14159

export function add(a, b) {
    return a + b
}

export function multiply(a, b) {
    return a * b
}

// Default export (one per module)
export default class Calculator {
    // ...
}
\`\`\`

## Import:
\`\`\`javascript
// Named imports
import { add, multiply, PI } from './math.js'
console.log(add(5, 3))

// Rename imports
import { add as sum } from './math.js'

// Import all
import * as math from './math.js'
console.log(math.add(5, 3))
console.log(math.PI)

// Default import
import Calculator from './math.js'

// Combined
import Calculator, { add, PI } from './math.js'
\`\`\`

## Dynamic Imports:
\`\`\`javascript
// Load module on demand
async function loadChart() {
    const { Chart } = await import('./chart.js')
    const chart = new Chart()
    chart.render()
}

button.addEventListener('click', loadChart)
\`\`\`

## Re-exporting:
\`\`\`javascript
// index.js - barrel file
export { add, multiply } from './math.js'
export { format } from './format.js'
export { validate } from './validate.js'
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword imports a default export?',
                        type: 'multiple-choice',
                        options: ['import { default }', 'import default', 'import name', 'require'],
                        answer: 2
                    },
                    {
                        prompt: 'What keyword exports a function from a module?',
                        type: 'multiple-choice',
                        options: ['module', 'export', 'send', 'share'],
                        answer: 1
                    },
                    {
                        prompt: 'How many default exports can a module have?',
                        type: 'multiple-choice',
                        options: ['Unlimited', 'Two', 'One', 'Zero'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Error Handling ============
            {
                id: 'js-38',
                title: 'Advanced Error Handling',
                description: 'Master error handling patterns',
                stage: 4,
                content: `
# Advanced Error Handling

Handle errors like a pro!

## Custom Error Classes:
\`\`\`javascript
class ValidationError extends Error {
    constructor(message, field) {
        super(message)
        this.name = "ValidationError"
        this.field = field
    }
}

class NetworkError extends Error {
    constructor(message, status) {
        super(message)
        this.name = "NetworkError"
        this.status = status
    }
}

function validateUser(user) {
    if (!user.email) {
        throw new ValidationError("Email required", "email")
    }
}
\`\`\`

## Catch Specific Errors:
\`\`\`javascript
try {
    await fetchData()
} catch (error) {
    if (error instanceof ValidationError) {
        console.log(\`Fix field: \${error.field}\`)
    } else if (error instanceof NetworkError) {
        console.log(\`HTTP \${error.status}\`)
    } else {
        throw error  // Re-throw unknown errors
    }
}
\`\`\`

## Error Handling in Async:
\`\`\`javascript
// With promises
fetchData()
    .then(data => process(data))
    .catch(error => console.error(error))
    .finally(() => cleanup())

// With async/await
async function getData() {
    try {
        const data = await fetchData()
        return data
    } catch (error) {
        console.error(error)
        return null
    } finally {
        cleanup()
    }
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What block always runs, regardless of errors?',
                        type: 'multiple-choice',
                        options: ['catch', 'finally', 'then', 'always'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you create a custom error class?',
                        type: 'multiple-choice',
                        options: ['function CustomError()', 'class CustomError extends Error', 'new Error.create()', 'Error.define()'],
                        answer: 1
                    },
                    {
                        prompt: 'What keyword throws an error?',
                        type: 'multiple-choice',
                        options: ['error', 'throw', 'raise', 'fail'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Generators ============
            {
                id: 'js-39',
                title: 'Generators',
                description: 'Pausable functions with yield',
                stage: 4,
                content: `
# Generators in JavaScript

Functions that can pause and resume!

## Basic Generator:
\`\`\`javascript
function* countUp(max) {
    let i = 1
    while (i <= max) {
        yield i
        i++
    }
}

const counter = countUp(3)
console.log(counter.next())  // { value: 1, done: false }
console.log(counter.next())  // { value: 2, done: false }
console.log(counter.next())  // { value: 3, done: false }
console.log(counter.next())  // { value: undefined, done: true }
\`\`\`

## Iterate Generator:
\`\`\`javascript
function* fibonacci(n) {
    let a = 0, b = 1
    for (let i = 0; i < n; i++) {
        yield a
        [a, b] = [b, a + b]
    }
}

for (let num of fibonacci(8)) {
    console.log(num)  // 0, 1, 1, 2, 3, 5, 8, 13
}

console.log([...fibonacci(8)])  // [0, 1, 1, 2, 3, 5, 8, 13]
\`\`\`

## Infinite Generator:
\`\`\`javascript
function* infiniteIds() {
    let id = 1
    while (true) {
        yield id++
    }
}

const idGenerator = infiniteIds()
console.log(idGenerator.next().value)  // 1
console.log(idGenerator.next().value)  // 2
// Can keep going forever!
\`\`\`

## Yield*:
\`\`\`javascript
function* combined() {
    yield* [1, 2, 3]
    yield* [4, 5, 6]
}
console.log([...combined()])  // [1, 2, 3, 4, 5, 6]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What keyword pauses a generator and returns a value?',
                        type: 'multiple-choice',
                        options: ['return', 'yield', 'pause', 'emit'],
                        answer: 1
                    },
                    {
                        prompt: 'What character marks a generator function?',
                        type: 'multiple-choice',
                        options: ['*', '#', '@', '^'],
                        answer: 0
                    },
                    {
                        prompt: 'What method gets the next value from a generator?',
                        type: 'multiple-choice',
                        options: ['get()', 'next()', 'yield()', 'value()'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Proxy and Reflect ============
            {
                id: 'js-40',
                title: 'Proxy Objects',
                description: 'Intercept and customize object operations',
                stage: 4,
                content: `
# Proxy in JavaScript

Intercept operations on objects!

## Basic Proxy:
\`\`\`javascript
const target = {
    name: "Alice",
    age: 30
}

const handler = {
    get(target, prop) {
        console.log(\`Getting \${prop}\`)
        return target[prop]
    },
    set(target, prop, value) {
        console.log(\`Setting \${prop} to \${value}\`)
        target[prop] = value
        return true
    }
}

const proxy = new Proxy(target, handler)
proxy.name      // Getting name -> "Alice"
proxy.age = 31  // Setting age to 31
\`\`\`

## Validation:
\`\`\`javascript
const validator = {
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number')
        }
        if (prop === 'age' && value < 0) {
            throw new RangeError('Age must be positive')
        }
        target[prop] = value
        return true
    }
}

const person = new Proxy({}, validator)
person.age = 30    // OK
person.age = -5    // RangeError!
person.age = "30"  // TypeError!
\`\`\`

## Default Values:
\`\`\`javascript
const withDefaults = {
    get(target, prop) {
        return prop in target ? target[prop] : 'Not found'
    }
}

const data = new Proxy({ x: 10 }, withDefaults)
console.log(data.x)  // 10
console.log(data.y)  // "Not found"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What does a Proxy allow you to do?',
                        type: 'multiple-choice',
                        options: ['Speed up code', 'Intercept object operations', 'Create copies', 'Compress data'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the second argument when creating a Proxy?',
                        type: 'multiple-choice',
                        options: ['target', 'handler', 'options', 'config'],
                        answer: 1
                    },
                    {
                        prompt: 'Which handler trap intercepts property access?',
                        type: 'multiple-choice',
                        options: ['access()', 'get()', 'read()', 'prop()'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Symbols ============
            {
                id: 'js-41',
                title: 'Symbols',
                description: 'Unique identifiers in JavaScript',
                stage: 4,
                content: `
# Symbols in JavaScript

Create unique, hidden property keys!

## Creating Symbols:
\`\`\`javascript
const sym1 = Symbol("id")
const sym2 = Symbol("id")

console.log(sym1 === sym2)  // false! Always unique

// Use as property key
const user = {
    name: "Alice",
    [sym1]: 12345  // Hidden from normal iteration
}

console.log(user[sym1])  // 12345
console.log(Object.keys(user))  // ["name"] - symbol not shown!
\`\`\`

## Global Symbol Registry:
\`\`\`javascript
// Shared symbols across files
const globalSym = Symbol.for("app.id")
const sameSym = Symbol.for("app.id")

console.log(globalSym === sameSym)  // true!

// Get key from symbol
console.log(Symbol.keyFor(globalSym))  // "app.id"
\`\`\`

## Well-Known Symbols:
\`\`\`javascript
// Customize object behavior
class CustomArray {
    static [Symbol.hasInstance](obj) {
        return Array.isArray(obj)
    }
}

console.log([] instanceof CustomArray)  // true!

// Iterator symbol
const iterable = {
    *[Symbol.iterator]() {
        yield 1
        yield 2
        yield 3
    }
}

console.log([...iterable])  // [1, 2, 3]
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Are two Symbols with the same description equal?',
                        type: 'multiple-choice',
                        options: ['Yes', 'No', 'Sometimes', 'Only in strict mode'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you create a Symbol?',
                        type: 'multiple-choice',
                        options: ['new Symbol()', 'Symbol()', 'Symbol.create()', 'createSymbol()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method creates a shared global Symbol?',
                        type: 'multiple-choice',
                        options: ['Symbol()', 'Symbol.global()', 'Symbol.for()', 'Symbol.shared()'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Regular Expressions ============
            {
                id: 'js-42',
                title: 'Regular Expressions',
                description: 'Pattern matching in JavaScript',
                stage: 4,
                content: `
# Regular Expressions

Powerful pattern matching!

## Creating RegExp:
\`\`\`javascript
// Literal
const regex1 = /hello/i

// Constructor
const regex2 = new RegExp("hello", "i")
\`\`\`

## Pattern Matching:
\`\`\`javascript
const text = "Hello World, hello universe"

// Test for match
console.log(/hello/i.test(text))  // true

// Find match
console.log(text.match(/hello/gi))  // ["Hello", "hello"]

// Replace
console.log(text.replace(/hello/gi, "Hi"))
// "Hi World, Hi universe"
\`\`\`

## Common Patterns:
\`\`\`javascript
// Email
const email = /^[\\w.-]+@[\\w.-]+\\.\\w+$/

// Phone (US)
const phone = /^\\d{3}-\\d{3}-\\d{4}$/

// URL
const url = /https?:\\/\\/[\\w.-]+(\\/[\\w.-]*)*\\/?/
\`\`\`

## Capture Groups:
\`\`\`javascript
const dateStr = "2024-01-15"
const regex = /(\\d{4})-(\\d{2})-(\\d{2})/

const match = dateStr.match(regex)
console.log(match[1])  // "2024"
console.log(match[2])  // "01"
console.log(match[3])  // "15"

// Named groups
const namedRegex = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
const { groups } = dateStr.match(namedRegex)
console.log(groups.year)  // "2024"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method tests if a pattern matches a string?',
                        type: 'multiple-choice',
                        options: ['match()', 'test()', 'find()', 'exec()'],
                        answer: 1
                    },
                    {
                        prompt: 'What flag makes a regex case-insensitive?',
                        type: 'multiple-choice',
                        options: ['c', 'i', 'g', 's'],
                        answer: 1
                    },
                    {
                        prompt: 'What flag finds all matches, not just the first?',
                        type: 'multiple-choice',
                        options: ['a', 'm', 'g', 'f'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - JSON ============
            {
                id: 'js-43',
                title: 'JSON Deep Dive',
                description: 'Master JSON operations',
                stage: 4,
                content: `
# JSON in JavaScript

Data interchange format!

## Basic Operations:
\`\`\`javascript
// Object to JSON string
const user = { name: "Alice", age: 30 }
const json = JSON.stringify(user)
console.log(json)  // '{"name":"Alice","age":30}'

// JSON string to object
const parsed = JSON.parse(json)
console.log(parsed.name)  // "Alice"
\`\`\`

## Formatting:
\`\`\`javascript
const data = { name: "Alice", hobbies: ["reading", "coding"] }

// Pretty print
console.log(JSON.stringify(data, null, 2))
/*
{
  "name": "Alice",
  "hobbies": [
    "reading",
    "coding"
  ]
}
*/
\`\`\`

## Custom Serialization:
\`\`\`javascript
const user = {
    name: "Alice",
    password: "secret",
    toJSON() {
        return { name: this.name }  // Exclude password
    }
}

console.log(JSON.stringify(user))  // {"name":"Alice"}

// Or use replacer function
JSON.stringify(user, (key, value) => {
    if (key === 'password') return undefined
    return value
})
\`\`\`

## Reviver Function:
\`\`\`javascript
const json = '{"date":"2024-01-15T00:00:00.000Z"}'

const data = JSON.parse(json, (key, value) => {
    if (key === 'date') return new Date(value)
    return value
})

console.log(data.date instanceof Date)  // true
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What does JSON.stringify() do?',
                        type: 'multiple-choice',
                        options: ['Parse JSON', 'Convert to JSON string', 'Validate JSON', 'Format JSON'],
                        answer: 1
                    },
                    {
                        prompt: 'What does JSON.parse() do?',
                        type: 'multiple-choice',
                        options: ['Convert to JSON string', 'Parse JSON to object', 'Validate JSON', 'Create JSON'],
                        answer: 1
                    },
                    {
                        prompt: 'What does JSON stand for?',
                        type: 'multiple-choice',
                        options: ['Java Script Object Notation', 'JavaScript Object Notation', 'Java Serialized Object Network', 'JavaScript Ordered Nodes'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED JAVASCRIPT - Storage ============
            {
                id: 'js-44',
                title: 'Web Storage API',
                description: 'Store data in the browser',
                stage: 4,
                content: `
# Web Storage API

Store data locally in the browser!

## localStorage:
\`\`\`javascript
// Set item
localStorage.setItem("username", "Alice")

// Get item
const username = localStorage.getItem("username")
console.log(username)  // "Alice"

// Remove item
localStorage.removeItem("username")

// Clear all
localStorage.clear()
\`\`\`

## Storing Objects:
\`\`\`javascript
// Must convert to JSON
const user = { name: "Alice", age: 30 }
localStorage.setItem("user", JSON.stringify(user))

// Retrieve and parse
const storedUser = JSON.parse(localStorage.getItem("user"))
console.log(storedUser.name)  // "Alice"
\`\`\`

## sessionStorage:
\`\`\`javascript
// Same API, but clears when tab closes
sessionStorage.setItem("temp", "data")
sessionStorage.getItem("temp")
\`\`\`

## Storage Wrapper:
\`\`\`javascript
const storage = {
    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    },
    get(key, defaultValue = null) {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
    },
    remove(key) {
        localStorage.removeItem(key)
    }
}

storage.set("preferences", { theme: "dark" })
const prefs = storage.get("preferences")
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What is the difference between localStorage and sessionStorage?',
                        type: 'multiple-choice',
                        options: ['Size limit', 'Session clears on tab close', 'Speed', 'Security'],
                        answer: 1
                    },
                    {
                        prompt: 'What method retrieves an item from localStorage?',
                        type: 'multiple-choice',
                        options: ['get()', 'getItem()', 'retrieve()', 'read()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method removes all items from localStorage?',
                        type: 'multiple-choice',
                        options: ['removeAll()', 'deleteAll()', 'clear()', 'empty()'],
                        answer: 2
                    }
                ]
            },
            // ============ DOM MANIPULATION ============
            {
                id: 'js-45',
                title: 'DOM Selection',
                description: 'Select elements from the page',
                stage: 4,
                content: `
# DOM Selection

Find elements on the page!

## Selection Methods:
\`\`\`javascript
// Single element
const header = document.getElementById("header")
const firstBtn = document.querySelector(".btn")
const title = document.querySelector("h1")

// Multiple elements
const allBtns = document.querySelectorAll(".btn")
const allLinks = document.getElementsByTagName("a")
const allItems = document.getElementsByClassName("item")
\`\`\`

## Traversing DOM:
\`\`\`javascript
const element = document.querySelector(".child")

// Parent
element.parentElement
element.parentNode

// Children
element.children           // HTMLCollection
element.childNodes         // NodeList (includes text nodes)
element.firstElementChild
element.lastElementChild

// Siblings
element.nextElementSibling
element.previousElementSibling
\`\`\`

## Checking Elements:
\`\`\`javascript
// Check if matches selector
element.matches(".active")  // true/false

// Find closest ancestor
const card = button.closest(".card")
\`\`\`

## Modern Selection Pattern:
\`\`\`javascript
// Shorthand helpers
const $ = (sel) => document.querySelector(sel)
const $$ = (sel) => [...document.querySelectorAll(sel)]

const header = $("#header")
const buttons = $$(".btn")
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method selects the first matching element?',
                        type: 'multiple-choice',
                        options: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementsByTagName'],
                        answer: 1
                    },
                    {
                        prompt: 'What method selects ALL matching elements?',
                        type: 'multiple-choice',
                        options: ['querySelector', 'querySelectorAll', 'getElements', 'selectAll'],
                        answer: 1
                    },
                    {
                        prompt: 'What property gets an element\'s parent?',
                        type: 'multiple-choice',
                        options: ['parent', 'parentElement', 'parentNode', 'container'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'js-46',
                title: 'DOM Manipulation',
                description: 'Create, modify, and remove elements',
                stage: 4,
                content: `
# DOM Manipulation

Change the page dynamically!

## Modifying Elements:
\`\`\`javascript
const element = document.querySelector("#title")

// Text content
element.textContent = "New Title"
element.innerText = "Visible Text Only"

// HTML content
element.innerHTML = "<strong>Bold Title</strong>"

// Attributes
element.setAttribute("data-id", "123")
element.getAttribute("data-id")
element.removeAttribute("data-id")
element.id = "newId"
\`\`\`

## Creating Elements:
\`\`\`javascript
// Create element
const div = document.createElement("div")
div.className = "card"
div.textContent = "Hello!"

// Add to page
document.body.appendChild(div)
parent.insertBefore(div, referenceElement)
parent.append(div, "text", anotherDiv)  // Multiple
parent.prepend(div)  // Add to beginning
\`\`\`

## Removing Elements:
\`\`\`javascript
element.remove()  // Remove self
parent.removeChild(child)  // Remove child
\`\`\`

## Classes:
\`\`\`javascript
element.classList.add("active")
element.classList.remove("active")
element.classList.toggle("active")
element.classList.contains("active")  // true/false
element.classList.replace("old", "new")
\`\`\`

## Styles:
\`\`\`javascript
element.style.color = "red"
element.style.backgroundColor = "blue"
element.style.cssText = "color: red; font-size: 16px"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method toggles a class on/off?',
                        type: 'multiple-choice',
                        options: ['classList.add', 'classList.toggle', 'classList.switch', 'classList.flip'],
                        answer: 1
                    },
                    {
                        prompt: 'What method creates a new HTML element?',
                        type: 'multiple-choice',
                        options: ['document.new()', 'document.createElement()', 'document.create()', 'document.make()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method removes an element from the DOM?',
                        type: 'multiple-choice',
                        options: ['delete()', 'remove()', 'destroy()', 'erase()'],
                        answer: 1
                    }
                ]
            },
            // ============ EVENT HANDLING ============
            {
                id: 'js-47',
                title: 'Event Handling',
                description: 'Respond to user actions',
                stage: 4,
                content: `
# Event Handling

React to user interactions!

## Adding Event Listeners:
\`\`\`javascript
const button = document.querySelector("#btn")

button.addEventListener("click", function(event) {
    console.log("Clicked!")
    console.log(event.target)  // The clicked element
})

// Arrow function
button.addEventListener("click", (e) => {
    console.log("Clicked!")
})

// Remove listener
const handler = () => console.log("Click")
button.addEventListener("click", handler)
button.removeEventListener("click", handler)
\`\`\`

## Common Events:
\`\`\`javascript
// Mouse
element.addEventListener("click", handler)
element.addEventListener("dblclick", handler)
element.addEventListener("mouseenter", handler)
element.addEventListener("mouseleave", handler)

// Keyboard
document.addEventListener("keydown", (e) => {
    console.log(e.key)  // "Enter", "Escape", etc.
})

// Form
input.addEventListener("input", handler)    // Every change
input.addEventListener("change", handler)   // On blur
form.addEventListener("submit", handler)
\`\`\`

## Event Object:
\`\`\`javascript
element.addEventListener("click", (e) => {
    e.preventDefault()   // Stop default action
    e.stopPropagation()  // Stop bubbling
    e.target            // Element that triggered event
    e.currentTarget     // Element with listener
})
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method prevents the default action of an event?',
                        type: 'multiple-choice',
                        options: ['stopPropagation()', 'preventDefault()', 'stopDefault()', 'cancel()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method adds an event listener?',
                        type: 'multiple-choice',
                        options: ['onEvent()', 'addEventListener()', 'addEvent()', 'listen()'],
                        answer: 1
                    },
                    {
                        prompt: 'What property gives the element that triggered an event?',
                        type: 'multiple-choice',
                        options: ['event.source', 'event.element', 'event.target', 'event.trigger'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'js-48',
                title: 'Event Delegation',
                description: 'Efficient event handling patterns',
                stage: 4,
                content: `
# Event Delegation

Handle many elements with one listener!

## The Problem:
\`\`\`javascript
// Inefficient - listener on each item
const items = document.querySelectorAll(".item")
items.forEach(item => {
    item.addEventListener("click", handler)
})
// What about dynamically added items?
\`\`\`

## The Solution:
\`\`\`javascript
// One listener on parent
const list = document.querySelector("#list")

list.addEventListener("click", (e) => {
    if (e.target.matches(".item")) {
        console.log("Clicked:", e.target.textContent)
    }
})

// Works for dynamically added items too!
\`\`\`

## Practical Example:
\`\`\`javascript
const todoList = document.querySelector("#todos")

todoList.addEventListener("click", (e) => {
    // Handle delete buttons
    if (e.target.matches(".delete-btn")) {
        e.target.closest(".todo-item").remove()
    }
    
    // Handle checkboxes
    if (e.target.matches(".complete-checkbox")) {
        e.target.closest(".todo-item").classList.toggle("completed")
    }
})
\`\`\`

## Benefits:
- Fewer event listeners (better memory)
- Works with dynamic content
- Cleaner code organization
        `,
                exercises: [
                    {
                        prompt: 'What is event delegation?',
                        type: 'multiple-choice',
                        options: ['Adding many listeners', 'One listener on parent', 'Removing listeners', 'Async events'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the main benefit of event delegation?',
                        type: 'multiple-choice',
                        options: ['Faster animations', 'Works with dynamic content', 'Smaller file size', 'Better colors'],
                        answer: 1
                    },
                    {
                        prompt: 'What method checks if an element matches a selector?',
                        type: 'multiple-choice',
                        options: ['equals()', 'matches()', 'is()', 'selector()'],
                        answer: 1
                    }
                ]
            },
            // ============ FETCH API ============
            {
                id: 'js-49',
                title: 'Fetch API',
                description: 'Make HTTP requests',
                stage: 4,
                content: `
# Fetch API

Make network requests!

## GET Request:
\`\`\`javascript
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error))

// Async/await version
async function getData() {
    try {
        const response = await fetch('https://api.example.com/data')
        const data = await response.json()
        return data
    } catch (error) {
        console.error(error)
    }
}
\`\`\`

## POST Request:
\`\`\`javascript
async function createUser(user) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    return response.json()
}

createUser({ name: 'Alice', email: 'alice@example.com' })
\`\`\`

## Other Methods:
\`\`\`javascript
// PUT
fetch(url, { method: 'PUT', body: JSON.stringify(data) })

// DELETE
fetch(url, { method: 'DELETE' })

// With headers
fetch(url, {
    headers: {
        'Authorization': 'Bearer token123',
        'Content-Type': 'application/json'
    }
})
\`\`\`

## Check Response:
\`\`\`javascript
const response = await fetch(url)
if (!response.ok) {
    throw new Error(\`HTTP \${response.status}\`)
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method converts a fetch response to JSON?',
                        type: 'multiple-choice',
                        options: ['.json()', '.parse()', '.toJSON()', '.data()'],
                        answer: 0
                    },
                    {
                        prompt: 'What is the default HTTP method for fetch?',
                        type: 'multiple-choice',
                        options: ['POST', 'GET', 'PUT', 'DELETE'],
                        answer: 1
                    },
                    {
                        prompt: 'What property checks if a fetch was successful?',
                        type: 'multiple-choice',
                        options: ['response.success', 'response.ok', 'response.valid', 'response.good'],
                        answer: 1
                    }
                ]
            },
            // ============ FINAL PROJECT ============
            {
                id: 'js-50',
                title: 'Complete JavaScript Mastery',
                description: 'Build a complete application',
                stage: 4,
                content: `
# JavaScript Mastery Project

You've mastered JavaScript! Here's a complete example:

## Todo App:
\`\`\`javascript
class TodoApp {
    constructor() {
        this.todos = this.load()
        this.render()
        this.bindEvents()
    }

    load() {
        return JSON.parse(localStorage.getItem('todos')) || []
    }

    save() {
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    add(text) {
        this.todos.push({
            id: Date.now(),
            text,
            completed: false
        })
        this.save()
        this.render()
    }

    toggle(id) {
        const todo = this.todos.find(t => t.id === id)
        if (todo) todo.completed = !todo.completed
        this.save()
        this.render()
    }

    delete(id) {
        this.todos = this.todos.filter(t => t.id !== id)
        this.save()
        this.render()
    }

    render() {
        const list = document.querySelector('#todo-list')
        list.innerHTML = this.todos.map(todo => \`
            <li class="\${todo.completed ? 'completed' : ''}">
                <span>\${todo.text}</span>
                <button data-toggle="\${todo.id}">✓</button>
                <button data-delete="\${todo.id}">×</button>
            </li>
        \`).join('')
    }

    bindEvents() {
        document.querySelector('#todo-list').addEventListener('click', e => {
            const toggleId = e.target.dataset.toggle
            const deleteId = e.target.dataset.delete
            if (toggleId) this.toggle(+toggleId)
            if (deleteId) this.delete(+deleteId)
        })
    }
}

const app = new TodoApp()
\`\`\`

Congratulations! You've mastered JavaScript! 🎉
        `,
                exercises: [
                    {
                        prompt: 'What method adds an item to the end of an array?',
                        type: 'multiple-choice',
                        options: ['add()', 'append()', 'push()', 'insert()'],
                        answer: 2
                    },
                    {
                        prompt: 'What method removes items that don\'t match a condition?',
                        type: 'multiple-choice',
                        options: ['remove()', 'filter()', 'delete()', 'exclude()'],
                        answer: 1
                    },
                    {
                        prompt: 'What method finds one item in an array?',
                        type: 'multiple-choice',
                        options: ['search()', 'locate()', 'find()', 'get()'],
                        answer: 2
                    }
                ]
            }
        ]
    },

    // HTML Course - Natural Language → Real HTML Progression
    'html': {
        id: 'html',
        name: 'HTML',
        description: 'Learn HTML, the structure of every web page. From natural language to real tags.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '📄',
        color: '#e34c26',
        language: 'html',
        prerequisites: [],
        estimatedHours: 8,
        lessons: [
            // ============ STAGE 1: Pure Natural Language ============
            {
                id: 'html-1',
                title: 'Your First Web Page',
                description: 'Understanding what HTML does',
                stage: 1,
                content: `
# Your First Web Page

HTML creates the structure of web pages - like the skeleton of a building!

## What HTML Does:
- Defines headings
- Creates paragraphs
- Adds images
- Makes links
- Organizes content

## Think of It Like:
\`\`\`
heading level 1: "Welcome to My Site!"
paragraph: "This is my first web page."
paragraph: "HTML is amazing!"
\`\`\`

This tells the browser WHAT to display, not HOW it looks (that's CSS!).
        `,
                exercises: [
                    {
                        prompt: 'What does HTML define for a web page?',
                        type: 'multiple-choice',
                        options: ['Colors and fonts', 'Structure and content', 'Animations', 'Server data'],
                        answer: 1
                    },
                    {
                        prompt: 'HTML stands for?',
                        type: 'multiple-choice',
                        options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlinks and Text Markup Language'],
                        answer: 0
                    },
                    {
                        prompt: 'What language is used to style HTML pages?',
                        type: 'multiple-choice',
                        options: ['JavaScript', 'Python', 'CSS', 'Java'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'html-2',
                title: 'Headings',
                description: 'Creating titles and subtitles',
                stage: 1,
                content: `
# Headings

Headings are titles of different sizes!

## Natural Language:
\`\`\`
heading level 1 "Main Title"
heading level 2 "Subtitle"
heading level 3 "Section Title"
\`\`\`

## Heading Levels:
- Level 1: Biggest (main page title)
- Level 2: Big (section titles)
- Level 3: Medium (subsections)
- Level 4: Small
- Level 5: Smaller
- Level 6: Smallest

## Example Page:
\`\`\`
heading level 1 "My Blog"
heading level 2 "Today's Post"
heading level 3 "Introduction"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What heading level should be used for the main page title?',
                        type: 'multiple-choice',
                        options: ['Level 6', 'Level 3', 'Level 1', 'Level 2'],
                        answer: 2
                    },
                    {
                        prompt: 'How many heading levels are there in HTML?',
                        type: 'multiple-choice',
                        options: ['3', '4', '6', '10'],
                        answer: 2
                    },
                    {
                        prompt: 'Which heading is the smallest?',
                        type: 'multiple-choice',
                        options: ['Level 1', 'Level 3', 'Level 6', 'Level 2'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'html-3',
                title: 'Paragraphs',
                description: 'Adding text content',
                stage: 1,
                content: `
# Paragraphs

Paragraphs hold your main text content!

## Natural Language:
\`\`\`
paragraph "This is a paragraph of text."
paragraph "This is another paragraph."
\`\`\`

## Multiple Paragraphs:
\`\`\`
heading level 1 "About Me"
paragraph "Hello! I'm learning HTML."
paragraph "This is fun and exciting!"
paragraph "I can't wait to build websites."
\`\`\`

Each paragraph automatically gets space below it.
        `,
                exercises: [
                    {
                        prompt: 'How do you create a paragraph in natural language?',
                        type: 'multiple-choice',
                        options: ['text "Hello"', 'paragraph "Hello"', 'write "Hello"', 'content "Hello"'],
                        answer: 1
                    },
                    {
                        prompt: 'What gets added automatically below each paragraph?',
                        type: 'multiple-choice',
                        options: ['A line', 'Space', 'A border', 'Nothing'],
                        answer: 1
                    },
                    {
                        prompt: 'Can a page have multiple paragraphs?',
                        type: 'multiple-choice',
                        options: ['No, only one', 'Yes, as many as needed', 'Only three', 'Only if using CSS'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-4',
                title: 'Links',
                description: 'Connecting pages together',
                stage: 1,
                content: `
# Links

Links let users click to go somewhere else!

## Natural Language:
\`\`\`
link to "https://google.com" with text "Go to Google"
link to "about.html" with text "About Us"
\`\`\`

## Parts of a Link:
1. **Where to go**: The URL or page name
2. **What to show**: The clickable text

## Example:
\`\`\`
heading level 1 "Resources"
paragraph "Check out these sites:"
link to "https://github.com" with text "GitHub"
link to "https://mdn.mozilla.org" with text "MDN Web Docs"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What two parts does a link need?',
                        type: 'multiple-choice',
                        options: ['Color and size', 'URL and display text', 'Font and style', 'Name and ID'],
                        answer: 1
                    },
                    {
                        prompt: 'What can a link point to?',
                        type: 'multiple-choice',
                        options: ['Only external websites', 'Only images', 'Both external sites and local pages', 'Only email addresses'],
                        answer: 2
                    },
                    {
                        prompt: 'What happens when you click a link?',
                        type: 'multiple-choice',
                        options: ['It downloads a file', 'It navigates to the URL', 'It changes colors', 'It refreshes the page'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-5',
                title: 'Images',
                description: 'Adding pictures to pages',
                stage: 1,
                content: `
# Images

Images make your pages visual!

## Natural Language:
\`\`\`
image from "photo.jpg" with description "A beautiful sunset"
image from "logo.png" with description "Company Logo"
\`\`\`

## Parts of an Image:
1. **Source**: Where the image file is
2. **Description**: What the image shows (for accessibility!)

## Why Descriptions Matter:
- Screen readers read them aloud
- Shown if image doesn't load
- Helps search engines understand

## Example:
\`\`\`
heading level 1 "My Photos"
image from "beach.jpg" with description "Sandy beach at sunset"
paragraph "I took this last summer!"
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Why do images need descriptions?',
                        type: 'multiple-choice',
                        options: ['For decoration', 'For accessibility and SEO', 'To make them load faster', 'To change their color'],
                        answer: 1
                    },
                    {
                        prompt: 'What is shown if an image doesn\'t load?',
                        type: 'multiple-choice',
                        options: ['Nothing', 'The description text', 'A blank space', 'An error message'],
                        answer: 1
                    },
                    {
                        prompt: 'What reads image descriptions aloud for visually impaired users?',
                        type: 'multiple-choice',
                        options: ['Search engines', 'Screen readers', 'Browsers', 'CSS'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-6',
                title: 'Lists',
                description: 'Organizing items in order',
                stage: 1,
                content: `
# Lists

Lists organize multiple items!

## Bulleted List (Unordered):
\`\`\`
bulleted list
    item "Apples"
    item "Bananas"
    item "Oranges"
end list
\`\`\`

Result:
• Apples
• Bananas
• Oranges

## Numbered List (Ordered):
\`\`\`
numbered list
    item "First step"
    item "Second step"
    item "Third step"
end list
\`\`\`

Result:
1. First step
2. Second step
3. Third step

## When to Use Each:
- **Bulleted**: Order doesn't matter (ingredients, features)
- **Numbered**: Order matters (steps, rankings)
        `,
                exercises: [
                    {
                        prompt: 'When should you use a numbered list?',
                        type: 'multiple-choice',
                        options: ['For random items', 'When order matters', 'For short text', 'For images'],
                        answer: 1
                    },
                    {
                        prompt: 'What type of list uses bullet points?',
                        type: 'multiple-choice',
                        options: ['Numbered list', 'Bulleted list', 'Definition list', 'Menu list'],
                        answer: 1
                    },
                    {
                        prompt: 'A recipe with steps 1, 2, 3 should use what type of list?',
                        type: 'multiple-choice',
                        options: ['Bulleted list', 'Numbered list', 'Image list', 'Link list'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 2: Introducing Symbols ============
            {
                id: 'html-7',
                title: 'Introducing Tags',
                description: 'The < and > symbols',
                stage: 2,
                content: `
# HTML Tags

Real HTML uses angle brackets!

## The Concept:
| Natural | HTML-ish |
|---------|----------|
| heading level 1 "Hello" | <h1> Hello </h1> |
| paragraph "Text" | <p> Text </p> |

## Opening and Closing:
- \`<tag>\` = Opening tag (start)
- \`</tag>\` = Closing tag (end)

## Examples:
\`\`\`
<h1>This is a heading</h1>
<p>This is a paragraph</p>
\`\`\`

## Why Tags?
Browsers need a standard format to understand!
        `,
                exercises: [
                    {
                        prompt: 'What symbols wrap HTML tags?',
                        type: 'multiple-choice',
                        options: ['{ }', '( )', '< >', '[ ]'],
                        answer: 2
                    },
                    {
                        prompt: 'What is the difference between <tag> and </tag>?',
                        type: 'multiple-choice',
                        options: ['Size', 'Opening vs closing tag', 'Color', 'Speed'],
                        answer: 1
                    },
                    {
                        prompt: 'What character indicates a closing tag?',
                        type: 'multiple-choice',
                        options: ['*', '/', '-', '+'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-8',
                title: 'Common Tag Names',
                description: 'Learning tag abbreviations',
                stage: 2,
                content: `
# Common Tag Names

Tags are abbreviations!

## Translations:
| Natural | Tag | Meaning |
|---------|-----|---------|
| heading level 1 | h1 | Heading 1 |
| heading level 2 | h2 | Heading 2 |
| paragraph | p | Paragraph |
| link | a | Anchor |
| image | img | Image |
| bulleted list | ul | Unordered List |
| numbered list | ol | Ordered List |
| item | li | List Item |

## Examples:
\`\`\`
<h1>Welcome</h1>
<p>This is text.</p>
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What tag is used for paragraphs?',
                        type: 'multiple-choice',
                        options: ['<paragraph>', '<text>', '<p>', '<pg>'],
                        answer: 2
                    },
                    {
                        prompt: 'What does "ul" stand for?',
                        type: 'multiple-choice',
                        options: ['Upper List', 'Unordered List', 'Underlined List', 'Universal List'],
                        answer: 1
                    },
                    {
                        prompt: 'What tag is used for list items?',
                        type: 'multiple-choice',
                        options: ['<item>', '<li>', '<list>', '<it>'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-9',
                title: 'Attributes',
                description: 'Adding extra information to tags',
                stage: 2,
                content: `
# Attributes

Attributes add information to tags!

## Link Example:
Natural: link to "google.com" with text "Click"
HTML: \`<a href="google.com">Click</a>\`

## Image Example:
Natural: image from "cat.jpg" with description "A cat"
HTML: \`<img src="cat.jpg" alt="A cat">\`

## Format:
\`\`\`
<tag attribute="value">content</tag>
\`\`\`

## Common Attributes:
- \`href\` = link destination
- \`src\` = image source
- \`alt\` = alternative text
- \`id\` = unique identifier
- \`class\` = styling group
        `,
                exercises: [
                    {
                        prompt: 'What attribute holds a link\'s destination?',
                        type: 'multiple-choice',
                        options: ['src', 'href', 'link', 'url'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute holds an image\'s source file?',
                        type: 'multiple-choice',
                        options: ['href', 'source', 'src', 'img'],
                        answer: 2
                    },
                    {
                        prompt: 'What does the "alt" attribute provide?',
                        type: 'multiple-choice',
                        options: ['Alternative link', 'Alternative text description', 'Alternative color', 'Alternative size'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 3: Code-Like Structure ============
            {
                id: 'html-10',
                title: 'Real HTML Headings',
                description: 'Writing actual heading tags',
                stage: 3,
                content: `
# Real HTML Headings

Let's write real HTML!

## Heading Tags:
\`\`\`html
<h1>Main Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>
<h4>Smaller Heading</h4>
<h5>Even Smaller</h5>
<h6>Smallest Heading</h6>
\`\`\`

## Complete Example:
\`\`\`html
<h1>My Recipe Blog</h1>
<h2>Chocolate Cake</h2>
<h3>Ingredients</h3>
<p>Here are the ingredients...</p>
<h3>Instructions</h3>
<p>Follow these steps...</p>
\`\`\`

Notice how the structure creates an outline!
        `,
                exercises: [
                    {
                        prompt: 'Write an h1 tag with "Hello World"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<h1>Hello World</h1>',
                        hint: 'Use: <h1>Hello World</h1>'
                    },
                    {
                        prompt: 'Write an h2 tag with "About Me"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<h2>About Me</h2>',
                        hint: 'Use: <h2>About Me</h2>'
                    },
                    {
                        prompt: 'Write an h3 tag with "Contact"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<h3>Contact</h3>',
                        hint: 'Use: <h3>Contact</h3>'
                    }
                ]
            },
            {
                id: 'html-11',
                title: 'Paragraphs and Links',
                description: 'Real p and a tags',
                stage: 3,
                content: `
# Paragraphs and Links

## Paragraph Tag:
\`\`\`html
<p>This is a paragraph of text.</p>
<p>Each paragraph is a separate block.</p>
\`\`\`

## Link Tag:
\`\`\`html
<a href="https://google.com">Go to Google</a>
<a href="contact.html">Contact Us</a>
\`\`\`

## Links in Paragraphs:
\`\`\`html
<p>Learn more on <a href="https://mdn.mozilla.org">MDN</a>.</p>
\`\`\`

## Open in New Tab:
\`\`\`html
<a href="https://github.com" target="_blank">GitHub</a>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write a link to "https://example.com" with text "Example"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<a href="https://example.com">Example</a>',
                        hint: 'Use: <a href="url">text</a>'
                    },
                    {
                        prompt: 'Write a p tag with "Hello there"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<p>Hello there</p>',
                        hint: 'Use: <p>text</p>'
                    },
                    {
                        prompt: 'What attribute opens a link in a new tab?',
                        type: 'multiple-choice',
                        options: ['new="tab"', 'target="_blank"', 'open="new"', 'tab="true"'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-12',
                title: 'Images',
                description: 'Real img tags',
                stage: 3,
                content: `
# Image Tags

Images are self-closing (no end tag needed)!

## Basic Image:
\`\`\`html
<img src="photo.jpg" alt="A photo">
\`\`\`

## With Size:
\`\`\`html
<img src="logo.png" alt="Logo" width="200" height="100">
\`\`\`

## Image from URL:
\`\`\`html
<img src="https://example.com/image.jpg" alt="Remote image">
\`\`\`

## In Context:
\`\`\`html
<h1>My Gallery</h1>
<p>Here are my favorite photos:</p>
<img src="beach.jpg" alt="Beach sunset">
<img src="mountain.jpg" alt="Mountain view">
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write an img tag for "cat.png" with alt "Cute cat"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<img src="cat.png" alt="Cute cat">',
                        hint: 'Use: <img src="file" alt="description">'
                    },
                    {
                        prompt: 'Does the img tag need a closing tag?',
                        type: 'multiple-choice',
                        options: ['Yes, always', 'No, it is self-closing', 'Only for PNGs', 'Only with alt text'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute sets an image\'s width?',
                        type: 'multiple-choice',
                        options: ['size', 'width', 'w', 'pixels'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-13',
                title: 'Lists',
                description: 'Real ul, ol, and li tags',
                stage: 3,
                content: `
# List Tags

## Unordered (Bulleted):
\`\`\`html
<ul>
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
</ul>
\`\`\`

## Ordered (Numbered):
\`\`\`html
<ol>
    <li>Mix ingredients</li>
    <li>Pour into pan</li>
    <li>Bake for 30 minutes</li>
</ol>
\`\`\`

## Nested Lists:
\`\`\`html
<ul>
    <li>Fruits
        <ul>
            <li>Apple</li>
            <li>Banana</li>
        </ul>
    </li>
    <li>Vegetables</li>
</ul>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write ul with two li items: "Red" and "Blue"',
                        type: 'code',
                        language: 'html',
                        expectedOutput: '<ul><li>Red</li><li>Blue</li></ul>',
                        hint: 'Use: <ul><li>item</li></ul>'
                    },
                    {
                        prompt: 'What tag creates a numbered list?',
                        type: 'multiple-choice',
                        options: ['<ul>', '<nl>', '<ol>', '<numbered>'],
                        answer: 2
                    },
                    {
                        prompt: 'Can lists be nested inside other lists?',
                        type: 'multiple-choice',
                        options: ['No, never', 'Yes, any level deep', 'Only once', 'Only ul inside ol'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 4: Full HTML ============
            {
                id: 'html-14',
                title: 'Complete HTML Document',
                description: 'DOCTYPE, html, head, body',
                stage: 4,
                content: `
# Full HTML Document Structure

Every HTML page needs this structure!

## The Template:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my page.</p>
</body>
</html>
\`\`\`

## Parts Explained:
- \`<!DOCTYPE html>\` - Tells browser it's HTML5
- \`<html>\` - Root element
- \`<head>\` - Metadata (not visible)
- \`<title>\` - Browser tab text
- \`<body>\` - Visible content
        `,
                exercises: [
                    {
                        prompt: 'What tag contains the visible content?',
                        type: 'multiple-choice',
                        options: ['<head>', '<html>', '<body>', '<title>'],
                        answer: 2
                    },
                    {
                        prompt: 'What goes in the <title> tag?',
                        type: 'multiple-choice',
                        options: ['Page heading', 'Browser tab text', 'Navigation', 'Footer'],
                        answer: 1
                    },
                    {
                        prompt: 'What does <!DOCTYPE html> tell the browser?',
                        type: 'multiple-choice',
                        options: ['The author name', 'It is HTML5', 'The page title', 'The encoding'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-15',
                title: 'Semantic HTML',
                description: 'Meaningful tags for structure',
                stage: 4,
                content: `
# Semantic HTML

Use tags that describe their purpose!

## Layout Tags:
\`\`\`html
<header>Site header/logo</header>
<nav>Navigation links</nav>
<main>Main content</main>
<article>Blog post or article</article>
<section>Grouped content</section>
<aside>Sidebar content</aside>
<footer>Site footer</footer>
\`\`\`

## Example Page:
\`\`\`html
<body>
    <header>
        <h1>My Blog</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <article>
            <h2>Post Title</h2>
            <p>Post content...</p>
        </article>
    </main>
    <footer>
        <p>© 2025 My Blog</p>
    </footer>
</body>
\`\`\`

## Why Semantic HTML?
- Better accessibility
- Better SEO
- Easier to maintain
        `,
                exercises: [
                    {
                        prompt: 'Which tag should contain navigation links?',
                        type: 'multiple-choice',
                        options: ['<div>', '<nav>', '<menu>', '<links>'],
                        answer: 1
                    },
                    {
                        prompt: 'What tag represents the main content of a page?',
                        type: 'multiple-choice',
                        options: ['<content>', '<main>', '<body>', '<article>'],
                        answer: 1
                    },
                    {
                        prompt: 'What tag is used for a site footer?',
                        type: 'multiple-choice',
                        options: ['<bottom>', '<footer>', '<end>', '<foot>'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-16',
                title: 'Forms',
                description: 'Getting user input',
                stage: 4,
                content: `
# HTML Forms

Forms collect user input!

## Basic Form:
\`\`\`html
<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email">
    
    <button type="submit">Submit</button>
</form>
\`\`\`

## Input Types:
- \`text\` - Regular text
- \`email\` - Email address
- \`password\` - Hidden text
- \`number\` - Numbers only
- \`checkbox\` - Yes/No
- \`radio\` - One of many
- \`submit\` - Submit button

## Textarea:
\`\`\`html
<textarea name="message" rows="4">
</textarea>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What input type hides the text?',
                        type: 'multiple-choice',
                        options: ['hidden', 'secret', 'password', 'private'],
                        answer: 2
                    },
                    {
                        prompt: 'What tag creates a multi-line text input?',
                        type: 'multiple-choice',
                        options: ['<input type="multiline">', '<textarea>', '<textbox>', '<multiline>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute links a label to an input?',
                        type: 'multiple-choice',
                        options: ['link', 'for', 'connect', 'target'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-17',
                title: 'Complete HTML Page',
                description: 'Putting it all together',
                stage: 4,
                content: `
# Complete HTML Page

You can now build full web pages!

## Example: Portfolio Page
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jane Doe - Developer</title>
</head>
<body>
    <header>
        <h1>Jane Doe</h1>
        <nav>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>About Me</h2>
            <p>I'm a web developer who loves creating things!</p>
        </section>
        
        <section id="projects">
            <h2>Projects</h2>
            <ul>
                <li>Portfolio Website</li>
                <li>Todo App</li>
                <li>Weather Dashboard</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>© 2025 Jane Doe</p>
    </footer>
</body>
</html>
\`\`\`

Keep building and practicing! 🎉
        `,
                exercises: [
                    {
                        prompt: 'What are the three main parts of an HTML document?',
                        type: 'multiple-choice',
                        options: ['header, main, footer', 'DOCTYPE, head, body', 'html, css, js', 'top, middle, bottom'],
                        answer: 1
                    },
                    {
                        prompt: 'What tag wraps around the entire HTML document?',
                        type: 'multiple-choice',
                        options: ['<body>', '<html>', '<document>', '<page>'],
                        answer: 1
                    },
                    {
                        prompt: 'Where does the <title> tag go?',
                        type: 'multiple-choice',
                        options: ['In <body>', 'In <head>', 'In <footer>', 'After </html>'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Tables ============
            {
                id: 'html-18',
                title: 'HTML Tables',
                description: 'Display tabular data',
                stage: 4,
                content: `
# HTML Tables

Display data in rows and columns!

## Basic Table Structure:
\`\`\`html
<table>
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Alice</td>
            <td>25</td>
            <td>NYC</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>30</td>
            <td>LA</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Total: 2 users</td>
        </tr>
    </tfoot>
</table>
\`\`\`

## Table Elements:
- \`<table>\` - Container
- \`<thead>\` - Header section
- \`<tbody>\` - Body section
- \`<tfoot>\` - Footer section
- \`<tr>\` - Table row
- \`<th>\` - Header cell
- \`<td>\` - Data cell

## Spanning Cells:
\`\`\`html
<!-- Span 2 columns -->
<td colspan="2">Merged Cell</td>

<!-- Span 3 rows -->
<td rowspan="3">Tall Cell</td>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What element creates a table header cell?',
                        type: 'multiple-choice',
                        options: ['<td>', '<th>', '<thead>', '<tr>'],
                        answer: 1
                    },
                    {
                        prompt: 'What element creates a table row?',
                        type: 'multiple-choice',
                        options: ['<row>', '<tr>', '<line>', '<trow>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute merges columns?',
                        type: 'multiple-choice',
                        options: ['merge', 'colspan', 'span', 'combine'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-19',
                title: 'Advanced Tables',
                description: 'Table captions, scope, and accessibility',
                stage: 4,
                content: `
# Advanced Tables

Make tables accessible and meaningful!

## Table Caption:
\`\`\`html
<table>
    <caption>Monthly Sales Report</caption>
    <thead>
        <tr>
            <th>Month</th>
            <th>Revenue</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>January</td>
            <td>$10,000</td>
        </tr>
    </tbody>
</table>
\`\`\`

## Scope Attribute:
\`\`\`html
<table>
    <tr>
        <th scope="col">Name</th>
        <th scope="col">Score</th>
    </tr>
    <tr>
        <th scope="row">Alice</th>
        <td>95</td>
    </tr>
    <tr>
        <th scope="row">Bob</th>
        <td>88</td>
    </tr>
</table>
\`\`\`

## Colgroup:
\`\`\`html
<table>
    <colgroup>
        <col style="background-color: #f0f0f0">
        <col span="2" style="background-color: #e0e0e0">
    </colgroup>
    <tr>
        <td>Col 1</td>
        <td>Col 2</td>
        <td>Col 3</td>
    </tr>
</table>
\`\`\`

## Scope Values:
- \`col\` - Header for column
- \`row\` - Header for row
- \`colgroup\` - Header for column group
- \`rowgroup\` - Header for row group
        `,
                exercises: [
                    {
                        prompt: 'What attribute identifies a header cell\'s scope?',
                        type: 'multiple-choice',
                        options: ['for', 'scope', 'role', 'type'],
                        answer: 1
                    },
                    {
                        prompt: 'What element adds a caption to a table?',
                        type: 'multiple-choice',
                        options: ['<title>', '<caption>', '<header>', '<label>'],
                        answer: 1
                    },
                    {
                        prompt: 'Where should <caption> appear in a table?',
                        type: 'multiple-choice',
                        options: ['After </table>', 'First child of <table>', 'Inside <thead>', 'Inside <tfoot>'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Forms Deep Dive ============
            {
                id: 'html-20',
                title: 'Advanced Form Inputs',
                description: 'Special input types for better UX',
                stage: 4,
                content: `
# Advanced Form Inputs

Modern input types with built-in validation!

## Date and Time Inputs:
\`\`\`html
<input type="date" name="birthday">
<input type="time" name="appointment">
<input type="datetime-local" name="meeting">
<input type="month" name="expiry">
<input type="week" name="period">
\`\`\`

## Number Inputs:
\`\`\`html
<input type="number" min="0" max="100" step="5">
<input type="range" min="0" max="100" value="50">
\`\`\`

## Contact Inputs:
\`\`\`html
<input type="email" required>
<input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">
<input type="url" placeholder="https://example.com">
\`\`\`

## Color and File:
\`\`\`html
<input type="color" value="#ff0000">
<input type="file" accept=".pdf,.doc">
<input type="file" accept="image/*" multiple>
\`\`\`

## Search:
\`\`\`html
<input type="search" name="query" placeholder="Search...">
\`\`\`

## Hidden:
\`\`\`html
<input type="hidden" name="csrf_token" value="abc123">
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What input type provides a date picker?',
                        type: 'multiple-choice',
                        options: ['calendar', 'date', 'datetime', 'picker'],
                        answer: 1
                    },
                    {
                        prompt: 'What input type shows a color picker?',
                        type: 'multiple-choice',
                        options: ['color', 'picker', 'hex', 'rgb'],
                        answer: 0
                    },
                    {
                        prompt: 'What input type allows file uploads?',
                        type: 'multiple-choice',
                        options: ['upload', 'file', 'document', 'attach'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-21',
                title: 'Form Validation',
                description: 'Built-in HTML validation',
                stage: 4,
                content: `
# HTML Form Validation

Validate input without JavaScript!

## Required Fields:
\`\`\`html
<input type="text" required>
<textarea required></textarea>
<select required>
    <option value="">Select...</option>
    <option value="a">Option A</option>
</select>
\`\`\`

## Pattern Validation:
\`\`\`html
<!-- ZIP code -->
<input type="text" pattern="[0-9]{5}" title="5-digit ZIP code">

<!-- Username (letters and numbers) -->
<input type="text" pattern="[A-Za-z0-9]{3,16}" 
       title="3-16 alphanumeric characters">
\`\`\`

## Length Constraints:
\`\`\`html
<input type="text" minlength="3" maxlength="20">
<textarea minlength="10" maxlength="500"></textarea>
\`\`\`

## Number Constraints:
\`\`\`html
<input type="number" min="1" max="100">
<input type="number" step="0.01">
\`\`\`

## Custom Error Messages:
\`\`\`html
<input type="email" 
       required 
       oninvalid="this.setCustomValidity('Please enter a valid email')"
       oninput="this.setCustomValidity('')">
\`\`\`

## Disable Validation:
\`\`\`html
<form novalidate>
    <!-- Skip browser validation -->
</form>

<button formnovalidate>Save Draft</button>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What attribute makes a field mandatory?',
                        type: 'multiple-choice',
                        options: ['mandatory', 'required', 'needed', 'must'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute defines a regex pattern for validation?',
                        type: 'multiple-choice',
                        options: ['regex', 'pattern', 'validate', 'match'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute sets maximum text length?',
                        type: 'multiple-choice',
                        options: ['max', 'maxlength', 'limit', 'length'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-22',
                title: 'Datalist and Autocomplete',
                description: 'Suggestions and autocomplete for inputs',
                stage: 4,
                content: `
# Datalist and Autocomplete

Provide suggestions for form inputs!

## Datalist:
\`\`\`html
<label for="browser">Choose a browser:</label>
<input list="browsers" id="browser" name="browser">

<datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
    <option value="Safari">
    <option value="Edge">
    <option value="Opera">
</datalist>
\`\`\`

Users can type OR select from suggestions!

## With Labels:
\`\`\`html
<input list="countries" name="country">

<datalist id="countries">
    <option value="US">United States</option>
    <option value="UK">United Kingdom</option>
    <option value="CA">Canada</option>
</datalist>
\`\`\`

## Autocomplete Attribute:
\`\`\`html
<form autocomplete="on">
    <input type="text" name="fname" autocomplete="given-name">
    <input type="text" name="lname" autocomplete="family-name">
    <input type="email" autocomplete="email">
    <input type="tel" autocomplete="tel">
    <input type="text" autocomplete="street-address">
    <input type="text" autocomplete="postal-code">
    <input type="text" autocomplete="cc-number">
</form>
\`\`\`

## Common Autocomplete Values:
- \`name\`, \`given-name\`, \`family-name\`
- \`email\`, \`tel\`
- \`street-address\`, \`city\`, \`postal-code\`
- \`cc-name\`, \`cc-number\`, \`cc-exp\`
- \`username\`, \`new-password\`, \`current-password\`
        `,
                exercises: [
                    {
                        prompt: 'What element provides suggestion options for an input?',
                        type: 'multiple-choice',
                        options: ['<select>', '<datalist>', '<options>', '<suggest>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute links an input to a datalist?',
                        type: 'multiple-choice',
                        options: ['datalist', 'list', 'options', 'suggestions'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute enables browser autofill?',
                        type: 'multiple-choice',
                        options: ['autofill', 'autocomplete', 'complete', 'prefill'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Semantic Elements ============
            {
                id: 'html-23',
                title: 'Semantic HTML Deep Dive',
                description: 'Using the right elements for meaning',
                stage: 4,
                content: `
# Semantic HTML

Use meaningful elements!

## Article vs Section:
\`\`\`html
<!-- Article: Self-contained, can stand alone -->
<article>
    <h2>Blog Post Title</h2>
    <p>This post could be read on its own...</p>
</article>

<!-- Section: Thematic grouping -->
<section>
    <h2>Features</h2>
    <p>Part of a larger page...</p>
</section>
\`\`\`

## Aside:
\`\`\`html
<main>
    <article>
        <p>Main content here...</p>
    </article>
    
    <aside>
        <h3>Related Links</h3>
        <ul>
            <li><a href="#">Related Post 1</a></li>
            <li><a href="#">Related Post 2</a></li>
        </ul>
    </aside>
</main>
\`\`\`

## Figure and Figcaption:
\`\`\`html
<figure>
    <img src="chart.png" alt="Sales growth chart">
    <figcaption>Figure 1: Sales grew 50% in Q4</figcaption>
</figure>
\`\`\`

## Address:
\`\`\`html
<address>
    Contact us at:<br>
    <a href="mailto:info@example.com">info@example.com</a><br>
    123 Main St, City, State
</address>
\`\`\`

## Time:
\`\`\`html
<time datetime="2025-01-15">January 15, 2025</time>
<time datetime="14:30">2:30 PM</time>
<time datetime="PT2H30M">2 hours 30 minutes</time>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What element represents standalone, reusable content?',
                        type: 'multiple-choice',
                        options: ['<section>', '<article>', '<aside>', '<div>'],
                        answer: 1
                    },
                    {
                        prompt: 'What element is used for image captions?',
                        type: 'multiple-choice',
                        options: ['<caption>', '<figcaption>', '<label>', '<desc>'],
                        answer: 1
                    },
                    {
                        prompt: 'What element marks up dates and times?',
                        type: 'multiple-choice',
                        options: ['<date>', '<time>', '<datetime>', '<when>'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-24',
                title: 'Details and Summary',
                description: 'Native expandable/collapsible content',
                stage: 4,
                content: `
# Details and Summary

Create accordions without JavaScript!

## Basic Usage:
\`\`\`html
<details>
    <summary>Click to expand</summary>
    <p>This content is hidden until you click!</p>
</details>
\`\`\`

## Open by Default:
\`\`\`html
<details open>
    <summary>Already Expanded</summary>
    <p>This starts visible.</p>
</details>
\`\`\`

## FAQ Example:
\`\`\`html
<section class="faq">
    <h2>Frequently Asked Questions</h2>
    
    <details>
        <summary>How do I reset my password?</summary>
        <p>Click "Forgot Password" on the login page...</p>
    </details>
    
    <details>
        <summary>What payment methods do you accept?</summary>
        <p>We accept Visa, Mastercard, and PayPal...</p>
    </details>
    
    <details>
        <summary>How long does shipping take?</summary>
        <p>Standard shipping takes 5-7 business days...</p>
    </details>
</section>
\`\`\`

## With Rich Content:
\`\`\`html
<details>
    <summary>View Code Example</summary>
    <pre><code>
function hello() {
    console.log("Hello!");
}
    </code></pre>
</details>
\`\`\`

## Styling:
\`\`\`css
details summary {
    cursor: pointer;
    font-weight: bold;
}

details[open] summary {
    color: blue;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What element creates a native toggle/accordion?',
                        type: 'multiple-choice',
                        options: ['<accordion>', '<toggle>', '<details>', '<expandable>'],
                        answer: 2
                    },
                    {
                        prompt: 'What element provides the clickable header in details?',
                        type: 'multiple-choice',
                        options: ['<header>', '<summary>', '<title>', '<label>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute makes details start expanded?',
                        type: 'multiple-choice',
                        options: ['expanded', 'open', 'show', 'visible'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-25',
                title: 'Dialog Element',
                description: 'Native modal dialogs',
                stage: 4,
                content: `
# Dialog Element

Create modals without libraries!

## Basic Dialog:
\`\`\`html
<dialog id="myDialog">
    <h2>Welcome!</h2>
    <p>This is a modal dialog.</p>
    <button onclick="this.closest('dialog').close()">Close</button>
</dialog>

<button onclick="document.getElementById('myDialog').showModal()">
    Open Dialog
</button>
\`\`\`

## Dialog Methods:
\`\`\`javascript
const dialog = document.getElementById('myDialog')

// Open as modal (with backdrop)
dialog.showModal()

// Open non-modal
dialog.show()

// Close dialog
dialog.close()

// Check if open
dialog.open  // true or false
\`\`\`

## Form in Dialog:
\`\`\`html
<dialog id="confirmDialog">
    <form method="dialog">
        <h2>Are you sure?</h2>
        <button value="cancel">Cancel</button>
        <button value="confirm">Confirm</button>
    </form>
</dialog>

<script>
dialog.addEventListener('close', () => {
    console.log(dialog.returnValue)  // "cancel" or "confirm"
})
</script>
\`\`\`

## Styling Dialog:
\`\`\`css
dialog {
    border: none;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

dialog::backdrop {
    background: rgba(0,0,0,0.5);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method opens a dialog as a modal?',
                        type: 'multiple-choice',
                        options: ['open()', 'show()', 'showModal()', 'display()'],
                        answer: 2
                    },
                    {
                        prompt: 'What pseudo-element styles a dialog\'s backdrop?',
                        type: 'multiple-choice',
                        options: ['::overlay', '::backdrop', '::background', '::shadow'],
                        answer: 1
                    },
                    {
                        prompt: 'What method closes a dialog?',
                        type: 'multiple-choice',
                        options: ['hide()', 'close()', 'dismiss()', 'exit()'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Media ============
            {
                id: 'html-26',
                title: 'Audio and Video',
                description: 'Embed media in web pages',
                stage: 4,
                content: `
# Audio and Video

Embed multimedia content!

## Audio Element:
\`\`\`html
<audio controls>
    <source src="song.mp3" type="audio/mpeg">
    <source src="song.ogg" type="audio/ogg">
    Your browser doesn't support audio.
</audio>
\`\`\`

## Audio Attributes:
\`\`\`html
<audio 
    controls
    autoplay
    loop
    muted
    preload="auto">
</audio>
\`\`\`

## Video Element:
\`\`\`html
<video controls width="640" height="360">
    <source src="movie.mp4" type="video/mp4">
    <source src="movie.webm" type="video/webm">
    Your browser doesn't support video.
</video>
\`\`\`

## Video Attributes:
\`\`\`html
<video 
    controls
    autoplay
    loop
    muted
    poster="thumbnail.jpg"
    width="800"
    height="450">
</video>
\`\`\`

## Video with Subtitles:
\`\`\`html
<video controls>
    <source src="movie.mp4" type="video/mp4">
    <track src="captions.vtt" kind="captions" srclang="en" label="English">
    <track src="subtitles-es.vtt" kind="subtitles" srclang="es" label="Español">
</video>
\`\`\`

## Track Kinds:
- \`captions\` - Dialog and sound effects
- \`subtitles\` - Translation
- \`descriptions\` - For accessibility
- \`chapters\` - Chapter navigation
        `,
                exercises: [
                    {
                        prompt: 'What attribute shows a thumbnail before video plays?',
                        type: 'multiple-choice',
                        options: ['thumbnail', 'poster', 'preview', 'image'],
                        answer: 1
                    },
                    {
                        prompt: 'What element adds subtitles to a video?',
                        type: 'multiple-choice',
                        options: ['<subtitle>', '<track>', '<caption>', '<text>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute makes a video play automatically?',
                        type: 'multiple-choice',
                        options: ['play', 'autoplay', 'autostart', 'start'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'html-27',
                title: 'Picture Element',
                description: 'Responsive images for different screens',
                stage: 4,
                content: `
# Picture Element

Serve different images for different situations!

## Basic Picture:
\`\`\`html
<picture>
    <source media="(min-width: 1200px)" srcset="large.jpg">
    <source media="(min-width: 768px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Description">
</picture>
\`\`\`

## Different Formats:
\`\`\`html
<picture>
    <source srcset="image.avif" type="image/avif">
    <source srcset="image.webp" type="image/webp">
    <img src="image.jpg" alt="Description">
</picture>
\`\`\`

## Art Direction:
\`\`\`html
<picture>
    <!-- Wide crop for desktop -->
    <source media="(min-width: 768px)" srcset="hero-wide.jpg">
    
    <!-- Tall crop for mobile -->
    <img src="hero-tall.jpg" alt="Hero image">
</picture>
\`\`\`

## Srcset with Sizes:
\`\`\`html
<img 
    srcset="small.jpg 300w,
            medium.jpg 600w,
            large.jpg 1200w"
    sizes="(max-width: 600px) 300px,
           (max-width: 1200px) 600px,
           1200px"
    src="medium.jpg"
    alt="Responsive image">
\`\`\`

## Benefits:
- Faster load on mobile (smaller images)
- Better quality on high-DPI screens
- Modern format support with fallbacks
- Different crops for different screens
        `,
                exercises: [
                    {
                        prompt: 'What element provides multiple image sources for responsiveness?',
                        type: 'multiple-choice',
                        options: ['<responsive>', '<picture>', '<images>', '<multi-img>'],
                        answer: 1
                    },
                    {
                        prompt: 'What attribute specifies multiple image sizes?',
                        type: 'multiple-choice',
                        options: ['sizes', 'srcset', 'widths', 'dimensions'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the main benefit of responsive images?',
                        type: 'multiple-choice',
                        options: ['Better colors', 'Faster loading on mobile', 'Easier coding', 'More animations'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Accessibility ============
            {
                id: 'html-28',
                title: 'ARIA Basics',
                description: 'Accessibility for all users',
                stage: 4,
                content: `
# ARIA Attributes

Make your pages accessible!

## ARIA Roles:
\`\`\`html
<!-- Landmark roles -->
<div role="navigation">...</div>
<div role="main">...</div>
<div role="search">...</div>

<!-- Widget roles -->
<div role="button">...</div>
<div role="tab">...</div>
<div role="dialog">...</div>
\`\`\`

## ARIA Labels:
\`\`\`html
<!-- Label for screen readers -->
<button aria-label="Close dialog">×</button>

<!-- Reference another element -->
<div id="desc">Enter your email</div>
<input aria-labelledby="desc">

<!-- Additional description -->
<input aria-describedby="hint">
<span id="hint">Must be 8+ characters</span>
\`\`\`

## ARIA States:
\`\`\`html
<button aria-expanded="false">Menu</button>
<button aria-pressed="true">Bold</button>
<div aria-hidden="true">Decorative content</div>
<input aria-invalid="true">
<div aria-busy="true">Loading...</div>
\`\`\`

## Live Regions:
\`\`\`html
<!-- Announce updates -->
<div aria-live="polite">
    Status messages appear here
</div>

<div aria-live="assertive">
    Error! Please fix the form.
</div>
\`\`\`

## Best Practice:
Use semantic HTML first! ARIA is for when native elements aren't enough.
        `,
                exercises: [
                    {
                        prompt: 'What attribute provides a text alternative for screen readers?',
                        type: 'multiple-choice',
                        options: ['title', 'alt', 'aria-label', 'name'],
                        answer: 2
                    },
                    {
                        prompt: 'What aria attribute announces dynamic content changes?',
                        type: 'multiple-choice',
                        options: ['aria-announce', 'aria-live', 'aria-update', 'aria-dynamic'],
                        answer: 1
                    },
                    {
                        prompt: 'What does ARIA stand for?',
                        type: 'multiple-choice',
                        options: ['Accessible Rich Internet Applications', 'Advanced Rendering Interface API', 'Automatic Reader Integration Assistance', 'Accessible Reader Input Access'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'html-29',
                title: 'Accessible Forms',
                description: 'Forms everyone can use',
                stage: 4,
                content: `
# Accessible Forms

Make forms usable for everyone!

## Proper Labels:
\`\`\`html
<!-- Method 1: for/id -->
<label for="email">Email Address</label>
<input type="email" id="email" name="email">

<!-- Method 2: Wrapping -->
<label>
    Email Address
    <input type="email" name="email">
</label>
\`\`\`

## Fieldset and Legend:
\`\`\`html
<fieldset>
    <legend>Shipping Address</legend>
    <label for="street">Street</label>
    <input type="text" id="street">
    <label for="city">City</label>
    <input type="text" id="city">
</fieldset>
\`\`\`

## Error Messages:
\`\`\`html
<label for="password">Password</label>
<input 
    type="password" 
    id="password" 
    aria-describedby="password-error"
    aria-invalid="true">
<span id="password-error" role="alert">
    Password must be 8+ characters
</span>
\`\`\`

## Required Fields:
\`\`\`html
<label for="name">
    Name <span aria-hidden="true">*</span>
</label>
<input type="text" id="name" required aria-required="true">
\`\`\`

## Form Instructions:
\`\`\`html
<form aria-describedby="form-instructions">
    <p id="form-instructions">
        Fields marked with * are required
    </p>
    <!-- Form fields -->
</form>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What element groups related form fields together?',
                        type: 'multiple-choice',
                        options: ['<group>', '<fieldset>', '<section>', '<container>'],
                        answer: 1
                    },
                    {
                        prompt: 'What element provides a title for a fieldset?',
                        type: 'multiple-choice',
                        options: ['<title>', '<caption>', '<legend>', '<header>'],
                        answer: 2
                    },
                    {
                        prompt: 'What attribute links a description to an input?',
                        type: 'multiple-choice',
                        options: ['aria-description', 'aria-describedby', 'aria-text', 'aria-info'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Meta Tags ============
            {
                id: 'html-30',
                title: 'Meta Tags',
                description: 'Information about your page',
                stage: 4,
                content: `
# Meta Tags

Provide metadata about your page!

## Essential Meta Tags:
\`\`\`html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description for search engines">
    <meta name="keywords" content="html, css, javascript">
    <meta name="author" content="Your Name">
</head>
\`\`\`

## Social Media (Open Graph):
\`\`\`html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
\`\`\`

## Twitter Cards:
\`\`\`html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Description">
<meta name="twitter:image" content="https://example.com/image.jpg">
\`\`\`

## Other Useful Meta:
\`\`\`html
<!-- Theme color for mobile browsers -->
<meta name="theme-color" content="#4285f4">

<!-- Prevent caching -->
<meta http-equiv="Cache-Control" content="no-cache">

<!-- Redirect after 5 seconds -->
<meta http-equiv="refresh" content="5;url=https://example.com">

<!-- Robots directives -->
<meta name="robots" content="index, follow">
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What meta property is used for social media sharing?',
                        type: 'multiple-choice',
                        options: ['meta name="social"', 'meta property="og:..."', 'meta name="share"', 'meta type="facebook"'],
                        answer: 1
                    },
                    {
                        prompt: 'What meta tag sets the page description for search engines?',
                        type: 'multiple-choice',
                        options: ['<meta name="description">', '<meta name="summary">', '<meta name="seo">', '<meta name="info">'],
                        answer: 0
                    },
                    {
                        prompt: 'What meta tag is essential for responsive design?',
                        type: 'multiple-choice',
                        options: ['charset', 'viewport', 'description', 'author'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - SVG ============
            {
                id: 'html-31',
                title: 'SVG Basics',
                description: 'Scalable Vector Graphics',
                stage: 4,
                content: `
# SVG in HTML

Create scalable graphics that never pixelate!

## Inline SVG:
\`\`\`html
<svg width="100" height="100">
    <circle cx="50" cy="50" r="40" fill="blue"/>
</svg>
\`\`\`

## Basic Shapes:
\`\`\`html
<svg width="200" height="200">
    <!-- Rectangle -->
    <rect x="10" y="10" width="80" height="60" fill="red"/>
    
    <!-- Circle -->
    <circle cx="150" cy="50" r="40" fill="blue"/>
    
    <!-- Ellipse -->
    <ellipse cx="100" cy="150" rx="60" ry="30" fill="green"/>
    
    <!-- Line -->
    <line x1="10" y1="100" x2="190" y2="100" stroke="black"/>
    
    <!-- Polygon -->
    <polygon points="50,10 90,90 10,90" fill="purple"/>
</svg>
\`\`\`

## Path Element:
\`\`\`html
<svg width="100" height="100">
    <path d="M 10 10 L 90 10 L 50 90 Z" fill="orange"/>
</svg>

<!-- Path commands:
    M = Move to
    L = Line to
    H = Horizontal line
    V = Vertical line
    C = Curve
    Z = Close path
-->
\`\`\`

## Text in SVG:
\`\`\`html
<svg width="200" height="50">
    <text x="10" y="30" font-size="20" fill="navy">
        Hello SVG!
    </text>
</svg>
\`\`\`

## Benefits of SVG:
- Scales without losing quality
- Small file size
- CSS and JavaScript control
- Accessible
        `,
                exercises: [
                    {
                        prompt: 'What element creates a circle in SVG?',
                        type: 'multiple-choice',
                        options: ['<round>', '<circle>', '<oval>', '<sphere>'],
                        answer: 1
                    },
                    {
                        prompt: 'What does SVG stand for?',
                        type: 'multiple-choice',
                        options: ['Scalable Vector Graphics', 'Simple Visual Graphics', 'Standard Vector Graphics', 'Styled Visual Graphics'],
                        answer: 0
                    },
                    {
                        prompt: 'What is an advantage of SVG over PNG?',
                        type: 'multiple-choice',
                        options: ['Smaller file size always', 'Scales without pixelation', 'Better for photos', 'Faster rendering'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED HTML - Template ============
            {
                id: 'html-32',
                title: 'Template Element',
                description: 'Reusable HTML templates',
                stage: 4,
                content: `
# Template Element

Create reusable HTML fragments!

## Basic Template:
\`\`\`html
<template id="card-template">
    <div class="card">
        <h2 class="title"></h2>
        <p class="content"></p>
    </div>
</template>

<div id="container"></div>

<script>
const template = document.getElementById('card-template')
const container = document.getElementById('container')

// Clone and use the template
const clone = template.content.cloneNode(true)
clone.querySelector('.title').textContent = 'Card Title'
clone.querySelector('.content').textContent = 'Card content here...'
container.appendChild(clone)
</script>
\`\`\`

## Creating Multiple Items:
\`\`\`html
<template id="list-item">
    <li class="item"></li>
</template>

<ul id="list"></ul>

<script>
const items = ['Apple', 'Banana', 'Cherry']
const template = document.getElementById('list-item')
const list = document.getElementById('list')

items.forEach(item => {
    const clone = template.content.cloneNode(true)
    clone.querySelector('.item').textContent = item
    list.appendChild(clone)
})
</script>
\`\`\`

## Key Points:
- Content inside \`<template>\` is not rendered
- Must clone with \`cloneNode(true)\`
- Great for dynamic content
- Better than string concatenation

## With Slots (Web Components):
\`\`\`html
<template id="user-card">
    <div class="card">
        <slot name="name">Default Name</slot>
        <slot name="email">Default Email</slot>
    </div>
</template>
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What method creates a copy of template content?',
                        type: 'multiple-choice',
                        options: ['copy()', 'clone()', 'cloneNode(true)', 'duplicate()'],
                        answer: 2
                    },
                    {
                        prompt: 'Is template content rendered when the page loads?',
                        type: 'multiple-choice',
                        options: ['Yes, immediately', 'No, it is hidden', 'Only with JavaScript', 'Only in some browsers'],
                        answer: 1
                    },
                    {
                        prompt: 'What property accesses the content inside a template?',
                        type: 'multiple-choice',
                        options: ['innerHTML', 'content', 'children', 'value'],
                        answer: 1
                    }
                ]
            },
            // ============ FINAL HTML PROJECT ============
            {
                id: 'html-33',
                title: 'Complete HTML Mastery',
                description: 'Build a complete webpage',
                stage: 4,
                content: `
# HTML Mastery

You've learned comprehensive HTML! Here's a complete example:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Professional portfolio website">
    <meta property="og:title" content="Jane Developer - Portfolio">
    <meta property="og:image" content="thumbnail.jpg">
    <title>Jane Developer - Portfolio</title>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>
    
    <main>
        <section id="about" aria-labelledby="about-heading">
            <h1 id="about-heading">Jane Developer</h1>
            <p>Full-stack developer passionate about accessible web.</p>
            
            <figure>
                <picture>
                    <source srcset="profile.webp" type="image/webp">
                    <img src="profile.jpg" alt="Jane smiling" width="200">
                </picture>
                <figcaption>Jane Developer, 2025</figcaption>
            </figure>
        </section>
        
        <section id="projects">
            <h2>Projects</h2>
            <template id="project-card">
                <article class="project">
                    <h3 class="project-title"></h3>
                    <p class="project-desc"></p>
                </article>
            </template>
            <div id="projects-container"></div>
        </section>
        
        <section id="contact">
            <h2>Contact Me</h2>
            <form>
                <label for="name">Name</label>
                <input type="text" id="name" required autocomplete="name">
                
                <label for="email">Email</label>
                <input type="email" id="email" required autocomplete="email">
                
                <label for="message">Message</label>
                <textarea id="message" required></textarea>
                
                <button type="submit">Send</button>
            </form>
        </section>
    </main>
    
    <footer>
        <address>
            <a href="mailto:jane@example.com">jane@example.com</a>
        </address>
        <p><time datetime="2025">2025</time> Jane Developer</p>
    </footer>
</body>
</html>
\`\`\`

Congratulations! You've mastered HTML! 🎉
        `,
                exercises: [
                    {
                        prompt: 'What semantic element represents the main navigation?',
                        type: 'multiple-choice',
                        options: ['<menu>', '<nav>', '<links>', '<navigation>'],
                        answer: 1
                    },
                    {
                        prompt: 'What element wraps contact information?',
                        type: 'multiple-choice',
                        options: ['<contact>', '<info>', '<address>', '<details>'],
                        answer: 2
                    },
                    {
                        prompt: 'What is the root element of every HTML page?',
                        type: 'multiple-choice',
                        options: ['<body>', '<head>', '<html>', '<document>'],
                        answer: 2
                    }
                ]
            }
        ]
    },

    // CSS Course - Natural Language → Real CSS Progression
    'css': {
        id: 'css',
        name: 'CSS',
        description: 'Learn CSS to style and design beautiful web pages. From natural language to real syntax.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🎨',
        color: '#264de4',
        language: 'css',
        prerequisites: ['html'],
        estimatedHours: 8,
        lessons: [
            // ============ STAGE 1: Pure Natural Language ============
            {
                id: 'css-1',
                title: 'What is CSS?',
                description: 'The paint for your web pages',
                stage: 1,
                content: `
# What is CSS?

CSS makes web pages look beautiful!

## HTML vs CSS:
- **HTML**: Structure (what's on the page)
- **CSS**: Style (how it looks)

## What CSS Controls:
- Colors
- Fonts and text
- Spacing
- Sizes
- Layouts
- Animations

## Think of It Like:
\`\`\`
for headings:
    color is blue
    size is 32 pixels
\`\`\`

This says "make all headings blue and 32 pixels big!"
        `,
                exercises: [
                    {
                        prompt: 'What does CSS control?',
                        type: 'multiple-choice',
                        options: ['Page content', 'Visual appearance', 'Data storage', 'User accounts'],
                        answer: 1
                    },
                    {
                        prompt: 'What does HTML control?',
                        type: 'multiple-choice',
                        options: ['Colors and fonts', 'Page structure', 'Animations', 'Data validation'],
                        answer: 1
                    },
                    {
                        prompt: 'What does CSS stand for?',
                        type: 'multiple-choice',
                        options: ['Cascading Style Sheets', 'Computer Style System', 'Creative Style Syntax', 'Custom Style Sheets'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'css-2',
                title: 'Selecting Elements',
                description: 'Choosing what to style',
                stage: 1,
                content: `
# Selecting Elements

First, tell CSS WHAT to style!

## By Tag Name:
\`\`\`
for all paragraphs:
    color is gray
\`\`\`

## By Class (group of elements):
\`\`\`
for class "highlight":
    background is yellow
\`\`\`

## By ID (one specific element):
\`\`\`
for id "header":
    size is large
\`\`\`

## Common Selectors:
- Tags: h1, p, a, img
- Classes: .button, .card, .menu
- IDs: #header, #footer, #main
        `,
                exercises: [
                    {
                        prompt: 'What selector type is for a group of similar elements?',
                        type: 'multiple-choice',
                        options: ['Tag', 'Class', 'ID', 'Universal'],
                        answer: 1
                    },
                    {
                        prompt: 'What selector targets a unique element?',
                        type: 'multiple-choice',
                        options: ['Tag', 'Class', 'ID', 'Universal'],
                        answer: 2
                    },
                    {
                        prompt: 'What selector targets elements by their HTML element name?',
                        type: 'multiple-choice',
                        options: ['Tag', 'Class', 'ID', 'Attribute'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'css-3',
                title: 'Colors',
                description: 'Adding color to elements',
                stage: 1,
                content: `
# Adding Colors

## Text Color:
\`\`\`
for paragraphs:
    text color is blue
\`\`\`

## Background Color:
\`\`\`
for body:
    background color is lightgray
\`\`\`

## Color Values:
- Names: red, blue, green, purple, orange
- Hex: #ff0000 (red), #0000ff (blue)
- RGB: rgb(255, 0, 0)

## Example:
\`\`\`
for headings:
    text color is darkblue
    background color is lightyellow
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Which property changes the text color?',
                        type: 'multiple-choice',
                        options: ['background color', 'text color', 'font color', 'fill color'],
                        answer: 1
                    },
                    {
                        prompt: 'Which is a valid color format?',
                        type: 'multiple-choice',
                        options: ['#gg0000', '#ff0000', '#ff00', 'hex(255,0,0)'],
                        answer: 1
                    },
                    {
                        prompt: 'What color does rgb(0, 255, 0) represent?',
                        type: 'multiple-choice',
                        options: ['Red', 'Green', 'Blue', 'Yellow'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-4',
                title: 'Fonts and Text',
                description: 'Styling text appearance',
                stage: 1,
                content: `
# Fonts and Text

## Font Family:
\`\`\`
for body:
    font is Arial
\`\`\`

## Font Size:
\`\`\`
for paragraphs:
    font size is 16 pixels
\`\`\`

## Font Weight:
\`\`\`
for headings:
    font weight is bold
\`\`\`

## Text Alignment:
\`\`\`
for class "center":
    text align is center
\`\`\`

## All Together:
\`\`\`
for body:
    font is Arial
    font size is 16 pixels
    text color is black
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property makes text bold?',
                        type: 'multiple-choice',
                        options: ['font-style', 'font-weight', 'text-bold', 'font-bold'],
                        answer: 1
                    },
                    {
                        prompt: 'What property changes the text alignment?',
                        type: 'multiple-choice',
                        options: ['font-align', 'text-position', 'text-align', 'align'],
                        answer: 2
                    },
                    {
                        prompt: 'What property sets the font family?',
                        type: 'multiple-choice',
                        options: ['font-name', 'font-family', 'text-font', 'typeface'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-5',
                title: 'Spacing',
                description: 'Margin and padding',
                stage: 1,
                content: `
# Spacing: Margin and Padding

## Padding (inside spacing):
\`\`\`
for class "box":
    padding is 20 pixels
\`\`\`
Adds space INSIDE the element

## Margin (outside spacing):
\`\`\`
for class "card":
    margin is 10 pixels
\`\`\`
Adds space OUTSIDE the element

## Think of It:
- Padding = cushion inside a box
- Margin = space between boxes

## Specific Sides:
\`\`\`
for class "special":
    padding top is 10 pixels
    padding bottom is 20 pixels
    margin left is 15 pixels
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Which adds space INSIDE an element?',
                        type: 'multiple-choice',
                        options: ['Margin', 'Padding', 'Border', 'Gap'],
                        answer: 1
                    },
                    {
                        prompt: 'Which adds space OUTSIDE an element?',
                        type: 'multiple-choice',
                        options: ['Margin', 'Padding', 'Border', 'Width'],
                        answer: 0
                    },
                    {
                        prompt: 'What property sets spacing on all sides at once?',
                        type: 'multiple-choice',
                        options: ['spacing', 'margin or padding', 'space', 'gap'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-6',
                title: 'Borders',
                description: 'Adding lines around elements',
                stage: 1,
                content: `
# Borders

Borders are lines around elements!

## Basic Border:
\`\`\`
for class "box":
    border is 1 pixel solid black
\`\`\`

## Border Parts:
1. **Width**: How thick (1px, 2px)
2. **Style**: solid, dashed, dotted
3. **Color**: Any color

## Border Radius (Rounded Corners):
\`\`\`
for class "card":
    border is 1 pixel solid gray
    border radius is 10 pixels
\`\`\`

## Circle:
\`\`\`
for class "avatar":
    border radius is 50 percent
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What creates rounded corners?',
                        type: 'multiple-choice',
                        options: ['border-curve', 'border-radius', 'corner-round', 'border-round'],
                        answer: 1
                    },
                    {
                        prompt: 'What are the three parts of a border?',
                        type: 'multiple-choice',
                        options: ['width, color, style', 'size, type, color', 'thick, thin, color', 'width, style, color'],
                        answer: 3
                    },
                    {
                        prompt: 'What border-radius value makes a circle?',
                        type: 'multiple-choice',
                        options: ['100px', '50%', '100%', 'circle'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 2: Introducing Symbols ============
            {
                id: 'css-7',
                title: 'CSS Syntax: Selectors',
                description: 'Using . and # symbols',
                stage: 2,
                content: `
# CSS Selectors with Symbols

## Symbol Meanings:
- No symbol = tag name
- \`.\` (dot) = class
- \`#\` (hash) = ID

## Examples:
\`\`\`
for paragraphs → p
for class "button" → .button
for id "header" → #header
\`\`\`

## Together:
\`\`\`
p {
    text color is gray
}

.button {
    background color is blue
}

#header {
    font size is 24 pixels
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What symbol selects a class?',
                        type: 'multiple-choice',
                        options: ['#', '.', '@', '*'],
                        answer: 1
                    },
                    {
                        prompt: 'What symbol selects an ID?',
                        type: 'multiple-choice',
                        options: ['#', '.', '@', '*'],
                        answer: 0
                    },
                    {
                        prompt: 'How do you select all paragraph elements?',
                        type: 'multiple-choice',
                        options: ['.p', '#p', 'p', '*p'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-8',
                title: 'Property Syntax',
                description: 'Using colons and semicolons',
                stage: 2,
                content: `
# CSS Property Syntax

## The Format:
\`\`\`
property: value;
\`\`\`

## Translations:
| Natural | CSS |
|---------|-----|
| text color is blue | color: blue; |
| background color is red | background-color: red; |
| font size is 16 pixels | font-size: 16px; |
| font weight is bold | font-weight: bold; |

## Example:
\`\`\`css
p {
    color: gray;
    font-size: 14px;
    margin: 10px;
}
\`\`\`

## Key Points:
- Use \`:\` after property name
- Use \`;\` after each value
- Wrap in \`{ }\` braces
        `,
                exercises: [
                    {
                        prompt: 'What punctuation ends each CSS property?',
                        type: 'multiple-choice',
                        options: ['.', ',', ':', ';'],
                        answer: 3
                    },
                    {
                        prompt: 'What punctuation separates property from value?',
                        type: 'multiple-choice',
                        options: ['.', ',', ':', ';'],
                        answer: 2
                    },
                    {
                        prompt: 'What surrounds CSS declarations?',
                        type: 'multiple-choice',
                        options: ['( )', '[ ]', '{ }', '< >'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-9',
                title: 'Units',
                description: 'px, em, rem, %',
                stage: 2,
                content: `
# CSS Units

Different ways to measure size!

## Pixels (px):
Fixed size, doesn't change
\`\`\`css
font-size: 16px;
width: 200px;
\`\`\`

## Percentages (%):
Relative to parent
\`\`\`css
width: 50%;
height: 100%;
\`\`\`

## Em:
Relative to current font size
\`\`\`css
padding: 1.5em;
\`\`\`

## Rem:
Relative to root font size
\`\`\`css
font-size: 1.2rem;
\`\`\`

## When to Use:
- px: Exact sizes, borders
- %: Responsive layouts
- rem: Font sizes
        `,
                exercises: [
                    {
                        prompt: 'Which unit is best for responsive layouts?',
                        type: 'multiple-choice',
                        options: ['px', 'pt', '%', 'cm'],
                        answer: 2
                    },
                    {
                        prompt: 'What does rem stand for?',
                        type: 'multiple-choice',
                        options: ['Relative element measure', 'Root em', 'Responsive em', 'Render em'],
                        answer: 1
                    },
                    {
                        prompt: 'Which unit creates a fixed size that does not change?',
                        type: 'multiple-choice',
                        options: ['%', 'em', 'rem', 'px'],
                        answer: 3
                    }
                ]
            },
            // ============ STAGE 3: Code-Like Structure ============
            {
                id: 'css-10',
                title: 'Real CSS Rules',
                description: 'Writing actual CSS',
                stage: 3,
                content: `
# Real CSS

Let's write actual CSS!

## The Format:
\`\`\`css
selector {
    property: value;
    property: value;
}
\`\`\`

## Examples:
\`\`\`css
body {
    background-color: #f0f0f0;
    font-family: Arial, sans-serif;
    color: #333;
}

h1 {
    color: navy;
    font-size: 32px;
    text-align: center;
}

.button {
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Write CSS: make h1 color blue',
                        type: 'code',
                        language: 'css',
                        expectedOutput: 'h1 { color: blue; }',
                        hint: 'Use: h1 { color: blue; }'
                    },
                    {
                        prompt: 'Write CSS: make paragraphs font-size 18px',
                        type: 'code',
                        language: 'css',
                        expectedOutput: 'p { font-size: 18px; }',
                        hint: 'Use: p { font-size: 18px; }'
                    },
                    {
                        prompt: 'What color value is #ffffff?',
                        type: 'multiple-choice',
                        options: ['Black', 'White', 'Red', 'Gray'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-11',
                title: 'Box Model',
                description: 'Understanding element sizing',
                stage: 3,
                content: `
# The Box Model

Every element is a box!

## Box Layers (outside → inside):
1. **Margin** - Space outside
2. **Border** - The edge
3. **Padding** - Space inside
4. **Content** - The actual content

## Example:
\`\`\`css
.card {
    width: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    margin: 10px;
}
\`\`\`

## Box-Sizing (Important!):
\`\`\`css
* {
    box-sizing: border-box;
}
\`\`\`
This makes width include padding and border!
        `,
                exercises: [
                    {
                        prompt: 'Write CSS: box with padding 15px and border 2px solid black',
                        type: 'code',
                        language: 'css',
                        expectedOutput: '.box { padding: 15px; border: 2px solid black; }',
                        hint: 'Use: .box { padding: 15px; border: 2px solid black; }'
                    },
                    {
                        prompt: 'What are the four layers of the box model (outside to inside)?',
                        type: 'multiple-choice',
                        options: ['Content, Padding, Border, Margin', 'Margin, Border, Padding, Content', 'Border, Margin, Content, Padding', 'Padding, Content, Margin, Border'],
                        answer: 1
                    },
                    {
                        prompt: 'What box-sizing value includes padding in width?',
                        type: 'multiple-choice',
                        options: ['content-box', 'border-box', 'padding-box', 'include-box'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-12',
                title: 'Flexbox Basics',
                description: 'Modern layout system',
                stage: 3,
                content: `
# Flexbox Layout

The easiest way to arrange items!

## Enable Flexbox:
\`\`\`css
.container {
    display: flex;
}
\`\`\`

## Direction:
\`\`\`css
.container {
    display: flex;
    flex-direction: row;    /* horizontal */
    flex-direction: column; /* vertical */
}
\`\`\`

## Alignment:
\`\`\`css
.container {
    display: flex;
    justify-content: center;  /* main axis */
    align-items: center;      /* cross axis */
}
\`\`\`

## Justify-Content Values:
- flex-start, flex-end, center
- space-between, space-around
        `,
                exercises: [
                    {
                        prompt: 'Write CSS to center items with flexbox',
                        type: 'code',
                        language: 'css',
                        expectedOutput: '.center { display: flex; justify-content: center; align-items: center; }',
                        hint: 'Use display: flex with justify-content and align-items'
                    },
                    {
                        prompt: 'What property enables flexbox?',
                        type: 'multiple-choice',
                        options: ['flex: true', 'layout: flex', 'display: flex', 'mode: flex'],
                        answer: 2
                    },
                    {
                        prompt: 'What property aligns items on the cross axis?',
                        type: 'multiple-choice',
                        options: ['justify-content', 'align-items', 'cross-align', 'flex-align'],
                        answer: 1
                    }
                ]
            },
            // ============ STAGE 4: Full CSS ============
            {
                id: 'css-13',
                title: 'CSS Grid',
                description: 'Two-dimensional layouts',
                stage: 4,
                content: `
# CSS Grid

For complex 2D layouts!

## Basic Grid:
\`\`\`css
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
}
\`\`\`

## Sizing Columns:
\`\`\`css
/* Equal columns */
grid-template-columns: 1fr 1fr 1fr;

/* Specific sizes */
grid-template-columns: 200px 1fr 100px;

/* Repeat */
grid-template-columns: repeat(3, 1fr);
\`\`\`

## Spanning Items:
\`\`\`css
.wide-item {
    grid-column: span 2;
}

.tall-item {
    grid-row: span 2;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'Create a 3-column grid using CSS Grid',
                        type: 'code',
                        language: 'css',
                        expectedOutput: '.grid { display: grid; grid-template-columns: 1fr 1fr 1fr; }',
                        hint: 'Use display: grid and grid-template-columns'
                    },
                    {
                        prompt: 'What property defines grid columns?',
                        type: 'multiple-choice',
                        options: ['grid-columns', 'grid-template-columns', 'columns', 'display-columns'],
                        answer: 1
                    },
                    {
                        prompt: 'What unit is flexible and takes available space?',
                        type: 'multiple-choice',
                        options: ['px', 'em', 'fr', '%'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-14',
                title: 'Hover and Transitions',
                description: 'Interactive effects',
                stage: 4,
                content: `
# Hover Effects

Make elements interactive!

## Basic Hover:
\`\`\`css
.button:hover {
    background-color: darkblue;
}
\`\`\`

## Smooth Transitions:
\`\`\`css
.button {
    background-color: blue;
    transition: background-color 0.3s;
}

.button:hover {
    background-color: darkblue;
}
\`\`\`

## Multiple Transitions:
\`\`\`css
.card {
    transform: scale(1);
    box-shadow: none;
    transition: all 0.3s ease;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property creates smooth animations between states?',
                        type: 'multiple-choice',
                        options: ['animation', 'transition', 'transform', 'keyframes'],
                        answer: 1
                    },
                    {
                        prompt: 'What pseudo-class applies styles on mouse over?',
                        type: 'multiple-choice',
                        options: [':active', ':focus', ':hover', ':visited'],
                        answer: 2
                    },
                    {
                        prompt: 'What is a typical transition duration?',
                        type: 'multiple-choice',
                        options: ['0.3s', '3s', '30s', '0.003s'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'css-15',
                title: 'Responsive Design',
                description: 'Media queries for different screens',
                stage: 4,
                content: `
# Responsive Design

Make your site work on all devices!

## Media Queries:
\`\`\`css
/* Mobile first */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet and up */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        width: 960px;
    }
}
\`\`\`

## Common Breakpoints:
- 480px - Small phones
- 768px - Tablets
- 1024px - Laptops
- 1200px - Desktops
        `,
                exercises: [
                    {
                        prompt: 'What CSS feature handles different screen sizes?',
                        type: 'multiple-choice',
                        options: ['@screen', '@media', '@responsive', '@size'],
                        answer: 1
                    },
                    {
                        prompt: 'What is a mobile-first approach?',
                        type: 'multiple-choice',
                        options: ['Design for mobile last', 'Start with mobile styles, then add for larger screens', 'Only support mobile', 'Use mobile-only CSS'],
                        answer: 1
                    },
                    {
                        prompt: 'Which breakpoint typically targets tablets?',
                        type: 'multiple-choice',
                        options: ['320px', '480px', '768px', '1440px'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-16',
                title: 'CSS Variables',
                description: 'Reusable values',
                stage: 4,
                content: `
# CSS Variables

Store and reuse values!

## Defining Variables:
\`\`\`css
:root {
    --primary-color: #3498db;
    --secondary-color: #2ecc71;
    --font-size: 16px;
    --spacing: 20px;
}
\`\`\`

## Using Variables:
\`\`\`css
.button {
    background-color: var(--primary-color);
    padding: var(--spacing);
    font-size: var(--font-size);
}

.header {
    background-color: var(--secondary-color);
}
\`\`\`

## Benefits:
- Change one place, update everywhere
- Easy theming
- Cleaner, more maintainable code
        `,
                exercises: [
                    {
                        prompt: 'How do you use a CSS variable named --main-color?',
                        type: 'multiple-choice',
                        options: ['$main-color', 'var(--main-color)', '@main-color', '#{main-color}'],
                        answer: 1
                    },
                    {
                        prompt: 'Where are CSS variables typically defined?',
                        type: 'multiple-choice',
                        options: [':root', 'body', 'html', '@variables'],
                        answer: 0
                    },
                    {
                        prompt: 'What prefix do CSS variable names require?',
                        type: 'multiple-choice',
                        options: ['$', '@', '--', '##'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-17',
                title: 'Complete CSS Page',
                description: 'Putting it all together',
                stage: 4,
                content: `
# Complete CSS Styling

You can now fully style web pages!

## Example: Modern Card:
\`\`\`css
:root {
    --primary: #6366f1;
    --shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.card {
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: var(--shadow);
    transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 12px rgba(0,0,0,0.15);
}

.card h2 {
    color: var(--primary);
    margin-bottom: 12px;
}

.card p {
    color: #666;
    line-height: 1.6;
}

@media (max-width: 768px) {
    .card {
        padding: 16px;
    }
}
\`\`\`

Keep experimenting and building! 🎉
        `,
                exercises: [
                    {
                        prompt: 'What are the three main layout systems in CSS?',
                        type: 'multiple-choice',
                        options: ['Inline, Block, Flex', 'Block, Flexbox, Grid', 'Position, Float, Grid', 'Static, Relative, Fixed'],
                        answer: 1
                    },
                    {
                        prompt: 'Which property creates a shadow effect?',
                        type: 'multiple-choice',
                        options: ['shadow', 'text-shadow or box-shadow', 'drop-shadow', 'element-shadow'],
                        answer: 1
                    },
                    {
                        prompt: 'What does the transform property do?',
                        type: 'multiple-choice',
                        options: ['Changes color', 'Moves, rotates, or scales elements', 'Adds animations', 'Changes fonts'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED CSS - Animations ============
            {
                id: 'css-18',
                title: 'CSS Animations',
                description: 'Create complex animations with keyframes',
                stage: 4,
                content: `
# CSS Animations

Create complex, multi-step animations!

## Keyframes:
\`\`\`css
@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.element {
    animation: fadeIn 1s ease-in;
}
\`\`\`

## Multiple Steps:
\`\`\`css
@keyframes bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

.bouncing {
    animation: bounce 0.5s ease infinite;
}
\`\`\`

## Animation Properties:
\`\`\`css
.animated {
    animation-name: slideIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-delay: 0.2s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: forwards;
    animation-play-state: running;
}

/* Shorthand */
.animated {
    animation: slideIn 0.5s ease-out 0.2s 1 forwards;
}
\`\`\`

## Complex Animation:
\`\`\`css
@keyframes pulse {
    0% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(99, 102, 241, 0.4);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(99, 102, 241, 0.6);
    }
    100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(99, 102, 241, 0.4);
    }
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What at-rule defines animation keyframes?',
                        type: 'multiple-choice',
                        options: ['@animate', '@keyframes', '@animation', '@frames'],
                        answer: 1
                    },
                    {
                        prompt: 'What value makes an animation repeat forever?',
                        type: 'multiple-choice',
                        options: ['loop', 'forever', 'infinite', 'repeat'],
                        answer: 2
                    },
                    {
                        prompt: 'What property controls animation speed curve?',
                        type: 'multiple-choice',
                        options: ['animation-speed', 'animation-timing-function', 'animation-curve', 'animation-easing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-19',
                title: 'CSS Transforms',
                description: 'Rotate, scale, skew, and move elements',
                stage: 4,
                content: `
# CSS Transforms

Transform elements in 2D and 3D!

## 2D Transforms:
\`\`\`css
/* Move */
.move {
    transform: translate(50px, 100px);
    transform: translateX(50px);
    transform: translateY(100px);
}

/* Scale */
.scale {
    transform: scale(1.5);      /* 150% */
    transform: scaleX(2);       /* Double width */
    transform: scaleY(0.5);     /* Half height */
}

/* Rotate */
.rotate {
    transform: rotate(45deg);
    transform: rotate(-90deg);
}

/* Skew */
.skew {
    transform: skew(20deg, 10deg);
    transform: skewX(20deg);
}
\`\`\`

## Multiple Transforms:
\`\`\`css
.combined {
    transform: translateX(100px) rotate(45deg) scale(1.2);
}
\`\`\`

## Transform Origin:
\`\`\`css
.element {
    transform-origin: top left;
    transform-origin: center center;
    transform-origin: 50% 50%;
    transform: rotate(45deg);
}
\`\`\`

## 3D Transforms:
\`\`\`css
.card {
    transform: perspective(1000px) rotateY(45deg);
    transform-style: preserve-3d;
}

.flip {
    transform: rotateX(180deg);
}
\`\`\`

## Practical: Hover Effect:
\`\`\`css
.button {
    transition: transform 0.3s;
}

.button:hover {
    transform: translateY(-3px) scale(1.02);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What transform function rotates an element?',
                        type: 'multiple-choice',
                        options: ['spin()', 'rotate()', 'turn()', 'angle()'],
                        answer: 1
                    },
                    {
                        prompt: 'What transform function changes element size?',
                        type: 'multiple-choice',
                        options: ['size()', 'resize()', 'scale()', 'zoom()'],
                        answer: 2
                    },
                    {
                        prompt: 'What transform function moves an element?',
                        type: 'multiple-choice',
                        options: ['move()', 'position()', 'translate()', 'shift()'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED CSS - Grid Deep Dive ============
            {
                id: 'css-20',
                title: 'CSS Grid Deep Dive',
                description: 'Master grid layout techniques',
                stage: 4,
                content: `
# Advanced CSS Grid

Master powerful grid techniques!

## Grid Template Areas:
\`\`\`css
.layout {
    display: grid;
    grid-template-areas:
        "header header header"
        "sidebar main main"
        "footer footer footer";
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 200px 1fr 1fr;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Auto-Fill and Auto-Fit:
\`\`\`css
/* Responsive grid without media queries! */
.gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
}

/* auto-fit: empty columns collapse */
.flexible {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
\`\`\`

## Spanning Items:
\`\`\`css
.featured {
    grid-column: span 2;
    grid-row: span 2;
}

.wide {
    grid-column: 1 / -1;  /* Span all columns */
}
\`\`\`

## Grid with Named Lines:
\`\`\`css
.container {
    display: grid;
    grid-template-columns: 
        [start] 1fr 
        [content-start] 2fr 
        [content-end] 1fr 
        [end];
}

.item {
    grid-column: content-start / content-end;
}
\`\`\`

## Subgrid:
\`\`\`css
.parent {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

.child {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: span 3;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function creates responsive columns without media queries?',
                        type: 'multiple-choice',
                        options: ['flex()', 'repeat(auto-fill, ...)', 'responsive()', 'auto()'],
                        answer: 1
                    },
                    {
                        prompt: 'What property defines named grid areas?',
                        type: 'multiple-choice',
                        options: ['grid-areas', 'grid-template-areas', 'grid-names', 'grid-layout'],
                        answer: 1
                    },
                    {
                        prompt: 'What function sets a minimum and maximum size?',
                        type: 'multiple-choice',
                        options: ['range()', 'limit()', 'minmax()', 'between()'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-21',
                title: 'Advanced Flexbox',
                description: 'Master flexbox patterns',
                stage: 4,
                content: `
# Advanced Flexbox

Powerful flexbox patterns!

## Flex Grow, Shrink, Basis:
\`\`\`css
.item {
    flex-grow: 1;    /* Take available space */
    flex-shrink: 1;  /* Shrink if needed */
    flex-basis: 200px; /* Starting size */
}

/* Shorthand */
.item {
    flex: 1 1 200px;
}

/* Common patterns */
.grow { flex: 1; }
.no-shrink { flex: 0 0 auto; }
.fixed { flex: 0 0 200px; }
\`\`\`

## Perfect Centering:
\`\`\`css
.center-all {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
\`\`\`

## Space Distribution:
\`\`\`css
.navbar {
    display: flex;
    justify-content: space-between;
}

.even {
    justify-content: space-evenly;
}
\`\`\`

## Wrap with Gap:
\`\`\`css
.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
\`\`\`

## Order Property:
\`\`\`css
.first { order: -1; }
.last { order: 1; }
\`\`\`

## Align Self:
\`\`\`css
.container {
    display: flex;
    align-items: flex-start;
}

.special {
    align-self: flex-end;
}
\`\`\`

## Holy Grail Layout:
\`\`\`css
.page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.header, .footer { flex: 0 0 auto; }
.main { flex: 1; }
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property controls how much an item grows?',
                        type: 'multiple-choice',
                        options: ['flex-basis', 'flex-grow', 'flex-expand', 'flex-size'],
                        answer: 1
                    },
                    {
                        prompt: 'What property controls how much an item shrinks?',
                        type: 'multiple-choice',
                        options: ['flex-shrink', 'flex-reduce', 'flex-compress', 'flex-min'],
                        answer: 0
                    },
                    {
                        prompt: 'What justify-content value distributes items with equal space between?',
                        type: 'multiple-choice',
                        options: ['center', 'space-around', 'space-between', 'space-evenly'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED CSS - Responsive Design ============
            {
                id: 'css-22',
                title: 'Media Queries Deep Dive',
                description: 'Responsive design techniques',
                stage: 4,
                content: `
# Media Queries

Adapt to any screen size!

## Common Breakpoints:
\`\`\`css
/* Mobile first approach */
.container {
    padding: 1rem;
}

/* Tablet */
@media (min-width: 768px) {
    .container {
        padding: 2rem;
    }
}

/* Desktop */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
        margin: 0 auto;
    }
}

/* Large desktop */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
}
\`\`\`

## Range Queries:
\`\`\`css
/* Between 768px and 1023px */
@media (min-width: 768px) and (max-width: 1023px) {
    .sidebar {
        display: none;
    }
}

/* Modern syntax */
@media (width >= 768px) and (width < 1024px) {
    /* styles */
}
\`\`\`

## Feature Queries:
\`\`\`css
@media (hover: hover) {
    .button:hover {
        background: blue;
    }
}

@media (prefers-color-scheme: dark) {
    body {
        background: #1a1a1a;
        color: white;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}
\`\`\`

## Container Queries:
\`\`\`css
.card-container {
    container-type: inline-size;
}

@container (min-width: 400px) {
    .card {
        display: flex;
    }
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What media feature detects dark mode preference?',
                        type: 'multiple-choice',
                        options: ['color-mode', 'prefers-color-scheme', 'theme-mode', 'dark-mode'],
                        answer: 1
                    },
                    {
                        prompt: 'What media feature respects reduced motion preferences?',
                        type: 'multiple-choice',
                        options: ['motion-safe', 'prefers-reduced-motion', 'animation-preference', 'reduce-motion'],
                        answer: 1
                    },
                    {
                        prompt: 'What is a container query?',
                        type: 'multiple-choice',
                        options: ['Query based on viewport', 'Query based on element container size', 'Query for mobile', 'Query for tablets'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-23',
                title: 'Responsive Typography',
                description: 'Fluid text sizing',
                stage: 4,
                content: `
# Responsive Typography

Text that scales smoothly!

## Viewport Units:
\`\`\`css
.hero-title {
    font-size: 5vw;  /* 5% of viewport width */
}
\`\`\`

## Clamp Function:
\`\`\`css
/* Min, preferred, max */
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}

p {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
}
\`\`\`

## Type Scale:
\`\`\`css
:root {
    --scale: 1.25;
    --base: 1rem;
    
    --text-sm: calc(var(--base) / var(--scale));
    --text-base: var(--base);
    --text-lg: calc(var(--base) * var(--scale));
    --text-xl: calc(var(--base) * var(--scale) * var(--scale));
    --text-2xl: calc(var(--base) * var(--scale) * var(--scale) * var(--scale));
}

h1 { font-size: var(--text-2xl); }
h2 { font-size: var(--text-xl); }
h3 { font-size: var(--text-lg); }
p { font-size: var(--text-base); }
small { font-size: var(--text-sm); }
\`\`\`

## Line Height:
\`\`\`css
body {
    line-height: 1.6;
}

h1 {
    line-height: 1.2;
}
\`\`\`

## Max Line Length:
\`\`\`css
p {
    max-width: 65ch;  /* ~65 characters */
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function sets min, preferred, and max font sizes?',
                        type: 'multiple-choice',
                        options: ['minmax()', 'clamp()', 'scale()', 'fluid()'],
                        answer: 1
                    },
                    {
                        prompt: 'What unit is based on viewport width?',
                        type: 'multiple-choice',
                        options: ['px', 'em', 'vw', 'rem'],
                        answer: 2
                    },
                    {
                        prompt: 'What is a good maximum line length for readability?',
                        type: 'multiple-choice',
                        options: ['30ch', '65ch', '100ch', '200ch'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED CSS - Pseudo-Elements ============
            {
                id: 'css-24',
                title: 'Pseudo-Elements',
                description: 'Create content with CSS',
                stage: 4,
                content: `
# Pseudo-Elements

Add content without changing HTML!

## ::before and ::after:
\`\`\`css
.quote::before {
    content: '"';
    font-size: 2em;
    color: #ccc;
}

.quote::after {
    content: '"';
    font-size: 2em;
    color: #ccc;
}
\`\`\`

## Decorative Elements:
\`\`\`css
.card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, blue, purple);
}
\`\`\`

## Custom Bullets:
\`\`\`css
.list-item::before {
    content: '→';
    margin-right: 0.5em;
    color: blue;
}
\`\`\`

## First Letter/Line:
\`\`\`css
.article::first-letter {
    font-size: 3em;
    float: left;
    line-height: 1;
    margin-right: 0.1em;
}

.article::first-line {
    font-variant: small-caps;
}
\`\`\`

## Selection Styling:
\`\`\`css
::selection {
    background: blue;
    color: white;
}
\`\`\`

## Placeholder:
\`\`\`css
input::placeholder {
    color: #999;
    font-style: italic;
}
\`\`\`

## Clear Floats:
\`\`\`css
.clearfix::after {
    content: '';
    display: table;
    clear: both;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property is required for ::before and ::after?',
                        type: 'multiple-choice',
                        options: ['display', 'content', 'text', 'value'],
                        answer: 1
                    },
                    {
                        prompt: 'What pseudo-element styles the first letter?',
                        type: 'multiple-choice',
                        options: ['::initial', '::first-letter', '::start', '::letter'],
                        answer: 1
                    },
                    {
                        prompt: 'What pseudo-element styles selected text?',
                        type: 'multiple-choice',
                        options: ['::highlight', '::selected', '::selection', '::marked'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'css-25',
                title: 'Pseudo-Classes Deep Dive',
                description: 'Advanced state selectors',
                stage: 4,
                content: `
# Advanced Pseudo-Classes

Select elements by state!

## Structural Selectors:
\`\`\`css
/* First and last */
li:first-child { }
li:last-child { }

/* Nth child */
li:nth-child(odd) { }
li:nth-child(even) { }
li:nth-child(3n) { }     /* Every 3rd */
li:nth-child(3n+1) { }   /* 1st, 4th, 7th... */

/* From end */
li:nth-last-child(2) { } /* 2nd from end */

/* Only child */
p:only-child { }
\`\`\`

## Form States:
\`\`\`css
input:focus { outline: 2px solid blue; }
input:focus-visible { } /* Keyboard focus only */
input:focus-within { }  /* Child has focus */

input:valid { border-color: green; }
input:invalid { border-color: red; }
input:required { }
input:optional { }
input:disabled { opacity: 0.5; }
input:checked { }
input:placeholder-shown { }
\`\`\`

## Not and Has:
\`\`\`css
/* Everything except */
button:not(.primary) { }
input:not([type="submit"]) { }

/* Has selector (parent selection!) */
.card:has(img) { }
.form:has(:invalid) { }
.parent:has(> .child) { }
\`\`\`

## Is and Where:
\`\`\`css
/* Group selectors */
:is(h1, h2, h3) { color: blue; }
:where(header, footer) a { } /* Zero specificity */
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What pseudo-class selects based on child content?',
                        type: 'multiple-choice',
                        options: [':contains()', ':has()', ':with()', ':includes()'],
                        answer: 1
                    },
                    {
                        prompt: 'What pseudo-class selects every third item?',
                        type: 'multiple-choice',
                        options: [':every(3)', ':nth-child(3n)', ':count(3)', ':third-child'],
                        answer: 1
                    },
                    {
                        prompt: 'What pseudo-class applies when an input is valid?',
                        type: 'multiple-choice',
                        options: [':correct', ':valid', ':success', ':pass'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED CSS - Filters and Effects ============
            {
                id: 'css-26',
                title: 'CSS Filters',
                description: 'Image and element effects',
                stage: 4,
                content: `
# CSS Filters

Apply visual effects!

## Available Filters:
\`\`\`css
.filtered {
    /* Blur */
    filter: blur(5px);
    
    /* Brightness (0 = black, 1 = normal, 2 = bright) */
    filter: brightness(1.5);
    
    /* Contrast */
    filter: contrast(150%);
    
    /* Grayscale */
    filter: grayscale(100%);
    
    /* Hue rotation */
    filter: hue-rotate(90deg);
    
    /* Invert colors */
    filter: invert(100%);
    
    /* Reduce opacity */
    filter: opacity(50%);
    
    /* Saturate */
    filter: saturate(200%);
    
    /* Sepia */
    filter: sepia(100%);
    
    /* Drop shadow */
    filter: drop-shadow(4px 4px 8px rgba(0,0,0,0.3));
}
\`\`\`

## Multiple Filters:
\`\`\`css
.image {
    filter: brightness(1.1) contrast(1.1) saturate(1.2);
}
\`\`\`

## Hover Effects:
\`\`\`css
.card img {
    transition: filter 0.3s;
}

.card:hover img {
    filter: brightness(1.1) saturate(1.2);
}

.grayscale:hover {
    filter: grayscale(0);
}
\`\`\`

## Backdrop Filter:
\`\`\`css
.glass {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What filter creates a glass-like blur effect on backgrounds?',
                        type: 'multiple-choice',
                        options: ['filter: blur()', 'backdrop-filter', 'background-filter', 'glass-filter'],
                        answer: 1
                    },
                    {
                        prompt: 'What filter converts an image to grayscale?',
                        type: 'multiple-choice',
                        options: ['gray()', 'grayscale()', 'black-white()', 'mono()'],
                        answer: 1
                    },
                    {
                        prompt: 'What filter adjusts image brightness?',
                        type: 'multiple-choice',
                        options: ['light()', 'brightness()', 'bright()', 'lighten()'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'css-27',
                title: 'Blend Modes',
                description: 'Blend colors and images',
                stage: 4,
                content: `
# CSS Blend Modes

Mix colors and layers!

## Mix Blend Mode:
\`\`\`css
.overlay {
    mix-blend-mode: multiply;
}

.text-overlay {
    color: white;
    mix-blend-mode: difference;
}
\`\`\`

## Blend Modes:
\`\`\`css
/* Darken modes */
mix-blend-mode: multiply;
mix-blend-mode: darken;
mix-blend-mode: color-burn;

/* Lighten modes */
mix-blend-mode: screen;
mix-blend-mode: lighten;
mix-blend-mode: color-dodge;

/* Contrast modes */
mix-blend-mode: overlay;
mix-blend-mode: soft-light;
mix-blend-mode: hard-light;

/* Comparative modes */
mix-blend-mode: difference;
mix-blend-mode: exclusion;

/* Component modes */
mix-blend-mode: hue;
mix-blend-mode: saturation;
mix-blend-mode: color;
mix-blend-mode: luminosity;
\`\`\`

## Background Blend Mode:
\`\`\`css
.hero {
    background-image: 
        linear-gradient(blue, purple),
        url(image.jpg);
    background-blend-mode: overlay;
}

.duotone {
    background: 
        linear-gradient(#ff6b6b, #4ecdc4),
        url(photo.jpg);
    background-blend-mode: multiply;
    background-size: cover;
}
\`\`\`

## Practical Uses:
- Duotone effects
- Text overlays on images
- Creative photo effects
- Color tinting
        `,
                exercises: [
                    {
                        prompt: 'What property blends element with elements behind it?',
                        type: 'multiple-choice',
                        options: ['background-blend-mode', 'mix-blend-mode', 'layer-blend', 'color-blend'],
                        answer: 1
                    },
                    {
                        prompt: 'What property blends multiple backgrounds together?',
                        type: 'multiple-choice',
                        options: ['mix-blend-mode', 'background-blend-mode', 'image-blend', 'layer-mix'],
                        answer: 1
                    },
                    {
                        prompt: 'What blend mode multiplies colors together?',
                        type: 'multiple-choice',
                        options: ['overlay', 'screen', 'multiply', 'darken'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED CSS - Scroll Effects ============
            {
                id: 'css-28',
                title: 'Scroll Snap',
                description: 'Smooth snapping scroll behavior',
                stage: 4,
                content: `
# CSS Scroll Snap

Create smooth, snapping scroll experiences!

## Basic Scroll Snap:
\`\`\`css
.container {
    scroll-snap-type: x mandatory;
    overflow-x: scroll;
    display: flex;
}

.slide {
    scroll-snap-align: start;
    flex: 0 0 100%;
}
\`\`\`

## Vertical Scroll Snap:
\`\`\`css
.fullpage {
    height: 100vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

.section {
    height: 100vh;
    scroll-snap-align: start;
}
\`\`\`

## Snap Types:
\`\`\`css
/* Mandatory: Always snap */
scroll-snap-type: y mandatory;

/* Proximity: Snap when close */
scroll-snap-type: y proximity;
\`\`\`

## Snap Alignment:
\`\`\`css
.item {
    scroll-snap-align: start;   /* Top/left */
    scroll-snap-align: center;  /* Center */
    scroll-snap-align: end;     /* Bottom/right */
}
\`\`\`

## Smooth Scrolling:
\`\`\`css
html {
    scroll-behavior: smooth;
}

/* Click anchor links scroll smoothly */
\`\`\`

## Scroll Padding:
\`\`\`css
.container {
    scroll-padding: 20px;  /* Account for fixed header */
}
\`\`\`

## Gallery Example:
\`\`\`css
.gallery {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    padding: 1rem;
}

.gallery img {
    scroll-snap-align: center;
    flex: 0 0 80%;
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property defines snap behavior strength?',
                        type: 'multiple-choice',
                        options: ['scroll-snap-align', 'scroll-snap-type', 'scroll-snap-force', 'scroll-snap-mode'],
                        answer: 1
                    },
                    {
                        prompt: 'What property defines where items snap to?',
                        type: 'multiple-choice',
                        options: ['scroll-snap-type', 'scroll-snap-align', 'scroll-snap-position', 'scroll-snap-point'],
                        answer: 1
                    },
                    {
                        prompt: 'What property enables smooth scrolling?',
                        type: 'multiple-choice',
                        options: ['scroll-type', 'scroll-behavior', 'scroll-smooth', 'scroll-style'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED CSS - Functions ============
            {
                id: 'css-29',
                title: 'CSS Functions',
                description: 'calc(), min(), max(), and more',
                stage: 4,
                content: `
# CSS Functions

Dynamic values with functions!

## calc():
\`\`\`css
.sidebar {
    width: calc(100% - 250px);
}

.center {
    margin-left: calc(50% - 150px);
}

/* Mix units! */
.padded {
    height: calc(100vh - 4rem);
}
\`\`\`

## min() and max():
\`\`\`css
.container {
    width: min(1200px, 100%);
    /* Takes the smaller value */
}

.image {
    height: max(300px, 50vh);
    /* Takes the larger value */
}
\`\`\`

## clamp():
\`\`\`css
/* clamp(min, preferred, max) */
h1 {
    font-size: clamp(1.5rem, 5vw, 3rem);
}

.container {
    width: clamp(300px, 80%, 1200px);
}
\`\`\`

## var() with Fallbacks:
\`\`\`css
.element {
    color: var(--primary, blue);
    padding: var(--spacing, 1rem);
}
\`\`\`

## Color Functions:
\`\`\`css
.element {
    background: rgb(255, 100, 50);
    background: rgba(255, 100, 50, 0.5);
    background: hsl(20, 100%, 60%);
    background: hsla(20, 100%, 60%, 0.5);
}
\`\`\`

## url() and attr():
\`\`\`css
.bg {
    background-image: url(image.jpg);
}

.link::after {
    content: attr(href);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What function allows mixing different units?',
                        type: 'multiple-choice',
                        options: ['mix()', 'calc()', 'combine()', 'math()'],
                        answer: 1
                    },
                    {
                        prompt: 'What function returns the smaller of two values?',
                        type: 'multiple-choice',
                        options: ['smaller()', 'min()', 'least()', 'lower()'],
                        answer: 1
                    },
                    {
                        prompt: 'What function provides a fallback for CSS variables?',
                        type: 'multiple-choice',
                        options: ['fallback()', 'default()', 'var()', 'backup()'],
                        answer: 2
                    }
                ]
            },
            // ============ ADVANCED CSS - Shapes ============
            {
                id: 'css-30',
                title: 'CSS Shapes',
                description: 'Non-rectangular layouts',
                stage: 4,
                content: `
# CSS Shapes

Create non-rectangular designs!

## Clip Path:
\`\`\`css
/* Basic shapes */
.circle {
    clip-path: circle(50%);
}

.ellipse {
    clip-path: ellipse(50% 30% at 50% 50%);
}

.polygon {
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
}
\`\`\`

## Common Shapes:
\`\`\`css
/* Triangle */
clip-path: polygon(50% 0%, 0% 100%, 100% 100%);

/* Diamond */
clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

/* Hexagon */
clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);

/* Arrow */
clip-path: polygon(0% 20%, 60% 20%, 60% 0%, 100% 50%, 60% 100%, 60% 80%, 0% 80%);
\`\`\`

## Shape Outside (for text):
\`\`\`css
.floated-image {
    float: left;
    shape-outside: circle(50%);
    clip-path: circle(50%);
    margin: 20px;
}
/* Text wraps around the shape! */
\`\`\`

## Animated Shapes:
\`\`\`css
.morph {
    clip-path: circle(50%);
    transition: clip-path 0.5s;
}

.morph:hover {
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
\`\`\`

## Practical: Angled Sections:
\`\`\`css
.section {
    clip-path: polygon(0 0, 100% 0, 100% 85%, 0 100%);
}
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property clips an element to a shape?',
                        type: 'multiple-choice',
                        options: ['shape', 'clip-path', 'mask-shape', 'cut-path'],
                        answer: 1
                    },
                    {
                        prompt: 'What function creates a circular clip?',
                        type: 'multiple-choice',
                        options: ['round()', 'circle()', 'oval()', 'ring()'],
                        answer: 1
                    },
                    {
                        prompt: 'What property makes text wrap around a shape?',
                        type: 'multiple-choice',
                        options: ['text-wrap', 'shape-outside', 'wrap-shape', 'flow-around'],
                        answer: 1
                    }
                ]
            },
            // ============ ADVANCED CSS - Aspect Ratio & Containment ============
            {
                id: 'css-31',
                title: 'Modern CSS Properties',
                description: 'Aspect ratio, containment, and more',
                stage: 4,
                content: `
# Modern CSS Features

New powerful properties!

## Aspect Ratio:
\`\`\`css
.video-container {
    aspect-ratio: 16 / 9;
    width: 100%;
}

.square {
    aspect-ratio: 1;
}

.portrait {
    aspect-ratio: 3 / 4;
}
\`\`\`

## Object Fit:
\`\`\`css
img {
    width: 100%;
    height: 300px;
    object-fit: cover;      /* Fill, crop if needed */
    object-fit: contain;    /* Fit inside, may letterbox */
    object-fit: fill;       /* Stretch to fill */
    object-position: center top;
}
\`\`\`

## Gap (for Flex and Grid):
\`\`\`css
.container {
    display: flex;
    gap: 1rem;
    gap: 1rem 2rem;  /* row column */
    row-gap: 1rem;
    column-gap: 2rem;
}
\`\`\`

## Accent Color:
\`\`\`css
:root {
    accent-color: #6366f1;
}
/* Affects checkboxes, radios, range inputs */
\`\`\`

## Logical Properties:
\`\`\`css
.element {
    margin-inline: auto;       /* Left/right */
    padding-block: 1rem;       /* Top/bottom */
    border-inline-start: 1px;  /* Left in LTR */
    inset: 0;                  /* All sides */
}
\`\`\`

## Content Visibility:
\`\`\`css
.lazy-section {
    content-visibility: auto;
    contain-intrinsic-size: 500px;
}
/* Browser skips rendering off-screen content */
\`\`\`
        `,
                exercises: [
                    {
                        prompt: 'What property maintains width-to-height ratio?',
                        type: 'multiple-choice',
                        options: ['ratio', 'aspect-ratio', 'size-ratio', 'proportion'],
                        answer: 1
                    },
                    {
                        prompt: 'What object-fit value fills area while maintaining ratio?',
                        type: 'multiple-choice',
                        options: ['fill', 'contain', 'cover', 'scale'],
                        answer: 2
                    },
                    {
                        prompt: 'What property adds space between flex/grid items?',
                        type: 'multiple-choice',
                        options: ['margin', 'spacing', 'gap', 'space'],
                        answer: 2
                    }
                ]
            },
            // ============ CSS Final Project ============
            {
                id: 'css-32',
                title: 'Complete CSS Mastery',
                description: 'Build a complete styled component',
                stage: 4,
                content: `
# CSS Mastery

You've mastered CSS! Here's a complete example:

\`\`\`css
/* Modern Card Component with all techniques */
:root {
    --primary: #6366f1;
    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --radius: 12px;
}

.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    padding: 1rem;
}

.card {
    background: white;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    overflow: hidden;
    transition: transform 0.3s, box-shadow 0.3s;
    container-type: inline-size;
}

.card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 20px -5px rgb(0 0 0 / 0.15);
}

.card img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
    transition: filter 0.3s;
}

.card:hover img {
    filter: brightness(1.1);
}

.card-content {
    padding: clamp(1rem, 4cqw, 1.5rem);
}

.card h2 {
    font-size: clamp(1.25rem, 3cqw, 1.5rem);
    color: var(--primary);
    margin-bottom: 0.5rem;
}

.card p {
    color: #666;
    line-height: 1.6;
    max-width: 65ch;
}

.card .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
}

.tag {
    padding: 0.25rem 0.75rem;
    background: hsl(var(--primary-hue) 80% 95%);
    color: var(--primary);
    border-radius: 999px;
    font-size: 0.875rem;
}

@media (prefers-reduced-motion: reduce) {
    .card { transition: none; }
}

@media (prefers-color-scheme: dark) {
    .card {
        background: #1f2937;
    }
    .card p {
        color: #9ca3af;
    }
}
\`\`\`

Congratulations! You've mastered CSS! 🎉
        `,
                exercises: [
                    {
                        prompt: 'What CSS function is best for responsive sizing with min/max bounds?',
                        type: 'multiple-choice',
                        options: ['min()', 'max()', 'calc()', 'clamp()'],
                        answer: 3
                    },
                    {
                        prompt: 'What approach respects user preferences for reduced motion?',
                        type: 'multiple-choice',
                        options: ['Using @media (prefers-reduced-motion)', 'Disabling all animations', 'Using only transitions', 'Limiting animation duration'],
                        answer: 0
                    },
                    {
                        prompt: 'What is a CSS custom property?',
                        type: 'multiple-choice',
                        options: ['A new CSS rule', 'A CSS variable defined with --', 'A browser feature', 'A JavaScript property'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // Java Course - Natural Language → Real Java Progression
    'java': {
        id: 'java',
        name: 'Java',
        description: 'Learn Java, a powerful language for applications and Android. From natural language to real code.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '☕',
        color: '#007396',
        language: 'java',
        prerequisites: ['intro-logic'],
        estimatedHours: 16,
        lessons: [
            // ============ STAGE 1: Pure Natural Language ============
            {
                id: 'java-1',
                title: 'Hello Java!',
                description: 'Your first Java program',
                stage: 1,
                content: `
# Hello Java!

Java is used everywhere - Android apps, enterprise software, games!

## Displaying Messages:
\`\`\`
display "Hello, World!"
\`\`\`

When you run this, it shows: Hello, World!

## More Examples:
\`\`\`
display "Welcome to Java!"
display "Java is powerful!"
display 42
\`\`\`

## What Makes Java Special:
- Runs on any computer ("Write once, run anywhere")
- Very reliable and secure
- Used by millions of developers
        `,
                exercises: [
                    {
                        prompt: 'Display "I love Java!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'I love Java!',
                        hint: 'Use: display "I love Java!"'
                    },
                    {
                        prompt: 'What makes Java special for running on different computers?',
                        type: 'multiple-choice',
                        options: ['Fast compilation', 'Write once, run anywhere', 'Small file size', 'Simple syntax'],
                        answer: 1
                    },
                    {
                        prompt: 'Display the number 100',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '100',
                        hint: 'Use: display 100'
                    }
                ]
            },
            {
                id: 'java-2',
                title: 'Typed Variables',
                description: 'Java requires types for every variable',
                stage: 1,
                content: `
# Variables with Types

Java needs to know what TYPE of data you're storing!

## Number (whole numbers):
\`\`\`
create number variable age to 25
create number variable score to 100
\`\`\`

## Decimal Numbers:
\`\`\`
create decimal variable price to 19.99
create decimal variable temperature to 98.6
\`\`\`

## Text:
\`\`\`
create text variable name to "Alice"
create text variable message to "Hello!"
\`\`\`

## True/False:
\`\`\`
create boolean variable isActive to true value
create boolean variable hasWon to false value
\`\`\`

## Display Variables:
\`\`\`
create number variable x to 42
display x
\`\`\`

Output: 42
        `,
                exercise: {
                    prompt: 'Create a text variable "city" set to "Tokyo" and display it',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Tokyo',
                    hint: 'create text variable city to "Tokyo"\\ndisplay city'
                }
            },
            {
                id: 'java-3',
                title: 'Math Operations',
                description: 'Calculations with typed results',
                stage: 1,
                content: `
# Math in Java

## Basic Operations:
\`\`\`
display 10 plus 5
display 20 minus 8
display 6 times 7
display 100 divided by 4
display 17 modulo 5
\`\`\`

Output:
15
12
42
25
2

## With Variables:
\`\`\`
create number variable a to 10
create number variable b to 3
create number variable sum to a plus b
display sum
\`\`\`

Output: 13

## Integer Division (Important!):
In Java, dividing two numbers gives a whole number!
\`\`\`
display 7 divided by 2
\`\`\`
Output: 3 (not 3.5!)

Use decimals to get decimal results.
        `,
                exercises: [
                    {
                        prompt: 'Calculate 8 times 9 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '72',
                        hint: 'Use: display 8 times 9'
                    },
                    {
                        prompt: 'What is 7 divided by 2 in Java integer division?',
                        type: 'multiple-choice',
                        options: ['3.5', '3', '4', '7/2'],
                        answer: 1
                    },
                    {
                        prompt: 'Calculate 15 modulo 4 and display it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: '3',
                        hint: 'Use: display 15 modulo 4'
                    }
                ]
            },
            {
                id: 'java-4',
                title: 'Conditions',
                description: 'Making decisions in Java',
                stage: 1,
                content: `
# Making Decisions

## Basic If:
\`\`\`
create number variable age to 20
if age is greater than or equal to 18 then
    display "You can vote!"
end if
\`\`\`

Output: You can vote!

## If with Otherwise:
\`\`\`
create number variable score to 45
if score is greater than or equal to 50 then
    display "Pass!"
otherwise
    display "Keep trying!"
end if
\`\`\`

Output: Keep trying!

## Multiple Conditions:
\`\`\`
create number variable grade to 85
if grade is greater than or equal to 90 then
    display "A"
otherwise if grade is greater than or equal to 80 then
    display "B"
otherwise
    display "C or below"
end if
\`\`\`

Output: B
        `,
                exercise: {
                    prompt: 'Create number variable points to 75. If points >= 60, display "Winner!"',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Winner!',
                    hint: 'if points is greater than or equal to 60 then\\n    display "Winner!"\\nend if'
                },
                exercises: [
                    {
                        prompt: 'Create number variable points to 75. If points >= 60, display "Winner!"',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Winner!',
                        hint: 'if points is greater than or equal to 60 then\\n    display "Winner!"\\nend if'
                    },
                    {
                        prompt: 'What keyword handles the "else" case?',
                        type: 'multiple-choice',
                        options: ['else', 'otherwise', 'other', 'default'],
                        answer: 1
                    },
                    {
                        prompt: 'What ends a conditional block?',
                        type: 'multiple-choice',
                        options: ['end', 'end if', 'endif', 'close'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'java-5',
                title: 'Loops',
                description: 'Repeating actions',
                stage: 1,
                content: `
# Loops in Java

## Repeat N Times:
\`\`\`
repeat 4 times
    display "Java!"
end loop
\`\`\`

Output:
Java!
Java!
Java!
Java!

## Counting Loop:
\`\`\`
create number variable i to 1
repeat 3 times
    display i
    set i to i plus 1
end loop
\`\`\`

Output:
1
2
3

## While Loop:
\`\`\`
create number variable count to 0
repeat while count is less than 3 do
    display count
    set count to count plus 1
end repeat
\`\`\`

Output:
0
1
2
        `,
                exercise: {
                    prompt: 'Write a loop that displays "Code!" 3 times',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Code!\nCode!\nCode!',
                    hint: 'repeat 3 times\\n    display "Code!"\\nend loop'
                },
                exercises: [
                    {
                        prompt: 'Write a loop that displays "Code!" 3 times',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Code!\nCode!\nCode!',
                        hint: 'repeat 3 times\\n    display "Code!"\\nend loop'
                    },
                    {
                        prompt: 'What kind of loop repeats while a condition is true?',
                        type: 'multiple-choice',
                        options: ['for loop', 'while loop', 'repeat loop', 'count loop'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you end a loop block?',
                        type: 'multiple-choice',
                        options: ['end', 'end loop', 'stop', 'break'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'java-6',
                title: 'Functions (Methods)',
                description: 'Reusable code blocks',
                stage: 1,
                content: `
# Methods in Java

Methods are reusable code blocks (called "functions" in other languages).

## Simple Method:
\`\`\`
define function greet with no parameters
    display "Hello, World!"
end function

greet
\`\`\`

Output: Hello, World!

## Method with Parameters:
\`\`\`
define function sayHi with parameters name
    display "Hi, " plus name plus "!"
end function

sayHi "Alice"
sayHi "Bob"
\`\`\`

Output:
Hi, Alice!
Hi, Bob!

## Method with Return:
\`\`\`
define function add with parameters a, b
    return a plus b
end function

display add 5, 3
\`\`\`

Output: 8
        `,
                exercise: {
                    prompt: 'Define function "cheer" that displays "Hooray!" and call it',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Hooray!',
                    hint: 'define function cheer with no parameters\\n    display "Hooray!"\\nend function\\ncheer'
                },
                exercises: [
                    {
                        prompt: 'Define function "cheer" that displays "Hooray!" and call it',
                        type: 'code',
                        language: 'natural',
                        expectedOutput: 'Hooray!',
                        hint: 'define function cheer with no parameters\\n    display "Hooray!"\\nend function\\ncheer'
                    },
                    {
                        prompt: 'What keyword returns a value from a function?',
                        type: 'multiple-choice',
                        options: ['give', 'output', 'return', 'send'],
                        answer: 2
                    },
                    {
                        prompt: 'What are methods called in Java?',
                        type: 'multiple-choice',
                        options: ['functions', 'procedures', 'methods', 'routines'],
                        answer: 2
                    }
                ]
            },
            // ============ STAGE 2: Introducing Symbols ============
            {
                id: 'java-7',
                title: 'Math Symbols',
                description: 'Using +, -, *, /',
                stage: 2,
                content: `
# Math Symbols

Let's use real operators!

## Symbol Translation:
| Words | Symbol |
|-------|--------|
| plus | + |
| minus | - |
| times | * |
| divided by | / |
| modulo | % |

## Examples:
\`\`\`
display 10 + 5
display 20 - 8
display 6 * 7
display 15 / 3
display 17 % 5
\`\`\`

Output:
15
12
42
5
2
        `,
                exercise: {
                    prompt: 'Calculate 12 * 5 + 3 and display it',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: '63',
                    hint: 'Use: display 12 * 5 + 3'
                }
            },
            {
                id: 'java-8',
                title: 'Comparison Symbols',
                description: 'Using <, >, ==, !=',
                stage: 2,
                content: `
# Comparison Symbols

| Words | Symbol |
|-------|--------|
| is less than | < |
| is greater than | > |
| is less than or equal to | <= |
| is greater than or equal to | >= |
| is equal to | == |
| is not equal to | != |

## Before:
\`\`\`
if age is greater than or equal to 18 then
\`\`\`

## Now:
\`\`\`
if age >= 18 then
\`\`\`

## Example:
\`\`\`
create number variable score = 85
if score >= 70 then
    display "Pass!"
end if
\`\`\`

Output: Pass!
        `,
                exercise: {
                    prompt: 'Create number variable x = 100. If x > 50, display "Big!"',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Big!',
                    hint: 'Use: if x > 50 then'
                }
            },
            {
                id: 'java-9',
                title: 'Logical Operators',
                description: 'Combining conditions',
                stage: 2,
                content: `
# Logical Operators

Combine multiple conditions!

## AND - Both must be true:
\`\`\`
create number variable age = 25
create boolean variable hasLicense = true value
if age >= 18 and hasLicense then
    display "Can drive!"
end if
\`\`\`

Output: Can drive!

## OR - At least one true:
\`\`\`
create text variable day = "Saturday"
if day == "Saturday" or day == "Sunday" then
    display "Weekend!"
end if
\`\`\`

Output: Weekend!

## NOT:
\`\`\`
create boolean variable isGameOver = false value
if not isGameOver then
    display "Keep playing!"
end if
\`\`\`

Output: Keep playing!
        `,
                exercise: {
                    prompt: 'Create number variable temp = 25. If temp >= 20 and temp <= 30, display "Nice weather"',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'Nice weather',
                    hint: 'Use: if temp >= 20 and temp <= 30 then'
                }
            },
            // ============ STAGE 3: Code-Like Structure ============
            {
                id: 'java-10',
                title: 'Real Java Types',
                description: 'int, double, String, boolean',
                stage: 3,
                content: `
# Java Data Types

## Translation:
| Natural | Java |
|---------|------|
| number variable | int |
| decimal variable | double |
| text variable | String |
| boolean variable | boolean |

## Examples:
\`\`\`java
int age = 25;
double price = 19.99;
String name = "Alice";
boolean isActive = true;
\`\`\`

## Important:
- Every statement ends with \`;\ `
                    - String uses capital S
- No "create" keyword
                `,
                exercise: {
                    prompt: 'What Java type stores whole numbers?',
                    type: 'multiple-choice',
                    options: ['number', 'int', 'integer', 'whole'],
                    answer: 1
                }
            },
            {
                id: 'java-11',
                title: 'System.out.println',
                description: 'Real Java output',
                stage: 3,
                content: `
# Java Output

## Translation:
| Natural | Java |
| ---------| ------|
| display "Hello" | System.out.println("Hello"); |
| display x | System.out.println(x); |

## Examples:
\`\`\`java
System.out.println("Hello, Java!");
System.out.println(42);

int score = 100;
System.out.println(score);
System.out.println("Score: " + score);
\`\`\`

Output:
Hello, Java!
42
100
Score: 100

## String Concatenation:
Use + to combine strings!
\`\`\`java
String name = "Alice";
System.out.println("Hello, " + name + "!");
\`\`\`

Output: Hello, Alice!
        `,
    exercise: {
    prompt: 'Write Java to print "Java rocks!"',
        type: 'code',
            language: 'java',
                expectedOutput: 'System.out.println("Java rocks!");',
                    hint: 'Use: System.out.println("Java rocks!");'
}
            },
{
    id: 'java-12',
        title: 'Java If Statements',
            description: 'Braces and parentheses',
                stage: 3,
                    content: `
# Java If Syntax

## Translation:
| Natural | Java |
|---------|------|
| if ... then | if (...) { |
| end if | } |
| otherwise | } else { |
| otherwise if | } else if (...) { |

## Example:
\`\`\`java
int age = 20;
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}
\`\`\`

Output: Adult

## Key Points:
- Condition in parentheses ()
- Code blocks in braces {}
- Semicolons after statements
        `,
                        exercise: {
        prompt: 'What wraps the condition in Java if statements?',
            type: 'multiple-choice',
                options: ['{ }', '[ ]', '( )', '< >'],
                    answer: 2
    }
},
{
    id: 'java-13',
        title: 'Java For Loops',
            description: 'The classic for loop',
                stage: 3,
                    content: `
# Java For Loop

## Format:
\`\`\`java
for (init; condition; update) {
    // code
}
\`\`\`

## Example:
\`\`\`java
for (int i = 0; i < 3; i++) {
    System.out.println(i);
}
\`\`\`

Output:
0
1
2

## Breaking Down:
- \`int i = 0\` - Start at 0
- \`i < 3\` - Continue while less than 3
- \`i++\` - Add 1 each time

## While Loop:
\`\`\`java
int count = 0;
while (count < 3) {
    System.out.println(count);
    count++;
}
\`\`\`

Same output!
        `,
                        exercise: {
        prompt: 'What does i++ do?',
            type: 'multiple-choice',
                options: ['Multiply by 2', 'Add 1', 'Subtract 1', 'Reset to 0'],
                    answer: 1
    }
},
{
    id: 'java-14',
        title: 'Java Methods',
            description: 'Defining methods with types',
                stage: 3,
                    content: `
# Java Methods

Methods need return types!

## Void Method (no return):
\`\`\`java
public static void greet() {
    System.out.println("Hello!");
}

// Call it:
greet();
\`\`\`

## Method with Return:
\`\`\`java
public static int add(int a, int b) {
    return a + b;
}

// Call it:
int result = add(5, 3);
System.out.println(result); // 8
\`\`\`

## Parts:
- \`public static\` - Accessibility (for now)
- \`int\` - Return type
- \`add\` - Method name
- \`(int a, int b)\` - Parameters with types
        `,
                        exercise: {
        prompt: 'What return type means "returns nothing"?',
            type: 'multiple-choice',
                options: ['null', 'none', 'void', 'empty'],
                    answer: 2
    }
},
// ============ STAGE 4: Full Java ============
{
    id: 'java-15',
        title: 'Java Class Structure',
            description: 'The main class and method',
                stage: 4,
                    content: `
# Java Program Structure

Every Java program needs a class!

## Basic Structure:
\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

## Parts Explained:
- \`public class Main\` - Defines the class
- \`public static void main\` - Entry point
- \`String[] args\` - Command line arguments
- Code goes inside main method

## Adding Methods:
\`\`\`java
public class Main {
    public static void main(String[] args) {
        greet();
        System.out.println(add(5, 3));
    }
    
    public static void greet() {
        System.out.println("Hello!");
    }
    
    public static int add(int a, int b) {
        return a + b;
    }
}
\`\`\`
        `,
                        exercise: {
        prompt: 'What is the entry point of a Java program called?',
            type: 'multiple-choice',
                options: ['start()', 'run()', 'main()', 'begin()'],
                    answer: 2
    }
},
{
    id: 'java-16',
        title: 'Arrays',
            description: 'Fixed-size collections',
                stage: 4,
                    content: `
# Java Arrays

Arrays hold multiple values of the same type!

## Creating Arrays:
\`\`\`java
int[] numbers = {1, 2, 3, 4, 5};
String[] names = {"Alice", "Bob", "Charlie"};
\`\`\`

## Accessing Elements:
\`\`\`java
System.out.println(numbers[0]); // 1
System.out.println(names[2]);   // Charlie
\`\`\`

## Array Length:
\`\`\`java
System.out.println(numbers.length); // 5
\`\`\`

## Looping:
\`\`\`java
for (int i = 0; i < numbers.length; i++) {
    System.out.println(numbers[i]);
}

// Or enhanced for loop:
for (int num : numbers) {
    System.out.println(num);
}
\`\`\`
        `,
                        exercise: {
        prompt: 'How do you get the length of array arr?',
            type: 'multiple-choice',
                options: ['arr.length()', 'arr.size', 'arr.length', 'len(arr)'],
                    answer: 2
    }
},
{
    id: 'java-17',
        title: 'ArrayList',
            description: 'Dynamic lists',
                stage: 4,
                    content: `
# ArrayList - Dynamic Arrays

Arrays have fixed size. ArrayList can grow!

## Import First:
\`\`\`java
import java.util.ArrayList;
\`\`\`

## Creating:
\`\`\`java
ArrayList<String> names = new ArrayList<>();
ArrayList<Integer> numbers = new ArrayList<>();
\`\`\`

## Operations:
\`\`\`java
ArrayList<String> fruits = new ArrayList<>();

fruits.add("Apple");
fruits.add("Banana");
fruits.add("Orange");

System.out.println(fruits.get(0));  // Apple
System.out.println(fruits.size());  // 3

fruits.remove("Banana");
System.out.println(fruits.size());  // 2
\`\`\`

## Note:
Use \`Integer\` not \`int\` with ArrayList!
        `,
                        exercise: {
        prompt: 'What method adds an item to ArrayList?',
            type: 'multiple-choice',
                options: ['push()', 'append()', 'add()', 'insert()'],
                    answer: 2
    }
},
{
    id: 'java-18',
        title: 'Object-Oriented Basics',
            description: 'Classes and objects',
                stage: 4,
                    content: `
# Object-Oriented Programming

Java is all about objects!

## Defining a Class:
\`\`\`java
public class Person {
    String name;
    int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void greet() {
        System.out.println("Hi, I'm " + name);
    }
}
\`\`\`

## Creating Objects:
\`\`\`java
Person alice = new Person("Alice", 25);
Person bob = new Person("Bob", 30);

alice.greet(); // Hi, I'm Alice
bob.greet();   // Hi, I'm Bob

System.out.println(alice.age); // 25
\`\`\`

## Key Concepts:
- **Class**: Blueprint
- **Object**: Instance of a class
- **Constructor**: Creates new objects
        `,
                        exercise: {
        prompt: 'What keyword creates a new object?',
            type: 'multiple-choice',
                options: ['create', 'make', 'new', 'init'],
                    answer: 2
    }
},
{
    id: 'java-19',
        title: 'Complete Java Program',
            description: 'Putting it all together',
                stage: 4,
                    content: `
# Complete Java Program

You can now write full Java programs!

## Example: Grade Calculator
\`\`\`java
import java.util.ArrayList;

public class GradeCalculator {
    public static void main(String[] args) {
        ArrayList<Integer> scores = new ArrayList<>();
        scores.add(85);
        scores.add(92);
        scores.add(78);
        scores.add(96);
        
        int sum = 0;
        for (int score : scores) {
            sum += score;
        }
        
        double average = (double) sum / scores.size();
        System.out.println("Average: " + average);
        
        if (average >= 90) {
            System.out.println("Grade: A");
        } else if (average >= 80) {
            System.out.println("Grade: B");
        } else if (average >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: F");
        }
    }
}
\`\`\`

Output:
Average: 87.75
Grade: B

Keep building with Java! 🎉
        `,
                        exercise: {
        prompt: 'What are the four main pillars of OOP?',
            type: 'multiple-choice',
                options: ['Fast, Secure, Portable, Free', 'Encapsulation, Inheritance, Polymorphism, Abstraction', 'Classes, Objects, Methods, Variables', 'Input, Process, Output, Storage'],
                    answer: 1
    }
},
// ============ ADVANCED JAVA - Inheritance ============
{
    id: 'java-20',
        title: 'Inheritance Basics',
            description: 'Extend classes to reuse code',
                stage: 4,
                    content: `
# Inheritance

Create new classes based on existing ones!

## extends Keyword:
\`\`\`java
class Animal {
    String name;
    
    void eat() {
        System.out.println(name + " is eating");
    }
}

class Dog extends Animal {
    void bark() {
        System.out.println(name + " says Woof!");
    }
}

// Usage
Dog dog = new Dog();
dog.name = "Buddy";
dog.eat();   // Inherited method
dog.bark();  // Dog's own method
\`\`\`

## super Keyword:
\`\`\`java
class Animal {
    Animal(String name) {
        this.name = name;
    }
}

class Dog extends Animal {
    String breed;
    
    Dog(String name, String breed) {
        super(name);  // Call parent constructor
        this.breed = breed;
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What keyword creates a subclass?',
            type: 'multiple-choice',
                options: ['inherits', 'extends', 'implements', 'super'],
                    answer: 1
    }
},
{
    id: 'java-21',
        title: 'Method Overriding',
            description: 'Customize inherited behavior',
                stage: 4,
                    content: `
# Method Overriding

Replace parent methods with custom versions!

## @Override Annotation:
\`\`\`java
class Animal {
    void makeSound() {
        System.out.println("Some sound");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Woof!");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Meow!");
    }
}
\`\`\`

## Calling Parent Method:
\`\`\`java
class Dog extends Animal {
    @Override
    void makeSound() {
        super.makeSound();  // Call parent first
        System.out.println("Woof!");
    }
}
\`\`\`

## Polymorphism:
\`\`\`java
Animal[] animals = {new Dog(), new Cat()};
for (Animal a : animals) {
    a.makeSound();  // Calls correct version!
}
// Output: Woof! Meow!
\`\`\`
    `,
                        exercise: {
        prompt: 'What annotation marks an overridden method?',
            type: 'multiple-choice',
                options: ['@Overload', '@Override', '@Replace', '@Extend'],
                    answer: 1
    }
},
{
    id: 'java-22',
        title: 'Abstract Classes',
            description: 'Define incomplete classes',
                stage: 4,
                    content: `
# Abstract Classes

Classes that cannot be instantiated directly!

## Abstract Class:
\`\`\`java
abstract class Shape {
    String color;
    
    // Abstract method - no body
    abstract double getArea();
    
    // Regular method
    void printColor() {
        System.out.println("Color: " + color);
    }
}
\`\`\`

## Implementing Abstract Methods:
\`\`\`java
class Circle extends Shape {
    double radius;
    
    Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle extends Shape {
    double width, height;
    
    @Override
    double getArea() {
        return width * height;
    }
}
\`\`\`

## Usage:
\`\`\`java
// Shape s = new Shape();  // ERROR!
Shape circle = new Circle(5);
System.out.println(circle.getArea());
\`\`\`
    `,
                        exercise: {
        prompt: 'Can you create an instance of an abstract class?',
            type: 'multiple-choice',
                options: ['Yes, always', 'No, never', 'Only with super', 'Only in subclass'],
                    answer: 1
    }
},
{
    id: 'java-23',
        title: 'Interfaces',
            description: 'Define contracts for classes',
                stage: 4,
                    content: `
# Interfaces

Define what a class must do!

## Interface Definition:
\`\`\`java
interface Drawable {
    void draw();  // implicitly public abstract
}

interface Resizable {
    void resize(int factor);
}
\`\`\`

## Implementing Interfaces:
\`\`\`java
class Circle implements Drawable, Resizable {
    double radius;
    
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
    
    @Override
    public void resize(int factor) {
        radius *= factor;
    }
}
\`\`\`

## Default Methods (Java 8+):
\`\`\`java
interface Drawable {
    void draw();
    
    default void show() {
        System.out.println("Showing...");
        draw();
    }
}
\`\`\`

## Interface vs Abstract:
- Interface: Multiple inheritance, no state
- Abstract: Single inheritance, can have state
    `,
                        exercise: {
        prompt: 'What keyword implements an interface?',
            type: 'multiple-choice',
                options: ['extends', 'implements', 'interface', 'uses'],
                    answer: 1
    }
},
{
    id: 'java-24',
        title: 'Access Modifiers',
            description: 'Control visibility of members',
                stage: 4,
                    content: `
# Access Modifiers

Control who can access what!

## Four Levels:
\`\`\`java
public class MyClass {
    public int a;      // Anywhere
    protected int b;   // Same package + subclasses
    int c;             // Same package (default)
    private int d;     // Same class only
}
\`\`\`

## Encapsulation Pattern:
\`\`\`java
public class BankAccount {
    private double balance;  // Hidden
    
    public double getBalance() {
        return balance;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            return true;
        }
        return false;
    }
}
\`\`\`

## Why Encapsulation?
- Protect data from invalid values
- Change implementation without breaking code
- Hide complexity
    `,
                        exercise: {
        prompt: 'Which modifier allows access only within the same class?',
            type: 'multiple-choice',
                options: ['public', 'protected', 'default', 'private'],
                    answer: 3
    }
},
{
    id: 'java-25',
        title: 'Static Members',
            description: 'Class-level variables and methods',
                stage: 4,
                    content: `
# Static Members

Belong to the class, not instances!

## Static Variables:
\`\`\`java
class Counter {
    static int count = 0;  // Shared by all instances
    int id;
    
    Counter() {
        count++;
        id = count;
    }
}

Counter c1 = new Counter();  // count = 1
Counter c2 = new Counter();  // count = 2
System.out.println(Counter.count);  // 2
\`\`\`

## Static Methods:
\`\`\`java
class MathUtils {
    static int add(int a, int b) {
        return a + b;
    }
    
    static int max(int a, int b) {
        return a > b ? a : b;
    }
}

// Call without creating object
int sum = MathUtils.add(5, 3);
\`\`\`

## Static Block:
\`\`\`java
class Config {
    static String setting;
    
    static {
        // Runs once when class loads
        setting = "default";
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'How do you call a static method?',
            type: 'multiple-choice',
                options: ['object.method()', 'ClassName.method()', 'static.method()', 'new ClassName().method()'],
                    answer: 1
    }
},
{
    id: 'java-26',
        title: 'Exception Handling',
            description: 'Handle errors gracefully',
                stage: 4,
                    content: `
# Exception Handling

Deal with errors without crashing!

## try-catch:
\`\`\`java
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("Cannot divide by zero!");
}
\`\`\`

## Multiple Catches:
\`\`\`java
try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[10]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("Invalid index");
} catch (Exception e) {
    System.out.println("Something went wrong");
}
\`\`\`

## finally Block:
\`\`\`java
try {
    // risky code
} catch (Exception e) {
    // handle error
} finally {
    // ALWAYS runs
    System.out.println("Cleanup");
}
\`\`\`

## Throwing Exceptions:
\`\`\`java
void setAge(int age) {
    if (age < 0) {
        throw new IllegalArgumentException("Age cannot be negative");
    }
    this.age = age;
}
\`\`\`
    `,
                        exercise: {
        prompt: 'Which block always executes?',
            type: 'multiple-choice',
                options: ['try', 'catch', 'finally', 'throw'],
                    answer: 2
    }
},
{
    id: 'java-27',
        title: 'Custom Exceptions',
            description: 'Create your own exception types',
                stage: 4,
                    content: `
# Custom Exceptions

Create meaningful error types!

## Creating Custom Exception:
\`\`\`java
class InsufficientFundsException extends Exception {
    private double amount;
    
    InsufficientFundsException(double amount) {
        super("Insufficient funds: need " + amount);
        this.amount = amount;
    }
    
    double getAmount() {
        return amount;
    }
}
\`\`\`

## Using Custom Exception:
\`\`\`java
class BankAccount {
    private double balance;
    
    void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
    }
}
\`\`\`

## Handling:
\`\`\`java
try {
    account.withdraw(1000);
} catch (InsufficientFundsException e) {
    System.out.println(e.getMessage());
    System.out.println("Short by: $" + e.getAmount());
}
\`\`\`

## Checked vs Unchecked:
- Checked: Must handle (extends Exception)
- Unchecked: Optional (extends RuntimeException)
    `,
                        exercise: {
        prompt: 'What does a checked exception extend?',
            type: 'multiple-choice',
                options: ['Error', 'RuntimeException', 'Exception', 'Throwable'],
                    answer: 2
    }
},
{
    id: 'java-28',
        title: 'ArrayList Deep Dive',
            description: 'Dynamic arrays in Java',
                stage: 4,
                    content: `
# ArrayList Deep Dive

Powerful dynamic arrays!

## Common Operations:
\`\`\`java
import java.util.ArrayList;

ArrayList<String> list = new ArrayList<>();

// Add elements
list.add("Apple");
list.add("Banana");
list.add(0, "First");  // Insert at index

// Access
String item = list.get(0);
int size = list.size();

// Modify
list.set(1, "Blueberry");

// Remove
list.remove(0);        // By index
list.remove("Banana"); // By value

// Check
boolean has = list.contains("Apple");
int idx = list.indexOf("Apple");

// Clear
list.clear();
\`\`\`

## Iterating:
\`\`\`java
// For-each
for (String s : list) {
    System.out.println(s);
}

// With index
for (int i = 0; i < list.size(); i++) {
    System.out.println(i + ": " + list.get(i));
}
\`\`\`

## ArrayList of Objects:
\`\`\`java
ArrayList<Person> people = new ArrayList<>();
people.add(new Person("Alice", 25));
\`\`\`
    `,
                        exercise: {
        prompt: 'What method adds an element to ArrayList?',
            type: 'multiple-choice',
                options: ['put()', 'add()', 'insert()', 'append()'],
                    answer: 1
    }
},
{
    id: 'java-29',
        title: 'HashMap',
            description: 'Key-value data storage',
                stage: 4,
                    content: `
# HashMap

Store data with keys!

## Basic Usage:
\`\`\`java
import java.util.HashMap;

HashMap<String, Integer> ages = new HashMap<>();

// Add entries
ages.put("Alice", 25);
ages.put("Bob", 30);

// Get value
int age = ages.get("Alice");  // 25

// Check key
if (ages.containsKey("Charlie")) {
    System.out.println(ages.get("Charlie"));
}

// Default value
int val = ages.getOrDefault("Charlie", 0);

// Remove
ages.remove("Bob");

// Size
int count = ages.size();
\`\`\`

## Iterating:
\`\`\`java
// Keys
for (String name : ages.keySet()) {
    System.out.println(name);
}

// Values
for (int a : ages.values()) {
    System.out.println(a);
}

// Both
for (var entry : ages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\`

## Counting Pattern:
\`\`\`java
HashMap<String, Integer> counts = new HashMap<>();
for (String word : words) {
    counts.put(word, counts.getOrDefault(word, 0) + 1);
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What method retrieves a value by key?',
            type: 'multiple-choice',
                options: ['find()', 'get()', 'fetch()', 'retrieve()'],
                    answer: 1
    }
},
{
    id: 'java-30',
        title: 'HashSet',
            description: 'Store unique values',
                stage: 4,
                    content: `
# HashSet

Collection of unique elements!

## Basic Usage:
\`\`\`java
import java.util.HashSet;

HashSet<String> colors = new HashSet<>();

// Add (duplicates ignored)
colors.add("Red");
colors.add("Blue");
colors.add("Red");  // Ignored!

System.out.println(colors.size());  // 2

// Check membership
if (colors.contains("Red")) {
    System.out.println("Has red!");
}

// Remove
colors.remove("Blue");
\`\`\`

## Remove Duplicates:
\`\`\`java
ArrayList<Integer> nums = new ArrayList<>();
nums.add(1); nums.add(2); nums.add(1); nums.add(3);

HashSet<Integer> unique = new HashSet<>(nums);
// unique = {1, 2, 3}

// Convert back
ArrayList<Integer> noDups = new ArrayList<>(unique);
\`\`\`

## Set Operations:
\`\`\`java
HashSet<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3));
HashSet<Integer> b = new HashSet<>(Arrays.asList(2, 3, 4));

// Union
HashSet<Integer> union = new HashSet<>(a);
union.addAll(b);  // {1, 2, 3, 4}

// Intersection
HashSet<Integer> inter = new HashSet<>(a);
inter.retainAll(b);  // {2, 3}
\`\`\`
    `,
                        exercise: {
        prompt: 'What happens when you add a duplicate to HashSet?',
            type: 'multiple-choice',
                options: ['Error thrown', 'Duplicate added', 'Ignored silently', 'Replaces existing'],
                    answer: 2
    }
},
{
    id: 'java-31',
        title: 'Generics',
            description: 'Type-safe reusable code',
                stage: 4,
                    content: `
# Generics

Write code that works with any type!

## Generic Class:
\`\`\`java
class Box<T> {
    private T item;
    
    void put(T item) {
        this.item = item;
    }
    
    T get() {
        return item;
    }
}

Box<String> stringBox = new Box<>();
stringBox.put("Hello");
String s = stringBox.get();

Box<Integer> intBox = new Box<>();
intBox.put(42);
\`\`\`

## Generic Method:
\`\`\`java
public static <T> void printArray(T[] array) {
    for (T item : array) {
        System.out.println(item);
    }
}

String[] names = {"Alice", "Bob"};
Integer[] nums = {1, 2, 3};
printArray(names);
printArray(nums);
\`\`\`

## Bounded Types:
\`\`\`java
// Only Number subclasses
class NumBox<T extends Number> {
    T value;
    
    double getDouble() {
        return value.doubleValue();
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What symbol represents a type parameter?',
            type: 'multiple-choice',
                options: ['[]', '<>', '()', '{}'],
                    answer: 1
    }
},
{
    id: 'java-32',
        title: 'Lambda Expressions',
            description: 'Concise anonymous functions',
                stage: 4,
                    content: `
# Lambda Expressions

Short anonymous functions!

## Basic Syntax:
\`\`\`java
// Old way
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello");
    }
};

// Lambda
Runnable r = () -> System.out.println("Hello");
\`\`\`

## With Parameters:
\`\`\`java
// Single parameter
Consumer<String> printer = s -> System.out.println(s);
printer.accept("Hello");

// Multiple parameters
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
int result = add.apply(5, 3);  // 8
\`\`\`

## With Collections:
\`\`\`java
ArrayList<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");

// forEach
names.forEach(name -> System.out.println(name));

// Method reference
names.forEach(System.out::println);
\`\`\`

## Comparator:
\`\`\`java
names.sort((a, b) -> a.compareTo(b));
// Or
names.sort(String::compareTo);
\`\`\`
    `,
                        exercise: {
        prompt: 'What is the arrow operator in lambdas?',
            type: 'multiple-choice',
                options: ['=>', '->', '-->', '::'],
                    answer: 1
    }
},
{
    id: 'java-33',
        title: 'Streams API',
            description: 'Functional data processing',
                stage: 4,
                    content: `
# Streams API

Process collections functionally!

## Creating Streams:
\`\`\`java
import java.util.stream.*;

List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);
Stream<Integer> stream = nums.stream();
\`\`\`

## Common Operations:
\`\`\`java
List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);

// Filter
List<Integer> evens = nums.stream()
    .filter(n -> n % 2 == 0)
    .collect(Collectors.toList());

// Map (transform)
List<Integer> doubled = nums.stream()
    .map(n -> n * 2)
    .collect(Collectors.toList());

// Reduce
int sum = nums.stream()
    .reduce(0, (a, b) -> a + b);
\`\`\`

## Chaining:
\`\`\`java
int sumOfDoubledEvens = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .reduce(0, Integer::sum);
\`\`\`

## Other Operations:
\`\`\`java
// Count
long count = nums.stream().filter(n -> n > 3).count();

// Find
Optional<Integer> first = nums.stream().findFirst();

// Any/All match
boolean anyEven = nums.stream().anyMatch(n -> n % 2 == 0);
boolean allPositive = nums.stream().allMatch(n -> n > 0);
\`\`\`
    `,
                        exercise: {
        prompt: 'What method transforms each element?',
            type: 'multiple-choice',
                options: ['filter()', 'map()', 'reduce()', 'transform()'],
                    answer: 1
    }
},
{
    id: 'java-34',
        title: 'Optional Class',
            description: 'Handle null values safely',
                stage: 4,
                    content: `
# Optional

Avoid NullPointerException!

## Creating Optional:
\`\`\`java
import java.util.Optional;

Optional<String> present = Optional.of("Hello");
Optional<String> empty = Optional.empty();
Optional<String> nullable = Optional.ofNullable(getValue());
\`\`\`

## Checking Value:
\`\`\`java
Optional<String> opt = findUser(id);

if (opt.isPresent()) {
    System.out.println(opt.get());
}

// Better: ifPresent
opt.ifPresent(user -> System.out.println(user));
\`\`\`

## Default Values:
\`\`\`java
String name = opt.orElse("Unknown");
String name = opt.orElseGet(() -> generateDefault());
String name = opt.orElseThrow(() -> new RuntimeException("Not found"));
\`\`\`

## Chaining:
\`\`\`java
Optional<String> upper = findUser(id)
    .map(user -> user.getName())
    .map(name -> name.toUpperCase());

// Filter
Optional<User> adult = findUser(id)
    .filter(user -> user.getAge() >= 18);
\`\`\`
    `,
                        exercise: {
        prompt: 'What method provides a default if empty?',
            type: 'multiple-choice',
                options: ['getDefault()', 'defaultValue()', 'orElse()', 'otherwise()'],
                    answer: 2
    }
},
{
    id: 'java-35',
        title: 'File I/O Basics',
            description: 'Read and write files',
                stage: 4,
                    content: `
# File I/O

Read and write files!

## Reading Files:
\`\`\`java
import java.nio.file.*;
import java.io.*;

// Read all at once
String content = Files.readString(Path.of("file.txt"));

// Read lines
List<String> lines = Files.readAllLines(Path.of("file.txt"));
for (String line : lines) {
    System.out.println(line);
}
\`\`\`

## Writing Files:
\`\`\`java
// Write string
Files.writeString(Path.of("output.txt"), "Hello World!");

// Write lines
List<String> lines = Arrays.asList("Line 1", "Line 2");
Files.write(Path.of("output.txt"), lines);

// Append
Files.writeString(
    Path.of("log.txt"), 
    "New entry\\n",
    StandardOpenOption.APPEND
);
\`\`\`

## Check File:
\`\`\`java
Path path = Path.of("file.txt");
if (Files.exists(path)) {
    long size = Files.size(path);
    boolean isDir = Files.isDirectory(path);
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What class is used for modern file paths?',
            type: 'multiple-choice',
                options: ['File', 'Path', 'FileSystem', 'Directory'],
                    answer: 1
    }
},
{
    id: 'java-36',
        title: 'BufferedReader and BufferedWriter',
            description: 'Efficient file reading/writing',
                stage: 4,
                    content: `
# Buffered I/O

Efficient reading and writing!

## BufferedReader:
\`\`\`java
import java.io.*;

try (BufferedReader reader = new BufferedReader(
        new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

## BufferedWriter:
\`\`\`java
try (BufferedWriter writer = new BufferedWriter(
        new FileWriter("output.txt"))) {
    writer.write("Hello");
    writer.newLine();
    writer.write("World");
} catch (IOException e) {
    e.printStackTrace();
}
\`\`\`

## Try-with-Resources:
\`\`\`java
// Automatically closes resources
try (FileReader fr = new FileReader("file.txt");
     BufferedReader br = new BufferedReader(fr)) {
    // use reader
} // auto-closed here!
\`\`\`

## Why Buffered?
- Reads/writes in chunks
- Much faster than byte-by-byte
- Provides convenient methods like readLine()
    `,
                        exercise: {
        prompt: 'What does try-with-resources do?',
            type: 'multiple-choice',
                options: ['Retry on error', 'Auto-close resources', 'Allocate memory', 'Cache data'],
                    answer: 1
    }
},
{
    id: 'java-37',
        title: 'Enums',
            description: 'Define named constants',
                stage: 4,
                    content: `
# Enums

Type-safe named constants!

## Basic Enum:
\`\`\`java
enum Day {
    MONDAY, TUESDAY, WEDNESDAY, 
    THURSDAY, FRIDAY, SATURDAY, SUNDAY
}

Day today = Day.MONDAY;

if (today == Day.SATURDAY || today == Day.SUNDAY) {
    System.out.println("Weekend!");
}
\`\`\`

## Enum with Values:
\`\`\`java
enum Size {
    SMALL(10),
    MEDIUM(20),
    LARGE(30);
    
    private final int price;
    
    Size(int price) {
        this.price = price;
    }
    
    int getPrice() {
        return price;
    }
}

Size s = Size.MEDIUM;
System.out.println(s.getPrice());  // 20
\`\`\`

## Enum Methods:
\`\`\`java
// Get all values
for (Day d : Day.values()) {
    System.out.println(d);
}

// From string
Day day = Day.valueOf("MONDAY");

// Ordinal (position)
int pos = Day.MONDAY.ordinal();  // 0
\`\`\`

## Switch with Enum:
\`\`\`java
switch (today) {
    case MONDAY -> System.out.println("Start of week");
    case FRIDAY -> System.out.println("Almost weekend!");
    default -> System.out.println("Regular day");
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What method returns all enum values?',
            type: 'multiple-choice',
                options: ['getAll()', 'values()', 'list()', 'enumerate()'],
                    answer: 1
    }
},
{
    id: 'java-38',
        title: 'Records',
            description: 'Immutable data classes',
                stage: 4,
                    content: `
# Records (Java 14+)

Concise immutable data classes!

## Traditional Class:
\`\`\`java
class Person {
    private final String name;
    private final int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    String getName() { return name; }
    int getAge() { return age; }
    
    @Override
    public boolean equals(Object o) { ... }
    @Override
    public int hashCode() { ... }
    @Override
    public String toString() { ... }
}
\`\`\`

## As Record:
\`\`\`java
record Person(String name, int age) {}

// That's it! Automatically gets:
// - Constructor
// - Getters: name(), age()
// - equals(), hashCode(), toString()
\`\`\`

## Using Records:
\`\`\`java
Person p = new Person("Alice", 25);
System.out.println(p.name());  // Alice
System.out.println(p);  // Person[name=Alice, age=25]
\`\`\`

## Record with Validation:
\`\`\`java
record Person(String name, int age) {
    Person {
        if (age < 0) throw new IllegalArgumentException();
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What do records automatically generate?',
            type: 'multiple-choice',
                options: ['Setters', 'Getters, equals, hashCode, toString', 'Database connection', 'Serialization'],
                    answer: 1
    }
},
{
    id: 'java-39',
        title: 'Date and Time API',
            description: 'Modern date/time handling',
                stage: 4,
                    content: `
# Date and Time API

Modern date handling (Java 8+)!

## LocalDate:
\`\`\`java
import java.time.*;

LocalDate today = LocalDate.now();
LocalDate birthday = LocalDate.of(1990, 5, 15);

int year = today.getYear();
Month month = today.getMonth();
int day = today.getDayOfMonth();
\`\`\`

## LocalTime:
\`\`\`java
LocalTime now = LocalTime.now();
LocalTime meeting = LocalTime.of(14, 30);

int hour = now.getHour();
int minute = now.getMinute();
\`\`\`

## LocalDateTime:
\`\`\`java
LocalDateTime dt = LocalDateTime.now();
LocalDateTime event = LocalDateTime.of(2024, 12, 25, 10, 0);
\`\`\`

## Operations:
\`\`\`java
LocalDate tomorrow = today.plusDays(1);
LocalDate lastWeek = today.minusWeeks(1);
LocalDate nextYear = today.plusYears(1);

// Compare
boolean isBefore = date1.isBefore(date2);
boolean isAfter = date1.isAfter(date2);

// Duration between
Period period = Period.between(date1, date2);
int years = period.getYears();
\`\`\`

## Formatting:
\`\`\`java
import java.time.format.*;

DateTimeFormatter fmt = DateTimeFormatter.ofPattern("MM/dd/yyyy");
String formatted = today.format(fmt);
LocalDate parsed = LocalDate.parse("12/25/2024", fmt);
\`\`\`
    `,
                        exercise: {
        prompt: 'What class represents date without time?',
            type: 'multiple-choice',
                options: ['Date', 'LocalDate', 'DateTime', 'Calendar'],
                    answer: 1
    }
},
{
    id: 'java-40',
        title: 'String Methods',
            description: 'Advanced string manipulation',
                stage: 4,
                    content: `
# String Methods

Master string manipulation!

## Common Methods:
\`\`\`java
String s = "  Hello World  ";

// Length
int len = s.length();

// Case
String upper = s.toUpperCase();
String lower = s.toLowerCase();

// Trim
String trimmed = s.trim();      // Remove leading/trailing spaces
String stripped = s.strip();    // Same, but Unicode-aware

// Substring
String sub = s.substring(2, 7);  // "Hello"

// Replace
String replaced = s.replace("World", "Java");

// Contains/Starts/Ends
boolean has = s.contains("World");
boolean starts = s.startsWith("Hello");
boolean ends = s.endsWith("World");
\`\`\`

## Split and Join:
\`\`\`java
String csv = "apple,banana,cherry";
String[] parts = csv.split(",");

String joined = String.join("-", parts);  // "apple-banana-cherry"
\`\`\`

## StringBuilder:
\`\`\`java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();

// Chained
String s = new StringBuilder()
    .append("Hello")
    .append(" ")
    .append("World")
    .toString();
\`\`\`

## String Formatting:
\`\`\`java
String formatted = String.format("Name: %s, Age: %d", "Alice", 25);
\`\`\`
    `,
                        exercise: {
        prompt: 'What class is efficient for building strings?',
            type: 'multiple-choice',
                options: ['String', 'StringBuffer', 'StringBuilder', 'StringMaker'],
                    answer: 2
    }
},
{
    id: 'java-41',
        title: 'Comparable and Comparator',
            description: 'Custom sorting',
                stage: 4,
                    content: `
# Sorting Objects

Custom comparison logic!

## Comparable Interface:
\`\`\`java
class Person implements Comparable<Person> {
    String name;
    int age;
    
    @Override
    public int compareTo(Person other) {
        return this.age - other.age;  // Sort by age
    }
}

ArrayList<Person> people = new ArrayList<>();
Collections.sort(people);  // Uses compareTo
\`\`\`

## Comparator:
\`\`\`java
// Sort by name instead
Comparator<Person> byName = (a, b) -> a.name.compareTo(b.name);
Collections.sort(people, byName);

// Or inline
people.sort((a, b) -> a.name.compareTo(b.name));
\`\`\`

## Comparator Methods:
\`\`\`java
// By field
Comparator<Person> byAge = Comparator.comparing(p -> p.age);
Comparator<Person> byName = Comparator.comparing(Person::getName);

// Chained
Comparator<Person> byAgeNameDesc = Comparator
    .comparing(Person::getAge)
    .thenComparing(Person::getName)
    .reversed();

people.sort(byAgeNameDesc);
\`\`\`
    `,
                        exercise: {
        prompt: 'What interface defines natural ordering?',
            type: 'multiple-choice',
                options: ['Comparator', 'Comparable', 'Sortable', 'Ordered'],
                    answer: 1
    }
},
{
    id: 'java-42',
        title: 'LinkedList',
            description: 'Doubly-linked list operations',
                stage: 4,
                    content: `
# LinkedList

Efficient insertions and deletions!

## Basic Usage:
\`\`\`java
import java.util.LinkedList;

LinkedList<String> list = new LinkedList<>();

// Add elements
list.add("B");
list.addFirst("A");
list.addLast("C");
// List: A, B, C

// Access
String first = list.getFirst();
String last = list.getLast();
String second = list.get(1);

// Remove
list.removeFirst();
list.removeLast();
list.remove(0);
\`\`\`

## As Stack (LIFO):
\`\`\`java
LinkedList<String> stack = new LinkedList<>();
stack.push("First");
stack.push("Second");
String top = stack.pop();  // "Second"
String peek = stack.peek(); // Look without removing
\`\`\`

## As Queue (FIFO):
\`\`\`java
LinkedList<String> queue = new LinkedList<>();
queue.offer("First");
queue.offer("Second");
String front = queue.poll();  // "First"
\`\`\`

## ArrayList vs LinkedList:
- ArrayList: Fast random access, slow insert/delete
- LinkedList: Slow random access, fast insert/delete
    `,
                        exercise: {
        prompt: 'What operation removes from front of LinkedList?',
            type: 'multiple-choice',
                options: ['pop()', 'removeFirst()', 'shift()', 'dequeue()'],
                    answer: 1
    }
},
{
    id: 'java-43',
        title: 'TreeMap and TreeSet',
            description: 'Sorted collections',
                stage: 4,
                    content: `
# Sorted Collections

Automatically sorted!

## TreeSet:
\`\`\`java
import java.util.TreeSet;

TreeSet<Integer> nums = new TreeSet<>();
nums.add(5);
nums.add(1);
nums.add(3);
// Automatically sorted: 1, 3, 5

// Navigation
int first = nums.first();   // 1
int last = nums.last();     // 5
int higher = nums.higher(2); // 3 (next higher than 2)
int lower = nums.lower(3);   // 1 (next lower than 3)
\`\`\`

## TreeMap:
\`\`\`java
import java.util.TreeMap;

TreeMap<String, Integer> ages = new TreeMap<>();
ages.put("Charlie", 30);
ages.put("Alice", 25);
ages.put("Bob", 28);
// Keys sorted: Alice, Bob, Charlie

// Navigation
String firstKey = ages.firstKey();
String lastKey = ages.lastKey();
\`\`\`

## Custom Sorting:
\`\`\`java
TreeSet<String> descending = new TreeSet<>(Comparator.reverseOrder());
descending.add("A");
descending.add("C");
descending.add("B");
// C, B, A
\`\`\`
    `,
                        exercise: {
        prompt: 'What data structure keeps elements sorted?',
            type: 'multiple-choice',
                options: ['HashSet', 'ArrayList', 'TreeSet', 'LinkedList'],
                    answer: 2
    }
},
{
    id: 'java-44',
        title: 'Multithreading Basics',
            description: 'Run code in parallel',
                stage: 4,
                    content: `
# Multithreading

Run code simultaneously!

## Creating Threads:
\`\`\`java
// Extend Thread
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running");
    }
}

MyThread t = new MyThread();
t.start();  // Not run()!
\`\`\`

## Using Runnable:
\`\`\`java
Runnable task = () -> {
    System.out.println("Task running in " + Thread.currentThread().getName());
};

Thread t = new Thread(task);
t.start();
\`\`\`

## Multiple Threads:
\`\`\`java
for (int i = 0; i < 5; i++) {
    int num = i;
    new Thread(() -> System.out.println("Thread " + num)).start();
}
\`\`\`

## Thread Methods:
\`\`\`java
Thread t = new Thread(task);
t.start();
t.join();  // Wait for t to finish
Thread.sleep(1000);  // Pause 1 second

// Check state
boolean running = t.isAlive();
\`\`\`

## Thread Safety:
\`\`\`java
// Shared resource needs synchronization
synchronized void increment() {
    count++;
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What method starts a thread?',
            type: 'multiple-choice',
                options: ['run()', 'start()', 'execute()', 'begin()'],
                    answer: 1
    }
},
{
    id: 'java-45',
        title: 'ExecutorService',
            description: 'Thread pools and executors',
                stage: 4,
                    content: `
# ExecutorService

Manage threads efficiently!

## Creating Executors:
\`\`\`java
import java.util.concurrent.*;

// Fixed thread pool
ExecutorService executor = Executors.newFixedThreadPool(4);

// Single thread
ExecutorService single = Executors.newSingleThreadExecutor();

// Cached (grows as needed)
ExecutorService cached = Executors.newCachedThreadPool();
\`\`\`

## Submitting Tasks:
\`\`\`java
executor.execute(() -> System.out.println("Task 1"));
executor.execute(() -> System.out.println("Task 2"));

// Shutdown when done
executor.shutdown();
\`\`\`

## Future for Results:
\`\`\`java
ExecutorService executor = Executors.newFixedThreadPool(2);

Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

// Do other work...

Integer result = future.get();  // Waits for result
System.out.println(result);  // 42
\`\`\`

## Multiple Futures:
\`\`\`java
List<Future<Integer>> futures = new ArrayList<>();
for (int i = 0; i < 10; i++) {
    int num = i;
    futures.add(executor.submit(() -> num * num));
}

for (Future<Integer> f : futures) {
    System.out.println(f.get());
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What returns a result from async task?',
            type: 'multiple-choice',
                options: ['Promise', 'Callback', 'Future', 'Result'],
                    answer: 2
    }
},
{
    id: 'java-46',
        title: 'Synchronized and Locks',
            description: 'Thread synchronization',
                stage: 4,
                    content: `
# Thread Synchronization

Prevent race conditions!

## Synchronized Method:
\`\`\`java
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}
\`\`\`

## Synchronized Block:
\`\`\`java
class BankAccount {
    private double balance;
    private final Object lock = new Object();
    
    void transfer(BankAccount to, double amount) {
        synchronized (lock) {
            if (balance >= amount) {
                balance -= amount;
                to.balance += amount;
            }
        }
    }
}
\`\`\`

## ReentrantLock:
\`\`\`java
import java.util.concurrent.locks.*;

class Counter {
    private int count = 0;
    private Lock lock = new ReentrantLock();
    
    void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}
\`\`\`

## Atomic Classes:
\`\`\`java
import java.util.concurrent.atomic.*;

AtomicInteger count = new AtomicInteger(0);
count.incrementAndGet();
count.addAndGet(5);
int val = count.get();
\`\`\`
    `,
                        exercise: {
        prompt: 'What class provides lock-free thread-safe integers?',
            type: 'multiple-choice',
                options: ['SyncInteger', 'AtomicInteger', 'ThreadSafeInt', 'LockedInt'],
                    answer: 1
    }
},
{
    id: 'java-47',
        title: 'CompletableFuture',
            description: 'Async programming patterns',
                stage: 4,
                    content: `
# CompletableFuture

Modern async programming!

## Basic Usage:
\`\`\`java
import java.util.concurrent.*;

CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
    return "Hello";
});

String result = future.get();  // Blocks
\`\`\`

## Chaining:
\`\`\`java
CompletableFuture.supplyAsync(() -> "Hello")
    .thenApply(s -> s + " World")
    .thenApply(String::toUpperCase)
    .thenAccept(System.out::println);
// Prints: HELLO WORLD
\`\`\`

## Combine Futures:
\`\`\`java
CompletableFuture<String> f1 = CompletableFuture.supplyAsync(() -> "Hello");
CompletableFuture<String> f2 = CompletableFuture.supplyAsync(() -> "World");

f1.thenCombine(f2, (s1, s2) -> s1 + " " + s2)
    .thenAccept(System.out::println);
\`\`\`

## Error Handling:
\`\`\`java
CompletableFuture.supplyAsync(() -> {
    if (true) throw new RuntimeException("Error!");
    return "Success";
})
.exceptionally(ex -> "Failed: " + ex.getMessage())
.thenAccept(System.out::println);
\`\`\`

## Wait for All:
\`\`\`java
CompletableFuture.allOf(f1, f2, f3).join();
\`\`\`
    `,
                        exercise: {
        prompt: 'What method chains a transformation?',
            type: 'multiple-choice',
                options: ['map()', 'thenApply()', 'transform()', 'next()'],
                    answer: 1
    }
},
{
    id: 'java-48',
        title: 'Regular Expressions',
            description: 'Pattern matching in strings',
                stage: 4,
                    content: `
# Regular Expressions

Pattern matching!

## Basic Matching:
\`\`\`java
import java.util.regex.*;

String text = "Hello World";
boolean matches = text.matches("Hello.*");  // true
\`\`\`

## Pattern and Matcher:
\`\`\`java
Pattern pattern = Pattern.compile("\\\\d+");  // Digits
Matcher matcher = pattern.matcher("abc123def456");

while (matcher.find()) {
    System.out.println(matcher.group());  // 123, 456
}
\`\`\`

## Common Patterns:
\`\`\`java
// Email
"^[\\\\w.-]+@[\\\\w.-]+\\\\.\\\\w+$"

// Phone
"^\\\\d{3}-\\\\d{3}-\\\\d{4}$"

// URL
"^https?://.*$"
\`\`\`

## String Methods:
\`\`\`java
// Replace
String result = text.replaceAll("\\\\d+", "X");

// Split
String[] parts = text.split("\\\\s+");  // By whitespace

// Matches
boolean valid = email.matches("^[\\\\w.-]+@[\\\\w.-]+\\\\.\\\\w+$");
\`\`\`

## Groups:
\`\`\`java
Pattern p = Pattern.compile("(\\\\w+)@(\\\\w+)\\\\.(\\\\w+)");
Matcher m = p.matcher("user@example.com");
if (m.find()) {
    System.out.println(m.group(1));  // user
    System.out.println(m.group(2));  // example
    System.out.println(m.group(3));  // com
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What class compiles a regex pattern?',
            type: 'multiple-choice',
                options: ['Regex', 'Pattern', 'Matcher', 'RegExp'],
                    answer: 1
    }
},
{
    id: 'java-49',
        title: 'Annotations',
            description: 'Metadata for code',
                stage: 4,
                    content: `
# Annotations

Add metadata to code!

## Built-in Annotations:
\`\`\`java
@Override
public String toString() { ... }

@Deprecated
public void oldMethod() { ... }

@SuppressWarnings("unchecked")
public void riskyMethod() { ... }

@FunctionalInterface
interface MyFunction { void apply(); }
\`\`\`

## Custom Annotations:
\`\`\`java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Test {
    String value() default "";
    int priority() default 0;
}

// Usage
class MyTests {
    @Test(value = "important", priority = 1)
    void testSomething() { }
}
\`\`\`

## Reading Annotations:
\`\`\`java
for (Method m : MyTests.class.getMethods()) {
    if (m.isAnnotationPresent(Test.class)) {
        Test test = m.getAnnotation(Test.class);
        System.out.println(test.value());
    }
}
\`\`\`

## Common Uses:
- Testing frameworks (@Test, @Before)
- Dependency injection (@Autowired)
- Serialization (@JsonProperty)
- Documentation (@Deprecated)
    `,
                        exercise: {
        prompt: 'What annotation marks overridden methods?',
            type: 'multiple-choice',
                options: ['@Overload', '@Override', '@Replace', '@Extend'],
                    answer: 1
    }
},
{
    id: 'java-50',
        title: 'Reflection',
            description: 'Inspect code at runtime',
                stage: 4,
                    content: `
# Reflection

Examine and modify code at runtime!

## Get Class Info:
\`\`\`java
Class<?> clazz = String.class;
// or
Class<?> clazz = "Hello".getClass();
// or
Class<?> clazz = Class.forName("java.lang.String");
\`\`\`

## Inspect Fields:
\`\`\`java
class Person {
    private String name;
    public int age;
}

Field[] fields = Person.class.getDeclaredFields();
for (Field f : fields) {
    System.out.println(f.getName() + ": " + f.getType());
}
\`\`\`

## Inspect Methods:
\`\`\`java
Method[] methods = String.class.getMethods();
for (Method m : methods) {
    System.out.println(m.getName());
}
\`\`\`

## Invoke Methods:
\`\`\`java
Method method = String.class.getMethod("toUpperCase");
String result = (String) method.invoke("hello");  // "HELLO"
\`\`\`

## Create Instance:
\`\`\`java
Class<?> clazz = Person.class;
Person p = (Person) clazz.getDeclaredConstructor().newInstance();
\`\`\`

## Access Private Fields:
\`\`\`java
Field nameField = Person.class.getDeclaredField("name");
nameField.setAccessible(true);
nameField.set(person, "Alice");
\`\`\`
    `,
                        exercise: {
        prompt: 'What allows inspecting code at runtime?',
            type: 'multiple-choice',
                options: ['Introspection', 'Reflection', 'Inspection', 'Analysis'],
                    answer: 1
    }
},
{
    id: 'java-51',
        title: 'Serialization',
            description: 'Save objects to files',
                stage: 4,
                    content: `
# Serialization

Save and restore objects!

## Serializable Interface:
\`\`\`java
import java.io.*;

class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    int age;
    transient String password;  // Not serialized
}
\`\`\`

## Writing Objects:
\`\`\`java
Person person = new Person();
person.name = "Alice";
person.age = 25;

try (ObjectOutputStream oos = new ObjectOutputStream(
        new FileOutputStream("person.ser"))) {
    oos.writeObject(person);
}
\`\`\`

## Reading Objects:
\`\`\`java
try (ObjectInputStream ois = new ObjectInputStream(
        new FileInputStream("person.ser"))) {
    Person p = (Person) ois.readObject();
    System.out.println(p.name);  // Alice
}
\`\`\`

## JSON Alternative (with Gson):
\`\`\`java
Gson gson = new Gson();
String json = gson.toJson(person);
Person restored = gson.fromJson(json, Person.class);
\`\`\`
    `,
                        exercise: {
        prompt: 'What keyword prevents a field from being serialized?',
            type: 'multiple-choice',
                options: ['volatile', 'transient', 'static', 'final'],
                    answer: 1
    }
},
{
    id: 'java-52',
        title: 'Inner Classes',
            description: 'Classes inside classes',
                stage: 4,
                    content: `
# Inner Classes

Classes defined inside other classes!

## Member Inner Class:
\`\`\`java
class Outer {
    private int x = 10;
    
    class Inner {
        void display() {
            System.out.println("x = " + x);  // Can access outer's private
        }
    }
}

Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();
inner.display();
\`\`\`

## Static Nested Class:
\`\`\`java
class Outer {
    static class Nested {
        void display() {
            System.out.println("Static nested");
        }
    }
}

Outer.Nested nested = new Outer.Nested();
\`\`\`

## Local Inner Class:
\`\`\`java
void method() {
    class Local {
        void display() {
            System.out.println("Local class");
        }
    }
    new Local().display();
}
\`\`\`

## Anonymous Inner Class:
\`\`\`java
Runnable r = new Runnable() {
    @Override
    public void run() {
        System.out.println("Anonymous!");
    }
};

// Or with lambda
Runnable r2 = () -> System.out.println("Lambda!");
\`\`\`
    `,
                        exercise: {
        prompt: 'What inner class doesn\'t need an outer instance?',
            type: 'multiple-choice',
                options: ['Member', 'Local', 'Static nested', 'Anonymous'],
                    answer: 2
    }
},
{
    id: 'java-53',
        title: 'Java Modules',
            description: 'Modular programming (Java 9+)',
                stage: 4,
                    content: `
# Java Modules

Organize code into modules!

## module-info.java:
\`\`\`java
// In module-info.java
module com.myapp {
    requires java.sql;
    requires java.logging;
    
    exports com.myapp.api;
    exports com.myapp.utils to com.other.module;
}
\`\`\`

## Module Keywords:
\`\`\`java
// requires - depend on another module
requires java.base;  // Implicit

// exports - make packages available
exports com.myapp.public;

// opens - allow reflection
opens com.myapp.internal to com.framework;

// provides/uses - services
provides MyService with MyServiceImpl;
uses SomeService;
\`\`\`

## Benefits:
- Strong encapsulation
- Explicit dependencies
- Smaller runtime images
- Better startup performance

## Compile and Run:
\`\`\`bash
javac -d out --module-source-path src $(find src -name "*.java")
java --module-path out -m com.myapp/com.myapp.Main
\`\`\`
    `,
                        exercise: {
        prompt: 'What file defines a Java module?',
            type: 'multiple-choice',
                options: ['module.java', 'module-info.java', 'package-info.java', 'meta.java'],
                    answer: 1
    }
},
{
    id: 'java-54',
        title: 'Sealed Classes',
            description: 'Control class inheritance',
                stage: 4,
                    content: `
# Sealed Classes (Java 17+)

Control which classes can extend!

## Sealed Class:
\`\`\`java
public sealed class Shape 
    permits Circle, Rectangle, Triangle {
    // ...
}

final class Circle extends Shape { }
final class Rectangle extends Shape { }
final class Triangle extends Shape { }

// class Square extends Shape { }  // ERROR!
\`\`\`

## Modifiers for Subclasses:
\`\`\`java
sealed class Animal permits Dog, Cat, Bird { }

final class Dog extends Animal { }  // Cannot be extended

sealed class Cat extends Animal permits Persian, Siamese { }

non-sealed class Bird extends Animal { }  // Anyone can extend
\`\`\`

## With Pattern Matching:
\`\`\`java
String describe(Shape shape) {
    return switch (shape) {
        case Circle c -> "Circle with radius " + c.radius;
        case Rectangle r -> "Rectangle " + r.width + "x" + r.height;
        case Triangle t -> "Triangle";
    };
    // No default needed - compiler knows all cases!
}
\`\`\`

## Benefits:
- Compiler knows all subtypes
- Better pattern matching
- Domain modeling
    `,
                        exercise: {
        prompt: 'What keyword allows unrestricted extension?',
            type: 'multiple-choice',
                options: ['open', 'non-sealed', 'unsealed', 'public'],
                    answer: 1
    }
},
{
    id: 'java-55',
        title: 'Pattern Matching',
            description: 'Modern instanceof and switch',
                stage: 4,
                    content: `
# Pattern Matching

Concise type checking!

## instanceof Pattern:
\`\`\`java
// Old way
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.length());
}

// Pattern matching (Java 16+)
if (obj instanceof String s) {
    System.out.println(s.length());
}

// With condition
if (obj instanceof String s && s.length() > 5) {
    System.out.println("Long string: " + s);
}
\`\`\`

## Switch Expression:
\`\`\`java
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work hard";
    case TUESDAY -> "Meeting day";
    case WEDNESDAY, THURSDAY -> "Normal day";
    case SATURDAY, SUNDAY -> "Weekend!";
};
\`\`\`

## Pattern Matching in Switch:
\`\`\`java
String format(Object obj) {
    return switch (obj) {
        case Integer i -> "int: " + i;
        case String s -> "string: " + s;
        case Double d -> "double: " + d;
        case null -> "null value";
        default -> "unknown";
    };
}
\`\`\`

## Record Patterns (Java 21+):
\`\`\`java
record Point(int x, int y) {}

if (obj instanceof Point(int x, int y)) {
    System.out.println("x=" + x + ", y=" + y);
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What feature combines instanceof with variable declaration?',
            type: 'multiple-choice',
                options: ['Type casting', 'Pattern matching', 'Type inference', 'Auto-boxing'],
                    answer: 1
    }
},
{
    id: 'java-56',
        title: 'Virtual Threads',
            description: 'Lightweight concurrency (Java 21+)',
                stage: 4,
                    content: `
# Virtual Threads

Millions of lightweight threads!

## Creating Virtual Threads:
\`\`\`java
// Single virtual thread
Thread.startVirtualThread(() -> {
    System.out.println("Virtual thread!");
});

// With builder
Thread vThread = Thread.ofVirtual()
    .name("my-vthread")
    .start(() -> doWork());
\`\`\`

## Virtual Thread Executor:
\`\`\`java
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (int i = 0; i < 10000; i++) {
        executor.submit(() -> {
            Thread.sleep(1000);
            return "Done";
        });
    }
}  // Waits for all to complete
\`\`\`

## Platform vs Virtual:
\`\`\`java
// Platform thread (traditional)
Thread platform = Thread.ofPlatform().start(() -> work());

// Virtual thread (new)
Thread virtual = Thread.ofVirtual().start(() -> work());

System.out.println(virtual.isVirtual());  // true
\`\`\`

## Benefits:
- Millions of concurrent threads
- Low memory footprint
- Simple blocking code (no async callbacks)
- Great for I/O-bound tasks
    `,
                        exercise: {
        prompt: 'What are virtual threads designed for?',
            type: 'multiple-choice',
                options: ['CPU-bound tasks', 'I/O-bound tasks', 'Memory management', 'Garbage collection'],
                    answer: 1
    }
},
{
    id: 'java-57',
        title: 'HTTP Client',
            description: 'Modern HTTP requests',
                stage: 4,
                    content: `
# HTTP Client (Java 11+)

Modern HTTP requests!

## Creating Client:
\`\`\`java
import java.net.http.*;
import java.net.URI;

HttpClient client = HttpClient.newHttpClient();

// Or with config
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .connectTimeout(Duration.ofSeconds(10))
    .build();
\`\`\`

## GET Request:
\`\`\`java
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .GET()
    .build();

HttpResponse<String> response = client.send(request, 
    HttpResponse.BodyHandlers.ofString());

System.out.println(response.statusCode());
System.out.println(response.body());
\`\`\`

## POST Request:
\`\`\`java
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .header("Content-Type", "application/json")
    .POST(HttpRequest.BodyPublishers.ofString(
        "{\\"name\\": \\"Alice\\"}"))
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
\`\`\`

## Async Request:
\`\`\`java
client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
    .thenApply(HttpResponse::body)
    .thenAccept(System.out::println);
\`\`\`
    `,
                        exercise: {
        prompt: 'What class makes HTTP requests in Java 11+?',
            type: 'multiple-choice',
                options: ['URLConnection', 'HttpClient', 'RestTemplate', 'WebClient'],
                    answer: 1
    }
},
{
    id: 'java-58',
        title: 'JUnit Testing',
            description: 'Unit testing basics',
                stage: 4,
                    content: `
# JUnit Testing

Test your code!

## Basic Test:
\`\`\`java
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CalculatorTest {
    
    @Test
    void testAdd() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }
    
    @Test
    void testDivide() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class, 
            () -> calc.divide(1, 0));
    }
}
\`\`\`

## Assertions:
\`\`\`java
assertEquals(expected, actual);
assertNotEquals(unexpected, actual);
assertTrue(condition);
assertFalse(condition);
assertNull(object);
assertNotNull(object);
assertArrayEquals(expectedArray, actualArray);
assertThrows(Exception.class, () -> riskyCode());
\`\`\`

## Lifecycle:
\`\`\`java
@BeforeAll
static void setupAll() { /* Once before all tests */ }

@BeforeEach
void setup() { /* Before each test */ }

@AfterEach
void teardown() { /* After each test */ }

@AfterAll
static void teardownAll() { /* Once after all tests */ }
\`\`\`

## Parameterized Tests:
\`\`\`java
@ParameterizedTest
@ValueSource(ints = {1, 2, 3, 4, 5})
void testIsPositive(int num) {
    assertTrue(num > 0);
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What annotation marks a test method?',
            type: 'multiple-choice',
                options: ['@Test', '@UnitTest', '@Testing', '@TestMethod'],
                    answer: 0
    }
},
{
    id: 'java-59',
        title: 'Mocking with Mockito',
            description: 'Mock dependencies in tests',
                stage: 4,
                    content: `
# Mockito

Mock objects for testing!

## Creating Mocks:
\`\`\`java
import static org.mockito.Mockito.*;

// Create mock
UserRepository mockRepo = mock(UserRepository.class);

// Define behavior
when(mockRepo.findById(1)).thenReturn(new User("Alice"));
when(mockRepo.save(any())).thenReturn(true);
\`\`\`

## Using Mocks:
\`\`\`java
@Test
void testUserService() {
    UserRepository mockRepo = mock(UserRepository.class);
    when(mockRepo.findById(1)).thenReturn(new User("Alice"));
    
    UserService service = new UserService(mockRepo);
    User user = service.getUser(1);
    
    assertEquals("Alice", user.getName());
}
\`\`\`

## Verify Interactions:
\`\`\`java
// Verify method was called
verify(mockRepo).findById(1);

// Verify call count
verify(mockRepo, times(2)).save(any());
verify(mockRepo, never()).delete(any());
\`\`\`

## Annotations:
\`\`\`java
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    UserRepository mockRepo;
    
    @InjectMocks
    UserService service;
    
    @Test
    void testGetUser() {
        when(mockRepo.findById(1)).thenReturn(new User("Alice"));
        assertEquals("Alice", service.getUser(1).getName());
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What method defines mock behavior?',
            type: 'multiple-choice',
                options: ['expect()', 'when()', 'stub()', 'mock()'],
                    answer: 1
    }
},
{
    id: 'java-60',
        title: 'Build Tools: Maven',
            description: 'Project management with Maven',
                stage: 4,
                    content: `
# Maven

Project management and build tool!

## pom.xml Structure:
\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<project>
    <modelVersion>4.0.0</modelVersion>
    
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0</version>
    
    <properties>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>
    
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.9.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
\`\`\`

## Common Commands:
\`\`\`bash
mvn compile        # Compile source
mvn test           # Run tests
mvn package        # Create JAR
mvn clean          # Delete target/
mvn install        # Install to local repo
mvn dependency:tree # Show dependencies
\`\`\`

## Lifecycle Phases:
1. validate - check project
2. compile - compile source
3. test - run tests
4. package - create JAR/WAR
5. verify - run checks
6. install - install locally
7. deploy - deploy to remote repo
    `,
                        exercise: {
        prompt: 'What file configures a Maven project?',
            type: 'multiple-choice',
                options: ['build.gradle', 'pom.xml', 'project.xml', 'maven.xml'],
                    answer: 1
    }
},
{
    id: 'java-61',
        title: 'Build Tools: Gradle',
            description: 'Modern build automation',
                stage: 4,
                    content: `
# Gradle

Modern, flexible build tool!

## build.gradle Structure:
\`\`\`groovy
plugins {
    id 'java'
    id 'application'
}

group = 'com.example'
version = '1.0.0'

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(17)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'com.google.guava:guava:31.1-jre'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.9.0'
}

application {
    mainClass = 'com.example.Main'
}
\`\`\`

## Common Commands:
\`\`\`bash
gradle build        # Build project
gradle test         # Run tests
gradle run          # Run application
gradle clean        # Clean build dir
gradle tasks        # List all tasks
gradle dependencies # Show dependencies
\`\`\`

## Kotlin DSL:
\`\`\`kotlin
// build.gradle.kts
plugins {
    java
    application
}

dependencies {
    implementation("com.google.guava:guava:31.1-jre")
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What is Gradle\'s build file called?',
            type: 'multiple-choice',
                options: ['pom.xml', 'build.gradle', 'gradle.build', 'project.gradle'],
                    answer: 1
    }
},
{
    id: 'java-62',
        title: 'Design Patterns: Creational',
            description: 'Object creation patterns',
                stage: 4,
                    content: `
# Creational Design Patterns

Patterns for creating objects!

## Singleton:
\`\`\`java
class Database {
    private static Database instance;
    
    private Database() {}
    
    public static synchronized Database getInstance() {
        if (instance == null) {
            instance = new Database();
        }
        return instance;
    }
}
\`\`\`

## Factory:
\`\`\`java
interface Animal { void speak(); }
class Dog implements Animal { void speak() { System.out.println("Woof"); } }
class Cat implements Animal { void speak() { System.out.println("Meow"); } }

class AnimalFactory {
    static Animal create(String type) {
        return switch (type) {
            case "dog" -> new Dog();
            case "cat" -> new Cat();
            default -> throw new IllegalArgumentException();
        };
    }
}
\`\`\`

## Builder:
\`\`\`java
class Pizza {
    String size;
    boolean cheese;
    boolean pepperoni;
    
    static class Builder {
        Pizza pizza = new Pizza();
        
        Builder size(String s) { pizza.size = s; return this; }
        Builder cheese() { pizza.cheese = true; return this; }
        Builder pepperoni() { pizza.pepperoni = true; return this; }
        Pizza build() { return pizza; }
    }
}

Pizza p = new Pizza.Builder().size("large").cheese().build();
\`\`\`
    `,
                        exercise: {
        prompt: 'What pattern ensures only one instance exists?',
            type: 'multiple-choice',
                options: ['Factory', 'Builder', 'Singleton', 'Prototype'],
                    answer: 2
    }
},
{
    id: 'java-63',
        title: 'Design Patterns: Structural',
            description: 'Object composition patterns',
                stage: 4,
                    content: `
# Structural Design Patterns

Patterns for composing objects!

## Adapter:
\`\`\`java
interface MediaPlayer { void play(String file); }
interface AdvancedPlayer { void playMp4(String file); }

class Mp4Player implements AdvancedPlayer {
    public void playMp4(String file) { System.out.println("Playing " + file); }
}

class MediaAdapter implements MediaPlayer {
    AdvancedPlayer player;
    
    MediaAdapter() { player = new Mp4Player(); }
    
    public void play(String file) {
        if (file.endsWith(".mp4")) player.playMp4(file);
    }
}
\`\`\`

## Decorator:
\`\`\`java
interface Coffee { double cost(); String description(); }

class SimpleCoffee implements Coffee {
    public double cost() { return 1.0; }
    public String description() { return "Coffee"; }
}

class MilkDecorator implements Coffee {
    Coffee coffee;
    MilkDecorator(Coffee c) { coffee = c; }
    public double cost() { return coffee.cost() + 0.5; }
    public String description() { return coffee.description() + " + Milk"; }
}

Coffee c = new MilkDecorator(new SimpleCoffee());
System.out.println(c.description());  // Coffee + Milk
System.out.println(c.cost());  // 1.5
\`\`\`

## Facade:
\`\`\`java
class ComputerFacade {
    CPU cpu = new CPU();
    Memory memory = new Memory();
    HardDrive hd = new HardDrive();
    
    void start() {
        cpu.freeze();
        memory.load();
        cpu.execute();
    }
}
\`\`\`
    `,
                        exercise: {
        prompt: 'What pattern adds behavior to objects dynamically?',
            type: 'multiple-choice',
                options: ['Adapter', 'Decorator', 'Facade', 'Proxy'],
                    answer: 1
    }
},
{
    id: 'java-64',
        title: 'Complete Java Mastery',
            description: 'Java mastery complete!',
                stage: 4,
                    content: `
# Java Mastery Complete!

You've covered everything from basics to advanced Java!

## What You've Learned:

### Core Java
- Variables, types, operators
- Control flow (if, loops, switch)
- Methods and classes
- Arrays and collections

### Object-Oriented Programming
- Encapsulation, inheritance, polymorphism
- Abstract classes and interfaces
- Access modifiers

### Modern Java Features
- Generics and type safety
- Lambda expressions
- Streams API
- Optional class
- Records and sealed classes
- Pattern matching

### Concurrency
- Threads and ExecutorService
- CompletableFuture
- Virtual threads

### Libraries & Tools
- Collections framework
- Date/Time API
- File I/O
- HTTP Client
- JUnit & Mockito
- Maven & Gradle

### Design Patterns
- Creational: Singleton, Factory, Builder
- Structural: Adapter, Decorator, Facade

## Next Steps:
- Build real projects
- Learn frameworks (Spring, Jakarta EE)
- Explore databases (JDBC, JPA)
- Practice algorithm problems

Congratulations! You're now a Java developer! 🎉
    `,
                        exercise: {
        prompt: 'What is the most important principle in OOP?',
            type: 'multiple-choice',
                options: ['Speed', 'Encapsulation', 'Complexity', 'Verbosity'],
                    answer: 1
    }
}
        ]
    },

// Full-Stack Web Development Course
'fullstack-web': {
    id: 'fullstack-web',
        name: 'Full-Stack Web Development',
            description: 'Master HTML, CSS, and JavaScript together to build complete websites.',
                category: COURSE_CATEGORIES.FULLSTACK,
                    icon: '🌐',
                        color: '#00d4aa',
                            language: 'javascript', // Primary language for exercises
                                prerequisites: ['html', 'css', 'javascript'],
                                    estimatedHours: 25,
                                        bundledCourses: ['html', 'css', 'javascript'],
                                            lessons: [
                                                {
                                                    id: 'fs-1',
                                                    title: 'How Websites Work',
                                                    description: 'Understanding the web',
                                                    stage: 1,
                                                    content: `
# How Websites Work

A website is made of three main parts:

## 1. HTML - The Structure
Like the skeleton of a building. It defines WHAT is on the page.

## 2. CSS - The Style  
Like the paint, furniture, and decorations. It defines HOW things look.

## 3. JavaScript - The Behavior
Like the electricity and plumbing. It makes things INTERACTIVE.

## Together:
\`\`\`
HTML: <button>Click Me</button>
CSS: button { color: blue; }
JavaScript: When clicked → do something
\`\`\`
        `,
                                                    exercise: {
                                                        prompt: 'What part of a website handles how things look?',
                                                        type: 'multiple-choice',
                                                        options: ['HTML', 'CSS', 'JavaScript', 'All of them'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-2',
                                                    title: 'Client vs Server',
                                                    description: 'Frontend and backend explained',
                                                    stage: 1,
                                                    content: `
# Client vs Server

## Frontend (Client-Side)
What runs in YOUR browser:
- HTML, CSS, JavaScript
- React, Vue, Angular
- What users see and interact with

## Backend (Server-Side)
What runs on a remote computer:
- Node.js, Python, Java, PHP
- Databases
- Business logic, authentication

## The Flow:
1. You request a page
2. Server processes request
3. Server sends HTML/CSS/JS
4. Browser renders the page
5. JavaScript adds interactivity
    `,
                                                    exercise: {
                                                        prompt: 'Where does frontend code run?',
                                                        type: 'multiple-choice',
                                                        options: ['Server', 'Browser', 'Database', 'Cloud'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-3',
                                                    title: 'Project Structure',
                                                    description: 'Organizing web projects',
                                                    stage: 2,
                                                    content: `
# Project Structure

## Typical Layout:
\`\`\`
my-website/
├── index.html       # Main page
├── css/
│   └── styles.css   # Stylesheets
├── js/
│   └── main.js      # JavaScript
├── images/
│   └── logo.png     # Assets
└── pages/
    ├── about.html
    └── contact.html
\`\`\`

## Best Practices:
- Keep files organized by type
- Use meaningful names
- Separate concerns (HTML/CSS/JS)
    `,
                                                    exercise: {
                                                        prompt: 'Where should CSS files typically go?',
                                                        type: 'multiple-choice',
                                                        options: ['Root folder', 'css/ folder', 'js/ folder', 'images/ folder'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-4',
                                                    title: 'Building a Card Component',
                                                    description: 'HTML + CSS together',
                                                    stage: 2,
                                                    content: `
# Building a Card Component

## HTML Structure:
\`\`\`html
<div class="card">
    <img src="photo.jpg" alt="Profile">
    <h2>John Doe</h2>
    <p>Web Developer</p>
    <button>Contact</button>
</div>
\`\`\`

## CSS Styling:
\`\`\`css
.card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    text-align: center;
    max-width: 300px;
}

.card img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
}

.card button {
    background: #6366f1;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
}
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What property makes an image circular?',
                                                        type: 'multiple-choice',
                                                        options: ['round: true', 'border-radius: 50%', 'circle: yes', 'shape: round'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-5',
                                                    title: 'Adding Interactivity',
                                                    description: 'JavaScript event handling',
                                                    stage: 2,
                                                    content: `
# Adding Interactivity

## Making the Button Work:
\`\`\`html
<button id="contactBtn">Contact</button>

<script>
const btn = document.getElementById('contactBtn');

btn.addEventListener('click', () => {
    alert('Thanks for reaching out!');
});
</script>
\`\`\`

## Common Events:
- \`click\` - Button pressed
- \`submit\` - Form submitted
- \`input\` - Text typed
- \`mouseover\` - Hover

## DOM Manipulation:
\`\`\`javascript
// Change content
element.textContent = 'New text';

// Change style
element.style.color = 'blue';

// Add/remove classes
element.classList.add('active');
element.classList.toggle('hidden');
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What method attaches event handlers?',
                                                        type: 'multiple-choice',
                                                        options: ['onClick()', 'addEventListener()', 'attachEvent()', 'bindClick()'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-6',
                                                    title: 'Forms and Validation',
                                                    description: 'Handling user input',
                                                    stage: 3,
                                                    content: `
# Forms and Validation

## HTML Form:
\`\`\`html
<form id="signupForm">
    <input type="text" id="name" required placeholder="Name">
    <input type="email" id="email" required placeholder="Email">
    <input type="password" id="password" minlength="8" placeholder="Password">
    <button type="submit">Sign Up</button>
</form>
\`\`\`

## JavaScript Validation:
\`\`\`javascript
const form = document.getElementById('signupForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();  // Stop page reload
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        return;
    }
    
    // Submit to server
    console.log('Form valid!', { name, email });
});
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What prevents a form from reloading the page?',
                                                        type: 'multiple-choice',
                                                        options: ['stopReload()', 'return false', 'e.preventDefault()', 'noReload: true'],
                                                        answer: 2
                                                    }
                                                },
                                                {
                                                    id: 'fs-7',
                                                    title: 'Fetch API Basics',
                                                    description: 'Getting data from servers',
                                                    stage: 3,
                                                    content: `
# Fetch API

Load data without page reload!

## Basic GET Request:
\`\`\`javascript
fetch('https://api.example.com/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
\`\`\`

## Async/Await Version:
\`\`\`javascript
async function getUsers() {
    try {
        const response = await fetch('https://api.example.com/users');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\`

## Display Data:
\`\`\`javascript
async function displayUsers() {
    const users = await getUsers();
    const container = document.getElementById('users');
    
    users.forEach(user => {
        container.innerHTML += \`<div>\${user.name}</div>\`;
    });
}
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What method converts response to JSON?',
                                                        type: 'multiple-choice',
                                                        options: ['toJSON()', 'parseJSON()', 'json()', 'getJSON()'],
                                                        answer: 2
                                                    }
                                                },
                                                {
                                                    id: 'fs-8',
                                                    title: 'POST Requests',
                                                    description: 'Sending data to servers',
                                                    stage: 3,
                                                    content: `
# Sending Data with POST

## POST Request:
\`\`\`javascript
async function createUser(userData) {
    const response = await fetch('https://api.example.com/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    
    return response.json();
}

// Usage
const newUser = await createUser({
    name: 'Alice',
    email: 'alice@example.com'
});
\`\`\`

## Other Methods:
- PUT - Update entire resource
- PATCH - Update part of resource
- DELETE - Remove resource

## Form Submission:
\`\`\`javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    await createUser(data);
});
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What HTTP method creates new resources?',
                                                        type: 'multiple-choice',
                                                        options: ['GET', 'POST', 'PUT', 'DELETE'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-9',
                                                    title: 'Local Storage',
                                                    description: 'Persisting data in browser',
                                                    stage: 3,
                                                    content: `
# Local Storage

Save data in the browser!

## Basic Operations:
\`\`\`javascript
// Save
localStorage.setItem('username', 'Alice');

// Read
const name = localStorage.getItem('username');

// Remove
localStorage.removeItem('username');

// Clear all
localStorage.clear();
\`\`\`

## Storing Objects:
\`\`\`javascript
// Save object
const user = { name: 'Alice', score: 100 };
localStorage.setItem('user', JSON.stringify(user));

// Read object
const saved = JSON.parse(localStorage.getItem('user'));
console.log(saved.name);  // Alice
\`\`\`

## Session Storage:
Same API, but clears when tab closes:
\`\`\`javascript
sessionStorage.setItem('temp', 'data');
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What clears when the browser tab closes?',
                                                        type: 'multiple-choice',
                                                        options: ['localStorage', 'sessionStorage', 'Both', 'Neither'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-10',
                                                    title: 'Modern JavaScript Modules',
                                                    description: 'Organizing code with imports/exports',
                                                    stage: 4,
                                                    content: `
# JavaScript Modules

Split code into files!

## Exporting:
\`\`\`javascript
// utils.js
export function formatDate(date) {
    return date.toLocaleDateString();
}

export const API_URL = 'https://api.example.com';

export default class User {
    constructor(name) {
        this.name = name;
    }
}
\`\`\`

## Importing:
\`\`\`javascript
// main.js
import User, { formatDate, API_URL } from './utils.js';

const user = new User('Alice');
console.log(formatDate(new Date()));
\`\`\`

## HTML Setup:
\`\`\`html
<script type="module" src="main.js"></script>
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What script type enables ES modules?',
                                                        type: 'multiple-choice',
                                                        options: ['type="javascript"', 'type="module"', 'type="es6"', 'type="import"'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-11',
                                                    title: 'NPM and Package Management',
                                                    description: 'Using external libraries',
                                                    stage: 4,
                                                    content: `
# NPM - Node Package Manager

## Initialize Project:
\`\`\`bash
npm init -y
\`\`\`

## Installing Packages:
\`\`\`bash
npm install lodash        # Production dependency
npm install -D jest       # Dev dependency
npm install -g nodemon    # Global install
\`\`\`

## package.json:
\`\`\`json
{
  "name": "my-project",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
\`\`\`

## Common Commands:
\`\`\`bash
npm install       # Install all deps
npm run dev       # Run script
npm update        # Update packages
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What file tracks project dependencies?',
                                                        type: 'multiple-choice',
                                                        options: ['deps.json', 'package.json', 'modules.json', 'npm.json'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-12',
                                                    title: 'Build Tools: Vite',
                                                    description: 'Modern frontend tooling',
                                                    stage: 4,
                                                    content: `
# Vite - Fast Build Tool

## Create Project:
\`\`\`bash
npm create vite@latest my-app
cd my-app
npm install
npm run dev
\`\`\`

## Features:
- Hot Module Replacement (HMR)
- Fast development server
- Optimized production builds
- TypeScript support built-in

## Project Structure:
\`\`\`
my-app/
├── public/          # Static assets
├── src/
│   ├── main.js      # Entry point
│   ├── style.css    # Styles
│   └── components/  # Your code
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## Scripts:
\`\`\`bash
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What does HMR stand for?',
                                                        type: 'multiple-choice',
                                                        options: ['Hot Module Replacement', 'High Memory Runtime', 'HTML Markup Renderer', 'Hybrid Module Runner'],
                                                        answer: 0
                                                    }
                                                },
                                                {
                                                    id: 'fs-13',
                                                    title: 'Introduction to React',
                                                    description: 'Component-based UI development',
                                                    stage: 4,
                                                    content: `
# React Basics

## What is React?
A library for building UIs with components.

## JSX Syntax:
\`\`\`jsx
function Welcome() {
    const name = "Alice";
    return (
        <div className="welcome">
            <h1>Hello, {name}!</h1>
            <p>Welcome to React</p>
        </div>
    );
}
\`\`\`

## Components:
\`\`\`jsx
function Card({ title, children }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

// Usage
<Card title="My Card">
    <p>Content here</p>
</Card>
\`\`\`

## Key Concepts:
- Components are reusable
- Props pass data down
- State manages changes
- Virtual DOM for performance
    `,
                                                    exercise: {
                                                        prompt: 'What does JSX stand for?',
                                                        type: 'multiple-choice',
                                                        options: ['JavaScript XML', 'Java Syntax Extension', 'JSON Extended', 'JS Extra'],
                                                        answer: 0
                                                    }
                                                },
                                                {
                                                    id: 'fs-14',
                                                    title: 'React State with Hooks',
                                                    description: 'Managing component state',
                                                    stage: 4,
                                                    content: `
# React Hooks

## useState:
\`\`\`jsx
import { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
        </div>
    );
}
\`\`\`

## useEffect:
\`\`\`jsx
import { useState, useEffect } from 'react';

function UserProfile({ userId }) {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        fetch(\`/api/users/\${userId}\`)
            .then(res => res.json())
            .then(data => setUser(data));
    }, [userId]);  // Run when userId changes
    
    if (!user) return <p>Loading...</p>;
    return <h1>{user.name}</h1>;
}
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What hook manages component state?',
                                                        type: 'multiple-choice',
                                                        options: ['useEffect', 'useState', 'useContext', 'useRef'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-15',
                                                    title: 'React Router',
                                                    description: 'Multi-page apps with React',
                                                    stage: 4,
                                                    content: `
# React Router

## Setup:
\`\`\`bash
npm install react-router-dom
\`\`\`

## Basic Routing:
\`\`\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users/:id" element={<UserProfile />} />
            </Routes>
        </BrowserRouter>
    );
}
\`\`\`

## Using URL Parameters:
\`\`\`jsx
import { useParams } from 'react-router-dom';

function UserProfile() {
    const { id } = useParams();
    return <h1>User ID: {id}</h1>;
}
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What component wraps the entire routed app?',
                                                        type: 'multiple-choice',
                                                        options: ['Router', 'BrowserRouter', 'Routes', 'Switch'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-16',
                                                    title: 'Tailwind CSS',
                                                    description: 'Utility-first CSS framework',
                                                    stage: 4,
                                                    content: `
# Tailwind CSS

Style with utility classes!

## Setup with Vite:
\`\`\`bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
\`\`\`

## Example:
\`\`\`html
<!-- Traditional CSS -->
<button class="btn-primary">Click</button>

<!-- Tailwind -->
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    Click
</button>
\`\`\`

## Common Classes:
\`\`\`html
<!-- Layout -->
<div class="flex items-center justify-between">

<!-- Spacing -->
<div class="p-4 m-2 mt-8">

<!-- Colors -->
<div class="bg-gray-100 text-blue-600 border-red-500">

<!-- Responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
\`\`\`

## Benefits:
- No custom CSS needed
- Consistent design system
- Responsive built-in
- Small production bundle
    `,
                                                    exercise: {
                                                        prompt: 'What type of CSS framework is Tailwind?',
                                                        type: 'multiple-choice',
                                                        options: ['Component-based', 'Utility-first', 'Theme-based', 'Grid-only'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-17',
                                                    title: 'Node.js Basics',
                                                    description: 'JavaScript on the server',
                                                    stage: 4,
                                                    content: `
# Node.js

Run JavaScript on the server!

## Basic Server:
\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Hello from Node.js!</h1>');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});
\`\`\`

## Reading Files:
\`\`\`javascript
const fs = require('fs').promises;

async function readConfig() {
    const data = await fs.readFile('config.json', 'utf8');
    return JSON.parse(data);
}
\`\`\`

## Environment Variables:
\`\`\`javascript
const port = process.env.PORT || 3000;
const apiKey = process.env.API_KEY;
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What does Node.js allow you to do?',
                                                        type: 'multiple-choice',
                                                        options: ['Run JS in browser', 'Run JS on server', 'Compile JS to Java', 'Design websites'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-18',
                                                    title: 'Express.js',
                                                    description: 'Web framework for Node',
                                                    stage: 4,
                                                    content: `
# Express.js

Simplified web server framework!

## Setup:
\`\`\`bash
npm install express
\`\`\`

## Basic Server:
\`\`\`javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]);
});

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    // Save to database...
    res.status(201).json(newUser);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
\`\`\`

## Route Parameters:
\`\`\`javascript
app.get('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    // Find user...
});
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What method handles GET requests in Express?',
                                                        type: 'multiple-choice',
                                                        options: ['app.fetch()', 'app.get()', 'app.request()', 'app.handle()'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-19',
                                                    title: 'REST API Design',
                                                    description: 'Building proper APIs',
                                                    stage: 4,
                                                    content: `
# REST API Design

## RESTful Endpoints:
\`\`\`
GET    /api/users         - List all users
GET    /api/users/:id     - Get one user
POST   /api/users         - Create user
PUT    /api/users/:id     - Update user
DELETE /api/users/:id     - Delete user
\`\`\`

## Response Codes:
- 200 OK - Success
- 201 Created - Resource created
- 400 Bad Request - Invalid input
- 401 Unauthorized - Not logged in
- 404 Not Found - Resource missing
- 500 Server Error - Something broke

## Implementation:
\`\`\`javascript
// GET all
app.get('/api/posts', async (req, res) => {
    const posts = await db.posts.findAll();
    res.json(posts);
});

// GET one
app.get('/api/posts/:id', async (req, res) => {
    const post = await db.posts.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
});

// DELETE
app.delete('/api/posts/:id', async (req, res) => {
    await db.posts.delete(req.params.id);
    res.status(204).send();
});
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What status code means resource created?',
                                                        type: 'multiple-choice',
                                                        options: ['200', '201', '204', '301'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-20',
                                                    title: 'Database Basics with MongoDB',
                                                    description: 'NoSQL database integration',
                                                    stage: 4,
                                                    content: `
# MongoDB with Mongoose

## Setup:
\`\`\`bash
npm install mongoose
\`\`\`

## Connection:
\`\`\`javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myapp');
\`\`\`

## Define Schema:
\`\`\`javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
\`\`\`

## CRUD Operations:
\`\`\`javascript
// Create
const user = await User.create({ name: 'Alice', email: 'alice@example.com' });

// Read
const users = await User.find();
const user = await User.findById(id);

// Update
await User.findByIdAndUpdate(id, { name: 'New Name' });

// Delete
await User.findByIdAndDelete(id);
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What type of database is MongoDB?',
                                                        type: 'multiple-choice',
                                                        options: ['Relational', 'NoSQL', 'Graph', 'Time-series'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-21',
                                                    title: 'Authentication with JWT',
                                                    description: 'Secure user authentication',
                                                    stage: 4,
                                                    content: `
# JWT Authentication

## Setup:
\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`

## Register:
\`\`\`javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Save user
    const user = await User.create({ email, password: hashedPassword });
    
    res.status(201).json({ message: 'User created' });
});
\`\`\`

## Login:
\`\`\`javascript
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
});
\`\`\`

## Protect Routes:
\`\`\`javascript
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token' });
    
    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Invalid token' });
    }
}
\`\`\`
    `,
                                                    exercise: {
                                                        prompt: 'What does JWT stand for?',
                                                        type: 'multiple-choice',
                                                        options: ['Java Web Token', 'JSON Web Token', 'JavaScript Web Token', 'Just Web Token'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-22',
                                                    title: 'Deployment Basics',
                                                    description: 'Putting your app online',
                                                    stage: 4,
                                                    content: `
# Deployment

## Frontend Deployment (Vercel/Netlify):
\`\`\`bash
# Build production
npm run build

# Deploy
npx vercel
# or
npx netlify deploy --prod
\`\`\`

## Backend Deployment (Railway/Render):
1. Push code to GitHub
2. Connect repository
3. Set environment variables
4. Deploy!

## Environment Variables:
\`\`\`
# .env file (don't commit!)
DATABASE_URL=mongodb+srv://...
JWT_SECRET=super_secret_key
PORT=3000
\`\`\`

## Docker:
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## Checklist:
- [ ] Environment variables set
- [ ] Database connected
- [ ] HTTPS enabled
- [ ] Error logging setup
    `,
                                                    exercise: {
                                                        prompt: 'What file stores secret config values?',
                                                        type: 'multiple-choice',
                                                        options: ['config.js', '.env', 'secrets.txt', 'keys.json'],
                                                        answer: 1
                                                    }
                                                },
                                                {
                                                    id: 'fs-23',
                                                    title: 'Full-Stack Project',
                                                    description: 'Building a complete app',
                                                    stage: 4,
                                                    content: `
# Full-Stack Todo App

## Project Structure:
\`\`\`
todo-app/
├── client/           # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.jsx
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   └── index.js
└── package.json
\`\`\`

## Backend API:
\`\`\`javascript
// server/routes/todos.js
router.get('/', async (req, res) => {
    const todos = await Todo.find({ userId: req.userId });
    res.json(todos);
});

router.post('/', async (req, res) => {
    const todo = await Todo.create({
        ...req.body,
        userId: req.userId
    });
    res.status(201).json(todo);
});
\`\`\`

## Frontend:
\`\`\`jsx
function TodoList() {
    const [todos, setTodos] = useState([]);
    
    useEffect(() => {
        fetch('/api/todos')
            .then(res => res.json())
            .then(setTodos);
    }, []);
    
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} />
            ))}
        </ul>
    );
}
\`\`\`

Congratulations! You can now build full-stack web apps! 🎉
    `,
                                                    exercise: {
                                                        prompt: 'What connects frontend to backend?',
                                                        type: 'multiple-choice',
                                                        options: ['CSS', 'HTML', 'API calls', 'Database'],
                                                        answer: 2
                                                    }
                                                }
                                            ]
},

// Terminal / Command Line Course
'terminal': {
    id: 'terminal',
        name: 'Terminal Basics',
            description: 'Master the command line interface - essential for every developer.',
                category: COURSE_CATEGORIES.TOOLS,
                    icon: '💻',
                        color: '#1e1e1e',
                            language: 'bash',
                                prerequisites: [],
                                    estimatedHours: 4,
                                        lessons: [
                                            {
                                                id: 'term-1',
                                                title: 'What is the Terminal?',
                                                description: 'Understanding command line basics',
                                                stage: 1,
                                                content: `
# What is the Terminal?

The terminal (also called command line or shell) is a text-based way to control your computer.

## Why Learn It?
- More powerful than clicking around
- Essential for programming
- Works the same on most computers

## Basic Concept:
You type a command, press Enter, and the computer responds.
                `,
                                                exercise: {
                                                    prompt: 'What is another name for the terminal?',
                                                    type: 'multiple-choice',
                                                    options: ['Command Line', 'Desktop', 'Browser', 'Editor'],
                                                    answer: 0
                                                }
                                            },
                                            {
                                                id: 'term-2',
                                                title: 'Navigating Directories',
                                                description: 'Moving around the file system',
                                                stage: 1,
                                                content: `
# Navigating Directories

## Key Commands:
- \`pwd\` - Print Working Directory (where am I?)
- \`ls\` - List files and folders
- \`cd\` - Change Directory

## Examples:
\`\`\`bash
pwd           # Shows current location
ls            # Lists files here
cd Documents  # Go into Documents folder
cd ..         # Go up one level
\`\`\`
                `,
                                                exercise: {
                                                    prompt: 'Which command shows your current directory?',
                                                    type: 'multiple-choice',
                                                    options: ['ls', 'cd', 'pwd', 'dir'],
                                                    answer: 2
                                                }
                                            },
                                            {
                                                id: 'term-3',
                                                title: 'Creating and Removing',
                                                description: 'Making and deleting files/folders',
                                                stage: 2,
                                                content: `
# Creating and Removing

## Creating:
- \`mkdir folder_name\` - Make a directory
- \`touch file.txt\` - Create an empty file

## Removing:
- \`rm file.txt\` - Remove a file
- \`rmdir folder\` - Remove empty directory
- \`rm -r folder\` - Remove folder with contents

## Examples:
\`\`\`bash
mkdir my_project
touch README.md
rm old_file.txt
\`\`\`
                `,
                                                exercise: {
                                                    prompt: 'Write: mkdir projects',
                                                    type: 'code',
                                                    expectedOutput: 'mkdir projects',
                                                    hint: 'Type the command exactly as shown'
                                                }
                                            },
                                            {
                                                id: 'term-4',
                                                title: 'Copying and Moving',
                                                description: 'Duplicate and relocate files',
                                                stage: 2,
                                                content: `
# Copying and Moving

## Copy Files:
\`\`\`bash
cp file.txt backup.txt        # Copy file
cp -r folder/ backup_folder/  # Copy folder
\`\`\`

## Move/Rename:
\`\`\`bash
mv file.txt newname.txt       # Rename
mv file.txt folder/           # Move to folder
mv folder/ ../                # Move up one level
\`\`\`

## Wildcards:
\`\`\`bash
cp *.txt backup/              # All .txt files
mv image*.png images/         # Files starting with 'image'
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command moves a file?',
                                                    type: 'multiple-choice',
                                                    options: ['cp', 'mv', 'rm', 'move'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-5',
                                                title: 'Viewing File Contents',
                                                description: 'Reading files in terminal',
                                                stage: 2,
                                                content: `
# Viewing Files

## Commands:
\`\`\`bash
cat file.txt          # Print entire file
less file.txt         # Page through file (q to quit)
head file.txt         # First 10 lines
tail file.txt         # Last 10 lines
head -20 file.txt     # First 20 lines
tail -f log.txt       # Follow file updates (live)
\`\`\`

## Counting:
\`\`\`bash
wc file.txt           # Lines, words, characters
wc -l file.txt        # Lines only
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command shows the last lines of a file?',
                                                    type: 'multiple-choice',
                                                    options: ['head', 'tail', 'cat', 'less'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-6',
                                                title: 'Finding Files',
                                                description: 'Search for files and content',
                                                stage: 3,
                                                content: `
# Finding Files

## find Command:
\`\`\`bash
find . -name "*.txt"           # Find by name
find . -type d -name "src"     # Find directories
find . -size +1M               # Files over 1MB
find . -mtime -7               # Modified in last 7 days
\`\`\`

## grep - Search Content:
\`\`\`bash
grep "error" log.txt           # Find lines with "error"
grep -r "TODO" .               # Recursive search
grep -i "hello" file.txt       # Case insensitive
grep -n "pattern" file.txt     # Show line numbers
\`\`\`

## Combining:
\`\`\`bash
find . -name "*.js" | xargs grep "function"
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command searches file contents?',
                                                    type: 'multiple-choice',
                                                    options: ['find', 'search', 'grep', 'look'],
                                                    answer: 2
                                                }
                                            },
                                            {
                                                id: 'term-7',
                                                title: 'Pipes and Redirection',
                                                description: 'Connecting commands together',
                                                stage: 3,
                                                content: `
# Pipes and Redirection

## Pipes (|):
Connect output of one command to input of another:
\`\`\`bash
cat file.txt | grep "error"
ls -la | less
history | grep "git"
\`\`\`

## Output Redirection:
\`\`\`bash
echo "Hello" > file.txt        # Write (overwrite)
echo "World" >> file.txt       # Append
ls -la > listing.txt           # Save ls output
\`\`\`

## Input Redirection:
\`\`\`bash
sort < unsorted.txt > sorted.txt
\`\`\`

## Error Redirection:
\`\`\`bash
command 2> errors.txt          # Redirect errors
command &> all.txt             # Both output and errors
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What symbol pipes output to another command?',
                                                    type: 'multiple-choice',
                                                    options: ['>', '<', '|', '&'],
                                                    answer: 2
                                                }
                                            },
                                            {
                                                id: 'term-8',
                                                title: 'Permissions',
                                                description: 'File access control',
                                                stage: 3,
                                                content: `
# File Permissions

## Understanding Permissions:
\`\`\`bash
ls -la
-rw-r--r--  1 user group  1234 Jan 1 12:00 file.txt
\`\`\`

First character: - file, d directory
Next 9: rwxrwxrwx (user, group, others)
- r = read
- w = write
- x = execute

## Changing Permissions:
\`\`\`bash
chmod +x script.sh             # Make executable
chmod 755 file                 # rwxr-xr-x
chmod 644 file                 # rw-r--r--
\`\`\`

## Change Owner:
\`\`\`bash
chown user:group file.txt
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command changes permissions?',
                                                    type: 'multiple-choice',
                                                    options: ['perm', 'chmod', 'chown', 'access'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-9',
                                                title: 'Process Management',
                                                description: 'Managing running programs',
                                                stage: 3,
                                                content: `
# Process Management

## Viewing Processes:
\`\`\`bash
ps                             # Your processes
ps aux                         # All processes
top                            # Live process viewer
htop                           # Better process viewer
\`\`\`

## Background Jobs:
\`\`\`bash
command &                      # Run in background
Ctrl+Z                         # Suspend current
bg                             # Resume in background
fg                             # Bring to foreground
jobs                           # List background jobs
\`\`\`

## Killing Processes:
\`\`\`bash
kill PID                       # Terminate by PID
kill -9 PID                    # Force kill
killall processname            # Kill by name
pkill pattern                  # Kill matching pattern
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command shows running processes live?',
                                                    type: 'multiple-choice',
                                                    options: ['ps', 'top', 'jobs', 'run'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-10',
                                                title: 'Environment Variables',
                                                description: 'System configuration',
                                                stage: 3,
                                                content: `
# Environment Variables

## View Variables:
\`\`\`bash
echo $HOME                     # Your home directory
echo $PATH                     # Executable paths
echo $USER                     # Current user
printenv                       # All variables
\`\`\`

## Set Variables:
\`\`\`bash
export MY_VAR="value"          # Set for this session
MY_VAR="value"                 # Just for this shell
\`\`\`

## PATH Variable:
\`\`\`bash
export PATH="$PATH:/new/path"  # Add to PATH
\`\`\`

## Permanent Variables:
Add to ~/.bashrc or ~/.zshrc:
\`\`\`bash
export MY_VAR="value"
\`\`\`
Then: \`source ~/.bashrc\`
    `,
                                                exercise: {
                                                    prompt: 'What variable contains your home directory?',
                                                    type: 'multiple-choice',
                                                    options: ['$USER', '$HOME', '$PATH', '$DIR'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-11',
                                                title: 'Networking Commands',
                                                description: 'Network diagnostics',
                                                stage: 4,
                                                content: `
# Networking Commands

## Testing Connectivity:
\`\`\`bash
ping google.com                # Check if reachable
ping -c 5 google.com           # Ping 5 times
\`\`\`

## Download Files:
\`\`\`bash
curl https://example.com       # Print response
curl -o file.html https://...  # Save to file
wget https://example.com/file  # Download file
\`\`\`

## Network Info:
\`\`\`bash
ifconfig                       # Network interfaces
ip addr                        # IP addresses
netstat -an                    # Open connections
ss -tuln                       # Listening ports
\`\`\`

## DNS:
\`\`\`bash
nslookup example.com
dig example.com
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command downloads files from URLs?',
                                                    type: 'multiple-choice',
                                                    options: ['download', 'wget', 'get', 'fetch'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-12',
                                                title: 'SSH',
                                                description: 'Remote server access',
                                                stage: 4,
                                                content: `
# SSH - Secure Shell

## Connect to Server:
\`\`\`bash
ssh user@hostname
ssh user@192.168.1.100
ssh -p 2222 user@host          # Custom port
\`\`\`

## SSH Keys:
\`\`\`bash
# Generate key pair
ssh-keygen -t rsa -b 4096

# Copy to server
ssh-copy-id user@host

# Now login without password!
ssh user@host
\`\`\`

## Copy Files:
\`\`\`bash
scp file.txt user@host:/path/  # Upload
scp user@host:/path/file.txt . # Download
scp -r folder/ user@host:/path # Copy folder
\`\`\`

## SSH Config (~/.ssh/config):
\`\`\`
Host myserver
    HostName 192.168.1.100
    User alice
    Port 22
\`\`\`
Now: \`ssh myserver\`
    `,
                                                exercise: {
                                                    prompt: 'What command generates SSH keys?',
                                                    type: 'multiple-choice',
                                                    options: ['ssh-gen', 'ssh-keygen', 'keygen', 'genkey'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-13',
                                                title: 'Text Processing',
                                                description: 'Advanced text manipulation',
                                                stage: 4,
                                                content: `
# Text Processing

## sed - Stream Editor:
\`\`\`bash
sed 's/old/new/' file.txt          # Replace first
sed 's/old/new/g' file.txt         # Replace all
sed -i 's/old/new/g' file.txt      # Edit in place
\`\`\`

## awk - Pattern Processing:
\`\`\`bash
awk '{print $1}' file.txt          # First column
awk -F',' '{print $2}' data.csv    # CSV column 2
awk '/pattern/' file.txt           # Lines with pattern
\`\`\`

## sort and uniq:
\`\`\`bash
sort file.txt                      # Sort lines
sort -n numbers.txt                # Numeric sort
sort -r file.txt                   # Reverse
uniq file.txt                      # Remove duplicates
sort file.txt | uniq -c            # Count occurrences
\`\`\`

## cut:
\`\`\`bash
cut -d',' -f1,3 data.csv           # Fields 1 and 3
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What command replaces text in streams?',
                                                    type: 'multiple-choice',
                                                    options: ['awk', 'sed', 'cut', 'replace'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-14',
                                                title: 'Compression',
                                                description: 'Archives and compression',
                                                stage: 4,
                                                content: `
# Compression & Archives

## tar (Tape Archive):
\`\`\`bash
# Create archive
tar -cvf archive.tar folder/

# Create compressed
tar -czvf archive.tar.gz folder/

# Extract
tar -xvf archive.tar
tar -xzvf archive.tar.gz

# List contents
tar -tvf archive.tar
\`\`\`

## zip/unzip:
\`\`\`bash
zip archive.zip file1 file2
zip -r archive.zip folder/
unzip archive.zip
unzip -l archive.zip           # List contents
\`\`\`

## gzip:
\`\`\`bash
gzip file.txt                  # Creates file.txt.gz
gunzip file.txt.gz             # Decompress
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'What creates a .tar.gz archive?',
                                                    type: 'multiple-choice',
                                                    options: ['tar -xzvf', 'tar -czvf', 'zip -r', 'gzip'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-15',
                                                title: 'Shell Customization',
                                                description: 'Aliases and profile',
                                                stage: 4,
                                                content: `
# Shell Customization

## Aliases:
\`\`\`bash
# In ~/.bashrc or ~/.zshrc
alias ll="ls -la"
alias gs="git status"
alias gp="git push"
alias ..="cd .."
alias ...="cd ../.."
\`\`\`

## Functions:
\`\`\`bash
mkcd() {
    mkdir -p "$1" && cd "$1"
}

# Usage: mkcd new_folder
\`\`\`

## Prompt Customization:
\`\`\`bash
export PS1="\\u@\\h:\\w$ "
# \\u = username, \\h = hostname, \\w = working dir
\`\`\`

## Oh My Zsh:
\`\`\`bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`
    `,
                                                exercise: {
                                                    prompt: 'Where do you save permanent aliases?',
                                                    type: 'multiple-choice',
                                                    options: ['/etc/aliases', '~/.bashrc', '/bin/alias', '~/.alias'],
                                                    answer: 1
                                                }
                                            },
                                            {
                                                id: 'term-16',
                                                title: 'Terminal Mastery',
                                                description: 'Power user tips',
                                                stage: 4,
                                                content: `
# Terminal Mastery

## Keyboard Shortcuts:
- Ctrl+C - Cancel command
- Ctrl+D - Exit / EOF
- Ctrl+L - Clear screen
- Ctrl+R - Search history
- Ctrl+A - Start of line
- Ctrl+E - End of line
- Tab - Autocomplete

## History:
\`\`\`bash
history                        # Show all
!!                             # Repeat last command
!git                           # Last command starting with "git"
!$                             # Last argument
\`\`\`

## xargs:
\`\`\`bash
find . -name "*.txt" | xargs rm
echo "a b c" | xargs -n1 echo
\`\`\`

## Chaining:
\`\`\`bash
cmd1 && cmd2                   # cmd2 runs if cmd1 succeeds
cmd1 || cmd2                   # cmd2 runs if cmd1 fails
cmd1 ; cmd2                    # Run both regardless
\`\`\`

Congratulations! You've mastered the terminal! 🎉
    `,
                                                exercise: {
                                                    prompt: 'What shortcut searches command history?',
                                                    type: 'multiple-choice',
                                                    options: ['Ctrl+H', 'Ctrl+R', 'Ctrl+S', 'Ctrl+F'],
                                                    answer: 1
                                                }
                                            }

// C++ Course
'cpp': {
                                                id: 'cpp',
                                                name: 'C++',
                                                description: 'Learn C++, a powerful systems programming language.',
                                                category: COURSE_CATEGORIES.SYSTEMS,
                                                icon: '⚡',
                                                color: '#00599C',
                                                language: 'cpp',
                                                prerequisites: ['intro-logic'],
                                                estimatedHours: 15,
                                                lessons: [
                                                    {
                                                        id: 'cpp-1',
                                                        title: 'Hello C++',
                                                        description: 'Your first C++ program',
                                                        stage: 1,
                                                        content: `
# Hello C++

C++ is a powerful language used for games, operating systems, and high-performance apps.

## In Natural Language:
\`\`\`
display "Hello, World!" end display
\`\`\`

## Real C++:
\`\`\`cpp
#include <iostream>
int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`
                `,
                                                        exercise: {
                                                            prompt: 'Write: display "Hello C++" end display',
                                                            type: 'code',
                                                            expectedOutput: 'Hello C++',
                                                            hint: 'Use display and end display'
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-2',
                                                        title: 'Variables in C++',
                                                        description: 'Storing data with types',
                                                        stage: 2,
                                                        content: `
# Variables in C++

C++ requires you to declare the type of each variable.

## Types:
- \`int\` - Whole numbers
- \`double\` - Decimal numbers
- \`string\` - Text
- \`bool\` - True/False

## Natural Language:
\`\`\`
create number x = 10
create text name = "Alice"
\`\`\`
                `,
                                                        exercise: {
                                                            prompt: 'Write: create number age = 25',
                                                            type: 'code',
                                                            expectedOutput: 'create number age = 25',
                                                            hint: 'Declare a number variable called age'
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-3',
                                                        title: 'Input and Output',
                                                        description: 'Reading and writing data',
                                                        stage: 2,
                                                        content: `
# Input and Output

## Output with cout:
\`\`\`cpp
#include <iostream>
using namespace std;

cout << "Hello!" << endl;
cout << "Age: " << 25 << endl;
\`\`\`

## Input with cin:
\`\`\`cpp
int age;
cout << "Enter age: ";
cin >> age;
cout << "You are " << age << endl;
\`\`\`

## Multiple Inputs:
\`\`\`cpp
string name;
int age;
cout << "Name and age: ";
cin >> name >> age;
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What object reads user input in C++?',
                                                            type: 'multiple-choice',
                                                            options: ['cout', 'cin', 'scanf', 'read'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-4',
                                                        title: 'Control Flow',
                                                        description: 'if, else, loops',
                                                        stage: 2,
                                                        content: `
# Control Flow

## If-Else:
\`\`\`cpp
if (age >= 18) {
    cout << "Adult" << endl;
} else if (age >= 13) {
    cout << "Teen" << endl;
} else {
    cout << "Child" << endl;
}
\`\`\`

## For Loop:
\`\`\`cpp
for (int i = 0; i < 5; i++) {
    cout << i << endl;
}
\`\`\`

## While Loop:
\`\`\`cpp
int count = 0;
while (count < 5) {
    cout << count << endl;
    count++;
}
\`\`\`

## Switch:
\`\`\`cpp
switch (choice) {
    case 1:
        cout << "One";
        break;
    case 2:
        cout << "Two";
        break;
    default:
        cout << "Other";
}
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What keyword ends a switch case?',
                                                            type: 'multiple-choice',
                                                            options: ['end', 'stop', 'break', 'exit'],
                                                            answer: 2
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-5',
                                                        title: 'Functions',
                                                        description: 'Reusable code blocks',
                                                        stage: 3,
                                                        content: `
# Functions

## Function Declaration:
\`\`\`cpp
// Return type, name, parameters
int add(int a, int b) {
    return a + b;
}

void greet(string name) {
    cout << "Hello, " << name << endl;
}
\`\`\`

## Function Overloading:
\`\`\`cpp
int add(int a, int b) { return a + b; }
double add(double a, double b) { return a + b; }

add(1, 2);       // Calls int version
add(1.5, 2.5);   // Calls double version
\`\`\`

## Default Parameters:
\`\`\`cpp
void greet(string name = "World") {
    cout << "Hello, " << name << endl;
}

greet();        // Hello, World
greet("Alice"); // Hello, Alice
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What return type means no value returned?',
                                                            type: 'multiple-choice',
                                                            options: ['null', 'void', 'none', 'empty'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-6',
                                                        title: 'Arrays',
                                                        description: 'Collections of elements',
                                                        stage: 3,
                                                        content: `
# Arrays

## Fixed Arrays:
\`\`\`cpp
int numbers[5] = {1, 2, 3, 4, 5};
string names[3] = {"Alice", "Bob", "Charlie"};

cout << numbers[0];  // 1
numbers[0] = 10;     // Modify
\`\`\`

## Array Size:
\`\`\`cpp
int arr[5];
int size = sizeof(arr) / sizeof(arr[0]);  // 5
\`\`\`

## Looping:
\`\`\`cpp
for (int i = 0; i < 5; i++) {
    cout << numbers[i] << endl;
}

// Range-based (C++11)
for (int num : numbers) {
    cout << num << endl;
}
\`\`\`

## 2D Arrays:
\`\`\`cpp
int matrix[2][3] = {
    {1, 2, 3},
    {4, 5, 6}
};
cout << matrix[0][1];  // 2
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What index is the first element?',
                                                            type: 'multiple-choice',
                                                            options: ['1', '0', '-1', 'first'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-7',
                                                        title: 'Pointers Basics',
                                                        description: 'Memory addresses',
                                                        stage: 3,
                                                        content: `
# Pointers

Pointers store memory addresses!

## Declaring Pointers:
\`\`\`cpp
int x = 10;
int* ptr = &x;    // ptr holds address of x

cout << x;        // 10 (value)
cout << &x;       // 0x7fff... (address)
cout << ptr;      // Same address
cout << *ptr;     // 10 (dereference)
\`\`\`

## Modifying via Pointer:
\`\`\`cpp
*ptr = 20;        // Changes x to 20
cout << x;        // 20
\`\`\`

## Null Pointer:
\`\`\`cpp
int* ptr = nullptr;

if (ptr != nullptr) {
    cout << *ptr;
}
\`\`\`

## Pointer Arithmetic:
\`\`\`cpp
int arr[3] = {10, 20, 30};
int* p = arr;

cout << *p;       // 10
cout << *(p+1);   // 20
cout << *(p+2);   // 30
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What operator gets the address of a variable?',
                                                            type: 'multiple-choice',
                                                            options: ['*', '&', '@', '#'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-8',
                                                        title: 'References',
                                                        description: 'Aliases for variables',
                                                        stage: 3,
                                                        content: `
# References

References are aliases!

## Creating References:
\`\`\`cpp
int x = 10;
int& ref = x;     // ref is alias for x

ref = 20;         // Changes x
cout << x;        // 20
\`\`\`

## Pass by Reference:
\`\`\`cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}

int x = 1, y = 2;
swap(x, y);
// Now x=2, y=1
\`\`\`

## Const Reference:
\`\`\`cpp
void print(const string& s) {
    cout << s;  // Can read, can't modify
}
\`\`\`

## Reference vs Pointer:
- Reference: Must initialize, can't be null
- Pointer: Can be null, can reassign
    `,
                                                        exercise: {
                                                            prompt: 'What does & mean in a parameter?',
                                                            type: 'multiple-choice',
                                                            options: ['Address of', 'Pass by reference', 'Pointer', 'Copy'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-9',
                                                        title: 'Dynamic Memory',
                                                        description: 'new and delete',
                                                        stage: 3,
                                                        content: `
# Dynamic Memory

Allocate memory at runtime!

## new and delete:
\`\`\`cpp
int* ptr = new int;       // Allocate
*ptr = 42;
delete ptr;               // Free memory

int* arr = new int[5];    // Array
delete[] arr;             // Free array
\`\`\`

## Why Dynamic Memory?
- Size unknown at compile time
- Survive function scope
- Large data structures

## Memory Leaks:
\`\`\`cpp
// BAD - memory leak
void bad() {
    int* p = new int;
    // Forgot delete!
}

// GOOD
void good() {
    int* p = new int;
    // Use p...
    delete p;
}
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What frees dynamically allocated arrays?',
                                                            type: 'multiple-choice',
                                                            options: ['delete', 'delete[]', 'free', 'remove'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-10',
                                                        title: 'Strings',
                                                        description: 'String operations',
                                                        stage: 3,
                                                        content: `
# Strings

## C++ Strings:
\`\`\`cpp
#include <string>

string s = "Hello";
string s2 = "World";

// Concatenation
string full = s + " " + s2;

// Length
cout << s.length();     // 5

// Access
cout << s[0];           // 'H'

// Substring
cout << s.substr(0, 3); // "Hel"
\`\`\`

## String Methods:
\`\`\`cpp
s.find("llo");          // 2 (position)
s.replace(0, 2, "Je");  // "Jello"
s.empty();              // false
s.clear();              // Makes empty
\`\`\`

## Input with Spaces:
\`\`\`cpp
string line;
getline(cin, line);     // Reads whole line
\`\`\`

## Comparison:
\`\`\`cpp
if (s1 == s2) { }
if (s1 < s2) { }        // Lexicographic
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What reads a line with spaces?',
                                                            type: 'multiple-choice',
                                                            options: ['cin >>', 'getline()', 'readline()', 'scanline()'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-11',
                                                        title: 'Vectors',
                                                        description: 'Dynamic arrays',
                                                        stage: 4,
                                                        content: `
# Vectors

Dynamic arrays from STL!

## Creating Vectors:
\`\`\`cpp
#include <vector>

vector<int> nums;                    // Empty
vector<int> nums2(5, 0);             // 5 zeros
vector<int> nums3 = {1, 2, 3, 4, 5}; // Initialized
\`\`\`

## Operations:
\`\`\`cpp
nums.push_back(10);    // Add to end
nums.pop_back();       // Remove last
nums.size();           // Current size
nums.empty();          // Is empty?
nums.clear();          // Remove all
nums[0];               // Access (no bounds check)
nums.at(0);            // Access (with bounds check)
\`\`\`

## Iterating:
\`\`\`cpp
for (int i = 0; i < nums.size(); i++) {
    cout << nums[i] << endl;
}

for (int n : nums) {
    cout << n << endl;
}
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What adds an element to a vector?',
                                                            type: 'multiple-choice',
                                                            options: ['add()', 'append()', 'push_back()', 'insert()'],
                                                            answer: 2
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-12',
                                                        title: 'Maps',
                                                        description: 'Key-value pairs',
                                                        stage: 4,
                                                        content: `
# Maps

Key-value containers!

## Creating Maps:
\`\`\`cpp
#include <map>

map<string, int> ages;
ages["Alice"] = 25;
ages["Bob"] = 30;

// Or
map<string, int> ages = {
    {"Alice", 25},
    {"Bob", 30}
};
\`\`\`

## Operations:
\`\`\`cpp
ages["Charlie"] = 35;        // Insert/update
cout << ages["Alice"];       // 25

ages.count("Alice");         // 1 if exists, 0 if not
ages.erase("Bob");           // Remove
ages.size();                 // Number of pairs
\`\`\`

## Iterating:
\`\`\`cpp
for (auto& pair : ages) {
    cout << pair.first << ": " << pair.second << endl;
}
\`\`\`

## Unordered Map (faster):
\`\`\`cpp
#include <unordered_map>
unordered_map<string, int> data;
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What property holds the key in a map pair?',
                                                            type: 'multiple-choice',
                                                            options: ['key', 'first', 'name', 'index'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-13',
                                                        title: 'Classes Basics',
                                                        description: 'Object-oriented programming',
                                                        stage: 4,
                                                        content: `
# Classes

## Defining a Class:
\`\`\`cpp
class Person {
private:
    string name;
    int age;

public:
    // Constructor
    Person(string n, int a) {
        name = n;
        age = a;
    }
    
    // Methods
    void introduce() {
        cout << "I'm " << name << ", " << age << endl;
    }
    
    // Getters
    string getName() { return name; }
    int getAge() { return age; }
    
    // Setters
    void setAge(int a) { age = a; }
};
\`\`\`

## Using Classes:
\`\`\`cpp
Person p("Alice", 25);
p.introduce();
cout << p.getName();
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What access modifier hides data?',
                                                            type: 'multiple-choice',
                                                            options: ['public', 'private', 'protected', 'hidden'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-14',
                                                        title: 'Constructors and Destructors',
                                                        description: 'Object lifecycle',
                                                        stage: 4,
                                                        content: `
# Constructors & Destructors

## Constructor Types:
\`\`\`cpp
class Box {
private:
    double length;

public:
    // Default constructor
    Box() : length(0) {}
    
    // Parameterized
    Box(double l) : length(l) {}
    
    // Copy constructor
    Box(const Box& other) : length(other.length) {}
};
\`\`\`

## Destructor:
\`\`\`cpp
class Resource {
private:
    int* data;

public:
    Resource() {
        data = new int[100];
        cout << "Allocated" << endl;
    }
    
    ~Resource() {
        delete[] data;
        cout << "Freed" << endl;
    }
};
\`\`\`

## Initializer List:
\`\`\`cpp
class Point {
    int x, y;
public:
    Point(int a, int b) : x(a), y(b) {}  // Preferred
};
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What cleans up when object is destroyed?',
                                                            type: 'multiple-choice',
                                                            options: ['constructor', 'destructor', 'finalizer', 'cleaner'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-15',
                                                        title: 'Inheritance',
                                                        description: 'Extending classes',
                                                        stage: 4,
                                                        content: `
# Inheritance

## Basic Inheritance:
\`\`\`cpp
class Animal {
protected:
    string name;
public:
    Animal(string n) : name(n) {}
    void eat() { cout << name << " eats" << endl; }
};

class Dog : public Animal {
public:
    Dog(string n) : Animal(n) {}
    void bark() { cout << name << " barks" << endl; }
};
\`\`\`

## Usage:
\`\`\`cpp
Dog d("Buddy");
d.eat();   // Inherited
d.bark();  // Own method
\`\`\`

## Access Levels:
- public: accessible everywhere
- protected: class + derived classes
- private: class only

## Types of Inheritance:
\`\`\`cpp
class A : public B { };    // Public inheritance
class A : protected B { }; // Protected
class A : private B { };   // Private (default)
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What access allows derived class access?',
                                                            type: 'multiple-choice',
                                                            options: ['public only', 'protected', 'private', 'friend'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-16',
                                                        title: 'Polymorphism',
                                                        description: 'Virtual functions',
                                                        stage: 4,
                                                        content: `
# Polymorphism

## Virtual Functions:
\`\`\`cpp
class Shape {
public:
    virtual double area() { return 0; }
};

class Circle : public Shape {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double area() override { return 3.14159 * radius * radius; }
};

class Rectangle : public Shape {
    double w, h;
public:
    Rectangle(double w, double h) : w(w), h(h) {}
    double area() override { return w * h; }
};
\`\`\`

## Using Polymorphism:
\`\`\`cpp
Shape* shapes[2];
shapes[0] = new Circle(5);
shapes[1] = new Rectangle(4, 6);

for (Shape* s : shapes) {
    cout << s->area() << endl;  // Calls correct version!
}
\`\`\`

## Pure Virtual (Abstract):
\`\`\`cpp
class Shape {
public:
    virtual double area() = 0;  // Must override
};
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What keyword enables runtime polymorphism?',
                                                            type: 'multiple-choice',
                                                            options: ['abstract', 'virtual', 'override', 'dynamic'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-17',
                                                        title: 'Templates',
                                                        description: 'Generic programming',
                                                        stage: 4,
                                                        content: `
# Templates

Write code once, use with any type!

## Function Templates:
\`\`\`cpp
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

cout << maximum(5, 3);        // int
cout << maximum(5.5, 3.3);    // double
cout << maximum('a', 'z');    // char
\`\`\`

## Class Templates:
\`\`\`cpp
template <typename T>
class Box {
    T value;
public:
    Box(T v) : value(v) {}
    T get() { return value; }
};

Box<int> intBox(42);
Box<string> strBox("Hello");
\`\`\`

## Multiple Parameters:
\`\`\`cpp
template <typename T, typename U>
class Pair {
    T first;
    U second;
public:
    Pair(T a, U b) : first(a), second(b) {}
};

Pair<string, int> p("Age", 25);
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What keyword declares a template?',
                                                            type: 'multiple-choice',
                                                            options: ['generic', 'template', 'type', 'any'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-18',
                                                        title: 'Smart Pointers',
                                                        description: 'Automatic memory management',
                                                        stage: 4,
                                                        content: `
# Smart Pointers

Automatic cleanup!

## unique_ptr:
\`\`\`cpp
#include <memory>

unique_ptr<int> p1 = make_unique<int>(42);
cout << *p1;  // 42

// Automatically deleted when out of scope
// Cannot be copied, only moved
\`\`\`

## shared_ptr:
\`\`\`cpp
shared_ptr<int> p1 = make_shared<int>(42);
shared_ptr<int> p2 = p1;  // Both point to same

cout << p1.use_count();  // 2

// Deleted when last reference goes away
\`\`\`

## weak_ptr:
\`\`\`cpp
shared_ptr<int> sp = make_shared<int>(42);
weak_ptr<int> wp = sp;  // Doesn't increase count

if (auto p = wp.lock()) {
    cout << *p;
}
\`\`\`

## When to Use:
- unique_ptr: Single ownership (default choice)
- shared_ptr: Shared ownership
- weak_ptr: Break circular references
    `,
                                                        exercise: {
                                                            prompt: 'What smart pointer allows only one owner?',
                                                            type: 'multiple-choice',
                                                            options: ['shared_ptr', 'unique_ptr', 'weak_ptr', 'auto_ptr'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-19',
                                                        title: 'Exception Handling',
                                                        description: 'Error handling',
                                                        stage: 4,
                                                        content: `
# Exception Handling

## try-catch:
\`\`\`cpp
try {
    int result = divide(10, 0);
} catch (const runtime_error& e) {
    cout << "Error: " << e.what() << endl;
} catch (...) {
    cout << "Unknown error" << endl;
}
\`\`\`

## Throwing Exceptions:
\`\`\`cpp
double divide(double a, double b) {
    if (b == 0) {
        throw runtime_error("Division by zero");
    }
    return a / b;
}
\`\`\`

## Standard Exceptions:
\`\`\`cpp
#include <stdexcept>

throw logic_error("Invalid logic");
throw runtime_error("Runtime problem");
throw out_of_range("Index out of range");
throw invalid_argument("Bad argument");
\`\`\`

## Custom Exceptions:
\`\`\`cpp
class MyException : public exception {
public:
    const char* what() const noexcept override {
        return "My custom error";
    }
};
\`\`\`
    `,
                                                        exercise: {
                                                            prompt: 'What keyword throws an exception?',
                                                            type: 'multiple-choice',
                                                            options: ['raise', 'throw', 'error', 'except'],
                                                            answer: 1
                                                        }
                                                    },
                                                    {
                                                        id: 'cpp-20',
                                                        title: 'File I/O',
                                                        description: 'Reading and writing files',
                                                        stage: 4,
                                                        content: `
# File I/O

## Writing Files:
\`\`\`cpp
#include <fstream>

ofstream file("output.txt");
if (file.is_open()) {
    file << "Hello, File!" << endl;
    file << 42 << endl;
    file.close();
}
\`\`\`

## Reading Files:
\`\`\`cpp
ifstream file("input.txt");
string line;
while (getline(file, line)) {
    cout << line << endl;
}
file.close();
\`\`\`

## Read/Write:
\`\`\`cpp
fstream file("data.txt", ios::in | ios::out);
\`\`\`

## Binary Files:
\`\`\`cpp
ofstream out("data.bin", ios::binary);
int num = 42;
out.write(reinterpret_cast<char*>(&num), sizeof(num));
out.close();
\`\`\`

## Checking File State:
\`\`\`cpp
if (file.good()) { }
if (file.eof()) { }
if (file.fail()) { }
\`\`\`

Congratulations! You've learned C++! 🎉
    `,
                                                        exercise: {
                                                            prompt: 'What class writes to files?',
                                                            type: 'multiple-choice',
                                                            options: ['fstream', 'ofstream', 'ifstream', 'filestream'],
                                                            answer: 1
                                                        }
                                                    }

// Rust Course
'rust': {
                                                        id: 'rust',
                                                        name: 'Rust',
                                                        description: 'Learn Rust, a safe and fast systems language.',
                                                        category: COURSE_CATEGORIES.SYSTEMS,
                                                        icon: '🦀',
                                                        color: '#CE422B',
                                                        language: 'rust',
                                                        prerequisites: ['intro-logic', 'terminal'],
                                                        estimatedHours: 18,
                                                        lessons: [
                                                            {
                                                                id: 'rust-1',
                                                                title: 'Hello Rust',
                                                                description: 'Your first Rust program',
                                                                stage: 1,
                                                                content: `
# Hello Rust

Rust is known for memory safety without garbage collection.

## Natural Language:
\`\`\`
display "Hello, Rust!" end display
\`\`\`

## Real Rust:
\`\`\`rust
fn main() {
    println!("Hello, Rust!");
}
\`\`\`
                `,
                                                                exercise: {
                                                                    prompt: 'Write a display statement for "Welcome to Rust"',
                                                                    type: 'code',
                                                                    expectedOutput: 'Welcome to Rust',
                                                                    hint: 'Use display "..." end display'
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-2',
                                                                title: 'Variables and Mutability',
                                                                description: 'Understanding let and mut',
                                                                stage: 2,
                                                                content: `
# Variables in Rust

Rust variables are immutable by default!

## Immutable:
\`\`\`
create x = 5
\`\`\`

## Mutable:
\`\`\`
create changeable y = 10
\`\`\`

## Real Rust:
\`\`\`rust
let x = 5;        // Immutable
let mut y = 10;   // Mutable
\`\`\`
                `,
                                                                exercise: {
                                                                    prompt: 'What keyword makes a variable changeable in Rust?',
                                                                    type: 'multiple-choice',
                                                                    options: ['var', 'mut', 'let', 'change'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-3',
                                                                title: 'Data Types',
                                                                description: 'Scalars and compounds',
                                                                stage: 2,
                                                                content: `
# Data Types

## Scalar Types:
\`\`\`rust
let x: i32 = 42;        // Signed integer
let y: u32 = 42;        // Unsigned integer
let f: f64 = 3.14;      // Float
let b: bool = true;     // Boolean
let c: char = 'A';      // Character
\`\`\`

## Integer Sizes:
- i8, i16, i32, i64, i128 (signed)
- u8, u16, u32, u64, u128 (unsigned)

## Compound Types:
\`\`\`rust
// Tuple
let tup: (i32, f64, char) = (500, 6.4, 'y');
let (x, y, z) = tup;  // Destructuring

// Array
let arr: [i32; 5] = [1, 2, 3, 4, 5];
let first = arr[0];
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What is u32?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Signed 32-bit', 'Unsigned 32-bit', 'Unicode', 'Unknown'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-4',
                                                                title: 'Functions',
                                                                description: 'Defining and calling functions',
                                                                stage: 2,
                                                                content: `
# Functions

## Defining Functions:
\`\`\`rust
fn greet(name: &str) {
    println!("Hello, {}!", name);
}

fn add(a: i32, b: i32) -> i32 {
    a + b  // No semicolon = return value
}
\`\`\`

## Calling:
\`\`\`rust
greet("Alice");
let sum = add(5, 3);
\`\`\`

## Statements vs Expressions:
\`\`\`rust
fn example() -> i32 {
    let x = 5;      // Statement
    x + 1           // Expression (returned)
}
\`\`\`

## Multiple Returns:
\`\`\`rust
fn swap(a: i32, b: i32) -> (i32, i32) {
    (b, a)
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What does -> indicate in Rust?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Input', 'Return type', 'Arrow function', 'Pointer'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-5',
                                                                title: 'Control Flow',
                                                                description: 'if, loops, and match',
                                                                stage: 3,
                                                                content: `
# Control Flow

## If Expression:
\`\`\`rust
if x > 5 {
    println!("big");
} else if x > 0 {
    println!("small");
} else {
    println!("zero or negative");
}

// If as expression
let y = if x > 5 { "big" } else { "small" };
\`\`\`

## Loop:
\`\`\`rust
loop {
    println!("forever!");
    break;  // Exit loop
}

let result = loop {
    break 42;  // Return value
};
\`\`\`

## While and For:
\`\`\`rust
while count < 5 {
    count += 1;
}

for i in 0..5 {
    println!("{}", i);
}

for item in arr.iter() {
    println!("{}", item);
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What is 0..5 in Rust?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Slice', 'Range', 'Array', 'Tuple'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-6',
                                                                title: 'Ownership',
                                                                description: 'Rust\'s unique memory system',
                                                                stage: 3,
                                                                content: `
# Ownership

Rust's key feature!

## Rules:
1. Each value has one owner
2. Only one owner at a time
3. Value dropped when owner goes out of scope

## Move:
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1;  // s1 is moved to s2
// println!("{}", s1);  // ERROR! s1 invalid
println!("{}", s2);     // OK
\`\`\`

## Clone (deep copy):
\`\`\`rust
let s1 = String::from("hello");
let s2 = s1.clone();    // Deep copy
println!("{} {}", s1, s2);  // Both valid
\`\`\`

## Copy (stack data):
\`\`\`rust
let x = 5;
let y = x;  // Copy, both valid
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What happens when you assign a String to another variable?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Copy', 'Move', 'Clone', 'Reference'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-7',
                                                                title: 'Borrowing',
                                                                description: 'References without ownership',
                                                                stage: 3,
                                                                content: `
# Borrowing

Use values without taking ownership!

## Immutable References:
\`\`\`rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

let s1 = String::from("hello");
let len = calculate_length(&s1);  // Borrow
println!("{} has length {}", s1, len);  // s1 still valid!
\`\`\`

## Mutable References:
\`\`\`rust
fn change(s: &mut String) {
    s.push_str(" world");
}

let mut s = String::from("hello");
change(&mut s);
\`\`\`

## Rules:
- Many immutable references OR one mutable reference
- No dangling references

\`\`\`rust
let mut s = String::from("hello");
let r1 = &s;      // OK
let r2 = &s;      // OK
// let r3 = &mut s;  // ERROR! Can't have mutable + immutable
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What symbol creates a reference?',
                                                                    type: 'multiple-choice',
                                                                    options: ['*', '&', '@', '#'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-8',
                                                                title: 'Structs',
                                                                description: 'Custom data types',
                                                                stage: 3,
                                                                content: `
# Structs

## Defining Structs:
\`\`\`rust
struct User {
    username: String,
    email: String,
    active: bool,
    sign_in_count: u64,
}
\`\`\`

## Creating Instances:
\`\`\`rust
let user1 = User {
    username: String::from("alice"),
    email: String::from("alice@example.com"),
    active: true,
    sign_in_count: 1,
};

println!("{}", user1.username);
\`\`\`

## Mutable Struct:
\`\`\`rust
let mut user2 = User { ... };
user2.email = String::from("new@example.com");
\`\`\`

## Tuple Structs:
\`\`\`rust
struct Color(i32, i32, i32);
let black = Color(0, 0, 0);
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'How do you access struct fields?',
                                                                    type: 'multiple-choice',
                                                                    options: ['user1["username"]', 'user1.username', 'user1->username', 'user1::username'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-9',
                                                                title: 'Methods',
                                                                description: 'Functions on structs',
                                                                stage: 3,
                                                                content: `
# Methods

## impl Block:
\`\`\`rust
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
    
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
\`\`\`

## Using Methods:
\`\`\`rust
let rect = Rectangle { width: 30, height: 50 };
println!("Area: {}", rect.area());
\`\`\`

## Associated Functions (like static):
\`\`\`rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle { width: size, height: size }
    }
}

let sq = Rectangle::square(10);
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What is &self in a method?',
                                                                    type: 'multiple-choice',
                                                                    options: ['A new instance', 'Reference to the instance', 'A static variable', 'A copy'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-10',
                                                                title: 'Enums',
                                                                description: 'Custom types with variants',
                                                                stage: 3,
                                                                content: `
# Enums

## Basic Enums:
\`\`\`rust
enum Direction {
    Up,
    Down,
    Left,
    Right,
}

let dir = Direction::Up;
\`\`\`

## Enums with Data:
\`\`\`rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}

let msg = Message::Write(String::from("hello"));
\`\`\`

## Option Enum:
\`\`\`rust
enum Option<T> {
    Some(T),
    None,
}

let some_number = Some(5);
let no_number: Option<i32> = None;
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What replaces null in Rust?',
                                                                    type: 'multiple-choice',
                                                                    options: ['nil', 'None', 'null', 'undefined'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-11',
                                                                title: 'Pattern Matching',
                                                                description: 'match expressions',
                                                                stage: 3,
                                                                content: `
# Pattern Matching

## match Expression:
\`\`\`rust
let x = 1;

match x {
    1 => println!("one"),
    2 => println!("two"),
    3 => println!("three"),
    _ => println!("other"),
}
\`\`\`

## Matching Option:
\`\`\`rust
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
\`\`\`

## if let:
\`\`\`rust
let some_value = Some(3);

if let Some(3) = some_value {
    println!("three!");
}
\`\`\`

## Destructuring:
\`\`\`rust
match point {
    (0, 0) => println!("origin"),
    (x, 0) => println!("on x-axis at {}", x),
    (0, y) => println!("on y-axis at {}", y),
    (x, y) => println!("at ({}, {})", x, y),
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What is _ in match?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Underscore literal', 'Catch-all pattern', 'Ignore', 'Error'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-12',
                                                                title: 'Vectors',
                                                                description: 'Dynamic arrays',
                                                                stage: 4,
                                                                content: `
# Vectors

## Creating Vectors:
\`\`\`rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3, 4, 5];
\`\`\`

## Operations:
\`\`\`rust
let mut v = Vec::new();
v.push(5);
v.push(6);
v.pop();

let third = &v[2];  // Panics if out of bounds
let third = v.get(2);  // Returns Option
\`\`\`

## Iterating:
\`\`\`rust
for i in &v {
    println!("{}", i);
}

for i in &mut v {
    *i += 50;
}
\`\`\`

## With Enums:
\`\`\`rust
enum Cell {
    Int(i32),
    Float(f64),
    Text(String),
}

let row = vec![
    Cell::Int(3),
    Cell::Text(String::from("blue")),
    Cell::Float(10.12),
];
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'How do you create a vector with values?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Vec::new([1,2,3])', 'vec![1, 2, 3]', 'Vector(1, 2, 3)', '[1, 2, 3].to_vec()'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-13',
                                                                title: 'Strings',
                                                                description: 'String handling',
                                                                stage: 4,
                                                                content: `
# Strings

## Two String Types:
- \`String\`: Growable, heap-allocated
- \`&str\`: String slice (reference)

## Creating Strings:
\`\`\`rust
let s = String::from("hello");
let s = "hello".to_string();
\`\`\`

## Operations:
\`\`\`rust
let mut s = String::from("hello");
s.push_str(" world");
s.push('!');

let s2 = "foo";
let s3 = s + &s2;  // s is moved!
\`\`\`

## Format:
\`\`\`rust
let s1 = String::from("tic");
let s2 = String::from("tac");
let s3 = String::from("toe");

let s = format!("{}-{}-{}", s1, s2, s3);
\`\`\`

## Slicing:
\`\`\`rust
let s = String::from("hello");
let slice = &s[0..2];  // "he"
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What is &str?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Mutable string', 'String slice', 'String pointer', 'Character'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-14',
                                                                title: 'HashMaps',
                                                                description: 'Key-value storage',
                                                                stage: 4,
                                                                content: `
# HashMaps

## Creating:
\`\`\`rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Red"), 50);
\`\`\`

## Accessing:
\`\`\`rust
let team = String::from("Blue");
let score = scores.get(&team);  // Returns Option<&V>

match score {
    Some(s) => println!("{}", s),
    None => println!("Team not found"),
}
\`\`\`

## Updating:
\`\`\`rust
// Overwrite
scores.insert(String::from("Blue"), 25);

// Insert if not present
scores.entry(String::from("Yellow")).or_insert(50);

// Update based on old value
let count = map.entry(key).or_insert(0);
*count += 1;
\`\`\`

## Iterating:
\`\`\`rust
for (key, value) in &scores {
    println!("{}: {}", key, value);
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What does or_insert do?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Always inserts', 'Inserts if key missing', 'Returns Option', 'Deletes key'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-15',
                                                                title: 'Error Handling',
                                                                description: 'Result and panic',
                                                                stage: 4,
                                                                content: `
# Error Handling

## Result Enum:
\`\`\`rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}
\`\`\`

## Handling Errors:
\`\`\`rust
use std::fs::File;

let f = File::open("hello.txt");

let f = match f {
    Ok(file) => file,
    Err(error) => panic!("Problem: {:?}", error),
};
\`\`\`

## ? Operator:
\`\`\`rust
fn read_username() -> Result<String, io::Error> {
    let mut s = String::new();
    File::open("hello.txt")?.read_to_string(&mut s)?;
    Ok(s)
}
\`\`\`

## unwrap and expect:
\`\`\`rust
let f = File::open("hello.txt").unwrap();  // Panics on error
let f = File::open("hello.txt").expect("Failed to open");
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What does ? do with errors?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Ignores them', 'Propagates them', 'Logs them', 'Converts to panic'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-16',
                                                                title: 'Traits',
                                                                description: 'Shared behavior',
                                                                stage: 4,
                                                                content: `
# Traits

Like interfaces in other languages!

## Defining Traits:
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String;
}
\`\`\`

## Implementing:
\`\`\`rust
struct Article {
    headline: String,
    content: String,
}

impl Summary for Article {
    fn summarize(&self) -> String {
        format!("{}: {}", self.headline, self.content)
    }
}
\`\`\`

## Default Implementation:
\`\`\`rust
trait Summary {
    fn summarize(&self) -> String {
        String::from("(Read more...)")
    }
}
\`\`\`

## Trait Bounds:
\`\`\`rust
fn notify(item: &impl Summary) {
    println!("News: {}", item.summarize());
}

fn notify<T: Summary>(item: &T) {
    println!("News: {}", item.summarize());
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What are traits similar to?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Classes', 'Interfaces', 'Structs', 'Enums'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-17',
                                                                title: 'Generics',
                                                                description: 'Type parameters',
                                                                stage: 4,
                                                                content: `
# Generics

Write code for any type!

## Generic Functions:
\`\`\`rust
fn largest<T: PartialOrd>(list: &[T]) -> &T {
    let mut largest = &list[0];
    for item in list {
        if item > largest {
            largest = item;
        }
    }
    largest
}
\`\`\`

## Generic Structs:
\`\`\`rust
struct Point<T> {
    x: T,
    y: T,
}

let integer = Point { x: 5, y: 10 };
let float = Point { x: 1.0, y: 4.0 };
\`\`\`

## Multiple Type Parameters:
\`\`\`rust
struct Point<T, U> {
    x: T,
    y: U,
}

let mixed = Point { x: 5, y: 4.0 };
\`\`\`

## Generic Methods:
\`\`\`rust
impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'Where do you put type parameters?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Before function name', 'After function name', 'In parentheses', 'In square brackets'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-18',
                                                                title: 'Lifetimes',
                                                                description: 'Reference validity',
                                                                stage: 4,
                                                                content: `
# Lifetimes

Ensure references are valid!

## The Problem:
\`\`\`rust
// Won't compile - which input does result reference?
fn longest(x: &str, y: &str) -> &str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

## Lifetime Annotations:
\`\`\`rust
fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() { x } else { y }
}
\`\`\`

## In Structs:
\`\`\`rust
struct Excerpt<'a> {
    part: &'a str,
}
\`\`\`

## Static Lifetime:
\`\`\`rust
let s: &'static str = "I live forever!";
\`\`\`

## Elision Rules:
Rust infers lifetimes in many cases automatically!
    `,
                                                                exercise: {
                                                                    prompt: 'What do lifetimes prevent?',
                                                                    type: 'multiple-choice',
                                                                    options: ['Memory leaks', 'Dangling references', 'Null pointers', 'Race conditions'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-19',
                                                                title: 'Closures',
                                                                description: 'Anonymous functions',
                                                                stage: 4,
                                                                content: `
# Closures

Anonymous functions that capture environment!

## Syntax:
\`\`\`rust
let add_one = |x| x + 1;
let add = |x, y| x + y;
let add_verbose = |x: i32, y: i32| -> i32 { x + y };
\`\`\`

## Capturing:
\`\`\`rust
let x = 4;
let equal_to_x = |z| z == x;  // Captures x
println!("{}", equal_to_x(4));  // true
\`\`\`

## With Iterators:
\`\`\`rust
let v = vec![1, 2, 3];

let doubled: Vec<i32> = v.iter()
    .map(|x| x * 2)
    .collect();

let evens: Vec<i32> = v.into_iter()
    .filter(|x| x % 2 == 0)
    .collect();
\`\`\`

## Move Closures:
\`\`\`rust
let s = String::from("hello");
let closure = move || println!("{}", s);
// s is moved into closure
\`\`\`
    `,
                                                                exercise: {
                                                                    prompt: 'What symbol starts a closure?',
                                                                    type: 'multiple-choice',
                                                                    options: ['{}', '||', '()', '[]'],
                                                                    answer: 1
                                                                }
                                                            },
                                                            {
                                                                id: 'rust-20',
                                                                title: 'Iterators',
                                                                description: 'Processing sequences',
                                                                stage: 4,
                                                                content: `
# Iterators

## Creating Iterators:
\`\`\`rust
let v = vec![1, 2, 3];

let iter = v.iter();       // Borrows
let iter = v.into_iter();  // Takes ownership
let iter = v.iter_mut();   // Mutable borrows
\`\`\`

## Iterator Methods:
\`\`\`rust
let v = vec![1, 2, 3, 4, 5];

// Transform
let doubled: Vec<i32> = v.iter().map(|x| x * 2).collect();

// Filter
let evens: Vec<&i32> = v.iter().filter(|x| *x % 2 == 0).collect();

// Sum
let sum: i32 = v.iter().sum();

// Find
let first_even = v.iter().find(|x| *x % 2 == 0);
\`\`\`

## Chaining:
\`\`\`rust
let result: i32 = v.iter()
    .filter(|x| *x % 2 == 0)
    .map(|x| x * 2)
    .sum();
\`\`\`

Congratulations! You've learned Rust! 🎉
    `,
                                                                exercise: {
                                                                    prompt: 'What turns an iterator into a collection?',
                                                                    type: 'multiple-choice',
                                                                    options: ['to_vec()', 'collect()', 'gather()', 'build()'],
                                                                    answer: 1
                                                                }
                                                            }

// TypeScript Course
'typescript': {
                                                                id: 'typescript',
                                                                name: 'TypeScript',
                                                                description: 'JavaScript with types - catch errors before they happen.',
                                                                category: COURSE_CATEGORIES.WEB,
                                                                icon: '🔷',
                                                                color: '#3178C6',
                                                                language: 'typescript',
                                                                prerequisites: ['javascript'],
                                                                estimatedHours: 10,
                                                                lessons: [
                                                                    {
                                                                        id: 'ts-1',
                                                                        title: 'Why TypeScript?',
                                                                        description: 'Adding types to JavaScript',
                                                                        stage: 1,
                                                                        content: `
# Why TypeScript?

TypeScript is JavaScript with type checking.

## Benefits:
- Catch bugs before running code
- Better editor autocomplete
- Easier to maintain large projects

## Example:
\`\`\`typescript
let name: string = "Alice";
let age: number = 25;
\`\`\`
                `,
                                                                        exercise: {
                                                                            prompt: 'What does TypeScript add to JavaScript?',
                                                                            type: 'multiple-choice',
                                                                            options: ['Speed', 'Types', 'Graphics', 'Sound'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-2',
                                                                        title: 'Basic Types',
                                                                        description: 'String, number, boolean',
                                                                        stage: 2,
                                                                        content: `
# Basic Types

## Common Types:
- \`string\` - Text
- \`number\` - Any number
- \`boolean\` - True/False
- \`any\` - Skip type checking

## Natural Language:
\`\`\`
create text message = "Hello"
create number count = 42
\`\`\`
                `,
                                                                        exercise: {
                                                                            prompt: 'Write: create number score = 100',
                                                                            type: 'code',
                                                                            expectedOutput: 'create number score = 100',
                                                                            hint: 'Declare a typed number variable'
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-3',
                                                                        title: 'Arrays and Tuples',
                                                                        description: 'Typed collections',
                                                                        stage: 2,
                                                                        content: `
# Arrays and Tuples

## Typed Arrays:
\`\`\`typescript
let numbers: number[] = [1, 2, 3, 4, 5];
let names: string[] = ["Alice", "Bob"];

// Alternative syntax
let scores: Array<number> = [90, 85, 88];
\`\`\`

## Tuples:
Fixed-length arrays with specific types at each position.
\`\`\`typescript
let person: [string, number] = ["Alice", 25];
let point: [number, number, number] = [1, 2, 3];

console.log(person[0]);  // "Alice"
console.log(person[1]);  // 25
\`\`\`

## Readonly Arrays:
\`\`\`typescript
let readonlyArr: readonly number[] = [1, 2, 3];
// readonlyArr.push(4);  // Error!
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What is [string, number] called?',
                                                                            type: 'multiple-choice',
                                                                            options: ['Array', 'Tuple', 'Object', 'Union'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-4',
                                                                        title: 'Functions',
                                                                        description: 'Typed function parameters and returns',
                                                                        stage: 2,
                                                                        content: `
# Functions

## Typed Parameters:
\`\`\`typescript
function greet(name: string): void {
    console.log("Hello, " + name);
}

function add(a: number, b: number): number {
    return a + b;
}
\`\`\`

## Optional Parameters:
\`\`\`typescript
function greet(name: string, greeting?: string): string {
    return (greeting || "Hello") + ", " + name;
}

greet("Alice");           // "Hello, Alice"
greet("Alice", "Hi");     // "Hi, Alice"
\`\`\`

## Default Parameters:
\`\`\`typescript
function greet(name: string, greeting: string = "Hello"): string {
    return greeting + ", " + name;
}
\`\`\`

## Arrow Functions:
\`\`\`typescript
const add = (a: number, b: number): number => a + b;
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What does void mean?',
                                                                            type: 'multiple-choice',
                                                                            options: ['Returns undefined', 'Returns null', 'Returns nothing', 'Returns any'],
                                                                            answer: 2
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-5',
                                                                        title: 'Objects and Interfaces',
                                                                        description: 'Defining object shapes',
                                                                        stage: 3,
                                                                        content: `
# Objects and Interfaces

## Object Types:
\`\`\`typescript
let user: { name: string; age: number } = {
    name: "Alice",
    age: 25
};
\`\`\`

## Interfaces:
\`\`\`typescript
interface User {
    name: string;
    age: number;
    email?: string;  // Optional
}

let user: User = {
    name: "Alice",
    age: 25
};
\`\`\`

## Readonly Properties:
\`\`\`typescript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p: Point = { x: 10, y: 20 };
// p.x = 5;  // Error!
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What makes a property optional?',
                                                                            type: 'multiple-choice',
                                                                            options: ['optional keyword', '? after name', 'undefined type', 'null value'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-6',
                                                                        title: 'Union Types',
                                                                        description: 'Multiple possible types',
                                                                        stage: 3,
                                                                        content: `
# Union Types

A value can be one of several types!

## Basic Unions:
\`\`\`typescript
let id: string | number;
id = "abc123";  // OK
id = 123;       // OK
// id = true;   // Error!
\`\`\`

## With Functions:
\`\`\`typescript
function printId(id: string | number) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id);
    }
}
\`\`\`

## Literal Types:
\`\`\`typescript
type Direction = "up" | "down" | "left" | "right";

function move(direction: Direction) {
    console.log("Moving " + direction);
}

move("up");     // OK
// move("diagonal");  // Error!
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What symbol creates a union type?',
                                                                            type: 'multiple-choice',
                                                                            options: ['&', '|', '+', ','],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-7',
                                                                        title: 'Type Aliases',
                                                                        description: 'Custom type names',
                                                                        stage: 3,
                                                                        content: `
# Type Aliases

## Creating Aliases:
\`\`\`typescript
type ID = string | number;
type Point = { x: number; y: number };

let userId: ID = "user123";
let location: Point = { x: 10, y: 20 };
\`\`\`

## Type vs Interface:
\`\`\`typescript
// Type alias
type User = {
    name: string;
    age: number;
};

// Interface
interface IUser {
    name: string;
    age: number;
}

// Types can do more:
type StringOrNumber = string | number;
type Pair<T> = [T, T];
\`\`\`

## Combining Types:
\`\`\`typescript
type Named = { name: string };
type Aged = { age: number };
type Person = Named & Aged;

let p: Person = { name: "Alice", age: 25 };
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What combines two types into one?',
                                                                            type: 'multiple-choice',
                                                                            options: ['|', '&', '+', 'extends'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-8',
                                                                        title: 'Type Guards',
                                                                        description: 'Narrowing types',
                                                                        stage: 3,
                                                                        content: `
# Type Guards

Narrow types at runtime!

## typeof Guard:
\`\`\`typescript
function process(value: string | number) {
    if (typeof value === "string") {
        return value.toUpperCase();  // TypeScript knows it's string
    }
    return value * 2;  // TypeScript knows it's number
}
\`\`\`

## instanceof Guard:
\`\`\`typescript
class Dog { bark() {} }
class Cat { meow() {} }

function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
\`\`\`

## in Operator:
\`\`\`typescript
interface Bird { fly(): void }
interface Fish { swim(): void }

function move(animal: Bird | Fish) {
    if ("fly" in animal) {
        animal.fly();
    } else {
        animal.swim();
    }
}
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What checks if a property exists?',
                                                                            type: 'multiple-choice',
                                                                            options: ['has', 'in', 'exists', 'contains'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-9',
                                                                        title: 'Generics',
                                                                        description: 'Reusable type parameters',
                                                                        stage: 4,
                                                                        content: `
# Generics

Write code that works with any type!

## Generic Functions:
\`\`\`typescript
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("hello");
let output2 = identity<number>(42);
let output3 = identity("inferred");  // Type inferred
\`\`\`

## Generic Interfaces:
\`\`\`typescript
interface Container<T> {
    value: T;
    getValue(): T;
}

let box: Container<number> = {
    value: 42,
    getValue() { return this.value; }
};
\`\`\`

## Generic Constraints:
\`\`\`typescript
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("hello");     // OK
logLength([1, 2, 3]);   // OK
// logLength(42);       // Error! number has no length
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What are <T> called?',
                                                                            type: 'multiple-choice',
                                                                            options: ['Templates', 'Type parameters', 'Generics', 'Placeholders'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-10',
                                                                        title: 'Classes',
                                                                        description: 'Object-oriented TypeScript',
                                                                        stage: 4,
                                                                        content: `
# Classes

## Basic Class:
\`\`\`typescript
class Person {
    name: string;
    private age: number;
    readonly id: string;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this.id = Math.random().toString();
    }

    greet(): string {
        return "Hello, I'm " + this.name;
    }
}
\`\`\`

## Access Modifiers:
- \`public\` - accessible everywhere (default)
- \`private\` - only within class
- \`protected\` - class and subclasses

## Parameter Properties:
\`\`\`typescript
class Person {
    constructor(
        public name: string,
        private age: number
    ) {}
}
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What hides a property from outside?',
                                                                            type: 'multiple-choice',
                                                                            options: ['public', 'private', 'protected', 'readonly'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-11',
                                                                        title: 'Inheritance and Implements',
                                                                        description: 'Extending classes',
                                                                        stage: 4,
                                                                        content: `
# Inheritance

## Extending Classes:
\`\`\`typescript
class Animal {
    constructor(public name: string) {}
    
    move(distance: number) {
        console.log(this.name + " moved " + distance + "m");
    }
}

class Dog extends Animal {
    bark() {
        console.log("Woof!");
    }
    
    move(distance: number = 5) {
        console.log("Running...");
        super.move(distance);
    }
}
\`\`\`

## Implementing Interfaces:
\`\`\`typescript
interface Printable {
    print(): void;
}

class Document implements Printable {
    print() {
        console.log("Printing document...");
    }
}
\`\`\`

## Abstract Classes:
\`\`\`typescript
abstract class Shape {
    abstract getArea(): number;
    
    printArea() {
        console.log("Area: " + this.getArea());
    }
}
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What keyword extends a class?',
                                                                            type: 'multiple-choice',
                                                                            options: ['inherits', 'extends', 'implements', 'uses'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-12',
                                                                        title: 'Utility Types',
                                                                        description: 'Built-in type helpers',
                                                                        stage: 4,
                                                                        content: `
# Utility Types

## Partial<T>:
\`\`\`typescript
interface User {
    name: string;
    age: number;
}

function updateUser(user: User, updates: Partial<User>) {
    return { ...user, ...updates };
}
\`\`\`

## Required<T>:
\`\`\`typescript
interface Config {
    host?: string;
    port?: number;
}

const fullConfig: Required<Config> = {
    host: "localhost",
    port: 3000
};
\`\`\`

## Pick<T, K> and Omit<T, K>:
\`\`\`typescript
interface User {
    id: number;
    name: string;
    email: string;
}

type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;
\`\`\`

## Record<K, T>:
\`\`\`typescript
type PageViews = Record<string, number>;
const views: PageViews = { home: 100, about: 50 };
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What makes all properties optional?',
                                                                            type: 'multiple-choice',
                                                                            options: ['Optional<T>', 'Partial<T>', 'Maybe<T>', 'Nullable<T>'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-13',
                                                                        title: 'Mapped Types',
                                                                        description: 'Transform types',
                                                                        stage: 4,
                                                                        content: `
# Mapped Types

Create new types from existing ones!

## Basic Mapping:
\`\`\`typescript
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Optional<T> = {
    [P in keyof T]?: T[P];
};
\`\`\`

## keyof Operator:
\`\`\`typescript
interface Person {
    name: string;
    age: number;
}

type PersonKeys = keyof Person;  // "name" | "age"
\`\`\`

## Practical Example:
\`\`\`typescript
type Getters<T> = {
    [P in keyof T as \`get\${Capitalize<string & P>}\`]: () => T[P];
};

interface Person {
    name: string;
    age: number;
}

type PersonGetters = Getters<Person>;
// { getName: () => string; getAge: () => number; }
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What gets all keys of a type?',
                                                                            type: 'multiple-choice',
                                                                            options: ['keys', 'keyof', 'typeof', 'nameof'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-14',
                                                                        title: 'Conditional Types',
                                                                        description: 'Type logic',
                                                                        stage: 4,
                                                                        content: `
# Conditional Types

Types with conditions!

## Basic Syntax:
\`\`\`typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false
\`\`\`

## infer Keyword:
\`\`\`typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function greet(): string { return "Hello"; }
type GreetReturn = ReturnType<typeof greet>;  // string
\`\`\`

## Distributive Conditionals:
\`\`\`typescript
type ToArray<T> = T extends any ? T[] : never;

type StrOrNumArray = ToArray<string | number>;
// string[] | number[]
\`\`\`

## Exclude and Extract:
\`\`\`typescript
type T1 = Exclude<"a" | "b" | "c", "a">;  // "b" | "c"
type T2 = Extract<"a" | "b" | "c", "a" | "f">;  // "a"
\`\`\`
    `,
                                                                        exercise: {
                                                                            prompt: 'What extracts the return type from a function?',
                                                                            type: 'multiple-choice',
                                                                            options: ['ReturnOf<T>', 'ReturnType<T>', 'GetReturn<T>', 'FunctionReturn<T>'],
                                                                            answer: 1
                                                                        }
                                                                    },
                                                                    {
                                                                        id: 'ts-15',
                                                                        title: 'Modules',
                                                                        description: 'Import and export',
                                                                        stage: 4,
                                                                        content: `
# Modules

## Named Exports:
\`\`\`typescript
// utils.ts
export function add(a: number, b: number): number {
    return a + b;
}

export const PI = 3.14159;

export interface User {
    name: string;
}
\`\`\`

## Importing:
\`\`\`typescript
import { add, PI, User } from "./utils";
import { add as addition } from "./utils";
import * as Utils from "./utils";
\`\`\`

## Default Exports:
\`\`\`typescript
// logger.ts
export default function log(message: string) {
    console.log(message);
}

// main.ts
import log from "./logger";
\`\`\`

## Type-Only Imports:
\`\`\`typescript
import type { User } from "./utils";
import { type User, add } from "./utils";
\`\`\`

Congratulations! You've learned TypeScript! 🎉
    `,
                                                                        exercise: {
                                                                            prompt: 'What imports only type information?',
                                                                            type: 'multiple-choice',
                                                                            options: ['import type', 'import @type', 'type import', 'using type'],
                                                                            answer: 0
                                                                        }
                                                                    }

// SQL Course
'sql': {
                                                                        id: 'sql',
                                                                        name: 'SQL',
                                                                        description: 'Query and manage databases with SQL.',
                                                                        category: COURSE_CATEGORIES.DATA,
                                                                        icon: '🗄️',
                                                                        color: '#336791',
                                                                        language: 'sql',
                                                                        prerequisites: ['intro-logic'],
                                                                        estimatedHours: 8,
                                                                        lessons: [
                                                                            {
                                                                                id: 'sql-1',
                                                                                title: 'What is SQL?',
                                                                                description: 'Introduction to databases',
                                                                                stage: 1,
                                                                                content: `
# What is SQL?

SQL (Structured Query Language) is how we talk to databases.

## Databases Store:
- User accounts
- Products
- Orders
- Any structured data

## Basic Idea:
Ask questions, get answers from data.
                `,
                                                                                exercise: {
                                                                                    prompt: 'What does SQL stand for?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['Simple Query Language', 'Structured Query Language', 'System Query Logic', 'Standard Question Language'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-2',
                                                                                title: 'SELECT Queries',
                                                                                description: 'Getting data from tables',
                                                                                stage: 2,
                                                                                content: `
# SELECT Queries

## Natural Language:
\`\`\`
get all from users
get name, email from users
\`\`\`

## Real SQL:
\`\`\`sql
SELECT * FROM users;
SELECT name, email FROM users;
\`\`\`
                `,
                                                                                exercise: {
                                                                                    prompt: 'Write: get all from products',
                                                                                    type: 'code',
                                                                                    expectedOutput: 'get all from products',
                                                                                    hint: 'Use get all from tablename'
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-3',
                                                                                title: 'Filtering with WHERE',
                                                                                description: 'Getting specific data',
                                                                                stage: 2,
                                                                                content: `
# Filtering with WHERE

## Natural Language:
\`\`\`
get all from users where age > 18
\`\`\`

## Real SQL:
\`\`\`sql
SELECT * FROM users WHERE age > 18;
\`\`\`
                `,
                                                                                exercise: {
                                                                                    prompt: 'Write: get name from users where active = true',
                                                                                    type: 'code',
                                                                                    expectedOutput: 'get name from users where active = true',
                                                                                    hint: 'Add a where clause'
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-4',
                                                                                title: 'Operators',
                                                                                description: 'Comparison and logical operators',
                                                                                stage: 2,
                                                                                content: `
# SQL Operators

## Comparison Operators:
\`\`\`sql
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE price >= 100;
SELECT * FROM products WHERE price < 50;
SELECT * FROM products WHERE price <= 50;
SELECT * FROM products WHERE price = 99.99;
SELECT * FROM products WHERE price != 99.99;
\`\`\`

## Logical Operators:
\`\`\`sql
SELECT * FROM products 
WHERE price > 50 AND category = 'Electronics';

SELECT * FROM users 
WHERE status = 'active' OR role = 'admin';

SELECT * FROM products 
WHERE NOT category = 'Clothing';
\`\`\`

## BETWEEN and IN:
\`\`\`sql
SELECT * FROM products WHERE price BETWEEN 10 AND 50;
SELECT * FROM users WHERE country IN ('USA', 'Canada', 'UK');
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What checks if a value is in a list?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['CONTAINS', 'IN', 'HAS', 'INCLUDES'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-5',
                                                                                title: 'Sorting Results',
                                                                                description: 'ORDER BY clause',
                                                                                stage: 2,
                                                                                content: `
# Sorting with ORDER BY

## Basic Sorting:
\`\`\`sql
SELECT * FROM products ORDER BY price;        -- Ascending (default)
SELECT * FROM products ORDER BY price ASC;    -- Ascending
SELECT * FROM products ORDER BY price DESC;   -- Descending
\`\`\`

## Multiple Columns:
\`\`\`sql
SELECT * FROM employees 
ORDER BY department, salary DESC;
\`\`\`

## With WHERE:
\`\`\`sql
SELECT * FROM products 
WHERE category = 'Electronics'
ORDER BY price DESC;
\`\`\`

## Limiting Results:
\`\`\`sql
SELECT * FROM products ORDER BY price DESC LIMIT 10;
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What keyword sorts from highest to lowest?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['ASC', 'DESC', 'HIGH', 'DOWN'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-6',
                                                                                title: 'Aggregate Functions',
                                                                                description: 'COUNT, SUM, AVG, MIN, MAX',
                                                                                stage: 3,
                                                                                content: `
# Aggregate Functions

## COUNT:
\`\`\`sql
SELECT COUNT(*) FROM users;
SELECT COUNT(email) FROM users;
SELECT COUNT(DISTINCT country) FROM users;
\`\`\`

## SUM and AVG:
\`\`\`sql
SELECT SUM(price) FROM orders;
SELECT AVG(age) FROM users;
\`\`\`

## MIN and MAX:
\`\`\`sql
SELECT MIN(price) FROM products;
SELECT MAX(salary) FROM employees;
\`\`\`

## Combined:
\`\`\`sql
SELECT 
    COUNT(*) AS total_products,
    AVG(price) AS average_price,
    MIN(price) AS cheapest,
    MAX(price) AS most_expensive
FROM products;
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What counts rows in a table?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['TOTAL()', 'COUNT()', 'NUM()', 'SIZE()'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-7',
                                                                                title: 'GROUP BY',
                                                                                description: 'Grouping results',
                                                                                stage: 3,
                                                                                content: `
# GROUP BY

## Basic Grouping:
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category;
\`\`\`

## With Aggregates:
\`\`\`sql
SELECT 
    department,
    COUNT(*) AS employees,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;
\`\`\`

## HAVING Clause:
Filter after grouping!
\`\`\`sql
SELECT category, COUNT(*) AS count
FROM products
GROUP BY category
HAVING COUNT(*) > 10;
\`\`\`

## ORDER with GROUP:
\`\`\`sql
SELECT category, SUM(sales) AS total
FROM products
GROUP BY category
ORDER BY total DESC;
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What filters grouped results?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['WHERE', 'HAVING', 'FILTER', 'WHEN'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-8',
                                                                                title: 'INNER JOIN',
                                                                                description: 'Combining tables',
                                                                                stage: 3,
                                                                                content: `
# INNER JOIN

## Basic Join:
\`\`\`sql
SELECT orders.id, users.name, orders.total
FROM orders
INNER JOIN users ON orders.user_id = users.id;
\`\`\`

## Table Aliases:
\`\`\`sql
SELECT o.id, u.name, o.total
FROM orders o
INNER JOIN users u ON o.user_id = u.id;
\`\`\`

## Multiple Joins:
\`\`\`sql
SELECT o.id, u.name, p.name AS product
FROM orders o
INNER JOIN users u ON o.user_id = u.id
INNER JOIN products p ON o.product_id = p.id;
\`\`\`

## With WHERE:
\`\`\`sql
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 100;
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What returns only matching rows from both tables?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN'],
                                                                                    answer: 2
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-9',
                                                                                title: 'LEFT and RIGHT JOIN',
                                                                                description: 'Including unmatched rows',
                                                                                stage: 3,
                                                                                content: `
# LEFT and RIGHT JOIN

## LEFT JOIN:
All rows from left table, matching from right
\`\`\`sql
SELECT u.name, o.total
FROM users u
LEFT JOIN orders o ON u.id = o.user_id;
-- Shows all users, even without orders (NULL)
\`\`\`

## RIGHT JOIN:
All rows from right table, matching from left
\`\`\`sql
SELECT u.name, o.total
FROM users u
RIGHT JOIN orders o ON u.id = o.user_id;
-- Shows all orders, even without users
\`\`\`

## Finding Unmatched:
\`\`\`sql
SELECT u.name
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE o.id IS NULL;
-- Users with no orders
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'Which JOIN returns all rows from the first table?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-10',
                                                                                title: 'Subqueries',
                                                                                description: 'Nested queries',
                                                                                stage: 3,
                                                                                content: `
# Subqueries

## In WHERE:
\`\`\`sql
SELECT * FROM products
WHERE price > (SELECT AVG(price) FROM products);
\`\`\`

## With IN:
\`\`\`sql
SELECT * FROM users
WHERE id IN (
    SELECT user_id FROM orders WHERE total > 1000
);
\`\`\`

## In FROM:
\`\`\`sql
SELECT dept, avg_salary
FROM (
    SELECT department AS dept, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY department
) AS dept_stats
WHERE avg_salary > 50000;
\`\`\`

## EXISTS:
\`\`\`sql
SELECT * FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What checks if a subquery has results?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['HAS', 'EXISTS', 'FOUND', 'ANY'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-11',
                                                                                title: 'INSERT Statements',
                                                                                description: 'Adding data',
                                                                                stage: 4,
                                                                                content: `
# INSERT

## Single Row:
\`\`\`sql
INSERT INTO users (name, email, age)
VALUES ('Alice', 'alice@example.com', 25);
\`\`\`

## Multiple Rows:
\`\`\`sql
INSERT INTO products (name, price, category)
VALUES 
    ('Laptop', 999.99, 'Electronics'),
    ('Phone', 599.99, 'Electronics'),
    ('Desk', 199.99, 'Furniture');
\`\`\`

## From SELECT:
\`\`\`sql
INSERT INTO archive_orders
SELECT * FROM orders WHERE date < '2023-01-01';
\`\`\`

## With Defaults:
\`\`\`sql
INSERT INTO users (name, email)
VALUES ('Bob', 'bob@example.com');
-- Other columns get default values
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What keyword adds new rows?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['ADD', 'INSERT', 'CREATE', 'PUT'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-12',
                                                                                title: 'UPDATE Statements',
                                                                                description: 'Modifying data',
                                                                                stage: 4,
                                                                                content: `
# UPDATE

## Basic Update:
\`\`\`sql
UPDATE users
SET age = 26
WHERE name = 'Alice';
\`\`\`

## Multiple Columns:
\`\`\`sql
UPDATE products
SET price = 899.99, stock = stock - 1
WHERE id = 42;
\`\`\`

## With Conditions:
\`\`\`sql
UPDATE orders
SET status = 'shipped'
WHERE status = 'processing' AND date < '2024-01-01';
\`\`\`

## ⚠️ Always Use WHERE!
\`\`\`sql
-- This updates ALL rows!
UPDATE products SET price = 0;

-- Use WHERE to be specific
UPDATE products SET price = 0 WHERE id = 1;
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What clause prevents updating all rows?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['LIMIT', 'WHERE', 'ONLY', 'FILTER'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-13',
                                                                                title: 'DELETE Statements',
                                                                                description: 'Removing data',
                                                                                stage: 4,
                                                                                content: `
# DELETE

## Basic Delete:
\`\`\`sql
DELETE FROM users WHERE id = 42;
\`\`\`

## With Conditions:
\`\`\`sql
DELETE FROM orders 
WHERE status = 'cancelled' AND date < '2023-01-01';
\`\`\`

## Delete All (careful!):
\`\`\`sql
DELETE FROM temp_data;  -- All rows gone!
TRUNCATE TABLE temp_data;  -- Faster, resets auto-increment
\`\`\`

## With Subquery:
\`\`\`sql
DELETE FROM users
WHERE id IN (
    SELECT user_id FROM inactive_accounts
);
\`\`\`

## ⚠️ Tip: Always test with SELECT first!
\`\`\`sql
-- Check what will be deleted
SELECT * FROM users WHERE last_login < '2020-01-01';

-- Then delete
DELETE FROM users WHERE last_login < '2020-01-01';
\`\`\`
    `,
                                                                                exercise: {
                                                                                    prompt: 'What is faster than DELETE for removing all rows?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['REMOVE', 'TRUNCATE', 'CLEAR', 'DROP'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-14',
                                                                                title: 'CREATE TABLE',
                                                                                description: 'Defining tables',
                                                                                stage: 4,
                                                                                content: `
# CREATE TABLE

## Basic Table:
\`\`\`sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
\`\`\`

## Data Types:
- INT, BIGINT - Numbers
- VARCHAR(n) - Text up to n chars
- TEXT - Long text
- DECIMAL(10,2) - Precise decimals
- DATE, DATETIME, TIMESTAMP
- BOOLEAN

## Constraints:
- PRIMARY KEY - Unique identifier
- NOT NULL - Required
- UNIQUE - No duplicates
- FOREIGN KEY - Reference another table
- DEFAULT - Default value
    `,
                                                                                exercise: {
                                                                                    prompt: 'What constraint makes a column required?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['REQUIRED', 'NOT NULL', 'MANDATORY', 'NEEDED'],
                                                                                    answer: 1
                                                                                }
                                                                            },
                                                                            {
                                                                                id: 'sql-15',
                                                                                title: 'Foreign Keys',
                                                                                description: 'Relationships between tables',
                                                                                stage: 4,
                                                                                content: `
# Foreign Keys

## Defining Foreign Key:
\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total DECIMAL(10, 2),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
\`\`\`

## ON DELETE and ON UPDATE:
\`\`\`sql
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
\`\`\`

## Options:
- CASCADE - Delete/update related rows
- SET NULL - Set to NULL
- RESTRICT - Prevent action
- NO ACTION - Same as RESTRICT

Congratulations! You've learned SQL! 🎉
    `,
                                                                                exercise: {
                                                                                    prompt: 'What happens with ON DELETE CASCADE?',
                                                                                    type: 'multiple-choice',
                                                                                    options: ['Error occurs', 'Related rows deleted', 'Set to NULL', 'Nothing'],
                                                                                    answer: 1
                                                                                }
                                                                            }

// Ruby Course
'ruby': {
                                                                                id: 'ruby',
                                                                                name: 'Ruby',
                                                                                description: 'A beautiful language designed for programmer happiness.',
                                                                                category: COURSE_CATEGORIES.SCRIPTING,
                                                                                icon: '💎',
                                                                                color: '#CC342D',
                                                                                language: 'ruby',
                                                                                prerequisites: ['intro-logic'],
                                                                                estimatedHours: 10,
                                                                                lessons: [
                                                                                    {
                                                                                        id: 'ruby-1',
                                                                                        title: 'Hello Ruby',
                                                                                        description: 'Your first Ruby program',
                                                                                        stage: 1,
                                                                                        content: `
# Hello Ruby

Ruby is designed to be readable and enjoyable.

## Natural Language:
\`\`\`
display "Hello, Ruby!" end display
\`\`\`

## Real Ruby:
\`\`\`ruby
puts "Hello, Ruby!"
\`\`\`

Simple and clean!
                `,
                                                                                        exercise: {
                                                                                            prompt: 'Write: display "Ruby is fun!" end display',
                                                                                            type: 'code',
                                                                                            expectedOutput: 'Ruby is fun!',
                                                                                            hint: 'Use display with quotes'
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-2',
                                                                                        title: 'Variables',
                                                                                        description: 'Storing data in Ruby',
                                                                                        stage: 2,
                                                                                        content: `
# Variables in Ruby

No type declarations needed!

## Natural Language:
\`\`\`
create name = "Alice"
create age = 25
\`\`\`

## Real Ruby:
\`\`\`ruby
name = "Alice"
age = 25
\`\`\`
                `,
                                                                                        exercise: {
                                                                                            prompt: 'Write: create language = "Ruby"',
                                                                                            type: 'code',
                                                                                            expectedOutput: 'create language = "Ruby"',
                                                                                            hint: 'Create a variable'
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-3',
                                                                                        title: 'Data Types',
                                                                                        description: 'Numbers, strings, symbols',
                                                                                        stage: 2,
                                                                                        content: `
# Data Types

## Numbers:
\`\`\`ruby
integer = 42
float = 3.14
\`\`\`

## Strings:
\`\`\`ruby
single = 'Hello'
double = "World"
interpolated = "Hello, #{name}!"  # Variable interpolation
\`\`\`

## Symbols:
Immutable, memory-efficient identifiers.
\`\`\`ruby
status = :active
role = :admin
\`\`\`

## Booleans:
\`\`\`ruby
is_active = true
is_admin = false
\`\`\`

## nil:
\`\`\`ruby
nothing = nil
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What syntax creates a symbol?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['"symbol"', "'symbol'", ':symbol', '@symbol'],
                                                                                            answer: 2
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-4',
                                                                                        title: 'Control Flow',
                                                                                        description: 'if, unless, case',
                                                                                        stage: 2,
                                                                                        content: `
# Control Flow

## if/elsif/else:
\`\`\`ruby
if age >= 18
  puts "Adult"
elsif age >= 13
  puts "Teen"
else
  puts "Child"
end
\`\`\`

## unless (opposite of if):
\`\`\`ruby
unless logged_in
  puts "Please log in"
end
\`\`\`

## One-liner:
\`\`\`ruby
puts "Adult" if age >= 18
puts "Log in" unless logged_in
\`\`\`

## case (switch):
\`\`\`ruby
case grade
when "A"
  puts "Excellent"
when "B", "C"
  puts "Good"
else
  puts "Keep trying"
end
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What is the opposite of if?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['else', 'unless', 'not', 'except'],
                                                                                            answer: 1
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-5',
                                                                                        title: 'Loops',
                                                                                        description: 'Iterating in Ruby',
                                                                                        stage: 2,
                                                                                        content: `
# Loops

## while:
\`\`\`ruby
count = 0
while count < 5
  puts count
  count += 1
end
\`\`\`

## until:
\`\`\`ruby
count = 0
until count >= 5
  puts count
  count += 1
end
\`\`\`

## for:
\`\`\`ruby
for i in 1..5
  puts i
end
\`\`\`

## times:
\`\`\`ruby
5.times do |i|
  puts i
end
\`\`\`

## each (preferred):
\`\`\`ruby
[1, 2, 3].each do |num|
  puts num
end
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What is the Ruby-preferred way to loop?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['for', 'while', 'each', 'loop'],
                                                                                            answer: 2
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-6',
                                                                                        title: 'Methods',
                                                                                        description: 'Defining functions',
                                                                                        stage: 3,
                                                                                        content: `
# Methods

## Defining Methods:
\`\`\`ruby
def greet(name)
  "Hello, #{name}!"
end

# Last expression is returned automatically
def add(a, b)
  a + b
end
\`\`\`

## Default Parameters:
\`\`\`ruby
def greet(name = "World")
  "Hello, #{name}!"
end

greet        # "Hello, World!"
greet("Ruby")  # "Hello, Ruby!"
\`\`\`

## Method Conventions:
\`\`\`ruby
def dangerous!    # Modifies receiver
  # ...
end

def question?     # Returns boolean
  # ...
end
\`\`\`

## Calling:
\`\`\`ruby
greet "Ruby"      # Parentheses optional
greet("Ruby")     # Also valid
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What does ? at end of method name mean?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['Optional', 'Returns boolean', 'Private', 'Raises error'],
                                                                                            answer: 1
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-7',
                                                                                        title: 'Arrays',
                                                                                        description: 'Ordered collections',
                                                                                        stage: 3,
                                                                                        content: `
# Arrays

## Creating Arrays:
\`\`\`ruby
numbers = [1, 2, 3, 4, 5]
mixed = [1, "two", :three]
empty = []
\`\`\`

## Operations:
\`\`\`ruby
arr = [1, 2, 3]
arr.push(4)      # [1, 2, 3, 4]
arr << 5         # [1, 2, 3, 4, 5]
arr.pop          # 5, arr = [1, 2, 3, 4]
arr.first        # 1
arr.last         # 4
arr.length       # 4
\`\`\`

## Accessing:
\`\`\`ruby
arr[0]           # First element
arr[-1]          # Last element
arr[1..3]        # Elements 1 to 3
\`\`\`

## Iterating:
\`\`\`ruby
arr.each { |x| puts x }
arr.map { |x| x * 2 }     # [2, 4, 6, 8]
arr.select { |x| x > 2 }  # [3, 4]
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What adds an element to the end?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['add', 'push or <<', 'append', 'insert'],
                                                                                            answer: 1
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-8',
                                                                                        title: 'Hashes',
                                                                                        description: 'Key-value pairs',
                                                                                        stage: 3,
                                                                                        content: `
# Hashes

## Creating Hashes:
\`\`\`ruby
person = {
  "name" => "Alice",
  "age" => 25
}

# Symbol keys (preferred)
person = {
  name: "Alice",
  age: 25
}
\`\`\`

## Accessing:
\`\`\`ruby
person[:name]    # "Alice"
person[:age]     # 25
person[:email]   # nil
\`\`\`

## Operations:
\`\`\`ruby
person[:email] = "alice@example.com"
person.keys      # [:name, :age, :email]
person.values    # ["Alice", 25, "alice@example.com"]
person.delete(:age)
\`\`\`

## Iterating:
\`\`\`ruby
person.each do |key, value|
  puts "#{key}: #{value}"
end
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What is the preferred key type?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['Strings', 'Numbers', 'Symbols', 'Arrays'],
                                                                                            answer: 2
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-9',
                                                                                        title: 'Blocks',
                                                                                        description: 'Anonymous code blocks',
                                                                                        stage: 3,
                                                                                        content: `
# Blocks

## Block Syntax:
\`\`\`ruby
# Single line with {}
[1, 2, 3].each { |x| puts x }

# Multi-line with do/end
[1, 2, 3].each do |x|
  result = x * 2
  puts result
end
\`\`\`

## Yielding to Blocks:
\`\`\`ruby
def with_timing
  start = Time.now
  yield
  puts "Took #{Time.now - start} seconds"
end

with_timing do
  sleep(1)
end
\`\`\`

## Block Arguments:
\`\`\`ruby
def repeat(times)
  times.times { |i| yield(i) }
end

repeat(3) { |i| puts "Iteration #{i}" }
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What keyword passes control to a block?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['call', 'run', 'yield', 'exec'],
                                                                                            answer: 2
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-10',
                                                                                        title: 'Classes',
                                                                                        description: 'Object-oriented Ruby',
                                                                                        stage: 4,
                                                                                        content: `
# Classes

## Defining Classes:
\`\`\`ruby
class Person
  def initialize(name, age)
    @name = name
    @age = age
  end
  
  def greet
    "Hello, I'm #{@name}"
  end
end

person = Person.new("Alice", 25)
puts person.greet
\`\`\`

## Accessors:
\`\`\`ruby
class Person
  attr_reader :name      # Getter only
  attr_writer :age       # Setter only
  attr_accessor :email   # Both
  
  def initialize(name)
    @name = name
  end
end
\`\`\`

## Instance Variables:
- Start with @
- Belong to each object
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What creates both getter and setter?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['attr_reader', 'attr_writer', 'attr_accessor', 'attr_both'],
                                                                                            answer: 2
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-11',
                                                                                        title: 'Inheritance',
                                                                                        description: 'Extending classes',
                                                                                        stage: 4,
                                                                                        content: `
# Inheritance

## Basic Inheritance:
\`\`\`ruby
class Animal
  def initialize(name)
    @name = name
  end
  
  def speak
    "..."
  end
end

class Dog < Animal
  def speak
    "Woof!"
  end
  
  def fetch
    "#{@name} fetches the ball"
  end
end
\`\`\`

## super:
\`\`\`ruby
class Cat < Animal
  def initialize(name, color)
    super(name)  # Call parent's initialize
    @color = color
  end
end
\`\`\`

## Modules for Mixins:
\`\`\`ruby
module Swimmable
  def swim
    "Swimming!"
  end
end

class Fish < Animal
  include Swimmable
end
\`\`\`
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What symbol indicates inheritance?',
                                                                                            type: 'multiple-choice',
                                                                                            options: [':', '<', 'extends', '->'],
                                                                                            answer: 1
                                                                                        }
                                                                                    },
                                                                                    {
                                                                                        id: 'ruby-12',
                                                                                        title: 'Modules',
                                                                                        description: 'Namespaces and mixins',
                                                                                        stage: 4,
                                                                                        content: `
# Modules

## Namespaces:
\`\`\`ruby
module Animals
  class Dog
    def bark
      "Woof!"
    end
  end
end

dog = Animals::Dog.new
\`\`\`

## Mixins:
\`\`\`ruby
module Printable
  def print
    puts to_s
  end
end

class Document
  include Printable
  
  def to_s
    "Document content"
  end
end
\`\`\`

## include vs extend:
\`\`\`ruby
include Module  # Instance methods
extend Module   # Class methods
\`\`\`

Congratulations! You've learned Ruby! 🎉
    `,
                                                                                        exercise: {
                                                                                            prompt: 'What adds module methods as instance methods?',
                                                                                            type: 'multiple-choice',
                                                                                            options: ['require', 'include', 'extend', 'import'],
                                                                                            answer: 1
                                                                                        }
                                                                                    }

// PHP Course
'php': {
                                                                                        id: 'php',
                                                                                        name: 'PHP',
                                                                                        description: 'Server-side scripting for the web.',
                                                                                        category: COURSE_CATEGORIES.SCRIPTING,
                                                                                        icon: '🐘',
                                                                                        color: '#777BB4',
                                                                                        language: 'php',
                                                                                        prerequisites: ['html'],
                                                                                        estimatedHours: 10,
                                                                                        lessons: [
                                                                                            {
                                                                                                id: 'php-1',
                                                                                                title: 'Hello PHP',
                                                                                                description: 'Server-side code basics',
                                                                                                stage: 1,
                                                                                                content: `
# Hello PHP

PHP runs on the server before sending HTML to the browser.

## Natural Language:
\`\`\`
display "Hello from the server!" end display
\`\`\`

## Real PHP:
\`\`\`php
<?php
echo "Hello from the server!";
?>
\`\`\`
                `,
                                                                                                exercise: {
                                                                                                    prompt: 'Where does PHP code run?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['Browser', 'Server', 'Database', 'CSS'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-2',
                                                                                                title: 'Variables in PHP',
                                                                                                description: 'Using $ for variables',
                                                                                                stage: 2,
                                                                                                content: `
# Variables in PHP

PHP variables start with $.

## Natural Language:
\`\`\`
create name = "Alice"
\`\`\`

## Real PHP:
\`\`\`php
$name = "Alice";
\`\`\`
                `,
                                                                                                exercise: {
                                                                                                    prompt: 'What symbol starts PHP variables?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['@', '#', '$', '&'],
                                                                                                    answer: 2
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-3',
                                                                                                title: 'Data Types',
                                                                                                description: 'PHP data types',
                                                                                                stage: 2,
                                                                                                content: `
# Data Types

## Strings:
\`\`\`php
$name = "Alice";
$greeting = 'Hello';
$combined = "Hello, $name!";  // Variable interpolation
\`\`\`

## Numbers:
\`\`\`php
$integer = 42;
$float = 3.14;
\`\`\`

## Booleans:
\`\`\`php
$is_active = true;
$is_admin = false;
\`\`\`

## Arrays:
\`\`\`php
$colors = ["red", "green", "blue"];
$person = [
    "name" => "Alice",
    "age" => 25
];
\`\`\`

## NULL:
\`\`\`php
$nothing = null;
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'How do you include a variable in a string?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['$var', '${var}', 'Use double quotes', 'All of these'],
                                                                                                    answer: 3
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-4',
                                                                                                title: 'Control Flow',
                                                                                                description: 'if, switch, loops',
                                                                                                stage: 2,
                                                                                                content: `
# Control Flow

## if/elseif/else:
\`\`\`php
if ($age >= 18) {
    echo "Adult";
} elseif ($age >= 13) {
    echo "Teen";
} else {
    echo "Child";
}
\`\`\`

## switch:
\`\`\`php
switch ($color) {
    case "red":
        echo "Stop";
        break;
    case "green":
        echo "Go";
        break;
    default:
        echo "Unknown";
}
\`\`\`

## for loop:
\`\`\`php
for ($i = 0; $i < 5; $i++) {
    echo $i;
}
\`\`\`

## while:
\`\`\`php
while ($count < 10) {
    echo $count;
    $count++;
}
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What is the PHP else if keyword?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['else if', 'elseif', 'elif', 'Both A and B'],
                                                                                                    answer: 3
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-5',
                                                                                                title: 'Arrays',
                                                                                                description: 'Indexed and associative',
                                                                                                stage: 3,
                                                                                                content: `
# Arrays

## Indexed Arrays:
\`\`\`php
$fruits = ["apple", "banana", "orange"];
echo $fruits[0];  // apple
$fruits[] = "grape";  // Add to end
\`\`\`

## Associative Arrays:
\`\`\`php
$person = [
    "name" => "Alice",
    "age" => 25,
    "email" => "alice@example.com"
];
echo $person["name"];  // Alice
\`\`\`

## Array Functions:
\`\`\`php
count($arr);           // Length
in_array("apple", $arr);  // Check if exists
array_push($arr, "new");  // Add to end
array_pop($arr);       // Remove last
sort($arr);            // Sort
\`\`\`

## foreach:
\`\`\`php
foreach ($fruits as $fruit) {
    echo $fruit;
}

foreach ($person as $key => $value) {
    echo "$key: $value";
}
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What symbol separates key and value?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: [':', '=>', '->', '='],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-6',
                                                                                                title: 'Functions',
                                                                                                description: 'Creating reusable code',
                                                                                                stage: 3,
                                                                                                content: `
# Functions

## Defining Functions:
\`\`\`php
function greet($name) {
    return "Hello, $name!";
}

echo greet("Alice");  // Hello, Alice!
\`\`\`

## Default Parameters:
\`\`\`php
function greet($name = "World") {
    return "Hello, $name!";
}

greet();       // Hello, World!
greet("PHP");  // Hello, PHP!
\`\`\`

## Type Hints (PHP 7+):
\`\`\`php
function add(int $a, int $b): int {
    return $a + $b;
}
\`\`\`

## Anonymous Functions:
\`\`\`php
$greet = function($name) {
    return "Hello, $name!";
};

echo $greet("Alice");
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What is : int after parameters?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['Comment', 'Return type', 'Variable type', 'Error'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-7',
                                                                                                title: 'Strings',
                                                                                                description: 'String manipulation',
                                                                                                stage: 3,
                                                                                                content: `
# Strings

## String Functions:
\`\`\`php
$str = "Hello, World!";

strlen($str);           // 13
strtoupper($str);       // HELLO, WORLD!
strtolower($str);       // hello, world!
trim("  hello  ");      // "hello"
\`\`\`

## Searching:
\`\`\`php
strpos($str, "World");  // 7
str_contains($str, "Hello");  // true (PHP 8)
str_replace("World", "PHP", $str);  // Hello, PHP!
\`\`\`

## Substrings:
\`\`\`php
substr($str, 0, 5);     // "Hello"
substr($str, -6);       // "World!"
\`\`\`

## Splitting and Joining:
\`\`\`php
$parts = explode(",", "a,b,c");  // ["a", "b", "c"]
$joined = implode("-", $parts);  // "a-b-c"
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What splits a string into an array?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['split()', 'explode()', 'break()', 'divide()'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-8',
                                                                                                title: 'Forms and POST',
                                                                                                description: 'Handling form data',
                                                                                                stage: 3,
                                                                                                content: `
# Forms and POST

## HTML Form:
\`\`\`html
<form method="POST" action="process.php">
    <input name="username" type="text">
    <input name="password" type="password">
    <button type="submit">Login</button>
</form>
\`\`\`

## PHP Processing:
\`\`\`php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];
    
    // Sanitize input!
    $username = htmlspecialchars($username);
}
?>
\`\`\`

## GET vs POST:
- GET: Data in URL ($_GET)
- POST: Data in body ($_POST)

## Validation:
\`\`\`php
if (empty($_POST["username"])) {
    echo "Username is required";
}
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What superglobal holds POST data?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['$POST', '$_POST', '$HTTP_POST', '$form'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-9',
                                                                                                title: 'Classes',
                                                                                                description: 'Object-oriented PHP',
                                                                                                stage: 4,
                                                                                                content: `
# Classes

## Defining Classes:
\`\`\`php
class User {
    public $name;
    private $email;
    
    public function __construct($name, $email) {
        $this->name = $name;
        $this->email = $email;
    }
    
    public function getEmail() {
        return $this->email;
    }
}

$user = new User("Alice", "alice@example.com");
echo $user->name;
echo $user->getEmail();
\`\`\`

## Access Modifiers:
- public: Accessible everywhere
- private: Class only
- protected: Class + subclasses

## Static:
\`\`\`php
class Counter {
    public static $count = 0;
    
    public static function increment() {
        self::$count++;
    }
}

Counter::increment();
echo Counter::$count;
\`\`\`
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What is $this in PHP?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['Current class', 'Current object', 'Parent class', 'Static reference'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            },
                                                                                            {
                                                                                                id: 'php-10',
                                                                                                title: 'Inheritance',
                                                                                                description: 'Extending classes',
                                                                                                stage: 4,
                                                                                                content: `
# Inheritance

## Extending:
\`\`\`php
class Animal {
    protected $name;
    
    public function __construct($name) {
        $this->name = $name;
    }
    
    public function speak() {
        return "...";
    }
}

class Dog extends Animal {
    public function speak() {
        return "Woof!";
    }
    
    public function fetch() {
        return "{$this->name} fetches!";
    }
}
\`\`\`

## Interfaces:
\`\`\`php
interface Printable {
    public function print();
}

class Document implements Printable {
    public function print() {
        echo "Printing...";
    }
}
\`\`\`

## Abstract:
\`\`\`php
abstract class Shape {
    abstract public function area();
}
\`\`\`

Congratulations! You've learned PHP! 🎉
    `,
                                                                                                exercise: {
                                                                                                    prompt: 'What keyword extends a class?',
                                                                                                    type: 'multiple-choice',
                                                                                                    options: ['inherits', 'extends', 'implements', 'uses'],
                                                                                                    answer: 1
                                                                                                }
                                                                                            }

// Bash Scripting Course
'bash': {
                                                                                                id: 'bash',
                                                                                                name: 'Bash Scripting',
                                                                                                description: 'Automate tasks with shell scripts.',
                                                                                                category: COURSE_CATEGORIES.SCRIPTING,
                                                                                                icon: '📜',
                                                                                                color: '#4EAA25',
                                                                                                language: 'bash',
                                                                                                prerequisites: ['terminal'],
                                                                                                estimatedHours: 6,
                                                                                                lessons: [
                                                                                                    {
                                                                                                        id: 'bash-1',
                                                                                                        title: 'What is Bash?',
                                                                                                        description: 'Shell scripting basics',
                                                                                                        stage: 1,
                                                                                                        content: `
# What is Bash?

Bash scripts automate terminal commands.

## Why Use Scripts?
- Run many commands at once
- Automate repetitive tasks
- Schedule jobs

## First Script:
\`\`\`bash
#!/bin/bash
echo "Hello from bash!"
\`\`\`
                `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What does a bash script automate?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['Web pages', 'Terminal commands', 'Database queries', 'CSS styles'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-2',
                                                                                                        title: 'Variables in Bash',
                                                                                                        description: 'Storing values in scripts',
                                                                                                        stage: 2,
                                                                                                        content: `
# Variables in Bash

## Creating:
\`\`\`bash
NAME="Alice"
AGE=25
\`\`\`

## Using (with $):
\`\`\`bash
echo "Hello, $NAME"
echo "Age: $AGE"
\`\`\`

Note: No spaces around the =!
                `,
                                                                                                        exercise: {
                                                                                                            prompt: 'Write: NAME="Bob"',
                                                                                                            type: 'code',
                                                                                                            expectedOutput: 'NAME="Bob"',
                                                                                                            hint: 'No spaces around the equals sign'
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-3',
                                                                                                        title: 'Command Line Arguments',
                                                                                                        description: 'Passing data to scripts',
                                                                                                        stage: 2,
                                                                                                        content: `
# Command Line Arguments

## Special Variables:
\`\`\`bash
#!/bin/bash
echo "Script: $0"
echo "First arg: $1"
echo "Second arg: $2"
echo "All args: $@"
echo "Number of args: $#"
\`\`\`

## Usage:
\`\`\`bash
./script.sh hello world
# Script: ./script.sh
# First arg: hello
# Second arg: world
# All args: hello world
# Number of args: 2
\`\`\`

## Looping Through Args:
\`\`\`bash
for arg in "$@"; do
    echo "$arg"
done
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What is $1?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['Script name', 'First argument', 'Last argument', 'All arguments'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-4',
                                                                                                        title: 'Conditionals',
                                                                                                        description: 'if statements',
                                                                                                        stage: 3,
                                                                                                        content: `
# Conditionals

## if Statement:
\`\`\`bash
if [ "$AGE" -gt 18 ]; then
    echo "Adult"
elif [ "$AGE" -gt 12 ]; then
    echo "Teen"
else
    echo "Child"
fi
\`\`\`

## Comparison Operators:
- \`-eq\` equal
- \`-ne\` not equal
- \`-gt\` greater than
- \`-lt\` less than
- \`-ge\` greater or equal
- \`-le\` less or equal

## String Comparison:
\`\`\`bash
if [ "$NAME" = "Alice" ]; then
    echo "Hello Alice"
fi

if [ -z "$VAR" ]; then
    echo "Variable is empty"
fi
\`\`\`

## File Tests:
\`\`\`bash
if [ -f "file.txt" ]; then
    echo "File exists"
fi
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What ends an if statement?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['end', 'fi', 'endif', 'done'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-5',
                                                                                                        title: 'Loops',
                                                                                                        description: 'for and while loops',
                                                                                                        stage: 3,
                                                                                                        content: `
# Loops

## for Loop:
\`\`\`bash
for i in 1 2 3 4 5; do
    echo "$i"
done

for file in *.txt; do
    echo "Processing $file"
done

for i in {1..10}; do
    echo "$i"
done
\`\`\`

## while Loop:
\`\`\`bash
count=0
while [ $count -lt 5 ]; do
    echo "$count"
    count=$((count + 1))
done
\`\`\`

## until Loop:
\`\`\`bash
count=0
until [ $count -ge 5 ]; do
    echo "$count"
    count=$((count + 1))
done
\`\`\`

## break and continue:
\`\`\`bash
for i in {1..10}; do
    if [ $i -eq 5 ]; then
        continue  # Skip 5
    fi
    echo "$i"
done
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What keyword ends a loop?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['end', 'done', 'loop', 'finish'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-6',
                                                                                                        title: 'Functions',
                                                                                                        description: 'Reusable code blocks',
                                                                                                        stage: 3,
                                                                                                        content: `
# Functions

## Defining Functions:
\`\`\`bash
greet() {
    echo "Hello, $1!"
}

greet "Alice"  # Hello, Alice!
\`\`\`

## Return Values:
\`\`\`bash
add() {
    echo $(($1 + $2))
}

result=$(add 5 3)
echo $result  # 8
\`\`\`

## Local Variables:
\`\`\`bash
my_function() {
    local name="Alice"  # Only inside function
    echo "$name"
}
\`\`\`

## Exit Status:
\`\`\`bash
is_even() {
    if [ $(($1 % 2)) -eq 0 ]; then
        return 0  # Success (true)
    else
        return 1  # Failure (false)
    fi
}

if is_even 4; then
    echo "4 is even"
fi
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'How do you access function arguments?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['$args', '$1, $2, etc.', 'args[0]', 'argv'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-7',
                                                                                                        title: 'Input and Output',
                                                                                                        description: 'Reading and redirecting',
                                                                                                        stage: 3,
                                                                                                        content: `
# Input and Output

## Reading Input:
\`\`\`bash
echo "What is your name?"
read NAME
echo "Hello, $NAME!"

# With prompt
read -p "Enter age: " AGE
\`\`\`

## Redirection:
\`\`\`bash
echo "Hello" > file.txt   # Write (overwrite)
echo "World" >> file.txt  # Append
cat < file.txt            # Read from file

# Redirect errors
command 2> errors.txt
command > output.txt 2>&1  # Both stdout and stderr
\`\`\`

## Here Documents:
\`\`\`bash
cat << EOF
This is a
multi-line
string
EOF
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What appends to a file?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['>', '>>', '<', '|'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-8',
                                                                                                        title: 'Text Processing',
                                                                                                        description: 'grep, sed, awk',
                                                                                                        stage: 4,
                                                                                                        content: `
# Text Processing

## grep:
\`\`\`bash
grep "pattern" file.txt
grep -i "pattern" file.txt   # Case insensitive
grep -r "pattern" directory/ # Recursive
grep -c "pattern" file.txt   # Count matches
\`\`\`

## sed (Stream Editor):
\`\`\`bash
sed 's/old/new/' file.txt     # Replace first
sed 's/old/new/g' file.txt    # Replace all
sed -i 's/old/new/g' file.txt # Edit in place
\`\`\`

## awk:
\`\`\`bash
awk '{print $1}' file.txt     # Print first column
awk -F',' '{print $2}' file   # Custom delimiter
awk '{sum += $1} END {print sum}' file  # Sum column
\`\`\`

## cut:
\`\`\`bash
cut -d',' -f1 file.csv        # First field
cut -c1-5 file.txt            # Characters 1-5
\`\`\`
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What command searches for patterns?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['find', 'grep', 'search', 'locate'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    },
                                                                                                    {
                                                                                                        id: 'bash-9',
                                                                                                        title: 'Practical Scripts',
                                                                                                        description: 'Real-world examples',
                                                                                                        stage: 4,
                                                                                                        content: `
# Practical Scripts

## Backup Script:
\`\`\`bash
#!/bin/bash
DATE=$(date +%Y%m%d)
BACKUP_DIR="/backup"
SOURCE="/home/user/data"

tar -czf "$BACKUP_DIR/backup_$DATE.tar.gz" "$SOURCE"
echo "Backup complete!"
\`\`\`

## Log Monitoring:
\`\`\`bash
#!/bin/bash
tail -f /var/log/app.log | while read line; do
    if [[ "$line" == *"ERROR"* ]]; then
        echo "$line" >> errors.log
    fi
done
\`\`\`

## File Cleanup:
\`\`\`bash
#!/bin/bash
find /tmp -type f -mtime +7 -delete
echo "Deleted files older than 7 days"
\`\`\`

## System Info:
\`\`\`bash
#!/bin/bash
echo "Hostname: $(hostname)"
echo "Uptime: $(uptime -p)"
echo "Disk: $(df -h / | tail -1 | awk '{print $5}')"
\`\`\`

Congratulations! You've learned Bash! 🎉
    `,
                                                                                                        exercise: {
                                                                                                            prompt: 'What makes a script executable?',
                                                                                                            type: 'multiple-choice',
                                                                                                            options: ['run script.sh', 'chmod +x script.sh', 'exec script.sh', 'enable script.sh'],
                                                                                                            answer: 1
                                                                                                        }
                                                                                                    }

// JSON Course
'json': {
                                                                                                        id: 'json',
                                                                                                        name: 'JSON',
                                                                                                        description: 'The universal data format for the web.',
                                                                                                        category: COURSE_CATEGORIES.DATA,
                                                                                                        icon: '📋',
                                                                                                        color: '#000000',
                                                                                                        language: 'json',
                                                                                                        prerequisites: [],
                                                                                                        estimatedHours: 2,
                                                                                                        lessons: [
                                                                                                            {
                                                                                                                id: 'json-1',
                                                                                                                title: 'What is JSON?',
                                                                                                                description: 'Data in a readable format',
                                                                                                                stage: 1,
                                                                                                                content: `
# What is JSON?

JSON (JavaScript Object Notation) stores data in a readable format.

## Used For:
- API responses
- Config files
- Data storage

## Example:
\`\`\`json
{
  "name": "Alice",
  "age": 25
}
\`\`\`
                `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'What does JSON stand for?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['Java Standard Object Notation', 'JavaScript Object Notation', 'Just Simple Object Names', 'JSON Script Object Notation'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                id: 'json-2',
                                                                                                                title: 'JSON Syntax',
                                                                                                                description: 'Keys, values, and types',
                                                                                                                stage: 2,
                                                                                                                content: `
# JSON Syntax

## Rules:
- Keys must be in "double quotes"
- Strings in "double quotes"
- Numbers without quotes
- Arrays in [brackets]
- Objects in {braces}

## Example:
\`\`\`json
{
  "users": [
    {"name": "Alice", "age": 25},
    {"name": "Bob", "age": 30}
  ]
}
\`\`\`
                `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'What quotes does JSON require for keys?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['Single quotes', 'Double quotes', 'No quotes', 'Backticks'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                id: 'json-3',
                                                                                                                title: 'Data Types',
                                                                                                                description: 'All JSON value types',
                                                                                                                stage: 2,
                                                                                                                content: `
# JSON Data Types

## String:
\`\`\`json
{ "name": "Alice" }
\`\`\`

## Number:
\`\`\`json
{ "age": 25, "price": 19.99, "negative": -10 }
\`\`\`

## Boolean:
\`\`\`json
{ "isActive": true, "isAdmin": false }
\`\`\`

## Null:
\`\`\`json
{ "middleName": null }
\`\`\`

## Array:
\`\`\`json
{ "colors": ["red", "green", "blue"] }
\`\`\`

## Object:
\`\`\`json
{ "address": { "city": "NYC", "zip": "10001" } }
\`\`\`
    `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'How do you represent "no value" in JSON?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['undefined', 'null', 'none', 'empty'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                id: 'json-4',
                                                                                                                title: 'Nested Structures',
                                                                                                                description: 'Complex JSON documents',
                                                                                                                stage: 3,
                                                                                                                content: `
# Nested Structures

## Objects in Objects:
\`\`\`json
{
    "user": {
        "profile": {
            "name": "Alice",
            "avatar": {
                "url": "https://...",
                "size": 128
            }
        }
    }
}
\`\`\`

## Arrays of Objects:
\`\`\`json
{
    "products": [
        { "id": 1, "name": "Laptop", "price": 999 },
        { "id": 2, "name": "Phone", "price": 599 }
    ]
}
\`\`\`

## Mixed Nesting:
\`\`\`json
{
    "orders": [
        {
            "id": "ORD-001",
            "items": [
                { "product": "Laptop", "qty": 1 }
            ]
        }
    ]
}
\`\`\`
    `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'Can objects contain arrays?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['No', 'Yes', 'Only strings', 'Only numbers'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                id: 'json-5',
                                                                                                                title: 'Parsing JSON',
                                                                                                                description: 'Converting to/from strings',
                                                                                                                stage: 3,
                                                                                                                content: `
# Parsing JSON

## Parse (String → Object):
\`\`\`javascript
const jsonString = '{"name": "Alice", "age": 25}';
const obj = JSON.parse(jsonString);
console.log(obj.name);  // "Alice"
\`\`\`

## Stringify (Object → String):
\`\`\`javascript
const obj = { name: "Alice", age: 25 };
const jsonString = JSON.stringify(obj);
// '{"name":"Alice","age":25}'
\`\`\`

## Pretty Print:
\`\`\`javascript
JSON.stringify(obj, null, 2);
// Indented with 2 spaces
\`\`\`

## Handling Errors:
\`\`\`javascript
try {
    const data = JSON.parse(invalidJson);
} catch (error) {
    console.log("Invalid JSON!");
}
\`\`\`
    `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'What converts a string to an object?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.decode()'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            },
                                                                                                            {
                                                                                                                id: 'json-6',
                                                                                                                title: 'JSON Schema',
                                                                                                                description: 'Validating JSON structure',
                                                                                                                stage: 4,
                                                                                                                content: `
# JSON Schema

Define the structure of your JSON!

## Basic Schema:
\`\`\`json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "name": { "type": "string" },
        "age": { "type": "integer", "minimum": 0 },
        "email": { "type": "string", "format": "email" }
    },
    "required": ["name", "email"]
}
\`\`\`

## Type Options:
- string, number, integer, boolean
- array, object, null

## Validation:
- minimum, maximum
- minLength, maxLength
- pattern (regex)
- enum (allowed values)

Congratulations! You've learned JSON! 🎉
    `,
                                                                                                                exercise: {
                                                                                                                    prompt: 'What does JSON Schema validate?',
                                                                                                                    type: 'multiple-choice',
                                                                                                                    options: ['JSON syntax', 'JSON structure', 'JSON speed', 'JSON size'],
                                                                                                                    answer: 1
                                                                                                                }
                                                                                                            }

                                                                                                    // Markdown Course
                                                                                                    'markdown': {
                                                                                                                id: 'markdown',
                                                                                                                name: 'Markdown',
                                                                                                                description: 'Write formatted documents with simple syntax.',
                                                                                                                category: COURSE_CATEGORIES.DATA,
                                                                                                                icon: '📝',
                                                                                                                color: '#083FA1',
                                                                                                                language: 'markdown',
                                                                                                                prerequisites: [],
                                                                                                                estimatedHours: 1,
                                                                                                                lessons: [
                                                                                                                    {
                                                                                                                        id: 'md-1',
                                                                                                                        title: 'What is Markdown?',
                                                                                                                        description: 'Simple text formatting',
                                                                                                                        stage: 1,
                                                                                                                        content: `
# What is Markdown?

Markdown is a simple way to format text.

## Used For:
- README files
- Documentation
- Notes and blogs

## Basic Syntax:
- # Heading
- **bold**
- *italic*
- [links](url)
                `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'What symbol creates a heading in Markdown?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['*', '#', '@', '!'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-2',
                                                                                                                        title: 'Formatting Text',
                                                                                                                        description: 'Bold, italic, and lists',
                                                                                                                        stage: 2,
                                                                                                                        content: `
# Formatting Text

## Bold and Italic:
- **bold** or __bold__
- *italic* or _italic_
- ***both***

## Lists:
\`\`\`
- Item 1
- Item 2
  - Nested

1. First
2. Second
\`\`\`
                `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'How do you make text bold in Markdown?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['<b>text</b>', '**text**', '!!text!!', '##text##'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-3',
                                                                                                                        title: 'Links and Images',
                                                                                                                        description: 'Adding hyperlinks and media',
                                                                                                                        stage: 2,
                                                                                                                        content: `
# Links and Images

## Links:
\`\`\`markdown
[Link Text](https://example.com)
[Link with title](https://example.com "Hover text")
\`\`\`

## Reference Links:
\`\`\`markdown
[Click here][1]

[1]: https://example.com
\`\`\`

## Images:
\`\`\`markdown
![Alt text](image.png)
![Logo](https://example.com/logo.png "Logo title")
\`\`\`

## Linked Images:
\`\`\`markdown
[![Alt](image.png)](https://example.com)
\`\`\`
    `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'What makes an image different from a link?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['Different brackets', 'Starts with !', 'Uses { }', 'Uses < >'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-4',
                                                                                                                        title: 'Code and Quotes',
                                                                                                                        description: 'Code blocks and blockquotes',
                                                                                                                        stage: 3,
                                                                                                                        content: `
# Code and Quotes

## Inline Code:
\`\`\`markdown
Use \`console.log()\` to debug.
\`\`\`

## Code Blocks:
\`\`\`markdown
\\\`\\\`\\\`javascript
function hello() {
    console.log("Hello!");
}
\\\`\\\`\\\`
\`\`\`

## Blockquotes:
\`\`\`markdown
> This is a quote.
> It can span multiple lines.
>
> > Nested quotes work too!
\`\`\`

## Horizontal Rule:
\`\`\`markdown
---
or
***
\`\`\`
    `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'What wraps inline code?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['Single quotes', 'Backticks', 'Double quotes', 'Parentheses'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-5',
                                                                                                                        title: 'Tables',
                                                                                                                        description: 'Creating data tables',
                                                                                                                        stage: 3,
                                                                                                                        content: `
# Tables

## Basic Table:
\`\`\`markdown
| Name    | Age | City    |
|---------|-----|---------|
| Alice   | 25  | NYC     |
| Bob     | 30  | LA      |
\`\`\`

## Alignment:
\`\`\`markdown
| Left    | Center  | Right   |
|:--------|:-------:|--------:|
| text    | text    | text    |
\`\`\`

## Result:

| Name    | Age | City    |
|---------|-----|---------|
| Alice   | 25  | NYC     |
| Bob     | 30  | LA      |
    `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'What symbol separates columns?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: [',', '|', ';', ':'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-6',
                                                                                                                        title: 'Task Lists',
                                                                                                                        description: 'Checkboxes and tasks',
                                                                                                                        stage: 3,
                                                                                                                        content: `
# Task Lists

## Checkbox Lists:
\`\`\`markdown
- [x] Completed task
- [ ] Incomplete task
- [ ] Another todo
\`\`\`

## Renders As:
- [x] Completed task
- [ ] Incomplete task
- [ ] Another todo

## Nested Tasks:
\`\`\`markdown
- [ ] Main task
  - [x] Subtask 1
  - [ ] Subtask 2
\`\`\`

Great for:
- Todo lists
- Project tracking
- Bug checklists
    `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'What marks a task as complete?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['[*]', '[x]', '[+]', '[✓]'],
                                                                                                                            answer: 1
                                                                                                                        }
                                                                                                                    },
                                                                                                                    {
                                                                                                                        id: 'md-7',
                                                                                                                        title: 'Advanced Features',
                                                                                                                        description: 'Extended markdown syntax',
                                                                                                                        stage: 4,
                                                                                                                        content: `
# Advanced Features

## Footnotes:
\`\`\`markdown
Here's a statement[^1].

[^1]: This is the footnote.
\`\`\`

## Definition Lists:
\`\`\`markdown
Term
: Definition here
\`\`\`

## Strikethrough:
\`\`\`markdown
~~deleted text~~
\`\`\`

## Emoji:
\`\`\`markdown
:smile: :rocket: :+1:
\`\`\`

## HTML in Markdown:
\`\`\`markdown
<details>
<summary>Click to expand</summary>
Hidden content here!
</details>
\`\`\`

Congratulations! You've learned Markdown! 🎉
    `,
                                                                                                                        exercise: {
                                                                                                                            prompt: 'Can you use HTML in Markdown?',
                                                                                                                            type: 'multiple-choice',
                                                                                                                            options: ['Never', 'Sometimes', 'Yes, in most parsers', 'Only images'],
                                                                                                                            answer: 2
                                                                                                                        }
                                                                                                                    }

                                                                                                    // APIs Course
                                                                                                    'apis': {
                                                                                                                        id: 'apis',
                                                                                                                        name: 'Working with APIs',
                                                                                                                        description: 'Connect your apps to external services.',
                                                                                                                        category: COURSE_CATEGORIES.EXTENSIONS,
                                                                                                                        icon: '🔌',
                                                                                                                        color: '#FF6B6B',
                                                                                                                        language: 'javascript',
                                                                                                                        prerequisites: ['javascript', 'json'],
                                                                                                                        estimatedHours: 6,
                                                                                                                        lessons: [
                                                                                                                            {
                                                                                                                                id: 'api-1',
                                                                                                                                title: 'What is an API?',
                                                                                                                                description: 'Application Programming Interface',
                                                                                                                                stage: 1,
                                                                                                                                content: `
# What is an API?

API = Application Programming Interface

It's how programs talk to each other.

## Examples:
- Weather data from weather.com
- User login with Google
- Payment processing

## How It Works:
1. You send a request
2. Server processes it
3. Server sends response
                `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What does API stand for?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['Automated Program Interface', 'Application Programming Interface', 'Applied Programming Integration', 'Automatic Process Integration'],
                                                                                                                                    answer: 1
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-2',
                                                                                                                                title: 'Making Requests',
                                                                                                                                description: 'Fetching data from APIs',
                                                                                                                                stage: 2,
                                                                                                                                content: `
# Making Requests

## Natural Language:
\`\`\`
fetch data from "https://api.example.com/users"
\`\`\`

## Real JavaScript:
\`\`\`javascript
fetch("https://api.example.com/users")
  .then(response => response.json())
  .then(data => console.log(data));
\`\`\`
                `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'Write: fetch data from "https://api.weather.com"',
                                                                                                                                    type: 'code',
                                                                                                                                    expectedOutput: 'fetch data from "https://api.weather.com"',
                                                                                                                                    hint: 'Use fetch data from with the URL'
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-3',
                                                                                                                                title: 'HTTP Methods',
                                                                                                                                description: 'GET, POST, PUT, DELETE',
                                                                                                                                stage: 2,
                                                                                                                                content: `
# HTTP Methods

## GET - Retrieve Data:
\`\`\`javascript
fetch('/api/users')
\`\`\`

## POST - Create Data:
\`\`\`javascript
fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice' })
})
\`\`\`

## PUT - Update Data:
\`\`\`javascript
fetch('/api/users/1', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Alice Updated' })
})
\`\`\`

## DELETE - Remove Data:
\`\`\`javascript
fetch('/api/users/1', {
    method: 'DELETE'
})
\`\`\`
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What method creates new data?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['GET', 'POST', 'PUT', 'PATCH'],
                                                                                                                                    answer: 1
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-4',
                                                                                                                                title: 'Status Codes',
                                                                                                                                description: 'Understanding responses',
                                                                                                                                stage: 2,
                                                                                                                                content: `
# HTTP Status Codes

## 2xx - Success:
- 200 OK - Request succeeded
- 201 Created - Resource created
- 204 No Content - Success, no body

## 3xx - Redirect:
- 301 Moved Permanently
- 302 Found (Temporary redirect)
- 304 Not Modified (cached)

## 4xx - Client Error:
- 400 Bad Request - Invalid syntax
- 401 Unauthorized - Need login
- 403 Forbidden - No permission
- 404 Not Found - Resource missing
- 422 Unprocessable - Validation failed

## 5xx - Server Error:
- 500 Internal Server Error
- 502 Bad Gateway
- 503 Service Unavailable
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What does 404 mean?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['Success', 'Unauthorized', 'Not Found', 'Server Error'],
                                                                                                                                    answer: 2
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-5',
                                                                                                                                title: 'Async/Await',
                                                                                                                                description: 'Modern API calls',
                                                                                                                                stage: 3,
                                                                                                                                content: `
# Async/Await

Modern way to handle APIs!

## Basic Usage:
\`\`\`javascript
async function getUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    return data;
}
\`\`\`

## Error Handling:
\`\`\`javascript
async function getUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}
\`\`\`

## Multiple Requests:
\`\`\`javascript
async function getData() {
    const [users, posts] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json())
    ]);
}
\`\`\`
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What keyword pauses until promise resolves?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['pause', 'wait', 'await', 'hold'],
                                                                                                                                    answer: 2
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-6',
                                                                                                                                title: 'Query Parameters',
                                                                                                                                description: 'Filtering and pagination',
                                                                                                                                stage: 3,
                                                                                                                                content: `
# Query Parameters

## Adding Parameters:
\`\`\`javascript
fetch('/api/users?page=1&limit=10')

// Building dynamically
const params = new URLSearchParams({
    page: 1,
    limit: 10,
    sort: 'name'
});
fetch(\`/api/users?\${params}\`)
\`\`\`

## Common Patterns:
- Pagination: \`?page=2&per_page=20\`
- Filtering: \`?status=active&role=admin\`
- Sorting: \`?sort=created_at&order=desc\`
- Searching: \`?search=alice\`

## Example:
\`\`\`javascript
async function searchUsers(query, page = 1) {
    const params = new URLSearchParams({
        q: query,
        page: page,
        limit: 10
    });
    const response = await fetch(\`/api/users?\${params}\`);
    return response.json();
}
\`\`\`
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What separates query params from the URL?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['&', '#', '?', '/'],
                                                                                                                                    answer: 2
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-7',
                                                                                                                                title: 'Headers',
                                                                                                                                description: 'Authentication and content types',
                                                                                                                                stage: 3,
                                                                                                                                content: `
# Headers

## Common Headers:
\`\`\`javascript
fetch('/api/data', {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer token123'
    }
})
\`\`\`

## Content-Type:
- \`application/json\` - JSON data
- \`application/x-www-form-urlencoded\` - Form data
- \`multipart/form-data\` - File uploads

## Authorization:
\`\`\`javascript
// Bearer Token
'Authorization': 'Bearer eyJhbGciOiJI...'

// Basic Auth
'Authorization': 'Basic ' + btoa('user:pass')

// API Key
'X-API-Key': 'your-api-key'
\`\`\`

## CORS Headers:
APIs use these to control who can access them.
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What header sends a token?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['Token', 'Authorization', 'Auth', 'Bearer'],
                                                                                                                                    answer: 1
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-8',
                                                                                                                                title: 'REST Principles',
                                                                                                                                description: 'Designing good APIs',
                                                                                                                                stage: 4,
                                                                                                                                content: `
# REST Principles

## Resources:
Use nouns, not verbs.
\`\`\`
GET /users       ✓
GET /getUsers    ✗
\`\`\`

## Use HTTP Methods:
\`\`\`
GET    /users      - List all
GET    /users/1    - Get one
POST   /users      - Create
PUT    /users/1    - Replace
PATCH  /users/1    - Update partially
DELETE /users/1    - Delete
\`\`\`

## Nested Resources:
\`\`\`
GET /users/1/posts     - User's posts
POST /users/1/comments - Add comment
\`\`\`

## Responses:
- Return created resource on POST
- Return updated resource on PUT/PATCH
- Return 204 No Content on DELETE
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'What should resource names use?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['Verbs', 'Nouns', 'Actions', 'Descriptions'],
                                                                                                                                    answer: 1
                                                                                                                                }
                                                                                                                            },
                                                                                                                            {
                                                                                                                                id: 'api-9',
                                                                                                                                title: 'Error Handling',
                                                                                                                                description: 'Graceful failures',
                                                                                                                                stage: 4,
                                                                                                                                content: `
# Error Handling

## Check Response Status:
\`\`\`javascript
async function fetchData(url) {
    const response = await fetch(url);
    
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
    }
    
    return response.json();
}
\`\`\`

## API Error Format:
\`\`\`json
{
    "error": {
        "code": "VALIDATION_ERROR",
        "message": "Email is required",
        "details": {
            "field": "email"
        }
    }
}
\`\`\`

## Retry Logic:
\`\`\`javascript
async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
        try {
            return await fetch(url);
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(r => setTimeout(r, 1000 * (i + 1)));
        }
    }
}
\`\`\`

Congratulations! You've learned APIs! 🎉
    `,
                                                                                                                                exercise: {
                                                                                                                                    prompt: 'How do you check if a response succeeded?',
                                                                                                                                    type: 'multiple-choice',
                                                                                                                                    options: ['response.success', 'response.ok', 'response.valid', 'response.status === 200'],
                                                                                                                                    answer: 1
                                                                                                                                }
                                                                                                                            }

// Swift Course
'swift': {
                                                                                                                                id: 'swift',
                                                                                                                                name: 'Swift',
                                                                                                                                description: 'Build iOS and macOS apps with Apple\'s modern language.',
                                                                                                                                category: COURSE_CATEGORIES.LANGUAGE,
                                                                                                                                icon: '🍎',
                                                                                                                                color: '#F05138',
                                                                                                                                language: 'swift',
                                                                                                                                prerequisites: ['intro-logic'],
                                                                                                                                estimatedHours: 12,
                                                                                                                                lessons: [
                                                                                                                                    {
                                                                                                                                        id: 'swift-1',
                                                                                                                                        title: 'Hello Swift',
                                                                                                                                        description: 'Your first Swift program',
                                                                                                                                        stage: 1,
                                                                                                                                        content: `
# Hello Swift

Swift is Apple's language for iOS and macOS apps.

## Natural Language:
\`\`\`
display "Hello, Swift!" end display
\`\`\`

## Real Swift:
\`\`\`swift
print("Hello, Swift!")
\`\`\`
                `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What platforms use Swift?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Windows', 'iOS and macOS', 'Android', 'Linux only'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-2',
                                                                                                                                        title: 'Variables in Swift',
                                                                                                                                        description: 'let and var',
                                                                                                                                        stage: 2,
                                                                                                                                        content: `
# Variables in Swift

## Constants (can't change):
\`\`\`swift
let name = "Alice"
\`\`\`

## Variables (can change):
\`\`\`swift
var score = 0
score = 10
\`\`\`
                `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'Which keyword creates a constant in Swift?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['var', 'let', 'const', 'final'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-3',
                                                                                                                                        title: 'Data Types',
                                                                                                                                        description: 'Swift type system',
                                                                                                                                        stage: 2,
                                                                                                                                        content: `
# Data Types

## Basic Types:
\`\`\`swift
let name: String = "Alice"
let age: Int = 25
let height: Double = 5.9
let isActive: Bool = true
\`\`\`

## Type Inference:
\`\`\`swift
let message = "Hello"  // String inferred
let count = 42         // Int inferred
\`\`\`

## Type Conversion:
\`\`\`swift
let x = 5
let y = 3.14
let sum = Double(x) + y
\`\`\`

## String Interpolation:
\`\`\`swift
let name = "Alice"
let greeting = "Hello, \\(name)!"
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'How do you embed variables in strings?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['${name}', '\\(name)', '{name}', '#{name}'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-4',
                                                                                                                                        title: 'Control Flow',
                                                                                                                                        description: 'if, switch, loops',
                                                                                                                                        stage: 2,
                                                                                                                                        content: `
# Control Flow

## if Statement:
\`\`\`swift
if age >= 18 {
    print("Adult")
} else if age >= 13 {
    print("Teen")
} else {
    print("Child")
}
\`\`\`

## switch (powerful!):
\`\`\`swift
switch grade {
case "A":
    print("Excellent")
case "B", "C":
    print("Good")
case "D"..."F":
    print("Needs work")
default:
    print("Unknown")
}
\`\`\`

## for Loop:
\`\`\`swift
for i in 1...5 {
    print(i)
}

for name in names {
    print(name)
}
\`\`\`

## while:
\`\`\`swift
while count < 10 {
    count += 1
}
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What is 1...5 in Swift?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Array', 'Range', 'Tuple', 'Set'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-5',
                                                                                                                                        title: 'Optionals',
                                                                                                                                        description: 'Handling nil values',
                                                                                                                                        stage: 3,
                                                                                                                                        content: `
# Optionals

Values that might be nil!

## Declaring Optionals:
\`\`\`swift
var name: String? = nil
name = "Alice"
\`\`\`

## Unwrapping:
\`\`\`swift
// Force unwrap (dangerous!)
print(name!)

// Optional binding (safe)
if let unwrapped = name {
    print(unwrapped)
}

// Guard (early exit)
guard let unwrapped = name else {
    return
}
\`\`\`

## Nil Coalescing:
\`\`\`swift
let displayName = name ?? "Anonymous"
\`\`\`

## Optional Chaining:
\`\`\`swift
let length = name?.count
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What operator provides a default value?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['||', '??', '?:', '&&'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-6',
                                                                                                                                        title: 'Functions',
                                                                                                                                        description: 'Defining functions',
                                                                                                                                        stage: 3,
                                                                                                                                        content: `
# Functions

## Basic Function:
\`\`\`swift
func greet(name: String) -> String {
    return "Hello, \\(name)!"
}

greet(name: "Alice")
\`\`\`

## Parameter Labels:
\`\`\`swift
func greet(person name: String) -> String {
    return "Hello, \\(name)!"
}

greet(person: "Alice")  // External label

func greet(_ name: String) -> String {
    return "Hello, \\(name)!"
}

greet("Alice")  // No label needed
\`\`\`

## Default Values:
\`\`\`swift
func greet(name: String = "World") -> String {
    return "Hello, \\(name)!"
}
\`\`\`

## Multiple Returns:
\`\`\`swift
func minMax(array: [Int]) -> (min: Int, max: Int) {
    return (array.min()!, array.max()!)
}
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What symbol indicates return type?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: [':', '=>', '->', '::'],
                                                                                                                                            answer: 2
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-7',
                                                                                                                                        title: 'Collections',
                                                                                                                                        description: 'Arrays, Sets, Dictionaries',
                                                                                                                                        stage: 3,
                                                                                                                                        content: `
# Collections

## Arrays:
\`\`\`swift
var numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.remove(at: 0)
let first = numbers[0]
\`\`\`

## Sets (unique values):
\`\`\`swift
var colors: Set = ["red", "green", "blue"]
colors.insert("yellow")
colors.contains("red")  // true
\`\`\`

## Dictionaries:
\`\`\`swift
var ages = ["Alice": 25, "Bob": 30]
ages["Charlie"] = 35
let aliceAge = ages["Alice"]  // Optional!
\`\`\`

## Iterating:
\`\`\`swift
for number in numbers { }
for (name, age) in ages { }
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What collection has unique values?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Array', 'Set', 'Dictionary', 'Tuple'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-8',
                                                                                                                                        title: 'Structs',
                                                                                                                                        description: 'Value types',
                                                                                                                                        stage: 3,
                                                                                                                                        content: `
# Structs

## Defining Structs:
\`\`\`swift
struct Person {
    var name: String
    var age: Int
    
    func greet() -> String {
        return "Hello, I'm \\(name)"
    }
}

var person = Person(name: "Alice", age: 25)
print(person.greet())
\`\`\`

## Mutating Methods:
\`\`\`swift
struct Counter {
    var count = 0
    
    mutating func increment() {
        count += 1
    }
}
\`\`\`

## Computed Properties:
\`\`\`swift
struct Rectangle {
    var width: Double
    var height: Double
    
    var area: Double {
        return width * height
    }
}
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What keyword allows struct methods to modify properties?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['mutable', 'mutating', 'var', 'modify'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-9',
                                                                                                                                        title: 'Classes',
                                                                                                                                        description: 'Reference types',
                                                                                                                                        stage: 4,
                                                                                                                                        content: `
# Classes

## Defining Classes:
\`\`\`swift
class Animal {
    var name: String
    
    init(name: String) {
        self.name = name
    }
    
    func speak() {
        print("...")
    }
}

class Dog: Animal {
    override func speak() {
        print("Woof!")
    }
}
\`\`\`

## Struct vs Class:
- Structs: Value type (copied)
- Classes: Reference type (shared)

\`\`\`swift
var a = Person(name: "Alice")
var b = a  // Struct: b is copy
           // Class: b is same object
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What keyword overrides a parent method?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['super', 'override', 'extends', 'virtual'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-10',
                                                                                                                                        title: 'Enums',
                                                                                                                                        description: 'Custom types with cases',
                                                                                                                                        stage: 4,
                                                                                                                                        content: `
# Enums

## Basic Enum:
\`\`\`swift
enum Direction {
    case north
    case south
    case east
    case west
}

var dir = Direction.north
dir = .south  // Shorthand
\`\`\`

## With Values:
\`\`\`swift
enum Planet: Int {
    case mercury = 1
    case venus, earth, mars
}

print(Planet.earth.rawValue)  // 3
\`\`\`

## Associated Values:
\`\`\`swift
enum Barcode {
    case upc(Int, Int, Int, Int)
    case qr(String)
}

let product = Barcode.qr("ABCD1234")
\`\`\`

## Pattern Matching:
\`\`\`swift
switch barcode {
case .upc(let a, let b, let c, let d):
    print("UPC: \\(a)-\\(b)-\\(c)-\\(d)")
case .qr(let code):
    print("QR: \\(code)")
}
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What can enum cases store?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Only strings', 'Only numbers', 'Associated values', 'Nothing'],
                                                                                                                                            answer: 2
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-11',
                                                                                                                                        title: 'Closures',
                                                                                                                                        description: 'Anonymous functions',
                                                                                                                                        stage: 4,
                                                                                                                                        content: `
# Closures

## Closure Syntax:
\`\`\`swift
let greet = { (name: String) -> String in
    return "Hello, \\(name)!"
}

greet("Alice")
\`\`\`

## Shorthand:
\`\`\`swift
let numbers = [1, 2, 3, 4, 5]

// Full
let doubled = numbers.map({ (n: Int) -> Int in
    return n * 2
})

// Shorthand
let doubled = numbers.map { $0 * 2 }
\`\`\`

## Trailing Closures:
\`\`\`swift
let sorted = names.sorted { $0 < $1 }
\`\`\`

## Capturing Values:
\`\`\`swift
func makeCounter() -> () -> Int {
    var count = 0
    return { count += 1; return count }
}
\`\`\`
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What is $0 in a closure?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Zero', 'First parameter', 'Return value', 'Self'],
                                                                                                                                            answer: 1
                                                                                                                                        }
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        id: 'swift-12',
                                                                                                                                        title: 'Protocols',
                                                                                                                                        description: 'Defining contracts',
                                                                                                                                        stage: 4,
                                                                                                                                        content: `
# Protocols

Like interfaces!

## Defining Protocols:
\`\`\`swift
protocol Drawable {
    func draw()
    var description: String { get }
}

class Circle: Drawable {
    func draw() {
        print("Drawing circle")
    }
    
    var description: String {
        return "A circle"
    }
}
\`\`\`

## Protocol Extensions:
\`\`\`swift
extension Drawable {
    func draw() {
        print("Default drawing")
    }
}
\`\`\`

## Protocol Composition:
\`\`\`swift
func process(item: Drawable & Codable) {
    // Item must conform to both
}
\`\`\`

Congratulations! You've learned Swift! 🎉
    `,
                                                                                                                                        exercise: {
                                                                                                                                            prompt: 'What are protocols similar to?',
                                                                                                                                            type: 'multiple-choice',
                                                                                                                                            options: ['Classes', 'Structs', 'Interfaces', 'Enums'],
                                                                                                                                            answer: 2
                                                                                                                                        }
                                                                                                                                    }

// C# Course
'csharp': {
                                                                                                                                        id: 'csharp',
                                                                                                                                        name: 'C#',
                                                                                                                                        description: 'Microsoft\'s powerful language for games and apps.',
                                                                                                                                        category: COURSE_CATEGORIES.LANGUAGE,
                                                                                                                                        icon: '🎮',
                                                                                                                                        color: '#239120',
                                                                                                                                        language: 'csharp',
                                                                                                                                        prerequisites: ['intro-logic'],
                                                                                                                                        estimatedHours: 14,
                                                                                                                                        lessons: [
                                                                                                                                            {
                                                                                                                                                id: 'cs-1',
                                                                                                                                                title: 'Hello C#',
                                                                                                                                                description: 'Your first C# program',
                                                                                                                                                stage: 1,
                                                                                                                                                content: `
# Hello C#

C# is used for games (Unity), Windows apps, and web services.

## Natural Language:
\`\`\`
display "Hello, C#!" end display
\`\`\`

## Real C#:
\`\`\`csharp
Console.WriteLine("Hello, C#!");
\`\`\`
                `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What game engine uses C#?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['Unreal', 'Unity', 'Godot', 'GameMaker'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-2',
                                                                                                                                                title: 'Variables in C#',
                                                                                                                                                description: 'Typed variables',
                                                                                                                                                stage: 2,
                                                                                                                                                content: `
# Variables in C#

C# requires type declarations.

## Types:
- \`string\` - Text
- \`int\` - Whole numbers
- \`double\` - Decimals
- \`bool\` - True/False

## Example:
\`\`\`csharp
string name = "Alice";
int age = 25;
\`\`\`
                `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'Write: create text greeting = "Hi"',
                                                                                                                                                    type: 'code',
                                                                                                                                                    expectedOutput: 'create text greeting = "Hi"',
                                                                                                                                                    hint: 'Declare a text variable'
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-3',
                                                                                                                                                title: 'Type Inference',
                                                                                                                                                description: 'var keyword',
                                                                                                                                                stage: 2,
                                                                                                                                                content: `
# Type Inference

## Using var:
\`\`\`csharp
var name = "Alice";    // Inferred as string
var age = 25;          // Inferred as int
var price = 19.99;     // Inferred as double
\`\`\`

## Const and Readonly:
\`\`\`csharp
const double PI = 3.14159;  // Compile-time constant
readonly int maxSize = 100; // Runtime constant
\`\`\`

## Nullable Types:
\`\`\`csharp
int? nullableInt = null;
string? nullableString = null;

if (nullableInt.HasValue)
{
    Console.WriteLine(nullableInt.Value);
}
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What lets the compiler infer the type?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['auto', 'var', 'let', 'infer'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-4',
                                                                                                                                                title: 'Control Flow',
                                                                                                                                                description: 'if, switch, loops',
                                                                                                                                                stage: 2,
                                                                                                                                                content: `
# Control Flow

## if Statement:
\`\`\`csharp
if (age >= 18)
{
    Console.WriteLine("Adult");
}
else if (age >= 13)
{
    Console.WriteLine("Teen");
}
else
{
    Console.WriteLine("Child");
}
\`\`\`

## switch:
\`\`\`csharp
switch (grade)
{
    case "A":
        Console.WriteLine("Excellent");
        break;
    case "B":
    case "C":
        Console.WriteLine("Good");
        break;
    default:
        Console.WriteLine("Unknown");
        break;
}
\`\`\`

## Loops:
\`\`\`csharp
for (int i = 0; i < 5; i++) { }
foreach (var item in collection) { }
while (condition) { }
do { } while (condition);
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What iterates over collections easily?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['for', 'foreach', 'while', 'iterate'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-5',
                                                                                                                                                title: 'Methods',
                                                                                                                                                description: 'Functions in C#',
                                                                                                                                                stage: 3,
                                                                                                                                                content: `
# Methods

## Defining Methods:
\`\`\`csharp
public string Greet(string name)
{
    return $"Hello, {name}!";
}

public void PrintMessage(string message)
{
    Console.WriteLine(message);
}
\`\`\`

## Default Parameters:
\`\`\`csharp
public string Greet(string name = "World")
{
    return $"Hello, {name}!";
}
\`\`\`

## Named Arguments:
\`\`\`csharp
CreateUser(name: "Alice", age: 25);
\`\`\`

## Out and Ref:
\`\`\`csharp
public void GetValues(out int x, ref int y)
{
    x = 10;  // out: must assign
    y += 5;  // ref: can modify
}
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What means no return value?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['null', 'void', 'none', 'empty'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-6',
                                                                                                                                                title: 'Arrays and Lists',
                                                                                                                                                description: 'Collections in C#',
                                                                                                                                                stage: 3,
                                                                                                                                                content: `
# Arrays and Lists

## Arrays (fixed size):
\`\`\`csharp
int[] numbers = { 1, 2, 3, 4, 5 };
string[] names = new string[3];
names[0] = "Alice";
\`\`\`

## Lists (dynamic):
\`\`\`csharp
List<int> numbers = new List<int> { 1, 2, 3 };
numbers.Add(4);
numbers.Remove(2);
numbers.Count;
\`\`\`

## Dictionary:
\`\`\`csharp
Dictionary<string, int> ages = new Dictionary<string, int>
{
    { "Alice", 25 },
    { "Bob", 30 }
};
ages["Charlie"] = 35;
\`\`\`

## LINQ:
\`\`\`csharp
var evens = numbers.Where(n => n % 2 == 0);
var doubled = numbers.Select(n => n * 2);
var sum = numbers.Sum();
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What collection grows dynamically?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['Array', 'List', 'Dictionary', 'Set'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-7',
                                                                                                                                                title: 'Classes',
                                                                                                                                                description: 'Object-oriented C#',
                                                                                                                                                stage: 3,
                                                                                                                                                content: `
# Classes

## Defining Classes:
\`\`\`csharp
public class Person
{
    // Fields
    private string _name;
    
    // Properties
    public string Name 
    { 
        get { return _name; }
        set { _name = value; }
    }
    
    // Auto-property
    public int Age { get; set; }
    
    // Constructor
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // Method
    public string Greet()
    {
        return $"Hello, I'm {Name}";
    }
}
\`\`\`

## Usage:
\`\`\`csharp
var person = new Person("Alice", 25);
Console.WriteLine(person.Greet());
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What is { get; set; }?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['Method', 'Auto-property', 'Field', 'Constructor'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-8',
                                                                                                                                                title: 'Inheritance',
                                                                                                                                                description: 'Extending classes',
                                                                                                                                                stage: 4,
                                                                                                                                                content: `
# Inheritance

## Base and Derived:
\`\`\`csharp
public class Animal
{
    public string Name { get; set; }
    
    public virtual void Speak()
    {
        Console.WriteLine("...");
    }
}

public class Dog : Animal
{
    public override void Speak()
    {
        Console.WriteLine("Woof!");
    }
    
    public void Fetch()
    {
        Console.WriteLine($"{Name} fetches!");
    }
}
\`\`\`

## Abstract Classes:
\`\`\`csharp
public abstract class Shape
{
    public abstract double Area();
}
\`\`\`

## Sealed (prevent inheritance):
\`\`\`csharp
public sealed class FinalClass { }
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What keyword overrides a virtual method?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['virtual', 'override', 'new', 'base'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-9',
                                                                                                                                                title: 'Interfaces',
                                                                                                                                                description: 'Defining contracts',
                                                                                                                                                stage: 4,
                                                                                                                                                content: `
# Interfaces

## Defining Interfaces:
\`\`\`csharp
public interface IDrawable
{
    void Draw();
    string Description { get; }
}

public class Circle : IDrawable
{
    public string Description => "A circle";
    
    public void Draw()
    {
        Console.WriteLine("Drawing circle");
    }
}
\`\`\`

## Multiple Interfaces:
\`\`\`csharp
public class MyClass : IDrawable, IDisposable
{
    // Implement both
}
\`\`\`

## Default Implementation (C# 8+):
\`\`\`csharp
public interface ILogger
{
    void Log(string message);
    
    void LogError(string message) => Log($"ERROR: {message}");
}
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What prefix is convention for interfaces?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['Int', 'I', 'If', 'Interface'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-10',
                                                                                                                                                title: 'Generics',
                                                                                                                                                description: 'Type parameters',
                                                                                                                                                stage: 4,
                                                                                                                                                content: `
# Generics

## Generic Classes:
\`\`\`csharp
public class Box<T>
{
    public T Value { get; set; }
    
    public Box(T value)
    {
        Value = value;
    }
}

var intBox = new Box<int>(42);
var stringBox = new Box<string>("Hello");
\`\`\`

## Generic Methods:
\`\`\`csharp
public T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}
\`\`\`

## Constraints:
\`\`\`csharp
where T : class      // Reference type
where T : struct     // Value type
where T : new()      // Has parameterless constructor
where T : IDisposable  // Implements interface
\`\`\`
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What restricts generic type parameters?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['where', 'limit', 'constraint', 'restrict'],
                                                                                                                                                    answer: 0
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-11',
                                                                                                                                                title: 'Async/Await',
                                                                                                                                                description: 'Asynchronous programming',
                                                                                                                                                stage: 4,
                                                                                                                                                content: `
# Async/Await

## Basic Async:
\`\`\`csharp
public async Task<string> GetDataAsync()
{
    var result = await httpClient.GetStringAsync(url);
    return result;
}
\`\`\`

## Calling Async Methods:
\`\`\`csharp
var data = await GetDataAsync();
\`\`\`

## Multiple Async:
\`\`\`csharp
var task1 = GetUsersAsync();
var task2 = GetPostsAsync();

await Task.WhenAll(task1, task2);

var users = task1.Result;
var posts = task2.Result;
\`\`\`

## Return Types:
- \`Task\` - No return value
- \`Task<T>\` - Returns T
- \`ValueTask<T>\` - Performance optimization
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What type wraps an async return value?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['Async<T>', 'Task<T>', 'Future<T>', 'Promise<T>'],
                                                                                                                                                    answer: 1
                                                                                                                                                }
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                id: 'cs-12',
                                                                                                                                                title: 'Exception Handling',
                                                                                                                                                description: 'Error handling',
                                                                                                                                                stage: 4,
                                                                                                                                                content: `
# Exception Handling

## try-catch-finally:
\`\`\`csharp
try
{
    var result = int.Parse(input);
}
catch (FormatException ex)
{
    Console.WriteLine($"Invalid format: {ex.Message}");
}
catch (Exception ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}
finally
{
    // Always runs
}
\`\`\`

## Throwing:
\`\`\`csharp
if (age < 0)
{
    throw new ArgumentException("Age cannot be negative");
}
\`\`\`

## Custom Exceptions:
\`\`\`csharp
public class ValidationException : Exception
{
    public ValidationException(string message) : base(message) { }
}
\`\`\`

Congratulations! You've learned C#! 🎉
    `,
                                                                                                                                                exercise: {
                                                                                                                                                    prompt: 'What block always runs?',
                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                    options: ['try', 'catch', 'finally', 'throw'],
                                                                                                                                                    answer: 2
                                                                                                                                                }
                                                                                                                                            }

// Git Course
'git': {
                                                                                                                                                id: 'git',
                                                                                                                                                name: 'Git Version Control',
                                                                                                                                                description: 'Track changes and collaborate with Git.',
                                                                                                                                                category: COURSE_CATEGORIES.TOOLS,
                                                                                                                                                icon: '🔀',
                                                                                                                                                color: '#F05032',
                                                                                                                                                language: 'bash',
                                                                                                                                                prerequisites: ['terminal'],
                                                                                                                                                estimatedHours: 5,
                                                                                                                                                lessons: [
                                                                                                                                                    {
                                                                                                                                                        id: 'git-1',
                                                                                                                                                        title: 'What is Git?',
                                                                                                                                                        description: 'Version control basics',
                                                                                                                                                        stage: 1,
                                                                                                                                                        content: `
# What is Git?

Git tracks changes to your code over time.

## Why Use It?
- Save versions of your work
- Undo mistakes
- Collaborate with others
- See who changed what

## Key Concepts:
- Repository (repo)
- Commit (save point)
- Branch (parallel version)
                `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What does Git track?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['Time spent coding', 'Changes to code', 'Computer memory', 'Internet speed'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-2',
                                                                                                                                                        title: 'Basic Commands',
                                                                                                                                                        description: 'init, add, commit',
                                                                                                                                                        stage: 2,
                                                                                                                                                        content: `
# Basic Git Commands

## Starting:
\`\`\`bash
git init          # Create new repo
git clone <url>   # Copy existing repo
\`\`\`

## Saving Changes:
\`\`\`bash
git add .                    # Stage all changes
git commit -m "message"      # Save with message
\`\`\`
                `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'Write: git add .',
                                                                                                                                                            type: 'code',
                                                                                                                                                            expectedOutput: 'git add .',
                                                                                                                                                            hint: 'Stage all changes'
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-3',
                                                                                                                                                        title: 'Status and Diff',
                                                                                                                                                        description: 'Checking changes',
                                                                                                                                                        stage: 2,
                                                                                                                                                        content: `
# Status and Diff

## Checking Status:
\`\`\`bash
git status
# Shows:
# - Staged changes (green)
# - Unstaged changes (red)
# - Untracked files
\`\`\`

## Viewing Differences:
\`\`\`bash
git diff              # Unstaged changes
git diff --staged     # Staged changes
git diff HEAD~1       # Compare to last commit
git diff branch1 branch2  # Between branches
\`\`\`

## Viewing History:
\`\`\`bash
git log
git log --oneline     # Compact view
git log --graph       # Visual branches
git log -p            # With diffs
\`\`\`
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What shows staged changes?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['git diff', 'git diff --staged', 'git status', 'git show'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-4',
                                                                                                                                                        title: 'Branches',
                                                                                                                                                        description: 'Parallel development',
                                                                                                                                                        stage: 3,
                                                                                                                                                        content: `
# Branches

## Creating Branches:
\`\`\`bash
git branch feature      # Create branch
git checkout feature    # Switch to it
git checkout -b feature # Create and switch
\`\`\`

## Modern Commands (Git 2.23+):
\`\`\`bash
git switch feature      # Switch branch
git switch -c feature   # Create and switch
\`\`\`

## Managing Branches:
\`\`\`bash
git branch              # List branches
git branch -a           # Include remote
git branch -d feature   # Delete branch
git branch -D feature   # Force delete
\`\`\`

## Why Branches?
- Work on features without affecting main
- Easy to experiment
- Enables code review
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What creates and switches to a branch?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['git branch -b', 'git checkout -b', 'git create', 'git new'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-5',
                                                                                                                                                        title: 'Merging',
                                                                                                                                                        description: 'Combining branches',
                                                                                                                                                        stage: 3,
                                                                                                                                                        content: `
# Merging

## Basic Merge:
\`\`\`bash
git checkout main
git merge feature
\`\`\`

## Merge Types:
- Fast-forward: No new commit
- Merge commit: Combines histories

## Handling Conflicts:
\`\`\`
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> feature
\`\`\`

1. Edit file to resolve
2. \`git add file\`
3. \`git commit\`

## Abort Merge:
\`\`\`bash
git merge --abort
\`\`\`
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What happens if both branches change the same line?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['Auto-merged', 'Conflict', 'Error', 'Ignored'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-6',
                                                                                                                                                        title: 'Remote Repositories',
                                                                                                                                                        description: 'Working with GitHub',
                                                                                                                                                        stage: 3,
                                                                                                                                                        content: `
# Remote Repositories

## Adding Remote:
\`\`\`bash
git remote add origin <url>
git remote -v             # List remotes
\`\`\`

## Push and Pull:
\`\`\`bash
git push origin main      # Upload
git push -u origin main   # Set upstream
git pull origin main      # Download + merge
git fetch origin          # Download only
\`\`\`

## First Push:
\`\`\`bash
git push -u origin main
# Now just 'git push' works
\`\`\`

## Tracking Branches:
\`\`\`bash
git branch --set-upstream-to=origin/main main
\`\`\`
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What uploads commits to GitHub?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['git upload', 'git push', 'git send', 'git sync'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-7',
                                                                                                                                                        title: 'Undoing Changes',
                                                                                                                                                        description: 'Reset, revert, restore',
                                                                                                                                                        stage: 4,
                                                                                                                                                        content: `
# Undoing Changes

## Unstage Files:
\`\`\`bash
git restore --staged file.txt
\`\`\`

## Discard Changes:
\`\`\`bash
git restore file.txt      # Discard uncommitted
git checkout -- file.txt  # Old way
\`\`\`

## Undo Commits:
\`\`\`bash
git reset --soft HEAD~1   # Keep changes staged
git reset --mixed HEAD~1  # Keep changes unstaged
git reset --hard HEAD~1   # Discard everything
\`\`\`

## Revert (safe):
\`\`\`bash
git revert HEAD           # New commit that undoes
git revert abc123         # Revert specific commit
\`\`\`

⚠️ Use revert for shared branches!
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What safely undoes a public commit?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['reset', 'revert', 'restore', 'undo'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-8',
                                                                                                                                                        title: 'Stashing',
                                                                                                                                                        description: 'Temporary storage',
                                                                                                                                                        stage: 4,
                                                                                                                                                        content: `
# Stashing

Save work temporarily!

## Basic Stash:
\`\`\`bash
git stash                 # Save changes
git stash pop             # Apply and remove
git stash apply           # Apply and keep
\`\`\`

## Managing Stashes:
\`\`\`bash
git stash list            # Show all stashes
git stash show            # Show changes
git stash drop            # Delete stash
git stash clear           # Delete all
\`\`\`

## Named Stash:
\`\`\`bash
git stash save "WIP: feature"
\`\`\`

## Apply Specific:
\`\`\`bash
git stash apply stash@{2}
\`\`\`

## When to Stash:
- Need to switch branches quickly
- Want to save incomplete work
- Pulling when you have local changes
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'What applies and removes a stash?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['stash apply', 'stash pop', 'stash get', 'stash use'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        id: 'git-9',
                                                                                                                                                        title: 'Rebasing',
                                                                                                                                                        description: 'Rewriting history',
                                                                                                                                                        stage: 4,
                                                                                                                                                        content: `
# Rebasing

## Basic Rebase:
\`\`\`bash
git checkout feature
git rebase main
# Replays feature commits on top of main
\`\`\`

## Interactive Rebase:
\`\`\`bash
git rebase -i HEAD~3
# Edit last 3 commits
\`\`\`

## Commands:
- pick: Keep commit
- reword: Change message
- squash: Combine with previous
- drop: Remove commit

## Rebase vs Merge:
- Merge: Preserves history
- Rebase: Linear history

⚠️ Never rebase shared branches!

Congratulations! You've learned Git! 🎉
    `,
                                                                                                                                                        exercise: {
                                                                                                                                                            prompt: 'When should you NOT rebase?',
                                                                                                                                                            type: 'multiple-choice',
                                                                                                                                                            options: ['Feature branches', 'Shared branches', 'Before merge', 'Local commits'],
                                                                                                                                                            answer: 1
                                                                                                                                                        }
                                                                                                                                                    }

// Authentication Course
'authentication': {
                                                                                                                                                        id: 'authentication',
                                                                                                                                                        name: 'Authentication',
                                                                                                                                                        description: 'Secure your apps with user login systems.',
                                                                                                                                                        category: COURSE_CATEGORIES.EXTENSIONS,
                                                                                                                                                        icon: '🔐',
                                                                                                                                                        color: '#6366F1',
                                                                                                                                                        language: 'javascript',
                                                                                                                                                        prerequisites: ['javascript', 'apis'],
                                                                                                                                                        estimatedHours: 8,
                                                                                                                                                        lessons: [
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-1',
                                                                                                                                                                title: 'What is Authentication?',
                                                                                                                                                                description: 'Verifying user identity',
                                                                                                                                                                stage: 1,
                                                                                                                                                                content: `
# What is Authentication?

Authentication = Proving who you are

## Methods:
- Username/Password
- OAuth (Login with Google/GitHub)
- Magic links (email)
- Biometrics (fingerprint/face)

## Authentication vs Authorization:
- Authentication: Who are you?
- Authorization: What can you do?
                `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'What is the difference between authentication and authorization?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['They are the same', 'Auth = who, Author = what', 'Auth = what, Author = who', 'Neither relates to security'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-2',
                                                                                                                                                                title: 'OAuth Basics',
                                                                                                                                                                description: 'Login with third parties',
                                                                                                                                                                stage: 2,
                                                                                                                                                                content: `
# OAuth Basics

OAuth lets users login with existing accounts.

## Flow:
1. User clicks "Login with Google"
2. Redirected to Google
3. User approves
4. Google sends token back
5. Your app verifies token

## Benefits:
- No password to store
- Users trust Google/GitHub
- Less friction for users
                `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'What does OAuth let users do?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['Create new passwords', 'Login with existing accounts', 'Delete accounts', 'Encrypt files'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-3',
                                                                                                                                                                title: 'Password Security',
                                                                                                                                                                description: 'Hashing and salting',
                                                                                                                                                                stage: 2,
                                                                                                                                                                content: `
# Password Security

Never store plain text passwords!

## Hashing:
\`\`\`javascript
// One-way transformation
"password123" → "5f4dcc3b5aa765d61d8..."

// Can't reverse it!
\`\`\`

## Salting:
\`\`\`javascript
// Add random data before hashing
salt + password → hash

// Same password = different hash
"alice" + "password" → "abc..."
"bob" + "password" → "xyz..."
\`\`\`

## bcrypt (recommended):
\`\`\`javascript
import bcrypt from 'bcrypt';

// Hash password
const hash = await bcrypt.hash(password, 10);

// Verify password
const match = await bcrypt.compare(password, hash);
\`\`\`
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'What prevents rainbow table attacks?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['Encryption', 'Salting', 'Compression', 'Encoding'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-4',
                                                                                                                                                                title: 'Sessions',
                                                                                                                                                                description: 'Stateful authentication',
                                                                                                                                                                stage: 3,
                                                                                                                                                                content: `
# Sessions

Server remembers who you are!

## How It Works:
1. User logs in
2. Server creates session
3. Session ID sent in cookie
4. Client sends cookie with each request
5. Server looks up session

## Session Storage:
\`\`\`javascript
// In memory (not for production)
const sessions = {};

// Redis (recommended)
const session = await redis.get(sessionId);

// Database
const session = await db.sessions.findOne({ id: sessionId });
\`\`\`

## Session Data:
\`\`\`javascript
session = {
    userId: 123,
    createdAt: Date.now(),
    expiresAt: Date.now() + 86400000
}
\`\`\`

## Logout:
\`\`\`javascript
delete sessions[sessionId];
// Clear cookie too
\`\`\`
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'Where is session ID typically stored?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['URL', 'Cookie', 'Header', 'Body'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-5',
                                                                                                                                                                title: 'JWT Tokens',
                                                                                                                                                                description: 'Stateless authentication',
                                                                                                                                                                stage: 3,
                                                                                                                                                                content: `
# JWT Tokens

JSON Web Tokens - stateless auth!

## Structure:
\`\`\`
header.payload.signature
eyJhbGciOiJI...
\`\`\`

## Parts:
\`\`\`javascript
// Header
{ "alg": "HS256", "typ": "JWT" }

// Payload
{ "userId": 123, "exp": 1735689600 }

// Signature
HMACSHA256(header + payload, secret)
\`\`\`

## Creating JWT:
\`\`\`javascript
import jwt from 'jsonwebtoken';

const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
);
\`\`\`

## Verifying:
\`\`\`javascript
const decoded = jwt.verify(token, process.env.JWT_SECRET);
console.log(decoded.userId);
\`\`\`
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'How many parts does a JWT have?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['1', '2', '3', '4'],
                                                                                                                                                                    answer: 2
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-6',
                                                                                                                                                                title: 'JWT vs Sessions',
                                                                                                                                                                description: 'Choosing the right approach',
                                                                                                                                                                stage: 3,
                                                                                                                                                                content: `
# JWT vs Sessions

## Sessions:
✅ Can revoke instantly
✅ Smaller payload
✅ Server controls data
❌ Needs server storage
❌ Harder to scale

## JWT:
✅ Stateless (scalable)
✅ Works across services
✅ No server storage
❌ Can't revoke until expiry
❌ Larger payload

## When to Use:

**Sessions:**
- Single server apps
- Need instant logout
- Sensitive applications

**JWT:**
- Microservices
- Mobile apps
- APIs
- Distributed systems

## Hybrid Approach:
Short-lived JWT + Refresh tokens
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'Which is easier to scale?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['Sessions', 'JWT', 'Both equal', 'Neither'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-7',
                                                                                                                                                                title: 'Refresh Tokens',
                                                                                                                                                                description: 'Secure token renewal',
                                                                                                                                                                stage: 4,
                                                                                                                                                                content: `
# Refresh Tokens

Keep users logged in securely!

## The Problem:
- Long-lived tokens = security risk
- Short-lived tokens = bad UX

## Solution: Two Tokens
\`\`\`javascript
// Access Token: 15 minutes
const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' });

// Refresh Token: 7 days
const refreshToken = generateSecureToken();
await saveRefreshToken(userId, refreshToken);
\`\`\`

## Refresh Flow:
\`\`\`javascript
app.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;
    
    // Verify refresh token
    const saved = await getRefreshToken(refreshToken);
    if (!saved) return res.status(401).json({ error: 'Invalid' });
    
    // Issue new access token
    const newAccessToken = jwt.sign(
        { userId: saved.userId },
        secret,
        { expiresIn: '15m' }
    );
    
    res.json({ accessToken: newAccessToken });
});
\`\`\`
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'Which token lasts longer?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['Access token', 'Refresh token', 'Both same', 'Neither'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-8',
                                                                                                                                                                title: 'Middleware Protection',
                                                                                                                                                                description: 'Protecting routes',
                                                                                                                                                                stage: 4,
                                                                                                                                                                content: `
# Middleware Protection

Protect routes with middleware!

## Express Middleware:
\`\`\`javascript
const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'No token' });
    }
    
    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
\`\`\`

## Using Middleware:
\`\`\`javascript
// Single route
app.get('/profile', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

// All routes
app.use('/api', authMiddleware);
\`\`\`

## Role-Based:
\`\`\`javascript
const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' });
    }
    next();
};
\`\`\`
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'What status code for "no permission"?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['401', '403', '404', '500'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                id: 'auth-9',
                                                                                                                                                                title: 'Security Best Practices',
                                                                                                                                                                description: 'Protecting your auth system',
                                                                                                                                                                stage: 4,
                                                                                                                                                                content: `
# Security Best Practices

## Rate Limiting:
\`\`\`javascript
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5 // 5 attempts
});

app.post('/login', loginLimiter, login);
\`\`\`

## HTTPS Only:
\`\`\`javascript
app.use((req, res, next) => {
    if (!req.secure) {
        return res.redirect('https://' + req.headers.host + req.url);
    }
    next();
});
\`\`\`

## Secure Cookies:
\`\`\`javascript
res.cookie('token', token, {
    httpOnly: true,    // No JS access
    secure: true,      // HTTPS only
    sameSite: 'strict' // CSRF protection
});
\`\`\`

## More Tips:
- Use strong secrets
- Validate all input
- Log auth events
- Use 2FA for sensitive apps

Congratulations! You've learned Authentication! 🎉
    `,
                                                                                                                                                                exercise: {
                                                                                                                                                                    prompt: 'What cookie flag prevents JavaScript access?',
                                                                                                                                                                    type: 'multiple-choice',
                                                                                                                                                                    options: ['secure', 'httpOnly', 'sameSite', 'noScript'],
                                                                                                                                                                    answer: 1
                                                                                                                                                                }
                                                                                                                                                            }

// Get all courses
export const getAllCourses = () => Object.values(courses);

                                                                                                                                                        // Get course by ID
                                                                                                                                                        export const getCourse = (courseId) => courses[courseId];

                                                                                                                                                        // Get lessons for a course
                                                                                                                                                        export const getLessons = (courseId) => {
                                                                                                                                                            const course = courses[courseId];
                                                                                                                                                            return course ? course.lessons : [];
                                                                                                                                                        };

                                                                                                                                                        // Get a specific lesson
                                                                                                                                                        export const getLesson = (courseId, lessonId) => {
                                                                                                                                                            const course = courses[courseId];
                                                                                                                                                            if (!course) return null;
                                                                                                                                                            return course.lessons.find(l => l.id === lessonId);
                                                                                                                                                        };

                                                                                                                                                        // Get next lesson in course
                                                                                                                                                        export const getNextLesson = (courseId, currentLessonId) => {
                                                                                                                                                            const lessons = getLessons(courseId);
                                                                                                                                                            const currentIndex = lessons.findIndex(l => l.id === currentLessonId);
                                                                                                                                                            if (currentIndex === -1 || currentIndex === lessons.length - 1) return null;
                                                                                                                                                            return lessons[currentIndex + 1];
                                                                                                                                                        };

                                                                                                                                                        // Get courses by category
                                                                                                                                                        export const getCoursesByCategory = (category) => {
                                                                                                                                                            return getAllCourses().filter(c => c.category === category);
                                                                                                                                                        };

                                                                                                                                                        // Check if course is completed
                                                                                                                                                        export const isCourseCompleted = (courseId, completedLessons) => {
                                                                                                                                                            const lessons = getLessons(courseId);
                                                                                                                                                            return lessons.every(l => completedLessons.includes(l.id));
                                                                                                                                                        };

                                                                                                                                                        export default courses;
