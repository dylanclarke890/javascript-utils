/** Returns distinct elements from a sequence. */
export function distinct(arr) {
  return [...new Set(arr)];
}

export function sumOf(arr) {
  return arr.reduce((a, b) => a + b, 0);
}
