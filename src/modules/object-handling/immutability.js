/**
 * Deep freezes an object using recursion.
 * @param {Object} obj the object to freeze.
 * @returns {Object} A reference to the frozen object. */
export function deepFreeze(obj) {
  if (typeof obj !== "object") return obj;
  for (let key in obj) {
    const val = obj[key];
    if (typeof val === "object") deepFreeze(val);
  }
  return Object.freeze(obj);
}
