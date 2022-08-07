export { StringBuilder } from "./modules/data-types/StringBuilder";
export { DeferredPromise } from "./modules/data-types/DeferredPromise";
export { LinkedQueue } from "./modules/data-types/LinkedQueue";
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
  parseMilliseconds,
  prettifyMilliseconds,
  objToMilliseconds,
  timeZone,
} from "./modules/date-time/time";
export { isSamePosition, makePositionObj } from "./modules/maps/geolocation";
export { bestZoomForBounds } from "./modules/maps/google-maps";
export {
  wrapLongitude,
  clampLatitude,
  normalizeLatitude,
  normalizeLongitude,
} from "./modules/maps/map-coordinates";
export {
  turnNthBitOn,
  turnNthBitOff,
  checkNthBitOn,
  toggleNthBit,
} from "./modules/maths/bitwise";
export {
  binaryToDecimal,
  convertBytes,
  decimalToBinary,
  toLocaleString,
} from "./modules/maths/conversions";
export {
  hashString,
  hashArrayOfStrings,
  hashStringSinglePass,
  hashSumOfIntArray,
} from "./modules/maths/hash";
export {
  round,
  sum,
  proportion,
  integerDivision,
  isEven,
  isOdd,
} from "./modules/maths/math";
export {
  randomNumber,
  randomFromRange,
  randomValue,
  shuffleArr,
  randomHSLColor,
  uniqueRandom,
  uniqueRandomFromArr,
} from "./modules/maths/random";
export {
  mean,
  median,
  minDeviationFrom,
  minDeviationFromExcluding,
} from "./modules/maths/statistics";
export { throttle, debounce, delay } from "./modules/misc/callbacks";
export {
  getLuminance,
  intToHex,
  colorFromString,
  hexToRgb,
  rgbToHex,
} from "./modules/misc/color";
export { curry, pick, noActionFunc, chain } from "./modules/misc/functional";
export { getGlobalObject } from "./modules/misc/global";
export { generateRange, mapYield } from "./modules/misc/iterators";
export {
  basename,
  dirname,
  pathInfo,
  getPathExtension,
  filenameExtension,
} from "./modules/misc/path";
export {
  trim,
  trimEnd,
  trimStart,
  getDigits,
  intSeparateThousands,
  str,
  typeToStr,
  pluralize,
  splitOnFirst,
  toDoubleQuotes,
  toSingleQuotes,
} from "./modules/misc/strings";
export { uuid, NonCanonicalUUID } from "./modules/misc/uuid";
export { validatePassword } from "./modules/misc/validation";
export {
  distinct,
  sumOf,
  sortNums,
  isArrayOfNumber,
  lastItem,
  firstItem,
  firstNested,
  lastNested,
  minOf,
  maxOf,
  removeNulls,
  unshift,
  indexWrappedArray,
  arrayMoveImmutable,
  arrayMoveMutable,
} from "./modules/object-handling/arrays";
export {
  cloneArr,
  cloneDeep,
  cloneRegExp,
  deepObjectCloningExtend,
  deepObjectExtend,
  extend,
  extendDecorate,
  extendShallow,
} from "./modules/object-handling/clone";
export {
  is,
  isObjPropEqual,
  isObjEqualDeep,
  isArrEqualDeep,
  isEqualShallow,
  partialShallowEqual,
  objDiffShallow,
} from "./modules/object-handling/compare";
import declarativeFactory from "./modules/object-handling/declarative-factory";
export { declarativeFactory };
export { deepFreeze, createEnum } from "./modules/object-handling/immutability";
export {
  isPrimitiveType,
  isInt,
  isIntString,
  isIntOrIntString,
  isNullOrEmpty,
  isNullOrWhiteSpace,
  isArray,
  isObject,
  isObjectEmpty,
  isJSONString,
  isCallable,
  isReferenceType,
  isTrue,
  isObjectLiteral,
  isTruthy,
  isUndefined,
  allTruthy,
  safeHasOwnProperty,
  hasCyclicReference,
} from "./modules/object-handling/introspection";
export {
  nestedMapGet,
  nestedMapHas,
  nestedMapSet,
  getNestedPropertyValue,
  hasNestedPropertyValue,
  setNestedPropertyValue,
  nestedTreeMapGet,
  nestedTreeMapHas,
  nestedTreeMapSet,
  nestedObjectConstructValue,
} from "./modules/object-handling/nested-properties";
export {
  mapObject,
  arrToObject,
  selectWhere,
  getPrototypes,
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
  isScrollOnBottom,
  isApiSupported,
  isClient,
  isEllipsisActive,
  isScrolledIntoView,
  hasHorizontalScrollbar,
  hasVerticalScrollbar,
  uniqueElemId,
  getElementComputedStyle,
  elementInnerDimensions,
  countTextareaLines,
  getScrollableAncestor,
  getVerticalScrollBarWidth,
  cursorFocus,
  detectWrapped,
  maxNestingLevel,
  scrollToTop,
  downloadFile,
} from "./modules/web/dom";
export { buildFormData, objToFormData } from "./modules/web/form-data";
export { newXHR, checkNetwork, waitForNetwork } from "./modules/web/network";
export {
  buildQueryString,
  getMultiDimQueryStrings,
  parseMultiDimQueryStrings,
  getDecodedJSONFromFragmentURI,
  getDecodedURIFragment,
  getRawURIFragment,
  appendEncodedJSONFragmentToURI,
} from "./modules/web/query-strings";
export {
  getDirection,
  getPointerCoordinates,
  getHorizontalDirection,
  getVerticalDirection,
} from "./modules/web/swipe";
