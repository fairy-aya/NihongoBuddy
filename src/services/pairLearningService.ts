import { LearningPair, Achievement } from '../types';

export class PairLearningService {
  private static instance: PairLearningService;
  private constructor() {}

  public static getInstance(): PairLearningService {
    if (!PairLearningService.instance) {
      PairLearningService.instance = new PairLearningService();
    }
    return PairLearningService.instance;
  }

  async createPair(userId1: string, userId2: string): Promise<LearningPair> {
    try {
      const response = await fetch('/api/pairs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId1, userId2 }),
      });

      if (!response.ok) {
        throw new Error('Failed to create pair');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating pair:', error);
      throw error;
    }
  }

  async getPair(pairId: string): Promise<LearningPair> {
    try {
      const response = await fetch(`/api/pairs/${pairId}`);
      if (!response.ok) {
        throw new Error('Failed to get pair information');
      }
      return await response.json();
    } catch (error) {
      console.error('Error getting pair:', error);
      throw error;
    }
  }

  async updateSharedProgress(
    pairId: string,
    updates: {
      phrasesLearned?: string[];
      quizzesCompleted?: number;
      conversationHistory?: string[];
    }
  ): Promise<void> {
    try {
      await fetch(`/api/pairs/${pairId}/progress`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  }

  async addAchievement(pairId: string, achievement: Achievement): Promise<void> {
    try {
      await fetch(`/api/pairs/${pairId}/achievements`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(achievement),
      });
    } catch (error) {
      console.error('Error adding achievement:', error);
      throw error;
    }
  }

  async getSharedPhrases(pairId: string): Promise<string[]> {
    try {
      const pair = await this.getPair(pairId);
      return pair.sharedProgress.phrasesLearned;
    } catch (error) {
      console.error('Error getting shared phrases:', error);
      throw error;
    }
  }

  async addPhraseToShared(pairId: string, phraseId: string): Promise<void> {
    try {
      await this.updateSharedProgress(pairId, {
        phrasesLearned: [...(await this.getSharedPhrases(pairId)), phraseId],
      });
    } catch (error) {
      console.error('Error adding phrase to shared:', error);
      throw error;
    }
  }
}
