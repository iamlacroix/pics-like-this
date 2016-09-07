import React from 'react';
import { shallow } from 'enzyme';
import { Tweets } from '../Tweets';

const tweetFixtures = [123, 234, 345, 456]
  .map(id => ({ id, url: `http://www.google.com/${id}` }));

it('renders tweets', () => {
  const wrapper = shallow(<Tweets images={tweetFixtures} isLoaded={true} />);
  expect(wrapper.find('li').length).toEqual(4);
});
