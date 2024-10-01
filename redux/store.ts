import { configureStore } from '@reduxjs/toolkit';
import goalReducer from './goalSlice'; // We'll create this slice next
import userReducer from './userSlice'
import adminReducer from './adminSlice'

const store = configureStore({
  reducer: {
    goals: goalReducer, // Add your reducers here
    user: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
