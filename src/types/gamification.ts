export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: BadgeRequirement;
  category: 'learning' | 'social' | 'achievement';
  points: number;
  unlockOrder: number;
}

export interface BadgeRequirement {
  type: 'study_time' | 'phrases_learned' | 'quizzes_passed' | 'daily_streak' | 'pair_learning';
  value: number;
  comparison: 'greater_than' | 'equal_to' | 'less_than';
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'one_time';
  requirement: AchievementRequirement;
  points: number;
  reward: Reward;
}

export interface AchievementRequirement {
  type: 'study_time' | 'quizzes' | 'phrases' | 'streak' | 'pair_learning';
  value: number;
  timeFrame: 'day' | 'week' | 'month';
}

export interface Reward {
  type: 'points' | 'badge' | 'avatar_item' | 'special_access';
  value: string | number;
}

export interface UserGamification {
  userId: string;
  points: number;
  badges: Badge[];
  achievements: Achievement[];
  currentStreak: number;
  highestStreak: number;
  weeklyProgress: {
    studyTime: number;
    quizzesPassed: number;
    phrasesLearned: number;
  };
  level: number;
  experience: number;
  nextLevelExperience: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  points: number;
  badges: string[];
  level: number;
  experience: number;
  ranking: number;
}
