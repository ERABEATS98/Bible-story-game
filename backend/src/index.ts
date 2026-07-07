import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Leaderboard endpoint
app.get('/api/leaderboard', (req: Request, res: Response) => {
  // TODO: Fetch from database
  res.json({
    leaderboard: [
      { rank: 1, playerName: 'FaithfulGamer', score: 5000, level: 10 },
      { rank: 2, playerName: 'BibleHero', score: 4500, level: 9 },
      { rank: 3, playerName: 'StoryTeller', score: 4000, level: 8 }
    ]
  });
});

// Player progress endpoint
app.post('/api/progress/save', (req: Request, res: Response) => {
  const { userId, progress } = req.body;
  // TODO: Save to database
  res.json({ success: true, message: 'Progress saved' });
});

// Get player progress
app.get('/api/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  // TODO: Fetch from database
  res.json({
    userId,
    totalPoints: 0,
    level: 1,
    completedStories: [],
    unlockedStories: ['david-goliath']
  });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server running at http://localhost:${PORT}`);
});