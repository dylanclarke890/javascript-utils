export const delay = (function () {
  let timer = 0;
  return function (callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(function () {
      callback();
    }, ms);
  };
})();

export function debounce(fn, wait) {
  let timer = void 0;
  return function (...args) {
    timer !== undefined && clearTimeout(timer);
    timer = setTimeout(function () {
      fn(...args);
    }, wait);
  };
}

export function throttle(fn, wait) {
  let time = Date.now();
  return function (...args) {
    if (time + wait - Date.now() < 0) {
      fn(...args);
      time = Date.now();
    }
  };
}
