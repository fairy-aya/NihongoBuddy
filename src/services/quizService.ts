import firestore from '@react-native-firebase/firestore';

// クイズサービス
export const quizService = {
  // クイズの生成
  generateQuiz: async (categoryIds, count = 10) => {
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
      const selectedPhrases = shuffled.slice(0, count);
      
      // クイズ問題の生成
      const quizQuestions = selectedPhrases.map(phrase => {
        // 問題タイプをランダムに選択（1: 日本語→英語, 2: 英語→日本語, 3: 音声→日本語）
        const questionType = Math.floor(Math.random() * 3) + 1;
        
        // 不正解の選択肢を生成
        const otherPhrases = phrases.filter(p => p.id !== phrase.id);
        const shuffledOthers = otherPhrases.sort(() => 0.5 - Math.random());
        const distractors = shuffledOthers.slice(0, 3);
        
        let question, correctAnswer, options;
        
        switch (questionType) {
          case 1: // 日本語→英語
            question = phrase.japanese;
            correctAnswer = phrase.english;
            options = [
              phrase.english,
              ...distractors.map(d => d.english)
            ].sort(() => 0.5 - Math.random());
            break;
          case 2: // 英語→日本語
            question = phrase.english;
            correctAnswer = phrase.japanese;
            options = [
              phrase.japanese,
              ...distractors.map(d => d.japanese)
            ].sort(() => 0.5 - Math.random());
            break;
          case 3: // 音声→日本語
            question = phrase.audioUrl;
            correctAnswer = phrase.japanese;
            options = [
              phrase.japanese,
              ...distractors.map(d => d.japanese)
            ].sort(() => 0.5 - Math.random());
            break;
        }
        
        return {
          id: phrase.id,
          questionType,
          question,
          correctAnswer,
          options,
          categoryId: phrase.categoryId,
        };
      });
      
      return quizQuestions;
    } catch (error) {
      console.error('Generate quiz error:', error);
      throw error;
    }
  },
  
  // クイズ結果の保存
  saveQuizResult: async (userId, quizResults) => {
    try {
      const resultRef = firestore()
        .collection('quizResults')
        .doc();
      
      await resultRef.set({
        userId,
        results: quizResults,
        totalQuestions: quizResults.length,
        correctAnswers: quizResults.filter(r => r.isCorrect).length,
        completedAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return resultRef.id;
    } catch (error) {
      console.error('Save quiz result error:', error);
      throw error;
    }
  },
  
  // ユーザーのクイズ履歴取得
  getUserQuizHistory: async (userId) => {
    try {
      const historySnapshot = await firestore()
        .collection('quizResults')
        .where('userId', '==', userId)
        .orderBy('completedAt', 'desc')
        .limit(10)
        .get();
      
      return historySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get user quiz history error:', error);
      throw error;
    }
  },
};

// 発音評価サービス
export const pronunciationService = {
  // 発音評価結果の保存
  savePronunciationResult: async (userId, phraseId, score, audioUrl) => {
    try {
      const resultRef = firestore()
        .collection('pronunciationResults')
        .doc();
      
      await resultRef.set({
        userId,
        phraseId,
        score,
        audioUrl,
        evaluatedAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return resultRef.id;
    } catch (error) {
      console.error('Save pronunciation result error:', error);
      throw error;
    }
  },
  
  // ユーザーの発音履歴取得
  getUserPronunciationHistory: async (userId) => {
    try {
      const historySnapshot = await firestore()
        .collection('pronunciationResults')
        .where('userId', '==', userId)
        .orderBy('evaluatedAt', 'desc')
        .limit(10)
        .get();
      
      return historySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get user pronunciation history error:', error);
      throw error;
    }
  },
};
