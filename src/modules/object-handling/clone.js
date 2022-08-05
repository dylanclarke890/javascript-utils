import { typeToStr } from "../misc/strings";
import {
  isPrimitiveType,
  isArray,
  isObjectLiteral,
  isReferenceType,
  hasCyclicReference,
} from "./introspection";
import {
  nestedTreeMapHas,
  nestedTreeMapSet,
  nestedTreeMapGet,
} from "./nested-properties";

/** 
 * Shallowly clone an array. If deep cloning is needed, use 'cloneObjDeep'.
 * @param {Array} arr array to clone.
 * @returns {Array} a shallow copy of the array. */
export function cloneArr(arr) {
  return arr.slice(0);
}

/**
 * Clones an object deeply, using either JSON or reflection, depending on whether
 * complex: true is passed in the options.
 * @param {Object} obj The object to clone.
 * @param {Object} [options] Optional extra options.
 * @param {boolean} [options.complex] Flag to say whether the value is a complex object (i.e 
 * a custom data type rather than simple nested objects and arrays). Defaults to false (will
 * use JSON to clone the object. This is usually faster and cheaper.)
 * @return {Object} The cloned object.
 */
export function cloneDeep(obj, options = { complex: false }) {
  if (!(options && options.complex))
    return JSON.parse(JSON.stringify(obj));
  
  const newObject = new obj.constructor();
  const error = (msg, prop, property) => {
    throw new Error(
      msg +
        prop +
        "' (" +
        typeToStr(property) +
        ") in object (" +
        typeToStr(obj) +
        ")"
    );
  };
  for (const prop in obj) {
    // If the property is defined on the prototype, ignore it.
    // We don't want to assign it for each clone instance.
    if (!Object.prototype.hasOwnProperty.call(obj, prop)) continue;
    const property = obj[prop];
    if (isPrimitiveType(property)) newObject[prop] = property;
    else if (isReferenceType(property)) {
      if (hasCyclicReference(property))
        error("Circular reference detected '", prop, property);
      else {
        const clone = cloneDeep(property);
        newObject[prop] = clone;
      }
    } else error("Unknown type for property '", prop, property);
  }
  return newObject;
}

/**
 * Extends a destination object with the provided source objects.
 * @param {Object} destinationObj The destination object.
 * @param {...Object|Array} sourceObjects The source objects. If the last argument is an array
 * containing one single truthy element, it will be treated as an options parameter and its
 * single first truthy element will be treated as object containing the options for the extension.
 * The currently available options are:
 * - extendsArrays (boolean: false): Whether or not to extend nested arrays too (defaults to
 * false)
 * @return {Object} The destination object "destinationObj" given as parameter after extension.
 */
 export function extend(destinationObj, ...sourceObjects) {
  let options = {};
  if (sourceObjects.length) {
    const last = sourceObjects.pop();
    if (isArray(last) && last.length === 1 && isObjectLiteral(last[0])) {
      options = last[0];
    } else sourceObjects.push(last);
  }
  for (const sourceObject of sourceObjects)
    deepObjectExtend(destinationObj, sourceObject, options);

  return destinationObj;
}

/**
 * Shallowly extends a destination object with the provided source objects (first dimension).
 * @param {Object} obj The destination object.
 * @param {...Object} args The source objects.
 * @return {Object} The destination object "destinationObject" given as parameter after shallow
 * extension.
 */
 export function extendShallow(obj, ...args) {
  args.map((o) =>
    Object.keys(o).map((k) => (obj[k] = o[k]))
  );
  return obj;
}

/**
 * Deep object extension implementation.
 * Nothing is returned, but the destination object will be modified and merged with the source
 * object so that properties of the source object which are objects will recursively merge with
 * the corresponding destination property while the other properties with all the other types
 * will replace the properties of the destination object. Note: this method should not be used
 * for inheritance via the Prototypal Combination Inheritance pattern. Note: this method doesn't
 * perform a deep object cloning, it just extends the destinationObject by adding properties it
 * doesn't have in a deep way.
 * @param {Object} obj The destination object which will be modified and merged
 * with the source object.
 * @param {Object} fromObj The source object which will be used to extend the destination
 * object.
 * @param {Object} [extendArr] True if arrays should also be extended.
 * @return {undefined}
 */
export function deepObjectExtend(obj, fromObj, extendArr = true) {
  for (const prop in fromObj) {
    if (fromObj[prop] && isObjectLiteral(fromObj[prop])) {
      obj[prop] = obj[prop] || {};
      deepObjectExtend(obj[prop], fromObj[prop], extendArr);
    } else if (extendArr && fromObj[prop] && isArray(fromObj[prop])) {
      obj[prop] = obj[prop] || [];
      deepObjectExtend(obj[prop], fromObj[prop], extendArr);
    } else obj[prop] = fromObj[prop];
  }
}

/**
 * Deep object cloning extension implementation. If the source objects contain a property with
 * a reference type, a clone object of the same type of that property will be created and then
 * merged with the property object of the destination object.
 * @param {Object} obj The destination object which will be modified and merged
 * with the source object.
 * @param {...Object} args One or more objects which will be used to extend the 
 * destination object.
 * @return {undefined}
 */
