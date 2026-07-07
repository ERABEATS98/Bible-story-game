# Bible Story Game - API Reference

## Base URL
```
http://localhost:3000/api
```

## Endpoints

### Health Check

**GET** `/health`

Check if server is running.

**Response:**
```json
{
  "status": "Server is running"
}
```

---

### Get Leaderboard

**GET** `/leaderboard?limit=50`

Get global leaderboard.

**Query Parameters:**
- `limit` (optional): Number of top players to return (default: 50, max: 100)

**Response:**
```json
{
  "success": true,
  "leaderboard": [
    {
      "rank": 1,
      "playerName": "FaithfulGamer",
      "score": 5000,
      "level": 10
    }
  ]
}
```

---

### Get Player Rank

**GET** `/leaderboard/:playerId`

Get specific player's leaderboard rank.

**Response:**
```json
{
  "success": true,
  "playerRank": {
    "rank": 15,
    "playerId": "player_123",
    "playerName": "BibleHero",
    "score": 4500,
    "level": 9
  }
}
```

---

### Get Player Progress

**GET** `/progress/:userId`

Get player's game progress.

**Response:**
```json
{
  "userId": "player_123",
  "totalPoints": 1250,
  "level": 3,
  "completedStories": ["david-goliath", "noahs-ark"],
  "unlockedStories": ["david-goliath", "noahs-ark", "jesus-storm"]
}
```

---

### Save Player Progress

**POST** `/progress/save`

Save player progress to server.

**Request Body:**
```json
{
  "userId": "player_123",
  "progress": {
    "totalPoints": 1250,
    "level": 3,
    "completedStories": ["david-goliath"],
    "unlockedStories": ["noahs-ark"]
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Progress saved successfully"
}
```

---

### Record Story Completion

**POST** `/progress/complete-story`

Record story completion and update player.

**Request Body:**
```json
{
  "userId": "player_123",
  "storyId": "david-goliath",
  "points": 100,
  "unlockedStories": ["noahs-ark"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Story completion recorded",
  "player": {
    "totalPoints": 1350,
    "level": 3,
    "completedStories": ["david-goliath"],
    "unlockedStories": ["david-goliath", "noahs-ark", "jesus-storm"]
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message"
}
```

### Common Status Codes
- `200`: Success
- `400`: Bad request (missing parameters)
- `404`: Not found (player/story not found)
- `500`: Server error

---

## Example Usage (JavaScript/Axios)

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Get leaderboard
const leaderboard = await api.get('/leaderboard', { params: { limit: 10 } });

// Save player progress
await api.post('/progress/save', {
  userId: 'player_123',
  progress: { totalPoints: 1250, level: 3 }
});

// Record story completion
await api.post('/progress/complete-story', {
  userId: 'player_123',
  storyId: 'david-goliath',
  points: 100,
  unlockedStories: ['noahs-ark']
});
```