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
 * Checks whether a prop of an object compares equal in the other object (shallow comparison).
 * @param {Object} objA First object.
 * @param {Object} objB Second object.
 * @param {*} prop Property to compare.
 * @return {boolean} True if prop in objA is shallowly equal to prop in objB.
 */
export function isObjPropEqual(objA, objB, prop) {
  return (
    Object.prototype.hasOwnProperty.call(objB, prop) &&
    is(objA[prop], objB[prop])
  );
}

/**
 * @see https://stackoverflow.com/questions/22266826/how-can-i-do-a-shallow-comparison-of-the-properties-of-two-objects-with-javascri#answer-37636728
 * @param {Object} objA First object.
 * @param {Object} objB Second object.
 * @return {boolean} True if the values of all keys are strictly equal.
 */
export function isEqualShallow(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    objA === null ||
    objB === null ||
    typeof objA !== "object" ||
    typeof objB !== "object"
  )
    return false;

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // Test for A's keys different from B.
  for (let i = 0; i < keysA.length; i++)
    if (!isObjPropEqual(objA, objB, keysA[i])) return false;

  return true;
}

/**
 * Compares two arrays deeply.
 * @param {Array} arrA First array.
 * @param {Array} arrB Second array.
 * @return {boolean} True if they are equal.
 */
export function isArrEqualDeep(arrA, arrB) {
  if (arrA.length != arrB.length) return false;
  for (let i = 0; i < arrA.length; i++) {
    const a = arrA[i];
    const b = arrB[i];
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || !isArrEqualDeep(a, b)) return false;
    } else if (typeof a === "object") {
      if (typeof b !== "object" || !isObjEqualDeep(a, b)) return false;
    } else if (!is(a, b)) return false;
  }

  return true;
}

/**
 * Compare two objects deeply.
 * @param {Object} objA First object.
 * @param {Object} objB Second object.
 * @return {boolean} True if they are equal by value or ref.
 */
export function isObjEqualDeep(objA, objB) {
  if (Object.keys(objA).length !== Object.keys(objB).length) return false;
  for (const prop in objA) {
    const a = objA[prop],
      b = objB[prop];
    if (!b) return false;

    if (typeof a === "object") {
      if (!typeof b === "object" || !isObjEqualDeep(a, b)) return false;
    } else if (Array.isArray(a)) {
      if (!Array.isArray(b) || !isArrEqualDeep(a, b)) return false;
    } else if (a !== b) return false;
  }
  return true;
}

/**
 * Tests if a partial object is a subset of another object.
 * @param {Object} obj An object.
 * @param {Object} subset The object to check.
 * @return {boolean} False if subset has a key which is not in obj,
 * or has at least one key which is also in obj but with a different value
 * (weak comparison).
 */
export function partialShallowEqual(obj, subset) {
  return isEqualShallow(
    Object.keys(subset).reduce((carry, key) => {
      carry[key] = obj[key];
      return carry;
    }, {}),
    subset
  );
}

/**
 * If a property is on both objects but each object has a different value for that same property
 * (using weak equality comparison), the returned property will be set on both objects with their
 * respective values.
 * @return {Object} An object containing the shallow difference of the objects.
 */
export function objDiffShallow(objA, objB) {
  const diff = {
    a: {},
    b: {},
  };
  if (isEqualShallow(objA, objB)) return diff;
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  for (let i = 0; i < keysA.length; i++) {
    const prop = keysA[i];
    if (!isObjPropEqual(objA, objB, prop)) {
      diff.a[prop] = objA[prop];
      if (hasOwnProperty.call(objB, prop)) diff.b[prop] = objB[prop];
    }
  }
  for (let i = 0; i < keysB.length; i++) {
    const prop = keysB[i];
    if (!isObjPropEqual(objB, objA, prop)) {
      diff.b[prop] = objB[prop];
      if (hasOwnProperty.call(objA, prop)) diff.a[prop] = objA[prop];
    }
  }
  return diff;
}
