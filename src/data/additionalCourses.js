// Additional Courses - Firebase, GitHub, VS Code

export const additionalCourses = {
    'firebase': {
        id: 'firebase',
        name: 'Firebase',
        description: 'Build real-time apps with Google Firebase. Learn authentication, databases, and security rules.',
        category: 'fullstack',
        icon: '🔥',
        color: '#FFCA28',
        language: 'javascript',
        prerequisites: ['javascript'],
        estimatedHours: 1,
        lessons: [
            {
                id: 'firebase-1',
                title: 'What is Firebase?',
                description: 'Introduction to the Firebase platform',
                stage: 1,
                content: `
# What is Firebase?

Firebase is a Backend-as-a-Service (BaaS) platform by Google.

## Core Services:
- **Authentication**: User login/signup
- **Firestore**: NoSQL database
- **Storage**: File uploads
- **Hosting**: Deploy websites

## Why Firebase?
- No server to manage
- Real-time updates
- Scales automatically
- Free tier available
                `,
                exercises: [
                    {
                    prompt: 'Firebase is a Backend-as-a-Service. What does that mean?',
                    type: 'multiple-choice',
                    options: [
                        'You must build your own server',
                        'Firebase handles server infrastructure for you',
                        'You can only use it with Python',
                        'It only works offline'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'firebase-2',
                title: 'Firebase Authentication',
                description: 'Add user login to your app',
                stage: 1,
                content: `
# Firebase Authentication

Firebase Auth provides easy-to-use authentication.

## Sign-in Methods:
- Email/Password
- Google
- GitHub
- Phone number

## Basic Auth Flow:
\`\`\`
create user with email and password
sign in with email and password
sign out current user
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write the command to create a new user account.',
                    type: 'code',
                    language: 'javascript',
                    expectedOutput: 'create user with email and password',
                    hint: 'Use: create user with email and password'
                }
                ]
            },
            {
                id: 'firebase-3',
                title: 'Firestore Database',
                description: 'Store and retrieve data',
                stage: 1,
                content: `
# Firestore Database

Firestore is a NoSQL document database.

## Structure:
- **Collections**: Groups of documents
- **Documents**: Individual records
- **Fields**: Data in documents

## Basic Operations:
\`\`\`
add document to collection "users" with data name: "Alice" end add
get document "user123" from collection "users"
update document "user123" set role to "admin" end update
delete document "user123" from collection "users"
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write command to add a document to "products" with name: "Laptop".',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'add document to collection "products" with data name: "Laptop" end add',
                    hint: 'Use: add document to collection "name" with data field: value end add'
                }
                ]
            },
            {
                id: 'firebase-4',
                title: 'Why Security Rules Matter',
                description: 'Protect your database',
                stage: 2,
                content: `
# Why Security Rules Matter

Without security rules, ANYONE can read/write your data!

## The Problem:
\`\`\`
// BAD - NEVER use in production!
allow read, write: if true;  // Anyone can do anything!
\`\`\`

## What Can Go Wrong:
- Hackers can delete all your data
- Anyone can read private information
- Users can modify other users' data

## Rule Structure:
\`\`\`
match /collection/{documentId} {
  allow read: if <condition>;
  allow write: if <condition>;
}
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'What is the danger of "allow read, write: if true"?',
                    type: 'multiple-choice',
                    options: [
                        'The database runs slower',
                        'Anyone on the internet can read and modify all your data',
                        'Users cannot log in',
                        'The app will not load'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'firebase-5',
                title: 'Require Authentication',
                description: 'Your first security rule',
                stage: 2,
                content: `
# Require Authentication

The most basic rule: require users to be logged in.

## The request.auth Object:
- **request.auth**: Info about logged-in user
- **request.auth.uid**: User's unique ID
- **request.auth.token.email**: User's email

## Require Authentication:
\`\`\`
match /posts/{postId} {
  allow read, write: if request.auth != null;
}
\`\`\`

## Breaking It Down:
- \`request.auth != null\` = user is logged in
- If not logged in, request.auth is null
                `,
                exercises: [
                    {
                    prompt: 'Write a condition that checks if a user is logged in.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'request.auth != null',
                    hint: 'Check if request.auth is not null'
                }
                ]
            },
            {
                id: 'firebase-6',
                title: 'User-Specific Data Rules',
                description: 'Users access only their data',
                stage: 2,
                content: `
# User-Specific Data Rules

Users should only read/write their OWN data.

## The Pattern:
\`\`\`
match /users/{userId} {
  allow read, write: if request.auth.uid == userId;
}
\`\`\`

## How It Works:
1. \`{userId}\` captures the document ID
2. \`request.auth.uid\` is logged-in user's ID
3. They must match for access
                `,
                exercises: [
                    {
                    prompt: 'Write a rule condition allowing access only when user ID matches document userId.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'request.auth.uid == userId',
                    hint: 'Compare request.auth.uid with userId'
                }
                ]
            },
            {
                id: 'firebase-7',
                title: 'Read vs Write Permissions',
                description: 'Separate permissions',
                stage: 2,
                content: `
# Separating Read and Write

Different actions need different permissions!

## Common Pattern - Public Read, Owner Write:
\`\`\`
match /posts/{postId} {
  allow read: if true;
  allow write: if request.auth.uid == resource.data.authorId;
}
\`\`\`

## Granular Control:
\`\`\`
allow read: if true;
allow create: if request.auth != null;
allow update, delete: if request.auth.uid == resource.data.authorId;
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write rules: anyone can read, only authenticated users can write.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'allow read: if true; allow write: if request.auth != null;',
                    hint: 'Separate read and write rules'
                }
                ]
            },
            {
                id: 'firebase-8',
                title: 'Validating Data',
                description: 'Ensure data meets requirements',
                stage: 3,
                content: `
# Data Validation Rules

Prevent bad data from entering your database!

## Validation Examples:

### Required Fields:
\`\`\`
allow create: if request.resource.data.title != null;
\`\`\`

### String Length:
\`\`\`
allow create: if request.resource.data.title.size() <= 100;
\`\`\`

### Valid Values:
\`\`\`
allow write: if request.resource.data.status in ['draft', 'published'];
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write validation ensuring title is max 200 characters.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'request.resource.data.title.size() <= 200',
                    hint: 'Use .size() for string length'
                }
                ]
            },
            {
                id: 'firebase-9',
                title: 'Role-Based Access',
                description: 'Admin vs regular user permissions',
                stage: 3,
                content: `
# Role-Based Access Control

Different users have different permissions.

## Using Custom Claims:
\`\`\`
allow write: if request.auth.token.admin == true;
\`\`\`

## Common Roles:
- **viewer**: Read only
- **member**: Read + create
- **moderator**: Read + create + edit others
- **admin**: Full access
                `,
                exercises: [
                    {
                    prompt: 'Write a condition checking if user has admin claim.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'request.auth.token.admin == true',
                    hint: 'Access admin from request.auth.token'
                }
                ]
            }
        ]
    },

    'github': {
        id: 'github',
        name: 'GitHub',
        description: 'Master GitHub for collaboration, licensing, security, and open source.',
        category: 'tools',
        icon: '🐙',
        color: '#333333',
        language: null,
        prerequisites: ['git'],
        estimatedHours: 1,
        lessons: [
            {
                id: 'github-1',
                title: 'What is GitHub?',
                description: 'Understanding GitHub vs Git',
                stage: 1,
                content: `
# What is GitHub?

GitHub is a web platform for hosting Git repositories.

## Git vs GitHub:
- **Git**: Version control system (local)
- **GitHub**: Cloud hosting + collaboration (remote)

## Key Features:
- Repositories, Issues, Pull Requests
- Actions (CI/CD), Pages (hosting)
                `,
                exercises: [
                    {
                    prompt: 'What is the main difference between Git and GitHub?',
                    type: 'multiple-choice',
                    options: [
                        'They are the same thing',
                        'Git is local version control, GitHub is cloud hosting',
                        'GitHub is faster than Git',
                        'Git only works on Windows'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'github-2',
                title: 'Choosing a License',
                description: 'Protect your work properly',
                stage: 1,
                content: `
# Choosing a License

A license tells others what they can do with your code.

## No License = All Rights Reserved!

## Popular Licenses:

### MIT License (Most Popular)
- ✅ Anyone can use, modify, distribute
- ✅ Can use in commercial projects
- ⚠️ Must include license notice

### Apache 2.0
- ✅ Similar to MIT + patent protection

### GPL
- ⚠️ Derivative works MUST also be GPL
- ⚠️ "Viral" - spreads to your code

## How to Choose:
- Maximum adoption? → **MIT**
- Patent protection? → **Apache 2.0**
- Keep code open? → **GPL**
                `,
                exercises: [
                    {
                    prompt: 'Which license is best for maximum adoption with minimal restrictions?',
                    type: 'multiple-choice',
                    options: [
                        'GPL',
                        'MIT',
                        'No license',
                        'Creative Commons'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'github-3',
                title: 'Adding a License',
                description: 'Practical license implementation',
                stage: 1,
                content: `
# Adding a License

## Method 1: When Creating Repo
Select license from dropdown during creation.

## Method 2: Add LICENSE File
Create file named LICENSE with license text.

## Also Add to README:
\`\`\`markdown
## License
This project is licensed under the MIT License.
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'What should you name the license file?',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'LICENSE',
                    hint: 'All uppercase'
                }
                ]
            },
            {
                id: 'github-4',
                title: 'Writing Bug Reports',
                description: 'Report issues effectively',
                stage: 2,
                content: `
# Writing Good Bug Reports

## Essential Elements:
1. **Clear Title**: "Login button unresponsive on mobile Safari"
2. **Environment**: Browser, OS, app version
3. **Steps to Reproduce**: Numbered list
4. **Expected vs Actual**: What should happen vs what happens
5. **Screenshots**: If applicable

## Template:
\`\`\`markdown
## Bug Description
Brief description

## Steps to Reproduce
1. Go to...
2. Click...
3. See error

## Expected Behavior
What should happen

## Actual Behavior  
What actually happens

## Environment
- OS: macOS 14.0
- Browser: Safari 17.0
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write a clear bug title for: dark mode toggle sometimes works, page flickers.',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'Dark mode toggle',
                    hint: 'Be specific about component and behavior'
                }
                ]
            },
            {
                id: 'github-5',
                title: 'Security Vulnerability Reporting',
                description: 'Handle security issues responsibly',
                stage: 2,
                content: `
# Security Vulnerability Reporting

## ⚠️ NEVER Post Security Issues Publicly!
Public issues expose vulnerabilities to attackers.

## Responsible Disclosure:
1. Check for SECURITY.md
2. Use private reporting (GitHub Security tab)
3. Email security@company.com

## What to Include:
- Vulnerability type (XSS, SQL injection, etc.)
- Steps to reproduce
- Potential impact
- Suggested fix
                `,
                exercises: [
                    {
                    prompt: 'Why should you NEVER post security vulnerabilities as public issues?',
                    type: 'multiple-choice',
                    options: [
                        'It takes too long',
                        'Public issues expose the vulnerability to attackers',
                        'Security issues are not allowed',
                        'Only admins can see issues'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'github-6',
                title: 'Creating SECURITY.md',
                description: 'Set up security policy',
                stage: 2,
                content: `
# Creating a SECURITY.md

Tell users how to report security issues.

## Create: .github/SECURITY.md

\`\`\`markdown
# Security Policy

## Reporting a Vulnerability

**Do not report through public issues.**

Report via:
1. GitHub Security Advisories
2. Email: security@yourproject.com

### Response Timeline:
- Initial response: 48 hours
- Status update: 7 days
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'What folder should SECURITY.md be placed in?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: '.github',
                    hint: 'Starts with a dot'
                }
                ]
            },
            {
                id: 'github-7',
                title: 'Pull Requests',
                description: 'Propose and review changes',
                stage: 2,
                content: `
# Pull Requests

Pull requests let you propose changes.

## Workflow:
1. Create a branch
2. Make changes
3. Push the branch
4. Open a pull request
5. Get reviews
6. Merge

## Commands:
\`\`\`
git checkout -b feature/new-button
git add .
git commit -m "Add new button"
git push origin feature/new-button
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'Write command to create branch "bugfix/login-error".',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'git checkout -b bugfix/login-error',
                    hint: 'Use: git checkout -b <branch-name>'
                }
                ]
            },
            {
                id: 'github-8',
                title: 'Issue Templates',
                description: 'Standardize bug reports',
                stage: 3,
                content: `
# Issue Templates

Create: .github/ISSUE_TEMPLATE/bug_report.md

\`\`\`markdown
---
name: Bug Report
about: Report a bug
title: '[BUG] '
labels: bug
---

## Description
A clear description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'

## Expected Behavior
What should happen.
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'What folder should issue templates be in?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: '.github/ISSUE_TEMPLATE',
                    hint: 'Inside .github folder'
                }
                ]
            },
            {
                id: 'github-9',
                title: 'GitHub Actions',
                description: 'Automate your workflow',
                stage: 3,
                content: `
# GitHub Actions

Automate testing and deploying!

## Workflow: .github/workflows/ci.yml
\`\`\`yaml
name: CI
on:
  push:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm install
      - run: npm test
\`\`\`

## Key Concepts:
- **on**: When to run
- **jobs**: Parallel work units
- **steps**: Sequential tasks
                `,
                exercises: [
                    {
                    prompt: 'What keyword specifies when the workflow runs?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'on',
                    hint: 'Two-letter keyword'
                }
                ]
            },
            {
                id: 'github-10',
                title: 'Dependabot',
                description: 'Automate dependency updates',
                stage: 3,
                content: `
# Dependabot Security

Keep dependencies secure automatically!

## Create: .github/dependabot.yml
\`\`\`yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
\`\`\`

## What it Does:
- Scans for vulnerabilities
- Creates PRs to update
- Runs CI on updates
                `,
                exercises: [
                    {
                    prompt: 'What is the filename for Dependabot config?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'dependabot.yml',
                    hint: 'YAML file in .github'
                }
                ]
            }
        ]
    },

    'vscode': {
        id: 'vscode',
        name: 'VS Code Mastery',
        description: 'Master VS Code with shortcuts, debugging, extensions, and workflows.',
        category: 'tools',
        icon: '💻',
        color: '#007ACC',
        language: null,
        prerequisites: [],
        estimatedHours: 1,
        lessons: [
            {
                id: 'vscode-1',
                title: 'Getting Started',
                description: 'Set up your environment',
                stage: 1,
                content: `
# Getting Started with VS Code

VS Code is a free, powerful code editor.

## Key Features:
- IntelliSense (smart completion)
- Debugging
- Git Integration
- Extensions
- Integrated Terminal

## First Steps:
- Open folder: File → Open Folder
- New file: Ctrl/Cmd + N
- Command Palette: Ctrl/Cmd + Shift + P
- Settings: Ctrl/Cmd + ,
                `,
                exercises: [
                    {
                    prompt: 'What shortcut opens the Command Palette?',
                    type: 'multiple-choice',
                    options: ['Ctrl + P', 'Ctrl + Shift + P', 'Ctrl + O', 'Ctrl + N'],
                    answer: 1
                }
                ]
            },
            {
                id: 'vscode-2',
                title: 'Essential Shortcuts',
                description: 'Navigate like a pro',
                stage: 1,
                content: `
# Essential Keyboard Shortcuts

## File Navigation:
- Ctrl + P: Quick file open
- Ctrl + Tab: Switch files
- Ctrl + W: Close file

## Editing:
- Ctrl + D: Select next match
- Ctrl + Shift + L: Select all matches
- Alt + Up/Down: Move line
- Ctrl + /: Toggle comment

## Multi-Cursor:
- Alt + Click: Add cursor
- Ctrl + Alt + Up/Down: Add cursor above/below
                `,
                exercises: [
                    {
                    prompt: 'What shortcut selects all occurrences of selected text?',
                    type: 'multiple-choice',
                    options: ['Ctrl + D', 'Ctrl + Shift + L', 'Ctrl + A', 'Alt + Click'],
                    answer: 1
                }
                ]
            },
            {
                id: 'vscode-3',
                title: 'Essential Extensions',
                description: 'Supercharge your editor',
                stage: 1,
                content: `
# Must-Have Extensions

Install: Ctrl + Shift + X

## For Everyone:
- **Prettier**: Auto-format code
- **ESLint**: Find JS problems
- **GitLens**: Enhanced Git

## For Web Dev:
- **Live Server**: Local dev server
- **Auto Rename Tag**: Sync HTML tags

## Productivity:
- **Code Spell Checker**: Catch typos
- **Path Intellisense**: Autocomplete paths
                `,
                exercises: [
                    {
                    prompt: 'Which extension auto-formats JavaScript on save?',
                    type: 'multiple-choice',
                    options: ['ESLint', 'Prettier', 'GitLens', 'Live Server'],
                    answer: 1
                }
                ]
            },
            {
                id: 'vscode-4',
                title: 'Configuring settings.json',
                description: 'Customize VS Code',
                stage: 2,
                content: `
# Configuring settings.json

Open: Ctrl + Shift + P → "Open User Settings (JSON)"

## Essential Settings:
\`\`\`json
{
  "editor.fontSize": 14,
  "editor.formatOnSave": true,
  "editor.minimap.enabled": false,
  "files.autoSave": "onFocusChange"
}
\`\`\`

## User vs Workspace:
- **User**: All projects
- **Workspace**: Only this project (.vscode/settings.json)
                `,
                exercises: [
                    {
                    prompt: 'Write the setting to format code on save.',
                    type: 'code',
                    language: 'natural',
                    expectedOutput: 'editor.formatOnSave',
                    hint: 'Starts with editor.'
                }
                ]
            },
            {
                id: 'vscode-5',
                title: 'Integrated Terminal',
                description: 'Command line in your editor',
                stage: 2,
                content: `
# Integrated Terminal

## Open Terminal:
- Ctrl + \` (backtick)

## Features:
- Multiple terminals (+ button)
- Split terminals
- Different shells

## Shortcuts:
- Ctrl + \`: Toggle terminal
- Ctrl + Shift + \`: New terminal
                `,
                exercises: [
                    {
                    prompt: 'What shortcut toggles the terminal?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'Ctrl + `',
                    hint: 'Uses backtick key'
                }
                ]
            },
            {
                id: 'vscode-6',
                title: 'Debugging',
                description: 'Find and fix bugs',
                stage: 2,
                content: `
# Debugging in VS Code

Stop using console.log everywhere!

## Breakpoints:
Click left of line number = red dot
Code pauses here during debugging

## Debug Controls:
- ▶️ Continue: Run to next breakpoint
- ⏭️ Step Over: Execute line
- ⏬ Step Into: Go inside function
- ⏫ Step Out: Exit function
                `,
                exercises: [
                    {
                    prompt: 'How do you pause execution on line 42?',
                    type: 'multiple-choice',
                    options: [
                        'Add a comment',
                        'Add a breakpoint (click left of line number)',
                        'console.log()',
                        'Type "debugger"'
                    ],
                    answer: 1
                }
                ]
            },
            {
                id: 'vscode-7',
                title: 'Workspace Setup',
                description: 'Project-specific settings',
                stage: 3,
                content: `
# Workspace Configuration

## .vscode Folder:
\`\`\`
project/
├── .vscode/
│   ├── settings.json
│   ├── launch.json
│   ├── tasks.json
│   └── extensions.json
\`\`\`

## Recommended Extensions:
.vscode/extensions.json
\`\`\`json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
\`\`\`
                `,
                exercises: [
                    {
                    prompt: 'What file specifies recommended extensions for the team?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'extensions.json',
                    hint: 'Has "extensions" in name'
                }
                ]
            },
            {
                id: 'vscode-8',
                title: 'Tasks Automation',
                description: 'Automate repetitive tasks',
                stage: 3,
                content: `
# Tasks.json

Create: .vscode/tasks.json
\`\`\`json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build",
      "type": "npm",
      "script": "build",
      "group": { "kind": "build", "isDefault": true }
    }
  ]
}
\`\`\`

## Run Tasks:
- Ctrl + Shift + B: Run build task
                `,
                exercises: [
                    {
                    prompt: 'What shortcut runs the default build task?',
                    type: 'code',
                    language: 'natural',
                        expectedOutput: 'Ctrl + Shift + B',
                    hint: 'Ctrl + Shift + B for Build'
                }
                ]
            },
            {
                id: 'vscode-9',
                title: 'Git Integration',
                description: 'Version control in VS Code',
                stage: 3,
                content: `
# Git Integration

## Source Control: Ctrl + Shift + G

## Inline Indicators:
- 🟢 Green: Added lines
- 🔵 Blue: Modified lines
- 🔺 Red: Deleted lines

## Merge Conflict Resolution:
- Accept Current Change
- Accept Incoming Change
- Accept Both Changes
                `,
                exercises: [
                    {
                    prompt: 'What does a blue bar in the gutter indicate?',
                    type: 'multiple-choice',
                    options: [
                        'An error',
                        'A breakpoint',
                        'A modified line not yet committed',
                        'A bookmark'
                    ],
                    answer: 2
                }
                ]
            }
        ]
    },

    // Algorithms & Data Structures Course
    'algorithms': {
        id: 'algorithms',
        name: 'Algorithms & Data Structures',
        description: 'Master the fundamentals of algorithms and data structures - essential for coding interviews and efficient programming.',
        category: 'fundamentals',
        icon: '🧮',
        color: '#10b981',
        language: 'python',
        prerequisites: ['python'],
        estimatedHours: 2,
        lessons: [
            {
                id: 'algo-1',
                title: 'What are Algorithms?',
                description: 'Understanding algorithms and why they matter',
                stage: 1,
                content: `
# What are Algorithms?

An algorithm is a step-by-step procedure to solve a problem.

## Real-Life Examples:
- **Recipe**: Steps to bake a cake
- **GPS Navigation**: Find the shortest route
- **Sorting Mail**: Organize by zip code

## Why Study Algorithms?
- Write **faster** code
- Use **less memory**
- Solve **complex problems**
- Ace **coding interviews**

## Algorithm Properties:
1. **Input**: What goes in
2. **Output**: What comes out
3. **Definiteness**: Clear steps
4. **Finiteness**: Must end
5. **Effectiveness**: Each step works

## Example: Finding the Maximum
\\\`\\\`\\\`python
def find_max(numbers):
    if not numbers:
        return None
    maximum = numbers[0]
    for num in numbers:
        if num > maximum:
            maximum = num
    return maximum

print(find_max([3, 7, 2, 9, 1]))  # 9
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is an algorithm?',
                        type: 'multiple-choice',
                        options: ['A programming language', 'A step-by-step procedure to solve a problem', 'A type of data structure', 'A computer program'],
                        answer: 1
                    },
                    {
                        prompt: 'Which is NOT a property of algorithms?',
                        type: 'multiple-choice',
                        options: ['Finiteness', 'Randomness', 'Definiteness', 'Effectiveness'],
                        answer: 1
                    },
                    {
                        prompt: 'Why study algorithms?',
                        type: 'multiple-choice',
                        options: ['To write slower code', 'To use more memory', 'To solve complex problems efficiently', 'To avoid coding interviews'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-2',
                title: 'Big O Notation',
                description: 'Measuring algorithm efficiency',
                stage: 1,
                content: `
# Big O Notation

Big O describes how algorithm performance scales with input size.

## Common Complexities (Best to Worst):

| Big O | Name | Example |
|-------|------|---------|
| O(1) | Constant | Array access |
| O(log n) | Logarithmic | Binary search |
| O(n) | Linear | Loop through array |
| O(n log n) | Linearithmic | Merge sort |
| O(n²) | Quadratic | Nested loops |
| O(2ⁿ) | Exponential | Recursive fibonacci |

## Examples:
\\\`\\\`\\\`python
# O(1) - Constant
def get_first(arr):
    return arr[0]

# O(n) - Linear
def find_item(arr, target):
    for item in arr:
        if item == target:
            return True
    return False

# O(n²) - Quadratic
def find_pairs(arr):
    for i in arr:
        for j in arr:
            print(i, j)
\\\`\\\`\\\`

## Rules:
1. Drop constants: O(2n) → O(n)
2. Drop lower terms: O(n² + n) → O(n²)
3. Consider worst case
        `,
                exercises: [
                    {
                        prompt: 'What is O(1) called?',
                        type: 'multiple-choice',
                        options: ['Linear time', 'Constant time', 'Logarithmic time', 'Quadratic time'],
                        answer: 1
                    },
                    {
                        prompt: 'A nested loop over the same array is typically:',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                        answer: 2
                    },
                    {
                        prompt: 'Binary search has complexity:',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-3',
                title: 'Arrays and Lists',
                description: 'The most fundamental data structure',
                stage: 2,
                content: `
# Arrays and Lists

Arrays store elements in contiguous memory locations.

## Python Lists:
\\\`\\\`\\\`python
# Creation
nums = [1, 2, 3, 4, 5]
empty = []
sized = [0] * 10  # [0, 0, 0, ...]

# Operations and Complexity
nums[0]           # O(1) - Access by index
nums.append(6)    # O(1) - Add to end
nums.pop()        # O(1) - Remove from end
nums.insert(0, 0) # O(n) - Insert at position
nums.pop(0)       # O(n) - Remove from start
len(nums)         # O(1) - Get length
5 in nums         # O(n) - Search
\\\`\\\`\\\`

## Two-Pointer Technique:
\\\`\\\`\\\`python
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr

print(reverse_array([1, 2, 3, 4, 5]))  # [5, 4, 3, 2, 1]
\\\`\\\`\\\`

## Sliding Window:
\\\`\\\`\\\`python
def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    for i in range(k, len(arr)):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)
    
    return max_sum
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is the time complexity of array access by index?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
                        answer: 2
                    },
                    {
                        prompt: 'What is the time complexity of inserting at the beginning of a list?',
                        type: 'multiple-choice',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                        answer: 2
                    },
                    {
                        prompt: 'The two-pointer technique is useful for:',
                        type: 'multiple-choice',
                        options: ['Sorting', 'Reversing arrays and finding pairs', 'Searching', 'Hashing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-4',
                title: 'Linked Lists',
                description: 'Dynamic data structure with nodes',
                stage: 2,
                content: `
# Linked Lists

Nodes connected by pointers - no contiguous memory needed.

## Node Structure:
\\\`\\\`\\\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
\\\`\\\`\\\`

## Singly Linked List:
\\\`\\\`\\\`python
class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, val):
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
            return
        current = self.head
        while current.next:
            current = current.next
        current.next = new_node
    
    def prepend(self, val):
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
    
    def delete(self, val):
        if not self.head:
            return
        if self.head.val == val:
            self.head = self.head.next
            return
        current = self.head
        while current.next:
            if current.next.val == val:
                current.next = current.next.next
                return
            current = current.next
\\\`\\\`\\\`

## Arrays vs Linked Lists:
| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access | O(1) | O(n) |
| Insert at start | O(n) | O(1) |
| Insert at end | O(1) | O(n) or O(1) |
| Delete | O(n) | O(1) if node known |
        `,
                exercises: [
                    {
                        prompt: 'What is the time complexity to access the nth element in a linked list?',
                        type: 'multiple-choice',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                        answer: 2
                    },
                    {
                        prompt: 'What is the advantage of linked lists over arrays?',
                        type: 'multiple-choice',
                        options: ['Faster random access', 'O(1) insertion at beginning', 'Less memory usage', 'Simpler implementation'],
                        answer: 1
                    },
                    {
                        prompt: 'A node in a singly linked list contains:',
                        type: 'multiple-choice',
                        options: ['Value only', 'Value and pointer to next', 'Value and pointer to previous', 'Value and two pointers'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-5',
                title: 'Stacks',
                description: 'Last In, First Out (LIFO)',
                stage: 2,
                content: `
# Stacks - LIFO

Last In, First Out - like a stack of plates.

## Stack Operations:
\\\`\\\`\\\`python
class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, item):      # O(1)
        self.items.append(item)
    
    def pop(self):             # O(1)
        if not self.is_empty():
            return self.items.pop()
        return None
    
    def peek(self):            # O(1)
        if not self.is_empty():
            return self.items[-1]
        return None
    
    def is_empty(self):        # O(1)
        return len(self.items) == 0
    
    def size(self):            # O(1)
        return len(self.items)
\\\`\\\`\\\`

## Common Use Cases:
1. **Undo/Redo** functionality
2. **Browser history** (back button)
3. **Function call stack**
4. **Balanced parentheses**

## Example: Valid Parentheses
\\\`\\\`\\\`python
def is_valid_parentheses(s):
    stack = []
    mapping = {')': '(', '}': '{', ']': '['}
    
    for char in s:
        if char in mapping:
            if not stack or stack.pop() != mapping[char]:
                return False
        else:
            stack.append(char)
    
    return len(stack) == 0

print(is_valid_parentheses("([])"))  # True
print(is_valid_parentheses("([)]"))  # False
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What does LIFO stand for?',
                        type: 'multiple-choice',
                        options: ['Last In First Out', 'Last In First Over', 'List In First Out', 'Loop In First Out'],
                        answer: 0
                    },
                    {
                        prompt: 'What operation adds an item to a stack?',
                        type: 'multiple-choice',
                        options: ['add', 'insert', 'push', 'enqueue'],
                        answer: 2
                    },
                    {
                        prompt: 'Stacks are commonly used for:',
                        type: 'multiple-choice',
                        options: ['FIFO queues', 'Undo functionality', 'Random access', 'Sorting'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-6',
                title: 'Queues',
                description: 'First In, First Out (FIFO)',
                stage: 2,
                content: `
# Queues - FIFO

First In, First Out - like a line at a store.

## Queue Operations:
\\\`\\\`\\\`python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):    # O(1)
        self.items.append(item)
    
    def dequeue(self):          # O(1)
        if not self.is_empty():
            return self.items.popleft()
        return None
    
    def front(self):            # O(1)
        if not self.is_empty():
            return self.items[0]
        return None
    
    def is_empty(self):
        return len(self.items) == 0

# Usage
q = Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(q.dequeue())  # 1
print(q.dequeue())  # 2
\\\`\\\`\\\`

## Priority Queue:
\\\`\\\`\\\`python
import heapq

# Min-heap (smallest first)
pq = []
heapq.heappush(pq, 3)
heapq.heappush(pq, 1)
heapq.heappush(pq, 2)
print(heapq.heappop(pq))  # 1 (smallest)
\\\`\\\`\\\`

## Common Use Cases:
1. **Task scheduling**
2. **Print queue**
3. **BFS graph traversal**
4. **Message queues**
        `,
                exercises: [
                    {
                        prompt: 'What does FIFO stand for?',
                        type: 'multiple-choice',
                        options: ['First In First Out', 'First In First Over', 'Final In First Out', 'First Input First Output'],
                        answer: 0
                    },
                    {
                        prompt: 'What operation adds an item to a queue?',
                        type: 'multiple-choice',
                        options: ['push', 'insert', 'enqueue', 'add'],
                        answer: 2
                    },
                    {
                        prompt: 'Which data structure is efficient for queue operations in Python?',
                        type: 'multiple-choice',
                        options: ['list', 'tuple', 'deque', 'dict'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-7',
                title: 'Hash Tables',
                description: 'O(1) lookup with dictionaries',
                stage: 2,
                content: `
# Hash Tables (Dictionaries)

Key-value storage with O(1) average lookup.

## How Hashing Works:
1. Key → Hash function → Index
2. Store value at that index
3. Handle collisions

## Python Dictionaries:
\\\`\\\`\\\`python
# Creation
my_dict = {}
my_dict = {'a': 1, 'b': 2}
my_dict = dict(a=1, b=2)

# Operations - All O(1) average
my_dict['c'] = 3        # Insert
value = my_dict['a']    # Access
del my_dict['b']        # Delete
'a' in my_dict          # Check existence
my_dict.get('x', 0)     # Get with default
\\\`\\\`\\\`

## Common Patterns:
\\\`\\\`\\\`python
# Frequency counter
def count_chars(s):
    freq = {}
    for char in s:
        freq[char] = freq.get(char, 0) + 1
    return freq

print(count_chars("hello"))  # {'h': 1, 'e': 1, 'l': 2, 'o': 1}

# Two Sum Problem
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
\\\`\\\`\\\`

## Sets (Unique Values):
\\\`\\\`\\\`python
my_set = {1, 2, 3}
my_set.add(4)       # O(1)
my_set.remove(1)    # O(1)
2 in my_set         # O(1)
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is the average time complexity for dictionary lookup?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
                        answer: 2
                    },
                    {
                        prompt: 'Hash tables map keys to values using:',
                        type: 'multiple-choice',
                        options: ['Sorting', 'Hash function', 'Binary search', 'Linked lists'],
                        answer: 1
                    },
                    {
                        prompt: 'The two sum problem is efficiently solved with:',
                        type: 'multiple-choice',
                        options: ['Nested loops', 'Hash table', 'Sorting', 'Recursion'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-8',
                title: 'Binary Search',
                description: 'O(log n) search in sorted arrays',
                stage: 3,
                content: `
# Binary Search

Divide and conquer on sorted arrays - O(log n).

## Basic Binary Search:
\\\`\\\`\\\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Not found

nums = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(nums, 7))   # 3
print(binary_search(nums, 6))   # -1
\\\`\\\`\\\`

## Find First/Last Occurrence:
\\\`\\\`\\\`python
def find_first(arr, target):
    left, right = 0, len(arr) - 1
    result = -1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            result = mid
            right = mid - 1  # Keep searching left
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result
\\\`\\\`\\\`

## Search Insert Position:
\\\`\\\`\\\`python
def search_insert(nums, target):
    left, right = 0, len(nums)
    
    while left < right:
        mid = (left + right) // 2
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is the time complexity of binary search?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
                        answer: 1
                    },
                    {
                        prompt: 'Binary search requires the array to be:',
                        type: 'multiple-choice',
                        options: ['Empty', 'Unsorted', 'Sorted', 'Unique'],
                        answer: 2
                    },
                    {
                        prompt: 'In each iteration, binary search eliminates:',
                        type: 'multiple-choice',
                        options: ['One element', 'Half of remaining elements', 'All elements', 'Nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-9',
                title: 'Bubble Sort',
                description: 'Simple but slow sorting',
                stage: 3,
                content: `
# Bubble Sort

Repeatedly swap adjacent elements - O(n²).

## Algorithm:
\\\`\\\`\\\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # Already sorted
    return arr

print(bubble_sort([64, 34, 25, 12, 22]))
# [12, 22, 25, 34, 64]
\\\`\\\`\\\`

## How It Works:
Pass 1: [64, 34, 25, 12, 22] → [34, 25, 12, 22, 64]
Pass 2: [34, 25, 12, 22, 64] → [25, 12, 22, 34, 64]
...

## Complexity:
- **Time**: O(n²) worst/average, O(n) best
- **Space**: O(1) - in-place
- **Stable**: Yes (equal elements keep order)

## When to Use:
- Educational purposes
- Small datasets
- Nearly sorted data (with optimization)
        `,
                exercises: [
                    {
                        prompt: 'What is the time complexity of bubble sort?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(n log n)'],
                        answer: 2
                    },
                    {
                        prompt: 'Bubble sort works by:',
                        type: 'multiple-choice',
                        options: ['Dividing the array', 'Swapping adjacent elements', 'Using a heap', 'Counting occurrences'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the space complexity of bubble sort?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-10',
                title: 'Merge Sort',
                description: 'Divide and conquer sorting - O(n log n)',
                stage: 3,
                content: `
# Merge Sort

Divide, sort, merge - O(n log n) guaranteed.

## Algorithm:
\\\`\\\`\\\`python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    
    result.extend(left[i:])
    result.extend(right[j:])
    return result

print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]
\\\`\\\`\\\`

## How It Works:
[38, 27, 43, 3] → [38, 27] + [43, 3]
[38, 27] → [38] + [27] → [27, 38]
[43, 3] → [43] + [3] → [3, 43]
Merge: [27, 38] + [3, 43] → [3, 27, 38, 43]

## Complexity:
- **Time**: O(n log n) always
- **Space**: O(n) - needs extra space
- **Stable**: Yes
        `,
                exercises: [
                    {
                        prompt: 'What is the time complexity of merge sort?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
                        answer: 2
                    },
                    {
                        prompt: 'Merge sort uses which strategy?',
                        type: 'multiple-choice',
                        options: ['Greedy', 'Divide and conquer', 'Dynamic programming', 'Backtracking'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the space complexity of merge sort?',
                        type: 'multiple-choice',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-11',
                title: 'Quick Sort',
                description: 'Fast in-place sorting',
                stage: 3,
                content: `
# Quick Sort

Partition around pivot - O(n log n) average.

## Algorithm:
\\\`\\\`\\\`python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
# [1, 1, 2, 3, 6, 8, 10]
\\\`\\\`\\\`

## In-Place Version:
\\\`\\\`\\\`python
def quick_sort_inplace(arr, low, high):
    if low < high:
        pivot_idx = partition(arr, low, high)
        quick_sort_inplace(arr, low, pivot_idx - 1)
        quick_sort_inplace(arr, pivot_idx + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1
\\\`\\\`\\\`

## Complexity:
- **Time**: O(n log n) average, O(n²) worst
- **Space**: O(log n) for recursion
- **Not Stable**: May change order of equals
        `,
                exercises: [
                    {
                        prompt: 'What is the average time complexity of quick sort?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(log n)'],
                        answer: 2
                    },
                    {
                        prompt: 'Quick sort works by:',
                        type: 'multiple-choice',
                        options: ['Merging sorted arrays', 'Partitioning around a pivot', 'Using a heap', 'Counting elements'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the worst-case time complexity of quick sort?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-12',
                title: 'Trees and Binary Trees',
                description: 'Hierarchical data structures',
                stage: 3,
                content: `
# Trees

Hierarchical structures with nodes and edges.

## Tree Terminology:
- **Root**: Top node
- **Parent/Child**: Connected nodes
- **Leaf**: Node with no children
- **Height**: Longest path to leaf
- **Depth**: Distance from root

## Binary Tree:
\\\`\\\`\\\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

# Create a tree:
#       1
#      / \\
#     2   3
#    / \\
#   4   5
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)
\\\`\\\`\\\`

## Tree Traversals:
\\\`\\\`\\\`python
def inorder(node):    # Left, Root, Right
    if node:
        inorder(node.left)
        print(node.val)
        inorder(node.right)

def preorder(node):   # Root, Left, Right
    if node:
        print(node.val)
        preorder(node.left)
        preorder(node.right)

def postorder(node):  # Left, Right, Root
    if node:
        postorder(node.left)
        postorder(node.right)
        print(node.val)
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is the root of a tree?',
                        type: 'multiple-choice',
                        options: ['The bottom node', 'The top node', 'Any node', 'A leaf node'],
                        answer: 1
                    },
                    {
                        prompt: 'In a binary tree, each node has at most:',
                        type: 'multiple-choice',
                        options: ['1 child', '2 children', '3 children', 'Unlimited children'],
                        answer: 1
                    },
                    {
                        prompt: 'Inorder traversal visits nodes in which order?',
                        type: 'multiple-choice',
                        options: ['Root, Left, Right', 'Left, Root, Right', 'Left, Right, Root', 'Right, Root, Left'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-13',
                title: 'Binary Search Trees',
                description: 'Ordered binary trees for fast lookup',
                stage: 3,
                content: `
# Binary Search Trees (BST)

Left child < Parent < Right child.

## BST Property:
- All left descendants < Node
- All right descendants > Node

## Operations:
\\\`\\\`\\\`python
class BST:
    def __init__(self):
        self.root = None
    
    def insert(self, val):
        if not self.root:
            self.root = TreeNode(val)
        else:
            self._insert(self.root, val)
    
    def _insert(self, node, val):
        if val < node.val:
            if node.left:
                self._insert(node.left, val)
            else:
                node.left = TreeNode(val)
        else:
            if node.right:
                self._insert(node.right, val)
            else:
                node.right = TreeNode(val)
    
    def search(self, val):
        return self._search(self.root, val)
    
    def _search(self, node, val):
        if not node:
            return False
        if val == node.val:
            return True
        elif val < node.val:
            return self._search(node.left, val)
        else:
            return self._search(node.right, val)
\\\`\\\`\\\`

## Complexity:
- **Search/Insert/Delete**: O(log n) average, O(n) worst
- **Inorder traversal**: Gives sorted order!
        `,
                exercises: [
                    {
                        prompt: 'In a BST, where are smaller values stored?',
                        type: 'multiple-choice',
                        options: ['Left subtree', 'Right subtree', 'Root', 'Random'],
                        answer: 0
                    },
                    {
                        prompt: 'What is the average time complexity for BST search?',
                        type: 'multiple-choice',
                        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
                        answer: 1
                    },
                    {
                        prompt: 'Inorder traversal of BST gives:',
                        type: 'multiple-choice',
                        options: ['Random order', 'Reverse sorted order', 'Sorted order', 'Level order'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-14',
                title: 'Graphs Introduction',
                description: 'Nodes and edges for complex relationships',
                stage: 4,
                content: `
# Graphs

Vertices (nodes) connected by edges.

## Graph Types:
- **Directed**: Edges have direction (A → B)
- **Undirected**: Edges go both ways
- **Weighted**: Edges have values
- **Cyclic**: Contains cycles
- **Acyclic**: No cycles (DAG)

## Graph Representations:
\\\`\\\`\\\`python
# Adjacency List (most common)
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

# Adjacency Matrix
#    A  B  C  D
# A [0, 1, 1, 0]
# B [1, 0, 0, 1]
# C [1, 0, 0, 1]
# D [0, 1, 1, 0]
matrix = [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [0, 1, 1, 0]
]

# Edge List
edges = [('A', 'B'), ('A', 'C'), ('B', 'D'), ('C', 'D')]
\\\`\\\`\\\`

## Common Problems:
- Shortest path
- Cycle detection
- Connected components
- Topological sort
        `,
                exercises: [
                    {
                        prompt: 'What is the most common way to represent a graph?',
                        type: 'multiple-choice',
                        options: ['Matrix', 'Adjacency List', 'Array', 'Tree'],
                        answer: 1
                    },
                    {
                        prompt: 'A directed graph has:',
                        type: 'multiple-choice',
                        options: ['Edges without direction', 'Edges with direction', 'No edges', 'Only one edge'],
                        answer: 1
                    },
                    {
                        prompt: 'DAG stands for:',
                        type: 'multiple-choice',
                        options: ['Directed Acyclic Graph', 'Direct Array Graph', 'Directed Adjacent Graph', 'Data Acyclic Graph'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'algo-15',
                title: 'BFS - Breadth-First Search',
                description: 'Level-by-level graph traversal',
                stage: 4,
                content: `
# Breadth-First Search (BFS)

Explore all neighbors before going deeper.

## Algorithm:
\\\`\\\`\\\`python
from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    result = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            result.append(node)
            for neighbor in graph[node]:
                if neighbor not in visited:
                    queue.append(neighbor)
    
    return result

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(bfs(graph, 'A'))  # ['A', 'B', 'C', 'D', 'E', 'F']
\\\`\\\`\\\`

## Shortest Path (Unweighted):
\\\`\\\`\\\`python
def shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = set([start])
    
    while queue:
        node, path = queue.popleft()
        if node == end:
            return path
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None
\\\`\\\`\\\`

## Use Cases:
- Shortest path (unweighted)
- Level-order tree traversal
- Social network connections
        `,
                exercises: [
                    {
                        prompt: 'What data structure does BFS use?',
                        type: 'multiple-choice',
                        options: ['Stack', 'Queue', 'Tree', 'Heap'],
                        answer: 1
                    },
                    {
                        prompt: 'BFS explores nodes:',
                        type: 'multiple-choice',
                        options: ['Deepest first', 'Level by level', 'Randomly', 'Alphabetically'],
                        answer: 1
                    },
                    {
                        prompt: 'BFS is useful for finding:',
                        type: 'multiple-choice',
                        options: ['Longest path', 'Shortest path in unweighted graph', 'Maximum value', 'Minimum spanning tree'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-16',
                title: 'DFS - Depth-First Search',
                description: 'Go deep before going wide',
                stage: 4,
                content: `
# Depth-First Search (DFS)

Go as deep as possible, then backtrack.

## Recursive DFS:
\\\`\\\`\\\`python
def dfs_recursive(graph, node, visited=None):
    if visited is None:
        visited = set()
    
    visited.add(node)
    print(node)
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited)

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

dfs_recursive(graph, 'A')  # A, B, D, E, F, C
\\\`\\\`\\\`

## Iterative DFS:
\\\`\\\`\\\`python
def dfs_iterative(graph, start):
    visited = set()
    stack = [start]
    
    while stack:
        node = stack.pop()
        if node not in visited:
            visited.add(node)
            print(node)
            for neighbor in reversed(graph[node]):
                if neighbor not in visited:
                    stack.append(neighbor)
\\\`\\\`\\\`

## Use Cases:
- Path finding
- Cycle detection
- Topological sorting
- Maze solving
        `,
                exercises: [
                    {
                        prompt: 'What data structure does iterative DFS use?',
                        type: 'multiple-choice',
                        options: ['Queue', 'Stack', 'Heap', 'Linked List'],
                        answer: 1
                    },
                    {
                        prompt: 'DFS explores nodes:',
                        type: 'multiple-choice',
                        options: ['Level by level', 'As deep as possible first', 'Randomly', 'By value'],
                        answer: 1
                    },
                    {
                        prompt: 'DFS is commonly used for:',
                        type: 'multiple-choice',
                        options: ['Shortest path', 'Cycle detection', 'Sorting', 'Hashing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-17',
                title: 'Recursion',
                description: 'Functions that call themselves',
                stage: 4,
                content: `
# Recursion

A function that calls itself with smaller input.

## Components:
1. **Base case**: When to stop
2. **Recursive case**: Call with smaller input

## Examples:
\\\`\\\`\\\`python
# Factorial: n! = n * (n-1)!
def factorial(n):
    if n <= 1:        # Base case
        return 1
    return n * factorial(n - 1)  # Recursive case

print(factorial(5))  # 120

# Fibonacci
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Sum of list
def sum_list(arr):
    if not arr:
        return 0
    return arr[0] + sum_list(arr[1:])
\\\`\\\`\\\`

## Recursion vs Iteration:
\\\`\\\`\\\`python
# Iterative
def factorial_iter(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result

# Recursive (same result, different approach)
def factorial_rec(n):
    if n <= 1:
        return 1
    return n * factorial_rec(n - 1)
\\\`\\\`\\\`

## Tips:
- Always have a base case
- Ensure progress toward base case
- Watch for stack overflow
        `,
                exercises: [
                    {
                        prompt: 'What is the base case?',
                        type: 'multiple-choice',
                        options: ['The recursive call', 'The condition to stop recursion', 'The function name', 'The return type'],
                        answer: 1
                    },
                    {
                        prompt: 'What happens without a base case?',
                        type: 'multiple-choice',
                        options: ['Faster execution', 'Stack overflow / infinite recursion', 'Better performance', 'Nothing'],
                        answer: 1
                    },
                    {
                        prompt: 'Factorial of 4 (4!) equals:',
                        type: 'multiple-choice',
                        options: ['4', '16', '24', '256'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'algo-18',
                title: 'Dynamic Programming Basics',
                description: 'Optimize by storing subproblem solutions',
                stage: 4,
                content: `
# Dynamic Programming (DP)

Solve complex problems by breaking into subproblems.

## Key Concepts:
1. **Overlapping subproblems**: Same subproblems solved multiple times
2. **Optimal substructure**: Optimal solution uses optimal subsolutions

## Fibonacci - DP Approach:
\\\`\\\`\\\`python
# Naive recursive: O(2^n) - BAD!
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)

# Memoization (top-down): O(n)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

# Tabulation (bottom-up): O(n)
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# Space optimized: O(1)
def fib_optimized(n):
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What does memoization do?',
                        type: 'multiple-choice',
                        options: ['Sorts data', 'Stores computed results to avoid recomputation', 'Compresses data', 'Encrypts data'],
                        answer: 1
                    },
                    {
                        prompt: 'The naive recursive Fibonacci is:',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(2^n)', 'O(n²)'],
                        answer: 2
                    },
                    {
                        prompt: 'Bottom-up DP is also called:',
                        type: 'multiple-choice',
                        options: ['Memoization', 'Tabulation', 'Recursion', 'Iteration'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-19',
                title: 'Classic DP Problems',
                description: 'Climbing stairs and coin change',
                stage: 4,
                content: `
# Classic DP Problems

## Climbing Stairs:
\\\`\\\`\\\`python
# How many ways to climb n stairs (1 or 2 steps)?
def climb_stairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

print(climb_stairs(5))  # 8 ways
\\\`\\\`\\\`

## Coin Change:
\\\`\\\`\\\`python
# Minimum coins to make amount
def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1, 2, 5], 11))  # 3 (5+5+1)
\\\`\\\`\\\`

## 0/1 Knapsack:
\\\`\\\`\\\`python
def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    values[i-1] + dp[i-1][w - weights[i-1]]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Climbing stairs with 1 or 2 steps is similar to:',
                        type: 'multiple-choice',
                        options: ['Binary search', 'Fibonacci sequence', 'Quick sort', 'Hash tables'],
                        answer: 1
                    },
                    {
                        prompt: 'Coin change finds:',
                        type: 'multiple-choice',
                        options: ['Maximum coins needed', 'Minimum coins needed', 'Total coin value', 'Number of coin types'],
                        answer: 1
                    },
                    {
                        prompt: '0/1 Knapsack means:',
                        type: 'multiple-choice',
                        options: ['Take partial items', 'Take or leave each item completely', 'Take all items', 'Leave all items'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'algo-20',
                title: 'Heaps and Priority Queues',
                description: 'Efficient min/max element access',
                stage: 4,
                content: `
# Heaps

Complete binary tree with heap property.

## Types:
- **Min-Heap**: Parent ≤ Children (smallest at root)
- **Max-Heap**: Parent ≥ Children (largest at root)

## Python heapq (Min-Heap):
\\\`\\\`\\\`python
import heapq

# Create and use min-heap
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 2)
heapq.heappush(heap, 8)
heapq.heappush(heap, 1)

print(heapq.heappop(heap))  # 1 (smallest)
print(heapq.heappop(heap))  # 2

# Heapify a list
nums = [5, 2, 8, 1, 9]
heapq.heapify(nums)  # O(n)

# N largest/smallest
print(heapq.nlargest(2, nums))   # [9, 8]
print(heapq.nsmallest(2, nums))  # [1, 2]
\\\`\\\`\\\`

## Max-Heap Trick:
\\\`\\\`\\\`python
# Negate values for max-heap behavior
max_heap = []
heapq.heappush(max_heap, -5)
heapq.heappush(max_heap, -2)
largest = -heapq.heappop(max_heap)  # 5
\\\`\\\`\\\`

## Complexity:
- Insert: O(log n)
- Get min/max: O(1)
- Remove min/max: O(log n)
- Heapify: O(n)

Congratulations! You've completed Algorithms & Data Structures! 🎉
        `,
                exercises: [
                    {
                        prompt: 'In a min-heap, the smallest element is at:',
                        type: 'multiple-choice',
                        options: ['The bottom', 'The root', 'The middle', 'A random position'],
                        answer: 1
                    },
                    {
                        prompt: 'What is the time complexity to get the minimum from a min-heap?',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
                        answer: 2
                    },
                    {
                        prompt: "Python's heapq implements:",
                        type: 'multiple-choice',
                        options: ['Max-heap', 'Min-heap', 'Both', 'Neither'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // React/JSX Deep Dive Course
    'react': {
        id: 'react',
        name: 'React & JSX Deep Dive',
        description: 'Master React.js - the most popular JavaScript library for building user interfaces.',
        category: 'frameworks',
        icon: '⚛️',
        color: '#61dafb',
        language: 'javascript',
        prerequisites: ['javascript', 'html'],
        estimatedHours: 2,
        lessons: [
            {
                id: 'react-1',
                title: 'What is React?',
                description: 'Introduction to React and component-based architecture',
                stage: 1,
                content: `
# What is React?

React is a JavaScript library for building user interfaces.

## Why React?
- **Component-Based**: Build encapsulated components
- **Declarative**: Describe what you want, not how
- **Virtual DOM**: Efficient updates
- **Large Ecosystem**: Huge community support

## Key Concepts:
1. **Components**: Reusable UI pieces
2. **JSX**: HTML-like syntax in JavaScript
3. **Props**: Data passed to components
4. **State**: Component's internal data
5. **Hooks**: Functions to use React features

## Your First Component:
\\\`\\\`\\\`jsx
function Welcome() {
    return <h1>Hello, React!</h1>;
}

// Usage
<Welcome />
\\\`\\\`\\\`

## React vs Vanilla JS:
\\\`\\\`\\\`javascript
// Vanilla JS
document.getElementById('app').innerHTML = '<h1>Hello</h1>';

// React (declarative)
function App() {
    return <h1>Hello</h1>;
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What is React primarily used for?',
                        type: 'multiple-choice',
                        options: ['Database management', 'Building user interfaces', 'Server-side rendering only', 'Mobile app development only'],
                        answer: 1
                    },
                    {
                        prompt: 'What makes React updates efficient?',
                        type: 'multiple-choice',
                        options: ['Direct DOM manipulation', 'Virtual DOM', 'Server-side rendering', 'No JavaScript'],
                        answer: 1
                    },
                    {
                        prompt: 'React follows which programming paradigm?',
                        type: 'multiple-choice',
                        options: ['Imperative', 'Declarative', 'Procedural', 'Assembly'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-2',
                title: 'JSX Fundamentals',
                description: 'Understanding JSX syntax',
                stage: 1,
                content: `
# JSX Fundamentals

JSX = JavaScript + XML-like syntax.

## Basic JSX:
\\\`\\\`\\\`jsx
// JSX looks like HTML but is JavaScript
const element = <h1>Hello, World!</h1>;

// Multi-line JSX (use parentheses)
const element = (
    <div>
        <h1>Title</h1>
        <p>Paragraph</p>
    </div>
);
\\\`\\\`\\\`

## Expressions in JSX:
\\\`\\\`\\\`jsx
const name = "Alice";
const age = 25;

function Greeting() {
    return (
        <div>
            <h1>Hello, {name}!</h1>
            <p>You are {age} years old.</p>
            <p>Next year: {age + 1}</p>
            <p>Uppercase: {name.toUpperCase()}</p>
        </div>
    );
}
\\\`\\\`\\\`

## JSX Rules:
1. **One root element** (use \`<div>\` or \`<>\`)
2. **Close all tags** (\`<img />\`, \`<br />\`)
3. **Use camelCase** (\`className\`, \`onClick\`)
4. **Use curly braces** for JS expressions

\\\`\\\`\\\`jsx
// Fragment (empty tag) - no extra DOM node
function List() {
    return (
        <>
            <li>Item 1</li>
            <li>Item 2</li>
        </>
    );
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'How do you embed JavaScript in JSX?',
                        type: 'multiple-choice',
                        options: ['Using double quotes', 'Using curly braces {}', 'Using parentheses', 'Using square brackets'],
                        answer: 1
                    },
                    {
                        prompt: 'In JSX, the class attribute is written as:',
                        type: 'multiple-choice',
                        options: ['class', 'className', 'cssClass', 'htmlClass'],
                        answer: 1
                    },
                    {
                        prompt: 'What is a React Fragment used for?',
                        type: 'multiple-choice',
                        options: ['Adding styles', 'Grouping elements without extra DOM node', 'Creating animations', 'Handling events'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-3',
                title: 'Components and Props',
                description: 'Building reusable components with props',
                stage: 1,
                content: `
# Components and Props

Components are reusable UI building blocks.

## Function Components:
\\\`\\\`\\\`jsx
// Simple component
function Greeting() {
    return <h1>Hello!</h1>;
}

// With props
function Welcome(props) {
    return <h1>Hello, {props.name}!</h1>;
}

// Usage
<Welcome name="Alice" />
<Welcome name="Bob" />
\\\`\\\`\\\`

## Destructuring Props:
\\\`\\\`\\\`jsx
function UserCard({ name, age, email }) {
    return (
        <div className="card">
            <h2>{name}</h2>
            <p>Age: {age}</p>
            <p>Email: {email}</p>
        </div>
    );
}

<UserCard name="Alice" age={25} email="alice@email.com" />
\\\`\\\`\\\`

## Default Props:
\\\`\\\`\\\`jsx
function Button({ text = "Click me", color = "blue" }) {
    return (
        <button style={{ backgroundColor: color }}>
            {text}
        </button>
    );
}

<Button />  {/* Uses defaults */}
<Button text="Submit" color="green" />
\\\`\\\`\\\`

## Children Prop:
\\\`\\\`\\\`jsx
function Card({ children, title }) {
    return (
        <div className="card">
            <h2>{title}</h2>
            {children}
        </div>
    );
}

<Card title="My Card">
    <p>This is the card content!</p>
</Card>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'What are props in React?',
                        type: 'multiple-choice',
                        options: ['Internal component state', 'Data passed to components', 'CSS styles', 'Event handlers only'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you pass a number as a prop?',
                        type: 'multiple-choice',
                        options: ['age="25"', 'age={25}', 'age: 25', 'age->25'],
                        answer: 1
                    },
                    {
                        prompt: 'The children prop contains:',
                        type: 'multiple-choice',
                        options: ['Parent component', 'Elements between opening and closing tags', 'Sibling components', 'CSS classes'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-4',
                title: 'useState Hook',
                description: 'Managing component state',
                stage: 2,
                content: `
# useState Hook

State allows components to remember values.

## Basic useState:
\\\`\\\`\\\`jsx
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
\\\`\\\`\\\`

## Multiple State Variables:
\\\`\\\`\\\`jsx
function Form() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    
    return (
        <form>
            <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
        </form>
    );
}
\\\`\\\`\\\`

## State with Objects:
\\\`\\\`\\\`jsx
function Profile() {
    const [user, setUser] = useState({
        name: 'Alice',
        age: 25
    });
    
    const updateAge = () => {
        setUser({
            ...user,  // Spread existing
            age: user.age + 1
        });
    };
    
    return <button onClick={updateAge}>Birthday!</button>;
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'useState returns:',
                        type: 'multiple-choice',
                        options: ['Just the value', 'An array with [value, setter]', 'An object', 'A function'],
                        answer: 1
                    },
                    {
                        prompt: 'How do you update state correctly?',
                        type: 'multiple-choice',
                        options: ['count = count + 1', 'setCount(count + 1)', 'state.count++', 'updateState(count)'],
                        answer: 1
                    },
                    {
                        prompt: 'When updating object state, you should:',
                        type: 'multiple-choice',
                        options: ['Modify directly', 'Create a new object with spread', 'Delete and recreate', 'Use forEach'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-5',
                title: 'useEffect Hook',
                description: 'Side effects in React',
                stage: 2,
                content: `
# useEffect Hook

Handle side effects: data fetching, subscriptions, DOM updates.

## Basic useEffect:
\\\`\\\`\\\`jsx
import { useState, useEffect } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(s => s + 1);
        }, 1000);
        
        // Cleanup function
        return () => clearInterval(interval);
    }, []); // Empty deps = run once
    
    return <p>Seconds: {seconds}</p>;
}
\\\`\\\`\\\`

## Dependency Array:
\\\`\\\`\\\`jsx
// Run on every render
useEffect(() => { });

// Run once (on mount)
useEffect(() => { }, []);

// Run when 'count' changes
useEffect(() => {
    console.log('Count changed:', count);
}, [count]);

// Run when 'a' or 'b' changes
useEffect(() => {
    console.log('a or b changed');
}, [a, b]);
\\\`\\\`\\\`

## Data Fetching:
\\\`\\\`\\\`jsx
function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch('https://api.example.com/users')
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            });
    }, []);
    
    if (loading) return <p>Loading...</p>;
    return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'An empty dependency array [] means:',
                        type: 'multiple-choice',
                        options: ['Never run', 'Run on every render', 'Run once on mount', 'Run on unmount'],
                        answer: 2
                    },
                    {
                        prompt: 'The cleanup function runs:',
                        type: 'multiple-choice',
                        options: ['Before the effect', 'After the effect', 'When component unmounts', 'Never'],
                        answer: 2
                    },
                    {
                        prompt: 'useEffect is used for:',
                        type: 'multiple-choice',
                        options: ['Defining state', 'Side effects like fetching data', 'Rendering JSX', 'Creating components'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-6',
                title: 'Event Handling',
                description: 'Handling user interactions',
                stage: 2,
                content: `
# Event Handling

React events use camelCase and pass functions.

## Basic Events:
\\\`\\\`\\\`jsx
function Button() {
    const handleClick = () => {
        alert('Button clicked!');
    };
    
    return <button onClick={handleClick}>Click Me</button>;
}

// Inline
<button onClick={() => alert('Clicked!')}>Click</button>
\\\`\\\`\\\`

## Event Object:
\\\`\\\`\\\`jsx
function Form() {
    const handleSubmit = (e) => {
        e.preventDefault(); // Stop form submission
        console.log('Form submitted!');
    };
    
    const handleChange = (e) => {
        console.log(e.target.value);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
}
\\\`\\\`\\\`

## Passing Arguments:
\\\`\\\`\\\`jsx
function ItemList() {
    const handleDelete = (id) => {
        console.log('Deleting item:', id);
    };
    
    return (
        <ul>
            <li>
                Item 1
                <button onClick={() => handleDelete(1)}>Delete</button>
            </li>
            <li>
                Item 2
                <button onClick={() => handleDelete(2)}>Delete</button>
            </li>
        </ul>
    );
}
\\\`\\\`\\\`

## Common Events:
- \`onClick\`, \`onDoubleClick\`
- \`onChange\`, \`onInput\`
- \`onSubmit\`, \`onFocus\`, \`onBlur\`
- \`onKeyDown\`, \`onKeyUp\`, \`onKeyPress\`
- \`onMouseOver\`, \`onMouseOut\`
        `,
                exercises: [
                    {
                        prompt: 'React event handlers are named using:',
                        type: 'multiple-choice',
                        options: ['lowercase', 'UPPERCASE', 'camelCase', 'snake_case'],
                        answer: 2
                    },
                    {
                        prompt: 'e.preventDefault() is used to:',
                        type: 'multiple-choice',
                        options: ['Stop rendering', 'Prevent default browser behavior', 'Stop event bubbling', 'Clear state'],
                        answer: 1
                    },
                    {
                        prompt: 'To pass arguments to event handlers, use:',
                        type: 'multiple-choice',
                        options: ['Direct call: onClick={handleClick(id)}', 'Arrow function: onClick={() => handleClick(id)}', 'String: onClick="handleClick(id)"', 'Array: onClick={[handleClick, id]}'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-7',
                title: 'Conditional Rendering',
                description: 'Rendering based on conditions',
                stage: 2,
                content: `
# Conditional Rendering

Show different UI based on conditions.

## If/Else with Variables:
\\\`\\\`\\\`jsx
function Greeting({ isLoggedIn }) {
    let message;
    if (isLoggedIn) {
        message = <h1>Welcome back!</h1>;
    } else {
        message = <h1>Please sign in</h1>;
    }
    return message;
}
\\\`\\\`\\\`

## Ternary Operator:
\\\`\\\`\\\`jsx
function Greeting({ isLoggedIn }) {
    return (
        <div>
            {isLoggedIn ? (
                <h1>Welcome back!</h1>
            ) : (
                <h1>Please sign in</h1>
            )}
        </div>
    );
}
\\\`\\\`\\\`

## Logical AND (&&):
\\\`\\\`\\\`jsx
function Notification({ count }) {
    return (
        <div>
            {count > 0 && <span>You have {count} messages</span>}
        </div>
    );
}
\\\`\\\`\\\`

## Multiple Conditions:
\\\`\\\`\\\`jsx
function StatusMessage({ status }) {
    return (
        <div>
            {status === 'loading' && <Spinner />}
            {status === 'error' && <Error />}
            {status === 'success' && <Success />}
        </div>
    );
}
\\\`\\\`\\\`

## Returning null:
\\\`\\\`\\\`jsx
function Banner({ show }) {
    if (!show) return null;
    return <div className="banner">Important Message!</div>;
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'The && operator renders the right side when:',
                        type: 'multiple-choice',
                        options: ['Left side is false', 'Left side is true', 'Always', 'Never'],
                        answer: 1
                    },
                    {
                        prompt: 'To render nothing, a component can return:',
                        type: 'multiple-choice',
                        options: ['undefined', 'false', 'null', '0'],
                        answer: 2
                    },
                    {
                        prompt: 'Ternary operator syntax is:',
                        type: 'multiple-choice',
                        options: ['if/else', 'condition ? true : false', 'condition && true', 'switch/case'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-8',
                title: 'Lists and Keys',
                description: 'Rendering dynamic lists',
                stage: 2,
                content: `
# Lists and Keys

Render arrays of data with unique keys.

## Basic List Rendering:
\\\`\\\`\\\`jsx
function TodoList() {
    const todos = ['Learn React', 'Build App', 'Deploy'];
    
    return (
        <ul>
            {todos.map((todo, index) => (
                <li key={index}>{todo}</li>
            ))}
        </ul>
    );
}
\\\`\\\`\\\`

## With Unique IDs (Better!):
\\\`\\\`\\\`jsx
function UserList() {
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    
    return (
        <ul>
            {users.map(user => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}
\\\`\\\`\\\`

## Why Keys Matter:
- Help React identify changed items
- Enable efficient re-renders
- Must be unique among siblings

## Component Lists:
\\\`\\\`\\\`jsx
function UserCards({ users }) {
    return (
        <div className="grid">
            {users.map(user => (
                <UserCard 
                    key={user.id}
                    name={user.name}
                    email={user.email}
                />
            ))}
        </div>
    );
}
\\\`\\\`\\\`

## Filtering Lists:
\\\`\\\`\\\`jsx
function ActiveUsers({ users }) {
    return (
        <ul>
            {users
                .filter(user => user.isActive)
                .map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
        </ul>
    );
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Keys in React should be:',
                        type: 'multiple-choice',
                        options: ['Random', 'Unique among siblings', 'Same for all items', 'Always numbers'],
                        answer: 1
                    },
                    {
                        prompt: 'Using array index as key is:',
                        type: 'multiple-choice',
                        options: ['Recommended', 'Not recommended when list can reorder', 'Required', 'Impossible'],
                        answer: 1
                    },
                    {
                        prompt: 'The map function in React:',
                        type: 'multiple-choice',
                        options: ['Modifies the original array', 'Returns a new array of elements', 'Only works with numbers', 'Requires a key as first argument'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-9',
                title: 'Forms and Controlled Components',
                description: 'Handling form inputs',
                stage: 2,
                content: `
# Forms and Controlled Components

Control form inputs with React state.

## Controlled Input:
\\\`\\\`\\\`jsx
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login:', email, password);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
}
\\\`\\\`\\\`

## Different Input Types:
\\\`\\\`\\\`jsx
function Form() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        agreed: false,
        role: 'user'
    });
    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    return (
        <form>
            <input name="name" onChange={handleChange} />
            <input name="age" type="number" onChange={handleChange} />
            <input name="agreed" type="checkbox" onChange={handleChange} />
            <select name="role" onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
        </form>
    );
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'A controlled component has its value managed by:',
                        type: 'multiple-choice',
                        options: ['The DOM', 'React state', 'Local storage', 'CSS'],
                        answer: 1
                    },
                    {
                        prompt: 'For checkboxes, you read the value from:',
                        type: 'multiple-choice',
                        options: ['e.target.value', 'e.target.checked', 'e.target.selected', 'e.target.text'],
                        answer: 1
                    },
                    {
                        prompt: 'e.preventDefault() in form submit:',
                        type: 'multiple-choice',
                        options: ['Clears the form', 'Prevents page reload', 'Validates input', 'Disables the button'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-10',
                title: 'useRef Hook',
                description: 'Accessing DOM elements and persisting values',
                stage: 3,
                content: `
# useRef Hook

Access DOM elements and persist values without re-renders.

## DOM Reference:
\\\`\\\`\\\`jsx
import { useRef } from 'react';

function TextInput() {
    const inputRef = useRef(null);
    
    const focusInput = () => {
        inputRef.current.focus();
    };
    
    return (
        <div>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>Focus Input</button>
        </div>
    );
}
\\\`\\\`\\\`

## Persisting Values:
\\\`\\\`\\\`jsx
function Timer() {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    
    const handleClick = () => {
        countRef.current++;  // No re-render
        console.log('Ref:', countRef.current);
        
        setCount(c => c + 1);  // Re-renders
    };
    
    return (
        <div>
            <p>State: {count}</p>
            <button onClick={handleClick}>Increment</button>
        </div>
    );
}
\\\`\\\`\\\`

## Previous Value Pattern:
\\\`\\\`\\\`jsx
function Counter() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef();
    
    useEffect(() => {
        prevCountRef.current = count;
    });
    
    const prevCount = prevCountRef.current;
    
    return (
        <div>
            <p>Now: {count}, Before: {prevCount}</p>
            <button onClick={() => setCount(c => c + 1)}>+</button>
        </div>
    );
}
\\\`\\\`\\\`

## Storing Interval ID:
\\\`\\\`\\\`jsx
function Stopwatch() {
    const intervalRef = useRef(null);
    
    const start = () => {
        intervalRef.current = setInterval(() => {
            // tick
        }, 1000);
    };
    
    const stop = () => {
        clearInterval(intervalRef.current);
    };
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'useRef.current changes:',
                        type: 'multiple-choice',
                        options: ['Cause re-renders', 'Do not cause re-renders', 'Always cause errors', 'Reset on every render'],
                        answer: 1
                    },
                    {
                        prompt: 'To access a DOM element, you use:',
                        type: 'multiple-choice',
                        options: ['ref={element}', 'ref={inputRef}', 'dom={inputRef}', 'element={inputRef}'],
                        answer: 1
                    },
                    {
                        prompt: 'The current property of useRef:',
                        type: 'multiple-choice',
                        options: ['Is read-only', 'Can be modified freely', 'Must be a number', 'Must be a string'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-11',
                title: 'useContext Hook',
                description: 'Sharing state without prop drilling',
                stage: 3,
                content: `
# useContext Hook

Share data globally without passing props.

## Creating Context:
\\\`\\\`\\\`jsx
import { createContext, useContext, useState } from 'react';

// 1. Create context
const ThemeContext = createContext('light');

// 2. Create provider component
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    
    const toggleTheme = () => {
        setTheme(t => t === 'light' ? 'dark' : 'light');
    };
    
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// 3. Use in app
function App() {
    return (
        <ThemeProvider>
            <Header />
            <Main />
        </ThemeProvider>
    );
}
\\\`\\\`\\\`

## Consuming Context:
\\\`\\\`\\\`jsx
function Header() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    
    return (
        <header className={theme}>
            <h1>My App</h1>
            <button onClick={toggleTheme}>
                Toggle Theme
            </button>
        </header>
    );
}

function Main() {
    const { theme } = useContext(ThemeContext);
    
    return (
        <main className={theme}>
            Content here
        </main>
    );
}
\\\`\\\`\\\`

## Common Use Cases:
- Theme (dark/light mode)
- User authentication
- Language/locale
- App configuration
        `,
                exercises: [
                    {
                        prompt: 'Context is used to avoid:',
                        type: 'multiple-choice',
                        options: ['State', 'Prop drilling', 'Components', 'Hooks'],
                        answer: 1
                    },
                    {
                        prompt: 'The Provider component:',
                        type: 'multiple-choice',
                        options: ['Consumes context', 'Provides context value to children', 'Creates new components', 'Handles events'],
                        answer: 1
                    },
                    {
                        prompt: 'useContext requires:',
                        type: 'multiple-choice',
                        options: ['A string', 'A Context object from createContext', 'A number', 'An array'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-12',
                title: 'Custom Hooks',
                description: 'Creating reusable logic',
                stage: 3,
                content: `
# Custom Hooks

Extract and reuse component logic.

## Naming Convention:
- Must start with \`use\`
- Can call other hooks

## useToggle Hook:
\\\`\\\`\\\`jsx
function useToggle(initialValue = false) {
    const [value, setValue] = useState(initialValue);
    const toggle = () => setValue(v => !v);
    return [value, toggle];
}

// Usage
function Modal() {
    const [isOpen, toggleOpen] = useToggle(false);
    
    return (
        <div>
            <button onClick={toggleOpen}>
                {isOpen ? 'Close' : 'Open'}
            </button>
            {isOpen && <div>Modal Content</div>}
        </div>
    );
}
\\\`\\\`\\\`

## useFetch Hook:
\\\`\\\`\\\`jsx
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setLoading(true);
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setData(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, [url]);
    
    return { data, loading, error };
}

// Usage
function Users() {
    const { data, loading, error } = useFetch('/api/users');
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error!</p>;
    return <UserList users={data} />;
}
\\\`\\\`\\\`

## useLocalStorage Hook:
\\\`\\\`\\\`jsx
function useLocalStorage(key, initialValue) {
    const [value, setValue] = useState(() => {
        const saved = localStorage.getItem(key);
        return saved ? JSON.parse(saved) : initialValue;
    });
    
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    
    return [value, setValue];
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Custom hooks must start with:',
                        type: 'multiple-choice',
                        options: ['hook', 'custom', 'use', 'my'],
                        answer: 2
                    },
                    {
                        prompt: 'Custom hooks can:',
                        type: 'multiple-choice',
                        options: ['Not use other hooks', 'Use other hooks like useState', 'Only return strings', 'Only be used once'],
                        answer: 1
                    },
                    {
                        prompt: 'The main benefit of custom hooks is:',
                        type: 'multiple-choice',
                        options: ['Faster performance', 'Code reusability', 'Better styling', 'Smaller bundle size'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-13',
                title: 'useMemo and useCallback',
                description: 'Optimizing performance',
                stage: 3,
                content: `
# useMemo and useCallback

Memoize values and functions for performance.

## useMemo - Memoize Values:
\\\`\\\`\\\`jsx
import { useMemo, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
    // Only recalculate when items or filter change
    const filteredItems = useMemo(() => {
        console.log('Filtering...');
        return items.filter(item => 
            item.name.includes(filter)
        );
    }, [items, filter]);
    
    return (
        <ul>
            {filteredItems.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}
\\\`\\\`\\\`

## useCallback - Memoize Functions:
\\\`\\\`\\\`jsx
import { useCallback, useState } from 'react';

function Parent() {
    const [count, setCount] = useState(0);
    
    // Function reference stays stable
    const handleClick = useCallback(() => {
        console.log('Clicked!');
    }, []); // Empty deps = never changes
    
    const handleIncrement = useCallback(() => {
        setCount(c => c + 1);
    }, []);
    
    return (
        <div>
            <p>{count}</p>
            <ExpensiveChild onClick={handleClick} />
            <button onClick={handleIncrement}>+</button>
        </div>
    );
}

// Child won't re-render if props don't change
const ExpensiveChild = React.memo(({ onClick }) => {
    console.log('Child rendered');
    return <button onClick={onClick}>Click</button>;
});
\\\`\\\`\\\`

## When to Use:
- **useMemo**: Expensive calculations
- **useCallback**: Functions passed to memoized children
- Don't overuse! Only optimize when needed
        `,
                exercises: [
                    {
                        prompt: 'useMemo is used for:',
                        type: 'multiple-choice',
                        options: ['Memoizing functions', 'Memoizing computed values', 'Managing state', 'Handling effects'],
                        answer: 1
                    },
                    {
                        prompt: 'useCallback is used for:',
                        type: 'multiple-choice',
                        options: ['Memoizing values', 'Memoizing functions', 'Creating refs', 'Managing context'],
                        answer: 1
                    },
                    {
                        prompt: 'React.memo prevents re-render when:',
                        type: 'multiple-choice',
                        options: ['State changes', 'Props stay the same', 'Parent re-renders', 'Always'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-14',
                title: 'useReducer Hook',
                description: 'Complex state management',
                stage: 3,
                content: `
# useReducer Hook

Manage complex state with reducer pattern.

## Basic useReducer:
\\\`\\\`\\\`jsx
import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, { count: 0 });
    
    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}
\\\`\\\`\\\`

## Todo List Example:
\\\`\\\`\\\`jsx
function todoReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, { id: Date.now(), text: action.text, done: false }];
        case 'toggle':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'delete':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

function TodoApp() {
    const [todos, dispatch] = useReducer(todoReducer, []);
    const [text, setText] = useState('');
    
    const addTodo = () => {
        dispatch({ type: 'add', text });
        setText('');
    };
    
    return (
        <div>
            <input value={text} onChange={e => setText(e.target.value)} />
            <button onClick={addTodo}>Add</button>
            {todos.map(todo => (
                <div key={todo.id}>
                    <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                        {todo.text}
                    </span>
                    <button onClick={() => dispatch({ type: 'toggle', id: todo.id })}>Toggle</button>
                    <button onClick={() => dispatch({ type: 'delete', id: todo.id })}>Delete</button>
                </div>
            ))}
        </div>
    );
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'useReducer returns:',
                        type: 'multiple-choice',
                        options: ['[state]', '[state, dispatch]', '[dispatch, state]', '[reducer, state]'],
                        answer: 1
                    },
                    {
                        prompt: 'The dispatch function:',
                        type: 'multiple-choice',
                        options: ['Updates state directly', 'Sends actions to the reducer', 'Creates new reducers', 'Renders components'],
                        answer: 1
                    },
                    {
                        prompt: 'useReducer is preferred over useState for:',
                        type: 'multiple-choice',
                        options: ['Simple boolean state', 'Complex state with multiple sub-values', 'Styling components', 'Fetching data'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-15',
                title: 'React Router',
                description: 'Client-side routing',
                stage: 4,
                content: `
# React Router

Navigate between pages in React apps.

## Setup:
\\\`\\\`\\\`bash
npm install react-router-dom
\\\`\\\`\\\`

## Basic Routing:
\\\`\\\`\\\`jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/users">Users</Link>
            </nav>
            
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/users" element={<Users />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
\\\`\\\`\\\`

## Dynamic Routes:
\\\`\\\`\\\`jsx
import { useParams, useNavigate } from 'react-router-dom';

// Route: /users/:id
function UserProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>User {id}</h1>
            <button onClick={() => navigate('/')}>Go Home</button>
            <button onClick={() => navigate(-1)}>Go Back</button>
        </div>
    );
}

// In Routes
<Route path="/users/:id" element={<UserProfile />} />
\\\`\\\`\\\`

## Nested Routes:
\\\`\\\`\\\`jsx
<Route path="/dashboard" element={<Dashboard />}>
    <Route index element={<DashboardHome />} />
    <Route path="settings" element={<Settings />} />
    <Route path="profile" element={<Profile />} />
</Route>

// Dashboard.jsx - use Outlet for nested routes
import { Outlet } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <Sidebar />
            <Outlet />  {/* Nested routes render here */}
        </div>
    );
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Link component is used for:',
                        type: 'multiple-choice',
                        options: ['External links', 'Internal navigation without page reload', 'Styling', 'API calls'],
                        answer: 1
                    },
                    {
                        prompt: 'useParams hook returns:',
                        type: 'multiple-choice',
                        options: ['Query parameters', 'URL path parameters', 'State', 'Props'],
                        answer: 1
                    },
                    {
                        prompt: 'The Outlet component:',
                        type: 'multiple-choice',
                        options: ['Creates new routes', 'Renders nested routes', 'Handles errors', 'Manages state'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-16',
                title: 'Component Patterns',
                description: 'Common design patterns in React',
                stage: 4,
                content: `
# Component Patterns

Reusable patterns for building React apps.

## Compound Components:
\\\`\\\`\\\`jsx
function Tabs({ children, defaultTab }) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className="tabs">{children}</div>
        </TabsContext.Provider>
    );
}

Tabs.List = ({ children }) => (
    <div className="tab-list">{children}</div>
);

Tabs.Tab = ({ value, children }) => {
    const { activeTab, setActiveTab } = useContext(TabsContext);
    return (
        <button 
            className={activeTab === value ? 'active' : ''}
            onClick={() => setActiveTab(value)}
        >
            {children}
        </button>
    );
};

Tabs.Panel = ({ value, children }) => {
    const { activeTab } = useContext(TabsContext);
    return activeTab === value ? <div>{children}</div> : null;
};

// Usage
<Tabs defaultTab="tab1">
    <Tabs.List>
        <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
        <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
    <Tabs.Panel value="tab2">Content 2</Tabs.Panel>
</Tabs>
\\\`\\\`\\\`

## Render Props:
\\\`\\\`\\\`jsx
function MouseTracker({ render }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    
    useEffect(() => {
        const handleMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);
    
    return render(position);
}

// Usage
<MouseTracker render={({ x, y }) => (
    <p>Mouse: {x}, {y}</p>
)} />
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Compound components share state via:',
                        type: 'multiple-choice',
                        options: ['Props only', 'Context', 'Global variables', 'Local storage'],
                        answer: 1
                    },
                    {
                        prompt: 'Render props pattern passes:',
                        type: 'multiple-choice',
                        options: ['A string', 'A function as prop that returns JSX', 'An object', 'A number'],
                        answer: 1
                    },
                    {
                        prompt: 'HOC stands for:',
                        type: 'multiple-choice',
                        options: ['High Order Component', 'Higher-Order Component', 'High Output Code', 'Horizontal Object Class'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-17',
                title: 'Error Boundaries',
                description: 'Handling errors gracefully',
                stage: 4,
                content: `
# Error Boundaries

Catch JavaScript errors in child components.

## Creating Error Boundary:
\\\`\\\`\\\`jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    
    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }
    
    componentDidCatch(error, errorInfo) {
        console.log('Error:', error);
        console.log('Error Info:', errorInfo);
        // Log to error reporting service
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="error">
                    <h2>Something went wrong</h2>
                    <button onClick={() => this.setState({ hasError: false })}>
                        Try Again
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

// Usage
function App() {
    return (
        <ErrorBoundary>
            <ProblematicComponent />
        </ErrorBoundary>
    );
}
\\\`\\\`\\\`

## react-error-boundary Library:
\\\`\\\`\\\`jsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div>
            <h2>Something went wrong:</h2>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    );
}

function App() {
    return (
        <ErrorBoundary 
            FallbackComponent={ErrorFallback}
            onReset={() => {
                // Reset app state
            }}
        >
            <MyComponent />
        </ErrorBoundary>
    );
}
\\\`\\\`\\\`

## Limitations:
- Don't catch errors in event handlers
- Don't catch async errors
- Don't catch errors in error boundary itself
        `,
                exercises: [
                    {
                        prompt: 'Error boundaries must be:',
                        type: 'multiple-choice',
                        options: ['Function components', 'Class components', 'Custom hooks', 'Context providers'],
                        answer: 1
                    },
                    {
                        prompt: 'getDerivedStateFromError is used to:',
                        type: 'multiple-choice',
                        options: ['Log errors', 'Update state after error', 'Throw errors', 'Prevent errors'],
                        answer: 1
                    },
                    {
                        prompt: 'Error boundaries do NOT catch errors in:',
                        type: 'multiple-choice',
                        options: ['Render phase', 'Event handlers', 'Constructor', 'Lifecycle methods'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-18',
                title: 'State Management with Zustand',
                description: 'Simple global state management',
                stage: 4,
                content: `
# State Management with Zustand

Simple, fast global state management.

## Setup:
\\\`\\\`\\\`bash
npm install zustand
\\\`\\\`\\\`

## Create Store:
\\\`\\\`\\\`jsx
import { create } from 'zustand';

const useStore = create((set, get) => ({
    // State
    count: 0,
    user: null,
    todos: [],
    
    // Actions
    increment: () => set(state => ({ count: state.count + 1 })),
    decrement: () => set(state => ({ count: state.count - 1 })),
    
    setUser: (user) => set({ user }),
    logout: () => set({ user: null }),
    
    addTodo: (text) => set(state => ({
        todos: [...state.todos, { id: Date.now(), text, done: false }]
    })),
    
    toggleTodo: (id) => set(state => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
        )
    }))
}));
\\\`\\\`\\\`

## Use in Components:
\\\`\\\`\\\`jsx
function Counter() {
    const count = useStore(state => state.count);
    const increment = useStore(state => state.increment);
    const decrement = useStore(state => state.decrement);
    
    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

function UserProfile() {
    const user = useStore(state => state.user);
    const logout = useStore(state => state.logout);
    
    if (!user) return <Login />;
    
    return (
        <div>
            <h1>Welcome, {user.name}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
}
\\\`\\\`\\\`

## Benefits:
- No Provider needed
- Simple API
- Good TypeScript support
- Selective subscriptions (performance)
        `,
                exercises: [
                    {
                        prompt: 'Zustand stores are created with:',
                        type: 'multiple-choice',
                        options: ['createStore', 'useStore', 'create', 'makeStore'],
                        answer: 2
                    },
                    {
                        prompt: 'To update Zustand state, you use:',
                        type: 'multiple-choice',
                        options: ['setState', 'set', 'update', 'dispatch'],
                        answer: 1
                    },
                    {
                        prompt: 'Unlike Redux, Zustand:',
                        type: 'multiple-choice',
                        options: ['Requires more boilerplate', 'Does not need a Provider', 'Cannot handle async', 'Only works with classes'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-19',
                title: 'Testing React Components',
                description: 'Unit testing with React Testing Library',
                stage: 4,
                content: `
# Testing React Components

Test components with React Testing Library.

## Setup:
\\\`\\\`\\\`bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
\\\`\\\`\\\`

## Basic Test:
\\\`\\\`\\\`jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

test('renders counter with initial value', () => {
    render(<Counter />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
});

test('increments counter on click', async () => {
    render(<Counter />);
    const button = screen.getByRole('button', { name: /increment/i });
    
    await userEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
\\\`\\\`\\\`

## Query Methods:
\\\`\\\`\\\`jsx
// Find elements
screen.getByText('Hello');           // By text content
screen.getByRole('button');          // By ARIA role
screen.getByLabelText('Email');      // By label
screen.getByPlaceholderText('Search'); // By placeholder
screen.getByTestId('custom-element'); // By data-testid

// Async queries
await screen.findByText('Loaded');   // Waits for element
screen.queryByText('Maybe');         // Returns null if not found
\\\`\\\`\\\`

## Testing Form:
\\\`\\\`\\\`jsx
test('submits form with user input', async () => {
    const handleSubmit = jest.fn();
    render(<LoginForm onSubmit={handleSubmit} />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    expect(handleSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
    });
});
\\\`\\\`\\\`

## Best Practices:
- Test behavior, not implementation
- Use accessible queries (getByRole, getByLabelText)
- Avoid testing implementation details
        `,
                exercises: [
                    {
                        prompt: 'React Testing Library encourages testing:',
                        type: 'multiple-choice',
                        options: ['Implementation details', 'User behavior', 'Internal state', 'Component structure'],
                        answer: 1
                    },
                    {
                        prompt: 'To wait for an element to appear, use:',
                        type: 'multiple-choice',
                        options: ['getByText', 'findByText', 'queryByText', 'searchByText'],
                        answer: 1
                    },
                    {
                        prompt: 'The preferred way to find a button is:',
                        type: 'multiple-choice',
                        options: ['getByClassName', 'getByRole("button")', 'querySelector', 'getById'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'react-20',
                title: 'Best Practices and Patterns',
                description: 'Writing clean, maintainable React code',
                stage: 4,
                content: `
# React Best Practices

Write clean, maintainable React code.

## Component Organization:
\\\`\\\`\\\`
src/
├── components/
│   ├── Button/
│   │   ├── Button.jsx
│   │   ├── Button.module.css
│   │   └── index.js
│   └── Card/
├── hooks/
│   ├── useFetch.js
│   └── useLocalStorage.js
├── pages/
├── context/
├── utils/
└── App.jsx
\\\`\\\`\\\`

## Component Best Practices:
\\\`\\\`\\\`jsx
// ✅ Single responsibility
function UserAvatar({ user }) {
    return <img src={user.avatar} alt={user.name} />;
}

// ✅ Prop destructuring with defaults
function Button({ 
    children, 
    variant = 'primary', 
    onClick,
    disabled = false 
}) {
    return (
        <button 
            className={\\\`btn btn-\${variant}\\\`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

// ✅ Early returns for loading/error states
function UserProfile({ userId }) {
    const { data, loading, error } = useFetch(\\\`/api/users/\${userId}\\\`);
    
    if (loading) return <Spinner />;
    if (error) return <Error message={error} />;
    if (!data) return null;
    
    return <Profile user={data} />;
}
\\\`\\\`\\\`

## Performance Tips:
\\\`\\\`\\\`jsx
// ✅ Lazy loading
const Dashboard = lazy(() => import('./pages/Dashboard'));

// ✅ Memoize expensive computations
const sortedItems = useMemo(() => 
    items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
);

// ✅ Stable event handlers
const handleClick = useCallback(() => {
    doSomething(id);
}, [id]);
\\\`\\\`\\\`

Congratulations! You've completed React & JSX Deep Dive! 🎉
        `,
                exercises: [
                    {
                        prompt: 'Single responsibility means:',
                        type: 'multiple-choice',
                        options: ['One file per project', 'Each component does one thing well', 'One state per app', 'One hook per component'],
                        answer: 1
                    },
                    {
                        prompt: 'React.lazy is used for:',
                        type: 'multiple-choice',
                        options: ['Lazy state updates', 'Code splitting and lazy loading', 'Slow rendering', 'Error handling'],
                        answer: 1
                    },
                    {
                        prompt: 'Early returns help with:',
                        type: 'multiple-choice',
                        options: ['Performance', 'Readability and handling edge cases', 'Styling', 'Testing'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // Tailwind CSS Course
    'tailwind': {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'Master utility-first CSS with Tailwind - build modern, responsive designs rapidly.',
        category: 'styling',
        icon: '🎨',
        color: '#06b6d4',
        language: 'html',
        prerequisites: ['html', 'css'],
        estimatedHours: 1.5,
        lessons: [
            {
                id: 'tw-1',
                title: 'What is Tailwind CSS?',
                description: 'Introduction to utility-first CSS',
                stage: 1,
                content: `
# What is Tailwind CSS?

Tailwind is a utility-first CSS framework.

## Utility-First Philosophy:
Instead of writing custom CSS, use pre-built utility classes.

\\\`\\\`\\\`html
<!-- Traditional CSS -->
<div class="card">Card content</div>
<style>
.card {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>

<!-- Tailwind CSS -->
<div class="bg-white p-4 rounded-lg shadow">
    Card content
</div>
\\\`\\\`\\\`

## Benefits:
- **No naming**: No more .card-container-wrapper
- **Small bundle**: Only used styles included
- **Consistent**: Design system built-in
- **Responsive**: Mobile-first by default
- **Customizable**: Extend or override easily

## Installation:
\\\`\\\`\\\`bash
npm install -D tailwindcss
npx tailwindcss init
\\\`\\\`\\\`

## Configuration:
\\\`\\\`\\\`javascript
// tailwind.config.js
module.exports = {
    content: ["./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Tailwind CSS is called:',
                        type: 'multiple-choice',
                        options: ['Component-first', 'Utility-first', 'Class-first', 'Style-first'],
                        answer: 1
                    },
                    {
                        prompt: 'The main benefit of utility classes:',
                        type: 'multiple-choice',
                        options: ['Larger CSS files', 'No need for custom class names', 'Slower development', 'More JavaScript'],
                        answer: 1
                    },
                    {
                        prompt: 'The tailwind.config.js content property:',
                        type: 'multiple-choice',
                        options: ['Sets colors', 'Defines which files to scan for classes', 'Sets fonts', 'Adds animations'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-2',
                title: 'Spacing and Sizing',
                description: 'Padding, margin, width, and height',
                stage: 1,
                content: `
# Spacing and Sizing

Consistent spacing scale from 0 to 96.

## Spacing Scale:
| Class | Size |
|-------|------|
| 0 | 0px |
| 1 | 0.25rem (4px) |
| 2 | 0.5rem (8px) |
| 4 | 1rem (16px) |
| 8 | 2rem (32px) |
| 16 | 4rem (64px) |

## Padding:
\\\`\\\`\\\`html
<div class="p-4">All sides padding</div>
<div class="px-4">Horizontal padding</div>
<div class="py-4">Vertical padding</div>
<div class="pt-4">Top padding</div>
<div class="pr-4">Right padding</div>
<div class="pb-4">Bottom padding</div>
<div class="pl-4">Left padding</div>
\\\`\\\`\\\`

## Margin:
\\\`\\\`\\\`html
<div class="m-4">All sides margin</div>
<div class="mx-auto">Center horizontally</div>
<div class="my-4">Vertical margin</div>
<div class="mt-4">Top margin</div>
<div class="-mt-4">Negative top margin</div>
\\\`\\\`\\\`

## Width & Height:
\\\`\\\`\\\`html
<div class="w-full">Width 100%</div>
<div class="w-1/2">Width 50%</div>
<div class="w-64">Width 16rem</div>
<div class="w-screen">Viewport width</div>
<div class="h-screen">Viewport height</div>
<div class="min-h-screen">Min height = viewport</div>
<div class="max-w-lg">Max width large</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'p-4 applies how much padding?',
                        type: 'multiple-choice',
                        options: ['4px', '1rem (16px)', '4rem', '40px'],
                        answer: 1
                    },
                    {
                        prompt: 'To center a block horizontally, use:',
                        type: 'multiple-choice',
                        options: ['m-center', 'mx-auto', 'center', 'align-center'],
                        answer: 1
                    },
                    {
                        prompt: 'w-1/2 means:',
                        type: 'multiple-choice',
                        options: ['0.5px', 'Half the parent width', '2 units', '1.5rem'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-3',
                title: 'Colors',
                description: 'Using Tailwind color palette',
                stage: 1,
                content: `
# Colors

Extensive color palette with shades.

## Color Shades:
50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

## Text Colors:
\\\`\\\`\\\`html
<p class="text-black">Black text</p>
<p class="text-white">White text</p>
<p class="text-gray-500">Gray 500</p>
<p class="text-blue-600">Blue 600</p>
<p class="text-red-500">Red 500</p>
<p class="text-green-400">Green 400</p>
\\\`\\\`\\\`

## Background Colors:
\\\`\\\`\\\`html
<div class="bg-white">White background</div>
<div class="bg-gray-100">Light gray</div>
<div class="bg-blue-500">Blue background</div>
<div class="bg-gradient-to-r from-blue-500 to-purple-500">
    Gradient background
</div>
\\\`\\\`\\\`

## Border Colors:
\\\`\\\`\\\`html
<div class="border border-gray-300">Gray border</div>
<div class="border-2 border-blue-500">Blue 2px border</div>
<div class="border-t-4 border-red-500">Red top border</div>
\\\`\\\`\\\`

## Opacity:
\\\`\\\`\\\`html
<div class="bg-blue-500/50">50% opacity blue</div>
<div class="text-black/75">75% opacity black text</div>
\\\`\\\`\\\`

## Available Colors:
slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose
        `,
                exercises: [
                    {
                        prompt: 'The lower the color number, the:',
                        type: 'multiple-choice',
                        options: ['Darker the color', 'Lighter the color', 'More saturated', 'More transparent'],
                        answer: 1
                    },
                    {
                        prompt: 'To add a blue background, use:',
                        type: 'multiple-choice',
                        options: ['blue-bg-500', 'bg-blue-500', 'background-blue', 'color-blue-500'],
                        answer: 1
                    },
                    {
                        prompt: 'bg-red-500/50 means:',
                        type: 'multiple-choice',
                        options: ['Red divided by 50', 'Red-500 at 50% opacity', 'Half red', '50px red background'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-4',
                title: 'Typography',
                description: 'Font size, weight, and text styling',
                stage: 1,
                content: `
# Typography

Complete text styling utilities.

## Font Size:
\\\`\\\`\\\`html
<p class="text-xs">Extra small</p>
<p class="text-sm">Small</p>
<p class="text-base">Base (default)</p>
<p class="text-lg">Large</p>
<p class="text-xl">Extra large</p>
<p class="text-2xl">2x large</p>
<p class="text-4xl">4x large</p>
<p class="text-6xl">6x large</p>
\\\`\\\`\\\`

## Font Weight:
\\\`\\\`\\\`html
<p class="font-thin">Thin (100)</p>
<p class="font-light">Light (300)</p>
<p class="font-normal">Normal (400)</p>
<p class="font-medium">Medium (500)</p>
<p class="font-semibold">Semibold (600)</p>
<p class="font-bold">Bold (700)</p>
<p class="font-extrabold">Extra Bold (800)</p>
\\\`\\\`\\\`

## Text Alignment & Decoration:
\\\`\\\`\\\`html
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>
<p class="underline">Underlined</p>
<p class="line-through">Strikethrough</p>
<p class="uppercase">UPPERCASE</p>
<p class="lowercase">lowercase</p>
<p class="capitalize">Capitalize</p>
<p class="italic">Italic text</p>
\\\`\\\`\\\`

## Line Height:
\\\`\\\`\\\`html
<p class="leading-none">No extra line height</p>
<p class="leading-tight">Tight line height</p>
<p class="leading-normal">Normal line height</p>
<p class="leading-loose">Loose line height</p>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'text-2xl sets:',
                        type: 'multiple-choice',
                        options: ['Font weight', 'Font size', 'Line height', 'Letter spacing'],
                        answer: 1
                    },
                    {
                        prompt: 'To make text bold, use:',
                        type: 'multiple-choice',
                        options: ['text-bold', 'font-bold', 'bold', 'weight-bold'],
                        answer: 1
                    },
                    {
                        prompt: 'The capitalize class:',
                        type: 'multiple-choice',
                        options: ['Makes all caps', 'Capitalizes first letter of each word', 'Makes lowercase', 'Does nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-5',
                title: 'Flexbox',
                description: 'Flexible box layout',
                stage: 2,
                content: `
# Flexbox

Powerful layout with flex utilities.

## Enable Flexbox:
\\\`\\\`\\\`html
<div class="flex">Flex container</div>
<div class="inline-flex">Inline flex</div>
\\\`\\\`\\\`

## Direction:
\\\`\\\`\\\`html
<div class="flex flex-row">Row (default)</div>
<div class="flex flex-col">Column</div>
<div class="flex flex-row-reverse">Row reverse</div>
<div class="flex flex-col-reverse">Column reverse</div>
\\\`\\\`\\\`

## Justify (Main Axis):
\\\`\\\`\\\`html
<div class="flex justify-start">Start</div>
<div class="flex justify-center">Center</div>
<div class="flex justify-end">End</div>
<div class="flex justify-between">Space between</div>
<div class="flex justify-around">Space around</div>
<div class="flex justify-evenly">Space evenly</div>
\\\`\\\`\\\`

## Align (Cross Axis):
\\\`\\\`\\\`html
<div class="flex items-start">Top</div>
<div class="flex items-center">Center</div>
<div class="flex items-end">Bottom</div>
<div class="flex items-stretch">Stretch</div>
\\\`\\\`\\\`

## Common Patterns:
\\\`\\\`\\\`html
<!-- Center everything -->
<div class="flex items-center justify-center h-screen">
    Perfectly centered
</div>

<!-- Space between header items -->
<nav class="flex justify-between items-center p-4">
    <div>Logo</div>
    <div>Menu</div>
</nav>

<!-- Gap between items -->
<div class="flex gap-4">
    <div>Item 1</div>
    <div>Item 2</div>
    <div>Item 3</div>
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'To center items vertically and horizontally:',
                        type: 'multiple-choice',
                        options: ['flex center', 'flex items-center justify-center', 'flex align-center', 'flex middle'],
                        answer: 1
                    },
                    {
                        prompt: 'justify-between distributes items:',
                        type: 'multiple-choice',
                        options: ['In the center', 'With equal space between them', 'At the start', 'Randomly'],
                        answer: 1
                    },
                    {
                        prompt: 'gap-4 adds:',
                        type: 'multiple-choice',
                        options: ['Padding', 'Margin', 'Space between flex items', 'Border'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'tw-6',
                title: 'Grid Layout',
                description: 'CSS Grid with Tailwind',
                stage: 2,
                content: `
# Grid Layout

Two-dimensional layouts with grid.

## Basic Grid:
\\\`\\\`\\\`html
<!-- 3 columns -->
<div class="grid grid-cols-3 gap-4">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
\\\`\\\`\\\`

## Column Spans:
\\\`\\\`\\\`html
<div class="grid grid-cols-6 gap-4">
    <div class="col-span-2">Spans 2 columns</div>
    <div class="col-span-4">Spans 4 columns</div>
    <div class="col-span-full">Full width</div>
</div>
\\\`\\\`\\\`

## Row Spans:
\\\`\\\`\\\`html
<div class="grid grid-cols-3 grid-rows-3 gap-4">
    <div class="row-span-2">Spans 2 rows</div>
    <div>Normal</div>
    <div>Normal</div>
</div>
\\\`\\\`\\\`

## Responsive Grid:
\\\`\\\`\\\`html
<!-- 1 col on mobile, 2 on tablet, 4 on desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
    <div>Item</div>
</div>
\\\`\\\`\\\`

## Auto-fit Grid:
\\\`\\\`\\\`html
<!-- Cards that auto-fill -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
    <div class="bg-white p-4 rounded">Card</div>
    <div class="bg-white p-4 rounded">Card</div>
    <div class="bg-white p-4 rounded">Card</div>
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'grid-cols-3 creates:',
                        type: 'multiple-choice',
                        options: ['3 rows', '3 columns', '3 items', '3 gaps'],
                        answer: 1
                    },
                    {
                        prompt: 'col-span-2 makes an item:',
                        type: 'multiple-choice',
                        options: ['Half width', 'Span 2 columns', 'Have 2 children', '2rem wide'],
                        answer: 1
                    },
                    {
                        prompt: 'col-span-full spans:',
                        type: 'multiple-choice',
                        options: ['Half the grid', 'All columns', 'One column', 'No columns'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-7',
                title: 'Responsive Design',
                description: 'Mobile-first breakpoints',
                stage: 2,
                content: `
# Responsive Design

Mobile-first breakpoint prefixes.

## Breakpoints:
| Prefix | Min Width | CSS |
|--------|-----------|-----|
| sm | 640px | @media (min-width: 640px) |
| md | 768px | @media (min-width: 768px) |
| lg | 1024px | @media (min-width: 1024px) |
| xl | 1280px | @media (min-width: 1280px) |
| 2xl | 1536px | @media (min-width: 1536px) |

## Mobile-First Approach:
\\\`\\\`\\\`html
<!-- Start with mobile, add larger breakpoints -->
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
    Responsive text
</div>

<!-- Stack on mobile, row on larger -->
<div class="flex flex-col md:flex-row">
    <div>Sidebar</div>
    <div>Main content</div>
</div>
\\\`\\\`\\\`

## Common Patterns:
\\\`\\\`\\\`html
<!-- Hide/show at breakpoints -->
<div class="hidden md:block">Only shows on md and up</div>
<div class="block md:hidden">Only shows on mobile</div>

<!-- Responsive padding -->
<div class="p-4 md:p-8 lg:p-12">
    More padding on larger screens
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div>Card</div>
    <div>Card</div>
    <div>Card</div>
    <div>Card</div>
</div>

<!-- Responsive width -->
<div class="w-full md:w-1/2 lg:w-1/3">
    Responsive width
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Tailwind is mobile-first, meaning:',
                        type: 'multiple-choice',
                        options: ['Desktop styles apply first', 'Unprefixed classes apply to all sizes', 'Mobile is not supported', 'You must use sm: prefix'],
                        answer: 1
                    },
                    {
                        prompt: 'md:hidden hides elements:',
                        type: 'multiple-choice',
                        options: ['On mobile', 'On medium screens and up', 'On all screens', 'Only on md'],
                        answer: 1
                    },
                    {
                        prompt: 'The lg breakpoint starts at:',
                        type: 'multiple-choice',
                        options: ['640px', '768px', '1024px', '1280px'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'tw-8',
                title: 'Hover, Focus, and States',
                description: 'Interactive state styling',
                stage: 2,
                content: `
# State Modifiers

Style different interactive states.

## Hover:
\\\`\\\`\\\`html
<button class="bg-blue-500 hover:bg-blue-600">
    Hover me
</button>

<a class="text-gray-600 hover:text-blue-500 hover:underline">
    Link
</a>
\\\`\\\`\\\`

## Focus:
\\\`\\\`\\\`html
<input class="border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none" />

<button class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
    Click me
</button>
\\\`\\\`\\\`

## Active:
\\\`\\\`\\\`html
<button class="bg-blue-500 active:bg-blue-700">
    Press me
</button>
\\\`\\\`\\\`

## Group Hover:
\\\`\\\`\\\`html
<div class="group p-4 hover:bg-gray-100">
    <h3 class="group-hover:text-blue-500">Title</h3>
    <p class="group-hover:text-gray-700">Description</p>
</div>
\\\`\\\`\\\`

## Disabled:
\\\`\\\`\\\`html
<button class="bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed" disabled>
    Disabled
</button>
\\\`\\\`\\\`

## First/Last Child:
\\\`\\\`\\\`html
<ul>
    <li class="first:pt-0 last:pb-0 py-2">Item</li>
    <li class="first:pt-0 last:pb-0 py-2">Item</li>
    <li class="first:pt-0 last:pb-0 py-2">Item</li>
</ul>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'hover:bg-blue-600 applies:',
                        type: 'multiple-choice',
                        options: ['Always', 'When mouse hovers', 'When clicked', 'When focused'],
                        answer: 1
                    },
                    {
                        prompt: 'The group class enables:',
                        type: 'multiple-choice',
                        options: ['Grid layout', 'Styling children when parent is hovered', 'Flex layout', 'Grouping by color'],
                        answer: 1
                    },
                    {
                        prompt: 'focus:ring adds:',
                        type: 'multiple-choice',
                        options: ['Border', 'Shadow ring around element', 'Background', 'Padding'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-9',
                title: 'Borders and Rounded Corners',
                description: 'Border styling utilities',
                stage: 2,
                content: `
# Borders and Rounded Corners

Border width, color, and radius.

## Border Width:
\\\`\\\`\\\`html
<div class="border">1px all sides</div>
<div class="border-2">2px border</div>
<div class="border-4">4px border</div>
<div class="border-t-2">2px top only</div>
<div class="border-r-4">4px right only</div>
<div class="border-x-2">2px left and right</div>
\\\`\\\`\\\`

## Border Color:
\\\`\\\`\\\`html
<div class="border border-gray-300">Gray border</div>
<div class="border-2 border-blue-500">Blue border</div>
<div class="border-t-4 border-red-500">Red top border</div>
\\\`\\\`\\\`

## Border Radius:
\\\`\\\`\\\`html
<div class="rounded-none">No rounding</div>
<div class="rounded-sm">Small rounding</div>
<div class="rounded">Default rounding</div>
<div class="rounded-md">Medium rounding</div>
<div class="rounded-lg">Large rounding</div>
<div class="rounded-xl">Extra large</div>
<div class="rounded-full">Fully round (circle/pill)</div>

<!-- Per corner -->
<div class="rounded-t-lg">Top corners</div>
<div class="rounded-bl-lg">Bottom-left corner</div>
\\\`\\\`\\\`

## Divide (Between Children):
\\\`\\\`\\\`html
<div class="divide-y divide-gray-200">
    <div class="py-4">Item 1</div>
    <div class="py-4">Item 2</div>
    <div class="py-4">Item 3</div>
</div>
\\\`\\\`\\\`

## Ring (Focus Ring):
\\\`\\\`\\\`html
<button class="ring-2 ring-blue-500 ring-offset-2">
    Button with ring
</button>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'rounded-full creates:',
                        type: 'multiple-choice',
                        options: ['Square corners', 'Circle or pill shape', 'Slight rounding', 'No effect'],
                        answer: 1
                    },
                    {
                        prompt: 'border without a number adds:',
                        type: 'multiple-choice',
                        options: ['No border', '1px border', '2px border', '4px border'],
                        answer: 1
                    },
                    {
                        prompt: 'divide-y adds:',
                        type: 'multiple-choice',
                        options: ['Border to container', 'Horizontal lines between children', 'Vertical lines between children', 'Padding'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-10',
                title: 'Shadows and Effects',
                description: 'Box shadows and visual effects',
                stage: 3,
                content: `
# Shadows and Effects

Add depth and visual effects.

## Box Shadows:
\\\`\\\`\\\`html
<div class="shadow-sm">Small shadow</div>
<div class="shadow">Default shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="shadow-2xl">2x large shadow</div>
<div class="shadow-inner">Inner shadow</div>
<div class="shadow-none">No shadow</div>
\\\`\\\`\\\`

## Colored Shadows:
\\\`\\\`\\\`html
<div class="shadow-lg shadow-blue-500/50">
    Blue shadow
</div>
<div class="shadow-xl shadow-red-500/30">
    Red shadow
</div>
\\\`\\\`\\\`

## Opacity:
\\\`\\\`\\\`html
<div class="opacity-100">Full opacity</div>
<div class="opacity-75">75% opacity</div>
<div class="opacity-50">50% opacity</div>
<div class="opacity-25">25% opacity</div>
<div class="opacity-0">Invisible</div>
\\\`\\\`\\\`

## Blur and Filters:
\\\`\\\`\\\`html
<div class="blur-sm">Slight blur</div>
<div class="blur">Blur</div>
<div class="blur-lg">Large blur</div>

<div class="grayscale">Grayscale</div>
<div class="sepia">Sepia tone</div>
<div class="brightness-150">Brighter</div>
<div class="contrast-125">More contrast</div>
\\\`\\\`\\\`

## Backdrop Blur:
\\\`\\\`\\\`html
<div class="backdrop-blur-sm bg-white/30">
    Frosted glass effect
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'shadow-lg adds:',
                        type: 'multiple-choice',
                        options: ['Border', 'Drop shadow', 'Background', 'Padding'],
                        answer: 1
                    },
                    {
                        prompt: 'opacity-50 makes element:',
                        type: 'multiple-choice',
                        options: ['Fully visible', '50% transparent', 'Invisible', '50px wide'],
                        answer: 1
                    },
                    {
                        prompt: 'backdrop-blur affects:',
                        type: 'multiple-choice',
                        options: ['The element itself', 'Content behind the element', 'Child elements', 'Parent element'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-11',
                title: 'Transitions and Animations',
                description: 'Smooth transitions and animations',
                stage: 3,
                content: `
# Transitions and Animations

Smooth state changes and animations.

## Transitions:
\\\`\\\`\\\`html
<!-- Basic transition -->
<button class="bg-blue-500 hover:bg-blue-600 transition">
    Smooth color change
</button>

<!-- Specific properties -->
<div class="transition-colors duration-300">Color transition</div>
<div class="transition-opacity duration-500">Opacity transition</div>
<div class="transition-transform duration-200">Transform transition</div>
<div class="transition-all duration-300">All properties</div>
\\\`\\\`\\\`

## Duration:
\\\`\\\`\\\`html
<div class="transition duration-75">75ms</div>
<div class="transition duration-150">150ms</div>
<div class="transition duration-300">300ms</div>
<div class="transition duration-500">500ms</div>
<div class="transition duration-700">700ms</div>
\\\`\\\`\\\`

## Easing:
\\\`\\\`\\\`html
<div class="transition ease-linear">Linear</div>
<div class="transition ease-in">Ease in</div>
<div class="transition ease-out">Ease out</div>
<div class="transition ease-in-out">Ease in-out</div>
\\\`\\\`\\\`

## Animations:
\\\`\\\`\\\`html
<div class="animate-spin">Spinning</div>
<div class="animate-ping">Pinging</div>
<div class="animate-pulse">Pulsing</div>
<div class="animate-bounce">Bouncing</div>
\\\`\\\`\\\`

## Hover Transform:
\\\`\\\`\\\`html
<button class="transform hover:scale-105 transition duration-300">
    Grow on hover
</button>

<div class="transform hover:-translate-y-2 transition">
    Float up on hover
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'transition-colors enables smooth transition of:',
                        type: 'multiple-choice',
                        options: ['Size changes', 'Color changes', 'Position changes', 'All changes'],
                        answer: 1
                    },
                    {
                        prompt: 'duration-300 means:',
                        type: 'multiple-choice',
                        options: ['300 seconds', '300 milliseconds', '3 seconds', '30 milliseconds'],
                        answer: 1
                    },
                    {
                        prompt: 'animate-spin creates:',
                        type: 'multiple-choice',
                        options: ['Loading spinner effect', 'Fade effect', 'Bounce effect', 'Pulse effect'],
                        answer: 0
                    }
                ]
            },
            {
                id: 'tw-12',
                title: 'Transforms',
                description: 'Scale, rotate, and translate elements',
                stage: 3,
                content: `
# Transforms

Scale, rotate, translate, and skew elements.

## Scale:
\\\`\\\`\\\`html
<div class="scale-50">Half size</div>
<div class="scale-75">75% size</div>
<div class="scale-100">Normal</div>
<div class="scale-110">110% size</div>
<div class="scale-150">150% size</div>

<!-- X or Y only -->
<div class="scale-x-150">Stretch horizontally</div>
<div class="scale-y-50">Compress vertically</div>
\\\`\\\`\\\`

## Rotate:
\\\`\\\`\\\`html
<div class="rotate-0">No rotation</div>
<div class="rotate-45">45 degrees</div>
<div class="rotate-90">90 degrees</div>
<div class="rotate-180">180 degrees</div>
<div class="-rotate-45">Negative 45 degrees</div>
\\\`\\\`\\\`

## Translate:
\\\`\\\`\\\`html
<div class="translate-x-4">Move right 1rem</div>
<div class="-translate-x-4">Move left 1rem</div>
<div class="translate-y-4">Move down 1rem</div>
<div class="-translate-y-4">Move up 1rem</div>

<!-- Center trick -->
<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    Perfectly centered
</div>
\\\`\\\`\\\`

## Skew:
\\\`\\\`\\\`html
<div class="skew-x-6">Skew horizontally</div>
<div class="skew-y-6">Skew vertically</div>
\\\`\\\`\\\`

## Transform Origin:
\\\`\\\`\\\`html
<div class="origin-center">Center (default)</div>
<div class="origin-top">Top</div>
<div class="origin-top-right">Top right</div>
<div class="origin-bottom-left">Bottom left</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'scale-150 makes element:',
                        type: 'multiple-choice',
                        options: ['50% smaller', '50% larger', '150px wide', 'Invisible'],
                        answer: 1
                    },
                    {
                        prompt: 'rotate-90 rotates by:',
                        type: 'multiple-choice',
                        options: ['90 pixels', '90 degrees', '9 degrees', '90 percent'],
                        answer: 1
                    },
                    {
                        prompt: '-translate-y-4 moves element:',
                        type: 'multiple-choice',
                        options: ['Down', 'Up', 'Right', 'Left'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-13',
                title: 'Position and Z-Index',
                description: 'Positioning elements',
                stage: 3,
                content: `
# Position and Z-Index

Control element positioning.

## Position Types:
\\\`\\\`\\\`html
<div class="static">Static (default)</div>
<div class="relative">Relative</div>
<div class="absolute">Absolute</div>
<div class="fixed">Fixed</div>
<div class="sticky">Sticky</div>
\\\`\\\`\\\`

## Position Values:
\\\`\\\`\\\`html
<div class="absolute top-0 left-0">Top-left corner</div>
<div class="absolute top-0 right-0">Top-right corner</div>
<div class="absolute bottom-0 left-0">Bottom-left corner</div>
<div class="absolute inset-0">Fill container</div>
<div class="absolute inset-x-0 top-0">Full width at top</div>
\\\`\\\`\\\`

## Fixed Header:
\\\`\\\`\\\`html
<header class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
    Fixed header
</header>
<main class="pt-16">Content below header</main>
\\\`\\\`\\\`

## Sticky Sidebar:
\\\`\\\`\\\`html
<aside class="sticky top-4">
    Sticks when scrolling
</aside>
\\\`\\\`\\\`

## Z-Index:
\\\`\\\`\\\`html
<div class="z-0">Level 0</div>
<div class="z-10">Level 10</div>
<div class="z-20">Level 20</div>
<div class="z-50">Level 50</div>
<div class="z-auto">Auto</div>
<div class="-z-10">Behind</div>
\\\`\\\`\\\`

## Centered Modal:
\\\`\\\`\\\`html
<div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div class="bg-white p-6 rounded-lg">
        Modal content
    </div>
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'inset-0 sets:',
                        type: 'multiple-choice',
                        options: ['Width and height', 'top, right, bottom, left to 0', 'Margin', 'Padding'],
                        answer: 1
                    },
                    {
                        prompt: 'fixed position is relative to:',
                        type: 'multiple-choice',
                        options: ['Parent element', 'Viewport', 'Document', 'Nearest positioned ancestor'],
                        answer: 1
                    },
                    {
                        prompt: 'Higher z-index appears:',
                        type: 'multiple-choice',
                        options: ['Behind', 'In front', 'Below', 'The same'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-14',
                title: 'Dark Mode',
                description: 'Implementing dark mode',
                stage: 3,
                content: `
# Dark Mode

Built-in dark mode support.

## Enable Dark Mode:
\\\`\\\`\\\`javascript
// tailwind.config.js
module.exports = {
    darkMode: 'class', // or 'media'
    // ...
}
\\\`\\\`\\\`

## Using Dark Mode:
\\\`\\\`\\\`html
<!-- Add 'dark' class to html or a parent -->
<html class="dark">

<!-- Use dark: prefix -->
<div class="bg-white dark:bg-gray-900">
    <h1 class="text-black dark:text-white">
        Title
    </h1>
    <p class="text-gray-600 dark:text-gray-300">
        Description
    </p>
</div>
\\\`\\\`\\\`

## Toggle Dark Mode:
\\\`\\\`\\\`javascript
// JavaScript to toggle
document.documentElement.classList.toggle('dark');

// With localStorage
if (localStorage.theme === 'dark' || 
    (!('theme' in localStorage) && 
     window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}
\\\`\\\`\\\`

## Dark Mode Card:
\\\`\\\`\\\`html
<div class="bg-white dark:bg-gray-800 
            text-gray-900 dark:text-white 
            shadow-lg dark:shadow-gray-900/50 
            p-6 rounded-lg">
    <h2 class="text-xl font-bold">Card Title</h2>
    <p class="text-gray-600 dark:text-gray-300">
        Card description
    </p>
    <button class="bg-blue-500 dark:bg-blue-600 
                   hover:bg-blue-600 dark:hover:bg-blue-700 
                   text-white px-4 py-2 rounded">
        Action
    </button>
</div>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'darkMode: "class" means dark mode activates when:',
                        type: 'multiple-choice',
                        options: ['System preference', 'dark class is on html/parent', 'Automatically at night', 'Never'],
                        answer: 1
                    },
                    {
                        prompt: 'dark:bg-gray-900 applies:',
                        type: 'multiple-choice',
                        options: ['Always', 'Only in light mode', 'Only in dark mode', 'Never'],
                        answer: 2
                    },
                    {
                        prompt: 'darkMode: "media" uses:',
                        type: 'multiple-choice',
                        options: ['Class toggle', 'System color scheme preference', 'Local storage', 'Cookies'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-15',
                title: 'Custom Configuration',
                description: 'Extending and customizing Tailwind',
                stage: 4,
                content: `
# Custom Configuration

Customize Tailwind for your project.

## Extending Theme:
\\\`\\\`\\\`javascript
// tailwind.config.js
module.exports = {
    theme: {
        extend: {
            colors: {
                brand: {
                    light: '#3fbaeb',
                    DEFAULT: '#0fa9e6',
                    dark: '#0c87b8',
                },
                primary: '#1e40af',
                secondary: '#7c3aed',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Poppins', 'sans-serif'],
            },
            spacing: {
                '128': '32rem',
                '144': '36rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
        },
    },
}
\\\`\\\`\\\`

## Using Custom Values:
\\\`\\\`\\\`html
<div class="bg-brand">Default brand</div>
<div class="bg-brand-light">Light brand</div>
<div class="bg-primary">Primary color</div>
<div class="font-display">Display font</div>
<div class="w-128">Custom width</div>
<div class="rounded-4xl">Custom radius</div>
\\\`\\\`\\\`

## Custom Breakpoints:
\\\`\\\`\\\`javascript
module.exports = {
    theme: {
        screens: {
            'xs': '475px',
            'sm': '640px',
            'md': '768px',
            'lg': '1024px',
            'xl': '1280px',
            '2xl': '1536px',
            '3xl': '1920px',
        },
    },
}
\\\`\\\`\\\`

## Adding Plugins:
\\\`\\\`\\\`javascript
module.exports = {
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
    ],
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'extend in theme config:',
                        type: 'multiple-choice',
                        options: ['Replaces default values', 'Adds to default values', 'Removes values', 'Does nothing'],
                        answer: 1
                    },
                    {
                        prompt: 'Custom colors are defined in:',
                        type: 'multiple-choice',
                        options: ['CSS file', 'tailwind.config.js theme.extend.colors', 'HTML file', 'package.json'],
                        answer: 1
                    },
                    {
                        prompt: '@tailwindcss/forms plugin:',
                        type: 'multiple-choice',
                        options: ['Creates form components', 'Provides form reset styles', 'Validates forms', 'Submits forms'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-16',
                title: 'Building Components',
                description: 'Common UI component patterns',
                stage: 4,
                content: `
# Building Components

Common UI patterns with Tailwind.

## Button:
\\\`\\\`\\\`html
<button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 
               text-white font-medium py-2 px-4 rounded-lg
               transition duration-200 ease-in-out
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
               disabled:opacity-50 disabled:cursor-not-allowed">
    Button
</button>
\\\`\\\`\\\`

## Card:
\\\`\\\`\\\`html
<div class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
    <img src="image.jpg" class="w-full h-48 object-cover" />
    <div class="p-6">
        <h3 class="text-xl font-bold text-gray-900">Card Title</h3>
        <p class="text-gray-600 mt-2">Card description</p>
        <button class="mt-4 text-blue-500 hover:text-blue-600 font-medium">
            Learn more →
        </button>
    </div>
</div>
\\\`\\\`\\\`

## Input:
\\\`\\\`\\\`html
<input type="text" 
       class="w-full px-4 py-2 border border-gray-300 rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              placeholder-gray-400"
       placeholder="Enter text..." />
\\\`\\\`\\\`

## Badge:
\\\`\\\`\\\`html
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full 
             text-xs font-medium bg-green-100 text-green-800">
    Active
</span>
\\\`\\\`\\\`

## Avatar:
\\\`\\\`\\\`html
<img src="avatar.jpg" 
     class="w-10 h-10 rounded-full ring-2 ring-white object-cover" />
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'object-cover on images:',
                        type: 'multiple-choice',
                        options: ['Stretches the image', 'Crops to fill while maintaining aspect ratio', 'Shrinks the image', 'Adds border'],
                        answer: 1
                    },
                    {
                        prompt: 'rounded-full on a square element creates:',
                        type: 'multiple-choice',
                        options: ['Square', 'Circle', 'Oval', 'Rounded rectangle'],
                        answer: 1
                    },
                    {
                        prompt: 'overflow-hidden on a card:',
                        type: 'multiple-choice',
                        options: ['Shows all content', 'Clips content to rounded corners', 'Adds scroll', 'Does nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-17',
                title: 'Layouts and Patterns',
                description: 'Common layout structures',
                stage: 4,
                content: `
# Layouts and Patterns

Common page layouts with Tailwind.

## Holy Grail Layout:
\\\`\\\`\\\`html
<div class="min-h-screen flex flex-col">
    <header class="bg-white shadow p-4">Header</header>
    
    <div class="flex flex-1">
        <aside class="w-64 bg-gray-100 p-4">Sidebar</aside>
        <main class="flex-1 p-4">Main content</main>
    </div>
    
    <footer class="bg-gray-800 text-white p-4">Footer</footer>
</div>
\\\`\\\`\\\`

## Navbar:
\\\`\\\`\\\`html
<nav class="bg-white shadow">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16 items-center">
            <div class="font-bold text-xl">Logo</div>
            <div class="hidden md:flex space-x-4">
                <a href="#" class="text-gray-700 hover:text-blue-500">Home</a>
                <a href="#" class="text-gray-700 hover:text-blue-500">About</a>
                <a href="#" class="text-gray-700 hover:text-blue-500">Contact</a>
            </div>
            <button class="md:hidden">Menu</button>
        </div>
    </div>
</nav>
\\\`\\\`\\\`

## Centered Container:
\\\`\\\`\\\`html
<div class="max-w-4xl mx-auto px-4">
    Centered content with max width
</div>

<!-- Or use container class -->
<div class="container mx-auto px-4">
    Container content
</div>
\\\`\\\`\\\`

## Hero Section:
\\\`\\\`\\\`html
<section class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="text-center text-white px-4">
        <h1 class="text-5xl font-bold mb-4">Welcome</h1>
        <p class="text-xl mb-8">Build amazing things</p>
        <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100">
            Get Started
        </button>
    </div>
</section>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'flex-1 makes an element:',
                        type: 'multiple-choice',
                        options: ['Fixed width', 'Grow to fill available space', 'Shrink to minimum', '1px wide'],
                        answer: 1
                    },
                    {
                        prompt: 'max-w-7xl mx-auto centers:',
                        type: 'multiple-choice',
                        options: ['Vertically', 'Horizontally with max width', 'Both ways', 'At top'],
                        answer: 1
                    },
                    {
                        prompt: 'min-h-screen ensures:',
                        type: 'multiple-choice',
                        options: ['Maximum height', 'At least viewport height', 'Fixed height', 'No height'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-18',
                title: '@apply and CSS',
                description: 'Using Tailwind in CSS files',
                stage: 4,
                content: `
# @apply Directive

Extract repeated patterns to CSS classes.

## Using @apply:
\\\`\\\`\\\`css
/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
    .btn {
        @apply px-4 py-2 rounded-lg font-medium transition;
    }
    
    .btn-primary {
        @apply btn bg-blue-500 text-white hover:bg-blue-600;
    }
    
    .btn-secondary {
        @apply btn bg-gray-200 text-gray-800 hover:bg-gray-300;
    }
    
    .card {
        @apply bg-white rounded-xl shadow-lg p-6;
    }
    
    .input {
        @apply w-full px-4 py-2 border border-gray-300 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500;
    }
}
\\\`\\\`\\\`

## Usage:
\\\`\\\`\\\`html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<div class="card">Card content</div>
<input class="input" placeholder="Enter text..." />
\\\`\\\`\\\`

## When to Use @apply:
✅ Highly reused patterns (buttons, inputs)
✅ Multi-element components
✅ Base styles for a component library

❌ One-off styles
❌ Layout utilities
❌ Responsive variations

## Prose Plugin for Content:
\\\`\\\`\\\`html
<article class="prose lg:prose-xl">
    <h1>Title</h1>
    <p>Content styled automatically...</p>
</article>
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: '@apply is used in:',
                        type: 'multiple-choice',
                        options: ['HTML files', 'CSS files', 'JavaScript files', 'Config files'],
                        answer: 1
                    },
                    {
                        prompt: '@layer components ensures:',
                        type: 'multiple-choice',
                        options: ['Highest specificity', 'Proper cascade order', 'No CSS output', 'Faster loading'],
                        answer: 1
                    },
                    {
                        prompt: 'The prose class is from:',
                        type: 'multiple-choice',
                        options: ['Core Tailwind', '@tailwindcss/typography plugin', '@tailwindcss/forms plugin', 'Browser default'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'tw-19',
                title: 'Tailwind with React',
                description: 'Using Tailwind in React projects',
                stage: 4,
                content: `
# Tailwind with React

Best practices for Tailwind in React.

## Conditional Classes:
\\\`\\\`\\\`jsx
function Button({ variant, disabled, children }) {
    const baseClasses = "px-4 py-2 rounded-lg font-medium transition";
    const variantClasses = {
        primary: "bg-blue-500 text-white hover:bg-blue-600",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-500 text-white hover:bg-red-600",
    };
    
    return (
        <button 
            className={\`\${baseClasses} \${variantClasses[variant]} 
                       \${disabled ? 'opacity-50 cursor-not-allowed' : ''}\`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
\\\`\\\`\\\`

## Using clsx/classnames:
\\\`\\\`\\\`jsx
import clsx from 'clsx';

function Button({ variant, size, disabled }) {
    return (
        <button className={clsx(
            'rounded-lg font-medium transition',
            {
                'bg-blue-500 text-white': variant === 'primary',
                'bg-gray-200 text-gray-800': variant === 'secondary',
                'px-2 py-1 text-sm': size === 'small',
                'px-4 py-2': size === 'medium',
                'px-6 py-3 text-lg': size === 'large',
                'opacity-50 cursor-not-allowed': disabled,
            }
        )}>
            Button
        </button>
    );
}
\\\`\\\`\\\`

## Tailwind Merge:
\\\`\\\`\\\`jsx
import { twMerge } from 'tailwind-merge';

function Button({ className, children }) {
    return (
        <button className={twMerge(
            'bg-blue-500 px-4 py-2 rounded',
            className  // Override with custom classes
        )}>
            {children}
        </button>
    );
}

// Usage - custom class overrides
<Button className="bg-green-500">Green Button</Button>
\\\`\\\`\\\`

Congratulations! You've completed Tailwind CSS! 🎨
        `,
                exercises: [
                    {
                        prompt: 'clsx is used for:',
                        type: 'multiple-choice',
                        options: ['Compiling Tailwind', 'Conditionally joining class names', 'Minifying CSS', 'Adding animations'],
                        answer: 1
                    },
                    {
                        prompt: 'tailwind-merge helps with:',
                        type: 'multiple-choice',
                        options: ['Combining config files', 'Resolving conflicting Tailwind classes', 'Merging components', 'Database merging'],
                        answer: 1
                    },
                    {
                        prompt: 'Template literals in className allow:',
                        type: 'multiple-choice',
                        options: ['Only static strings', 'Dynamic class composition', 'Faster rendering', 'Type checking'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // Electron Course
    'electron': {
        id: 'electron',
        name: 'Electron Development',
        description: 'Build cross-platform desktop applications with web technologies.',
        category: 'frameworks',
        icon: '🖥️',
        color: '#47848f',
        language: 'javascript',
        prerequisites: ['javascript', 'html'],
        estimatedHours: 1.5,
        lessons: [
            {
                id: 'elec-1',
                title: 'What is Electron?',
                description: 'Introduction to Electron framework',
                stage: 1,
                content: `
# What is Electron?

Electron enables building desktop apps with web technologies.

## How It Works:
- **Chromium**: Renders the UI
- **Node.js**: Backend capabilities
- **Native APIs**: System integration

## Popular Electron Apps:
- VS Code
- Discord
- Slack
- Figma Desktop
- Notion

## Architecture:
\\\`\\\`\\\`
┌─────────────────────────────────────┐
│           Main Process              │
│  (Node.js - one per app)           │
│  - Creates windows                  │
│  - System APIs                      │
│  - File system access               │
└──────────────┬──────────────────────┘
               │ IPC (Inter-Process Communication)
┌──────────────┴──────────────────────┐
│         Renderer Processes          │
│  (Chromium - one per window)       │
│  - HTML/CSS/JavaScript              │
│  - Your React/Vue/Angular app       │
└─────────────────────────────────────┘
\\\`\\\`\\\`

## Pros & Cons:
**Pros:**
- One codebase for Windows, Mac, Linux
- Use familiar web technologies
- Rich ecosystem (npm)

**Cons:**
- Larger app size (~100MB+)
- Higher memory usage
- Not truly native feel
        `,
                exercises: [
                    {
                        prompt: 'Electron combines which technologies?',
                        type: 'multiple-choice',
                        options: ['Python and C++', 'Chromium and Node.js', 'Java and Swift', 'Ruby and Go'],
                        answer: 1
                    },
                    {
                        prompt: 'The main process is responsible for:',
                        type: 'multiple-choice',
                        options: ['Rendering UI', 'Creating windows and system APIs', 'CSS styling', 'Database queries'],
                        answer: 1
                    },
                    {
                        prompt: 'How many main processes does an Electron app have?',
                        type: 'multiple-choice',
                        options: ['One per window', 'One per app', 'Unlimited', 'Zero'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-2',
                title: 'Project Setup',
                description: 'Creating your first Electron app',
                stage: 1,
                content: `
# Project Setup

Create an Electron project from scratch.

## Initialize Project:
\\\`\\\`\\\`bash
mkdir my-electron-app
cd my-electron-app
npm init -y
npm install electron --save-dev
\\\`\\\`\\\`

## Project Structure:
\\\`\\\`\\\`
my-electron-app/
├── package.json
├── main.js          # Main process
├── preload.js       # Bridge script
└── index.html       # Renderer content
\\\`\\\`\\\`

## package.json:
\\\`\\\`\\\`json
{
    "name": "my-electron-app",
    "version": "1.0.0",
    "main": "main.js",
    "scripts": {
        "start": "electron ."
    },
    "devDependencies": {
        "electron": "^28.0.0"
    }
}
\\\`\\\`\\\`

## main.js:
\\\`\\\`\\\`javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
\\\`\\\`\\\`

## Run:
\\\`\\\`\\\`bash
npm start
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'The main entry point is defined in package.json as:',
                        type: 'multiple-choice',
                        options: ['entry', 'start', 'main', 'index'],
                        answer: 2
                    },
                    {
                        prompt: 'To run an Electron app in development:',
                        type: 'multiple-choice',
                        options: ['electron start', 'npm start (with electron . script)', 'node main.js', 'electron build'],
                        answer: 1
                    },
                    {
                        prompt: 'BrowserWindow is used to:',
                        type: 'multiple-choice',
                        options: ['Open web browser', 'Create application windows', 'Parse HTML', 'Handle network requests'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-3',
                title: 'BrowserWindow Options',
                description: 'Configuring window appearance and behavior',
                stage: 1,
                content: `
# BrowserWindow Options

Customize your application windows.

## Common Options:
\\\`\\\`\\\`javascript
const win = new BrowserWindow({
    // Size
    width: 1200,
    height: 800,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 1920,
    maxHeight: 1080,
    
    // Position
    x: 100,
    y: 100,
    center: true,
    
    // Appearance
    title: 'My App',
    icon: path.join(__dirname, 'icon.png'),
    backgroundColor: '#1e1e1e',
    
    // Frame
    frame: true,           // Show title bar
    titleBarStyle: 'hidden', // macOS
    transparent: false,
    
    // Behavior
    resizable: true,
    movable: true,
    minimizable: true,
    maximizable: true,
    closable: true,
    alwaysOnTop: false,
    fullscreenable: true,
    
    // Security
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true,
        sandbox: true
    }
});
\\\`\\\`\\\`

## Frameless Window:
\\\`\\\`\\\`javascript
const win = new BrowserWindow({
    frame: false,
    transparent: true,
    backgroundColor: '#00000000'
});
\\\`\\\`\\\`

## Splash Screen Pattern:
\\\`\\\`\\\`javascript
let splash = new BrowserWindow({
    width: 400,
    height: 300,
    frame: false,
    alwaysOnTop: true
});
splash.loadFile('splash.html');

let main = new BrowserWindow({ show: false });
main.loadFile('index.html');
main.once('ready-to-show', () => {
    splash.close();
    main.show();
});
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'frame: false creates:',
                        type: 'multiple-choice',
                        options: ['Larger window', 'Window without title bar', 'Transparent window', 'Maximized window'],
                        answer: 1
                    },
                    {
                        prompt: 'contextIsolation: true:',
                        type: 'multiple-choice',
                        options: ['Slows down the app', 'Isolates preload script context for security', 'Removes all security', 'Enables Node in renderer'],
                        answer: 1
                    },
                    {
                        prompt: 'ready-to-show event fires when:',
                        type: 'multiple-choice',
                        options: ['App starts', 'Window content is loaded', 'Window is closed', 'User clicks'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-4',
                title: 'Preload Scripts',
                description: 'Bridging main and renderer safely',
                stage: 2,
                content: `
# Preload Scripts

Safely expose functionality to the renderer.

## Why Preload?
- Renderer is sandboxed for security
- Preload runs before web content loads
- Expose only what's needed

## preload.js:
\\\`\\\`\\\`javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Send message to main
    sendMessage: (channel, data) => {
        ipcRenderer.send(channel, data);
    },
    
    // Receive message from main
    onMessage: (channel, callback) => {
        ipcRenderer.on(channel, (event, ...args) => callback(...args));
    },
    
    // Invoke and get response
    invoke: (channel, data) => {
        return ipcRenderer.invoke(channel, data);
    },
    
    // Expose platform info
    platform: process.platform,
    
    // Specific APIs
    saveFile: (content) => ipcRenderer.invoke('save-file', content),
    openFile: () => ipcRenderer.invoke('open-file'),
    getVersion: () => ipcRenderer.invoke('get-version')
});
\\\`\\\`\\\`

## Using in Renderer:
\\\`\\\`\\\`javascript
// In your web page JavaScript
async function saveDocument() {
    const content = document.getElementById('editor').value;
    const result = await window.electronAPI.saveFile(content);
    console.log('Saved:', result);
}

// Listen for events from main
window.electronAPI.onMessage('update-available', (version) => {
    alert(\\\`New version \${version} available!\\\`);
});

// Get platform
console.log('Running on:', window.electronAPI.platform);
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'contextBridge.exposeInMainWorld:',
                        type: 'multiple-choice',
                        options: ['Exposes Node.js directly', 'Safely exposes APIs to window object', 'Removes all security', 'Crashes the app'],
                        answer: 1
                    },
                    {
                        prompt: 'Preload scripts run:',
                        type: 'multiple-choice',
                        options: ['After page loads', 'Before web content loads', 'Only in development', 'Never'],
                        answer: 1
                    },
                    {
                        prompt: 'ipcRenderer.invoke:',
                        type: 'multiple-choice',
                        options: ['Sends message only', 'Sends and waits for response', 'Receives only', 'Does nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-5',
                title: 'IPC Communication',
                description: 'Inter-Process Communication',
                stage: 2,
                content: `
# IPC Communication

Communication between main and renderer processes.

## Patterns:

### 1. Renderer → Main (one-way):
\\\`\\\`\\\`javascript
// preload.js
contextBridge.exposeInMainWorld('api', {
    notify: (message) => ipcRenderer.send('notify', message)
});

// main.js
ipcMain.on('notify', (event, message) => {
    new Notification({ title: 'App', body: message }).show();
});

// renderer
window.api.notify('Hello from renderer!');
\\\`\\\`\\\`

### 2. Renderer → Main → Renderer (invoke):
\\\`\\\`\\\`javascript
// preload.js
contextBridge.exposeInMainWorld('api', {
    readFile: (path) => ipcRenderer.invoke('read-file', path)
});

// main.js
const fs = require('fs').promises;
ipcMain.handle('read-file', async (event, path) => {
    const content = await fs.readFile(path, 'utf-8');
    return content;
});

// renderer
const content = await window.api.readFile('/path/to/file.txt');
\\\`\\\`\\\`

### 3. Main → Renderer:
\\\`\\\`\\\`javascript
// main.js
function sendToRenderer(win, channel, data) {
    win.webContents.send(channel, data);
}

// When menu item clicked
Menu.setApplicationMenu(Menu.buildFromTemplate([{
    label: 'File',
    submenu: [{
        label: 'New',
        click: () => mainWindow.webContents.send('menu-new')
    }]
}]));

// preload.js
contextBridge.exposeInMainWorld('api', {
    onMenuNew: (callback) => ipcRenderer.on('menu-new', callback)
});

// renderer
window.api.onMenuNew(() => {
    createNewDocument();
});
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'ipcMain.handle is used for:',
                        type: 'multiple-choice',
                        options: ['One-way messages', 'Request-response pattern', 'File handling only', 'Window creation'],
                        answer: 1
                    },
                    {
                        prompt: 'webContents.send sends messages:',
                        type: 'multiple-choice',
                        options: ['From renderer to main', 'From main to renderer', 'Between renderers', 'To external servers'],
                        answer: 1
                    },
                    {
                        prompt: 'ipcRenderer.on is used to:',
                        type: 'multiple-choice',
                        options: ['Send messages', 'Listen for messages', 'Create windows', 'Handle files'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-6',
                title: 'Application Menu',
                description: 'Creating native menus',
                stage: 2,
                content: `
# Application Menu

Create native application menus.

## Basic Menu:
\\\`\\\`\\\`javascript
const { Menu, app, shell } = require('electron');

const template = [
    {
        label: 'File',
        submenu: [
            { label: 'New', accelerator: 'CmdOrCtrl+N', click: () => createNew() },
            { label: 'Open', accelerator: 'CmdOrCtrl+O', click: () => openFile() },
            { label: 'Save', accelerator: 'CmdOrCtrl+S', click: () => save() },
            { type: 'separator' },
            { label: 'Exit', role: 'quit' }
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'selectAll' }
        ]
    },
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'toggleDevTools' },
            { type: 'separator' },
            { role: 'resetZoom' },
            { role: 'zoomIn' },
            { role: 'zoomOut' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Help',
        submenu: [
            {
                label: 'Documentation',
                click: () => shell.openExternal('https://example.com/docs')
            }
        ]
    }
];

// macOS app menu
if (process.platform === 'darwin') {
    template.unshift({
        label: app.name,
        submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'hide' },
            { role: 'quit' }
        ]
    });
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'CmdOrCtrl+S works on:',
                        type: 'multiple-choice',
                        options: ['Only Mac', 'Only Windows', 'Both Mac and Windows', 'Neither'],
                        answer: 2
                    },
                    {
                        prompt: 'role: "quit" provides:',
                        type: 'multiple-choice',
                        options: ['Custom quit behavior', 'Standard quit functionality for platform', 'No functionality', 'Error message'],
                        answer: 1
                    },
                    {
                        prompt: 'On macOS, the first menu should be:',
                        type: 'multiple-choice',
                        options: ['File menu', 'App name menu', 'Edit menu', 'Help menu'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-7',
                title: 'Dialog and File System',
                description: 'Native dialogs and file operations',
                stage: 2,
                content: `
# Dialogs and File System

Native file dialogs and file operations.

## Open File Dialog:
\\\`\\\`\\\`javascript
const { dialog } = require('electron');
const fs = require('fs').promises;

ipcMain.handle('open-file', async () => {
    const result = await dialog.showOpenDialog({
        title: 'Open File',
        filters: [
            { name: 'Text Files', extensions: ['txt', 'md'] },
            { name: 'All Files', extensions: ['*'] }
        ],
        properties: ['openFile']  // or 'openDirectory', 'multiSelections'
    });
    
    if (result.canceled) return null;
    
    const content = await fs.readFile(result.filePaths[0], 'utf-8');
    return { path: result.filePaths[0], content };
});
\\\`\\\`\\\`

## Save File Dialog:
\\\`\\\`\\\`javascript
ipcMain.handle('save-file', async (event, content) => {
    const result = await dialog.showSaveDialog({
        title: 'Save File',
        defaultPath: 'untitled.txt',
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    });
    
    if (result.canceled) return false;
    
    await fs.writeFile(result.filePath, content, 'utf-8');
    return true;
});
\\\`\\\`\\\`

## Message Box:
\\\`\\\`\\\`javascript
ipcMain.handle('confirm-delete', async (event, filename) => {
    const result = await dialog.showMessageBox({
        type: 'warning',
        title: 'Confirm Delete',
        message: \\\`Delete \${filename}?\\\`,
        detail: 'This action cannot be undone.',
        buttons: ['Cancel', 'Delete'],
        defaultId: 0,
        cancelId: 0
    });
    
    return result.response === 1; // true if Delete clicked
});
\\\`\\\`\\\`

## Error Dialog:
\\\`\\\`\\\`javascript
dialog.showErrorBox('Error', 'Something went wrong!');
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'showOpenDialog returns:',
                        type: 'multiple-choice',
                        options: ['File content', 'Promise with file paths', 'Boolean', 'Error'],
                        answer: 1
                    },
                    {
                        prompt: 'filters in dialogs specify:',
                        type: 'multiple-choice',
                        options: ['Window size', 'Allowed file types', 'Color scheme', 'Button labels'],
                        answer: 1
                    },
                    {
                        prompt: 'multiSelections property allows:',
                        type: 'multiple-choice',
                        options: ['Multiple windows', 'Selecting multiple files', 'Multiple filters', 'Multiple buttons'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-8',
                title: 'System Tray',
                description: 'Creating system tray applications',
                stage: 3,
                content: `
# System Tray

Add your app to the system tray.

## Basic Tray:
\\\`\\\`\\\`javascript
const { app, Tray, Menu, nativeImage } = require('electron');
const path = require('path');

let tray = null;

app.whenReady().then(() => {
    // Create tray icon
    const icon = nativeImage.createFromPath(
        path.join(__dirname, 'icon.png')
    );
    tray = new Tray(icon.resize({ width: 16, height: 16 }));
    
    // Tooltip
    tray.setToolTip('My App');
    
    // Context menu
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Show App', click: () => mainWindow.show() },
        { label: 'Settings', click: () => openSettings() },
        { type: 'separator' },
        { label: 'Quit', click: () => app.quit() }
    ]);
    
    tray.setContextMenu(contextMenu);
    
    // Click behavior
    tray.on('click', () => {
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
    });
});
\\\`\\\`\\\`

## Minimize to Tray:
\\\`\\\`\\\`javascript
mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
        event.preventDefault();
        mainWindow.hide();
    }
});

// When quitting from tray
app.on('before-quit', () => {
    app.isQuitting = true;
});
\\\`\\\`\\\`

## Dynamic Tray Updates:
\\\`\\\`\\\`javascript
function updateTrayIcon(hasNotifications) {
    const iconName = hasNotifications ? 'icon-badge.png' : 'icon.png';
    const icon = nativeImage.createFromPath(
        path.join(__dirname, iconName)
    );
    tray.setImage(icon);
}

function updateTrayTitle(count) {
    tray.setTitle(count > 0 ? \\\`(\${count})\\\` : '');
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'System tray is created with:',
                        type: 'multiple-choice',
                        options: ['BrowserWindow', 'Tray class', 'Menu class', 'Dialog'],
                        answer: 1
                    },
                    {
                        prompt: 'tray.setContextMenu sets:',
                        type: 'multiple-choice',
                        options: ['Application menu', 'Right-click menu on tray icon', 'Window menu', 'System menu'],
                        answer: 1
                    },
                    {
                        prompt: 'To minimize to tray on close:',
                        type: 'multiple-choice',
                        options: ['Do nothing special', 'Prevent default close and hide window', 'Use special Electron API', 'Not possible'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-9',
                title: 'Native Notifications',
                description: 'System notifications',
                stage: 3,
                content: `
# Native Notifications

Send system notifications.

## Basic Notification:
\\\`\\\`\\\`javascript
const { Notification } = require('electron');

function showNotification(title, body) {
    new Notification({
        title: title,
        body: body,
        icon: path.join(__dirname, 'icon.png')
    }).show();
}

// Usage
showNotification('Download Complete', 'Your file has been downloaded.');
\\\`\\\`\\\`

## Notification with Actions:
\\\`\\\`\\\`javascript
const notification = new Notification({
    title: 'New Message',
    body: 'You have a new message from John',
    icon: path.join(__dirname, 'icon.png'),
    actions: [
        { type: 'button', text: 'Reply' },
        { type: 'button', text: 'Mark Read' }
    ],
    closeButtonText: 'Dismiss'
});

notification.on('click', () => {
    mainWindow.show();
    mainWindow.focus();
});

notification.on('action', (event, index) => {
    if (index === 0) {
        openReplyWindow();
    } else {
        markAsRead();
    }
});

notification.show();
\\\`\\\`\\\`

## Check Permission:
\\\`\\\`\\\`javascript
if (Notification.isSupported()) {
    showNotification('Hello', 'Notifications are working!');
}
\\\`\\\`\\\`

## From Renderer (via preload):
\\\`\\\`\\\`javascript
// preload.js
contextBridge.exposeInMainWorld('api', {
    notify: (title, body) => ipcRenderer.send('show-notification', title, body)
});

// main.js
ipcMain.on('show-notification', (event, title, body) => {
    new Notification({ title, body }).show();
});

// renderer
window.api.notify('Task Complete', 'Your task has finished.');
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Notification.isSupported() checks:',
                        type: 'multiple-choice',
                        options: ['Network connection', 'If notifications are available on system', 'App permissions', 'Window focus'],
                        answer: 1
                    },
                    {
                        prompt: 'notification.on("click") fires when:',
                        type: 'multiple-choice',
                        options: ['Notification is shown', 'User clicks the notification', 'Notification expires', 'App starts'],
                        answer: 1
                    },
                    {
                        prompt: 'Notification actions are:',
                        type: 'multiple-choice',
                        options: ['Automatic responses', 'Buttons in the notification', 'Keyboard shortcuts', 'Menu items'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-10',
                title: 'Auto Updates',
                description: 'Implementing automatic updates',
                stage: 3,
                content: `
# Auto Updates

Automatically update your Electron app.

## electron-updater Setup:
\\\`\\\`\\\`bash
npm install electron-updater
\\\`\\\`\\\`

## main.js:
\\\`\\\`\\\`javascript
const { autoUpdater } = require('electron-updater');
const log = require('electron-log');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

app.whenReady().then(() => {
    // Check for updates
    autoUpdater.checkForUpdatesAndNotify();
});

// Update events
autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});

autoUpdater.on('update-available', (info) => {
    log.info('Update available:', info.version);
    mainWindow.webContents.send('update-available', info.version);
});

autoUpdater.on('update-not-available', () => {
    log.info('No update available.');
});

autoUpdater.on('download-progress', (progress) => {
    mainWindow.webContents.send('download-progress', progress.percent);
});

autoUpdater.on('update-downloaded', () => {
    log.info('Update downloaded');
    mainWindow.webContents.send('update-ready');
});

autoUpdater.on('error', (err) => {
    log.error('Update error:', err);
});

// Install update when user confirms
ipcMain.on('install-update', () => {
    autoUpdater.quitAndInstall();
});
\\\`\\\`\\\`

## Renderer UI:
\\\`\\\`\\\`javascript
window.api.onUpdateAvailable((version) => {
    showBanner(\\\`Update \${version} available! Downloading...\\\`);
});

window.api.onDownloadProgress((percent) => {
    updateProgressBar(percent);
});

window.api.onUpdateReady(() => {
    if (confirm('Update ready. Restart now?')) {
        window.api.installUpdate();
    }
});
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'electron-updater requires updates hosted on:',
                        type: 'multiple-choice',
                        options: ['Local disk only', 'GitHub releases, S3, or custom server', 'npm registry', 'App store only'],
                        answer: 1
                    },
                    {
                        prompt: 'quitAndInstall():',
                        type: 'multiple-choice',
                        options: ['Downloads update', 'Closes app and installs update', 'Checks for updates', 'Shows notification'],
                        answer: 1
                    },
                    {
                        prompt: 'update-downloaded event indicates:',
                        type: 'multiple-choice',
                        options: ['Update is checking', 'Update is downloading', 'Update is ready to install', 'Update failed'],
                        answer: 2
                    }
                ]
            },
            {
                id: 'elec-11',
                title: 'App Lifecycle',
                description: 'Managing application lifecycle events',
                stage: 3,
                content: `
# App Lifecycle

Handle application lifecycle events.

## Core Events:
\\\`\\\`\\\`javascript
const { app } = require('electron');

// App is ready to create windows
app.whenReady().then(() => {
    createWindow();
});

// Alternative
app.on('ready', () => {
    createWindow();
});

// All windows closed
app.on('window-all-closed', () => {
    // On macOS, apps stay open until Cmd+Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// App activated (macOS dock click)
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Before quitting
app.on('before-quit', (event) => {
    // Save state, cleanup
    saveAppState();
});

// Will quit
app.on('will-quit', (event) => {
    // Final cleanup
});

// Second instance (single instance lock)
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
    app.quit();
} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to open another instance
        if (mainWindow) {
            if (mainWindow.isMinimized()) mainWindow.restore();
            mainWindow.focus();
        }
    });
}
\\\`\\\`\\\`

## Window Events:
\\\`\\\`\\\`javascript
mainWindow.on('close', (event) => {
    // Prevent close
    event.preventDefault();
    mainWindow.hide();
});

mainWindow.on('closed', () => {
    mainWindow = null;
});

mainWindow.on('focus', () => {
    // Window gained focus
});

mainWindow.on('blur', () => {
    // Window lost focus
});
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'app.whenReady() returns:',
                        type: 'multiple-choice',
                        options: ['Boolean', 'Promise', 'Window', 'Error'],
                        answer: 1
                    },
                    {
                        prompt: 'requestSingleInstanceLock() ensures:',
                        type: 'multiple-choice',
                        options: ['Multiple windows', 'Only one app instance runs', 'Faster startup', 'Better memory usage'],
                        answer: 1
                    },
                    {
                        prompt: 'On macOS, window-all-closed should:',
                        type: 'multiple-choice',
                        options: ['Always quit', 'Not quit (keep app running)', 'Show error', 'Restart app'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-12',
                title: 'Security Best Practices',
                description: 'Securing your Electron app',
                stage: 4,
                content: `
# Security Best Practices

Essential security for Electron apps.

## Core Security Settings:
\\\`\\\`\\\`javascript
const win = new BrowserWindow({
    webPreferences: {
        // REQUIRED: Enable context isolation
        contextIsolation: true,
        
        // REQUIRED: Disable node in renderer
        nodeIntegration: false,
        
        // Use preload script
        preload: path.join(__dirname, 'preload.js'),
        
        // Enable sandbox
        sandbox: true,
        
        // Disable remote module
        enableRemoteModule: false,
        
        // Disable web security only if needed
        webSecurity: true
    }
});
\\\`\\\`\\\`

## Content Security Policy:
\\\`\\\`\\\`html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'">
\\\`\\\`\\\`

## Validate IPC:
\\\`\\\`\\\`javascript
// main.js - Validate channels
const validChannels = ['save-file', 'open-file', 'get-settings'];

ipcMain.handle('save-file', async (event, content) => {
    // Validate input
    if (typeof content !== 'string' || content.length > 10000000) {
        throw new Error('Invalid content');
    }
    // Validate sender
    if (event.senderFrame.url !== expectedUrl) {
        throw new Error('Invalid sender');
    }
    // Process...
});
\\\`\\\`\\\`

## Safe External Links:
\\\`\\\`\\\`javascript
// Open external links in system browser
mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) {
        shell.openExternal(url);
    }
    return { action: 'deny' };
});
\\\`\\\`\\\`

## Don't Load Remote Content:
\\\`\\\`\\\`javascript
// ❌ Avoid
win.loadURL('https://untrusted-site.com');

// ✅ Prefer local files
win.loadFile('index.html');
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'nodeIntegration: false is:',
                        type: 'multiple-choice',
                        options: ['Optional', 'Required for security', 'Bad for performance', 'Deprecated'],
                        answer: 1
                    },
                    {
                        prompt: 'Context isolation:',
                        type: 'multiple-choice',
                        options: ['Slows the app', 'Separates preload context from web page', 'Enables Node in renderer', 'Disables all features'],
                        answer: 1
                    },
                    {
                        prompt: 'External links should:',
                        type: 'multiple-choice',
                        options: ['Open in app window', 'Open in system browser via shell.openExternal', 'Be blocked', 'Download automatically'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-13',
                title: 'Building and Packaging',
                description: 'Creating distributable packages',
                stage: 4,
                content: `
# Building and Packaging

Package your app for distribution.

## electron-builder Setup:
\\\`\\\`\\\`bash
npm install electron-builder --save-dev
\\\`\\\`\\\`

## package.json Configuration:
\\\`\\\`\\\`json
{
    "name": "my-app",
    "version": "1.0.0",
    "main": "main.js",
    "scripts": {
        "start": "electron .",
        "build": "electron-builder",
        "build:win": "electron-builder --win",
        "build:mac": "electron-builder --mac",
        "build:linux": "electron-builder --linux"
    },
    "build": {
        "appId": "com.example.myapp",
        "productName": "My App",
        "directories": {
            "output": "dist"
        },
        "files": [
            "main.js",
            "preload.js",
            "index.html",
            "renderer/**/*",
            "assets/**/*"
        ],
        "mac": {
            "category": "public.app-category.productivity",
            "icon": "assets/icon.icns"
        },
        "win": {
            "target": "nsis",
            "icon": "assets/icon.ico"
        },
        "linux": {
            "target": "AppImage",
            "icon": "assets/icon.png"
        }
    }
}
\\\`\\\`\\\`

## electron-builder.yml:
\\\`\\\`\\\`yaml
appId: com.example.myapp
productName: My App
publish:
  provider: github
  owner: username
  repo: my-app
\\\`\\\`\\\`

## Build:
\\\`\\\`\\\`bash
# Build for current platform
npm run build

# Build for specific platform
npm run build:win
npm run build:mac
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'electron-builder creates:',
                        type: 'multiple-choice',
                        options: ['Source code', 'Distributable installers', 'Documentation', 'Tests'],
                        answer: 1
                    },
                    {
                        prompt: 'appId should be:',
                        type: 'multiple-choice',
                        options: ['Any string', 'Reverse domain format (com.company.app)', 'File path', 'Version number'],
                        answer: 1
                    },
                    {
                        prompt: 'NSIS is a:',
                        type: 'multiple-choice',
                        options: ['Mac package format', 'Windows installer format', 'Linux format', 'Icon format'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'elec-14',
                title: 'Integrating with React/Vite',
                description: 'Using modern frameworks with Electron',
                stage: 4,
                content: `
# Electron with React/Vite

Modern frontend frameworks in Electron.

## Vite + Electron Setup:
\\\`\\\`\\\`bash
npm create vite@latest my-electron-app -- --template react
cd my-electron-app
npm install
npm install electron electron-builder --save-dev
npm install vite-plugin-electron --save-dev
\\\`\\\`\\\`

## vite.config.js:
\\\`\\\`\\\`javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import electron from 'vite-plugin-electron';

export default defineConfig({
    plugins: [
        react(),
        electron({
            entry: 'electron/main.js',
        }),
    ],
});
\\\`\\\`\\\`

## Project Structure:
\\\`\\\`\\\`
my-electron-app/
├── electron/
│   ├── main.js
│   └── preload.js
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── index.html
├── vite.config.js
└── package.json
\\\`\\\`\\\`

## package.json Scripts:
\\\`\\\`\\\`json
{
    "scripts": {
        "dev": "vite",
        "build": "vite build && electron-builder",
        "preview": "vite preview"
    }
}
\\\`\\\`\\\`

## Using Electron API in React:
\\\`\\\`\\\`jsx
// App.jsx
import { useState, useEffect } from 'react';

function App() {
    const [version, setVersion] = useState('');
    
    useEffect(() => {
        window.electronAPI.getVersion().then(setVersion);
    }, []);
    
    const handleSave = async () => {
        const saved = await window.electronAPI.saveFile(content);
        if (saved) alert('Saved!');
    };
    
    return (
        <div>
            <h1>Electron + React</h1>
            <p>Version: {version}</p>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}
\\\`\\\`\\\`

Congratulations! You've completed Electron Development! 🖥️
        `,
                exercises: [
                    {
                        prompt: 'vite-plugin-electron enables:',
                        type: 'multiple-choice',
                        options: ['Slower builds', 'Vite dev server with Electron', 'Only production builds', 'CSS processing'],
                        answer: 1
                    },
                    {
                        prompt: 'In React, Electron APIs are accessed via:',
                        type: 'multiple-choice',
                        options: ['Direct require', 'window.electronAPI (from preload)', 'import electron', 'Global electron object'],
                        answer: 1
                    },
                    {
                        prompt: 'Hot Module Replacement (HMR) with Vite:',
                        type: 'multiple-choice',
                        options: ['Not supported', 'Works for renderer process', 'Works for main process', 'Requires restart'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // Package Management Course
    'packages': {
        id: 'packages',
        name: 'Package Management',
        description: 'Master npm, pip, cargo, and other package managers for efficient dependency management.',
        category: 'tools',
        icon: '📦',
        color: '#cb3837',
        language: 'bash',
        prerequisites: [],
        estimatedHours: 1,
        lessons: [
            {
                id: 'pkg-1',
                title: 'What are Package Managers?',
                description: 'Understanding package managers and dependencies',
                stage: 1,
                content: `
# What are Package Managers?

Package managers automate installing, updating, and removing software.

## Why Use Package Managers?
- **Dependency Management**: Automatically install required packages
- **Version Control**: Install specific versions
- **Reproducibility**: Same environment across machines
- **Security**: Verified packages, security updates

## Package Managers by Language:
| Language | Package Manager | Registry |
|----------|-----------------|----------|
| JavaScript | npm, yarn, pnpm | npmjs.com |
| Python | pip, pipenv, poetry | PyPI |
| Rust | Cargo | crates.io |
| Go | go mod | pkg.go.dev |
| Ruby | gem, bundler | rubygems.org |
| Java | Maven, Gradle | Maven Central |
| PHP | Composer | packagist.org |

## System Package Managers:
- **macOS**: Homebrew
- **Ubuntu/Debian**: apt
- **Fedora/RHEL**: dnf
- **Windows**: winget, chocolatey

## Key Concepts:
- **Package**: A bundle of code with metadata
- **Dependency**: Package that your code needs
- **Registry**: Central repository of packages
- **Lock file**: Exact versions for reproducibility
        `,
                exercises: [
                    {
                        prompt: 'The main purpose of package managers is:',
                        type: 'multiple-choice',
                        options: ['Write code faster', 'Automate dependency management', 'Compile code', 'Debug applications'],
                        answer: 1
                    },
                    {
                        prompt: 'A lock file ensures:',
                        type: 'multiple-choice',
                        options: ['Faster downloads', 'Exact same versions across installs', 'Smaller packages', 'Better security'],
                        answer: 1
                    },
                    {
                        prompt: 'npm is the package manager for:',
                        type: 'multiple-choice',
                        options: ['Python', 'JavaScript/Node.js', 'Rust', 'Go'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-2',
                title: 'npm Basics',
                description: 'Node Package Manager fundamentals',
                stage: 1,
                content: `
# npm Basics

The default package manager for Node.js.

## Getting Started:
\\\`\\\`\\\`bash
# Check npm version
npm --version

# Initialize a new project
npm init
npm init -y  # Skip questions

# This creates package.json
\\\`\\\`\\\`

## Installing Packages:
\\\`\\\`\\\`bash
# Install as dependency
npm install lodash
npm i lodash  # shorthand

# Install as dev dependency
npm install --save-dev jest
npm i -D jest

# Install globally
npm install -g typescript

# Install specific version
npm install react@18.2.0

# Install from package.json
npm install
npm i
\\\`\\\`\\\`

## package.json:
\\\`\\\`\\\`json
{
    "name": "my-project",
    "version": "1.0.0",
    "description": "My awesome project",
    "main": "index.js",
    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js",
        "test": "jest",
        "build": "webpack"
    },
    "dependencies": {
        "express": "^4.18.2",
        "lodash": "~4.17.21"
    },
    "devDependencies": {
        "jest": "^29.0.0"
    }
}
\\\`\\\`\\\`

## Common Commands:
\\\`\\\`\\\`bash
npm uninstall lodash    # Remove package
npm update              # Update all packages
npm outdated            # Check for updates
npm run test            # Run script
npm ls                  # List installed packages
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'npm init -y:',
                        type: 'multiple-choice',
                        options: ['Installs packages', 'Creates package.json with defaults', 'Runs tests', 'Updates npm'],
                        answer: 1
                    },
                    {
                        prompt: 'Dev dependencies are installed with:',
                        type: 'multiple-choice',
                        options: ['npm install', 'npm install --save-dev', 'npm install --global', 'npm install --prod'],
                        answer: 1
                    },
                    {
                        prompt: 'npm run test executes:',
                        type: 'multiple-choice',
                        options: ['Default test command', 'Script named "test" in package.json', 'All scripts', 'Nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-3',
                title: 'npm Version Ranges',
                description: 'Understanding semantic versioning',
                stage: 1,
                content: `
# Semantic Versioning

Version numbers follow MAJOR.MINOR.PATCH.

## SemVer Explained:
\\\`\\\`\\\`
MAJOR.MINOR.PATCH
  1  .  2  .  3

MAJOR: Breaking changes
MINOR: New features (backward compatible)
PATCH: Bug fixes (backward compatible)
\\\`\\\`\\\`

## Version Ranges:
\\\`\\\`\\\`json
{
    "dependencies": {
        "exact": "1.2.3",
        "caret": "^1.2.3",
        "tilde": "~1.2.3",
        "greater": ">1.2.3",
        "range": ">=1.2.3 <2.0.0",
        "any": "*",
        "latest": "latest"
    }
}
\\\`\\\`\\\`

## Caret (^) - Most Common:
\\\`\\\`\\\`
^1.2.3 allows: 1.2.3, 1.2.4, 1.3.0, 1.9.9
       blocks: 2.0.0 (major change)

^0.2.3 allows: 0.2.3, 0.2.4
       blocks: 0.3.0 (pre-1.0 is different)
\\\`\\\`\\\`

## Tilde (~) - More Strict:
\\\`\\\`\\\`
~1.2.3 allows: 1.2.3, 1.2.4, 1.2.99
       blocks: 1.3.0 (minor change)
\\\`\\\`\\\`

## package-lock.json:
- Records exact versions installed
- Ensures consistency across installs
- Commit this file to version control!

\\\`\\\`\\\`bash
# See what would be installed
npm install --dry-run

# Install exact versions from lock file
npm ci  # Clean install (for CI/CD)
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'In SemVer, a MAJOR version bump means:',
                        type: 'multiple-choice',
                        options: ['Bug fixes', 'New features', 'Breaking changes', 'No changes'],
                        answer: 2
                    },
                    {
                        prompt: '^1.2.3 allows which version?',
                        type: 'multiple-choice',
                        options: ['2.0.0', '1.5.0', '0.9.0', '3.0.0'],
                        answer: 1
                    },
                    {
                        prompt: 'npm ci is used for:',
                        type: 'multiple-choice',
                        options: ['Creating package.json', 'Clean install from lock file', 'Updating packages', 'Publishing packages'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-4',
                title: 'npm Scripts and npx',
                description: 'Automating tasks with npm',
                stage: 2,
                content: `
# npm Scripts and npx

Automate common tasks.

## npm Scripts:
\\\`\\\`\\\`json
{
    "scripts": {
        "start": "node server.js",
        "dev": "nodemon server.js",
        "build": "webpack --mode production",
        "test": "jest",
        "test:watch": "jest --watch",
        "lint": "eslint src/",
        "format": "prettier --write src/",
        "prepare": "husky install",
        "pretest": "npm run lint",
        "posttest": "echo 'Tests complete!'"
    }
}
\\\`\\\`\\\`

## Running Scripts:
\\\`\\\`\\\`bash
npm run dev
npm run build
npm test      # 'test' doesn't need 'run'
npm start     # 'start' doesn't need 'run'
\\\`\\\`\\\`

## Script Hooks:
- \`pre<script>\`: Runs before script
- \`post<script>\`: Runs after script
- \`prepare\`: Runs after npm install

## npx - Execute Packages:
\\\`\\\`\\\`bash
# Run without installing globally
npx create-react-app my-app
npx eslint .
npx prettier --write .

# Run specific version
npx typescript@4.9.0 --version

# Run from GitHub
npx github:user/repo

# Run local binary
npx jest
\\\`\\\`\\\`

## Environment Variables:
\\\`\\\`\\\`json
{
    "scripts": {
        "start": "NODE_ENV=production node server.js",
        "dev": "NODE_ENV=development nodemon server.js"
    }
}
\\\`\\\`\\\`

## Cross-platform (with cross-env):
\\\`\\\`\\\`json
{
    "scripts": {
        "build": "cross-env NODE_ENV=production webpack"
    }
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'npx allows you to:',
                        type: 'multiple-choice',
                        options: ['Install packages globally', 'Run packages without global install', 'Uninstall packages', 'Update npm'],
                        answer: 1
                    },
                    {
                        prompt: 'The pretest hook runs:',
                        type: 'multiple-choice',
                        options: ['After tests', 'Before tests', 'During tests', 'Instead of tests'],
                        answer: 1
                    },
                    {
                        prompt: 'npm start works without "run" because:',
                        type: 'multiple-choice',
                        options: ['Bug in npm', 'start is a special shortcut', 'All scripts work without run', 'It is defined differently'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-5',
                title: 'yarn and pnpm',
                description: 'Alternative JavaScript package managers',
                stage: 2,
                content: `
# yarn and pnpm

Faster, more efficient alternatives to npm.

## Yarn:
\\\`\\\`\\\`bash
# Install yarn
npm install -g yarn

# Commands comparison
npm install        → yarn install / yarn
npm install pkg    → yarn add pkg
npm install -D pkg → yarn add -D pkg
npm install -g pkg → yarn global add pkg
npm uninstall pkg  → yarn remove pkg
npm run script     → yarn script
npx pkg            → yarn dlx pkg (yarn 2+)
\\\`\\\`\\\`

## Yarn Workspaces (Monorepos):
\\\`\\\`\\\`json
{
    "private": true,
    "workspaces": [
        "packages/*"
    ]
}
\\\`\\\`\\\`

## pnpm - Performant npm:
\\\`\\\`\\\`bash
# Install pnpm
npm install -g pnpm

# Commands (mostly same as npm)
pnpm install
pnpm add lodash
pnpm add -D jest
pnpm remove lodash
pnpm run test
\\\`\\\`\\\`

## pnpm Benefits:
- **Faster**: Symlinks from global store
- **Disk efficient**: Shared packages
- **Strict**: No phantom dependencies

## Comparison:
| Feature | npm | yarn | pnpm |
|---------|-----|------|------|
| Speed | OK | Fast | Fastest |
| Disk usage | High | High | Low |
| Lock file | package-lock.json | yarn.lock | pnpm-lock.yaml |
| Workspaces | Yes | Yes | Yes |

## Choose Based On:
- **npm**: Default, most compatible
- **yarn**: Mature, great for monorepos
- **pnpm**: Best performance, strictest
        `,
                exercises: [
                    {
                        prompt: 'yarn add is equivalent to:',
                        type: 'multiple-choice',
                        options: ['npm create', 'npm install', 'npm update', 'npm remove'],
                        answer: 1
                    },
                    {
                        prompt: 'pnpm is known for:',
                        type: 'multiple-choice',
                        options: ['Slowest installs', 'Disk efficiency and speed', 'No lock file', 'Only for Python'],
                        answer: 1
                    },
                    {
                        prompt: 'Yarn workspaces are for:',
                        type: 'multiple-choice',
                        options: ['Single projects', 'Monorepos with multiple packages', 'Testing only', 'Documentation'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-6',
                title: 'pip for Python',
                description: 'Python package management',
                stage: 2,
                content: `
# pip for Python

Python's package installer.

## Basic Commands:
\\\`\\\`\\\`bash
# Install package
pip install requests
pip install requests==2.28.0  # Specific version
pip install "requests>=2.20"  # Version range

# Install from requirements.txt
pip install -r requirements.txt

# Upgrade package
pip install --upgrade requests
pip install -U requests

# Uninstall
pip uninstall requests

# List installed
pip list
pip freeze  # Format for requirements.txt

# Show package info
pip show requests

# Search (deprecated, use pypi.org)
pip search requests
\\\`\\\`\\\`

## requirements.txt:
\\\`\\\`\\\`
# requirements.txt
requests==2.28.1
flask>=2.0.0,<3.0.0
numpy~=1.23.0
pandas
pytest  # Comment
-e .    # Install current package in editable mode
\\\`\\\`\\\`

## Create requirements.txt:
\\\`\\\`\\\`bash
pip freeze > requirements.txt
\\\`\\\`\\\`

## Virtual Environments:
\\\`\\\`\\\`bash
# Create virtual environment
python -m venv myenv

# Activate
source myenv/bin/activate  # Linux/Mac
myenv\\Scripts\\activate    # Windows

# Deactivate
deactivate

# Install in venv
pip install requests
\\\`\\\`\\\`

## pip.conf:
\\\`\\\`\\\`ini
[global]
index-url = https://pypi.org/simple/
trusted-host = pypi.org
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'pip freeze outputs:',
                        type: 'multiple-choice',
                        options: ['Package descriptions', 'Installed packages with versions', 'Available updates', 'Error logs'],
                        answer: 1
                    },
                    {
                        prompt: 'Virtual environments are used to:',
                        type: 'multiple-choice',
                        options: ['Speed up Python', 'Isolate project dependencies', 'Compile Python', 'Debug code'],
                        answer: 1
                    },
                    {
                        prompt: 'pip install -r requirements.txt:',
                        type: 'multiple-choice',
                        options: ['Creates requirements.txt', 'Installs packages listed in file', 'Removes packages', 'Updates pip'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-7',
                title: 'Poetry for Python',
                description: 'Modern Python dependency management',
                stage: 3,
                content: `
# Poetry for Python

Modern dependency management and packaging.

## Installation:
\\\`\\\`\\\`bash
curl -sSL https://install.python-poetry.org | python3 -
# or
pipx install poetry
\\\`\\\`\\\`

## Create Project:
\\\`\\\`\\\`bash
poetry new my-project
# or initialize in existing
poetry init
\\\`\\\`\\\`

## pyproject.toml:
\\\`\\\`\\\`toml
[tool.poetry]
name = "my-project"
version = "0.1.0"
description = "My awesome project"
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.10"
requests = "^2.28.0"
flask = "^2.0.0"

[tool.poetry.dev-dependencies]
pytest = "^7.0.0"
black = "^23.0.0"

[build-system]
requires = ["poetry-core>=1.0.0"]
build-backend = "poetry.core.masonry.api"
\\\`\\\`\\\`

## Commands:
\\\`\\\`\\\`bash
# Install dependencies
poetry install

# Add package
poetry add requests
poetry add pytest --group dev

# Remove package
poetry remove requests

# Update packages
poetry update

# Run commands in venv
poetry run python main.py
poetry run pytest

# Activate shell
poetry shell

# Show dependencies
poetry show
poetry show --tree

# Build package
poetry build

# Publish to PyPI
poetry publish
\\\`\\\`\\\`

## Benefits over pip:
- Lock file (poetry.lock)
- Automatic virtual environment
- Better dependency resolution
- Built-in publishing
        `,
                exercises: [
                    {
                        prompt: 'Poetry uses which config file?',
                        type: 'multiple-choice',
                        options: ['requirements.txt', 'package.json', 'pyproject.toml', 'poetry.yml'],
                        answer: 2
                    },
                    {
                        prompt: 'poetry run:',
                        type: 'multiple-choice',
                        options: ['Installs packages', 'Runs command in virtual environment', 'Updates poetry', 'Creates project'],
                        answer: 1
                    },
                    {
                        prompt: 'poetry add --group dev:',
                        type: 'multiple-choice',
                        options: ['Adds production dependency', 'Adds development dependency', 'Creates group', 'Removes package'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-8',
                title: 'Cargo for Rust',
                description: 'Rust package management and build',
                stage: 3,
                content: `
# Cargo for Rust

Rust's package manager and build system.

## Project Setup:
\\\`\\\`\\\`bash
# Create new project
cargo new my_project
cargo new my_library --lib

# Initialize in existing directory
cargo init
\\\`\\\`\\\`

## Cargo.toml:
\\\`\\\`\\\`toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"
authors = ["Your Name <you@example.com>"]
description = "A cool project"

[dependencies]
serde = "1.0"
serde_json = "1.0"
tokio = { version = "1.0", features = ["full"] }
my_lib = { path = "../my_lib" }

[dev-dependencies]
criterion = "0.4"

[build-dependencies]
cc = "1.0"
\\\`\\\`\\\`

## Commands:
\\\`\\\`\\\`bash
# Build project
cargo build
cargo build --release

# Run project
cargo run
cargo run --release

# Check without building
cargo check

# Run tests
cargo test

# Generate documentation
cargo doc --open

# Format code
cargo fmt

# Lint with clippy
cargo clippy

# Update dependencies
cargo update

# Add dependency
cargo add serde
cargo add tokio --features full
cargo add criterion --dev

# Publish to crates.io
cargo publish
\\\`\\\`\\\`

## Workspaces:
\\\`\\\`\\\`toml
# Cargo.toml at root
[workspace]
members = [
    "crate_a",
    "crate_b",
]
\\\`\\\`\\\`

## Build profiles:
\\\`\\\`\\\`toml
[profile.release]
opt-level = 3
lto = true
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'cargo new creates:',
                        type: 'multiple-choice',
                        options: ['Only Cargo.toml', 'New Rust project with src/', 'Virtual environment', 'Lock file only'],
                        answer: 1
                    },
                    {
                        prompt: 'cargo build --release:',
                        type: 'multiple-choice',
                        options: ['Builds debug version', 'Builds optimized version', 'Publishes crate', 'Runs tests'],
                        answer: 1
                    },
                    {
                        prompt: 'Cargo.lock should be:',
                        type: 'multiple-choice',
                        options: ['Always ignored', 'Committed for applications, ignored for libraries', 'Always committed', 'Deleted regularly'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-9',
                title: 'Go Modules',
                description: 'Go dependency management',
                stage: 3,
                content: `
# Go Modules

Go's built-in dependency management.

## Initialize Module:
\\\`\\\`\\\`bash
# Create new module
go mod init github.com/username/myproject

# This creates go.mod
\\\`\\\`\\\`

## go.mod:
\\\`\\\`\\\`go
module github.com/username/myproject

go 1.21

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/go-sql-driver/mysql v1.7.1
)

require (
    // indirect dependencies
    github.com/somelib v1.0.0 // indirect
)
\\\`\\\`\\\`

## Commands:
\\\`\\\`\\\`bash
# Add dependency (automatically when importing)
go get github.com/gin-gonic/gin

# Specific version
go get github.com/gin-gonic/gin@v1.9.1

# Update dependency
go get -u github.com/gin-gonic/gin

# Update all
go get -u ./...

# Remove unused dependencies
go mod tidy

# Download dependencies
go mod download

# Verify dependencies
go mod verify

# Show dependency graph
go mod graph

# Create vendor directory
go mod vendor
\\\`\\\`\\\`

## Building:
\\\`\\\`\\\`bash
# Build
go build

# Build for specific OS
GOOS=linux GOARCH=amd64 go build

# Run
go run main.go

# Run tests
go test ./...

# Install globally
go install
\\\`\\\`\\\`

## Replace for local development:
\\\`\\\`\\\`go
// go.mod
replace github.com/original/pkg => ../local/pkg
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'go mod init creates:',
                        type: 'multiple-choice',
                        options: ['Package structure', 'go.mod file', 'Main function', 'Test files'],
                        answer: 1
                    },
                    {
                        prompt: 'go mod tidy:',
                        type: 'multiple-choice',
                        options: ['Formats code', 'Removes unused and adds missing dependencies', 'Updates all packages', 'Creates vendor folder'],
                        answer: 1
                    },
                    {
                        prompt: 'go get -u updates:',
                        type: 'multiple-choice',
                        options: ['go.mod file only', 'Package to latest version', 'Go itself', 'Nothing'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-10',
                title: 'Homebrew and System Packages',
                description: 'System-level package management',
                stage: 3,
                content: `
# System Package Managers

Managing system-wide software.

## Homebrew (macOS/Linux):
\\\`\\\`\\\`bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install packages
brew install node
brew install python
brew install git

# Install GUI apps (Casks)
brew install --cask visual-studio-code
brew install --cask google-chrome

# Update Homebrew
brew update

# Upgrade packages
brew upgrade
brew upgrade node

# Search
brew search node

# Info
brew info node

# List installed
brew list

# Remove
brew uninstall node

# Cleanup old versions
brew cleanup
\\\`\\\`\\\`

## apt (Ubuntu/Debian):
\\\`\\\`\\\`bash
# Update package list
sudo apt update

# Upgrade installed packages
sudo apt upgrade

# Install
sudo apt install nodejs

# Remove
sudo apt remove nodejs
sudo apt autoremove  # Remove unused

# Search
apt search nodejs

# Info
apt show nodejs

# List installed
apt list --installed
\\\`\\\`\\\`

## winget (Windows):
\\\`\\\`\\\`powershell
# Install
winget install Microsoft.VisualStudioCode
winget install Git.Git

# Search
winget search node

# Upgrade
winget upgrade --all

# List
winget list
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'brew install --cask is for:',
                        type: 'multiple-choice',
                        options: ['CLI tools', 'GUI applications', 'Libraries', 'Scripts'],
                        answer: 1
                    },
                    {
                        prompt: 'sudo apt update:',
                        type: 'multiple-choice',
                        options: ['Installs updates', 'Refreshes package list', 'Removes packages', 'Shows updates'],
                        answer: 1
                    },
                    {
                        prompt: 'brew cleanup removes:',
                        type: 'multiple-choice',
                        options: ['All packages', 'Old versions and cache', 'Current packages', 'Homebrew itself'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-11',
                title: 'Managing Dependencies',
                description: 'Best practices for dependency management',
                stage: 4,
                content: `
# Managing Dependencies

Best practices for healthy dependencies.

## Security:
\\\`\\\`\\\`bash
# npm - Check for vulnerabilities
npm audit
npm audit fix
npm audit fix --force  # Breaking changes

# pip
pip-audit
safety check

# cargo
cargo audit
\\\`\\\`\\\`

## Updating Dependencies:
\\\`\\\`\\\`bash
# npm - Interactive updates
npx npm-check-updates -i

# Check outdated
npm outdated
pip list --outdated
cargo outdated
\\\`\\\`\\\`

## Lock Files:
| Tool | Lock File | Commit? |
|------|-----------|---------|
| npm | package-lock.json | ✅ Yes |
| yarn | yarn.lock | ✅ Yes |
| pnpm | pnpm-lock.yaml | ✅ Yes |
| pip | (requirements.txt) | ✅ Yes |
| poetry | poetry.lock | ✅ Yes |
| cargo | Cargo.lock | Apps: Yes, Libs: No |
| go | go.sum | ✅ Yes |

## Dependency Hygiene:
1. **Audit regularly**: Check for vulnerabilities
2. **Update incrementally**: Don't update everything at once
3. **Test after updates**: Run full test suite
4. **Review changelogs**: Understand what changed
5. **Minimize dependencies**: Less is more
6. **Pin versions**: Use lock files

## Renovate/Dependabot:
\\\`\\\`\\\`yaml
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
\\\`\\\`\\\`

## Check Package Health:
- Downloads/week
- Last updated
- Open issues
- Maintainers
- License
        `,
                exercises: [
                    {
                        prompt: 'npm audit is used for:',
                        type: 'multiple-choice',
                        options: ['Installing packages', 'Finding security vulnerabilities', 'Updating npm', 'Creating package.json'],
                        answer: 1
                    },
                    {
                        prompt: 'Dependabot:',
                        type: 'multiple-choice',
                        options: ['Installs packages', 'Automatically creates PRs for updates', 'Runs tests', 'Deploys code'],
                        answer: 1
                    },
                    {
                        prompt: 'Lock files should be:',
                        type: 'multiple-choice',
                        options: ['Never committed', 'Committed to version control', 'Deleted regularly', 'Kept locally only'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'pkg-12',
                title: 'Publishing Packages',
                description: 'Creating and publishing your own packages',
                stage: 4,
                content: `
# Publishing Packages

Share your code with the world.

## npm Package:
\\\`\\\`\\\`json
{
    "name": "my-awesome-package",
    "version": "1.0.0",
    "description": "Does awesome things",
    "main": "index.js",
    "types": "index.d.ts",
    "files": ["dist", "index.js"],
    "keywords": ["awesome", "package"],
    "license": "MIT",
    "repository": {
        "type": "git",
        "url": "https://github.com/user/repo"
    },
    "publishConfig": {
        "access": "public"
    }
}
\\\`\\\`\\\`

\\\`\\\`\\\`bash
# Login to npm
npm login

# Publish
npm publish

# Publish scoped package
npm publish --access public

# Version bump
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Unpublish (within 72 hours)
npm unpublish my-package@1.0.0
\\\`\\\`\\\`

## PyPI (Python):
\\\`\\\`\\\`bash
# Build
python -m build

# Upload
twine upload dist/*

# Or with Poetry
poetry publish
\\\`\\\`\\\`

## crates.io (Rust):
\\\`\\\`\\\`bash
cargo login
cargo publish
\\\`\\\`\\\`

## Best Practices:
1. Write good documentation (README)
2. Include LICENSE file
3. Add CHANGELOG.md
4. Write tests
5. Use TypeScript types (.d.ts)
6. Include examples
7. Set up CI/CD
8. Use semantic versioning

Congratulations! You've completed Package Management! 📦
        `,
                exercises: [
                    {
                        prompt: 'npm version patch:',
                        type: 'multiple-choice',
                        options: ['Updates dependencies', 'Bumps patch version number', 'Fixes bugs', 'Downloads patches'],
                        answer: 1
                    },
                    {
                        prompt: 'The files field in package.json:',
                        type: 'multiple-choice',
                        options: ['Lists source files', 'Specifies which files to publish', 'Shows dependencies', 'Defines build outputs'],
                        answer: 1
                    },
                    {
                        prompt: 'A good package should include:',
                        type: 'multiple-choice',
                        options: ['Only code', 'README, LICENSE, CHANGELOG, tests', 'node_modules', 'Private keys'],
                        answer: 1
                    }
                ]
            }
        ]
    },

    // Code Optimization Course
    'optimization': {
        id: 'optimization',
        name: 'Code Optimization',
        description: 'Learn performance optimization, Big O analysis, profiling, and writing efficient code.',
        category: 'advanced',
        icon: '⚡',
        color: '#f39c12',
        language: 'javascript',
        prerequisites: ['intro-logic'],
        estimatedHours: 1.5,
        lessons: [
            {
                id: 'opt-1',
                title: 'Why Performance Matters',
                description: 'Understanding the importance of optimization',
                stage: 1,
                content: `
# Why Performance Matters

Fast code = happy users and lower costs.

## Real-World Impact:
- **Amazon**: 100ms latency = 1% sales loss
- **Google**: 500ms delay = 20% drop in searches
- **Mobile users**: 53% leave if page takes >3 seconds

## Types of Performance:
1. **Time Complexity**: How long does it take?
2. **Space Complexity**: How much memory does it use?
3. **Startup Time**: How fast does it load?
4. **Throughput**: How many requests/second?

## When to Optimize:
> "Premature optimization is the root of all evil" - Donald Knuth

1. **First**: Make it work correctly
2. **Then**: Measure to find bottlenecks
3. **Finally**: Optimize the actual problems

## The 80/20 Rule:
- 80% of time is spent in 20% of code
- Find that 20% before optimizing

## Trade-offs:
- Speed vs Memory
- Readability vs Performance
- Development Time vs Runtime Speed

## Optimization Process:
1. **Profile**: Measure current performance
2. **Identify**: Find the bottleneck
3. **Optimize**: Fix the bottleneck
4. **Verify**: Measure improvement
5. **Repeat**: Until acceptable
        `,
                exercises: [
                    {
                        prompt: 'When should you optimize code?',
                        type: 'multiple-choice',
                        options: ['Before writing any code', 'After measuring and finding bottlenecks', 'Never', 'Every line'],
                        answer: 1
                    },
                    {
                        prompt: 'The 80/20 rule means:',
                        type: 'multiple-choice',
                        options: ['80% of code is comments', '80% of time spent in 20% of code', '80% optimization is enough', 'Use 80% of memory'],
                        answer: 1
                    },
                    {
                        prompt: 'Premature optimization means:',
                        type: 'multiple-choice',
                        options: ['Optimizing too late', 'Optimizing before measuring', 'Good practice', 'Fast optimization'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-2',
                title: 'Big O Notation',
                description: 'Analyzing algorithm efficiency',
                stage: 1,
                content: `
# Big O Notation

Describes how algorithms scale.

## Common Complexities:
\\\`\\\`\\\`
O(1)       - Constant     - Array access
O(log n)   - Logarithmic  - Binary search
O(n)       - Linear       - Loop through array
O(n log n) - Linearithmic - Merge sort
O(n²)      - Quadratic    - Nested loops
O(2ⁿ)      - Exponential  - Recursive fibonacci
O(n!)      - Factorial    - Permutations
\\\`\\\`\\\`

## Visual Comparison (n=1000):
\\\`\\\`\\\`
O(1)       = 1 operation
O(log n)   = 10 operations
O(n)       = 1,000 operations
O(n log n) = 10,000 operations
O(n²)      = 1,000,000 operations
O(2ⁿ)      = 10^301 operations (!!)
\\\`\\\`\\\`

## Examples:
\\\`\\\`\\\`javascript
// O(1) - Constant
function getFirst(arr) {
    return arr[0];
}

// O(n) - Linear
function findMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

// O(n²) - Quadratic
function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}
\\\`\\\`\\\`

## Rules:
1. Drop constants: O(2n) → O(n)
2. Drop lower terms: O(n² + n) → O(n²)
3. Consider worst case
        `,
                exercises: [
                    {
                        prompt: 'A nested loop is typically:',
                        type: 'multiple-choice',
                        options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
                        answer: 2
                    },
                    {
                        prompt: 'Binary search is:',
                        type: 'multiple-choice',
                        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
                        answer: 1
                    },
                    {
                        prompt: 'O(2n) simplifies to:',
                        type: 'multiple-choice',
                        options: ['O(2n)', 'O(n)', 'O(n²)', 'O(2)'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-3',
                title: 'Space Complexity',
                description: 'Memory usage analysis',
                stage: 1,
                content: `
# Space Complexity

How much memory does your algorithm use?

## Common Space Complexities:
\\\`\\\`\\\`
O(1)     - Constant - Few variables
O(n)     - Linear   - Array copy
O(n²)    - Quadratic - 2D matrix
\\\`\\\`\\\`

## Examples:
\\\`\\\`\\\`javascript
// O(1) Space - In-place
function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// O(n) Space - New array
function double(arr) {
    const result = [];
    for (const num of arr) {
        result.push(num * 2);
    }
    return result;
}

// O(n) Space - Recursion call stack!
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}
// Each call adds to stack
\\\`\\\`\\\`

## In-place Algorithms:
\\\`\\\`\\\`javascript
// O(n) space - Creates new array
const doubled = arr.map(x => x * 2);

// O(1) space - Modifies in place
for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i] * 2;
}
\\\`\\\`\\\`

## Time vs Space Trade-offs:
\\\`\\\`\\\`javascript
// More memory, faster (memoization)
const cache = {};
function fib(n) {
    if (cache[n]) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
}

// Less memory, slower
function fibSlow(n) {
    if (n <= 1) return n;
    return fibSlow(n - 1) + fibSlow(n - 2);
}
\\\`\\\`\\\`

## Recursion Stack Space:
- Each recursive call uses stack memory
- Deep recursion can cause stack overflow
- Consider iterative alternatives
        `,
                exercises: [
                    {
                        prompt: 'Recursion uses memory for:',
                        type: 'multiple-choice',
                        options: ['Variables only', 'Call stack', 'Nothing extra', 'CPU only'],
                        answer: 1
                    },
                    {
                        prompt: 'In-place algorithms have:',
                        type: 'multiple-choice',
                        options: ['O(n) space', 'O(1) space', 'O(n²) space', 'Infinite space'],
                        answer: 1
                    },
                    {
                        prompt: 'Memoization trades:',
                        type: 'multiple-choice',
                        options: ['Time for space', 'Space for time', 'Nothing', 'Code for speed'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-4',
                title: 'Profiling JavaScript',
                description: 'Measuring performance in JS',
                stage: 2,
                content: `
# Profiling JavaScript

Measure before you optimize.

## console.time:
\\\`\\\`\\\`javascript
console.time('myFunction');
myFunction();
console.timeEnd('myFunction');
// Output: myFunction: 123.456ms
\\\`\\\`\\\`

## Performance API:
\\\`\\\`\\\`javascript
const start = performance.now();
heavyOperation();
const end = performance.now();
console.log(\\\`Took \\\${end - start}ms\\\`);
\\\`\\\`\\\`

## Performance Marks:
\\\`\\\`\\\`javascript
performance.mark('start');
doWork();
performance.mark('middle');
doMoreWork();
performance.mark('end');

performance.measure('first-half', 'start', 'middle');
performance.measure('second-half', 'middle', 'end');

const measures = performance.getEntriesByType('measure');
console.log(measures);
\\\`\\\`\\\`

## Chrome DevTools:
1. **Performance Tab**: Record and analyze
2. **Memory Tab**: Heap snapshots
3. **Network Tab**: Load times
4. **Lighthouse**: Overall audit

## Node.js Profiling:
\\\`\\\`\\\`bash
# CPU profiling
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Memory usage
node --inspect app.js
# Then open chrome://inspect
\\\`\\\`\\\`

## Benchmark Libraries:
\\\`\\\`\\\`javascript
// Using benchmark.js
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

suite
    .add('RegExp', () => /o/.test('Hello World'))
    .add('indexOf', () => 'Hello World'.indexOf('o') > -1)
    .on('complete', function() {
        console.log('Fastest: ' + this.filter('fastest').map('name'));
    })
    .run();
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'console.time measures:',
                        type: 'multiple-choice',
                        options: ['Memory usage', 'Execution time', 'CPU usage', 'Network speed'],
                        answer: 1
                    },
                    {
                        prompt: 'performance.now() returns:',
                        type: 'multiple-choice',
                        options: ['Date string', 'High-resolution timestamp', 'CPU cycles', 'Memory address'],
                        answer: 1
                    },
                    {
                        prompt: 'Chrome DevTools Performance tab:',
                        type: 'multiple-choice',
                        options: ['Edits code', 'Records and analyzes runtime', 'Installs extensions', 'Manages tabs'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-5',
                title: 'Loop Optimizations',
                description: 'Making loops faster',
                stage: 2,
                content: `
# Loop Optimizations

Loops are often the biggest bottleneck.

## Cache Length:
\\\`\\\`\\\`javascript
// Slower - length checked each iteration
for (let i = 0; i < arr.length; i++) {}

// Faster - length cached
for (let i = 0, len = arr.length; i < len; i++) {}
\\\`\\\`\\\`

## Avoid Work in Loops:
\\\`\\\`\\\`javascript
// Bad - DOM query every iteration
for (let i = 0; i < 100; i++) {
    document.getElementById('result').innerHTML += i;
}

// Good - Query once, update once
const result = document.getElementById('result');
let html = '';
for (let i = 0; i < 100; i++) {
    html += i;
}
result.innerHTML = html;
\\\`\\\`\\\`

## Break Early:
\\\`\\\`\\\`javascript
// Bad - checks all elements
function hasNegative(arr) {
    let found = false;
    for (const num of arr) {
        if (num < 0) found = true;
    }
    return found;
}

// Good - stops when found
function hasNegative(arr) {
    for (const num of arr) {
        if (num < 0) return true;
    }
    return false;
}
\\\`\\\`\\\`

## Reduce Iterations:
\\\`\\\`\\\`javascript
// Processing pairs? Don't double check
for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
        // Each pair only once
    }
}
\\\`\\\`\\\`

## Use Built-in Methods:
\\\`\\\`\\\`javascript
// These are optimized in the engine
arr.includes(value)     // Instead of loop
arr.find(x => x > 5)    // Instead of loop
arr.some(x => x < 0)    // Instead of loop
\\\`\\\`\\\`

## Loop Unrolling (rare):
\\\`\\\`\\\`javascript
// Processing 4 items per iteration
for (let i = 0; i < len; i += 4) {
    process(arr[i]);
    process(arr[i + 1]);
    process(arr[i + 2]);
    process(arr[i + 3]);
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Caching array length helps because:',
                        type: 'multiple-choice',
                        options: ['Arrays are smaller', 'Avoids property lookup each iteration', 'Uses less memory', 'Arrays are sorted'],
                        answer: 1
                    },
                    {
                        prompt: 'Breaking early from a loop:',
                        type: 'multiple-choice',
                        options: ['Is bad practice', 'Saves unnecessary iterations', 'Uses more memory', 'Makes code slower'],
                        answer: 1
                    },
                    {
                        prompt: 'arr.some() stops iterating when:',
                        type: 'multiple-choice',
                        options: ['Never', 'Callback returns true', 'Array ends', 'Callback returns false'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-6',
                title: 'Data Structure Selection',
                description: 'Choosing the right data structure',
                stage: 2,
                content: `
# Data Structure Selection

The right structure makes all the difference.

## Array vs Set:
\\\`\\\`\\\`javascript
// Checking membership
const arr = [1, 2, 3, 4, 5];
arr.includes(3);  // O(n)

const set = new Set([1, 2, 3, 4, 5]);
set.has(3);  // O(1) !!
\\\`\\\`\\\`

## Object vs Map:
\\\`\\\`\\\`javascript
// Object - string keys only, prototype chain
const obj = { name: 'John' };

// Map - any key type, no prototype
const map = new Map();
map.set('name', 'John');
map.set(1, 'one');
map.set({}, 'object key');
\\\`\\\`\\\`

## When to Use What:
| Need | Best Choice |
|------|-------------|
| Unique values | Set |
| Key-value pairs | Map/Object |
| Ordered sequence | Array |
| Fast lookup | Set/Map |
| Queue (FIFO) | Array (shift/push) |
| Stack (LIFO) | Array (pop/push) |

## Frequency Counter Pattern:
\\\`\\\`\\\`javascript
// Count occurrences - O(n)
function charCount(str) {
    const counts = new Map();
    for (const char of str) {
        counts.set(char, (counts.get(char) || 0) + 1);
    }
    return counts;
}
\\\`\\\`\\\`

## Two Arrays - Finding Common:
\\\`\\\`\\\`javascript
// Bad - O(n*m)
function findCommon(arr1, arr2) {
    return arr1.filter(x => arr2.includes(x));
}

// Good - O(n+m)
function findCommon(arr1, arr2) {
    const set2 = new Set(arr2);
    return arr1.filter(x => set2.has(x));
}
\\\`\\\`\\\`

## Lookup Table Pattern:
\\\`\\\`\\\`javascript
// Pre-compute for O(1) lookup
const fibonacci = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34];
function fib(n) {
    return fibonacci[n];
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Set.has() is faster than Array.includes() because:',
                        type: 'multiple-choice',
                        options: ['Sets are smaller', 'Sets use hash-based O(1) lookup', 'Sets are sorted', 'Arrays have more methods'],
                        answer: 1
                    },
                    {
                        prompt: 'Map is better than Object when:',
                        type: 'multiple-choice',
                        options: ['Keys are strings', 'You need any type as key', 'You need JSON.stringify', 'You need prototype methods'],
                        answer: 1
                    },
                    {
                        prompt: 'Converting array to Set before lookups:',
                        type: 'multiple-choice',
                        options: ['Wastes memory', 'Changes O(n) to O(1) lookup', 'Is always slower', 'Only works with numbers'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-7',
                title: 'String Optimization',
                description: 'Efficient string handling',
                stage: 3,
                content: `
# String Optimization

Strings are immutable - each change creates new string.

## String Concatenation:
\\\`\\\`\\\`javascript
// Bad - creates many intermediate strings
let result = '';
for (let i = 0; i < 1000; i++) {
    result += 'item' + i + ', ';
}

// Good - join array
const parts = [];
for (let i = 0; i < 1000; i++) {
    parts.push(\\\`item\\\${i}\\\`);
}
const result = parts.join(', ');

// Even better - template literals for simple cases
const greeting = \\\`Hello, \\\${name}!\\\`;
\\\`\\\`\\\`

## Avoid Repeated Operations:
\\\`\\\`\\\`javascript
// Bad - toLowerCase every comparison
for (const word of words) {
    if (word.toLowerCase() === searchTerm.toLowerCase()) {
        // found
    }
}

// Good - convert once
const searchLower = searchTerm.toLowerCase();
for (const word of words) {
    if (word.toLowerCase() === searchLower) {
        // found
    }
}
\\\`\\\`\\\`

## Substring vs Slice:
\\\`\\\`\\\`javascript
// Both work, slice is more flexible
str.substring(1, 5);
str.slice(1, 5);
str.slice(-3);  // Last 3 characters
\\\`\\\`\\\`

## RegExp Optimization:
\\\`\\\`\\\`javascript
// Compile regex once
const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
emails.filter(email => emailRegex.test(email));

// Don't create in loop
// Bad
for (const str of strings) {
    if (/pattern/.test(str)) {}  // Creates new regex each time
}
\\\`\\\`\\\`

## String Search Methods:
\\\`\\\`\\\`javascript
// For simple checks, avoid regex
str.includes('hello')      // Faster than /hello/.test(str)
str.startsWith('hello')    // Faster than /^hello/.test(str)
str.endsWith('hello')      // Faster than /hello$/.test(str)
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Strings in JavaScript are:',
                        type: 'multiple-choice',
                        options: ['Mutable', 'Immutable', 'Arrays', 'Objects'],
                        answer: 1
                    },
                    {
                        prompt: 'For building long strings, prefer:',
                        type: 'multiple-choice',
                        options: ['Concatenation with +', 'Array.join()', 'String.concat()', 'charAt()'],
                        answer: 1
                    },
                    {
                        prompt: 'str.includes() is faster than regex for:',
                        type: 'multiple-choice',
                        options: ['Pattern matching', 'Simple substring check', 'Replacements', 'Splitting'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-8',
                title: 'Memory Optimization',
                description: 'Reducing memory usage',
                stage: 3,
                content: `
# Memory Optimization

Efficient memory usage prevents leaks and improves performance.

## Common Memory Leaks:
\\\`\\\`\\\`javascript
// 1. Forgotten event listeners
element.addEventListener('click', handler);
// Must remove when done:
element.removeEventListener('click', handler);

// 2. Forgotten intervals
const id = setInterval(doWork, 1000);
// Must clear:
clearInterval(id);

// 3. Closures holding references
function createHandler() {
    const bigData = new Array(1000000);
    return function() {
        console.log(bigData.length);  // bigData can't be garbage collected
    };
}

// 4. Global variables
window.myData = hugeArray;  // Never garbage collected
\\\`\\\`\\\`

## Garbage Collection:
\\\`\\\`\\\`javascript
// Objects are collected when unreachable
let obj = { data: 'big' };
obj = null;  // Can be garbage collected

// Circular references (modern GC handles these)
let a = {};
let b = {};
a.ref = b;
b.ref = a;
// Set both to null to allow collection
\\\`\\\`\\\`

## WeakMap and WeakSet:
\\\`\\\`\\\`javascript
// WeakMap - doesn't prevent garbage collection
const cache = new WeakMap();

function process(obj) {
    if (cache.has(obj)) {
        return cache.get(obj);
    }
    const result = expensiveOperation(obj);
    cache.set(obj, result);
    return result;
}
// When obj is no longer referenced elsewhere,
// the cache entry is automatically removed
\\\`\\\`\\\`

## Object Pooling:
\\\`\\\`\\\`javascript
// Reuse objects instead of creating new ones
class ObjectPool {
    constructor(createFn) {
        this.pool = [];
        this.create = createFn;
    }
    acquire() {
        return this.pool.pop() || this.create();
    }
    release(obj) {
        this.pool.push(obj);
    }
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Memory leaks often come from:',
                        type: 'multiple-choice',
                        options: ['Too many functions', 'Forgotten event listeners/intervals', 'Using const', 'Short variable names'],
                        answer: 1
                    },
                    {
                        prompt: 'WeakMap is useful for:',
                        type: 'multiple-choice',
                        options: ['Faster lookups', 'Caching without preventing garbage collection', 'String keys', 'Ordered data'],
                        answer: 1
                    },
                    {
                        prompt: 'Object pooling helps by:',
                        type: 'multiple-choice',
                        options: ['Creating more objects', 'Reusing objects to reduce allocations', 'Deleting objects faster', 'Sorting objects'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-9',
                title: 'DOM Optimization',
                description: 'Fast DOM manipulation',
                stage: 3,
                content: `
# DOM Optimization

DOM operations are expensive.

## Minimize DOM Access:
\\\`\\\`\\\`javascript
// Bad - multiple DOM reads
for (let i = 0; i < 100; i++) {
    document.getElementById('box').style.left = i + 'px';
}

// Good - cache reference
const box = document.getElementById('box');
for (let i = 0; i < 100; i++) {
    box.style.left = i + 'px';
}
\\\`\\\`\\\`

## Batch DOM Changes:
\\\`\\\`\\\`javascript
// Bad - multiple reflows
list.appendChild(item1);
list.appendChild(item2);
list.appendChild(item3);

// Good - use fragment
const fragment = document.createDocumentFragment();
fragment.appendChild(item1);
fragment.appendChild(item2);
fragment.appendChild(item3);
list.appendChild(fragment);  // Single reflow
\\\`\\\`\\\`

## innerHTML vs createElement:
\\\`\\\`\\\`javascript
// innerHTML - fast for large updates
container.innerHTML = '<div>...</div>';

// createElement - better for small updates
const div = document.createElement('div');
container.appendChild(div);
\\\`\\\`\\\`

## Avoid Layout Thrashing:
\\\`\\\`\\\`javascript
// Bad - read/write interleaving causes reflow
for (const el of elements) {
    const height = el.offsetHeight;  // Read (reflow)
    el.style.height = height + 10 + 'px';  // Write
}

// Good - batch reads, then writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
    el.style.height = heights[i] + 10 + 'px';
});
\\\`\\\`\\\`

## Use CSS Classes:
\\\`\\\`\\\`javascript
// Bad - multiple style changes
el.style.color = 'red';
el.style.fontSize = '16px';
el.style.fontWeight = 'bold';

// Good - single class change
el.classList.add('highlighted');
\\\`\\\`\\\`

## Virtual DOM:
React, Vue use virtual DOM to batch changes
and minimize actual DOM operations.
        `,
                exercises: [
                    {
                        prompt: 'DocumentFragment is used to:',
                        type: 'multiple-choice',
                        options: ['Split documents', 'Batch DOM insertions', 'Delete elements', 'Style elements'],
                        answer: 1
                    },
                    {
                        prompt: 'Layout thrashing is caused by:',
                        type: 'multiple-choice',
                        options: ['Too many elements', 'Interleaving reads and writes', 'Using classes', 'Using fragments'],
                        answer: 1
                    },
                    {
                        prompt: 'Changing CSS class instead of individual styles:',
                        type: 'multiple-choice',
                        options: ['Is slower', 'Is faster - single reflow', 'Uses more memory', "Doesn't work"],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-10',
                title: 'Async Optimization',
                description: 'Optimizing asynchronous code',
                stage: 4,
                content: `
# Async Optimization

Non-blocking code for better performance.

## Parallel vs Sequential:
\\\`\\\`\\\`javascript
// Sequential - slow
const user = await fetchUser(1);
const posts = await fetchPosts(1);
const comments = await fetchComments(1);
// Total time: sum of all

// Parallel - fast
const [user, posts, comments] = await Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
]);
// Total time: longest one
\\\`\\\`\\\`

## Promise.allSettled:
\\\`\\\`\\\`javascript
// Continue even if some fail
const results = await Promise.allSettled([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1)
]);

results.forEach(result => {
    if (result.status === 'fulfilled') {
        console.log(result.value);
    } else {
        console.error(result.reason);
    }
});
\\\`\\\`\\\`

## Debouncing:
\\\`\\\`\\\`javascript
// Limit how often function runs
function debounce(fn, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}

const searchHandler = debounce(search, 300);
input.addEventListener('input', searchHandler);
\\\`\\\`\\\`

## Throttling:
\\\`\\\`\\\`javascript
// Ensure function runs at most once per interval
function throttle(fn, interval) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= interval) {
            lastTime = now;
            fn(...args);
        }
    };
}

const scrollHandler = throttle(onScroll, 100);
window.addEventListener('scroll', scrollHandler);
\\\`\\\`\\\`

## Web Workers:
\\\`\\\`\\\`javascript
// Offload heavy computation
const worker = new Worker('worker.js');
worker.postMessage(largeData);
worker.onmessage = (e) => {
    console.log('Result:', e.data);
};
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Promise.all runs promises:',
                        type: 'multiple-choice',
                        options: ['Sequentially', 'In parallel', 'One at a time', 'In reverse'],
                        answer: 1
                    },
                    {
                        prompt: 'Debouncing is useful for:',
                        type: 'multiple-choice',
                        options: ['Speeding up functions', 'Limiting rapid function calls', 'Parallel execution', 'Error handling'],
                        answer: 1
                    },
                    {
                        prompt: 'Web Workers are used for:',
                        type: 'multiple-choice',
                        options: ['DOM manipulation', 'Background computation', 'Network requests only', 'CSS styling'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-11',
                title: 'Caching Strategies',
                description: 'Store results to avoid recomputation',
                stage: 4,
                content: `
# Caching Strategies

Store results to avoid repeated work.

## Memoization:
\\\`\\\`\\\`javascript
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const expensiveCalc = memoize((n) => {
    console.log('Computing...');
    return n * n;
});

expensiveCalc(5);  // Computing... 25
expensiveCalc(5);  // 25 (cached)
\\\`\\\`\\\`

## LRU Cache:
\\\`\\\`\\\`javascript
class LRUCache {
    constructor(maxSize) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }
    
    get(key) {
        if (!this.cache.has(key)) return undefined;
        // Move to end (most recent)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }
    
    set(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.maxSize) {
            // Remove oldest (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}
\\\`\\\`\\\`

## HTTP Caching:
\\\`\\\`\\\`javascript
// Cache API responses
const cache = new Map();

async function fetchWithCache(url) {
    if (cache.has(url)) {
        return cache.get(url);
    }
    const response = await fetch(url);
    const data = await response.json();
    cache.set(url, data);
    return data;
}
\\\`\\\`\\\`

## LocalStorage Caching:
\\\`\\\`\\\`javascript
function cacheWithExpiry(key, data, ttlMs) {
    const item = {
        data,
        expiry: Date.now() + ttlMs
    };
    localStorage.setItem(key, JSON.stringify(item));
}

function getFromCache(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item || Date.now() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.data;
}
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Memoization stores:',
                        type: 'multiple-choice',
                        options: ['Function definitions', 'Previous function results', 'Variable names', 'Error logs'],
                        answer: 1
                    },
                    {
                        prompt: 'LRU cache evicts:',
                        type: 'multiple-choice',
                        options: ['Random items', 'Least recently used items', 'Most used items', 'Largest items'],
                        answer: 1
                    },
                    {
                        prompt: 'Cache with TTL means:',
                        type: 'multiple-choice',
                        options: ['Cache forever', 'Cache with time-to-live expiration', 'Cache in memory', 'Cache on disk'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-12',
                title: 'Network Optimization',
                description: 'Faster data loading',
                stage: 4,
                content: `
# Network Optimization

Reduce network latency and bandwidth.

## Request Optimization:
\\\`\\\`\\\`javascript
// Combine requests
// Instead of fetching user, then posts, then comments
// Create an API endpoint that returns all at once
const data = await fetch('/api/user-dashboard/1');

// GraphQL - request only what you need
const query = \\\`
    query {
        user(id: 1) {
            name
            posts(limit: 5) {
                title
            }
        }
    }
\\\`;
\\\`\\\`\\\`

## Lazy Loading:
\\\`\\\`\\\`javascript
// Images
<img loading="lazy" src="image.jpg">

// JavaScript modules
const module = await import('./heavy-module.js');

// React lazy
const HeavyComponent = React.lazy(() => 
    import('./HeavyComponent')
);
\\\`\\\`\\\`

## Pagination:
\\\`\\\`\\\`javascript
// Instead of loading all items
const allItems = await fetch('/api/items');  // 10,000 items!

// Load in pages
const page1 = await fetch('/api/items?page=1&limit=20');
\\\`\\\`\\\`

## Compression:
\\\`\\\`\\\`javascript
// Server should gzip responses
// Headers:
// Content-Encoding: gzip
// Accept-Encoding: gzip, deflate

// Minify JavaScript
// uglifyjs app.js -o app.min.js
\\\`\\\`\\\`

## Prefetching:
\\\`\\\`\\\`html
<!-- Prefetch next page -->
<link rel="prefetch" href="/next-page.html">

<!-- Preload critical resources -->
<link rel="preload" href="main.css" as="style">
<link rel="preload" href="hero.jpg" as="image">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//api.example.com">
\\\`\\\`\\\`

## Service Workers:
Cache assets for offline use and faster loads.
        `,
                exercises: [
                    {
                        prompt: 'loading="lazy" on images:',
                        type: 'multiple-choice',
                        options: ['Loads immediately', 'Loads when near viewport', 'Never loads', 'Loads last'],
                        answer: 1
                    },
                    {
                        prompt: 'Pagination helps by:',
                        type: 'multiple-choice',
                        options: ['Loading all data faster', 'Loading data in smaller chunks', 'Sorting data', 'Filtering data'],
                        answer: 1
                    },
                    {
                        prompt: 'link rel="prefetch":',
                        type: 'multiple-choice',
                        options: ['Blocks page load', 'Downloads resource for future use', 'Deletes cached files', 'Validates HTML'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-13',
                title: 'Algorithm Optimization',
                description: 'Choosing better algorithms',
                stage: 5,
                content: `
# Algorithm Optimization

Better algorithms beat micro-optimizations.

## Searching:
\\\`\\\`\\\`javascript
// Linear search - O(n)
function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) return i;
    }
    return -1;
}

// Binary search - O(log n) - requires sorted array
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}
\\\`\\\`\\\`

## Sorting:
\\\`\\\`\\\`javascript
// Bubble sort - O(n²) - avoid!
// Merge sort - O(n log n) - good
// Quicksort - O(n log n) average - very good
// Counting sort - O(n) - for small integers

// JavaScript's built-in is optimized
arr.sort((a, b) => a - b);
\\\`\\\`\\\`

## Two Pointer Technique:
\\\`\\\`\\\`javascript
// Find pair that sums to target - O(n)
function twoSum(sortedArr, target) {
    let left = 0, right = sortedArr.length - 1;
    while (left < right) {
        const sum = sortedArr[left] + sortedArr[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}
\\\`\\\`\\\`

## Sliding Window:
\\\`\\\`\\\`javascript
// Max sum of k consecutive elements - O(n)
function maxSumSubarray(arr, k) {
    let windowSum = arr.slice(0, k).reduce((a, b) => a + b);
    let maxSum = windowSum;
    
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}
\\\`\\\`\\\`

## Early Termination:
When possible, return as soon as you find the answer.
        `,
                exercises: [
                    {
                        prompt: 'Binary search requires:',
                        type: 'multiple-choice',
                        options: ['Unsorted array', 'Sorted array', 'Empty array', 'Linked list'],
                        answer: 1
                    },
                    {
                        prompt: 'Two pointer technique is useful for:',
                        type: 'multiple-choice',
                        options: ['Sorting', 'Finding pairs in sorted arrays', 'Printing', 'Deleting'],
                        answer: 1
                    },
                    {
                        prompt: 'Sliding window avoids:',
                        type: 'multiple-choice',
                        options: ['Using arrays', 'Recalculating entire window', 'Using pointers', 'Iteration'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-14',
                title: 'Build Optimization',
                description: 'Faster builds and smaller bundles',
                stage: 5,
                content: `
# Build Optimization

Ship smaller, faster code.

## Code Splitting:
\\\`\\\`\\\`javascript
// Vite/Webpack automatic code splitting
// Routes become separate chunks

// Manual splitting
const AdminPanel = () => import('./AdminPanel');
\\\`\\\`\\\`

## Tree Shaking:
\\\`\\\`\\\`javascript
// Only used exports are included
// Use ES modules for tree shaking
import { debounce } from 'lodash-es';  // Only debounce included
// Not: import _ from 'lodash';  // Everything included
\\\`\\\`\\\`

## Bundle Analyzer:
\\\`\\\`\\\`bash
# See what's in your bundle
npx vite-bundle-visualizer
npx webpack-bundle-analyzer
\\\`\\\`\\\`

## Minification:
\\\`\\\`\\\`javascript
// Before
function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        total += item.price;
    }
    return total;
}

// After minification
function c(t){let o=0;for(const e of t)o+=e.price;return o}
\\\`\\\`\\\`

## Compression:
- **Gzip**: 70% reduction typical
- **Brotli**: Better than gzip, modern browsers

## Image Optimization:
\\\`\\\`\\\`html
<!-- Responsive images -->
<img srcset="small.jpg 300w,
             medium.jpg 600w,
             large.jpg 1200w"
     sizes="(max-width: 600px) 300px, 600px">

<!-- Modern formats -->
<picture>
    <source srcset="image.webp" type="image/webp">
    <source srcset="image.avif" type="image/avif">
    <img src="image.jpg">
</picture>
\\\`\\\`\\\`

## Critical CSS:
Inline critical styles, defer the rest.

## Dependencies:
\\\`\\\`\\\`bash
# Check bundle size before adding
npx bundlephobia lodash
\\\`\\\`\\\`
        `,
                exercises: [
                    {
                        prompt: 'Tree shaking removes:',
                        type: 'multiple-choice',
                        options: ['All imports', 'Unused exports', 'Comments', 'Variables'],
                        answer: 1
                    },
                    {
                        prompt: 'Code splitting creates:',
                        type: 'multiple-choice',
                        options: ['Larger bundles', 'Separate chunks loaded on demand', 'More errors', 'Duplicate code'],
                        answer: 1
                    },
                    {
                        prompt: 'Brotli compression is:',
                        type: 'multiple-choice',
                        options: ['Worse than gzip', 'Better than gzip', 'Same as gzip', 'Not for web'],
                        answer: 1
                    }
                ]
            },
            {
                id: 'opt-15',
                title: 'Performance Testing',
                description: 'Measuring and monitoring',
                stage: 5,
                content: `
# Performance Testing

Continuous measurement prevents regression.

## Lighthouse:
\\\`\\\`\\\`bash
# CLI
npx lighthouse https://example.com --output html

# Chrome DevTools
F12 → Lighthouse tab → Analyze
\\\`\\\`\\\`

## Core Web Vitals:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Performance Budget:
\\\`\\\`\\\`json
{
    "bundles": [
        { "name": "main.js", "maxSize": "100kb" },
        { "name": "vendor.js", "maxSize": "200kb" }
    ],
    "metrics": {
        "fcp": 2000,
        "tti": 5000
    }
}
\\\`\\\`\\\`

## Automated Testing:
\\\`\\\`\\\`javascript
// Jest performance test
test('search completes in under 100ms', () => {
    const start = performance.now();
    search(largeArray, 'target');
    const duration = performance.now() - start;
    expect(duration).toBeLessThan(100);
});
\\\`\\\`\\\`

## CI Integration:
\\\`\\\`\\\`yaml
# GitHub Actions
- name: Run Lighthouse
  uses: treosh/lighthouse-ci-action@v9
  with:
    urls: |
      https://example.com
    budgetPath: ./budget.json
\\\`\\\`\\\`

## Real User Monitoring (RUM):
\\\`\\\`\\\`javascript
// Report actual user metrics
new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        // Send to analytics
        sendToAnalytics(entry.name, entry.value);
    }
}).observe({ entryTypes: ['largest-contentful-paint'] });
\\\`\\\`\\\`

Congratulations! You've completed Code Optimization! ⚡
        `,
                exercises: [
                    {
                        prompt: 'Lighthouse measures:',
                        type: 'multiple-choice',
                        options: ['Code syntax', 'Web performance and best practices', 'File sizes only', 'Network speed'],
                        answer: 1
                    },
                    {
                        prompt: 'LCP (Largest Contentful Paint) should be:',
                        type: 'multiple-choice',
                        options: ['Under 2.5 seconds', 'Over 5 seconds', 'Exactly 0', 'Any value'],
                        answer: 0
                    },
                    {
                        prompt: 'Performance budgets help:',
                        type: 'multiple-choice',
                        options: ['Reduce costs', 'Prevent performance regression', 'Write faster code', 'Debug errors'],
                        answer: 1
                    }
                ]
            }
        ]
    }
};

export default additionalCourses;
