import { combineReducers } from '@reduxjs/toolkit';
import { currentPostReducer } from './currentPostSlice';
import { dismissiblePostsReducer } from './dismissiblePostsSlice';
import { viewedPostsReducer } from './viewedPostsSlice';

export const rootReducer = combineReducers({
  viewedPosts: viewedPostsReducer,
  currentPost: currentPostReducer,
  dismissiblePosts: dismissiblePostsReducer
});

export type RootState = ReturnType<typeof rootReducer>;
