import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useSelector } from 'react-redux';

const StoryCompleteScreen = ({ route, navigation }: any) => {
  const { storyId, totalPoints, unlockedStories } = route.params;
  const { playerProgress } = useSelector((state: any) => state.game);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Celebration */}
        <View style={styles.celebrationContainer}>
          <Text style={styles.celebrationEmoji}>🎉</Text>
          <Text style={styles.completionTitle}>Story Completed!</Text>
          <Text style={styles.completionSubtitle}>Well done, brave adventurer!</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Points Earned</Text>
            <Text style={styles.statValue}>+{totalPoints}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Current Level</Text>
            <Text style={styles.statValue}>{playerProgress.level}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Total Points</Text>
            <Text style={styles.statValue}>{playerProgress.totalPoints}</Text>
          </View>
        </View>

        {/* Unlocked Stories */}
        {unlockedStories && unlockedStories.length > 0 && (
          <View style={styles.unlockedContainer}>
            <Text style={styles.unlockedTitle}>🔓 New Stories Unlocked!</Text>
            {unlockedStories.map((storyTitle: string) => (
              <View key={storyTitle} style={styles.unlockedStory}>
                <Text style={styles.unlockedStoryText}>✨ {storyTitle}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <View style={styles.achievementRow}>
            <Text style={styles.achievementEmoji}>📖</Text>
            <Text style={styles.achievementText}>Story Completion</Text>
          </View>
          {playerProgress.completedStories.length >= 5 && (
            <View style={styles.achievementRow}>
              <Text style={styles.achievementEmoji}>🏆</Text>
              <Text style={styles.achievementText}>Master Storyteller</Text>
            </View>
          )}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate('HomeScreen')}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('LeaderboardScreen')}
          >
            <Text style={styles.secondaryButtonText}>View Leaderboard</Text>
          </TouchableOpacity>
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
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 20,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: 15,
  },
  completionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  completionSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  unlockedContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#22c55e',
  },
  unlockedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 10,
  },
  unlockedStory: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  unlockedStoryText: {
    fontSize: 14,
    color: '#166534',
    fontWeight: '500',
  },
  achievementsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 10,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
});

export default StoryCompleteScreen;