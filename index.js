export { StringBuilder } from "./src/modules/data-types/StringBuilder";
export {
  isValidDate,
  isValidDateTimeStr,
  utcDate,
} from "./src/modules/date-time/date";
export {
  now,
  time,
  msToTime,
  secsToTimeString,
} from "./src/modules/date-time/time";
export { bestZoomForBounds } from "./src/modules/maps/google-maps";
export {
  clampLatitude,
  wrapLongitude,
  normalizeLatitude,
  normalizeLongitude,
} from "./src/modules/maps/map-coordinates";
export {
  turnNthBitOff,
  turnNthBitOn,
  toggleNthBit,
  checkNthBitOn,
} from "./src/modules/maths/bitwise";
export {
  binaryToDecimal,
  decimalToBinary,
} from "./src/modules/maths/conversions";
export {
  hashArrayOfStrings,
  hashString,
  hashStringSinglePass,
  hashSumOfIntArray,
} from "./src/modules/maths/hash";
export {
  round,
  sum,
  integerDivision,
  isEven,
  isOdd,
  proportion,
} from "./src/modules/maths/math";
export {
  randomNumber,
  randomFromRange,
  randomValue,
  shuffleArr,
  randomHSLColor,
} from "./src/modules/maths/random";
export {
  mean,
  median,
  minAbsDeviationFromValue,
  minAbsDeviationFromExcludedValue,
} from "./src/modules/maths/statistics";
export { delay, debounce, throttle } from "./src/modules/misc/callbacks";
export {
  getLuminance,
  intToRGBHexString,
  colorFromString,
} from "./src/modules/misc/color";
export { xRange } from "./src/modules/misc/iterators";
export {
  basename,
  getPathExtension,
  pathInfo,
  filenameExtension,
  dirname,
} from "./src/modules/misc/path";
export {
  AWS_access_key,
  AWS_host_ip,
  AWS_secret_key,
  ip_prefix,
  ip,
  hostname,
  domain,
  directoryName,
  filename,
  rwxt,
  subnet,
  mac,
  process_name,
  url_path_suffix,
  user,
  column,
  ldap_dn,
  threshold_range,
  threshold_simple,
  label,
  version,
  version_lax,
  http_url,
  filterInt,
  filterFloat,
  escapeRegExp,
} from "./src/modules/misc/regex";
export {
  getDigits,
  intSeparateThousands,
  str,
  trim,
  typeToStr,
} from "./src/modules/misc/strings";
export { uuid, NonCanonicalUUID, uniqueId } from "./src/modules/misc/uuid";
export { validatePassword } from "./src/modules/misc/validation";
export {
  distinct,
  sumOf,
  isArrayOfNumber,
  firstItem,
  lastItem,
  firstNested,
  lastNested,
  minOf,
  maxOf,
  sortNums,
  removeNulls,
  unshift,
} from "./src/modules/object-handling/arrays";
export {
  cloneArr,
  cloneDeepJSON,
  cloneObjDeep,
  deepObjectExtend,
  deepObjectCloningExtend,
  extend,
  extendDecorate,
  shallowExtend,
} from "./src/modules/object-handling/clone";
export {
  is,
  isObjPropEqual,
  isEqualShallow,
  isArrEqualDeep,
  isObjEqualDeep,
  partialShallowEqual,
  objDiffShallow,
  getGlobalObject,
  mapYield,
} from "./src/modules/object-handling/compare";
export { deepFreeze } from "./src/modules/object-handling/immutability";
export {
  isPrimitiveType,
  isInt,
  isIntString,
  isIntOrIntString,
  isNullOrEmpty,
  isNullOrWhiteSpace,
  isJSONString,
  isTrue,
  isTruthy,
  allTruthy,
  isUndefined,
  isReferenceType,
  isObject,
  isObjectLiteral,
  isObjectEmpty,
  isArray,
  isCallable,
  hasCyclicReference,
} from "./src/modules/object-handling/introspection";
export {
  getNestedPropertyValue,
  setNestedPropertyValue,
  hasNestedPropertyValue,
  nestedMapGet,
  nestedMapHas,
  nestedMapSet,
  nestedTreeMapGet,
  nestedTreeMapHas,
  nestedTreeMapSet,
  nestedObjectConstructValue,
} from "./src/modules/object-handling/nested-properties";
export {
  mapObject,
  arrToObject,
  selectPropertiesWhere,
  prototypeChainProperties,
  prop,
  defineProperty,
  completeObjectAssign,
} from "./src/modules/object-handling/objects";
export {
  includes,
  findIndex,
} from "./src/modules/object-handling/weak-equality";
export { rAFLooper, nestedRAF } from "./src/modules/web/animation";
export {
  copyTextToClipboard,
  fallbackCopyTextToClipboard,
} from "./src/modules/web/clipboard";
export { getCookie, setCookie, clearCookie } from "./src/modules/web/cookie";
export {
  isInViewport,
  isScrolledIntoView,
  hasVerticalScrollbar,
  hasHorizontalScrollbar,
  uniqueElemId,
  getElementComputedStyle,
  elementInnerDimensions,
  isEllipsisActive,
  countTextareaLines,
  isScrollOnBottom,
  getVerticalScrollBarWidth,
  cursorFocus,
  detectWrapped,
  maxNestingLevel,
  getScrollableAncestor,
  scrollToTop,
  downloadFile,
} from "./src/modules/web/dom";
export { buildFormData, objToformData } from "./src/modules/web/form-data";
export {
  buildQueryString,
  getRawURIFragment,
  getDecodedURIFragment,
  getDecodedJSONFromFragmentURI,
  getMultiDimQueryStrings,
  parseMultiDimQueryStrings,
  appendEncodedJSONFragmentToURI,
} from "./src/modules/web/query-strings";

/******************************************************************
 | I M M U T A B L E  L I N K E D  O R D E R E D  L I S T
*/

import {
  ImmutableLinkedOrderedMap,
  ImmutableLinkedOrderedMapMode,
} from "./src/modules/data-types/ILOM/ImmutableLinkedOrderedMap";
import {
  map,
  lazyMap,
  lazyMapFactory,
} from "./src/modules/data-types/ILOM/shortcuts";

[
  ["lazyMap", lazyMap],
  ["map", map],
  ["lazyMapFactory", lazyMapFactory],
].map(([key, value]) => (ImmutableLinkedOrderedMap[key] = value));
export {
  ImmutableLinkedOrderedMap,
  ImmutableLinkedOrderedMapMode,
  lazyMap,
  lazyMapFactory,
};

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
