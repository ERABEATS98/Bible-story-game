import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useSelector } from 'react-redux';
import { STORIES } from '../data/stories';

const ProfileScreen = () => {
  const { userId, playerProgress } = useSelector((state: any) => state.game);

  const completionPercentage = Math.round(
    (playerProgress.completedStories.length / STORIES.length) * 100
  );

  const levelProgress = (playerProgress.totalPoints % 500) / 500;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatar}>👤</Text>
          </View>
          <Text style={styles.playerName}>Player #{userId || '12345'}</Text>
          <Text style={styles.playerId}>ID: {userId || 'Anonymous'}</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Overall Statistics</Text>
          
          <View style={styles.statCard}>
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Current Level</Text>
              <Text style={styles.statCardValue}>{playerProgress.level}</Text>
            </View>
            <View style={styles.statCardDivider} />
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Total Points</Text>
              <Text style={styles.statCardValue}>
                {playerProgress.totalPoints.toLocaleString()}
              </Text>
            </View>
            <View style={styles.statCardDivider} />
            <View style={styles.statCardContent}>
              <Text style={styles.statCardLabel}>Stories Completed</Text>
              <Text style={styles.statCardValue}>
                {playerProgress.completedStories.length}
              </Text>
            </View>
          </View>

          {/* Level Progress */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Level Progress</Text>
              <Text style={styles.progressPoints}>
                {playerProgress.totalPoints % 500} / 500 points
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${levelProgress * 100}%` }
                ]}
              />
            </View>
          </View>
        </View>

        {/* Story Progress */}
        <View style={styles.storyProgressSection}>
          <Text style={styles.sectionTitle}>Story Progress</Text>
          
          <View style={styles.completionCard}>
            <View style={styles.completionCircle}>
              <Text style={styles.completionPercentage}>{completionPercentage}%</Text>
            </View>
            <View style={styles.completionInfo}>
              <Text style={styles.completionTitle}>Adventure Progress</Text>
              <Text style={styles.completionText}>
                {playerProgress.completedStories.length} of {STORIES.length} stories completed
              </Text>
            </View>
          </View>

          {/* Individual Stories */}
          {STORIES.map((story) => {
            const isCompleted = playerProgress.completedStories.includes(story.id);
            const isUnlocked = playerProgress.unlockedStories.includes(story.id);

            return (
              <View key={story.id} style={styles.storyItem}>
                <View style={styles.storyItemContent}>
                  <View style={styles.storyItemStatus}>
                    {isCompleted ? (
                      <Text style={styles.statusEmoji}>✅</Text>
                    ) : isUnlocked ? (
                      <Text style={styles.statusEmoji}>🔓</Text>
                    ) : (
                      <Text style={styles.statusEmoji}>🔒</Text>
                    )}
                  </View>
                  <View style={styles.storyItemInfo}>
                    <Text style={styles.storyItemTitle}>{story.title}</Text>
                    <Text style={styles.storyItemChapter}>{story.chapter}</Text>
                  </View>
                  <Text style={styles.storyItemPoints}>+{story.rewards.points}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Achievements */}
        <View style={styles.achievementsSection}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          
          <View style={styles.achievementGrid}>
            <View style={[styles.achievementCard, playerProgress.level >= 5 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>🌟</Text>
              <Text style={styles.achievementName}>Rising Star</Text>
              <Text style={styles.achievementDesc}>Reach Level 5</Text>
            </View>
            
            <View style={[styles.achievementCard, completionPercentage >= 60 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>📚</Text>
              <Text style={styles.achievementName}>Story Enthusiast</Text>
              <Text style={styles.achievementDesc}>Complete 60% of stories</Text>
            </View>
            
            <View style={[styles.achievementCard, playerProgress.totalPoints >= 1000 && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>💎</Text>
              <Text style={styles.achievementName}>Point Master</Text>
              <Text style={styles.achievementDesc}>Earn 1,000 points</Text>
            </View>
            
            <View style={[styles.achievementCard, playerProgress.completedStories.length === STORIES.length && styles.achievementUnlocked]}>
              <Text style={styles.achievementEmoji}>👑</Text>
              <Text style={styles.achievementName}>Legend</Text>
              <Text style={styles.achievementDesc}>Complete all stories</Text>
            </View>
          </View>
        </View>

        {/* Settings Button */}
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>⚙️ Settings</Text>
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
    paddingVertical: 30,
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    fontSize: 40,
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  playerId: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 15,
    flexDirection: 'row',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statCardLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 5,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statCardDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#f0f0f0',
  },
  progressContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  progressPoints: {
    fontSize: 12,
    color: '#999',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e7ff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  storyProgressSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  completionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  completionCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  completionPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  completionInfo: {
    flex: 1,
  },
  completionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  completionText: {
    fontSize: 12,
    color: '#999',
  },
  storyItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  storyItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  storyItemStatus: {
    width: 40,
    alignItems: 'center',
  },
  statusEmoji: {
    fontSize: 20,
  },
  storyItemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  storyItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 3,
  },
  storyItemChapter: {
    fontSize: 11,
    color: '#999',
  },
  storyItemPoints: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#22c55e',
  },
  achievementsSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    opacity: 0.5,
  },
  achievementUnlocked: {
    opacity: 1,
    borderWidth: 2,
    borderColor: '#fbbf24',
    backgroundColor: '#fef3c7',
  },
  achievementEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementDesc: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  settingsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  settingsButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  settingsButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;