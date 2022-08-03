export const geoStandardOptions = Object.freeze({
  enableHighAccuracy: false,
  timeout: 0xffffffff,
  maximumAge: 0,
});

/**
 * Checks if two position are equal. Instead of throwing an error, this method
 * will also return false if the supplied args are invalid.
 * @param {Object} current a Position object.
 * @param {Object} next the obj to compare against.
 * @returns {boolean} True if they are equal.
 */
export function isSamePosition(current, next) {
  if (
    typeof current !== "object" ||
    typeof next !== "object" ||
    !current ||
    !next ||
    !next.coords ||
    (current.timestamp &&
      next.timestamp &&
      current.timestamp !== next.timestamp)
  )
    return false;

  return (
    current.coords.latitude === next.coords.latitude &&
    current.coords.longitude === next.coords.longitude &&
    current.coords.altitude === next.coords.altitude &&
    current.coords.accuracy === next.coords.accuracy &&
    current.coords.altitudeAccuracy === next.coords.altitudeAccuracy &&
    current.coords.heading === next.coords.heading &&
    current.coords.speed === next.coords.speed
  );
}

/**
 * Given a object with coords properties returns only its timestamp 
 * and coord properties.
 * @param {Object} position The object to convert.
 * @returns {Object} a position object.
 */
export function makePositionObj(position) {
  return !position || typeof position !== 'object'
    ? null
    : {
        timestamp: position.timestamp,
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          altitude: position.coords.altitude,
          accuracy: position.coords.accuracy,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        },
      };
}
