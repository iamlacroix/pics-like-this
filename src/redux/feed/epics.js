// @flow

import { combineEpics } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import * as constants from './constants';
import * as feedActions from '../feed/actions';

const fetchFeed = (action$: Object) =>
  action$.ofType(constants.FETCH)
    .mergeMap(action =>
      Observable.ajax.post('/tweets', { categories: JSON.stringify(action.payload) })
        .map(({ response }) => feedActions.receiveFeed(response.images))
        .catch(() => Observable.of({ type: constants.ERROR }))
    );

export default combineEpics(fetchFeed);
