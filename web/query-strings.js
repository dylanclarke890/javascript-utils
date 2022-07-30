import { buildFormData } from "./form-data";
import { isJSONString } from "../introspection";

/**
 * Constructs a query string from the given data.
 * This method works with nested objects/arrays.
 * @param {Array|Object} data The object.
 * @return {string} The query string.
 */
export function buildQueryString(data) {
  const formData = {};
  buildFormData(formData, data, true);
  const parts = [];
  for (const prop in formData) parts.push(prop + "=" + formData[prop]);
  return parts.join("&");
}

/**
 * Returns the raw contents of the URI fragment (i.e. everything after the hash ("#") character).
 * @param {string} URIFragment The URI fragment.
 * @return {string} The raw contents of the URI fragment.
 */
export function getRawURIFragment(URIFragment) {
  const fragment = (URIFragment || window.location.hash).replace(/^#/, "");
  return fragment;
}

/**
 * Returns the decoded contents of a URI fragment (i.e. everything after the hash ("#") character).
 * @param {string} URIFragment The URI fragment.
 * @return {string} The contents of the URI fragment, decoded.
 */
export function getDecodedURIFragment(URIFragment) {
  const fragment = decodeURIComponent(getRawURIFragment(URIFragment));
  return fragment;
}

/**
 * Appends an encoded JSON fragment to a URI.
 * @param {string} URI The URI.
 * @param {*} data Data to encode in JSON format.
 */
export function appendEncodedJSONFragmentToURI(URI, data) {
  return URI + "#" + encodeURIComponent(JSON.stringify(data));
}

/**
 * Returns the decoded JSON data stored in the URI fragment.
 * @param {*} defaultData Default data to return if either the URI fragment is missing or
 * the content of the URI fragment is not a valid JSON-encoded string.
 * @return {*} The decoded JSON data or "defaultData".
 */
export function getDecodedJSONFromFragmentURI(defaultData = null) {
  const fragment = window.location.hash;
  if (!isEmpty(fragment)) {
    const decodedFragment = getDecodedURIFragment(fragment);
    if (isJSONString(decodedFragment)) return JSON.parse(decodedFragment);
  }
  return defaultData;
}
/**
 * Parses a multidimensional query string and returns an object with the parsed args.
 * @see https://stackoverflow.com/questions/8648892/convert-url-parameters-to-a-javascript-object#answer-44713056
 * @param {string} str The query string.
 * @param {Object} [array] The base object to use (or a new object if omitted or falsy).
 * @return {Object} The object with the parsed data.
 */
export function parseMultiDimQueryStrings(str, array) {
  if (!str) str = window.location.search.substring(1);
  const strArr = String(str).replace(/^&/, "").replace(/&$/, "").split("&"),
    sal = strArr.length,
    fixStr = function (str) {
      return decodeURIComponent(str.replace(/\+/g, "%20"));
    };
  if (!array) array = {};
  for (let i = 0; i < sal; i++) {
    let tmp = strArr[i].split("=");
    let key = fixStr(tmp[0]);
    let value = tmp.length < 2 ? "" : fixStr(tmp[1]);
    while (key.charAt(0) === " ") key = key.slice(1);
    if (key.indexOf("\x00") > -1) key = key.slice(0, key.indexOf("\x00"));
    if (key && key.charAt(0) !== "[") {
      let keys = [];
      let leftBracketPos = 0;
      for (let j = 0; j < key.length; j++) {
        if (key.charAt(j) === "[" && !leftBracketPos) leftBracketPos = j + 1;
        else if (key.charAt(j) === "]") {
          if (leftBracketPos) {
            if (!keys.length) keys.push(key.slice(0, leftBracketPos - 1));
            keys.push(key.substring(leftBracketPos, j - leftBracketPos));
            leftBracketPos = 0;
            if (key.charAt(j + 1) !== "[") break;
          }
        }
      }
      if (!keys.length) keys = [key];
      for (let j = 0; j < keys[0].length; j++) {
        let chr = keys[0].charAt(j);
        if (chr === " " || chr === "." || chr === "[") {
          keys[0] = keys[0].substring(0, j) + "_" + keys[0].substring(j + 1);
        }
        if (chr === "[") break;
      }
      const obj = array;
      let lastObj;
      for (let j = 0, keysLen = keys.length; j < keysLen; j++) {
        key = keys[j].replace(/^['"]/, "").replace(/['"]$/, "");
        lastObj = obj;
        if ((key !== "" && key !== " ") || j === 0) {
          if (obj[key] === null) obj[key] = {};
          obj = obj[key];
        } else {
          // To insert new dimension
          let ct = -1;
          for (let p in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, p)) {
              if (+p > ct && p.match(/^\d+$/g)) ct = +p;
            }
          }
          key = ct + 1;
        }
      }
      lastObj[key] = value;
    }
  }
  return lastObj;
}
