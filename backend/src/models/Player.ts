// Player model for leaderboard
export interface Player {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  completedStories: string[];
  unlockedStories: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  playerName: string;
  score: number;
  level: number;
}

// Mock database
const mockPlayers: { [key: string]: Player } = {
  'player_1': {
    id: 'player_1',
    name: 'FaithfulGamer',
    totalPoints: 5000,
    level: 10,
    completedStories: ['david-goliath', 'noahs-ark', 'jesus-storm'],
    unlockedStories: ['david-goliath', 'noahs-ark', 'jesus-storm', 'jonah-whale', 'moses-red-sea'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'player_2': {
    id: 'player_2',
    name: 'BibleHero',
    totalPoints: 4500,
    level: 9,
    completedStories: ['david-goliath', 'noahs-ark'],
    unlockedStories: ['david-goliath', 'noahs-ark', 'jesus-storm', 'jonah-whale'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'player_3': {
    id: 'player_3',
    name: 'StoryTeller',
    totalPoints: 4000,
    level: 8,
    completedStories: ['david-goliath', 'noahs-ark'],
    unlockedStories: ['david-goliath', 'noahs-ark', 'jesus-storm'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

export const PlayerModel = {
  getAll: (): Player[] => {
    return Object.values(mockPlayers);
  },

  getById: (id: string): Player | undefined => {
    return mockPlayers[id];
  },

  getLeaderboard: (limit: number = 10): LeaderboardEntry[] => {
    return Object.values(mockPlayers)
      .sort((a, b) => b.totalPoints - a.totalPoints)
      .slice(0, limit)
      .map((player, index) => ({
        rank: index + 1,
        playerId: player.id,
        playerName: player.name,
        score: player.totalPoints,
        level: player.level
      }));
  },

  save: (player: Player): Player => {
    mockPlayers[player.id] = player;
    return player;
  },

  completeStory: (playerId: string, storyId: string, points: number): Player | undefined => {
    const player = mockPlayers[playerId];
    if (!player) return undefined;

    if (!player.completedStories.includes(storyId)) {
      player.completedStories.push(storyId);
    }
    player.totalPoints += points;
    player.level = Math.floor(player.totalPoints / 500) + 1;
    player.updatedAt = new Date();

    return PlayerModel.save(player);
  },

  unlockStory: (playerId: string, storyId: string): Player | undefined => {
    const player = mockPlayers[playerId];
    if (!player) return undefined;

    if (!player.unlockedStories.includes(storyId)) {
      player.unlockedStories.push(storyId);
    }
    player.updatedAt = new Date();

    return PlayerModel.save(player);
  }
};