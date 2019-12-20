import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export const selectPostWasViewed = createSelector<
  RootState,
  string,
  RootState['viewedPosts'],
  string,
  boolean
>(
  ({ viewedPosts }) => viewedPosts,
  (_, id) => id,
  (viewedPosts, id) => viewedPosts[id] !== undefined
);

export const selectCurrentPost = ({ currentPost }: RootState) => currentPost;
