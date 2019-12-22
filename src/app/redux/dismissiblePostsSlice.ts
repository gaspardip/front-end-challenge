import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: Record<string, boolean> = {};

const dismissedPostsSlice = createSlice({
  name: 'dismissiblePosts',
  initialState,
  reducers: {
    addDismissiblePosts: (state, action: PayloadAction<string[]>) => {
      const obj = action.payload.reduce((acc, current) => {
        acc[current] = false;
        return acc;
      }, {} as Record<string, boolean>);

      return { ...state, ...obj };
    },
    dismissPost(state, action: PayloadAction<string>) {
      state[action.payload] = true;
    },
    dismissAll(state) {
      Object.keys(state).forEach(v => (state[v] = true));
    }
  }
});

export const {
  reducer: dismissiblePostsReducer,
  actions: { addDismissiblePosts, dismissPost, dismissAll }
} = dismissedPostsSlice;
