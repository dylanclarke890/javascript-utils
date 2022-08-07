/**********************************************************************************************
 *                      I P  A N D  W E B  S E R V I C E S
 */
export const ip_prefix =
  "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}";
// allows 0 or 255 as the final octet due to CIDR
export const ip =
  ip_prefix +
  "(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
// must permit numbers as valid host identifiers that are being used in the wild in FQDNs
export const hostname =
  "\\b[A-Za-z0-9](?:[A-Za-z0-9_\\-]{0,61}[a-zA-Z0-9])?\\b";
export const domain = "\\b[a-zA-Z0-9](?:[a-zA-Z0-9\\-]{0,61}[a-zA-Z0-9])?\\b";
export const directoryName = "[/\\w\\s\\\\.:,*()=%?+-]+";
export const filename = directoryName + "[^/]";
export const rwxt = "[r-][w-][x-][r-][w-][x-][r-][w-][xt-]";
export const subnet =
  "\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[1-9][0-9]|[01]?0[1-9]|[12]00|[0-9])\\b";
export const mac =
  "\\b[0-9A-Fa-f]{1,2}[:-](?:[0-9A-Fa-f]{1,2}[:-]){4}[0-9A-Fa-f]{1,2}\\b";
export const process_name = "\\s*[\\w./<>-][\\w\\s./<>-]+";
export const url_path_suffix = "/(?:[\\w.,:/%&?#!=*|\\[\\]~+-]+)?"; // there is an RFC3987 regex but it's gigantic, this is easier to reason about and serves most needs
export const user = "\\b[A-Za-z0-9][A-Za-z0-9\\._-]*[A-Za-z0-9]\\b";
export const column = "\\b[\\w:]+\\b";
export const ldap_dn = "\\b\\w+=[\\w\\s-]+(?:,\\w+=[\\w\\s-]+)*\\b";
export const threshold_range =
  "^(@)?(-?\\d+(?:\\.\\d+)?)(:)(-?\\d+(?:\\.\\d+)?)?$";
export const threshold_simple = "^(-?\\d+(?:\\.\\d+)?)$";
export const label = "\\s*[\\%\\(\\)\\/\\*\\w-][\\%\\(\\)\\/\\*\\w\\s-]*";
export const version = "\\d(\\.\\d+)*";
export const version_lax = version + "-?.*";

/**********************************************************************************************
 *                      F I L T E R  M E T H O D S
 */

export function filterInt(str) {
  let filtered = str.replace(/[^0-9]/g, "");
  filtered = filtered.replace(/^[0]+([1-9])/, "$1");
  filtered = filtered.replace(/^[0]+$/, "0");
  if (str && filtered.length && str[0] === "-") {
    filtered = `-${filtered}`;
  }
  return filtered;
}

export function filterFloat(str) {
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

/**********************************************************************************************
 *                      E S C A P E  R E G E X P  S T R I N G S
 */

/**
 * Escapes special characters for a JS regex. More reliable version of `escapeRegExp(text)`.
 * @param {string} text The string to escape.
 * @return {string} The same string with special regex characters escaped.
 */
export function escapeStringRegexp(string) {
  if (typeof string !== "string") throw new TypeError("Expected a string");
  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}

/**
 * Escapes special characters for a JS regex.
 * @see https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript#answer-9310752
 * @param {string} text The string to escape.
 * @return {string} The same string with special regex characters escaped.
 */
export function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
