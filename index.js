export * from "./src/modules/data-types/index";
export * from "./src/modules/date-time/index";
export * from "./src/modules/maps/index";
export * from "./src/modules/maths/index";
export * from "./src/modules/misc/index";
export * from "./src/modules/object-handling/index";
export * from "./src/modules/web/index";

/******************************************************************
 |                  A O P  P R O X Y
*/

import AOPProxy, { EFFECTIVE_TARGET_PROP } from "./src/modules/aop/AOPProxy";
import applyRule from "./src/modules/aop/rules/applyRule";
import constructRule from "./src/modules/aop/rules/constructRule";
import {
  call,
  get,
  set,
  apply,
  construct,
} from "./src/modules/aop/pointcuts/pointcuts";
import lazyObject from "./src/modules/aop/builtins/lazyObject";
import throwErrorForUnknownProperty from "./src/modules/aop/builtins/throwErrorForUnknownProperty";
import POJOPromiser from "./src/modules/aop/builtins/POJOPromiser";
import arrayWithNegativeIndices from "./src/modules/object-handling/arrays";

/*
 * Mapping the API properties to the proxy function.
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

export {
  AOPProxy,
  call,
  get,
  set,
  applyRule,
  apply,
  constructRule,
  construct,
  lazyObject,
  throwErrorForUnknownProperty,
  POJOPromiser,
  arrayWithNegativeIndices,
  EFFECTIVE_TARGET_PROP,
};
