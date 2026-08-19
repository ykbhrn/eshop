import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker } from 'react-map-gl'
import { mapAccess, MAP_STYLE_URL } from '../../lib/mapbox'

/*
 * The map shared by every second-hand listing view. Shows the searched address
 * plus one clickable preview pin per item currently in range; clicking a pin
 * opens that item. Rendering nothing until an address is chosen keeps the page
 * unchanged for users who have not searched yet.
 */
const SecondHandMap = ({ items, coordinates, viewport, onViewportChange, placeName, height }) => {
  if (!coordinates || coordinates.length !== 2) return null

  const vp = viewport || {}
  const pins = (items || []).filter(
    item => Array.isArray(item.coordinates) && item.coordinates.length === 2
  )

  // Several sellers list from the same address, which would stack pins exactly
  // on top of each other and leave only the top one clickable. Fan any shared
  // location out into a small ring so every item can still be opened.
  const atSameSpot = {}
  pins.forEach(item => {
    const key = item.coordinates.join(',')
    atSameSpot[key] = atSameSpot[key] || []
    atSameSpot[key].push(item._id)
  })

  const spread = (item) => {
    const group = atSameSpot[item.coordinates.join(',')]
    if (!group || group.length < 2) return { offsetLeft: 0, offsetTop: 0 }
    const angle = (2 * Math.PI * group.indexOf(item._id)) / group.length
    return {
      offsetLeft: Math.round(Math.cos(angle) * 26),
      offsetTop: Math.round(Math.sin(angle) * 26)
    }
  }

  return (
    <div className="search-map-wrapper">
      <ReactMapGL
        {...mapAccess}
        width="100%"
        height={height || 320}
        latitude={vp.latitude !== undefined ? vp.latitude : coordinates[1]}
        longitude={vp.longitude !== undefined ? vp.longitude : coordinates[0]}
        zoom={vp.zoom !== undefined ? vp.zoom : 11}
        mapStyle={MAP_STYLE_URL}
        onViewportChange={onViewportChange}
        onError={(e) => console.error('Mapbox error', e && e.error && e.error.status)}
      >
        <Marker latitude={coordinates[1]} longitude={coordinates[0]}>
          <div className="search-map-marker" title={placeName || 'Your search location'} />
        </Marker>

        {pins.map(item => (
          <Marker
            key={item._id}
            latitude={item.coordinates[1]}
            longitude={item.coordinates[0]}
            {...spread(item)}
          >
            <Link
              to={`/second-hand/items/${item.title.replace(/ /g, '-')}/${item._id}`}
              className="search-map-pin"
              title={`${item.title} — £${item.price}`}
            >
              <span
                className="search-map-pin-image"
                style={{ backgroundImage: `url(${item.images && item.images[0]})` }}
              />
              <span className="search-map-pin-price">£{item.price}</span>
            </Link>
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  )
}

export default SecondHandMap
