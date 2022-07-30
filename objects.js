/**
 * Maps an object, executing a function on each of its properties
 * returning a new mapped object.
 * @param {Object} obj The object to map.
 * @param {Function} func The function to use for the mapping.
 * @return {Object} The new mapped object.
 */
export function mapObject(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => [k, func(v, k, i)])
  );
}

/**
 * Maps an array to an object.
 * @param {Array} arr An array.
 * @param {Function} func A function receiving the current value, its index as well as the whole
 * array "arr" as parameters returning a tuple with the key at index 0 and the value at index 1
 * to set on the object.
 * @returns {Object} The array mapped to an object.
 */
export function arrToObject(arr, func) {
  let res;
  return arr.reduce(
    (carry, ...rest) =>
      ((res = func(...rest)) && false) ||
      ((carry[res[0]] = res[1]) && false) ||
      carry,
    {}
  );
}
