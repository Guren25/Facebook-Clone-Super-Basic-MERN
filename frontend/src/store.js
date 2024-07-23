import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import authReducer from './features/users/authSlice';
import postsReducer from './features/posts/postsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;
