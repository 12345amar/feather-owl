
// redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index'; // Import your root reducer

export const store = configureStore({
  reducer: rootReducer,
  // Other middleware or options can be added here
});
