import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  level: number;
}

export interface PlayerProgress {
  userId: string;
  totalPoints: number;
  level: number;
  completedStories: string[];
  unlockedStories: string[];
}

// Leaderboard endpoints
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const response = await api.get('/leaderboard');
    return response.data.leaderboard;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    throw error;
  }
}

export async function getTopPlayers(limit: number = 10): Promise<LeaderboardEntry[]> {
  try {
    const response = await api.get('/leaderboard', { params: { limit } });
    return response.data.leaderboard;
  } catch (error) {
    console.error('Error fetching top players:', error);
    throw error;
  }
}

// Player progress endpoints
export async function savePlayerProgress(
  userId: string,
  progress: Partial<PlayerProgress>
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.post('/progress/save', { userId, progress });
    return response.data;
  } catch (error) {
    console.error('Error saving progress:', error);
    throw error;
  }
}

export async function getPlayerProgress(userId: string): Promise<PlayerProgress> {
  try {
    const response = await api.get(`/progress/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching player progress:', error);
    throw error;
  }
}

export async function recordStoryCompletion(
  userId: string,
  storyId: string,
  points: number,
  unlockedStories: string[]
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await api.post('/progress/complete-story', {
      userId,
      storyId,
      points,
      unlockedStories
    });
    return response.data;
  } catch (error) {
    console.error('Error recording story completion:', error);
    throw error;
  }
}

// Health check
export async function checkHealthStatus(): Promise<boolean> {
  try {
    const response = await api.get('/health');
    return response.status === 200;
  } catch (error) {
    console.error('Error checking health:', error);
    return false;
  }
}

export default api;