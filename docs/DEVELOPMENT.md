# Development Guide

## Setup

### Prerequisites
- Node.js 16+
- Expo CLI
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/ERABEATS98/Bible-story-game.git
cd Bible-story-game

# Install mobile dependencies
cd mobile
npm install

# Install backend dependencies
cd ../backend
npm install
```

## Running the App

### Mobile (React Native)

```bash
cd mobile
npx expo start

# Press 'i' for iOS simulator
# Press 'a' for Android simulator
# Press 'w' for web preview
```

### Backend

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:3000`

## Project Structure

- `mobile/src/screens/` - App screens (Home, Story, Leaderboard, etc.)
- `mobile/src/components/` - Reusable React components
- `mobile/src/store/` - Redux store configuration
- `mobile/src/data/` - Story data and content
- `mobile/src/services/` - API and database services
- `backend/src/` - Express server and routes

## Adding a New Story

1. Add story definition to `mobile/src/data/stories.ts`
2. Create scene assets (images, animations)
3. Add story assets to `mobile/src/assets/`
4. Test in Expo preview