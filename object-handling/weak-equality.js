/**
 * Like "Array.prototype.includes", but with type coercion.
 * @return {boolean} True if the value is included within the array.
 */
export function includes(array, value) {
  for (const valueOfArray of array) if (valueOfArray == value) return true;
  return false;
}

/**
 * Finds the index of a value in an array.
 * (i.e. like "Array.prototype.indexOf", but with type coercion.
 * @return {number} -1 if the value is not in array, otherwise the index of value in array.
 */
export function findIndex(array, value) {
  return array.findIndex((el) => el == value);
}
