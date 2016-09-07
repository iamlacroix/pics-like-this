// @flow

import type { State } from '../store/types';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'halogen/PulseLoader';
import styles from './Tweets.css';

export class Tweets extends Component {
  renderPlace: () => any;
  renderContent: () => any;

  constructor(props: any) {
    super(props);
    this.renderPlace = this.renderPlace.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  renderPlace() {
    const { place } = this.props;

    return place ? (
      <div className={styles.place}>
        <h1>{place.name}</h1>
        <h2>Categories</h2>
        <p>{place.types.join(', ')}</p>
      </div>
    ) : null;
  }

  renderContent(placeHtml: any) {
    const { images, isError, isLoaded } = this.props;

    if (isError) {
      return (
        <div>
          {placeHtml}
          <div className={styles.error}>
            <p>Sorry, an error occurred. Please try again.</p>
          </div>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div>
          {placeHtml}
          <div className={styles.start}>
            <p>Select a place on the map to search Twitter for images related to the place's categories.</p>
          </div>
        </div>
      );
    }

    const imagesHtml = images.map(({ id, url }) => (
      <li key={id} className={styles.item}>
        <div className={styles.imgWrap}>
          <div className={styles.img} style={{ backgroundImage: `url(${url})` }} />
        </div>
      </li>
    ));

    return (
      <div>
        {placeHtml}
        <ul className={styles.grid}>{imagesHtml}</ul>
      </div>
    );
  }

  render() {
    const { isLoading } = this.props;
    const placeHtml = this.renderPlace();

    const loadingHtml = isLoading ? (
      <div className={styles.loader}>
        <Loader color="#111" size="16px" margin="8px"/>
        {placeHtml}
      </div>
    ) : null;

    return (
      <div className={styles.root}>
        {this.renderContent(placeHtml)}
        {loadingHtml}
      </div>
    );
  }
}

const mapStateToProps = ({ feed, places }: State) => ({
  images: feed.items,
  isError: feed.isError,
  isLoaded: feed.isLoaded,
  isLoading: feed.isLoading,
  place: places.current,
});

export default connect(mapStateToProps)(Tweets);
