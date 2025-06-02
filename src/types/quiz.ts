export interface QuizQuestion {
  id: string;
  type: 'multiple_choice' | 'fill_in_blank' | 'reorder' | 'listening';
  question: string;
  options: string[];
  correctAnswer: string | string[];
  hint?: string;
  explanation: string;
}

export interface QuizResult {
  id: string;
  date: Date;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // in seconds
  questions: {
    [questionId: string]: {
      answer: string | string[];
      isCorrect: boolean;
      timeTaken: number; // in seconds
    };
  };
}

export interface UserProgress {
  userId: string;
  totalStudyTime: number; // in seconds
  lastStudyDate: Date;
  completedCategories: string[];
  quizResults: QuizResult[];
  dailyStreak: number;
  badgesEarned: string[];
  totalPhrasesLearned: number;
  currentCategory: string;
  learningHours: {
    [date: string]: number; // date in YYYY-MM-DD format
  };
}
