import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';

// 認証サービス
export const authService = {
  // ユーザー登録
  register: async (email, password, displayName) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      
      // ユーザープロフィールの更新
      await userCredential.user.updateProfile({
        displayName,
      });
      
      // Firestoreにユーザー情報を保存
      await firestore().collection('users').doc(userCredential.user.uid).set({
        displayName,
        email,
        photoURL: null,
        learningLevel: 'beginner',
        partnerId: null,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return userCredential.user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },
  
  // ログイン
  login: async (dispatch, email, password) => {
    dispatch(loginStart());
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      
      // ユーザー情報をFirestoreから取得
      const userDoc = await firestore().collection('users').doc(userCredential.user.uid).get();
      const userData = userDoc.data();
      
      dispatch(loginSuccess({
        userId: userCredential.user.uid,
        displayName: userCredential.user.displayName,
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL,
        learningLevel: userData?.learningLevel || 'beginner',
        partnerId: userData?.partnerId || null,
      }));
      
      return userCredential.user;
    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure(error.message));
      throw error;
    }
  },
  
  // ログアウト
  logout: async (dispatch) => {
    try {
      await auth().signOut();
      dispatch(logout());
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('ログアウトエラー', error.message);
    }
  },
  
  // パスワードリセット
  resetPassword: async (email) => {
    try {
      await auth().sendPasswordResetEmail(email);
    } catch (error) {
      console.error('Password reset error:', error);
      throw error;
    }
  },
  
  // 現在のユーザーを取得
  getCurrentUser: () => {
    return auth().currentUser;
  },
};

// ユーザーサービス
export const userService = {
  // ユーザープロフィールの更新
  updateProfile: async (userId, profileData) => {
    try {
      await firestore().collection('users').doc(userId).update(profileData);
      
      // 認証プロフィールの更新（表示名と写真URLのみ）
      const updateData = {};
      if (profileData.displayName) updateData.displayName = profileData.displayName;
      if (profileData.photoURL) updateData.photoURL = profileData.photoURL;
      
      if (Object.keys(updateData).length > 0) {
        await auth().currentUser.updateProfile(updateData);
      }
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  },
  
  // パートナーの設定
  setPartner: async (userId, partnerId) => {
    try {
      // 自分のパートナーIDを更新
      await firestore().collection('users').doc(userId).update({
        partnerId,
      });
      
      // パートナーのパートナーIDも更新
      await firestore().collection('users').doc(partnerId).update({
        partnerId: userId,
      });
      
      // パートナーシップドキュメントの作成
      await firestore().collection('partnerships').doc(`${userId}_${partnerId}`).set({
        users: [userId, partnerId],
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
      
      return true;
    } catch (error) {
      console.error('Set partner error:', error);
      throw error;
    }
  },
  
  // ユーザー検索
  searchUsers: async (searchTerm) => {
    try {
      const usersSnapshot = await firestore()
        .collection('users')
        .where('displayName', '>=', searchTerm)
        .where('displayName', '<=', searchTerm + '\uf8ff')
        .limit(10)
        .get();
      
      return usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error('Search users error:', error);
      throw error;
    }
  },
};
