export interface Phrase {
  id: string;
  japanese: {
    text: string;
    furigana: string;
    romaji: string;
  };
  english: {
    translation: string;
    explanation: string;
    culturalNotes: string[];
  };
  audio: {
    native: string;
    variations: AudioVariation[];
  };
  context: ConversationExample[];
}

export interface AudioVariation {
  type: 'accent' | 'dialect' | 'formality';
  description: string;
  audioUrl: string;
}

export interface ConversationExample {
  situation: string;
  dialog: Dialog[];
}

export interface Dialog {
  speaker: string;
  text: string;
  translation: string;
}

export interface LearningCategory {
  id: string;
  name: string;
  description: string;
  phrases: Phrase[];
  difficulty: number;
  unlockRequirement: number;
}

export interface UserProgress {
  completedCategories: string[];
  learnedPhrases: string[];
  currentCategory: string;
  totalStudyTime: number;
  lastStudyDate: Date;
}

export interface SpeechRecognitionResult {
  accuracy: number;
  pronunciationScore: {
    intonation: number;
    accent: number;
    speed: number;
    clarity: number;
  };
  feedback: {
    positive: string[];
    areasForImprovement: string[];
    recommendations: string[];
  };
}
