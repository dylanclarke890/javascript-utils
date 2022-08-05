/**********************************************************************
 *       P R I M I T I V E  T Y P E  C H E C K S
 */

/**
 * Check if a value is a primitive type.
 * @param {*} value the value to check.
 * @return {boolean} True if the given value is a primitive type.
 */
export function isPrimitiveType(value) {
  return new Object(value) !== value;
}

/**
 * Check if a value is a number.
 * @param {*} value the value to check.
 * @return {boolean} True if value is an int.
 */
export function isInt(value) {
  return Number.isInteger(value);
}

/**
 * Check if a string is a number.
 * @param {string} str the value to check.
 * @return {boolean} True if value is a number in str form.
 */
export function isIntString(str) {
  return new RegExp(/^[0-9]+$/).test(str);
}

/**
 * Check if a value is a number, either in int or string form.
 * @param {string | *} value the value to check.
 * @return {boolean} True if val is an int or an int as a string.
 */
export function isIntOrIntString(value) {
  return isInt(value) || isIntString(value);
}

/** 
 * Check if a value is undefined, null, or equal to an empty string.
 * @param {string} [str] the string to check.
 * @return {boolean} True if the given string is undefined, null, or equal to an empty string ("") */
export function isNullOrEmpty(str) {
  return str === undefined || str === null || str === "";
}

/** 
 * Check if a value is undefined, null, or whitespace only.
 * @param {string} [str] the string to check.
 * @return {boolean} True if the given string is undefined, null or whitespace only (" ") */
export function isNullOrWhiteSpace(str) {
  return str === undefined || str === null || str === " ";
}

/**
 * Checks if a string is a valid JSON string.
 * @param {string} str the string to check.
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
 * Checks a boolean using strict equality.
 * @param {boolean} value the boolean to check.
 * @returns {boolean} true if the value is true.
 */
export function isTrue(value) {
  return value === true;
}

/**
 * Check if a value is truthy.
 * @param {boolean} value the value to check. 
 * @return {boolean} True if the val is truthy.
 */
export function isTruthy(value) {
  console.log(!!value);
  return !!value;
}

/**
 * Check if all values in an array evaluate as truthy.
 * @param {Array} values the values to check 
 * @return {boolean} True if every value in the array is truthy.
 */
export function allTruthy(...values) {
  return values.every(val => isTruthy(val));
}

/**
 * Check if a value is undefined.
 * @param {*} [value] the value to check.
 * @return {boolean} True if value is undefined.
 */
export function isUndefined(value) {
  return typeof value === "undefined";
}

/**********************************************************************
 *       R E F E R E N C E  T Y P E  C H E C K S
 */

/**
 * Check if a value is a reference type.
 * @param {*} value the value to check.
 * @return {boolean} True if the given value is a reference type.
 */
export function isReferenceType(value) {
  return new Object(value) === value;
}

/**
 * Check if a value is an object.
 * @param {*} val the value to check.
 * @return {boolean} True if val is an object.
 */
export function isObject(val) {
  return (
    Object.prototype.toString.call(val) === Object.prototype.toString.call({})
  );
}

/**
 * Check if a value is a POJO.
 * @param {*} obj the value to check.
 * @return {boolean} True if obj is a POJO (Plain Old JavaScript Object).
 */
export function isObjectLiteral(obj) {
  return (
    obj !== null && obj !== undefined &&
    obj.constructor === Object &&
    isObject(obj)
  );
}

/**
 * Check if an object is empty.
 * @param {Object} obj the value to check
 * @return {boolean} True if obj is empty (does not have own properties).
 */
export function isObjectEmpty(obj) {
  for (const prop in obj)
    if (Object.prototype.hasOwnProperty.call(obj, prop)) return false;
  return true;
}

/**
 * Check if a value is an array.
 * @param {*} val the value to check.
 * @return {boolean} True if val is an array.
 */
export function isArray(val) {
  return Array.isArray(val);
}

/**
 * Check if a value if a function.
 * @param {*} value the value to check.
 * @return {boolean} True if callable.
 */
export function isCallable(value) {
  return typeof value === "function";
}

/**
 * Safe implementation of `Object.prototype.hasOwnProperty` (with null check).
 * @param {Object} obj the object to check.
 * @param {*} prop the property to checj for.
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
