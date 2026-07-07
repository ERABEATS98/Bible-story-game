import { Router, Request, Response } from 'express';
import { PlayerModel } from '../models/Player';

const router = Router();

// POST /api/progress/save - Save player progress
router.post('/progress/save', (req: Request, res: Response) => {
  try {
    const { userId, progress } = req.body;
    
    if (!userId || !progress) {
      return res.status(400).json({
        success: false,
        error: 'Missing userId or progress data'
      });
    }
    
    // In a real app, save to database
    res.json({
      success: true,
      message: 'Progress saved successfully',
      userId
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to save progress'
    });
  }
});

// GET /api/progress/:userId - Get player progress
router.get('/progress/:userId', (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const player = PlayerModel.getById(userId);
    
    if (!player) {
      return res.json({
        userId,
        totalPoints: 0,
        level: 1,
        completedStories: [],
        unlockedStories: ['david-goliath']
      });
    }
    
    res.json({
      userId: player.id,
      totalPoints: player.totalPoints,
      level: player.level,
      completedStories: player.completedStories,
      unlockedStories: player.unlockedStories
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch progress'
    });
  }
});

// POST /api/progress/complete-story - Record story completion
router.post('/progress/complete-story', (req: Request, res: Response) => {
  try {
    const { userId, storyId, points, unlockedStories } = req.body;
    
    if (!userId || !storyId || points === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }
    
    // Update player progress
    const player = PlayerModel.completeStory(userId, storyId, points);
    
    if (!player) {
      return res.status(404).json({
        success: false,
        error: 'Player not found'
      });
    }
    
    // Unlock new stories
    if (unlockedStories && Array.isArray(unlockedStories)) {
      unlockedStories.forEach(story => {
        PlayerModel.unlockStory(userId, story);
      });
    }
    
    res.json({
      success: true,
      message: 'Story completion recorded',
      player: {
        totalPoints: player.totalPoints,
        level: player.level,
        completedStories: player.completedStories,
        unlockedStories: player.unlockedStories
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to record story completion'
    });
  }
});

export default router;