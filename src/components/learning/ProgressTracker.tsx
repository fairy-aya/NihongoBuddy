import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { UserProgress } from '../../types/quiz';
import { LearningCategory } from '../../types/learning';

interface ProgressTrackerProps {
  userProgress: UserProgress;
  categories: LearningCategory[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ userProgress, categories }) => {
  const [currentStreak, setCurrentStreak] = useState(userProgress.dailyStreak);
  const [studyHours, setStudyHours] = useState(userProgress.learningHours);

  useEffect(() => {
    // Update streak and study hours daily
    const updateDailyProgress = () => {
      const today = new Date().toISOString().split('T')[0];
      if (!studyHours[today]) {
        setCurrentStreak(0);
      }
    };

    updateDailyProgress();
    const timer = setInterval(updateDailyProgress, 1000 * 60 * 60 * 24);
    return () => clearInterval(timer);
  }, [studyHours]);

  const calculateProgressPercentage = (category: LearningCategory) => {
    const totalPhrases = category.phrases.length;
    const learnedPhrases = userProgress.completedCategories.includes(category.id)
      ? totalPhrases
      : userProgress.completedCategories.filter((id) => category.phrases.some(p => p.id === id)).length;
    return (learnedPhrases / totalPhrases) * 100;
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learning Progress</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{currentStreak}</Text>
            <Text style={styles.statLabel}>Daily Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {formatTime(userProgress.totalStudyTime)}
            </Text>
            <Text style={styles.statLabel}>Total Study Time</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {userProgress.totalPhrasesLearned}
            </Text>
            <Text style={styles.statLabel}>Phrases Learned</Text>
          </View>
        </View>
      </View>

      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Category Progress</Text>
        <ScrollView horizontal style={styles.categoriesList}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryCard}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.progressContainer}>
                <View
                  style={[
                    styles.progressBar,
                    {
                      width: `${calculateProgressPercentage(category)}%`,
                    },
                  ]}
                />
              </View>
              <Text style={styles.progressPercentage}>
                {calculateProgressPercentage(category).toFixed(1)}%
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.badgesSection}>
        <Text style={styles.sectionTitle}>Badges Earned</Text>
        <ScrollView horizontal style={styles.badgesList}>
          {userProgress.badgesEarned.map((badge, index) => (
            <View key={index} style={styles.badgeCard}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.studyHoursSection}>
        <Text style={styles.sectionTitle}>Study Hours</Text>
        <View style={styles.chartContainer}>
          <View style={styles.chart}>
            {Object.entries(studyHours).map(([date, hours], index) => (
              <View
                key={date}
                style={[
                  styles.hourBar,
                  {
                    height: `${(hours / 3600) * 100}%`,
                    backgroundColor: getColorForHours(hours),
                  },
                ]}
              >
                <Text style={styles.hourLabel}>{formatTime(hours)}</Text>
              </View>
            ))}
          </View>
          <View style={styles.xAxis}>
            {Object.entries(studyHours).map(([date]) => (
              <Text key={date} style={styles.dateLabel}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  day: 'numeric',
                })}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const getColorForHours = (hours: number): string => {
  if (hours >= 3600) return '#4CAF50'; // Green for 1 hour or more
  if (hours >= 1800) return '#2196F3'; // Blue for 30 minutes or more
  return '#FFC107'; // Yellow for less than 30 minutes
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statCard: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  categoriesSection: {
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
  categoriesList: {
    marginVertical: 10,
  },
  categoryCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
    minWidth: 120,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  progressPercentage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  badgesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  badgesList: {
    marginVertical: 10,
  },
  badgeCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  badgeText: {
    fontSize: 14,
    color: '#333',
  },
  studyHoursSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 200,
  },
  hourBar: {
    width: '10%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
    justifyContent: 'flex-end',
  },
  hourLabel: {
    color: '#fff',
    fontSize: 10,
    textAlign: 'center',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  dateLabel: {
    fontSize: 12,
    color: '#666',
  },
});
