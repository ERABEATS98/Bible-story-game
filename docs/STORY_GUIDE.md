# Bible Story Content Guide

## Story Format

Each story consists of scenes with narration, choices, and progression.

### Story Structure

```typescript
{
  id: 'story-id',
  title: 'Story Title',
  description: 'Short description',
  chapter: 'Bible reference',
  difficulty: 'easy|medium|hard',
  scenes: [
    {
      id: 'scene-1',
      title: 'Scene Title',
      narration: 'Story text...',
      imageUrl: 'assets/image.png',
      choices: [
        {
          text: 'Choice text',
          nextSceneId: 'scene-2',
          pointsModifier: 10
        }
      ]
    }
  ],
  rewards: {
    points: 100,
    unlocks: ['next-story-id']
  }
}
```

## Adding New Stories

1. **Create Story Definition** in `mobile/src/data/stories.ts`
2. **Add Story Assets**:
   - Scene images to `mobile/src/assets/images/`
   - Story audio to `mobile/src/assets/audio/`
   - Animations (Lottie JSON) to `mobile/src/assets/animations/`

3. **Test in Expo**:
   ```bash
   cd mobile
   npx expo start
   ```

## Content Recommendations

### For All Ages:
- Simple language, clear story progression
- Positive moral lessons
- Age-appropriate challenges

### Visual Assets:
- 300px height placeholder if no image
- PNG format for best quality
- Consistent art style

### Audio:
- MP3 format (128kbps)
- Background music optional
- Narration optional but recommended

## Example: Adding "Samson & Delilah"

```typescript
{
  id: 'samson-delilah',
  title: 'Samson & Delilah',
  description: 'A tale of strength, betrayal, and redemption',
  chapter: 'Judges 16',
  difficulty: 'medium',
  scenes: [
    {
      id: 'scene-1',
      title: 'The Strongest Man',
      narration: 'Samson was blessed with incredible strength...',
      imageUrl: 'assets/samson-delilah-1.png'
    },
    // More scenes...
  ],
  rewards: {
    points: 150,
    unlocks: ['next-story']
  }
}
```