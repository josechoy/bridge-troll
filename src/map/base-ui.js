'use strict';

const log = require('../log');
const svgMarker = require('../svg-marker');
const theme = require('../theme');

const leaflet = require('leaflet');
const EventEmitter = require('events').EventEmitter;

const attribution =
  '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>';

// TODO: I'm not sure what the ideal zoom level is.  Leaflet often uses 13
// in docs and tutorials.  14 seems to provide a bit more context
// We need something that makes sense for the scale of bridges
// and a person/car/vehicle moving between them.
const defaultZoomLevel = 16;

class BaseUI extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  init(lat, lng) {
    theme.setMode(lat, lng);
    let tileUrl = theme.getTile();

    // http://leafletjs.com/reference-1.3.0.html#map
    let map = (this.map = leaflet.map('map', this.options));
    leaflet.tileLayer(tileUrl, { attribution }).addTo(map);
    map.setView([lat, lng], defaultZoomLevel);

    // http://leafletjs.com/reference-1.3.0.html#map-event
    let onMapChange = () => this.emit('update', map.getBounds());
    map.on('viewreset', onMapChange);
    map.on('moveend', onMapChange);

    // Show a marker at our current location
    this.currentLocationMarker = leaflet
      .marker([lat, lng], {
        title: 'Current Location',
        icon: theme.getLocationMarker()
      })
      .addTo(map);

    log.info(`Map initialized with centre lat=${lat}, lng=${lng}`);
  }

  get zoomLevel() {
    return defaultZoomLevel;
  }

  /**
   * Add a marker to the map
   * @param {*} lat
   * @param {*} lng
   * @param {*} title tooltip to show
   * @param {*} icon icon to use
   * @param {*} onClick optional onClick handler
   */
  addMarker(lat, lng, title, icon, onClick) {
    let marker = leaflet
      .marker([lat, lng], {
        title,
        icon
      })
      .addTo(this.map);

    // Wire-up a click handler for this marker
    if (onClick) {
      marker.on('click', onClick);
    }

    log.debug(`Added marker title=${title} at lat=${lat}, lng=${lng}`);

    return marker;
  }

  /**
   * Centre of the map and update location marker
   */
  setCurrentLocation(lat, lng) {
    this.currentLocationMarker.setLatLng({ lat, lng });
    this.map.setView([lat, lng], this.zoomLevel);
    log.debug(`Moved current location marker to lat=${lat}, lng=${lng}`);
  }
}

module.exports = BaseUI;
