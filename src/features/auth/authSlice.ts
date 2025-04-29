import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload; // payload should be the token string or null
    },
    // Potentially add a clearAccessToken or logout reducer
    clearAccessToken: (state) => {
      state.accessToken = null;
    }
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

// Selector to easily get the token
export const selectAccessToken = (state) => state.auth.accessToken;

export default authSlice.reducer;
