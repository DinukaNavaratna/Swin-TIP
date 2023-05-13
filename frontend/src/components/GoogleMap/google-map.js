import { compose, lifecycle, withHandlers, withProps } from 'recompose';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  Circle,
  StreetViewPanorama,
  OverlayView,
} from 'react-google-maps';
import '../MapContainer/map-container.css';
import SearchBox from 'react-google-maps/lib/components/places/SearchBox';
import React from 'react';
const _ = require('lodash');
const key = process.env.REACT_APP_API_KEY;


const cityCircle = {
  strokeColor: '#FF0000',
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: '#FF0000',
  fillOpacity: 0.35,
};

const mapOptions = {
  streetViewControl: true,
};

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -(height / 2),
});

export const GoogleMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div style={{ height: (window.innerHeight / 100) * 82.5 }} />
    ),
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        position: null,
        // lat: this.props.lat,
        // lng: this.props.long,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },
        bounds: null,
        center: {
          lat: 41.9,
          lng: -87.624,
        },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          });
        },

        onSelectedProperty: (ref) => {
          console.log(ref);
          this.props.loadSelectedProperty(ref);
          this.props.openAdModal();
        },

        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new window.google.maps.LatLngBounds();

          places.forEach((place) => {
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map((place) => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(
            nextMarkers,
            '0.position',
            this.state.center
          );

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });

          // let lat = nextCenter.toString().substring(1, 10);
          // let long = nextCenter.toString().substring(12, 22);
          let lat = nextCenter.toString().split(',')[0].substring(1).trim();
          let long = nextCenter.toString().split(',')[1].slice(0, -1).trim();
          console.log(lat);
          console.log(long);

          this.props.loadCoordinates(lat, long);
          console.log(bounds);
          // refs.map.fitBounds(bounds);
        },
        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          this.props.loadCoordinates(
            position.toString().substring(1, 11),
            position.toString().substring(19, 30)
          );
          this.props.openModal();
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (

  <GoogleMap
    defaultZoom={15}
    center={{
      lat: parseFloat(props.lat) || 6.0535,
      lng: parseFloat(props.long) || 80.221,
    }}
    options={mapOptions}
  >
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={window.google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Enter address"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `15px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox>
    {props.isMarkerShown && (
      <Marker
        position={{
          lat: parseFloat(props.lat),
          lng: parseFloat(props.long),
        }}
        draggable
        ref={props.onMarkerMounted}
        onDragEnd={props.onPositionChanged}
      />
    )}

    {props.listing && ( <>
      {props.listing.map(property => (
        <Marker key={property._id}
          position={{
            lat: parseFloat(property.coordinates.lat),
            lng: parseFloat(property.coordinates.long),
          }}
          onClick={() =>{
            props.onSelectedProperty(property);
          }}
        />
      ))}
    </>)}


    <Circle
      center={{
        lat: parseFloat(props.lat),
        lng: parseFloat(props.long),
      }}
      radius={500}
      options={cityCircle}
    />
  </GoogleMap>
));

export const GoogleStreetViewComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: (
      <div style={{ height: (window.innerHeight / 100) * 82.5 }} />
    ),
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{
      lat: parseFloat(props.lat) || 49.28590291211115,
      lng: parseFloat(props.long) || -123.11248166065218,
    }}
    options={mapOptions}
  >
    <StreetViewPanorama
      defaultPosition={{
        lat: parseFloat(props.lat) || 6.025,
        lng: parseFloat(props.long) || 80.218,
      }}
      visible
    >
      <OverlayView
        position={{ lat: 49.28590291211115, lng: -123.11248166065218 }}
        mapPaneName={OverlayView.OVERLAY_LAYER}
        getPixelPositionOffset={getPixelPositionOffset}
      />
    </StreetViewPanorama>
  </GoogleMap>
));
