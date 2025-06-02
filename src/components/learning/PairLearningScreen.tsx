import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LearningPair, Phrase } from '../../types';
import PairLearningService from '../../services/pairLearningService';

interface PairLearningScreenProps {
  pairId: string;
  userId: string;
}

export const PairLearningScreen: React.FC<PairLearningScreenProps> = ({ pairId, userId }) => {
  const [pair, setPair] = useState<LearningPair | null>(null);
  const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  const pairLearningService = PairLearningService.getInstance();

  useEffect(() => {
    loadPairData();
  }, []);

  const loadPairData = async () => {
    try {
      const pairData = await pairLearningService.getPair(pairId);
      setPair(pairData);
      setAchievements(pairData.achievements);
    } catch (error) {
      console.error('Error loading pair data:', error);
    }
  };

  const handleSharePhrase = async (phraseId: string) => {
    try {
      setIsSharing(true);
      await pairLearningService.addPhraseToShared(pairId, phraseId);
      await loadPairData();
      setIsSharing(false);
    } catch (error) {
      console.error('Error sharing phrase:', error);
      setIsSharing(false);
    }
  };

  if (!pair) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Pair Learning</Text>
        <Text style={styles.subtitle}>Learning with your partner</Text>
      </View>

      <View style={styles.progressSection}>
        <Text style={styles.sectionTitle}>Shared Progress</Text>
        <Text style={styles.progressText}>
          Phrases Learned: {pair.sharedProgress.phrasesLearned.length}
        </Text>
        <Text style={styles.progressText}>
          Quizzes Completed: {pair.sharedProgress.quizzesCompleted}
        </Text>
      </View>

      <View style={styles.sharedPhrasesSection}>
        <Text style={styles.sectionTitle}>Shared Phrases</Text>
        <ScrollView horizontal style={styles.phrasesList}>
          {pair.sharedProgress.phrasesLearned.map((phraseId) => (
            <TouchableOpacity
              key={phraseId}
              style={styles.phraseCard}
              onPress={() => setSelectedPhrase(phraseId)}
            >
              <Text style={styles.phraseText}>Phrase {phraseId}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <Text style={styles.achievementTitle}>{achievement.name}</Text>
            <Text style={styles.achievementDescription}>{achievement.description}</Text>
          </View>
        ))}
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleSharePhrase(selectedPhrase || '')}
          disabled={!selectedPhrase || isSharing}
        >
          <Text style={styles.actionButtonText}>
            {isSharing ? 'Sharing...' : 'Share Phrase'}
          </Text>
        </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  progressSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  sharedPhrasesSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  phrasesList: {
    marginVertical: 10,
  },
  phraseCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginRight: 10,
    borderRadius: 5,
  },
  phraseText: {
    fontSize: 16,
    color: '#333',
  },
  achievementsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  achievementCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  actionsSection: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
