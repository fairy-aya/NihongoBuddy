import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { QuizQuestion, QuizResult } from '../../types/quiz';
import { Phrase } from '../../types/learning';

interface QuizScreenProps {
  category: string;
  phrases: Phrase[];
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ category, phrases }) => {
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isQuizOver, setIsQuizOver] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);

  useEffect(() => {
    generateQuiz();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          endQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const generateQuiz = () => {
    // Generate quiz questions based on the category and phrases
    const questions: QuizQuestion[] = [
      // Multiple choice example
      {
        id: 'q1',
        type: 'multiple_choice',
        question: 'What is the meaning of こんにちは?',
        options: ['Goodbye', 'Hello', 'Thank you', 'Sorry'],
        correctAnswer: 'Hello',
        explanation: 'こんにちは is a common greeting used during the day.',
      },
      // Fill in blank example
      {
        id: 'q2',
        type: 'fill_in_blank',
        question: 'Good morning in Japanese is __________.',
        correctAnswer: 'おはよう',
        explanation: 'おはよう is used in the morning.',
      },
      // Reorder example
      {
        id: 'q3',
        type: 'reorder',
        question: 'Reorder the words to make a greeting.',
        options: ['はい', 'こんにちは', 'はい', 'こんにちは'],
        correctAnswer: ['こんにちは', 'こんにちは', 'はい', 'はい'],
        explanation: 'This is a conversation greeting.',
      },
    ];

    // Shuffle questions
    const shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setCurrentQuestion(shuffledQuestions[0]);
  };

  const checkAnswer = (answer: string | string[]) => {
    if (!currentQuestion) return;

    const isCorrect = Array.isArray(currentQuestion.correctAnswer)
      ? JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer)
      : answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);
    setScore((prev) => prev + (isCorrect ? 1 : 0));

    // Move to next question after 2 seconds
    setTimeout(() => {
      const questions = [currentQuestion];
      const currentIndex = questions.indexOf(currentQuestion);
      if (currentIndex < questions.length - 1) {
        setCurrentQuestion(questions[currentIndex + 1]);
        setSelectedAnswer(null);
      } else {
        endQuiz();
      }
    }, 2000);
  };

  const endQuiz = () => {
    setIsQuizOver(true);
    const result: QuizResult = {
      id: Date.now().toString(),
      date: new Date(),
      score: score,
      totalQuestions: 3, // Change this based on actual questions
      correctAnswers: score,
      timeTaken: 300 - timeLeft,
      questions: {
        q1: {
          answer: selectedAnswer as string,
          isCorrect: selectedAnswer === 'Hello',
          timeTaken: 300 - timeLeft,
        },
      },
    };
    setQuizResults([...quizResults, result]);
  };

  if (!currentQuestion) return null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Japanese Quiz</Text>
        <View style={styles.timer}>
          <Text style={styles.timerText}>
            Time: {Math.floor(timeLeft / 60)}:{
              timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60
            }
          </Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.type === 'multiple_choice' && (
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() => checkAnswer(option)}
                disabled={selectedAnswer !== null}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {currentQuestion.type === 'fill_in_blank' && (
          <View style={styles.fillInBlankContainer}>
            <TextInput
              style={styles.fillInBlankInput}
              value={selectedAnswer as string}
              onChangeText={(text) => setSelectedAnswer(text)}
              onSubmitEditing={() => checkAnswer(selectedAnswer as string)}
              disabled={selectedAnswer !== null}
            />
          </View>
        )}

        {currentQuestion.type === 'reorder' && (
          <View style={styles.reorderContainer}>
            {/* Reorder logic implementation */}
          </View>
        )}
      </View>

      {isQuizOver && (
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsTitle}>Quiz Results</Text>
          <Text style={styles.resultsScore}>
            Score: {score}/3
          </Text>
          <Text style={styles.resultsTime}>
            Time: {300 - timeLeft}s
          </Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => {
              setIsQuizOver(false);
              setTimeLeft(300);
              setScore(0);
              setSelectedAnswer(null);
              generateQuiz();
            }}
          >
            <Text style={styles.retryButtonText}>Retry Quiz</Text>
          </TouchableOpacity>
        </View>
      )}
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
  timer: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  timerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  questionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  fillInBlankContainer: {
    marginTop: 20,
  },
  fillInBlankInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  reorderContainer: {
    marginTop: 20,
  },
  resultsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    marginVertical: 20,
    borderRadius: 10,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  resultsScore: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 10,
  },
  resultsTime: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
