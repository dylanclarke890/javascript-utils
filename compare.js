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
 * @type {Function}
 */
const hasOwnProp = Object.prototype.hasOwnProperty;

/**
 * Tests if an object is empty.
 * @param {Object} obj The object to test.
 * @return {boolean} "true" if the given object is empty (does not have own properties),
 * "false" otherwise. */
export function isObjectEmpty(obj) {
  for (const prop in obj) if (hasOwnProp.call(obj, prop)) return false;
  return true;
}

/**
 * Tests if a value is an object.
 * @param {*} obj The value to test.
 * @return {boolean} "true" if "obj" is indeed an object, "false" otherwise.
 */
export function isObject(obj) {
  return (
    Object.prototype.toString.call(obj) === Object.prototype.toString.call({})
  );
}

/**
 * Tests if a value is a plain object (i.e. "{}", an object literal).
 * @param {*} obj The value to test.
 * @return {boolean} "true" if "obj" is a plain object, "false" otherwise.
 */
export function isPlainObject(obj) {
  return (
    obj !== null &&
    typeof obj === "object" &&
    obj.constructor === Object &&
    isObject(obj)
  );
}

/**
 * Checks whether a prop of an object equals in the other object (shallow comparison).
 * @param {Object} objA The first object.
 * @param {Object} objB The second object.
 * @param {string} prop The name of the property.
 * @return {boolean} True if the value of "prop" in "objA" is shallowly equal to the value of "prop" in "objB".
 */
export function objectPropEqual(objA, objB, prop) {
  return hasOwnProp.call(objB, prop) && is(objA[prop], objB[prop]);
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
    typeof objB !== "object" ||
    objA === null ||
    objB === null
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++)
    if (!objectPropEqual(objA, objB, keysA[i])) return false;

  return true;
}

/**
 * Tests to see whether something is an array or not.
 * @param {*} val A variable to check whether it is an array or not.
 * @return {boolean} True if the parameter passed in is an array, false otherwise.
 */
export function isArray(val) {
  return (
    Object.prototype.toString.call(val) === Object.prototype.toString.call([])
  );
}

/**
 * Tests if the given value is callable.
 * @param {*} v The value.
 * @return {boolean} True if callable, false otherwise.
 */
export function isCallable(v) {
  return typeof v === "function";
}

/** Checks if the given string is undefined or equal to an empty string ("") */
export function isNullOrEmpty(str) {
  return str === undefined || str === "";
}

/** Checks if the given string is undefined or whitespace only (" ") */
export function isNullOrWhiteSpace(str) {
  return str === undefined || str === " ";
}

/**
 * Returns a reference to the global object.
 * @return {Window|global} The global object (this function is cross-platform aware).
 */
export function getGlobalObject() {
  return typeof global !== "undefined" ? global : window;
}

