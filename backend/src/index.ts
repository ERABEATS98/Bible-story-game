import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leaderboardRouter from './routes/leaderboard';
import progressRouter from './routes/progress';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'Server is running' });
});

// Routes
app.use('/api', leaderboardRouter);
app.use('/api', progressRouter);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`⚡️ Server running at http://localhost:${PORT}`);
  console.log(`📊 Leaderboard: http://localhost:${PORT}/api/leaderboard`);
  console.log(`👤 Player Progress: http://localhost:${PORT}/api/progress/:userId`);
});