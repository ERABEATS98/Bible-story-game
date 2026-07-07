import { Router, Request, Response } from 'express';
import { PlayerModel } from '../models/Player';

const router = Router();

// GET /api/leaderboard - Get global leaderboard
router.get('/leaderboard', (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const leaderboard = PlayerModel.getLeaderboard(limit);
    
    res.json({
      success: true,
      leaderboard,
      timestamp: new Date()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch leaderboard'
    });
  }
});

// GET /api/leaderboard/:playerId - Get player rank
router.get('/leaderboard/:playerId', (req: Request, res: Response) => {
  try {
    const { playerId } = req.params;
    const leaderboard = PlayerModel.getLeaderboard(1000);
    const playerEntry = leaderboard.find(entry => entry.playerId === playerId);
    
    if (!playerEntry) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    res.json({
      success: true,
      playerRank: playerEntry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch player rank'
    });
  }
});

export default router;