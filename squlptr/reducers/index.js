import { combineReducers } from 'redux';
import authReducer from './auth';
import feedsReducer from './feeds';

export default combineReducers({
  authentication: authReducer,
  feeds: feedsReducer,
});
