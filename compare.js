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
 * @param {string} prop The name of the property.
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
 * @param {*} objA First object.
 * @param {*} objB Second object.
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

  const toString = Object.prototype.toString;
  const arrProtoStr = toString.call([]);
  for (let i = 0; i < arrA.length; i++) {
    if (!(i in arrB)) return false;
    else if (isObjectLiteral(arrA[i])) {
      if (!isObjectLiteral(arrB[i]) || !isObjEqualDeep(arrA[i], arrB[i]))
        return false;
    } else if (arrProtoStr === toString.call(arrA[i]))
      if (
        arrProtoStr !== toString.call(arrB[i]) ||
        !isArrEqualDeep(arrA[i], arrB[i])
      )
        return false;

    if (arrA[i] !== arrB[i]) return false;
  }
  return true;
}

/**
 * Compare two objects deeply.
 * @return {boolean} True if they are equal by value or ref.
 */
export function isObjEqualDeep(objA, objB) {
  const toString = Object.prototype.toString;
  const arrProtoStr = toString.call([]);
  for (const property in objA) {
    if (!objB[property]) return false;
    else if (isObjectLiteral(objA[property])) {
      if (
        !isObjectLiteral(objB[property]) ||
        !isObjEqualDeep(objA[property], objB[property])
      )
        return false;
    } else if (arrProtoStr === toString.call(objA[property])) {
      if (
        arrProtoStr !== toString.call(objB[property]) ||
        !deepArrayCompare(objA[property], objB[property])
      )
        return false;
    } else if (objA[property] !== objB[property]) return false;
  }

  return true;
}

/**
 * Returns a reference to the global object.
 * @return {Window|global} The global object (this function is cross-platform aware).
 */
export function getGlobalObject() {
  return typeof global !== "undefined" ? global : window;
}

/**
 * Yields values of an array mapping the yielded value.
 * @generator
 * @param {Array} items An array of items.
 * @param {*} func The function to call.
 *               The function will receive, in order the nth item,
 *               the index of the item in the array of items and the whole items array
 *               as parameters.
 * @param {*} thisArg Optional this arg of the called function (defaults to undefined).
 * @yields {*} The next yielded mapped item.
 */
export function* mapYield(items, func, thisArg = void 0) {
  items.map();
  const boundFunc = func.bind(thisArg);
  for (let i = 0; i < items.length; i++) yield boundFunc(items[i], i, items);
}
