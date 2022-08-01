import AOPProxy from "../AOPProxy";
import { call, set, get } from "../pointcuts/pointcuts";
import escapeStringRegexp from "escape-string-regexp";

/**
 * Builtin function using AOPProxy's API to implement lazy loading for objects.
 * @param {Object} target A target object to lazy load. Lazy loading in this case means
 * deferring an operation on the object when it is used for the very first time by the
 * client code.
 * @param {Object} options The options of the lazy loading.
 * @param {Function} onceCallback The callback to execute only once before performing the very
 * first operation on the given "target" when the given "target" is used for the very first time.
 * This callback is mandatory (otherwise it doesn't make sense to use "lazy()" at all)
 * and allows e.g. to perform a heavy initialization operation lazily on the underlying target
 * object.
 * @param {Object} [options.ignoredTypes] The types which prototypes to ignore when going up
 * the prototype chain in order to identify which prototypes to intercept when lazy loading.
 * By default, only the properties set on the "Object" prototype will be ignored.
 * This option can be used e.g. to avoid the performance of a heavy lazy initialization
 * when calling the methods of a parent class of the given "target" object.
 * @param {boolean} [options.interceptConstructor] Whether or not to intercept the
 * getting/setting of the "constructor" property. Defaults to "false", meaning that
 * when getting/setting "target.constructor", this operation will not trigger the underlying
 * lazy loading.
 * @param {string[]} [options.propertiesToIgnore] Property names or method names to ignore for
 * lazy loading.
 * @param {Array} [options.pointcuts] Array of pointcut shorthands to use for interception and
 * lazy loading. By default, only "call", "get" and "set" pointcuts will be used. Other pointcut
 * shorthands (e.g. "apply", "construct") will be ignored, if passed.
 * @return {Proxy} A new proxy object for the given target which supports this builtin feature.
 */
export default function lazyObject(
  target,
  {
    onceCallback,
    ignoredTypes = [Object],
    interceptConstructor = false,
    propertiesToIgnore = [],
    pointcuts = [call, get, set],
  } = {}
) {
  let hasCall = false,
    hasGet = false,
    hasSet = false;
  const rules = [];
  const propertiesMap = {};
  const constructorsToIgnore = ignoredTypes.map(
    (Type) => Type.prototype.constructor
  );

  let current = target;
  let currentIsProto = false;
  while (current) {
    const constructor = current.constructor;
    if (!currentIsProto || !constructorsToIgnore.includes(constructor)) {
      const properties = Reflect.ownKeys(current);
      properties.map(
        (property) =>
          (propertiesMap[property] = {
            isMethod:
              property !== "constructor" &&
              typeof target[property] === "function",
          })
      );
    }
    current = Object.getPrototypeOf(current);
    currentIsProto = true;
  }
  propertiesToIgnore.map(
    (propertyToIgnore) => delete propertiesMap[propertyToIgnore]
  );
  !interceptConstructor && delete propertiesMap["constructor"];

  pointcuts.map((pointcut) => {
    if (pointcut === call) {
      hasCall = true;
    } else if (pointcut === get) {
      hasGet = true;
    } else if (pointcut === set) {
      hasSet = true;
    }
  });

  const properties = Object.keys(propertiesMap);
  let firstOperation = true;
  const callback = function (...args) {
    if (firstOperation) {
      firstOperation = false;
      onceCallback.apply(this, args);
    }
  };
  const escape = (names) => names.map(escapeStringRegexp);
  const regex = (escapedNames) => new RegExp(`^(${escapedNames.join("|")})$`);
  const addRule = (regex) => (pointcut) =>
    rules.push([regex, pointcut().before(callback)]);
  if (hasCall) {
    const methodNames = properties.filter(
      (property) => propertiesMap[property].isMethod
    );
    const escapedMethodNames = escape(methodNames);
    addRule(regex(escapedMethodNames))(call);
  }
  if (hasGet || hasSet) {
    const propertyNames = properties.filter(
      (property) => !propertiesMap[property].isMethod
    );
    const escapedPropertyNames = escape(propertyNames);
    hasGet && addRule(regex(escapedPropertyNames))(get);
    hasSet && addRule(regex(escapedPropertyNames))(set);
  }

  const proxyTarget = AOPProxy(target, rules);
  return proxyTarget;
}
