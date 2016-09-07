// @flow

import type { FeedAction, FeedState } from './types';

import * as feedConstants from './constants';

const initialState: FeedState = {
  isError: false,
  isLoaded: false,
  isLoading: false,
  items: [],
};

export default (state: FeedState = initialState, action: FeedAction): FeedState => {
  switch (action.type) {
    case feedConstants.FETCH:
      return { ...state, isLoading: true };
    case feedConstants.RECEIVE:
      return {
        ...state,
        isError: false,
        isLoaded: true,
        isLoading: false,
        items: action.payload,
      };
    case feedConstants.ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};
