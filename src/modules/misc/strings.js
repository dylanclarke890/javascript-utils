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
 * Trim characters from the end of a string.
 * @param {string} str The string.
 * @param {string} characterMask Character mask.
 * @return {string} The trimmed string.
 */
export function trimEnd(str, characterMask) {
  return trim(str, characterMask, {
    shouldTrimLeft: false,
    shouldTrimRight: true,
  });
}

/**
 * Trim characters from the start of a string.
 * @param {string} str The string.
 * @param {string} characterMask Character mask.
 * @return {string} The trimmed string.
 */
export function trimStart(str, characterMask) {
  return trim(str, characterMask, {
    shouldTrimLeft: true,
    shouldTrimRight: false,
  });
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

function transformQuotes(input, toSingleQuotes) {
  let result = "";
  let isBetweenQuotes = false;
  let quoteCharacter;
  let changeTo = "";
  let toChange = "";

  if (toSingleQuotes) {
    changeTo = "'";
    toChange = '"';
  } else {
    changeTo = '"';
    toChange = "'";
  }

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const next = input[i + 1];
    // Found double-quote or single-quote
    if (current === '"' || current === "'") {
      // If not processing in between quotes
      if (!isBetweenQuotes) {
        quoteCharacter = current;
        isBetweenQuotes = true;
        result += changeTo;
      } else if (quoteCharacter === current) {
        // If processing between quotes, close quotes
        result += changeTo;
        isBetweenQuotes = false;
      } else result += "\\" + changeTo; // Still inside quotes
    } else if (current === "\\" && (next === "'" || next === '"')) {
      // If escape character is found and double or single quote after
      // Escape + quote to change to
      if (next === changeTo) {
        // If in between quotes and quote is equal to changeTo only escape once
        result +=
          isBetweenQuotes && quoteCharacter === changeTo
            ? "\\" + changeTo
            : "\\\\" + changeTo;
        i++;
      } else if (next === toChange) {
        // Escape + quote to be changed
        // If between quotes can mantain tochange
        result += isBetweenQuotes ? toChange : changeTo;
        i++;
      } else result += current;
    } else if (current === "\\" && next === "\\") {
      // Don't touch backslashes
      result += "\\\\";
      i++;
    } else result += current;
  }
  return result;
}

/**
 * Convert matching double-quotes to single-quotes: I "love" unicorns → I 'love' unicorns.
 */
export function toSingleQuotes(string) {
  return transformQuotes(string, true);
}

/**
 * Convert matching single-quotes to double-quotes: I 'love' unicorns → I "love" unicorns.
 */
export function toDoubleQuotes(string) {
  return transformQuotes(string, false);
}
