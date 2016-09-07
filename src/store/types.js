// @flow

import type { FeedState } from '../redux/feed/types';
import type { PlacesState } from '../redux/places/types';

export type State = {
  feed: FeedState;
  places: PlacesState;
};

export type Action = {
  type: string;
  payload?: any;
};

export type Store = {
  dispatch: () => void;
  getState: () => Object;
  subscribe: () => void;
};
