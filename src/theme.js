'use strict';

const SunCalc = require('suncalc');
const svgMarker = require('./svg-marker');

const tileUrl_light = 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png';
const tileUrl_dark = 'https://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png';

let mode;

let setMode = (lat, lng) => {
  let sunlight = SunCalc.getTimes(new Date(), lat, lng);
  let current = new Date();

  if(current>sunlight.sunsetStart || current<sunlight.sunriseEnd){
    // dark mode on
    mode = 1;
  }else{
    mode = 0;
  }
}

let getTile = () => {
  return mode? tileUrl_dark:tileUrl_light;
}

let getLocationMarker = () => {
  return mode? svgMarker.location_night:svgMarker.location;
}

let getLockedMarker = () => {
  return mode? svgMarker.locked_night:svgMarker.locked;
}

let getUnlockedMarker = () => {
  return mode? svgMarker.unlocked_night:svgMarker.unlocked;
}

module.exports = {
  setMode,
  getTile,
  getLocationMarker,
  getLockedMarker,
  getUnlockedMarker
}
