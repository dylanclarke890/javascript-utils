import { integerDivision } from "./math";

/**
 * Returns the current Unix time in milliseconds.
 * @return {number} Current Unix time in milliseconds.
 */
export function now() {
  return Date.now() || new Date().getTime();
}

/**
 * Returns the current Unix time in seconds.
 * @return {number} Current Unix time in seconds.
 */
export function time() {
  const seconds = Math.round(now() / 1000);
  return seconds;
}

/**
 * Returns the time string approximated to the nearest microsecond
 * corresponding the given Unix timestamp in milliseconds
 * in the format "HH:mm:ss.ms".
 * @param {number} [ms] The time in microseconds to convert into a string.
 * If omitted, the current time will be used.
 * @return {string} The time string.
 */
export function msToTime(ms) {
  const date = new Date(ms || new Date().getTime());
  const isoDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  return isoDate.slice(11, -1);
}

/**
 * Converts seconds to a `minutes:seconds` or `hours:minutes:seconds` time string
 * (if `includeHours` is true).
 * @example secsToTimeString(123) => "02:03".
 * @example secsToTimeString(123, includeHrs = true) => "00:02:03".
 * @param {number} secs The number of seconds.
 * @param {boolean} includeHrs Optional.
 * @return {string} The time string.
 */
export function secsToTimeString(secs, includeHrs = false) {
  if (!secs || !new RegExp(/^[0-9]+$/).test(secs)) {
    return includeHrs ? "00:00:00" : "00:00";
  }

  let hours = "";
  let minutes = integerDivision(secs, 60);
  if (includeHrs) {
    hours = `${(integerDivision(secs, 60 * 60) + "").padStart(2, "0")}:`;
    minutes = minutes % 60;
  }
  minutes = `${minutes}`.padStart(2, "0");
  const seconds = `${secs % 60}`.padStart(2, "0");

  return `${hours}${minutes}:${seconds}`;
}
