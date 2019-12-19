import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './rootReducer';

export const store = configureStore({
  reducer: rootReducer
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const { rootReducer: newRootReducer } = require('./rootReducer');
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
