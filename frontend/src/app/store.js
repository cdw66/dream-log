import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import dreamReducer from '../features/dreams/dreamSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    dreams: dreamReducer
  },
});
