# Login Tracker

A funny internal tracker app built with Next.js 14 and Firebase Firestore that records how many attempts it takes for a co-worker to successfully log into their computer.

## Features

- **Dashboard**: View statistics including running total, running average, and averages by day/week/month
- **Add Attempts**: Submit new login attempts with pixel confetti animation
- **History**: View and delete all recorded attempts
- **Aseprite-Inspired Design**: Retro pixel art aesthetic with glowing effects

## Setup Instructions

### 1. Install Dependencies

\`\`\`npm install
\`\`\`

### 2. Configure Firebase

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable Firestore Database
4. Get your Firebase config from Project Settings > General > Your apps
5. Create a `.env.local` file in the root directory:

\`\`\`env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
\`\`\`

### 3. Run Development Server

\`\`\`npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 4. Deploy to Vercel

\`\`\`bash
npm run build
\`\`\`

Deploy to Vercel and add your Firebase environment variables in the project settings.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **Font**: Press Start 2P (Google Fonts)

## Project Structure

\`\`\`
app/
  layout.jsx          # Root layout with pixel font
  page.jsx            # Dashboard with statistics
  history/page.jsx    # History page with all attempts
components/
  StatCard.jsx        # Animated statistic card
  AddAttemptForm.jsx  # Form to add new attempts
  PixelConfetti.jsx   # Confetti animation
  Navbar.jsx          # Navigation bar
lib/
  firebase.js         # Firebase configuration
  firestoreUtils.js   # Firestore CRUD operations
utils/
  calcStats.js        # Statistics calculations
\`\`\`

## Color Palette

- Background: `#0D0D0D`
- Panel: `#1E293B`
- Aqua: `#22D3EE`
- Purple: `#A78BFA`
- Gold: `#FACC15`
- Green: `#10B981`
- Red: `#F43F5E`

## License

MIT
\`\`\`

```json file="" isHidden
