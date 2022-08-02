/**
 * Takes a mouse or a touch events and returns clientX and clientY values
 * @param event
 * @return {[number, number]}
 */
export function getPointerCoordinates(event) {
  if (event.touches) {
    const { clientX, clientY } = event.touches[0];
    return [clientX, clientY];
  }
  const { clientX, clientY } = event;
  return [clientX, clientY];
}

/**
 * Get the direction of a horizontal movement.
 * @returns {"right" | "left"}
 */
export function getHorizontalDirection(alpha) {
  return alpha < 0 ? "right" : "left";
}

/**
 * Get the direction of a vertical movement.
 * @returns {"down" | "up"}
 */
export function getVerticalDirection(alpha) {
  return alpha < 0 ? "down" : "up";
}

/**
 * Get the direction of a movement.
 * @returns {"down" | "up" | "right" | "left"}
 */
export function getDirection(currentPoint, startingPoint, alpha) {
  const alphaX = startingPoint[0] - currentPoint[0];
  const alphaY = startingPoint[1] - currentPoint[1];
  if (Math.abs(alphaX) > Math.abs(alphaY))
    return getHorizontalDirection(alpha[0]);
  return getVerticalDirection(alpha[1]);
}
