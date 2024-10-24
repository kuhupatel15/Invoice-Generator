import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./reducers/userSlice"
export const store = configureStore({
    reducer: {
      user:authReducer,
    },
  });
  
