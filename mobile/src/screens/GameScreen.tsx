import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPoints, completeStory, unlockStory, setCurrentScene } from '../store/gameSlice';
import { STORIES } from '../data/stories';

const GameScreen = ({ route, navigation }: any) => {
  const { storyId } = route.params;
  const dispatch = useDispatch();
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [storyScore, setStoryScore] = useState(0);

  const story = STORIES.find(s => s.id === storyId);
  
  if (!story) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Story not found</Text>
      </SafeAreaView>
    );
  }

  const scene = story.scenes[currentSceneIndex];

  const handleChoice = (choice: any) => {
    const points = choice.pointsModifier;
    setStoryScore(storyScore + points);
    dispatch(addPoints(points));

    // Find next scene
    const nextSceneIndex = story.scenes.findIndex(s => s.id === choice.nextSceneId);
    if (nextSceneIndex !== -1) {
      setCurrentSceneIndex(nextSceneIndex);
    } else {
      completeTheStory();
    }
  };

  const handleNextScene = () => {
    if (currentSceneIndex < story.scenes.length - 1) {
      setCurrentSceneIndex(currentSceneIndex + 1);
    } else {
      completeTheStory();
    }
  };

  const completeTheStory = () => {
    const totalPoints = storyScore + story.rewards.points;
    dispatch(addPoints(story.rewards.points));
    dispatch(completeStory(storyId));

    // Unlock next stories
    story.rewards.unlocks.forEach(unlockedStoryId => {
      dispatch(unlockStory(unlockedStoryId));
    });

    navigation.navigate('StoryCompleteScreen', {
      storyId,
      totalPoints,
      unlockedStories: story.rewards.unlocks
    });
  };

  if (!scene) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Scene not found</Text>
      </SafeAreaView>
    );
  }

  const progress = ((currentSceneIndex + 1) / story.scenes.length) * 100;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with progress */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.sceneCounter}>
            Scene {currentSceneIndex + 1} / {story.scenes.length}
          </Text>
        </View>

        {/* Progress bar */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>

        {/* Scene content */}
        <View style={styles.sceneContainer}>
          {/* Scene image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: scene.imageUrl }}
              style={styles.sceneImage}
              defaultSource={require('../assets/placeholder.png')}
            />
            <View style={styles.imagePlaceholder}>
              <Text style={styles.placeholderText}>🎨</Text>
              <Text style={styles.placeholderSubtext}>{scene.title}</Text>
            </View>
          </View>

          {/* Scene title */}
          <Text style={styles.sceneTitle}>{scene.title}</Text>

          {/* Narration */}
          <Text style={styles.narration}>{scene.narration}</Text>

          {/* Score display */}
          <View style={styles.scoreBox}>
            <Text style={styles.scoreLabel}>Scene Score</Text>
            <Text style={styles.scoreValue}>+{storyScore}</Text>
          </View>

          {/* Choices or next button */}
          <View style={styles.buttonsContainer}>
            {scene.choices && scene.choices.length > 0 ? (
              <>
                <Text style={styles.choicePrompt}>What do you do?</Text>
                {scene.choices.map((choice: any) => (
                  <TouchableOpacity
                    key={choice.id}
                    style={styles.choiceButton}
                    onPress={() => handleChoice(choice)}
                  >
                    <Text style={styles.choiceText}>{choice.text}</Text>
                    <Text style={styles.choicePoints}>+{choice.pointsModifier}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNextScene}
              >
                <Text style={styles.nextButtonText}>
                  {currentSceneIndex < story.scenes.length - 1
                    ? 'Continue →'
                    : 'Complete Story ✓'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  sceneCounter: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#e0e7ff',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#10b981',
  },
  sceneContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sceneImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  placeholderText: {
    fontSize: 80,
    marginBottom: 10,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  sceneTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  narration: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  scoreBox: {
    backgroundColor: '#fef3c7',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#92400e',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#b45309',
  },
  buttonsContainer: {
    marginTop: 10,
  },
  choicePrompt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  choiceButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  choiceText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  choicePoints: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#22c55e',
    backgroundColor: '#f0fdf4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#ef4444',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GameScreen;