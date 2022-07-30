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

/**
 * Selects the properties of an object which return true for a
 * supplied callback function.
 * @param {Object} obj The input object.
 * @param {Function} func A function which will receive two parameters:
 * - value: The current value of the input object for a given property;
 * - prop: The name of the current property of the input object.
 * and return true or false based on the
 * @return {Object} An object having only the properties which return true for
 * the callback function.
 */
export function selectPropertiesWhere(obj, func) {
    return Object.keys(obj).reduce((carry, key) => {
      if (func(obj[key], key)) {
        carry[key] = obj[key];
      }
      return carry;
    }, {});
}
