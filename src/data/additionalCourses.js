// Additional Courses - Firebase, GitHub, VS Code
// These are merged into the main courses object

export const additionalCourses = {
    // Firebase Course
    'firebase': {
        id: 'firebase',
        name: 'Firebase',
        description: 'Build real-time apps with Google Firebase. Learn authentication, databases, and hosting.',
        category: 'fullstack',
        icon: '🔥',
        color: '#FFCA28',
        language: 'javascript',
        prerequisites: ['javascript'],
        estimatedHours: 12,
        lessons: [
            {
                id: 'firebase-1',
                title: 'What is Firebase?',
                description: 'Introduction to the Firebase platform',
                stage: 1,
                content: `
# What is Firebase?

Firebase is a Backend-as-a-Service (BaaS) platform by Google that handles the server-side of your app.

## Core Services:
- **Authentication**: User login/signup
- **Firestore**: NoSQL database
- **Realtime Database**: Live data sync
- **Storage**: File uploads
- **Hosting**: Deploy websites
- **Functions**: Serverless code

## Why Firebase?
- No server to manage
- Real-time updates
- Scales automatically
- Free tier available

## Setting Up:
1. Create project at firebase.google.com
2. Add Firebase SDK to your app
3. Initialize with your config
                `,
                exercise: {
                    prompt: 'Firebase is a Backend-as-a-Service. What does that mean for developers?',
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
- Anonymous

## Basic Auth Flow:

\`\`\`
// Import auth
import auth from firebase auth

// Sign up new user
create user with email and password

// Sign in existing user
sign in with email and password

// Sign out
sign out current user

// Listen for auth changes
on auth state changed do
    if user exists then
        display "Logged in as " plus user email
    otherwise
        display "Not logged in"
    end if
end listener
\`\`\`

## Auth State:
Firebase automatically persists login state across page refreshes!
                `,
                exercise: {
                    prompt: 'Write the natural language to sign in a user with email and password',
                    type: 'code',
                    language: 'javascript',
                    expectedNatural: 'sign in with email and password',
                    expectedOutput: 'sign in with email and password',
                    hint: 'Use: sign in with email and password'
                }
            },
            {
                id: 'firebase-3',
                title: 'Reading Code: Auth Setup',
                description: 'Understand real Firebase auth code',
                stage: 2,
                content: `
# Reading Real Firebase Code

Let's learn to read actual Firebase authentication code!

## Real JavaScript Code:
\`\`\`javascript
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const auth = getAuth();
const provider = new GoogleAuthProvider();

async function loginWithGoogle() {
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('Welcome', user.displayName);
    } catch (error) {
        console.error('Login failed:', error.message);
    }
}
\`\`\`

## Breaking It Down:
1. **import**: Get the functions we need
2. **getAuth()**: Initialize authentication
3. **GoogleAuthProvider**: Sets up Google login
4. **signInWithPopup**: Opens Google login popup
5. **result.user**: Contains user info after login
6. **try/catch**: Handle errors gracefully
                `,
                exercise: {
                    prompt: 'In the code above, what does signInWithPopup return when successful?',
                    type: 'multiple-choice',
                    options: [
                        'Just the user email',
                        'A result object containing the user',
                        'Nothing (undefined)',
                        'An error message'
                    ],
                    answer: 1
                }
            },
            {
                id: 'firebase-4',
                title: 'Firestore Database',
                description: 'Store and retrieve data',
                stage: 2,
                content: `
# Firestore Database

Firestore is a NoSQL document database.

## Structure:
- **Collections**: Groups of documents (like folders)
- **Documents**: Individual records (like files)
- **Fields**: Data in documents (like file contents)

## Example Structure:
\`\`\`
users (collection)
  - user123 (document)
    - name: "Alice"
    - email: "alice@email.com"
    - age: 25
  - user456 (document)
    - name: "Bob"
    - email: "bob@email.com"
\`\`\`

## Basic Operations:
\`\`\`
// Add document
add document to collection "users" with data name: "Alice", age: 25 end add

// Get document
get document "user123" from collection "users"

// Update document
update document "user123" in collection "users" set age to 26 end update

// Delete document
delete document "user123" from collection "users"
\`\`\`
                `,
                exercise: {
                    prompt: 'Add a document to the "posts" collection with title: "Hello World"',
                    type: 'code',
                    language: 'javascript',
                    expectedNatural: 'add document to collection "posts" with data title: "Hello World" end add',
                    expectedOutput: 'add document to collection "posts" with data title: "Hello World" end add',
                    hint: 'Use: add document to collection "name" with data ... end add'
                }
            }
        ]
    },

    // GitHub Course
    'github': {
        id: 'github',
        name: 'GitHub',
        description: 'Master GitHub for collaboration, version control, and open source contribution.',
        category: 'tools',
        icon: '🐙',
        color: '#333333',
        language: null,
        prerequisites: ['git'],
        estimatedHours: 8,
        lessons: [
            {
                id: 'github-1',
                title: 'What is GitHub?',
                description: 'Understanding GitHub vs Git',
                stage: 1,
                content: `
# What is GitHub?

GitHub is a web platform for hosting Git repositories and collaborating with others.

## Git vs GitHub:
- **Git**: Version control system (local)
- **GitHub**: Cloud hosting + collaboration (remote)

## Key Features:
- **Repositories**: Project storage
- **Issues**: Bug tracking & features
- **Pull Requests**: Code review
- **Actions**: Automation (CI/CD)
- **Pages**: Free website hosting
- **Codespaces**: Cloud development

## Why GitHub?
- Backup your code
- Collaborate with teams
- Showcase your work (portfolio!)
- Contribute to open source
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
                title: 'Creating a Repository',
                description: 'Set up your first repo',
                stage: 1,
                content: `
# Creating a Repository

A repository (repo) holds all your project files and history.

## On GitHub.com:
1. Click "+" -> "New repository"
2. Enter repository name
3. Choose public or private
4. Optionally add README, .gitignore, license
5. Click "Create repository"

## Cloning to Local:
\`\`\`
git clone https://github.com/username/repo-name.git
\`\`\`

## Creating from Local:
\`\`\`
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
\`\`\`

## Repository Structure:
- **README.md**: Project description
- **.gitignore**: Files to not track
- **LICENSE**: Usage permissions
                `,
                exercise: {
                    prompt: 'What command connects your local repo to GitHub?',
                    type: 'code',
                    expectedNatural: 'git remote add origin',
                    expectedOutput: 'git remote add origin',
                    hint: 'Use: git remote add origin <url>'
                }
            },
            {
                id: 'github-3',
                title: 'Understanding Issues',
                description: 'Track bugs and features',
                stage: 1,
                content: `
# GitHub Issues

Issues are GitHub's task tracking system.

## Creating an Issue:
1. Go to "Issues" tab
2. Click "New issue"
3. Add title and description
4. Assign labels, assignees, projects
5. Submit

## Good Issue Template:
\`\`\`markdown
## Description
What is the bug or feature?

## Steps to Reproduce (for bugs)
1. Go to...
2. Click on...
3. See error

## Expected Behavior
What should happen?

## Screenshots
If applicable, add screenshots.
\`\`\`

## Labels:
- **bug**: Something is broken
- **enhancement**: New feature
- **good first issue**: Beginner friendly
- **help wanted**: Need contributors
                `,
                exercise: {
                    prompt: 'What label indicates an issue is good for beginners?',
                    type: 'multiple-choice',
                    options: [
                        'bug',
                        'enhancement',
                        'good first issue',
                        'help wanted'
                    ],
                    answer: 2
                }
            },
            {
                id: 'github-4',
                title: 'Pull Requests',
                description: 'Propose and review changes',
                stage: 2,
                content: `
# Pull Requests (PRs)

Pull requests let you propose changes and get code review.

## PR Workflow:
1. Create a branch
2. Make your changes
3. Push the branch
4. Open a pull request
5. Get reviews
6. Address feedback
7. Merge when approved

## Creating a PR:
\`\`\`
# Create and switch to new branch
git checkout -b feature/new-button

# Make changes and commit
git add .
git commit -m "Add new button component"

# Push branch to GitHub
git push origin feature/new-button
\`\`\`

Then on GitHub, click "Compare & pull request"

## PR Best Practices:
- Clear title and description
- Small, focused changes
- Link related issues
- Respond to feedback promptly
                `,
                exercise: {
                    prompt: 'Write the command to create and switch to a new branch called "fix/typo"',
                    type: 'code',
                    expectedNatural: 'git checkout -b fix/typo',
                    expectedOutput: 'git checkout -b fix/typo',
                    hint: 'Use: git checkout -b <branch-name>'
                }
            }
        ]
    },

    // VS Code Course
    'vscode': {
        id: 'vscode',
        name: 'VS Code Mastery',
        description: 'Master Visual Studio Code to boost your productivity with shortcuts, extensions, and workflows.',
        category: 'tools',
        icon: '💻',
        color: '#007ACC',
        language: null,
        prerequisites: [],
        estimatedHours: 6,
        lessons: [
            {
                id: 'vscode-1',
                title: 'Getting Started with VS Code',
                description: 'Set up your development environment',
                stage: 1,
                content: `
# Getting Started with VS Code

VS Code is a free, powerful code editor by Microsoft.

## Key Features:
- **IntelliSense**: Smart code completion
- **Debugging**: Built-in debugger
- **Git Integration**: Version control
- **Extensions**: Thousands of add-ons
- **Themes**: Customize appearance
- **Terminal**: Built-in command line

## Installing:
1. Go to code.visualstudio.com
2. Download for your OS
3. Install and launch

## First Steps:
- Open a folder (File -> Open Folder)
- Create a new file (Ctrl/Cmd + N)
- Open Command Palette (Ctrl/Cmd + Shift + P)
- Access Settings (Ctrl/Cmd + ,)
                `,
                exercise: {
                    prompt: 'What keyboard shortcut opens the Command Palette?',
                    type: 'multiple-choice',
                    options: [
                        'Ctrl + P',
                        'Ctrl + Shift + P',
                        'Ctrl + O',
                        'Ctrl + N'
                    ],
                    answer: 1
                }
            },
            {
                id: 'vscode-2',
                title: 'Essential Keyboard Shortcuts',
                description: 'Navigate like a pro',
                stage: 1,
                content: `
# Essential Keyboard Shortcuts

Master these to code faster!

## File Navigation:
| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + P | Quick file open |
| Ctrl/Cmd + Tab | Switch between open files |
| Ctrl/Cmd + Backslash | Split editor |
| Ctrl/Cmd + W | Close current file |
| Ctrl/Cmd + Shift + E | Focus file explorer |

## Editing:
| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + D | Select next occurrence |
| Ctrl/Cmd + Shift + L | Select all occurrences |
| Alt + Up/Down | Move line up/down |
| Ctrl/Cmd + Shift + K | Delete line |
| Ctrl/Cmd + / | Toggle comment |

## Search:
| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + F | Find in file |
| Ctrl/Cmd + H | Find and replace |
| Ctrl/Cmd + Shift + F | Search all files |

## Pro Tips:
- Hold Alt and click for multiple cursors
- Ctrl/Cmd + L to select entire line
                `,
                exercise: {
                    prompt: 'What shortcut selects the next occurrence of the current selection?',
                    type: 'multiple-choice',
                    options: [
                        'Ctrl + F',
                        'Ctrl + D',
                        'Ctrl + A',
                        'Ctrl + S'
                    ],
                    answer: 1
                }
            },
            {
                id: 'vscode-3',
                title: 'Must-Have Extensions',
                description: 'Supercharge your editor',
                stage: 1,
                content: `
# Must-Have Extensions

Extensions add superpowers to VS Code!

## Install Extensions:
1. Click Extensions icon (Ctrl/Cmd + Shift + X)
2. Search for extension
3. Click "Install"

## Essential Extensions:

### For Everyone:
- **Prettier**: Auto-format code
- **GitLens**: Enhanced Git features
- **Error Lens**: Inline error display
- **Live Server**: Local development server

### For Web Dev:
- **ES7+ Snippets**: React/JS shortcuts
- **Auto Rename Tag**: HTML tag sync
- **CSS Peek**: Navigate to CSS definitions

### For Python:
- **Python**: Microsoft's Python extension
- **Pylance**: Fast language server

### Productivity:
- **Code Spell Checker**: Catch typos
- **Todo Tree**: Find TODOs in code
- **Better Comments**: Colored comments
                `,
                exercise: {
                    prompt: 'What extension automatically formats your code on save?',
                    type: 'multiple-choice',
                    options: [
                        'GitLens',
                        'Prettier',
                        'Error Lens',
                        'Live Server'
                    ],
                    answer: 1
                }
            }
        ]
    }
};

export default additionalCourses;
