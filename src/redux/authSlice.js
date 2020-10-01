import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    loaded: false,
    user: '',
  },
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.loaded = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.loaded = false;
    },
  },
});

export const { loadUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
