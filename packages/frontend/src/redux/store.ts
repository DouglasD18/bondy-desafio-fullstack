import { configureStore } from '@reduxjs/toolkit';
import UserStore from './User/User.Store';

export const store = configureStore({
  reducer: {
    user: UserStore
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
