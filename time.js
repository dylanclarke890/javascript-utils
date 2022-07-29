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
 * (if the second parameter is an object with `includeHours` set to a truthy value),
 * e.g. `123` becomes `"02:03"`, or `"00:02:03"` if `includeHours` is truthy.
 * @param {number} secs The number of seconds.
 * @param {boolean} includeHours Optional.
 * @return {string} The time string.
 */
export const secondsToTimeString = (secs, includeHours = false) => {
  if (!secs || !new RegExp(/^[0-9]+$/).test(secs)) {
    return includeHours ? "00:00:00" : "00:00";
  }
  let hours = "";
  let minutes = integerDivision(secs, 60);
  if (includeHours) {
    hours = `${(integerDivision(secs, 60 * 60) + "").padStart(2, "0")}:`;
    minutes = minutes % 60;
  }
  minutes += "";
  const seconds = (secs % 60) + "";
  return `${hours}${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
};
