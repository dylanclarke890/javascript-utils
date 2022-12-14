import { integerDivision } from "../maths/math";
import { pluralize } from "../misc/strings";

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
  const date = new Date(ms || now());
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
  if (!secs || !new RegExp(/^[0-9]+$/).test(secs))
    return includeHrs ? "00:00:00" : "00:00";

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

/**
 * Parse milliseconds into an object.
 * @param {number} milliseconds the milliseconds to parse.
 * @returns an object containing days, hrs, mins, secs, ms, µs, ns.
 *  */
export function parseMilliseconds(milliseconds) {
  if (typeof milliseconds !== "number")
    throw new TypeError("Expected a number");
  return {
    days: Math.trunc(milliseconds / 86400000),
    hours: Math.trunc(milliseconds / 3600000) % 24,
    minutes: Math.trunc(milliseconds / 60000) % 60,
    seconds: Math.trunc(milliseconds / 1000) % 60,
    milliseconds: Math.trunc(milliseconds) % 1000,
    microseconds: Math.trunc(milliseconds * 1000) % 1000,
    nanoseconds: Math.trunc(milliseconds * 1e6) % 1000,
  };
}

/**
 * Convert milliseconds to a human readable string: 1337000000 → 15d 11h 23m 20s
 * @param {number} ms
 * @param {Object} options
 * @param {number} options.secsDecimalDigits
 * Default: 1. Number of digits to appear after the seconds decimal point.
 * @param {number} options.msDecimalDigits
 * Default: 0. Number of digits to appear after the milliseconds decimal point.
 * Useful in combination with process.hrtime().
 * @param {boolean} options.keepDecimalsOnWholeSeconds
 * Default: false. Keep milliseconds on whole seconds: 13s → 13.0s.
 * Useful when you are showing a number of seconds spent on an operation and don't want
 * the width of the output to change when hitting a whole number.
 * @param {boolean} options.compact
 * Default: false. Only show the first unit: 1h 10m → 1h. Also ensures that
 * millisecondsDecimalDigits and secondsDecimalDigits are both set to 0.
 * @param {number} options.unitCount
 * Default: Infinity. Number of units to show. Setting compact to true overrides this option.
 * @param {boolean} options.verbose
 * Default: false. Use full-length units: 5h 1m 45s → 5 hours 1 minute 45 seconds
 * @param {boolean} options.separateMilliseconds
 * Default: false. Show milliseconds separately. This means they won't be included in the
 * decimal part of the seconds.
 * @param {boolean} options.formatSubMilliseconds
 * Default: false. Show microseconds and nanoseconds.
 * @param {boolean} options.colonNotation
 * Default: false. Display time using colon notation: 5h 1m 45s → 5:01:45. Always shows time
 * in at least minutes: 1s → 0:01. Useful when you want to display time without the time units,
 * similar to a digital watch. Setting colonNotation to true overrides the following options to
 * false: compact, formatSubMilliseconds, separateMilliseconds, verbose
 * @returns the human readable time.
 */
