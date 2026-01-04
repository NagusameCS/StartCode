# Security Guide for StartCode

## Firebase API Key Security

### Understanding Firebase API Keys

**Firebase API keys are designed to be public.** Unlike traditional API keys, Firebase API keys only identify your Firebase project to Google's servers - they do NOT grant access to your data.

### How Security Actually Works

Security in Firebase is enforced through:

1. **Firebase Security Rules** - Define who can read/write what data
2. **Domain Restrictions** - Limit which domains can use your API key
3. **App Check** - Verify requests come from your legitimate app

### Setting Up Security Rules

#### Firestore Security Rules

Go to Firebase Console > Firestore > Rules and set up rules like:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own profile
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User progress - private to each user
    match /progress/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // User challenges - anyone can read, only author can write
    match /userChallenges/{challengeId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && 
        request.auth.uid == resource.data.authorId;
    }
  }
}
```

#### Realtime Database Security Rules

Go to Firebase Console > Realtime Database > Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null",
        ".write": "auth != null && auth.uid == $uid"
      }
    },
    "progress": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}
```

### Adding Domain Restrictions

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your Firebase project
3. Go to **APIs & Services** > **Credentials**
4. Click on your **Browser key** (API key)
5. Under **Application restrictions**, select **HTTP referrers**
6. Add your domains:
   - `https://yourdomain.com/*`
   - `https://*.yourdomain.com/*`
   - `http://localhost:*/*` (for development)

### Enabling App Check (Recommended)

1. Go to Firebase Console > App Check
2. Register your app with reCAPTCHA v3
3. Enforce App Check on Firestore and other services

## Environment Variables

For production deployments, use environment variables instead of hardcoded values:

### GitHub Actions (for GitHub Pages)

Add these secrets in your repository settings:

```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
VITE_FIREBASE_MEASUREMENT_ID
VITE_FIREBASE_DATABASE_URL
```

### Vercel

Add environment variables in Project Settings > Environment Variables

### Netlify

Add environment variables in Site settings > Environment variables

## Code Execution Security

StartCode includes code execution features for challenges. These use JavaScript's `new Function()` and `eval()` which have inherent risks.

### Current Mitigations

- Code runs in the browser's JavaScript context
- No server-side execution
- No access to the DOM in challenge execution

### Recommended Improvements

For enhanced security, consider:

1. **Web Workers** - Run code in isolated workers
2. **iframe Sandbox** - Execute in sandboxed iframes
3. **WASM Sandbox** - Use WebAssembly for isolation

## Authentication Security

StartCode supports multiple auth providers:

- Google OAuth
- GitHub OAuth
- Email/Password

### Best Practices

1. Enable multi-factor authentication in Firebase
2. Set up proper password policies
3. Use OAuth providers when possible (more secure than passwords)
4. Enable email verification for email/password auth

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by:

1. Opening a private security advisory on GitHub
2. Emailing the maintainers directly
3. NOT disclosing publicly until patched

## Security Checklist

Before going to production, ensure:

- [ ] Firebase Security Rules are configured
- [ ] API key domain restrictions are set
- [ ] App Check is enabled
- [ ] Environment variables are set in hosting platform
- [ ] Authentication providers are properly configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS is enforced
- [ ] Content Security Policy headers are set
