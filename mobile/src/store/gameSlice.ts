import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GameState {
  userId: string | null;
  currentStory: string | null;
  currentScene: string | null;
  playerProgress: {
    totalPoints: number;
    completedStories: string[];
    unlockedStories: string[];
    level: number;
  };
  isOffline: boolean;
}

const initialState: GameState = {
  userId: null,
  currentStory: null,
  currentScene: null,
  playerProgress: {
    totalPoints: 0,
    completedStories: [],
    unlockedStories: ['david-goliath'],
    level: 1
  },
  isOffline: false
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setCurrentStory: (state, action: PayloadAction<string | null>) => {
      state.currentStory = action.payload;
    },
    setCurrentScene: (state, action: PayloadAction<string | null>) => {
      state.currentScene = action.payload;
    },
    addPoints: (state, action: PayloadAction<number>) => {
      state.playerProgress.totalPoints += action.payload;
      state.playerProgress.level = Math.floor(state.playerProgress.totalPoints / 500) + 1;
    },
    completeStory: (state, action: PayloadAction<string>) => {
      if (!state.playerProgress.completedStories.includes(action.payload)) {
        state.playerProgress.completedStories.push(action.payload);
      }
    },
    unlockStory: (state, action: PayloadAction<string>) => {
      if (!state.playerProgress.unlockedStories.includes(action.payload)) {
        state.playerProgress.unlockedStories.push(action.payload);
      }
    },
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    }
  }
});

export const {
  setUserId,
  setCurrentStory,
  setCurrentScene,
  addPoints,
  completeStory,
  unlockStory,
  setOfflineMode
} = gameSlice.actions;

export default gameSlice.reducer;