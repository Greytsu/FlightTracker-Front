import React from 'react'
import Plane from '../img/plane.png'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import PropTypes from 'prop-types'

const containerStyle = {
  width: '100%',
  height: '100%'
}

const center = {
  lat: 48.901668548583984,
  lng: 2.2089180946350098
}

const Map = props => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  })

  function handleCornerCoordonates() {
    this.getBounds()
      ? props.setCoordonates({
          ne_lat: this.getBounds().getNorthEast().lat(),
          ne_lng: this.getBounds().getNorthEast().lng(),
          sw_lat: this.getBounds().getSouthWest().lat(),
          sw_lng: this.getBounds().getSouthWest().lng()
        })
      : ''
  }

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
          onLoad={map => {
            handleCornerCoordonates
          }}
          onZoomChanged={handleCornerCoordonates}
          onDragEnd={handleCornerCoordonates}
          onInit={handleCornerCoordonates}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false
          }}
        >
          {props.markers?.map(marker => {
            const markerPos = {
              lat: marker.lat,
              lng: marker.lng
            }
            return (
              <Marker
                key={marker.hex}
                position={markerPos}
                icon={{
                  url: Plane,
                  size: { width: 60, height: 100 },
                  anchor: { x: 15, y: 50 },
                  scaledSize: { width: 30, height: 30 }
                }}
              />
            )
          })}
        </GoogleMap>
      ) : (
        <h1>Loadin Error</h1>
      )}
    </>
  )
}

Map.propTypes = {
  coordonates: PropTypes.object,
  setCoordonates: PropTypes.func,
  markers: PropTypes.object,
  setMarkers: PropTypes.func
}

export default Map
