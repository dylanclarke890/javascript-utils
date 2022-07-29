/**
 * Clamps a latitude value so that it is always between -90 and 90.
 * @param {number|string} latitude Either a number or a string
 * which can be cast to a number.
 * @return {number} Latitude, clamped.
 */
export function clampLatitude(latitude) {
  latitude = Number(latitude);
  if (latitude < -90) return -90;
  return latitude < 90 ? latitude : 90;
}

/**
 * Wraps a longitude value so that it is always between -180 and 180.
 * @param {number|string} longitude Either a number or a string
 * which can be cast to a number.
 * @return {number} the wrapped longitude.
 */
export const wrapLongitude = (longitude) => {
  longitude = Number(longitude);
  while (longitude > 180) {
    longitude -= 360;
  }
  while (longitude < -180) {
    longitude += 360;
  }
  return longitude;
};

/**
 * Normalizes a latitude so that it is within the range [0, 180].
 * @param {number|string} latitude Either a number or a string
 * which can be cast to a number.
 * @return {number} the normalized latitude.
 */
export function normalizeLatitude(latitude) {
  latitude = clampLatitude(latitude);
  if (latitude >= 0) {
    return 90 - latitude;
  }
  return 90 + Math.abs(latitude);
}

/**
 * Normalizes a longitude so that it is within the range [0, 360].
 * @param {number} longitude Either a number or a string
 * which can be cast to a number.
 * @return {number} the normalized longitude.
 */
export function normalizeLongitude(longitude) {
  longitude = wrapLongitude(longitude);
  return longitude + 180;
}
