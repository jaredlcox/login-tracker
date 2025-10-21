# Login Tracker - Setup Guide

## Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Set Up Firebase

#### Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or select an existing project
3. Follow the setup wizard

#### Enable Firestore Database

1. In your Firebase project, go to "Build" > "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location closest to your users
5. Click "Enable"

#### Get Firebase Configuration

1. In Firebase Console, go to Project Settings (gear icon)
2. Scroll down to "Your apps" section
3. Click the web icon (`</>`) to add a web app
4. Register your app with a nickname (e.g., "Login Tracker")
5. Copy the Firebase configuration values

#### Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

2. Open `.env.local` and replace the placeholder values with your Firebase config:
   \`\`\`env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   \`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Test the App

1. Navigate to the Dashboard
2. Enter a number in the "Add New Attempt" form
3. Click "SUBMIT ATTEMPT" - you should see pixel confetti!
4. Check the statistics update automatically
5. Go to "History" to see all attempts
6. Try deleting an attempt

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel project settings
5. Deploy!

### Important Notes

- All Firebase environment variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- For production, update Firestore security rules (currently in test mode)
- The app uses Firebase's free tier - perfect for small teams

## Firestore Security Rules (Production)

When ready for production, update your Firestore rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /loginAttempts/{document=**} {
      allow read, write: if true; // Update this for your security needs
    }
  }
}
\`\`\`

## Troubleshooting

### "Error saving attempt. Check Firebase config!"

- Verify all environment variables are set correctly in `.env.local`
- Restart the development server after changing `.env.local`
- Check Firebase Console to ensure Firestore is enabled

### No data showing up

- Check browser console for errors
- Verify Firestore security rules allow read/write
- Ensure you're using the correct Firebase project

### Styling looks wrong

- Clear browser cache
- Ensure Tailwind CSS is properly configured
- Check that `globals.css` is imported in `layout.jsx`

## Features

- **Dashboard**: Real-time statistics with animated counters
- **Add Attempts**: Pixel confetti animation on submission
- **History**: View and delete all recorded attempts
- **Responsive**: Works on mobile, tablet, and desktop
- **Retro Design**: Aseprite-inspired pixel art aesthetic

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Firebase Firestore
- Tailwind CSS v4
- Press Start 2P font

Enjoy tracking those login attempts!
