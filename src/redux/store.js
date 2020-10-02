import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalSlice';
import authReducer from './authSlice';

export default configureStore({
  reducer: {
    modal: modalReducer,
    auth: authReducer,
  },
});
