# Bible Story Game 📖

An immersive adventure/narrative game featuring Bible stories with visual storytelling, progression systems, and multiplayer features.

## 🎮 Game Features

- **Visual Storytelling**: Animations and illustrations bring Bible stories to life
- **Multiple Stories**: Start with core narratives (David & Goliath, Noah's Ark, Jesus & the Storm, Jonah & the Whale, Moses & the Red Sea)
- **Progression System**: Level-based advancement with unlockable stories
- **Scoring & Leaderboards**: Global leaderboards with player rankings
- **Offline Play**: Full functionality without internet connection
- **Cross-Platform**: iOS and Android via React Native/Expo
- **All Ages**: Family-friendly, educational content
- **Multiplayer**: Challenge friends, compete on leaderboards

## 📱 Tech Stack

- **Frontend**: React Native (Expo) - iOS & Android
- **State Management**: Redux
- **Database**: SQLite (offline), Firebase (optional cloud sync)
- **Backend**: Node.js/Express (minimal, leaderboard sync)
- **Animations**: React Native Reanimated, Lottie
- **Assets**: Illustrations & audio for Bible stories

## 📁 Project Structure

```
Bible-story-game/
├── mobile/                    # React Native app
│   ├── src/
│   │   ├── screens/          # Game screens
│   │   ├── components/       # Reusable UI components
│   │   ├── store/            # Redux state management
│   │   ├── data/             # Story data & game content
│   │   ├── services/         # API & database services
│   │   └── assets/           # Images, audio, animations
│   ├── app.json              # Expo config
│   └── package.json
├── backend/                   # Node.js backend
│   ├── src/
│   │   ├── api/              # Express routes
│   │   ├── models/           # Database models
│   │   └── middleware/       # Authentication, validation
│   └── package.json
├── docs/                      # Documentation
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- Xcode (iOS) or Android Studio (Android)

### Quick Start

```bash
# Install mobile app
cd mobile
npm install
npx expo start

# For iOS
i

# For Android
a

# Install backend
cd backend
npm install
npm start
```

## 🎯 MVP Features (Phase 1)

- [ ] 3-5 core Bible stories with visual content
- [ ] Basic progression/level system
- [ ] Offline SQLite storage
- [ ] Leaderboard display (local, no sync)
- [ ] Simple UI with story selection
- [ ] Audio narration/sound effects

## 🔮 Future Phases

- Phase 2: Cloud sync, multiplayer challenges, user accounts
- Phase 3: Story customization, difficulty levels, educational quizzes
- Phase 4: Social sharing, clan/community features

## 📝 License

Open source - all are welcome!

## 🙏 Contributing

Contributions welcome! Fork, create a feature branch, and submit a PR.