import { Badge, Achievement, UserGamification, Reward } from '../types/gamification';

export class GamificationService {
  private static instance: GamificationService;
  private badges: Badge[] = [];
  private achievements: Achievement[] = [];
  private userGamification: UserGamification;

  private constructor() {
    this.initializeBadges();
    this.initializeAchievements();
    this.initializeUserGamification();
  }

  public static getInstance(): GamificationService {
    if (!GamificationService.instance) {
      GamificationService.instance = new GamificationService();
    }
    return GamificationService.instance;
  }

  private initializeBadges() {
    this.badges = [
      {
        id: 'badge_1',
        name: 'Beginner',
        description: 'Learn your first 10 phrases',
        icon: 'badge_beginner',
        requirement: {
          type: 'phrases_learned',
          value: 10,
          comparison: 'greater_than',
        },
        category: 'learning',
        points: 50,
        unlockOrder: 1,
      },
      {
        id: 'badge_2',
        name: 'Daily Learner',
        description: 'Study for 30 minutes in a day',
        icon: 'badge_daily',
        requirement: {
          type: 'study_time',
          value: 1800,
          comparison: 'greater_than',
        },
        category: 'learning',
        points: 75,
        unlockOrder: 2,
      },
      {
        id: 'badge_3',
        name: 'Quiz Master',
        description: 'Pass 5 quizzes',
        icon: 'badge_quiz',
        requirement: {
          type: 'quizzes_passed',
          value: 5,
          comparison: 'greater_than',
        },
        category: 'achievement',
        points: 100,
        unlockOrder: 3,
      },
      // Add more badges as needed
    ];
  }

  private initializeAchievements() {
    this.achievements = [
      {
        id: 'achievement_1',
        name: 'Daily Streak',
        description: 'Study for 7 consecutive days',
        type: 'one_time',
        requirement: {
          type: 'streak',
          value: 7,
          timeFrame: 'day',
        },
        points: 200,
        reward: {
          type: 'badge',
          value: 'badge_streak',
        },
      },
      {
        id: 'achievement_2',
        name: 'Weekly Challenge',
        description: 'Complete 10 quizzes in a week',
        type: 'weekly',
        requirement: {
          type: 'quizzes',
          value: 10,
          timeFrame: 'week',
        },
        points: 150,
        reward: {
          type: 'points',
          value: 150,
        },
      },
      // Add more achievements as needed
    ];
  }

  private initializeUserGamification() {
    this.userGamification = {
      userId: '',
      points: 0,
      badges: [],
      achievements: [],
      currentStreak: 0,
      highestStreak: 0,
      weeklyProgress: {
        studyTime: 0,
        quizzesPassed: 0,
        phrasesLearned: 0,
      },
      level: 1,
      experience: 0,
      nextLevelExperience: 1000,
    };
  }

  public async checkAchievements(
    studyTime: number,
    quizzesPassed: number,
    phrasesLearned: number,
    streak: number
  ): Promise<void> {
    // Check for new badges
    this.badges.forEach((badge) => {
      if (!this.userGamification.badges.some((b) => b.id === badge.id)) {
        const requirement = badge.requirement;
        const currentValue = this.getRequirementValue(requirement.type);

        if (
          (requirement.comparison === 'greater_than' && currentValue > requirement.value) ||
          (requirement.comparison === 'equal_to' && currentValue === requirement.value) ||
          (requirement.comparison === 'less_than' && currentValue < requirement.value)
        ) {
          this.unlockBadge(badge);
        }
      }
    });

    // Check for new achievements
    this.achievements.forEach((achievement) => {
      const requirement = achievement.requirement;
      const currentValue = this.getRequirementValue(requirement.type);

      if (
        currentValue >= requirement.value &&
        !this.userGamification.achievements.some((a) => a.id === achievement.id)
      ) {
        this.unlockAchievement(achievement);
      }
    });
  }

  private getRequirementValue(type: string): number {
    switch (type) {
      case 'study_time':
        return this.userGamification.weeklyProgress.studyTime;
      case 'quizzes_passed':
        return this.userGamification.weeklyProgress.quizzesPassed;
      case 'phrases_learned':
        return this.userGamification.weeklyProgress.phrasesLearned;
      case 'streak':
        return this.userGamification.currentStreak;
      default:
        return 0;
    }
  }

  private unlockBadge(badge: Badge): void {
    this.userGamification.badges.push(badge);
    this.userGamification.points += badge.points;
    this.updateExperience(badge.points);
  }

  private unlockAchievement(achievement: Achievement): void {
    this.userGamification.achievements.push(achievement);
    this.userGamification.points += achievement.points;
    this.applyReward(achievement.reward);
    this.updateExperience(achievement.points);
  }

  private applyReward(reward: Reward): void {
    switch (reward.type) {
      case 'points':
        this.userGamification.points += reward.value as number;
        break;
      case 'badge':
        const badge = this.badges.find((b) => b.id === reward.value);
        if (badge) {
          this.unlockBadge(badge);
        }
        break;
      // Add more reward types as needed
    }
  }

  private updateExperience(points: number): void {
    this.userGamification.experience += points;
    while (this.userGamification.experience >= this.userGamification.nextLevelExperience) {
      this.userGamification.level += 1;
      this.userGamification.experience -= this.userGamification.nextLevelExperience;
      this.userGamification.nextLevelExperience =
        this.userGamification.nextLevelExperience * 1.5;
    }
  }

  public getUserGamification(): UserGamification {
    return this.userGamification;
  }

  public updateProgress(
    studyTime: number,
    quizzesPassed: number,
    phrasesLearned: number,
    streak: number
  ): void {
    this.userGamification.weeklyProgress.studyTime += studyTime;
    this.userGamification.weeklyProgress.quizzesPassed += quizzesPassed;
    this.userGamification.weeklyProgress.phrasesLearned += phrasesLearned;
    this.userGamification.currentStreak = streak;
    if (streak > this.userGamification.highestStreak) {
      this.userGamification.highestStreak = streak;
    }
    this.checkAchievements(studyTime, quizzesPassed, phrasesLearned, streak);
  }
}
