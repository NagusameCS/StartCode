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
        estimatedHours: 15,
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
                exercise: {
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
                exercise: {
                    prompt: 'Write the command to create a new user account.',
                    type: 'code',
                    language: 'javascript',
                    expectedOutput: 'create user with email and password',
                    hint: 'Use: create user with email and password'
                }
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
                exercise: {
                    prompt: 'Write command to add a document to "products" with name: "Laptop".',
                    type: 'code',
                    expectedOutput: 'add document to collection "products" with data name: "Laptop" end add',
                    hint: 'Use: add document to collection "name" with data field: value end add'
                }
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
                exercise: {
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
                exercise: {
                    prompt: 'Write a condition that checks if a user is logged in.',
                    type: 'code',
                    expectedOutput: 'request.auth != null',
                    hint: 'Check if request.auth is not null'
                }
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
                exercise: {
                    prompt: 'Write a rule condition allowing access only when user ID matches document userId.',
                    type: 'code',
                    expectedOutput: 'request.auth.uid == userId',
                    hint: 'Compare request.auth.uid with userId'
                }
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
                exercise: {
                    prompt: 'Write rules: anyone can read, only authenticated users can write.',
                    type: 'code',
                    expectedOutput: 'allow read: if true; allow write: if request.auth != null;',
                    hint: 'Separate read and write rules'
                }
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
                exercise: {
                    prompt: 'Write validation ensuring title is max 200 characters.',
                    type: 'code',
                    expectedOutput: 'request.resource.data.title.size() <= 200',
                    hint: 'Use .size() for string length'
                }
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
                exercise: {
                    prompt: 'Write a condition checking if user has admin claim.',
                    type: 'code',
                    expectedOutput: 'request.auth.token.admin == true',
                    hint: 'Access admin from request.auth.token'
                }
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
        estimatedHours: 12,
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
                exercise: {
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
                exercise: {
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
                exercise: {
                    prompt: 'What should you name the license file?',
                    type: 'code',
                    expectedOutput: 'LICENSE',
                    hint: 'All uppercase'
                }
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
                exercise: {
                    prompt: 'Write a clear bug title for: dark mode toggle sometimes works, page flickers.',
                    type: 'code',
                    expectedOutput: 'Dark mode toggle',
                    hint: 'Be specific about component and behavior'
                }
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
                exercise: {
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
                exercise: {
                    prompt: 'What folder should SECURITY.md be placed in?',
                    type: 'code',
                    expectedOutput: '.github',
                    hint: 'Starts with a dot'
                }
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
                exercise: {
                    prompt: 'Write command to create branch "bugfix/login-error".',
                    type: 'code',
                    expectedOutput: 'git checkout -b bugfix/login-error',
                    hint: 'Use: git checkout -b <branch-name>'
                }
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
                exercise: {
                    prompt: 'What folder should issue templates be in?',
                    type: 'code',
                    expectedOutput: '.github/ISSUE_TEMPLATE',
                    hint: 'Inside .github folder'
                }
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
                exercise: {
                    prompt: 'What keyword specifies when the workflow runs?',
                    type: 'code',
                    expectedOutput: 'on',
                    hint: 'Two-letter keyword'
                }
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
                exercise: {
                    prompt: 'What is the filename for Dependabot config?',
                    type: 'code',
                    expectedOutput: 'dependabot.yml',
                    hint: 'YAML file in .github'
                }
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
        estimatedHours: 10,
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
                exercise: {
                    prompt: 'What shortcut opens the Command Palette?',
                    type: 'multiple-choice',
                    options: ['Ctrl + P', 'Ctrl + Shift + P', 'Ctrl + O', 'Ctrl + N'],
                    answer: 1
                }
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
                exercise: {
                    prompt: 'What shortcut selects all occurrences of selected text?',
                    type: 'multiple-choice',
                    options: ['Ctrl + D', 'Ctrl + Shift + L', 'Ctrl + A', 'Alt + Click'],
                    answer: 1
                }
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
                exercise: {
                    prompt: 'Which extension auto-formats JavaScript on save?',
                    type: 'multiple-choice',
                    options: ['ESLint', 'Prettier', 'GitLens', 'Live Server'],
                    answer: 1
                }
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
                exercise: {
                    prompt: 'Write the setting to format code on save.',
                    type: 'code',
                    expectedOutput: 'editor.formatOnSave',
                    hint: 'Starts with editor.'
                }
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
                exercise: {
                    prompt: 'What shortcut toggles the terminal?',
                    type: 'code',
                    expectedOutput: 'Ctrl + `',
                    hint: 'Uses backtick key'
                }
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
                exercise: {
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
                exercise: {
                    prompt: 'What file specifies recommended extensions for the team?',
                    type: 'code',
                    expectedOutput: 'extensions.json',
                    hint: 'Has "extensions" in name'
                }
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
                exercise: {
                    prompt: 'What shortcut runs the default build task?',
                    type: 'code',
                    expectedOutput: 'Ctrl + Shift + B',
                    hint: 'Ctrl + Shift + B for Build'
                }
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
                exercise: {
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
            }
        ]
    }
};

export default additionalCourses;
