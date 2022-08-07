/**
 * @param {any[]} arr an array of values.
 * @returns the distinct elements from the array. */
export function distinct(arr) {
  return [...new Set(arr)];
}

/**
 * @param {number[]} arr an array of numbers.
 * @returns the sum of the array. */
export function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

/**
 * Check if an array is all numbers.
 * @param {any[]} arr an array of values.
 * @returns True if all the items in the array are numbers, or the array is empty. */
export function isArrayOfNumber(arr) {
  return !arr.some((v) => isNaN(v));
}

/**
 * Get the first item in an array.
 * @param {any[]} arr an array of values.
 * @returns the first item in the array. */
export function firstItem(arr) {
  return arr[0];
}

/**
 * Get the last item in an array.
 * @param {any[]} arr an array of values.
 * @returns the last item in the array. */
export function lastItem(arr) {
  return arr[arr.length - 1];
}

/**
 * Get the first nested object in an array, if present.
 * @param {any[]} arr an array of values.
 * @returns {Object | undefined} the first nested array or object in the array. */
export function firstNested(arr) {
  let nested;
  nested = arr.find((val) => typeof val === "object");
  return nested;
}

/**
 * Get the last nested object in an array, if present.
 * @param {any[]} arr an array of values.
 * @returns the first nested array or object in the array. */
export function lastNested(arr) {
  return firstNested(arr.reverse());
}

/**
 * Get the smallest value of an array. WARNING: may
 * return unpredictable results with non-int arrays.
 * @param {any[]} arr an array of values.
 * @returns {any} the smallest value in the array. */
export function minOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMin, val) => (currentMin < val ? currentMin : val),
    +Infinity
  );
}

/**
 * Get the largeste value of an array. WARNING: may
 * return unpredictable results with non-int arrays.
 * @param {any[]} arr an array of values.
 * @returns {any} the largest value in the array. */
export function maxOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMax, val) => (currentMax > val ? currentMax : val),
    -Infinity
  );
}

/**
 * Sort an array of numbers in ascending or descending order.
 * @param {number[]} arr an array of numbers.
 * @param {boolean} desc flag to sort ascending/descending. Default is ascending.
 * @returns {number[]} a sorted array without mutating the original. */
export function sortNums(arr, desc = false) {
  return [...arr].sort((a, b) => (desc ? b - a : a - b));
}

/**
 * Remove nulls from an array. Returns a new array.
 * @param {any[]} arr
 * @returns an array without nulls that leaves the original unchanged. */
export function removeNulls(arr) {
  const returnArr = [];
  arr.forEach((val) => {
    if (val !== undefined && val !== null) returnArr.push(val);
  });
  return returnArr;
}

/**
 * 'Unshift' an item to an array (will become the new first item).
 * @param {any[]} arr The array to unshift.
 * @param {*} item the item to "prepend" to the array. */
export function unshift(arr, item) {
  let len = arr.length;
  while (len) {
    arr[len] = arr[len - 1];
    len--;
  }
  arr[0] = item;
}

/**
 * Create an array which allows the usage of negative indices to retrieve its data,
 * where -1 indicates the last element of the array (same as `array.length - 1`). Can also
 * be configured to wrap indexes if the index is out of range in either direction.
 * @param {Array} array An array to use as the target object.
 * @param {Object} options Options.
 * @param {boolean} [options.wrapOverflow] Whether or not to wrap if the negative index is greater
 * than the length of the array. If false, undefined will be returned if the index is out of
 * range.
 * @return {Proxy} The proxy object for the given array.
 */
export function indexWrappedArray(array, options = { wrapOverflow: true }) {
  return new Proxy(array, {
    get: function (arr, index) {
      index = Number(index);
      index = index < 0 ? index + arr.length : index;
      if (options.wrapOverflow) {
        while (index < 0) index = index + arr.length;
        while (index > arr.length) index = index - arr.length;
        if (index === arr.length) index = 0;
      }
      return arr[index];
    },
  });
}

/**
 * Moves the item to the new position in the array array. Useful for huge arrays where
 * absolute performance is needed.
 * @param {Array<any>} array
 * @param {number} fromIndex The index of the item to move. If negative, it will begin that
 * many elements from the end.
 * @param {number} toIndex The index of where to move the item. If negative, it will begin
 * that many elements from the end.
 * @returns {Array<any>} The same array with the item in it's new position.
 */
export function arrayMoveMutable(array, fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;
    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

/**
 * Clones the given array, moves the item to a new position in the new array, and then
 * returns the new array. The given array is not mutated.
 * @param {Array<any>} array
 * @param {number} fromIndex The index of the item to move. If negative, it will begin that
 * many elements from the end.
 * @param {number} toIndex The index of where to move the item. If negative, it will begin
 * that many elements from the end.
 * @returns {Array<any>} A new array with the item in it's new position.
 */
export function arrayMoveImmutable(array, fromIndex, toIndex) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}
