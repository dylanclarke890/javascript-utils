import { typeToStr } from "./conversions";
import { isPrimitiveType } from "./compare";

/** @returns a shallow copy of the array. */
export function cloneArr(arr) {
  return arr.slice(0);
}

/**
 * Clones an object deeply using JSON. This is fine for simple objects and arrays,
 * but should use a more complex implementation for custom data types.
 * @param {Object} obj The object to clone.
 * @return {Object} The cloned object.
 */
export function cloneDeepJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Clones an object deeply and returns the clone.
 *
 * @param {Object} object The object to clone.
 * @return {Object} The clone.
 * @throws {Error} If a circular reference if even only one property is of an unkown type
 *                 (this should never happen) or a circular reference is detected.
 */
export function cloneObjDeep(object) {
  const newObject = new object.constructor();
  const error = (msg, prop, property) => {
    throw new Error(
      msg +
        prop +
        "' (" +
        typeToStr(property) +
        ") in object (" +
        typeToStr(object) +
        ")"
    );
  };
  for (const prop in object) {
    // If the property is defined on the prototype, ignore it.
    // We don't want to assign it for each clone instance.
    if (!Object.prototype.hasOwnProperty.call(object, prop)) continue;

    const property = object[prop];
    if (isPrimitiveType(property)) newObject[prop] = property;
    else if (isReferenceType(property)) {
      if (hasCyclicReference(property))
        error("Circular reference detected '", prop, property);
      else {
        const clone = cloneObjDeep(property);
        newObject[prop] = clone;
      }
    } else error("Unknown type for property '", prop, property);
  }
  return newObject;
}
