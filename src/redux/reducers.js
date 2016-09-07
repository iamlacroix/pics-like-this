// @flow

import { combineReducers } from 'redux';

import feed from './feed/reducer';
import places from './places/reducer';

export default combineReducers({
  feed,
  places,
});
