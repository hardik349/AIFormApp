import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import recordReducer from './recordSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    records: recordReducer,
  },
});
