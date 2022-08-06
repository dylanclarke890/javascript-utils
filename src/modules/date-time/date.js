import { trim } from "../misc/strings";

/**
 * Check if a value is date.
 * @param {*} value The value to test.
 * @return {boolean} True if it is a valid date.
 */
export function isValidDate(value) {
  return (
    Object.prototype.toString.call(value) === "[object Date]" &&
    !isNaN(value.getTime())
  );
}

/**
 * Check if a value is a valid datetime string (e.g. in ISO "YYYY-MM-DD HH:ii:ss" format).
 * @param {string} str The string.
 * @return {boolean} True if it is a valid datetime string.
 */
export function isValidDateTimeStr(str) {
  return isValidDate(new Date(str));
}

/**
 * Returns a UTC datetime in ISO `YYYY-MM-DD HH:ii:ss` format.
 * @param {Object} [options] An optional object of options.
 * @param {boolean} [options.Y] True to return the year. Default: true.
 * @param {boolean} [options.m] True to return the month. Default: true.
 * @param {boolean} [options.d] True to return the day. Default: true.
 * @param {boolean} [options.H] True to return the hours. Default: true.
 * @param {boolean} [options.i] True to return the minutes. Default: true.
 * @param {boolean} [options.s] True to return the seconds. Default: true.
 * @param {Date|string} [options.date] The date to format. Default: the current date.
 * @return {string} The UTC datetime in ISO `YYYY-MM-DD HH:ii:ss` format.
 */
export function utcDate({
  Y = true,
  m = true,
  d = true,
  H = true,
  i = true,
  s = true,
  date = null,
} = []) {
  const finalDate = date ? new Date(date) : new Date();
  const year = finalDate.getUTCFullYear();
  const month = (finalDate.getUTCMonth() + 1 + "").padStart(2, "0");
  const day = (finalDate.getUTCDate() + "").padStart(2, "0");
  const hours = (finalDate.getUTCHours() + "").padStart(2, "0");
  const minutes = (finalDate.getUTCMinutes() + "").padStart(2, "0");
  const seconds = (finalDate.getUTCSeconds() + "").padStart(2, "0");

  const UTCDate = trim(
    trim(
      `${Y ? year : ""}-${m && (Y || d || (!Y && !d)) ? month : ""}-${
        d ? day : ""
      }`,
      " -"
    ) +
      " " +
      trim(
        `${H ? hours : ""}:${i && (H || s || (!H && !s)) ? minutes : ""}:${
          s ? seconds : ""
        }`,
        " :"
      ),
    " "
  );

  let finalUTCDate = UTCDate.replace("--", "-").replace("::", ":");
  return finalUTCDate;
}
