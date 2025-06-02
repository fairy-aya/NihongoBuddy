import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Phrase } from '../../types';
import SpeechService from '../../services/speechService';

interface PronunciationPracticeProps {
  phrase: Phrase;
}

export const PronunciationPractice: React.FC<PronunciationPracticeProps> = ({ phrase }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState<SpeechRecognitionResult | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const speechService = SpeechService.getInstance();

  const handleRecord = async () => {
    try {
      setIsRecording(true);
      const blob = await speechService.recordAudio();
      setAudioBlob(blob);
      setIsRecording(false);
      setIsAnalyzing(true);
      
      const result = await speechService.recognizeSpeech(blob);
      setFeedback(result);
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Error recording audio:', error);
      setIsRecording(false);
      setIsAnalyzing(false);
    }
  };

  const playNativeAudio = async () => {
    if (phrase.audio.native) {
      await speechService.playAudio(phrase.audio.native);
    }
  };

  const playUserAudio = async () => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      await speechService.playAudio(url);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioControls}>
        <TouchableOpacity
          style={[styles.button, styles.nativeAudioButton]}
          onPress={playNativeAudio}
          disabled={isRecording || isAnalyzing}
        >
          <Text style={styles.buttonText}>Play Native Audio</Text>
        </TouchableOpacity>

        {audioBlob && (
          <TouchableOpacity
            style={[styles.button, styles.userAudioButton]}
            onPress={playUserAudio}
            disabled={isRecording || isAnalyzing}
          >
            <Text style={styles.buttonText}>Play Your Audio</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.recordButton]}
          onPress={handleRecord}
          disabled={isAnalyzing}
        >
          <Text style={styles.buttonText}>
            {isRecording ? 'Recording...' : 'Record Your Voice'}
          </Text>
        </TouchableOpacity>
      </View>

      {isAnalyzing && (
        <View style={styles.analyzingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.analyzingText}>Analyzing your pronunciation...</Text>
        </View>
      )}

      {feedback && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Pronunciation Feedback</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>
              Overall Accuracy: {(feedback.accuracy * 100).toFixed(1)}%
            </Text>
            <Text style={styles.scoreText}>
              Intonation: {(feedback.pronunciationScore.intonation * 100).toFixed(1)}%
            </Text>
            <Text style={styles.scoreText}>
              Accent: {(feedback.pronunciationScore.accent * 100).toFixed(1)}%
            </Text>
          </View>

          <Text style={styles.feedbackTitle}>Positive Points</Text>
          {feedback.feedback.positive.map((point, index) => (
            <Text key={index} style={styles.feedbackText}>
              • {point}
            </Text>
          ))}

          <Text style={styles.feedbackTitle}>Areas for Improvement</Text>
          {feedback.feedback.areasForImprovement.map((point, index) => (
            <Text key={index} style={styles.feedbackText}>
              • {point}
            </Text>
          ))}

          <Text style={styles.feedbackTitle}>Recommendations</Text>
          {feedback.feedback.recommendations.map((point, index) => (
            <Text key={index} style={styles.feedbackText}>
              • {point}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  audioControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  nativeAudioButton: {
    backgroundColor: '#4CAF50',
  },
  userAudioButton: {
    backgroundColor: '#2196F3',
  },
  recordButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  analyzingContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  analyzingText: {
    marginTop: 10,
    color: '#666',
    fontSize: 16,
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  scoreContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  feedbackText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});
