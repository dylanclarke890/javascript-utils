import { typeToStr } from "./conversions";
import {
  isPrimitiveType,
  isArray,
  isPlainObject,
  isReferenceType,
  hasCyclicReference,
} from "./compare";
import {
  nestedTreeMapHas,
  nestedTreeMapSet,
  nestedTreeMapGet,
} from "./nested-properties";

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
 * @param {Object} object The object to clone.
 * @return {Object} The clone.
 * @throws {Error} if circular ref detected or type is unable to be determined.
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

/**
 * Deep object extension implementation.
 * Nothing is returned, but the destination object will be modified and merged with the source object
 * so that properties of the source object which are objects will recursively merge with the corresponding
 * destination property while the other properties with all the other types will replace the properties of the
 * destination object.
 * Note: this method should not be used for inheritance via the Prototypal Combination Inheritance pattern.
 * Note: this method doesn't perform a deep object cloning, it just extends the destinationObject by adding
 * properties it doesn't have in a deep way.
 * @param {Object} destinationObject The destination object which will be modified and merged with the
 * source object.
 * @param {Object} sourceObject The source object which will be used to extend the destination object.
 * @param {Object} [extendArrays] True if arrays should also be extended.
 * @return {undefined}
 */
export function deepObjectExtend(
  destinationObject,
  sourceObject,
  extendArrays = true
) {
  for (const property in sourceObject) {
    if (sourceObject[property] && isPlainObject(sourceObject[property])) {
      destinationObject[property] = destinationObject[property] || {};
      deepObjectExtend(
        destinationObject[property],
        sourceObject[property],
        options
      );
    } else if (
      extendArrays &&
      sourceObject[property] &&
      isArray(sourceObject[property])
    ) {
      destinationObject[property] = destinationObject[property] || [];
      deepObjectExtend(
        destinationObject[property],
        sourceObject[property],
        options
      );
    } else destinationObject[property] = sourceObject[property];
  }
}

/**
 * Deep object cloning extension implementation. If the source objects contain a property with a reference type,
 * a clone object of the same type of that property will be created and then merged with the property object
 * of the destination object.
 * @param {Object} destinationObject The destination object which will be modified and merged with the source
 * object.
 * @param {...Object} sourceObject One or more objects which will be used to extend the destination object.
 * @return {undefined}
 */
export function deepObjectCloningExtend(...args) {
  const destinationObject = args[0];
  let sourceObject;
  for (let i = 1; args[i]; i++) {
    sourceObject = args[i];
    for (const property in sourceObject) {
      if (sourceObject[property] && isPlainObject(sourceObject[property])) {
        destinationObject[property] = destinationObject[property] || {};
        deepObjectExtend(
          destinationObject[property],
          cloneObjDeep(sourceObject[property])
        );
      } else {
        destinationObject[property] = sourceObject[property];
      }
    }
  }
}

/**
 * Extends a destination object with the provided source objects.
 * @param {Object} destinationObj The destination object.
 * @param {...Object|Array} sourceObjects The source objects. If the last argument is an array containing one
 * single truthy element, it will be treated as an options parameter and its single first truthy element will
 * be treated as object containing the options for the extension.
 * The currently available options are:
 * - extendsArrays (boolean: false): Whether or not to extend nested arrays too (defaults to false);
 * @return {Object} The destination object "destinationObj" given as parameter after extension.
 */
export function extend(destinationObj, ...sourceObjects) {
  let options = {};
  if (sourceObjects.length) {
    const last = sourceObjects.pop();
    if (isArray(last) && last.length === 1 && isPlainObject(last[0])) {
      options = last[0];
    } else sourceObjects.push(last);
  }
  for (const sourceObject of sourceObjects)
    deepObjectExtend(destinationObj, sourceObject, options);

  return destinationObj;
}

