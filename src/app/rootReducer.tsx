import { combineReducers } from '@reduxjs/toolkit';
import { currentPostReducer } from './currentPostSlice';
import { viewedPostsReducer } from './viewedPostsSlice';

export const rootReducer = combineReducers({
  viewedPosts: viewedPostsReducer,
  currentPost: currentPostReducer
});

export type RootState = ReturnType<typeof rootReducer>;
