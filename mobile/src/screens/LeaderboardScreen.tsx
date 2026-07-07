import React, { useState, useEffect } from 'react';
import (
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import axios from 'axios';

interface LeaderboardEntry {
  rank: number;
  playerName: string;
  score: number;
  level: number;
}

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/leaderboard');
      setLeaderboard(response.data.leaderboard);
    } catch (error) {
      console.log('Error fetching leaderboard:', error);
      // Fallback to mock data
      setLeaderboard([
        { rank: 1, playerName: 'FaithfulGamer', score: 5000, level: 10 },
        { rank: 2, playerName: 'BibleHero', score: 4500, level: 9 },
        { rank: 3, playerName: 'StoryTeller', score: 4000, level: 8 },
        { rank: 4, playerName: 'DevotedPlayer', score: 3500, level: 7 },
        { rank: 5, playerName: 'HolyQuester', score: 3000, level: 6 },
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchLeaderboard();
  };

  const renderLeaderboardItem = ({ item, index }: { item: LeaderboardEntry; index: number }) => {
    const isTopThree = item.rank <= 3;
    const medalEmoji = item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : '🥉';

    return (
      <View style={[styles.leaderboardItem, isTopThree && styles.topThreeItem]}>
        <View style={styles.rankContainer}>
          {isTopThree ? (
            <Text style={styles.medalEmoji}>{medalEmoji}</Text>
          ) : (
            <Text style={styles.rank}>#{item.rank}</Text>
          )}
        </View>

        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{item.playerName}</Text>
          <Text style={styles.playerLevel}>Level {item.level}</Text>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.score}>{item.score.toLocaleString()}</Text>
          <Text style={styles.scoreLabel}>points</Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Loading leaderboard...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
        <Text style={styles.headerSubtitle}>Top players worldwide</Text>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboard}
        renderItem={renderLeaderboardItem}
        keyExtractor={(item) => item.rank.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  leaderboardItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topThreeItem: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  medalEmoji: {
    fontSize: 28,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  playerLevel: {
    fontSize: 12,
    color: '#999',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#999',
  },
});

export default LeaderboardScreen;