/** A google.maps.LatLngBounds or object literal with lat and lng properties.
 *  @typedef {Object} LatLngBounds
 *  @property {number} lat
 *  @property {number} lng
 * /
/**
 * Determines the best zoom level for a Google map.
 * @param {LatLngBounds} bounds The bounds.
 * @param {Object} mapDimensions POJO with height and width properties.
 * @param {number} mapDimensions.height The height of the map's div.
 * @param {number} mapDimensions.width The width of the map's div.
 * @return {number} The best zoom level.
 */
export function bestZoomForBounds(bounds, mapDimensions) {
  if (
    typeof bounds !== "object" ||
    typeof mapDimensions !== "object" ||
    !bounds ||
    !mapDimensions
  )
    return null;
  const WORLD_DIM = { height: 256, width: 256 };
  const ZOOM_MAX = 21;

  function latRad(lat) {
    const sin = Math.sin((lat * Math.PI) / 180);
    const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
    return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
  }

  function zoom(mapPx, worldPx, fraction) {
    return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
  }

  const ne = bounds.getNorthEast();
  const sw = bounds.getSouthWest();

  const latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

  const lngDiff = ne.lng() - sw.lng();
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = zoom(mapDimensions.height, WORLD_DIM.height, latFraction);
  const lngZoom = zoom(mapDimensions.width, WORLD_DIM.width, lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
}
