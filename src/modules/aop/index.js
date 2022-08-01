import AOPProxy, { EFFECTIVE_TARGET_PROP } from "./AOPProxy";
import applyRule from "./rules/applyRule";
import constructRule from "./rules/constructRule";
import { call, get, set, apply, construct } from "./pointcuts/pointcuts";
import lazyObject from "./builtin/lazyObject";
import throwErrorForUnknownProperty from "./builtin/throwErrorForUnknownProperty";
import POJOPromiser from "./builtin/POJOPromiser";
import arrayWithNegativeIndices from "../object-handling/arrays";

/*
 * Mapping the API properties to the pigretto function.
 */
AOPProxy.pointcuts = {};
[
  ["call", call],
  ["get", get],
  ["set", set],
  ["applyRule", applyRule],
  ["apply", apply],
  ["constructRule", constructRule],
  ["construct", construct],
].map(([prop, val]) => (AOPProxy.pointcuts[prop] = val));

AOPProxy.builtin = {};
[
  ["lazyObject", lazyObject],
  ["throwErrorForUnknownProperty", throwErrorForUnknownProperty],
  ["POJOPromiser", POJOPromiser],
  ["arrayWithNegativeIndices", arrayWithNegativeIndices],
].map(([prop, val]) => (AOPProxy.builtin[prop] = val));

AOPProxy.constants = {};
[["EFFECTIVE_TARGET_PROP", EFFECTIVE_TARGET_PROP]].map(
  ([prop, val]) => (AOPProxy.constants[prop] = val)
);

export default AOPProxy;
export { call, get, set, applyRule, apply, constructRule, construct };
export {
  lazyObject,
  throwErrorForUnknownProperty,
  POJOPromiser,
  arrayWithNegativeIndices,
};
export { EFFECTIVE_TARGET_PROP };
