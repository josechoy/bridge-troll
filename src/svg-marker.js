'use strict';

// Using Material Icons as inline SVG - https://material.io/icons/

const leaflet = require('leaflet');

// Read contents of SVG files from bundle as Data URLs
const locationSvgUrl = require('../icons/material-icons/location.svg');
const lockedSvgUrl = require('../icons/material-icons/locked.svg');
const unlockedSvgUrl = require('../icons/material-icons/unlocked.svg');
const locationSvgUrl_white = require('../icons/material-icons/location_white.svg');
const lockedSvgUrl_white = require('../icons/material-icons/locked_white.svg');
const unlockedSvgUrl_white = require('../icons/material-icons/unlocked_white.svg');

// All icons share the same size, define it once
const iconSize = [25, 25];

// Expose custom Leaflet Icons to be used in our markers
module.exports.location = leaflet.icon({
  iconUrl: locationSvgUrl,
  iconSize
});

module.exports.locked = leaflet.icon({
  iconUrl: lockedSvgUrl,
  iconSize
});

module.exports.unlocked = leaflet.icon({
  iconUrl: unlockedSvgUrl,
  iconSize
});

module.exports.location_night = leaflet.icon({
  iconUrl: locationSvgUrl_white,
  iconSize
});

module.exports.locked_night = leaflet.icon({
  iconUrl: lockedSvgUrl_white,
  iconSize
});

module.exports.unlocked_night = leaflet.icon({
  iconUrl: unlockedSvgUrl_white,
  iconSize
});
