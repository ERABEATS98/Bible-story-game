export interface Story {
  id: string;
  title: string;
  description: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  scenes: Scene[];
  rewards: {
    points: number;
    unlocks: string[];
  };
}

export interface Scene {
  id: string;
  title: string;
  narration: string;
  imageUrl: string;
  animation?: string;
  choices?: Choice[];
  nextSceneId?: string;
}

export interface Choice {
  id: string;
  text: string;
  nextSceneId: string;
  pointsModifier: number;
}

export const STORIES: Story[] = [
  {
    id: 'david-goliath',
    title: 'David & Goliath',
    description: 'A young shepherd faces a giant with faith and courage',
    chapter: '1 Samuel 17',
    difficulty: 'easy',
    scenes: [
      {
        id: 'scene-1',
        title: 'The Giant\'s Challenge',
        narration: 'The Philistine army gathered with their giant warrior Goliath...',
        imageUrl: 'assets/david-goliath-1.png',
        nextSceneId: 'scene-2'
      },
      {
        id: 'scene-2',
        title: 'David Steps Forward',
        narration: 'Young David, full of faith, steps forward to face the giant...',
        imageUrl: 'assets/david-goliath-2.png',
        choices: [
          {
            id: 'choice-1',
            text: 'Trust in God\'s strength',
            nextSceneId: 'scene-3',
            pointsModifier: 10
          },
          {
            id: 'choice-2',
            text: 'Use armor like others',
            nextSceneId: 'scene-3-alt',
            pointsModifier: 5
          }
        ]
      }
    ],
    rewards: {
      points: 100,
      unlocks: ['noahs-ark']
    }
  },
  {
    id: 'noahs-ark',
    title: 'Noah\'s Ark',
    description: 'A faithful man builds an ark to save creation from the flood',
    chapter: 'Genesis 6-9',
    difficulty: 'easy',
    scenes: [
      {
        id: 'scene-1',
        title: 'God\'s Command',
        narration: 'God speaks to Noah, asking him to build an ark...',
        imageUrl: 'assets/noahs-ark-1.png',
        nextSceneId: 'scene-2'
      }
    ],
    rewards: {
      points: 100,
      unlocks: ['jesus-storm']
    }
  },
  {
    id: 'jesus-storm',
    title: 'Jesus & the Storm',
    description: 'Jesus calms a raging storm with a single word',
    chapter: 'Mark 4:35-41',
    difficulty: 'medium',
    scenes: [],
    rewards: {
      points: 150,
      unlocks: ['jonah-whale']
    }
  },
  {
    id: 'jonah-whale',
    title: 'Jonah & the Whale',
    description: 'A prophet runs from God and faces an incredible journey',
    chapter: 'Jonah 1-4',
    difficulty: 'medium',
    scenes: [],
    rewards: {
      points: 150,
      unlocks: ['moses-red-sea']
    }
  },
  {
    id: 'moses-red-sea',
    title: 'Moses & the Red Sea',
    description: 'God parts the Red Sea to lead His people to freedom',
    chapter: 'Exodus 14',
    difficulty: 'hard',
    scenes: [],
    rewards: {
      points: 200,
      unlocks: []
    }
  }
];