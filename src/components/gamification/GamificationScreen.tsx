import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { UserGamification, Badge, Achievement } from '../../types/gamification';
import GamificationService from '../../services/gamificationService';

interface GamificationScreenProps {
  userId: string;
  studyTime: number;
  quizzesPassed: number;
  phrasesLearned: number;
  streak: number;
}

export const GamificationScreen: React.FC<GamificationScreenProps> = ({
  userId,
  studyTime,
  quizzesPassed,
  phrasesLearned,
  streak,
}) => {
  const gamificationService = GamificationService.getInstance();
  const [userGamification, setUserGamification] = useState<UserGamification>(
    gamificationService.getUserGamification()
  );

  useEffect(() => {
    gamificationService.updateProgress(studyTime, quizzesPassed, phrasesLearned, streak);
    setUserGamification(gamificationService.getUserGamification());
  }, [studyTime, quizzesPassed, phrasesLearned, streak]);

  const calculateProgress = (current: number, next: number): number => {
    return (current / next) * 100;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gamification</Text>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {userGamification.level}</Text>
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBar,
                {
                  width: `${calculateProgress(
                    userGamification.experience,
                    userGamification.nextLevelExperience
                  )}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {userGamification.experience}/{userGamification.nextLevelExperience} XP
          </Text>
        </View>
      </View>

      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>Badges</Text>
        <ScrollView horizontal style={styles.badgesList}>
          {userGamification.badges.map((badge) => (
            <View key={badge.id} style={styles.badgeCard}>
              <Text style={styles.badgeTitle}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
              <Text style={styles.badgePoints}>{badge.points} points</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <ScrollView style={styles.achievementsList}>
          {userGamification.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <Text style={styles.achievementTitle}>{achievement.name}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementPoints}>{achievement.points} points</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.sectionTitle}>Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userGamification.points}</Text>
            <Text style={styles.statLabel}>Total Points</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userGamification.badges.length}</Text>
            <Text style={styles.statLabel}>Badges Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userGamification.achievements.length}</Text>
            <Text style={styles.statLabel}>Achievements</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userGamification.currentStreak}</Text>
            <Text style={styles.statLabel}>Current Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{userGamification.highestStreak}</Text>
            <Text style={styles.statLabel}>Highest Streak</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  levelContainer: {
    marginTop: 20,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  badgesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  badgesList: {
    marginVertical: 10,
  },
  badgeCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
    minWidth: 120,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  badgePoints: {
    fontSize: 14,
    color: '#4CAF50',
  },
  achievementsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  achievementsList: {
    marginVertical: 10,
  },
  achievementCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  achievementPoints: {
    fontSize: 14,
    color: '#4CAF50',
  },
  statsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 15,
  },
  statCard: {
    width: '45%',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});
