import CTypeError from "../errors/CTypeError";
import availableRegex from "./available-regex";

/**
 * A simple helper class for creating new regex instances. By default, strings are
 * escaped before being passed to a RegExp constructor. This class also exposes common RegExp
 * utilities, such as testing emails and passwords.
 */
export default class RegExpHelper {
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
   * @param {boolean} [options.exact] If true, will apply the 'i' flag to the RegExp. Overrides
   * the 'flags' property if provided.
   * @param {string} [options.flags] Optional flags to pass to the new RegExp. If no flags
   * provided, supplies 'gi'.
   * @returns {RegExp | null} The new instance, or null if the name was not valid.
   */
  static useCommonRegExp(name, options) {
    options = options || {};
    let regStr;
    if (name in availableRegex) regStr = availableRegex[name];
    if (!regStr) return null;
    return new RegExp(regStr, options.exact ? "i" : options.flags || "gi");
  }

  static getAvailableRegExp() {
    return availableRegex.keys();
  }
}
