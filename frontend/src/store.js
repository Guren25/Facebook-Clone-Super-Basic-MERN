import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import authReducer from './features/users/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;
