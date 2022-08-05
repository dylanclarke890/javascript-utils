/**
 * Returns a reference to the global object.
 * @return {Window|global} The global object (this function is cross-platform aware).
 */
export function getGlobalObject() {
  return typeof global !== "undefined" ? global : window;
}
