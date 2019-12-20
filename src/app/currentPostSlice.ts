import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RedditPost } from 'typings';
import { viewPost } from './viewedPostsSlice';

const initialState: string = '';

const currentPostSlice = createSlice({
  name: 'currentPost',
  initialState,
  reducers: {},
  extraReducers: {
    [viewPost.type]: (
      _,
      action: PayloadAction<Pick<RedditPost, 'id' | 'permalink'>>
    ) => {
      const {
        payload: { permalink }
      } = action;
      const currentPost = permalink.slice(0, -1); // delete slash
      return currentPost;
    }
  }
});

export const { reducer: currentPostReducer } = currentPostSlice;