export function prettifyMilliseconds(ms, options = {}) {
  const SECOND_ROUNDING_EPSILON = 0.000_000_1;
  if (!Number.isFinite(ms)) throw new TypeError("Expected a finite number");

  if (options.colonNotation) {
    options.compact = false;
    options.formatSubMilliseconds = false;
    options.separateMilliseconds = false;
    options.verbose = false;
  }

  if (options.compact) {
    options.secsDecimalDigits = 0;
    options.msDecimalDigits = 0;
  }

  const result = [];

  const floorDecimals = (value, decimalDigits) => {
    const flooredInterimValue = Math.floor(
      value * 10 ** decimalDigits + SECOND_ROUNDING_EPSILON
    );
    const flooredValue = Math.round(flooredInterimValue) / 10 ** decimalDigits;
    return flooredValue.toFixed(decimalDigits);
  };

  const add = (value, long, short, valueString) => {
    if (
      (result.length === 0 || !options.colonNotation) &&
      value === 0 &&
      !(options.colonNotation && short === "m")
    )
      return;

    valueString = (valueString || value || "0").toString();
    let prefix;
    let suffix;
    if (options.colonNotation) {
      prefix = result.length > 0 ? ":" : "";
      suffix = "";
      const wholeDigits = valueString.includes(".")
        ? valueString.split(".")[0].length
        : valueString.length;
      const minLength = result.length > 0 ? 2 : 1;
      valueString =
        "0".repeat(Math.max(0, minLength - wholeDigits)) + valueString;
    } else {
      prefix = "";
      suffix = options.verbose ? " " + pluralize(long, value) : short;
    }

    result.push(prefix + valueString + suffix);
  };

  const parsed = parseMilliseconds(ms);

  add(Math.trunc(parsed.days / 365), "year", "y");
  add(parsed.days % 365, "day", "d");
  add(parsed.hours, "hour", "h");
  add(parsed.minutes, "minute", "m");

  if (
    options.separateMilliseconds ||
    options.formatSubMilliseconds ||
    (!options.colonNotation && ms < 1000)
  ) {
    add(parsed.seconds, "second", "s");
    if (options.formatSubMilliseconds) {
      add(parsed.milliseconds, "millisecond", "ms");
      add(parsed.microseconds, "microsecond", "µs");
      add(parsed.nanoseconds, "nanosecond", "ns");
    } else {
      const millisecondsAndBelow =
        parsed.milliseconds +
        parsed.microseconds / 1000 +
        parsed.nanoseconds / 1e6;

      const millisecondsDecimalDigits =
        typeof options.msDecimalDigits === "number"
          ? options.msDecimalDigits
          : 0;

      const roundedMiliseconds =
        millisecondsAndBelow >= 1
          ? Math.round(millisecondsAndBelow)
          : Math.ceil(millisecondsAndBelow);

      const millisecondsString = millisecondsDecimalDigits
        ? millisecondsAndBelow.toFixed(millisecondsDecimalDigits)
        : roundedMiliseconds;

      add(
        Number.parseFloat(millisecondsString),
        "millisecond",
        "ms",
        millisecondsString
      );
    }
  } else {
    const seconds = (ms / 1000) % 60;
    const secsDecDigits =
      typeof options.secsDecimalDigits === "number"
        ? options.secsDecimalDigits
        : 1;
    const secsFixed = floorDecimals(seconds, secsDecDigits);
    const secsStr = options.keepDecimalsOnWholeSeconds
      ? secsFixed
      : secsFixed.replace(/\.0+$/, "");
    add(Number.parseFloat(secsStr), "second", "s", secsStr);
  }

  if (result.length === 0)
    return "0" + (options.verbose ? " milliseconds" : "ms");

  if (options.compact) return result[0];

  if (typeof options.unitCount === "number") {
    const separator = options.colonNotation ? "" : " ";
    return result.slice(0, Math.max(options.unitCount, 1)).join(separator);
  }

  return options.colonNotation ? result.join("") : result.join(" ");
}

const converters = {
  days: (value) => value * 864e5,
  hours: (value) => value * 36e5,
  minutes: (value) => value * 6e4,
  seconds: (value) => value * 1e3,
  milliseconds: (value) => value,
  microseconds: (value) => value / 1e3,
  nanoseconds: (value) => value / 1e6,
};

/** Convert an object of time properties to milliseconds: {seconds: 2} → 2000 */
export function objToMilliseconds(timeDescriptor) {
  let totalMilliseconds = 0;
  for (const [key, value] of Object.entries(timeDescriptor)) {
    if (typeof value !== "number")
      throw new TypeError(
        `Expected a \`number\` for key \`${key}\`, got \`${value}\` (${typeof value})`
      );
    const converter = converters[key];
    if (!converter) throw new Error(`Unsupported time key: ${key}`);
    totalMilliseconds += converter(value);
  }
  return totalMilliseconds;
}

/**
 * Pretty time zone: +2 or -9:30
 * @param {Date} date
 * @returns A human readable timezone.
 */
export function timeZone(date = new Date()) {
  const offset = date.getTimezoneOffset();
  const absOffset = Math.abs(offset);
  const hours = Math.floor(absOffset / 60);
  const minutes = absOffset % 60;
  const minutesOut = minutes > 0 ? ":" + ("0" + minutes).slice(-2) : "";
  return (offset < 0 ? "+" : "-") + hours + minutesOut;
}
