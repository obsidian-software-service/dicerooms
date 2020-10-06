import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  loaded: false,
  user: {},
};

const profile = localStorage.getItem('profile');
if (!!profile) {
  initialState = {
    loaded: true,
    user: profile,
  };
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadUser: (state, action) => {
      state.user = action.payload;
      state.loaded = true;
    },
    unloadUser: (state) => {
      state.user = {};
      state.loaded = false;
    },
  },
});

export const { loadUser, unloadUser } = authSlice.actions;

export const saveUser = (profile) => (dispatch) => {
  localStorage.setItem('profile', profile);
  dispatch(loadUser(profile));
};

export const clearUser = () => (dispatch) => {
  localStorage.removeItem('profile');
  dispatch(unloadUser());
};

export default authSlice.reducer;
