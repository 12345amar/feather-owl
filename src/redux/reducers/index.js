

// redux/reducers.js
import { combineReducers } from 'redux';
import authReducer from './authSlice';
import subscriptionsSlice from './subscriptionsSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  subscription: subscriptionsSlice
  // Add other reducers here
});

export default rootReducer;
