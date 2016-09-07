import { combineEpics } from 'redux-observable';

import feed from './feed/epics';

const epics = [
  feed,
];

export default combineEpics(...epics);
