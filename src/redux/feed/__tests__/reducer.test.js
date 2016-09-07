import reducer from '../reducer';
import * as actions from '../actions';

const tweetFixtures = [123, 234, 345, 456]
  .map(id => ({ id, url: `http://www.google.com/${id}` }));

it('receives image tweets', () => {
  expect(
    reducer(undefined, actions.receiveFeed(tweetFixtures))
  ).toEqual({
    isError: false,
    isLoaded: true,
    isLoading: false,
    items: tweetFixtures,
  })
});
