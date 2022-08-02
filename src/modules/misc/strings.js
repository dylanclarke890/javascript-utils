import { escapeRegExp } from "./regex";

export function getDigits(str) {
  const asArr = [...str];
  const res = [];
  asArr.forEach((v) => {
    if (isNaN(+v)) return;
    res.push(v);
  });
  return res.join("");
}

/**
 * Given an integer, returns a string containing the same integer with additional thousands separators.
 * @param {number} num An integer.
 * @param {string} [sep] The thousands separator to use.
 * @return {string} The same integer with thousands separators.
 */
export function intSeparateThousands(num, sep = ",") {
  return num
    .toString()
    .split("")
    .reverse()
    .map((d, i, a) =>
      (i + 1) % 3 === 0 && i !== a.length - 1 ? `${sep}${d}` : d
    )
    .reverse()
    .join("");
}

/**
 * Casts a value to a string.
 * @return {string} The string representation of the value.
 */
export function str(v) {
  return "" + v;
}

/**
 * Trim characters from the beginning and end of a string.
 *
 * @param {string} str
 * @param {string} characterMask
 * @param {Object} options
 * @param {Object.boolean} options.trimLeft defaults to true if omitted
 * @param {Object.boolean} options.trimRight defaults to true if omitted
 * @return {string} The trimmed string.
 */
export function trim(str, characterMask, options = {}) {
  if (typeof characterMask === "undefined") characterMask = " ";
  characterMask = escapeRegExp(characterMask);
  const shouldTrimLeft =
    typeof options.trimLeft === "undefined" || options.trimLeft;
  const shouldTrimRight =
    typeof options.trimRight === "undefined" || options.trimRight;
  const regexParts = [];
  if (shouldTrimLeft)
    regexParts[regexParts.length] = "^[" + characterMask + "]+";
  if (shouldTrimRight)
    regexParts[regexParts.length] = "[" + characterMask + "]+$";
  const regex = new RegExp(regexParts.join("|"), "gm");
  return str.replace(regex, "");
}

/**
 * Converts a type to its string representation.
 * @param {*} type
 * @return {string} The string representation of `type`.
 */
export function typeToStr(type) {
  return Object.prototype.toString.call(type);
}

/**
 * Pluralizes a word.
 */
export function pluralize(word, count) {
  return count === 1 ? word : `${word}s`;
}

/**
 * Split a string on the first occurrence of a given separator.
 * @param string - The string to split.
 * @param separator - The separator to split on.
 */
export function splitOnFirst(string, separator) {
  if (!(typeof string === "string" && typeof separator === "string"))
    throw new TypeError("Expected the arguments to be of type `string`");
  if (string === "" || separator === "") return [];
  const separatorIndex = string.indexOf(separator);
  if (separatorIndex === -1) return [];
  return [
    string.slice(0, separatorIndex),
    string.slice(separatorIndex + separator.length),
  ];
}
