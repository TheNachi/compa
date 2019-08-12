import { combineReducers } from 'redux';
import authReducer from './auth';
import feedsReducer from './feeds';
import userReducer from './user';

export default combineReducers({
  authentication: authReducer,
  feeds: feedsReducer,
  user: userReducer,
});
