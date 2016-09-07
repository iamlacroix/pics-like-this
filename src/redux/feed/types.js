// @flow

export type FeedItem = {
  id: number;
  url: string;
};

export type FeedState = {
  isError: boolean;
  isLoaded: boolean;
  isLoading: boolean;
  items: Array<FeedItem>;
};

export type FeedAction = {
  type: string;
  payload?: Array<FeedItem>;
};