export function deepObjectCloningExtend(obj, ...args) {
  for (let i = 0; i < args.length; i++) {
  const source = args[i];
    for (const prop in source) {
      if (source[prop] && isObjectLiteral(source[prop])) {
        obj[prop] = obj[prop] || {};
        deepObjectExtend(obj[prop], cloneDeep(source[prop]));
      } else obj[prop] = source[prop];
    }
  }
}

/**
 * Extends a destination object with the provided source objects.
 * @param {Object} obj The destination object.
 * @param {...*} args The source objects with the last parameter being an array of rules,
 * each rule being a tuple array where the first element is an array of "ORed" property names
 * (strings or numbers) or regexes matching property names for which the corresponding values
 * should be decorated (or a single property name or regex matching a property name if the
 * decoration should only happen on a single property), and where the second element is a
 * callback to execute for each value which is a value of a property of a source object.
 * The callback has the following signature:
 * (value: *, prop: string|number, parent: Object) => *|undefined
 * The callback will receive the final value after extension, its associated property and 
 * the parent object where that property is set with that value.
 * Its returned value will be used as the final value of the property for that object in 
 * "destinationObject". If the last parameter is not an array of rules, it will be treated as 
 * the last source object to use for the extension the "extend" function will be simply called 
 * under the hood without any decoration logic).
 * @return {Object} The destination object "destinationObject" given as parameter after extension
 * and, if the callback is given as the last parameter, after applying the given callback.
 */
export function extendDecorate(obj, ...args) {
  const rules = args[args.length - 1];
  if (!isArray(rules)) return extend(obj, ...args);

  args.pop();
  const sourceObjects = args;
  const initialRetValue = {};
  const matchedRulesMap = new Map();
  const callbacksMap = new Map();
  const paths = [];
  const mapKeys = (obj, sourceObj, currStack, currPath) => {
    for (const key in sourceObj)
      currStack.push({
        obj,
        sourceObj,
        prop: key,
        path: [...currPath, key],
      });
  };
  const matchRule = (rule, prop) => {
    if (rule instanceof RegExp && typeof prop === "string")
      return prop.match(rule);
    return rule === prop;
  };
  const matchArrayRule = (arrayRule, prop) => {
    for (const rule of arrayRule) if (matchRule(rule, prop)) return true;
    return false;
  };
  const ruleMatches = (rule, prop) => {
    if (isArray(rule)) return matchArrayRule(rule, prop);
    return matchRule(rule, prop);
  };
  const matchRules = (prop) => {
    if (!matchedRulesMap.has(prop)) {
      const callbacks = [];
      for (const [rule, callback] of rules)
        if (ruleMatches(rule, prop)) callbacks.push(callback);
      matchedRulesMap.set(prop, callbacks);
    }
    return matchedRulesMap.get(prop);
  };

  for (const sourceObject of sourceObjects) {
    const currStack = [];
    const currentPath = [];
    mapKeys(obj, sourceObject, currStack, currentPath);
    while (currStack.length) {
      const { obj, sourceObj, prop, currPath } = currStack.pop();
      if (sourceObj[prop] && isObjectLiteral(sourceObj[prop])) {
        obj[prop] = isObjectLiteral(obj[prop]) ? obj[prop] : {};
        mapKeys(obj[prop], sourceObj[prop], currStack, currPath);
      } else obj[prop] = sourceObj[prop];
      const callbacks = matchRules(prop);
      if (callbacks && callbacks.length) {
        if (!nestedTreeMapHas(callbacksMap, currPath))
          paths.push([...currPath]);
        nestedTreeMapSet(
          callbacksMap,
          currPath,
          callbacks.map((callback) => (retValue) => (path) => {
            const value =
              retValue === initialRetValue
                ? obj[prop]
                : retValue;
            return callback(value, prop, obj, path);
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
      setNestedPropertyValue(obj, path, retValue);
  }
  return obj;
}

const regExpFlagMap = {
  global: "g",
  ignoreCase: "i",
  multiline: "m",
  dotAll: "s",
  sticky: "y",
  unicode: "u",
};

/**
 * Clone a RegExp.
 * @param {RegExp} regexp 
 * @param {Object} options Optionally modify the cloned RegExp instance.
    Properties: source, global, ignoreCase, multiline, dotAll, sticky, unicode, lastIndex
 * @returns The cloned instance, configured with any passed options.
 */
export function cloneRegExp(regexp, options = {}) {
  if (!regexp instanceof RegExp) {
    throw new TypeError("Expected a RegExp instance");
  }
  const flags = Object.keys(regExpFlagMap)
    .map((flag) =>
      (typeof options[flag] === "boolean" ? options[flag] : regexp[flag])
        ? regExpFlagMap[flag]
        : ""
    )
    .join("");
  const clonedRegexp = new RegExp(options.source || regexp.source, flags);
  clonedRegexp.lastIndex =
    typeof options.lastIndex === "number"
      ? options.lastIndex
      : regexp.lastIndex;
  return clonedRegexp;
}
