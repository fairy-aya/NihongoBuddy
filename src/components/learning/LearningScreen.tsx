import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Phrase, LearningCategory } from '../../types';
import { sampleCategories } from '../../data/categories';

interface LearningScreenProps {
  category: LearningCategory;
}

export const LearningScreen: React.FC<LearningScreenProps> = ({ category }) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const currentPhrase = category.phrases[currentPhraseIndex];

  const handleNextPhrase = () => {
    setCurrentPhraseIndex((prev) => (prev + 1) % category.phrases.length);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryTitle}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
      </View>

      <View style={styles.phraseContainer}>
        {/* Japanese Text */}
        <Text style={styles.japaneseText}>{currentPhrase.japanese.text}</Text>
        <Text style={styles.furigana}>{currentPhrase.japanese.furigana}</Text>
        <Text style={styles.romaji}>{currentPhrase.japanese.romaji}</Text>

        {/* English Translation */}
        <Text style={styles.translation}>{currentPhrase.english.translation}</Text>
        <Text style={styles.explanation}>{currentPhrase.english.explanation}</Text>

        {/* Audio Controls */}
        <View style={styles.audioControls}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Play Native</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Play Variations</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <View style={styles.progress}>
          <Text style={styles.progressText}>
            {currentPhraseIndex + 1}/{category.phrases.length}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[styles.button, styles.prevButton]}
            onPress={() => {
              setCurrentPhraseIndex((prev) =>
                (prev - 1 + category.phrases.length) % category.phrases.length
              );
            }}
          >
            <Text style={styles.buttonText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={handleNextPhrase}
          >
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
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
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  phraseContainer: {
    padding: 20,
  },
  japaneseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  furigana: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  romaji: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  translation: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  progress: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: '#333',
  },
  navButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  prevButton: {
    backgroundColor: '#2196F3',
  },
  nextButton: {
    backgroundColor: '#4CAF50',
  },
});
