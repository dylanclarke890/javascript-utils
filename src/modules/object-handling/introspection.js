/**********************************************************************
 *       P R I M I T I V E  T Y P E  C H E C K S
 */

/**
 * @return {boolean} True if the given value is a primitive type.
 */
export function isPrimitiveType(value) {
  return new Object(value) !== value;
}

/**
 * @return {boolean} True if value is an int.
 */
export function isInt(value) {
  return Number.isInteger(value);
}

/**
 * @return {boolean} True if the given string is a number.
 */
export function isIntString(str) {
  return new RegExp(/^[0-9]+$/).test(str);
}

/**
 * @return {boolean} True if val is an int or an int as a string.
 */
export function isIntOrIntString(val) {
  return isInt(val) || isIntString(val);
}

/** @return {boolean} True if the given string is undefined or equal to an empty string ("") */
export function isNullOrEmpty(str) {
  return str === undefined || str === "";
}

/** @return {boolean} True if the given string is undefined or whitespace only (" ") */
export function isNullOrWhiteSpace(str) {
  return str === undefined || str === " ";
}

/**
 * Tests if a string is a valid JSON string.
 * @return {boolean} True if str is a JSON string.
 */
export function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

/**
 * Checks using strict equality.
 */
export function isTrue(value) {
  return value === true;
}

/**
 * @return {boolean} True if the val is truthy.
 */
export function isTruthy(value) {
  return value == true;
}

/**
 * @return {boolean} True if every value in the array is true.
 */
export function allTruthy(...values) {
  return values.every(isTruthy);
}

/**
 * @return {boolean} True if value is undefined.
 */
export function isUndefined(value) {
  return typeof value === "undefined";
}

/**********************************************************************
 *       R E F E R E N C E  T Y P E  C H E C K S
 */

/**
 * @return {boolean} True if the given value is a reference type.
 */
export function isReferenceType(value) {
  return new Object(value) === value;
}

/**
 * @return {boolean} True if val is an object.
 */
export function isObject(val) {
  return (
    Object.prototype.toString.call(val) === Object.prototype.toString.call({})
  );
}

/**
 * Check if a value is a POJO.
 * @return {boolean} True if obj is a POJO (Plain Old JavaScript Object).
 */
export function isObjectLiteral(obj) {
  return (
    obj !== null &&
    typeof obj === "object" &&
    obj.constructor === Object &&
    isObject(obj)
  );
}

/**
 * @return {boolean} True if obj is empty (does not have own properties).
 */
export function isObjectEmpty(obj) {
  for (const prop in obj)
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
  return true;
}

/**
 * @return {boolean} True if val is an array.
 */
export function isArray(val) {
  return (
    Object.prototype.toString.call(val) === Object.prototype.toString.call([])
  );
}

/**
 * @return {boolean} True if callable.
 */
export function isCallable(v) {
  return typeof v === "function";
}

/**
 * Safe implementation of `Object.prototype.hasOwnProperty` (with null check).
 * @returns {boolean} True if the object has the property.
 */
export function safeHasOwnProperty(obj, prop) {
  return obj ? Object.prototype.hasOwnProperty.call(obj, prop) : false;
}

/**
 * Detects whether an object has a cyclic reference or not.
 * @param {Object} obj The object to check.
 * @return {boolean} True if the object has a cyclic reference.
 */
export function hasCyclicReference(obj) {
  const stackSet = [];
  let detected = false;
  function detect(obj) {
    if (detected) return;
    if (typeof obj !== "object") return;
    const indexOfObj = stackSet.indexOf(obj);
    detected = indexOfObj !== -1;
    if (detected) return;
    stackSet.push(obj);
    for (const k in obj)
      if (Object.prototype.hasOwnProperty.call(obj, k)) detect(obj[k]);
    stackSet.splice(indexOfObj, 1);
    return;
  }
  detect(obj);
  return detected;
}
