# StartCode 🚀

An interactive coding education platform built with React, Vite, and Firebase.

## Features

- 📚 **30+ Courses** - JavaScript, Python, React, SQL, and more
- 🧩 **Coding Challenges** - 30+ built-in challenges with test cases
- 👥 **Community Challenges** - Create and share your own challenges
- 🎨 **Canvas Mode** - Interactive visual coding with p5.js
- 📊 **Progress Tracking** - Track your learning journey
- 🏆 **Certificates** - Earn certificates for completed courses
- 👨‍🏫 **Teacher Mode** - Manage classes and track student progress
- 🌙 **Themes** - Multiple themes including dark mode

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

See [SECURITY.md](./SECURITY.md) for detailed security configuration.

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment. Push to `main` branch triggers automatic deployment.

### Vercel / Netlify

1. Connect your repository
2. Set environment variables (see `.env.example`)
3. Build command: `npm run build`
4. Output directory: `dist`

## Project Structure

```
src/
├── components/     # Reusable React components
├── config/         # Firebase and app configuration
├── data/           # Course content and challenges
├── engine/         # Code execution engine
├── pages/          # Page components
├── store/          # Zustand state management
├── styles/         # Global styles
└── utils/          # Utility functions
```

## Security

See [SECURITY.md](./SECURITY.md) for:
- Firebase Security Rules
- API key configuration
- Domain restrictions
- Best practices

## Tech Stack

- **Frontend**: React 19, Vite
- **State**: Zustand with persistence
- **Backend**: Firebase (Auth, Firestore, Realtime DB)
- **Styling**: CSS Modules
- **Code Editor**: CodeMirror 6
- **Canvas**: p5.js

## License

MIT License - see [LICENSE](./LICENSE)

