/**
 * Delays execution of a callback and cancels a previously registered callback if it wasn't executed yet.
 */
export const delay = (function () {
  let timer = 0;
  /**
   * Inner function.
   *
   * @param {Function} callback The callback to execute.
   * @param {number} ms Milliseconds to wait before executing the callback.
   * @return {undefined}
   */
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback();
    }, ms);
  };
})();

/**
 * Debounces a function.
 *
 * @param {Function} func A function.
 * @param {number} wait Wait interval in milliseconds.
 * @return {Function} A new function, debounced.
 */
export function debounce(func, wait) {
  let timer = void 0;
  return function (...args) {
    timer !== undefined && clearTimeout(timer);
    timer = setTimeout(function () {
      func(...args);
    }, wait);
  };
}

/**
 * Throttles a function.
 *
 * @see https://www.sitepoint.com/throttle-scroll-events/
 *
 * @param {Function} func A function.
 * @param {number} wait Wait interval in milliseconds.
 * @return {Function} A new function, throttled.
 */
export function throttle(func, wait) {
  let time = Date.now();
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      func(...args);
      time = Date.now();
    }
  };
}
