// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import debounce from 'lodash.debounce';
import GoogleMapsLoader from 'google-maps';
import { fetchFeed } from '../redux/feed/actions';
import { updatePlace, updateMarkers } from '../redux/places/actions';
import styles from './Map.css';

GoogleMapsLoader.KEY = process.env.GOOGLE_API_KEY;
GoogleMapsLoader.LIBRARIES = ['places'];

class Map extends Component {
  _updatePlaces: () => void;
  _div: any;
  google: any;
  map: any;
  state: { lat: number, lng: number };

  constructor(props) {
    super(props);
    this.state = { lat: 41.8847073, lng: -87.646780 };
    this._updatePlaces = this._updatePlaces.bind(this);

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const { latitude: lat, longitude: lng } = coords;
      this.setState({ lat, lng });

      if (this.map) {
        this.map.setCenter({ lat, lng });
      }
    });

    GoogleMapsLoader.load(google => {
      this.google = google;
      const { lat, lng } = this.state;

      const map = new google.maps.Map(this._div, {
        center: { lat, lng },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
      });
      this.map = map;

      const updatePlacesDebounced = debounce(this._updatePlaces, 300);
      google.maps.event.addListener(map, 'bounds_changed', updatePlacesDebounced);
      google.maps.event.addListener(map, 'center_changed', updatePlacesDebounced);
      google.maps.event.addListener(map, 'zoom_changed', updatePlacesDebounced);
    });
  }

  _updatePlaces() {
    const { map, google: { maps } } = this;
    const fetchNewFeed = this.props.fetchFeed;
    const service = new maps.places.PlacesService(map);

    const createMarker = (place) => {
      const marker = new maps.Marker({
        map: map,
        position: place.geometry.location
      });

      maps.event.addListener(marker, 'click', () => {
        this.props.updatePlace(place);
        fetchNewFeed(place);
      });

      return marker;
    }

    const handleResults = (results, status) => {
      if (status === maps.places.PlacesServiceStatus.OK) {
        // Clear previous markers
        this.props.markers.forEach(marker => marker.setMap(null));

        // Render place markers
        const markers = results.map(place => createMarker(place));

        // Save places to state
        this.props.updateMarkers(markers);
      }
    };

    service.nearbySearch({
      bounds: map.getBounds(),
    }, handleResults);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div
        ref={c => this._div = c}
        className={styles.root}
      />
    );
  }
}

const mapStateToProps = ({ places }) => ({ markers: places.markers });

export default connect(mapStateToProps, ({ fetchFeed, updateMarkers, updatePlace }))(Map);
