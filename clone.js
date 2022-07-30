/** @returns a shallow copy of the array. */
export function cloneArr(arr) {
  return arr.slice(0);
}

/**
 * Clones an object deeply using JSON. This is fine for simple objects and arrays,
 * but should use a more complex implementation for custom data types.
 * @param {Object} obj The object to clone.
 * @return {Object} The cloned object.
 */
export function cloneDeeplyJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}
