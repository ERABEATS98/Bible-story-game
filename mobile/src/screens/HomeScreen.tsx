import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStory } from '../store/gameSlice';
import { STORIES } from '../data/stories';

const HomeScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const { playerProgress } = useSelector((state: any) => state.game);
  const [loading, setLoading] = useState(false);

  const handleStoryPress = (storyId: string) => {
    dispatch(setCurrentStory(storyId));
    navigation.navigate('GameScreen', { storyId });
  };

  const isStoryUnlocked = (storyId: string) => {
    return playerProgress.unlockedStories.includes(storyId);
  };

  const isStoryCompleted = (storyId: string) => {
    return playerProgress.completedStories.includes(storyId);
  };

  const renderStoryCard = ({ item }: any) => {
    const unlocked = isStoryUnlocked(item.id);
    const completed = isStoryCompleted(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.storyCard,
          !unlocked && styles.lockedCard
        ]}
        onPress={() => unlocked && handleStoryPress(item.id)}
        disabled={!unlocked}
      >
        <View style={styles.cardContent}>
          <Text style={styles.storyTitle}>{item.title}</Text>
          <Text style={styles.storyDescription}>{item.description}</Text>
          <Text style={styles.storyChapter}>{item.chapter}</Text>
          
          <View style={styles.cardFooter}>
            <Text style={styles.difficulty}>
              {item.difficulty.toUpperCase()}
            </Text>
            <Text style={styles.points}>{item.rewards.points} pts</Text>
          </View>

          {completed && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✓ COMPLETED</Text>
            </View>
          )}

          {!unlocked && (
            <View style={styles.lockedBadge}>
              <Text style={styles.lockedText}>🔒 LOCKED</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Bible Story Game</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Level</Text>
              <Text style={styles.statValue}>{playerProgress.level}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Points</Text>
              <Text style={styles.statValue}>{playerProgress.totalPoints}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Stories</Text>
              <Text style={styles.statValue}>
                {playerProgress.completedStories.length}/{STORIES.length}
              </Text>
            </View>
          </View>
        </View>

        {/* Stories List */}
        <View style={styles.storiesSection}>
          <Text style={styles.sectionTitle}>Available Stories</Text>
          <FlatList
            data={STORIES}
            renderItem={renderStoryCard}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('LeaderboardScreen')}
          >
            <Text style={styles.navButtonText}>🏆 Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.navigate('ProfileScreen')}
          >
            <Text style={styles.navButtonText}>👤 Profile</Text>
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
  header: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statBox: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 5,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  storiesSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedCard: {
    opacity: 0.6,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    position: 'relative',
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  storyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  storyChapter: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  difficulty: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6366f1',
    backgroundColor: '#e0e7ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  points: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  completedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#22c55e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  completedText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  lockedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ef4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  lockedText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#fff',
  },
  navButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;