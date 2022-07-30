/**
 * Maps an object, executing a function on each of its properties
 * returning a new mapped object.
 * @param {Object} obj The object to map.
 * @param {Function} func The function to use for the mapping.
 * @return {Object} The new mapped object.
 */
export function mapObject(obj, func) {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => [k, func(v, k, i)])
  );
}

/**
 * Maps an array to an object.
 * @param {Array} arr An array.
 * @param {Function} func A function receiving the current value, its index as well as the whole
 * array "arr" as parameters returning a tuple with the key at index 0 and the value at index 1
 * to set on the object.
 * @returns {Object} The array mapped to an object.
 */
export function arrToObject(arr, func) {
  let res;
  return arr.reduce(
    (carry, ...rest) =>
      ((res = func(...rest)) && false) ||
      ((carry[res[0]] = res[1]) && false) ||
      carry,
    {}
  );
}

/**
 * Selects the properties of an object which return true for a
 * supplied callback function.
 * @param {Object} obj The input object.
 * @param {Function} func A function which will receive two parameters:
 * - value: The current value of the input object for a given property;
 * - prop: The name of the current property of the input object.
 * and return true or false based on the
 * @return {Object} An object having only the properties which return true for
 * the callback function.
 */
export function selectPropertiesWhere(obj, func) {
  return Object.keys(obj).reduce((carry, key) => {
    if (func(obj[key], key)) {
      carry[key] = obj[key];
    }
    return carry;
  }, {});
}

/**
 * Returns all the properties of the given object traversing its prototype chain.
 * @param {Object} obj The object.
 * @param {Object} [options] An object with options.
 * @param {?Object} [options.stopAt] The prototype in the chain at which to stop
 * the traversing. Defaults to null, in which case the whole prototype chain will be traversed.
 * @param {boolean} [options.includeStop] Whether or not to include the properties of the given
 * prototype at which to stop. Works only if "stopAtPrototype" is set to a valid prototype object
 * in the prototype chain of "obj". Defaults to true, in which case the properties of the prototype
 * at which to stop will be included in the returned array.
 * @return {string[]} An array of containing the names of the properties.
 */
export function prototypeChainProperties(
  obj,
  { stopAt = null, includeStop = true } = {}
) {
  let current = obj;
  const map = {};
  let isStopPrototype = false;
  let stop = false;
  while (!stop && current && (!isStopPrototype || includeStop)) {
    if (isStopPrototype) stop = true;
    const properties = Object.getOwnPropertyNames(current);
    properties.map((property) => (map[property] = true));
    current = Object.getPrototypeOf(current);
    if (stopAt) isStopPrototype = current === stopAt;
  }
  const properties = Object.keys(map);
  return properties;
}

/**
 * Defines an object's property with a getter and an optional setter.
 *
 * @param {Object} obj An object (may be a prototype).
 * @param {string} propName The property name.
 * @param {Function} getFunc Getter function.
 * @param {Function|undefined} [setFunc] Setter function.
 * @return {undefined}
 */
export function prop(obj, propName, getFunc, setFunc = void 0) {
  const propObj = {};
  propObj[propName] = {
    get: getFunc,
    set: setFunc,
  };
  Object.defineProperties(obj, propObj);
}

/**
 * Defines a property on an object.
 * @param {Object} o An object.
 * @param {string} p The property to define.
 * @param {Object} descriptor Optional object containing the descriptor's properties
 * to use to override the default properties.
 * @return {Object} The object that was passed to the function.
 */
export function defineProperty(o, p, descriptor = {}) {
  return Object.defineProperty(o, p, {
    configurable: false,
    enumerable: false,
    writable: true,
    ...descriptor,
  });
}

/**
 * Assigns the properties of the given source objects to the target object.
 * @source https://stackoverflow.com/questions/39515321/spread-operator-issues-with-property-accessors-getters#answer-39521418
 * @param {Object} target The target object.
 * @param {...Object} sources The source objects.
 * @return {Object} The target object.
 */
export function completeObjectAssign(target, ...sources) {
  sources.forEach((source) => {
    const descriptors = Object.keys(source).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(source, key);
      return descriptors;
    }, {});
    // By default, Object.assign copies enumerable Symbols too.
    Object.getOwnPropertySymbols(source).forEach((sym) => {
      const descriptor = Object.getOwnPropertyDescriptor(source, sym);
      if (descriptor.enumerable) {
        descriptors[sym] = descriptor;
      }
    });
    Object.defineProperties(target, descriptors);
  });
  return target;
}
