// Course and Lesson Definitions
// This defines all available courses and their lessons

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
                exercise: {
                    prompt: 'What are the two possible values in logic?',
                    type: 'multiple-choice',
                    options: ['True and False', 'Yes and Maybe', 'On and Off', 'All of the above except B'],
                    answer: 0
                }
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
                exercise: {
                    prompt: 'Is 7 greater than 10?',
                    type: 'multiple-choice',
                    options: ['true value', 'false value'],
                    answer: 1
                }
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
                exercise: {
                    prompt: 'Write: 5 is less than 10',
                    type: 'code',
                    expectedOutput: '5 is less than 10',
                    hint: 'Use the exact phrase: is less than'
                }
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
                exercise: {
                    prompt: 'If A is true and B is false, what is "A and B"?',
                    type: 'multiple-choice',
                    options: ['true value', 'false value'],
                    answer: 1
                }
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
                exercise: {
                    prompt: 'Write an if statement that checks if x is equal to 5, then displays "Found it!"',
                    type: 'code',
                    expectedOutput: 'if x is equal to 5 then\n    display "Found it!"\nend if',
                    hint: 'Remember: if, then, display, end if'
                }
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
                exercise: {
                    prompt: 'Create a variable called "age" and set it to 25',
                    type: 'code',
                    expectedOutput: 'create variable age to 25',
                    hint: 'Use: create variable <name> to <value>'
                }
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
                exercise: {
                    prompt: 'Write a loop that repeats 3 times and displays "Hi"',
                    type: 'code',
                    expectedOutput: 'repeat 3 times\n    display "Hi"\nend loop',
                    hint: 'Use: repeat <number> times ... end loop'
                }
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
                exercise: {
                    prompt: 'Define a function called "shout" with no parameters that displays "WOW!"',
                    type: 'code',
                    expectedOutput: 'define function shout with no parameters\n    display "WOW!"\nend function',
                    hint: 'Use: define function <name> with no parameters'
                }
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
                exercise: {
                    prompt: 'Create a list called "colors" with "red", "blue", "green"',
                    type: 'code',
                    expectedOutput: 'create variable colors to create list with "red", "blue", "green" end list',
                    hint: 'Use: create list with ... end list'
                }
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
                exercise: {
                    prompt: 'What will this code display if numbers is [3, 7, 2]?',
                    type: 'multiple-choice',
                    options: ['3', '7', '2', '12'],
                    answer: 1
                }
            }
        ]
    },

    // Python Course
    'python': {
        id: 'python',
        name: 'Python',
        description: 'Learn Python from natural language to real code. Perfect for beginners.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🐍',
        color: '#3776ab',
        language: 'python',
        prerequisites: ['intro-logic'],
        estimatedHours: 10,
        lessons: [
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
display "Hello, World!" end display
\`\`\`

When you run this, it shows: Hello, World!

## How It Works:
- \`display\` tells Python to show something
- The text in quotes is what gets shown
- \`end display\` closes the display command

Try it yourself!
        `,
                exercise: {
                    prompt: 'Display the message "I am learning Python!"',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'display "I am learning Python!" end display',
                    expectedOutput: 'I am learning Python!',
                    hint: 'Use display "your message" end display'
                }
            },
            {
                id: 'py-2',
                title: 'Variables in Python',
                description: 'Storing data in variables',
                stage: 1,
                content: `
# Variables in Python

Variables store data that you can use later.

## Creating Variables:
\`\`\`
create variable name to "Alice"
create variable age to 25
create variable height to 5.6
\`\`\`

## Displaying Variables:
\`\`\`
display name end display
display age end display
\`\`\`

## Combining Text and Variables:
\`\`\`
display "Hello, " plus name end display
\`\`\`

Output: Hello, Alice
        `,
                exercise: {
                    prompt: 'Create a variable "city" set to "New York" and display it',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'create variable city to "New York"\ndisplay city end display',
                    expectedOutput: 'New York',
                    hint: 'First create the variable, then display it'
                }
            },
            {
                id: 'py-3',
                title: 'Math Operations',
                description: 'Performing calculations',
                stage: 1,
                content: `
# Math Operations

Python can do math!

## Basic Operations:
\`\`\`
create variable a to 10
create variable b to 3

display a plus b end display
display a minus b end display
display a times b end display  
display a divided by b end display
display a modulo b end display
\`\`\`

## Results:
- 10 plus 3 = 13
- 10 minus 3 = 7
- 10 times 3 = 30
- 10 divided by 3 = 3.333...
- 10 modulo 3 = 1 (remainder)
        `,
                exercise: {
                    prompt: 'Calculate 15 times 4 and display the result',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'display 15 times 4 end display',
                    expectedOutput: '60',
                    hint: 'Use: display <calculation> end display'
                }
            },
            {
                id: 'py-4',
                title: 'Making Decisions',
                description: 'Using if statements',
                stage: 1,
                content: `
# Making Decisions with If

Use conditions to make your program choose what to do.

## Basic If:
\`\`\`
create variable temperature to 35

if temperature is greater than 30 then
    display "It's hot!" end display
end if
\`\`\`

## If with Otherwise:
\`\`\`
create variable age to 16

if age is greater than or equal to 18 then
    display "You can vote!" end display
otherwise
    display "Too young to vote." end display
end if
\`\`\`
        `,
                exercise: {
                    prompt: 'Write code that displays "Big!" if x is greater than 100. Set x to 150.',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'create variable x to 150\nif x is greater than 100 then\n    display "Big!" end display\nend if',
                    expectedOutput: 'Big!',
                    hint: 'Create x, then use if with is greater than'
                }
            },
            {
                id: 'py-5',
                title: 'Loops',
                description: 'Repeating code',
                stage: 1,
                content: `
# Loops in Python

Repeat code without writing it multiple times.

## Repeat N Times:
\`\`\`
repeat 5 times
    display "Hello!" end display
end loop
\`\`\`

## While Loop:
\`\`\`
create variable count to 0
repeat while count is less than 3 do
    display count end display
    set count to count plus 1
end repeat
\`\`\`

Output: 0, 1, 2
        `,
                exercise: {
                    prompt: 'Write a loop that displays "Python!" 3 times',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'repeat 3 times\n    display "Python!" end display\nend loop',
                    expectedOutput: 'Python!\nPython!\nPython!',
                    hint: 'Use: repeat <number> times'
                }
            },
            // Stage 2 lessons - introducing symbols
            {
                id: 'py-6',
                title: 'Introducing Symbols: Operators',
                description: 'Transitioning to real Python operators',
                stage: 2,
                content: `
# Time for Real Symbols!

Now let's start using actual Python operators.

## Comparison Operators:
| Natural | Symbol |
|---------|--------|
| is less than | < |
| is greater than | > |
| is equal to | == |
| is not equal to | != |

## Example - Before:
\`\`\`
if x is greater than 5 then
\`\`\`

## After:
\`\`\`
if x > 5 then
\`\`\`

The logic is the same, just shorter!
        `,
                exercise: {
                    prompt: 'Rewrite: if score is greater than 100 then → using the > symbol',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'if score > 100 then',
                    hint: 'Replace "is greater than" with >'
                }
            },
            {
                id: 'py-7',
                title: 'Math Symbols',
                description: 'Using +, -, *, / operators',
                stage: 2,
                content: `
# Math Operators

Now let's use math symbols:

| Natural | Symbol |
|---------|--------|
| plus | + |
| minus | - |
| times | * |
| divided by | / |
| modulo | % |

## Before:
\`\`\`
create variable total to price times quantity
\`\`\`

## After:
\`\`\`
create variable total to price * quantity
\`\`\`

Much cleaner!
        `,
                exercise: {
                    prompt: 'Calculate: 25 * 4 + 10 and display it',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'display 25 * 4 + 10 end display',
                    expectedOutput: '110',
                    hint: 'Use * for times and + for plus'
                }
            },
            // Stage 3 - More code-like
            {
                id: 'py-8',
                title: 'Real Python Syntax',
                description: 'Using actual Python keywords',
                stage: 3,
                content: `
# Real Python Syntax

Now let's write actual Python!

## Changes:
| Natural | Python |
|---------|--------|
| display ... end display | print(...) |
| create variable x to | x = |
| if ... then | if ...: |
| end if | (indentation) |
| otherwise | else: |

## Full Example:
\`\`\`python
x = 10
if x > 5:
    print("Big number!")
else:
    print("Small number")
\`\`\`

Notice: Python uses **indentation** instead of "end if"!
        `,
                exercise: {
                    prompt: 'Write real Python: create variable greeting as "Hi", then print it',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'greeting = "Hi"\nprint(greeting)',
                    expectedOutput: 'Hi',
                    hint: 'Use = for assignment and print() for display'
                }
            },
            {
                id: 'py-9',
                title: 'Python Functions',
                description: 'Creating functions with def',
                stage: 3,
                content: `
# Python Functions

Functions in real Python use \`def\`:

## Natural Language:
\`\`\`
define function greet with parameters name
    display "Hello, " plus name end display
end function
\`\`\`

## Real Python:
\`\`\`python
def greet(name):
    print("Hello, " + name)
\`\`\`

## Calling the Function:
\`\`\`python
greet("Alice")
\`\`\`
Output: Hello, Alice
        `,
                exercise: {
                    prompt: 'Write a Python function called "square" that takes "n" and returns n * n',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'def square(n):\n    return n * n',
                    hint: 'Use def, then return'
                }
            },
            {
                id: 'py-10',
                title: 'Python Lists',
                description: 'Working with lists in Python',
                stage: 3,
                content: `
# Python Lists

Lists in Python use square brackets:

## Creating a List:
\`\`\`python
fruits = ["apple", "banana", "orange"]
numbers = [1, 2, 3, 4, 5]
\`\`\`

## Accessing Items:
\`\`\`python
print(fruits[0])  # apple
print(fruits[1])  # banana
\`\`\`

## Looping:
\`\`\`python
for fruit in fruits:
    print(fruit)
\`\`\`
        `,
                exercise: {
                    prompt: 'Create a list of colors ["red", "green", "blue"] and print the first one',
                    type: 'code',
                    language: 'python',
                    expectedNatural: 'colors = ["red", "green", "blue"]\nprint(colors[0])',
                    expectedOutput: 'red',
                    hint: 'Use [] for lists, [0] for first item'
                }
            },
            // Stage 4 - Full Python
            {
                id: 'py-11',
                title: 'Complete Python: Putting It Together',
                description: 'Writing full Python programs',
                stage: 4,
                content: `
# You're Writing Real Python!

You now know enough to write complete Python programs.

## Complete Example:
\`\`\`python
def find_max(numbers):
    if len(numbers) == 0:
        return None
    
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num

scores = [85, 92, 78, 96, 88]
highest = find_max(scores)
print(f"The highest score is: {highest}")
\`\`\`

Output: The highest score is: 96

## New Concepts:
- \`len()\` - get length
- \`f"...{var}..."\` - formatted strings
        `,
                exercise: {
                    prompt: 'Write a function that takes a list and returns the sum of all numbers',
                    type: 'code',
                    language: 'python',
                    hint: 'Use a for loop and keep adding to a total variable'
                }
            }
        ]
    },

    // JavaScript Course
    'javascript': {
        id: 'javascript',
        name: 'JavaScript',
        description: 'Learn JavaScript, the language of the web. From natural language to real code.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🟨',
        color: '#f7df1e',
        language: 'javascript',
        prerequisites: ['intro-logic'],
        estimatedHours: 12,
        lessons: [
            {
                id: 'js-1',
                title: 'Hello JavaScript!',
                description: 'Your first JavaScript program',
                stage: 1,
                content: `
# Hello JavaScript!

JavaScript is the language of the web. Every website uses it!

## Displaying Messages:
\`\`\`
display "Hello, World!" end display
\`\`\`

In JavaScript, this will show in the console.

## Try it:
Display your name!
        `,
                exercise: {
                    prompt: 'Display "Welcome to JavaScript!"',
                    type: 'code',
                    language: 'javascript',
                    expectedNatural: 'display "Welcome to JavaScript!" end display',
                    expectedOutput: 'Welcome to JavaScript!',
                    hint: 'Use: display "message" end display'
                }
            },
            {
                id: 'js-2',
                title: 'Variables in JavaScript',
                description: 'Storing data with let and const',
                stage: 1,
                content: `
# Variables in JavaScript

JavaScript has two main ways to create variables:

## Changeable Variables:
\`\`\`
create variable score to 0
set score to 100
\`\`\`

## Unchangeable Constants:
\`\`\`
create constant PI to 3.14159
\`\`\`

Constants cannot be changed after creation!

## Data Types:
- Text (strings): "Hello"
- Numbers: 42, 3.14
- Boolean: true value, false value
- Nothing: nothing (null)
        `,
                exercise: {
                    prompt: 'Create a variable "playerName" set to "Hero" and display it',
                    type: 'code',
                    language: 'javascript',
                    expectedNatural: 'create variable playerName to "Hero"\ndisplay playerName end display',
                    expectedOutput: 'Hero',
                    hint: 'Use create variable and display'
                }
            },
            {
                id: 'js-3',
                title: 'Conditions in JavaScript',
                description: 'Making decisions with if',
                stage: 1,
                content: `
# Conditions in JavaScript

## Basic If:
\`\`\`
create variable age to 20

if age is greater than or equal to 18 then
    display "Adult" end display
end if
\`\`\`

## If-Otherwise:
\`\`\`
if score is greater than 50 then
    display "Pass!" end display
otherwise
    display "Fail" end display
end if
\`\`\`

## Multiple Conditions:
\`\`\`
if grade is greater than or equal to 90 then
    display "A" end display
otherwise if grade is greater than or equal to 80 then
    display "B" end display
otherwise
    display "C or below" end display
end if
\`\`\`
        `,
                exercise: {
                    prompt: 'Write code that displays "Cold" if temperature is less than 10',
                    type: 'code',
                    language: 'javascript',
                    hint: 'Use: if temperature is less than 10 then'
                }
            },
            // More JavaScript lessons would follow...
            {
                id: 'js-4',
                title: 'JavaScript Loops',
                description: 'Repeating actions',
                stage: 1,
                content: `
# Loops in JavaScript

## Repeat N Times:
\`\`\`
repeat 5 times
    display "Loop!" end display
end loop
\`\`\`

## While Loop:
\`\`\`
create variable i to 0
repeat while i is less than 5 do
    display i end display
    set i to i plus 1
end repeat
\`\`\`
        `,
                exercise: {
                    prompt: 'Write a loop that displays numbers 0 to 2',
                    type: 'code',
                    language: 'javascript',
                    hint: 'Use a while loop with a counter variable'
                }
            },
            {
                id: 'js-5',
                title: 'JavaScript Functions',
                description: 'Creating reusable code blocks',
                stage: 1,
                content: `
# Functions in JavaScript

## Defining Functions:
\`\`\`
define function sayHello with no parameters
    display "Hello!" end display
end function

define function greet with parameters name
    display "Hello, " plus name end display
end function
\`\`\`

## Calling Functions:
\`\`\`
sayHello
greet "World"
\`\`\`
        `,
                exercise: {
                    prompt: 'Create a function "double" that takes a number and returns it times 2',
                    type: 'code',
                    language: 'javascript',
                    hint: 'Use define function with parameters and return'
                }
            },
            // Stage 2 - Introducing symbols
            {
                id: 'js-6',
                title: 'JavaScript Operators',
                description: 'Using real JavaScript symbols',
                stage: 2,
                content: `
# JavaScript Operators

Time to use real symbols!

## Comparison:
| Natural | JavaScript |
|---------|------------|
| is less than | < |
| is greater than | > |
| is equal to | === |
| is not equal to | !== |

## Math:
| Natural | JavaScript |
|---------|------------|
| plus | + |
| minus | - |
| times | * |
| divided by | / |

## Assignment:
| Natural | JavaScript |
|---------|------------|
| equals | = |
        `,
                exercise: {
                    prompt: 'Rewrite: if x is greater than 10 then → using >',
                    type: 'code',
                    language: 'javascript',
                    expectedNatural: 'if x > 10 then',
                    hint: 'Replace is greater than with >'
                }
            }
        ]
    },

    // HTML Course
    'html': {
        id: 'html',
        name: 'HTML',
        description: 'Learn HTML, the structure of every web page.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '📄',
        color: '#e34c26',
        language: 'html',
        prerequisites: [],
        estimatedHours: 6,
        lessons: [
            {
                id: 'html-1',
                title: 'Your First Web Page',
                description: 'Understanding HTML structure',
                stage: 1,
                content: `
# Your First Web Page

HTML creates the structure of web pages.

## Basic Document:
\`\`\`
begin document
    begin head section
        page title is My First Page end title
    end head section
    begin body section
        heading level 1 Hello, World! end heading 1
        paragraph This is my first web page! end paragraph
    end body section
end document
\`\`\`

## Key Parts:
- **Document**: The whole page
- **Head**: Information about the page (title, etc.)
- **Body**: What visitors see
        `,
                exercise: {
                    prompt: 'Create a heading level 1 that says "Welcome!"',
                    type: 'code',
                    language: 'html',
                    expectedNatural: 'heading level 1 Welcome! end heading 1',
                    hint: 'Use: heading level 1 ... end heading 1'
                }
            },
            {
                id: 'html-2',
                title: 'Paragraphs and Text',
                description: 'Adding text content',
                stage: 1,
                content: `
# Paragraphs and Text

## Paragraphs:
\`\`\`
paragraph This is a paragraph of text. end paragraph
paragraph This is another paragraph. end paragraph
\`\`\`

## Line Breaks:
\`\`\`
paragraph First line line break Second line end paragraph
\`\`\`

## Horizontal Lines:
\`\`\`
horizontal line
\`\`\`
        `,
                exercise: {
                    prompt: 'Create two paragraphs: "Hello" and "World"',
                    type: 'code',
                    language: 'html',
                    hint: 'Use paragraph ... end paragraph twice'
                }
            },
            {
                id: 'html-3',
                title: 'Links and Images',
                description: 'Adding links and pictures',
                stage: 1,
                content: `
# Links and Images

## Creating Links:
\`\`\`
begin link to https://example.com with text Click Here! end link
\`\`\`

## Adding Images:
\`\`\`
image from photo.jpg with description A beautiful photo end image
\`\`\`

The description helps screen readers!
        `,
                exercise: {
                    prompt: 'Create a link to "https://google.com" with text "Search"',
                    type: 'code',
                    language: 'html',
                    hint: 'Use: begin link to URL with text TEXT end link'
                }
            },
            {
                id: 'html-4',
                title: 'Lists',
                description: 'Creating bulleted and numbered lists',
                stage: 1,
                content: `
# Lists in HTML

## Bulleted (Unordered) List:
\`\`\`
begin unordered list
    list item Apple end list item
    list item Banana end list item
    list item Orange end list item
end unordered list
\`\`\`

## Numbered (Ordered) List:
\`\`\`
begin ordered list
    list item First end list item
    list item Second end list item
    list item Third end list item
end ordered list
\`\`\`
        `,
                exercise: {
                    prompt: 'Create a bulleted list with "Red", "Green", "Blue"',
                    type: 'code',
                    language: 'html',
                    hint: 'Use begin unordered list with list item'
                }
            },
            // Real HTML
            {
                id: 'html-5',
                title: 'Real HTML Tags',
                description: 'Using actual HTML syntax',
                stage: 3,
                content: `
# Real HTML Syntax

Now let's use actual HTML!

## Tags:
| Natural | HTML |
|---------|------|
| begin document | \`<!DOCTYPE html><html>\` |
| heading level 1 | \`<h1>\` |
| paragraph | \`<p>\` |
| begin link to | \`<a href="\` |

## Example:
\`\`\`html
<h1>Welcome!</h1>
<p>This is a paragraph.</p>
<a href="https://google.com">Google</a>
\`\`\`
        `,
                exercise: {
                    prompt: 'Write real HTML: an h1 with "Hello" and a p with "World"',
                    type: 'code',
                    language: 'html',
                    expectedNatural: '<h1>Hello</h1>\n<p>World</p>',
                    hint: 'Use <h1></h1> and <p></p>'
                }
            }
        ]
    },

    // CSS Course
    'css': {
        id: 'css',
        name: 'CSS',
        description: 'Learn CSS to style and design web pages.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '🎨',
        color: '#264de4',
        language: 'css',
        prerequisites: ['html'],
        estimatedHours: 6,
        lessons: [
            {
                id: 'css-1',
                title: 'Introduction to CSS',
                description: 'What is CSS and how it works',
                stage: 1,
                content: `
# Introduction to CSS

CSS (Cascading Style Sheets) makes web pages look beautiful!

## Basic Structure:
\`\`\`
style for body starts
    background color is lightblue end property
    text color is darkblue end property
end style
\`\`\`

This styles the body element with a light blue background!

## Selectors:
- Element names: body, h1, p
- Classes: .classname
- IDs: #idname
        `,
                exercise: {
                    prompt: 'Style the h1 element with text color red',
                    type: 'code',
                    language: 'css',
                    expectedNatural: 'style for h1 starts\n    text color is red end property\nend style',
                    hint: 'Use: style for ... starts ... end style'
                }
            },
            {
                id: 'css-2',
                title: 'Colors and Backgrounds',
                description: 'Adding colors to elements',
                stage: 1,
                content: `
# Colors and Backgrounds

## Text Color:
\`\`\`
style for p starts
    text color is navy end property
end style
\`\`\`

## Background Color:
\`\`\`
style for div starts
    background color is yellow end property
end style
\`\`\`

## Color Values:
- Names: red, blue, green, purple
- Hex: #ff0000, #0000ff
- RGB: rgb(255, 0, 0)
        `,
                exercise: {
                    prompt: 'Give the body a white background and black text',
                    type: 'code',
                    language: 'css',
                    hint: 'Use background color is and text color is'
                }
            },
            {
                id: 'css-3',
                title: 'Fonts and Text',
                description: 'Styling text',
                stage: 1,
                content: `
# Fonts and Text

## Font Properties:
\`\`\`
style for body starts
    font family is Arial end property
    font size is 16 pixels end property
    font weight is bold end property
end style
\`\`\`

## Text Alignment:
\`\`\`
style for h1 starts
    text align center end property
end style
\`\`\`
        `,
                exercise: {
                    prompt: 'Style h1 with font size 24 pixels and center alignment',
                    type: 'code',
                    language: 'css',
                    hint: 'Use font size is and text align'
                }
            },
            // Real CSS
            {
                id: 'css-4',
                title: 'Real CSS Syntax',
                description: 'Using actual CSS',
                stage: 3,
                content: `
# Real CSS Syntax

Now real CSS!

## Conversion:
| Natural | CSS |
|---------|-----|
| style for X starts | X { |
| background color is | background-color: |
| text color is | color: |
| end property | ; |
| end style | } |

## Example:
\`\`\`css
body {
    background-color: #f0f0f0;
    color: #333;
    font-family: Arial, sans-serif;
}
\`\`\`
        `,
                exercise: {
                    prompt: 'Write real CSS: make h1 have color blue and font-size 32px',
                    type: 'code',
                    language: 'css',
                    expectedNatural: 'h1 {\n    color: blue;\n    font-size: 32px;\n}',
                    hint: 'Use selector { property: value; }'
                }
            }
        ]
    },

    // Java Course
    'java': {
        id: 'java',
        name: 'Java',
        description: 'Learn Java, a powerful language for applications and Android.',
        category: COURSE_CATEGORIES.LANGUAGE,
        icon: '☕',
        color: '#007396',
        language: 'java',
        prerequisites: ['intro-logic'],
        estimatedHours: 15,
        lessons: [
            {
                id: 'java-1',
                title: 'Hello Java!',
                description: 'Your first Java program',
                stage: 1,
                content: `
# Hello Java!

Java is used everywhere - from Android apps to enterprise software!

## Your First Program:
\`\`\`
display "Hello, World!" end display
\`\`\`

In Java, this shows a message!

## Important Java Facts:
- Java needs types for everything
- Every statement ends with "end statement" (;)
- Code goes inside classes
        `,
                exercise: {
                    prompt: 'Display "Learning Java!"',
                    type: 'code',
                    language: 'java',
                    expectedNatural: 'display "Learning Java!" end display',
                    expectedOutput: 'Learning Java!',
                    hint: 'Use: display "message" end display'
                }
            },
            {
                id: 'java-2',
                title: 'Variables with Types',
                description: 'Declaring typed variables',
                stage: 1,
                content: `
# Variables with Types

Java requires you to specify what TYPE of data a variable holds.

## Number Variables:
\`\`\`
create number variable age to 25 end statement
create decimal variable price to 19.99 end statement
\`\`\`

## Text Variables:
\`\`\`
create text variable name to "Alice" end statement
\`\`\`

## Boolean Variables:
\`\`\`
create boolean variable isActive to true value end statement
\`\`\`
        `,
                exercise: {
                    prompt: 'Create a number variable "score" set to 100',
                    type: 'code',
                    language: 'java',
                    expectedNatural: 'create number variable score to 100 end statement',
                    hint: 'Use: create number variable name to value end statement'
                }
            },
            {
                id: 'java-3',
                title: 'Conditions in Java',
                description: 'If statements in Java',
                stage: 1,
                content: `
# Conditions in Java

## If Statement:
\`\`\`
create number variable x to 10 end statement

if x is greater than 5 then
    display "Big number" end display
end if
\`\`\`

## If-Else:
\`\`\`
if age is greater than or equal to 18 then
    display "Adult" end display
otherwise
    display "Minor" end display
end if
\`\`\`
        `,
                exercise: {
                    prompt: 'Write an if that checks if x is equal to 5 and displays "Match!"',
                    type: 'code',
                    language: 'java',
                    hint: 'Use: if x is equal to 5 then'
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
            // More full-stack lessons would combine HTML, CSS, and JS
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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    },

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
            }
        ]
    }
};

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
