/** Returns distinct elements from a sequence. */
export function distinct(arr) {
  return [...new Set(arr)];
}

export function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

export function clone(arr) {
  return arr.slice(0);
}

export function isArrayOfNumber(arr) {
  return !arr.some((v) => isNaN(v));
}

export function firstItem(arr) {
  return arr[0];
}

export function lastItem(arr) {
  return arr[arr.length - 1];
}

export function firstNested(arr) {
  let nested;
  for (let val in arr) {
    if (typeof val === "object") nested = val;
    break;
  }
  return nested;
}

// TODO: for large arrays the array could take a while to reverse.
export function firstNested(arr) {
  return firstNested(arr.reverse());
}
