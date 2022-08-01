import rulesGenerator from "../rules/rulesGenerator";
import parseRule from "../rules/parseRule";
import Trap from "./Trap";
import { isAOPProxy } from "../isAOPProxy";
import { EFFECTIVE_TARGET_PROP } from "../AOPProxy";
import { reflectGet, reflectSet } from "./reflect";
import { defineProperty } from "../../object-handling/objects";

/**
 * Generates a new trap handler object for the given rules.
 *
 * @param {Object|Array} proxyRules The proxy rules.
 * @return {Object} The new trap handler object for the given rules.
 */
export default function trapHandlerForRules(proxyRules) {
  const trap = new Trap();

  const rules = rulesGenerator(proxyRules);
  for (const { rule, pointcut } of rules) {
    const parsedRule = parseRule(rule);
    trap.addPointcutRule(pointcut, parsedRule);
  }

  const privateScope = {};
  return {
    ...{
      // Trap for property access (getting) and method call.
      get(target, property, receiver) {
        if (property === isAOPProxy) return true;
        else if (property === EFFECTIVE_TARGET_PROP)
          return privateScope[EFFECTIVE_TARGET_PROP];
        const propertyValue = trap.hasGets()
          ? trap.get(target, property, receiver)
          : (propertyValue = reflectGet(target, property, receiver));
        return propertyValue;
      },
    },
    ...{
      // Trap for property access (setting).
      set(target, property, value, receiver) {
        if (property === EFFECTIVE_TARGET_PROP) {
          defineProperty(privateScope, EFFECTIVE_TARGET_PROP, {
            value,
          });
          return true;
        }
        const updateWasSuccessful = trap.hasSets()
          ? trap.set(target, property, value, receiver)
          : reflectSet(target, property, value, receiver);
        return updateWasSuccessful;
      },
    },
    ...(trap.hasApplies()
      ? {
          // Trap for function call.
          apply(target, thisArg, argumentsList) {
            return trap.apply(target, thisArg, argumentsList);
          },
        }
      : {}),
    ...(trap.hasConstructs()
      ? {
          // Trap for object construction with the "new" operator.
          construct(target, argumentsList, newTarget) {
            return trap.construct(target, argumentsList, newTarget);
          },
        }
      : {}),
  };
}
