import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

/*
 * mapbox-gl v2 ships its web worker as a separate bundle. Under CRA 4
 * (webpack 4) Babel re-transpiles that bundle and corrupts it, which fails at
 * runtime — never at build time — with:
 *
 *   An error occurred while parsing the WebWorker bundle. This is most likely
 *   due to improper transpilation by Babel
 *   Uncaught ReferenceError: y is not defined
 *
 * Pointing workerClass at the pre-built CSP worker via worker-loader bypasses
 * that transpilation. This is why the map was commented out originally.
 */
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default

// Set once, in one place, from REACT_APP_MAPBOX_TOKEN (inlined at build time).
export const mapAccess = {
  mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_TOKEN
}

export const MAP_STYLE_URL = 'mapbox://styles/mapbox/streets-v11'

export default mapboxgl
