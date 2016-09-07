// @flow

import type { MarkersAction, Marker, Place, PlacesAction } from './types';

import { combineReducers } from 'redux';
import * as constants from './constants';

const current = (state: Place|null = null, action: PlacesAction): Place|null => {
  switch (action.type) {
    case constants.UPDATE_PLACE:
      return action.payload;
    default:
      return state;
  }
};

const markers = (state: Array<Marker> = [], action: MarkersAction): Array<Marker> => {
  switch (action.type) {
    case constants.UPDATE_MARKERS:
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  current,
  markers,
});
