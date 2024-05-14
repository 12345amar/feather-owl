

// redux/reducers.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import subscriptionsSlice from './subscriptionsSlice';
import fileSlice from './fileSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: subscriptionsSlice,
  files: fileSlice
  // Add other reducers here
});

export default rootReducer;
