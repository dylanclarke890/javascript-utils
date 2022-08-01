import handlerFactory from "./factory/handlerFactory";
import { isAOPProxy } from "./isAOPProxy";

export const EFFECTIVE_TARGET_PROP = "-FKgGSKjfL00OFSs8fX5S";

/**
 * Generates a new AOP proxy object.
 * An AOP proxy object allows proxying and advising for the following operations:
 * - Calling a method (`call()` method);
 * - Getting a property (`get()` method);
 * - Setting a property (`set()` method);
 * - Calling a function (`[applyRule]` symbol property with `apply()` method);
 * - Constructing a new object via the "new" keyword (`[constructRule]` symbol
 * property with `construct()`).
 * @param {*} target A function, a constructor function or an object to proxy.
 * @param {Object|Array} proxyRules The proxy rules.
 * This parameter can be:
 * - An object containing proxy rules as keys and pointcuts with advices as values;
 * - An array of rules, each rule either being an object with proxy rules as keys
 * and advices as values or a tuple of two elements: an array of rules of the same
 * type or a single rule as the first element and a pointcut with advices for those rules or
 * that rule as the second element;
 * @return {Proxy} A new proxy object for the given target.
 */
export default function AOPProxy(target, proxyRules) {
  const handler = handlerFactory(proxyRules);
  const proxy = new Proxy(target, handler);
  const effectiveTarget = target[isAOPProxy]
    ? target[EFFECTIVE_TARGET_PROP]
    : target;
  proxy[EFFECTIVE_TARGET_PROP] = effectiveTarget;
  return proxy;
}
