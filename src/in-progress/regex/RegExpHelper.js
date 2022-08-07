import CTypeError from "../../modules/errors/CTypeError";
import availableRegex from "./available-regex";

/**
 * A simple helper class for creating new regex instances. By default, strings are
 * escaped before being passed to a RegExp constructor. This class also exposes common RegExp
 * utilities, such as testing emails and passwords.
 */
export default class RegExpHelper {
  /**
   * Filter numbers from a string.
   * @param {string} str the string to filter.
   * @returns The modified string.
   */
  static filterInt(str) {
    let filtered = str.replace(/[^0-9]/g, "");
    filtered = filtered.replace(/^[0]+([1-9])/, "$1");
    filtered = filtered.replace(/^[0]+$/, "0");
    if (str && filtered.length && str[0] === "-") {
      filtered = `-${filtered}`;
    }
    return filtered;
  }

  /**
   * Filter decimal numbers from a string.
   * @param {string} str the string to filter.
   * @returns The modified string.
   */
  static filterFloat(str) {
    let filtered = str.replace(/[^0-9.]/g, "");
    const regex = /(\..*)\./g;
    const replace = "$1";
    do {
      filtered = filtered.replace(regex, replace);
    } while (filtered != filtered.replace(regex, replace));
    filtered === "." ? (filtered = "0.") : filtered;
    filtered = filtered.replace(/^[0]+([1-9])/, "$1");
    filtered = filtered.replace(/^[0]+($|\.)/, "0$1");
    if (str && filtered.length && str[0] === "-") filtered = `-${filtered}`;
    return filtered;
  }

  /**
   * Create a new RegEx from a string. Escapes the RegExp string before converting.
   * @param {string} value The value to escape and convert to a RegExp.
   * @param {string} [flags] Optional flags to pass to the RegExp.
   * @returns {RegExp} The new RegExp instance.
   */
  static fromString(value, flags) {
    if (typeof value !== "string") throw new CTypeError("string", value);
    return new RegExp(this.escapeString(value), flags);
  }

  /**
   * Escape a RegExp string. Escapes characters with special meaning either inside
   * or outside character sets. Uses a simple backslash escape when it’s always valid, and a
   * `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter
   * grammar.
   * @param {string} value
   * @returns The escaped string.
   */
  static escapeString(value) {
    if (typeof value !== "string") throw new CTypeError("string", value);
    return value.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  /**
   * Get a new instance of one of the 'built-in' RegExp's this class offers.
   * Common RegExp's include email and password. See `getAvailableRegExp()` for the full list.
   * @param {string} name The name of the RegExp.
   * @param {Object} options Extra options used for configuring the RegExp.
   * @param {string} [options.flags] Optional flags to pass to the new RegExp. If the built-in
   * RegExp does not support additional flags being passed, they will be ignored.
   * @returns {RegExp | null} The new instance, or null if the name was not valid.
   */
  static useCommonRegExp(name, options) {
    options = options || {};
    let regInfo;
    if (name in availableRegex) regInfo = availableRegex[name];
    else return null;
    if (!regInfo.allowChange) return new RegExp(regInfo.source);
    return new RegExp(regInfo.source, options.flags);
  }

  /**
   * Get info on a built-in RegExp.
   * @param {string} name
   * @returns {Object} an object containing name, description, whether flags can be passed when
   * creating a new instance and possible examples for ease of use.
   */
  static getCommonRegExpInfo(name) {
    let regInfo;
    if (name in availableRegex) regInfo = availableRegex[name];
    else return null;
    const { allowChange, description, displayName, examples } = regInfo;
    return {
      displayName,
      description,
      allowChange,
      examples,
    };
  }

  /** Get a list of the currently available built-in RegExp.
   * @returns An array of tuples, with the first value being the property name and the
   * second being the info about the RegExp.
   */
  static getAvailableRegExp() {
    const infoList = [];
    for (let key of availableRegex) infoList.push([key, availableRegex[key]]);
    return infoList;
  }
}
