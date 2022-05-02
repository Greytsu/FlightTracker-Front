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

  return (
    <>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={4}
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
                key={marker.id}
                position={markerPos}
                icon={{
                  url: Plane,
                  size: { width: 60, height: 100 },
                  anchor: { x: 15, y: 50 },
                  scaledSize: { width: 30, height: 30 },
                  rotation: marker.dir
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
  // markers: PropTypes.object,
  setMarkers: PropTypes.func
}

export default Map
