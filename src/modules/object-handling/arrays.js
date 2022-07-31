/** @returns the distinct elements from the array. */
export function distinct(arr) {
  return [...new Set(arr)];
}

/** @returns the sum of the array. */
export function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

/** @returns if all the items in the array are numbers, or the array is empty. */
export function isArrayOfNumber(arr) {
  return !arr.some((v) => isNaN(v));
}

/** @returns the first item in the array. */
export function firstItem(arr) {
  return arr[0];
}

/** @returns the last item in the array. */
export function lastItem(arr) {
  return arr[arr.length - 1];
}

/** @returns the first nested array or object in the array. */
export function firstNested(arr) {
  let nested;
  for (let val in arr) {
    if (typeof val === "object") nested = val;
    break;
  }
  return nested;
}

/** @todo could take a while to reverse a large array.
 *  @returns the first nested array or object in the array. */
export function lastNested(arr) {
  return firstNested(arr.reverse());
}

/**  @returns the smallest value in the array. */
export function minOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMin, val) => (currentMin < val ? currentMin : val),
    +Infinity
  );
}

/**  @returns the largest value in the array. */
export function maxOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMax, val) => (currentMax > val ? currentMax : val),
    -Infinity
  );
}

/**  @returns a sorted array without mutating the original. */
export function sortNums(arrayOfNums, desc = false) {
  return [...arrayOfNums].sort((a, b) => (desc ? b - a : a - b));
}

/**  @returns an array without nulls that leaves the original unchanged. */
export function removeNulls(arr) {
  const returnArr = [];
  arr.forEach((val) => {
    if (val !== null) returnArr.push(arr);
  });
  return returnArr;
}

/**  unshifts an array. */
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
 * where -1 indicates the last element of the array (same as
 * `array.length - 1`).
 * @param {Array} array An array to use as the target object.
 * @param {Object} options Options.
 * @param {boolean} [options.wrap] Whether or not to wrap if the negative index is greater
 * than the length of the array. If false, undefined will be returned if the index is out of
 * range.
 * @return {Proxy} The proxy object for the given array.
 */
export function arrayWithNegativeIndices(array, { wrap = true } = {}) {
  return new Proxy(array, {
    get: function (target, propKey) {
      let numberPropKey = Number(propKey);
      if (
        !Number.isNaN(numberPropKey) &&
        Number.isInteger(numberPropKey) &&
        numberPropKey < 0
      ) {
        const absNumberPropKey = Math.abs(numberPropKey);
        if (wrap || absNumberPropKey <= target.length) {
          numberPropKey = target.length - (absNumberPropKey % target.length);
          propKey = String(numberPropKey === target.length ? 0 : numberPropKey);
        }
      }
      return target[propKey];
    },
  });
}
