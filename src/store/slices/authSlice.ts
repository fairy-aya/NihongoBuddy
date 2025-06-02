import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  userProfile: {
    displayName: string | null;
    email: string | null;
    photoURL: string | null;
    learningLevel: string | null;
  } | null;
  partnerId: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  userProfile: null,
  partnerId: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{
      userId: string;
      displayName: string | null;
      email: string | null;
      photoURL: string | null;
      learningLevel: string | null;
      partnerId: string | null;
    }>) {
      state.isAuthenticated = true;
      state.userId = action.payload.userId;
      state.userProfile = {
        displayName: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        learningLevel: action.payload.learningLevel,
      };
      state.partnerId = action.payload.partnerId;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      return initialState;
    },
    updateProfile(state, action: PayloadAction<{
      displayName?: string;
      photoURL?: string;
      learningLevel?: string;
    }>) {
      if (state.userProfile) {
        state.userProfile = {
          ...state.userProfile,
          ...action.payload,
        };
      }
    },
    setPartner(state, action: PayloadAction<string>) {
      state.partnerId = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateProfile,
  setPartner,
} = authSlice.actions;

export default authSlice.reducer;
