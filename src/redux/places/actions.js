// @flow

import type { Marker, MarkersAction, Place, PlacesAction } from './types';

import * as constants from './constants';

export const updatePlace = (place: Place): PlacesAction => ({
  type: constants.UPDATE_PLACE,
  payload: place,
});

export const updateMarkers = (markers: Array<Marker>): MarkersAction => ({
  type: constants.UPDATE_MARKERS,
  payload: markers,
});