/**
 * Extends a destination object with the provided source objects.
 * @param {Object} destinationObject The destination object.
 * @param {...*} rest The source objects with the last parameter being an array of rules,
 * each rule being a tuple array where the first element is an array of "ORed" property names
 * (strings or numbers) or regexes matching property names for which the corresponding values
 * should be decorated (or a single property name or regex matching a property name if the decoration
 * should only happen on a single property), and where the second element is a callback to execute
 * for each value which is a value of a property of a source object.
 * The callback has the following signature:
 * (value: *, prop: string|number, parent: Object) => *|undefined
 * The callback will receive the final value after extension, its associated property and the parent object
 * where that property is set with that value.
 * Its returned value will be used as the final value of the property for that object in "destinationObject".
 *
 * If the last parameter is not an array of rules, it will be treated as the last source object to use for the extension
 * the "extend" function will be simply called under the hood without any decoration logic).
 * @return {Object} The destination object "destinationObject" given as parameter after extension and, if the callback is given
 *                  as the last parameter, after applying the given callback.
 */
export function extendDecorate(destinationObject, ...rest) {
  const rules = rest[rest.length - 1];
  if (!isArray(rules)) return extend(destinationObject, ...rest);

  rest.pop();
  const sourceObjects = rest;
  const initialRetValue = {};
  const matchedRulesMap = new Map();
  const callbacksMap = new Map();
  const paths = [];
  const mapKeys = (
    destinationObject,
    sourceObject,
    currentStack,
    currentPath
  ) => {
    for (const key in sourceObject)
      currentStack.push({
        destinationObject,
        sourceObject,
        property: key,
        path: [...currentPath, key],
      });
  };
  const matchRule = (rule, property) => {
    if (rule instanceof RegExp && typeof property === "string")
      return property.match(rule);
    return rule === property;
  };
  const matchArrayRule = (arrayRule, property) => {
    for (const rule of arrayRule) if (matchRule(rule, property)) return true;
    return false;
  };
  const ruleMatches = (rule, property) => {
    if (isArray(rule)) return matchArrayRule(rule, property);
    return matchRule(rule, property);
  };
  const matchRules = (property) => {
    if (!matchedRulesMap.has(property)) {
      const callbacks = [];
      for (const [rule, callback] of rules)
        if (ruleMatches(rule, property)) callbacks.push(callback);
      matchedRulesMap.set(property, callbacks);
    }
    return matchedRulesMap.get(property);
  };

  for (const sourceObject of sourceObjects) {
    const currentStack = [];
    const currentPath = [];
    mapKeys(destinationObject, sourceObject, currentStack, currentPath);
    while (currentStack.length) {
      const {
        destinationObject,
        sourceObject,
        property,
        path: currentPath,
      } = currentStack.pop();
      if (sourceObject[property] && isPlainObject(sourceObject[property])) {
        // "sourceObject[property]" is an object of class "Object".
        destinationObject[property] = isPlainObject(destinationObject[property])
          ? destinationObject[property]
          : {};
        mapKeys(
          destinationObject[property],
          sourceObject[property],
          currentStack,
          currentPath
        );
      } else destinationObject[property] = sourceObject[property];
      const callbacks = matchRules(property);
      if (callbacks && callbacks.length) {
        if (!nestedTreeMapHas(callbacksMap, currentPath))
          paths.push([...currentPath]);
        nestedTreeMapSet(
          callbacksMap,
          currentPath,
          callbacks.map((callback) => (retValue) => (path) => {
            const value =
              retValue === initialRetValue
                ? destinationObject[property]
                : retValue;
            return callback(value, property, destinationObject, path);
          })
        );
      }
    }
  }

  // Decorating the final nested values.
  for (let i = paths.length - 1; i >= 0; i--) {
    const path = paths[i];
    const callbacks = nestedTreeMapGet(callbacksMap, path) || [];
    let retValue = initialRetValue;
    for (const callback of callbacks) retValue = callback(retValue)(path);
    if (retValue !== initialRetValue)
      setNestedPropertyValue(destinationObject, path, retValue);
  }

  return destinationObject;
}

/**
 * Shallowly extends a destination object with the provided source objects (first dimension).
 *
 * @param {Object} destinationObject The destination object.
 * @param {...Object} sourceObjects The source objects.
 * @return {Object} The destination object "destinationObject" given as parameter after shallow extension.
 */
export function shallowExtend(destinationObject, ...sourceObjects) {
  sourceObjects.map((obj) =>
    Object.keys(obj).map((key) => (destinationObject[key] = obj[key]))
  );
  return destinationObject;
}
