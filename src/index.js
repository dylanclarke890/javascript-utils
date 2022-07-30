export { StringBuilder } from "./modules/data-types/StringBuilder";
export {
  isValidDate,
  isValidDateTimeStr,
  utcDate,
} from "./modules/date-time/date";
export {
  now,
  time,
  msToTime,
  secsToTimeString,
} from "./modules/date-time/time";
export { bestZoomForBounds } from "./modules/maps/google-maps";
export {
  clampLatitude,
  wrapLongitude,
  normalizeLatitude,
  normalizeLongitude,
} from "./modules/maps/map-coordinates";
export {
  turnNthBitOff,
  turnNthBitOn,
  toggleNthBit,
  checkNthBitOn,
} from "./modules/maths/bitwise";
export { binaryToDecimal, decimalToBinary } from "./modules/maths/conversions";
export {
  hashArrayOfStrings,
  hashString,
  hashStringSinglePass,
  hashSumOfIntArray,
} from "./modules/maths/hash";
export {
  round,
  sum,
  integerDivision,
  isEven,
  isOdd,
  proportion,
} from "./modules/maths/math";
export {
  randomNumber,
  randomFromRange,
  randomValue,
  shuffleArr,
  randomHSLColor,
} from "./modules/maths/random";
export {
  mean,
  median,
  minAbsDeviationFromValue,
  minAbsDeviationFromExcludedValue,
} from "./modules/maths/statistics";
export { delay, debounce, throttle } from "./modules/misc/callbacks";
export {
  getLuminance,
  intToRGBHexString,
  colorFromString,
} from "./modules/misc/color";
export { xRange } from "./modules/misc/iterators";
export {
  basename,
  getPathExtension,
  pathInfo,
  filenameExtension,
  dirname,
} from "./modules/misc/path";
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
} from "./modules/misc/regex";
export {
  getDigits,
  intSeparateThousands,
  str,
  trim,
  typeToStr,
} from "./modules/misc/strings";
export { uuid, NonCanonicalUUID, uniqueId } from "./modules/misc/uuid";
export { validatePassword } from "./modules/misc/validation";
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
} from "./modules/object-handling/arrays";
export {
  cloneArr,
  cloneDeepJSON,
  cloneObjDeep,
  deepObjectExtend,
  deepObjectCloningExtend,
  extend,
  extendDecorate,
  shallowExtend,
} from "./modules/object-handling/clone";
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
} from "./modules/object-handling/compare";
export { deepFreeze } from "./modules/object-handling/immutability";
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
} from "./modules/object-handling/introspection";
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
} from "./modules/object-handling/nested-properties";
export {
  mapObject,
  arrToObject,
  selectPropertiesWhere,
  prototypeChainProperties,
  prop,
  defineProperty,
  completeObjectAssign,
} from "./modules/object-handling/objects";
export { includes, findIndex } from "./modules/object-handling/weak-equality";
export { rAFLooper, nestedRAF } from "./modules/web/animation";
export {
  copyTextToClipboard,
  fallbackCopyTextToClipboard,
} from "./modules/web/clipboard";
export { getCookie, setCookie, clearCookie } from "./modules/web/cookie";
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
} from "./modules/web/dom";
export { buildFormData, objToformData } from "./modules/web/form-data";
export {
  buildQueryString,
  getRawURIFragment,
  getDecodedURIFragment,
  getDecodedJSONFromFragmentURI,
  getMultiDimQueryStrings,
  parseMultiDimQueryStrings,
  appendEncodedJSONFragmentToURI,
} from "./modules/web/query-strings";
