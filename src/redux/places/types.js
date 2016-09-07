// @flow

export type Marker = any;
export type Place = {
  name: string;
  types: Array<string>;
};

export type PlacesState ={
  current: Place | null;
  markers: Array<Marker>;
};

export type PlacesAction = {
  type: string;
  payload: Place|null;
};

export type MarkersAction = {
  type: string;
  payload: Array<Marker>;
};
