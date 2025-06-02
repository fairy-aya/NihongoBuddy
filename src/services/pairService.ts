import firestore from '@react-native-firebase/firestore';

// ペア学習サービス
export const pairService = {
  // 共有フレーズ帳の取得
  getSharedPhrasebook: async (userId, partnerId) => {
    try {
      const partnershipId = userId < partnerId 
        ? `${userId}_${partnerId}` 
        : `${partnerId}_${userId}`;
      
      const phrasebookSnapshot = await firestore()
        .collection('sharedPhrasebooks')
        .where('partnershipId', '==', partnershipId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return phrasebookSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get shared phrasebook error:', error);
      throw error;
    }
  },
  
  // 共有フレーズの追加
  addSharedPhrase: async (userId, partnerId, phraseData) => {
    try {
      const partnershipId = userId < partnerId 
        ? `${userId}_${partnerId}` 
        : `${partnerId}_${userId}`;
      
      const newPhraseRef = firestore()
        .collection('sharedPhrasebooks')
        .doc();
      
      await newPhraseRef.set({
        ...phraseData,
        partnershipId,
        addedBy: userId,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return newPhraseRef.id;
    } catch (error) {
      console.error('Add shared phrase error:', error);
      throw error;
    }
  },
  
  // 共有フレーズの更新
  updateSharedPhrase: async (phraseId, updateData) => {
    try {
      await firestore()
        .collection('sharedPhrasebooks')
        .doc(phraseId)
        .update({
          ...updateData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      
      return true;
    } catch (error) {
      console.error('Update shared phrase error:', error);
      throw error;
    }
  },
  
  // 共有フレーズの削除
  deleteSharedPhrase: async (phraseId) => {
    try {
      await firestore()
        .collection('sharedPhrasebooks')
        .doc(phraseId)
        .delete();
      
      return true;
    } catch (error) {
      console.error('Delete shared phrase error:', error);
      throw error;
    }
  },
  
  // パートナーの進捗取得
  getPartnerProgress: async (partnerId) => {
    try {
      const progressSnapshot = await firestore()
        .collection('userProgress')
        .where('userId', '==', partnerId)
        .get();
      
      return progressSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get partner progress error:', error);
      throw error;
    }
  },
  
  // 協力/対戦モードの結果保存
  saveGameResult: async (userId, partnerId, gameType, result) => {
    try {
      const partnershipId = userId < partnerId 
        ? `${userId}_${partnerId}` 
        : `${partnerId}_${userId}`;
      
      const gameResultRef = firestore()
        .collection('gameResults')
        .doc();
      
      await gameResultRef.set({
        partnershipId,
        gameType,
        result,
        playedAt: firestore.FieldValue.serverTimestamp(),
        players: [userId, partnerId],
      });
      
      return gameResultRef.id;
    } catch (error) {
      console.error('Save game result error:', error);
      throw error;
    }
  },
};

// 日記サービス
export const diaryService = {
  // 日記エントリーの取得
  getDiaryEntries: async (userId) => {
    try {
      const entriesSnapshot = await firestore()
        .collection('diaryEntries')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      return entriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Get diary entries error:', error);
      throw error;
    }
  },
  
  // 日記エントリーの追加
  addDiaryEntry: async (userId, entryData) => {
    try {
      const newEntryRef = firestore()
        .collection('diaryEntries')
        .doc();
      
      await newEntryRef.set({
        ...entryData,
        userId,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return newEntryRef.id;
    } catch (error) {
      console.error('Add diary entry error:', error);
      throw error;
    }
  },
  
  // 日記エントリーの更新
  updateDiaryEntry: async (entryId, updateData) => {
    try {
      await firestore()
        .collection('diaryEntries')
        .doc(entryId)
        .update({
          ...updateData,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
      
      return true;
    } catch (error) {
      console.error('Update diary entry error:', error);
      throw error;
    }
  },
  
  // 日記エントリーの削除
  deleteDiaryEntry: async (entryId) => {
    try {
      await firestore()
        .collection('diaryEntries')
        .doc(entryId)
        .delete();
      
      return true;
    } catch (error) {
      console.error('Delete diary entry error:', error);
      throw error;
    }
  },
};
