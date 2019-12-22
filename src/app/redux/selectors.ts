import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './rootReducer';

export const selectPostState = createSelector<
  RootState,
  string,
  Pick<RootState, 'viewedPosts' | 'dismissiblePosts'>,
  string,
  { viewed: boolean; dismissed: boolean }
>(
  ({ viewedPosts, dismissiblePosts }) => ({
    viewedPosts,
    dismissiblePosts
  }),
  (_, id) => id,
  ({ viewedPosts, dismissiblePosts }, id) => ({
    viewed: viewedPosts[id] === true,
    dismissed: dismissiblePosts[id] === true
  })
);

export const selectCurrentPost = ({ currentPost }: RootState) => currentPost;
