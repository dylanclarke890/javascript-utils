/**
 * @type {Function}
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Function implementing "Object.is" behaviour.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 * @param {*} x The first value to compare.
 * @param {*} y The second value to compare.
 * @return {boolean} A boolean indicating whether or not the two arguments are the same value.
 */
export function is(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
}

/**
 * Checks whether a prop of an object equals in the other object (shallow comparison).
 * @param {Object} objA The first object.
 * @param {Object} objB The second object.
 * @param {string} prop The name of the property.
 * @return {boolean} True if the value of "prop" in "objA" is shallowly equal to the value of "prop" in "objB".
 */
export function objectPropEqual(objA, objB, prop) {
  return hasOwnProperty.call(objB, prop) && is(objA[prop], objB[prop]);
}

/**
 * Performs equality by iterating through keys on an object and returning "false"
 * when any key has values which are not strictly equal between the arguments.
 * Returns "true" when the values of all keys are strictly equal.
 * @see https://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri#answer-37636728
 * @param {*} objA First object.
 * @param {*} objB Second object.
 * @return {boolean}
 */
export function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++) {
    if (!objectPropEqual(objA, objB, keysA[i])) return false;
  }

  return true;
}
