import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// 学習コンテンツサービス
export const learningService = {
  // カテゴリ一覧の取得
  getCategories: async () => {
    try {
      const categoriesSnapshot = await firestore()
        .collection('categories')
        .orderBy('order')
        .get();
      
      return categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get categories error:', error);
      throw error;
    }
  },
  
  // カテゴリ詳細の取得
  getCategoryDetail: async (categoryId) => {
    try {
      const categoryDoc = await firestore()
        .collection('categories')
        .doc(categoryId)
        .get();
      
      if (!categoryDoc.exists) {
        throw new Error('カテゴリが見つかりません');
      }
      
      return {
        id: categoryDoc.id,
        ...categoryDoc.data(),
      };
    } catch (error) {
      console.error('Get category detail error:', error);
      throw error;
    }
  },
  
  // カテゴリ内のフレーズ一覧の取得
  getPhrasesByCategory: async (categoryId) => {
    try {
      const phrasesSnapshot = await firestore()
        .collection('phrases')
        .where('categoryId', '==', categoryId)
        .orderBy('order')
        .get();
      
      return phrasesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get phrases by category error:', error);
      throw error;
    }
  },
  
  // フレーズ詳細の取得
  getPhraseDetail: async (phraseId) => {
    try {
      const phraseDoc = await firestore()
        .collection('phrases')
        .doc(phraseId)
        .get();
      
      if (!phraseDoc.exists) {
        throw new Error('フレーズが見つかりません');
      }
      
      return {
        id: phraseDoc.id,
        ...phraseDoc.data(),
      };
    } catch (error) {
      console.error('Get phrase detail error:', error);
      throw error;
    }
  },
  
  // 音声URLの取得
  getAudioUrl: async (audioPath) => {
    try {
      const url = await storage().ref(audioPath).getDownloadURL();
      return url;
    } catch (error) {
      console.error('Get audio URL error:', error);
      throw error;
    }
  },
  
  // ランダムフレーズの取得
  getRandomPhrases: async (categoryIds, count = 10) => {
    try {
      let query = firestore().collection('phrases');
      
      if (categoryIds && categoryIds.length > 0) {
        query = query.where('categoryId', 'in', categoryIds);
      }
      
      const phrasesSnapshot = await query.get();
      
      const phrases = phrasesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      
      // ランダムに指定数を選択
      const shuffled = phrases.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    } catch (error) {
      console.error('Get random phrases error:', error);
      throw error;
    }
  },
};

// 進捗管理サービス
export const progressService = {
  // ユーザーの学習進捗の取得
  getUserProgress: async (userId) => {
    try {
      const progressSnapshot = await firestore()
        .collection('userProgress')
        .where('userId', '==', userId)
        .get();
      
      return progressSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get user progress error:', error);
      throw error;
    }
  },
  
  // フレーズの学習完了を記録
  markPhraseAsLearned: async (userId, phraseId) => {
    try {
      const progressRef = firestore()
        .collection('userProgress')
        .doc(`${userId}_${phraseId}`);
      
      await progressRef.set({
        userId,
        phraseId,
        learnedAt: firestore.FieldValue.serverTimestamp(),
        reviewDue: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24時間後
      }, { merge: true });
      
      return true;
    } catch (error) {
      console.error('Mark phrase as learned error:', error);
      throw error;
    }
  },
  
  // 復習が必要なフレーズの取得
  getPhrasesForReview: async (userId) => {
    try {
      const now = new Date();
      
      const progressSnapshot = await firestore()
        .collection('userProgress')
        .where('userId', '==', userId)
        .where('reviewDue', '<=', now)
        .get();
      
      const phraseIds = progressSnapshot.docs.map(doc => doc.data().phraseId);
      
      if (phraseIds.length === 0) {
        return [];
      }
      
      // フレーズの詳細情報を取得
      const phrasesSnapshot = await firestore()
        .collection('phrases')
        .where(firestore.FieldPath.documentId(), 'in', phraseIds)
        .get();
      
      return phrasesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get phrases for review error:', error);
      throw error;
    }
  },
};
