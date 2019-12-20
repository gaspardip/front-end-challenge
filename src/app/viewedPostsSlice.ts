import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RedditPost } from 'typings';

const initialState: Record<string, boolean | undefined> = {};

const viewedPostsSlice = createSlice({
  name: 'viewedPosts',
  initialState,
  reducers: {
    viewPost(
      state,
      action: PayloadAction<Pick<RedditPost, 'id' | 'permalink'>>
    ) {
      const {
        payload: { id }
      } = action;

      state[id] = true;
    }
  }
});

export const {
  actions: { viewPost },
  reducer: viewedPostsReducer
} = viewedPostsSlice;
