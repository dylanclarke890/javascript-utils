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

/**
 * Create an enum-like object from a list of values. The enum will be frozen to prevent
 * further modification.
 * @param  {...any} values 
 * @returns The enum.
 */
export function createEnum(...values) {
  const enumObj = {};
  for (let val in values) enumObj[val] = val;
  return deepFreeze(enumObj);
}