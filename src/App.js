// @flow

import React, { Component } from 'react';
import Map from './containers/Map';
import Tweets from './containers/Tweets';

class App extends Component {
  render() {
    return (
      <div>
        <Map />
        <Tweets />
      </div>
    );
  }
}

export default App;
