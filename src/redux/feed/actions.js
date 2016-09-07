// @flow

import type { FeedAction, FeedItem } from './types';
import type { Action } from '../../store/types';
import type { Place } from '../places/types';

import * as feedConstants from './constants';

export const fetchFeed = (place: Place): Action => ({
  type: feedConstants.FETCH,
  payload: place.types || [],
});

export const receiveFeed = (items: Array<FeedItem>): FeedAction => ({
  type: feedConstants.RECEIVE,
  payload: items,
});
