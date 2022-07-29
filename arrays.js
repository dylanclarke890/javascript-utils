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
export function lastNested(arr) {
  return firstNested(arr.reverse());
}

export function minOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMin, val) => (currentMin < val ? currentMin : val),
    +Infinity
  );
}

export function maxOf(arr) {
  if (!arr.length) return void 0;
  return arr.reduce(
    (currentMax, val) => (currentMax > val ? currentMax : val),
    -Infinity
  );
}

export function sortNums(arrayOfNums, desc = false) {
  return [...arrayOfNums].sort((a, b) => (desc ? b - a : a - b));
}

export function removeNulls(arr) {
  const returnArr = [];
  arr.forEach((val) => {
    if (val !== null) returnArr.push(arr);
  });
  return returnArr;
}
