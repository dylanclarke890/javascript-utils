/**
 * Yields all the numbers of the specified range
 * (including "start" and "limit" if they fall in the range while stepping
 * with "step").
 *
 * @generator
 * @param {number} start An int specifying the start of the range.
 * @param {number} limit An int specifying the limit of the range.
 * @param {number} step An int specifying the step to take within each value of the range.
 * @yield {number} The next number of the range.
 */
export function* xRange(start, limit, step = 1) {
  if (start < limit) {
    if (step <= 0)
      throw new RangeError("Step must be a positive int greater than 0.");
    for (let i = start; i <= limit; i += step) yield i;
  } else {
    if (step >= 0)
      throw new RangeError("Step must be a negative int greater than 0.");
    for (let i = start; i >= limit; i += step) yield i;
  }
}
