/**
 * @generator
 * Yields all the numbers of the specified range
 * (including "start" and "limit" if they fall in the range while stepping
 * with "step").
 * @param {number} start An int specifying the start of the range.
 * @param {number} limit An int specifying the limit of the range.
 * @param {number} step An int specifying the step to take within each value of the range.
 * @yield {Object} An object in the format `{ done: false, value: 'nextValueInRange' }`.
 * @return {Object} An object in the format `{ done: true, value: 'finalValueInRange' }`.
 */
export function* generateRange(start, limit, step = 1) {
  let i;
  if (start < limit) {
    if (step <= 0)
      throw new RangeError("Step must be a positive int greater than 0.");
    for (i = start; i < limit; i += step) yield i;
  } else {
    if (step >= 0)
      throw new RangeError("Step must be a negative int greater than 0.");
    for (i = start; i > limit; i += step) yield i;
  }
  return i;
}

/**
 * Yields values of an array mapping the yielded value.
 * @generator
 * @param {Array} items An array of items.
 * @param {*} func The function to call. The function will receive, in order the nth item,
 * the index of the item in the array of items and the whole items array as parameters.
 * @param {*} thisArg Optional this arg of the called function (defaults to undefined).
 * @yields {*} The next yielded mapped item.
 */
 export function* mapYield(items, func, thisArg) {
   const boundFunc = func.bind(thisArg);
   yield* items.map(function (val, i) {
     return boundFunc(val, i, items);
   });
 }