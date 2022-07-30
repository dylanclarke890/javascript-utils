/**
 * Asynchronously invokes a callback multiple times, each in its own animation frame.
 * @param {number} n The number of times the callback should be invoked.
 * @param {Function} callback The callback to invoke.
 * @return {*} The identifier of the first animation frame or "n" if it is falsy during
 * the outermost call.
 */
export function rAFLooper(n, callback) {
  return (
    n &&
    window.requestAnimationFrame(() => (callback(), rAFLooper(--n, callback)))
  );
}

/**
 * Requests a predefined number of animation frames and executes a callback after.
 * @param {number} count The number of animation frames to request before executing the callback.
 * @param {Function} callback The callback to execute after "count" animation frames have been
 * requested.
 * @return {number} The identifier of the first animation frame.
 */
export function nestedRAF(count, callback) {
  let c = count || 1;
  const innerCallback = () => {
    c--;
    if (!c) {
      callback();
      return;
    }
    window.requestAnimationFrame(innerCallback);
  };
  return window.requestAnimationFrame(innerCallback);
}
