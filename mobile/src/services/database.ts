import SQLite from 'react-native-sqlite-storage';

const DB_NAME = 'bible_story_game.db';
const DB_VERSION = '1.0';

export class GameDatabase {
  private db: any;

  async initialize() {
    this.db = await SQLite.openDatabase({
      name: DB_NAME,
      location: 'default',
      displayName: 'Bible Story Game DB',
      version: 1.0,
    });
    
    await this.createTables();
  }

  private async createTables() {
    // Players table
    await this.executeSql(
      `CREATE TABLE IF NOT EXISTS players (
        id TEXT PRIMARY KEY,
        name TEXT,
        totalPoints INTEGER DEFAULT 0,
        level INTEGER DEFAULT 1,
        createdAt INTEGER,
        updatedAt INTEGER
      )`
    );

    // Player progress table
    await this.executeSql(
      `CREATE TABLE IF NOT EXISTS progress (
        id TEXT PRIMARY KEY,
        playerId TEXT,
        storyId TEXT,
        completedAt INTEGER,
        points INTEGER,
        FOREIGN KEY(playerId) REFERENCES players(id)
      )`
    );

    // Unlocked stories table
    await this.executeSql(
      `CREATE TABLE IF NOT EXISTS unlocked_stories (
        id TEXT PRIMARY KEY,
        playerId TEXT,
        storyId TEXT,
        unlockedAt INTEGER,
        FOREIGN KEY(playerId) REFERENCES players(id)
      )`
    );
  }

  private async executeSql(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.executeSql(
        sql,
        params,
        (result) => resolve(result),
        (error) => reject(error)
      );
    });
  }

  // Player methods
  async createPlayer(id: string, name: string): Promise<void> {
    const now = Date.now();
    await this.executeSql(
      `INSERT INTO players (id, name, totalPoints, level, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, name, 0, 1, now, now]
    );
  }

  async getPlayer(id: string): Promise<any> {
    const result = await this.executeSql(
      'SELECT * FROM players WHERE id = ?',
      [id]
    );
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  async updatePlayerProgress(playerId: string, totalPoints: number): Promise<void> {
    const level = Math.floor(totalPoints / 500) + 1;
    await this.executeSql(
      `UPDATE players SET totalPoints = ?, level = ?, updatedAt = ?
       WHERE id = ?`,
      [totalPoints, level, Date.now(), playerId]
    );
  }

  // Progress methods
  async saveStoryCompletion(playerId: string, storyId: string, points: number): Promise<void> {
    const id = `${playerId}_${storyId}_${Date.now()}`;
    await this.executeSql(
      `INSERT INTO progress (id, playerId, storyId, completedAt, points)
       VALUES (?, ?, ?, ?, ?)`,
      [id, playerId, storyId, Date.now(), points]
    );
  }

  async getPlayerCompletedStories(playerId: string): Promise<string[]> {
    const result = await this.executeSql(
      'SELECT DISTINCT storyId FROM progress WHERE playerId = ?',
      [playerId]
    );
    const stories = [];
    for (let i = 0; i < result.rows.length; i++) {
      stories.push(result.rows.item(i).storyId);
    }
    return stories;
  }

  // Unlocked stories methods
  async unlockStory(playerId: string, storyId: string): Promise<void> {
    const id = `${playerId}_${storyId}`;
    const exists = await this.executeSql(
      'SELECT id FROM unlocked_stories WHERE id = ?',
      [id]
    );
    
    if (exists.rows.length === 0) {
      await this.executeSql(
        `INSERT INTO unlocked_stories (id, playerId, storyId, unlockedAt)
         VALUES (?, ?, ?, ?)`,
        [id, playerId, storyId, Date.now()]
      );
    }
  }

  async getUnlockedStories(playerId: string): Promise<string[]> {
    const result = await this.executeSql(
      'SELECT storyId FROM unlocked_stories WHERE playerId = ?',
      [playerId]
    );
    const stories = [];
    for (let i = 0; i < result.rows.length; i++) {
      stories.push(result.rows.item(i).storyId);
    }
    return stories;
  }

  async close(): Promise<void> {
    if (this.db) {
      await this.db.close();
    }
  }
}

export const gameDB = new GameDatabase();