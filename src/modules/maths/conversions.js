/**
 * Convert a binary number to decimal.
 * @param {string} x The binary number to convert.
 * @returns The decimal number.
 */
export function binaryToDecimal(x) {
  return parseInt(x, 2);
}
/**
 * Convert a decimal number to binary.
 * @param {number} x The decimal number to convert.
 * @returns The binary number.
 */
export function decimalToBinary(x) {
  return x.toString(2);
}

const BYTE_UNITS = ["B", "kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
const BIBYTE_UNITS = [
  "B",
  "kiB",
  "MiB",
  "GiB",
  "TiB",
  "PiB",
  "EiB",
  "ZiB",
  "YiB",
];
const BIT_UNITS = [
  "b",
  "kbit",
  "Mbit",
  "Gbit",
  "Tbit",
  "Pbit",
  "Ebit",
  "Zbit",
  "Ybit",
];
const BIBIT_UNITS = [
  "b",
  "kibit",
  "Mibit",
  "Gibit",
  "Tibit",
  "Pibit",
  "Eibit",
  "Zibit",
  "Yibit",
];

/**
 * Formats the given number using `Number.toLocaleString`.
 * - If locale is a string, the value is expected to be a locale-key (for example: `de`).
 * - If locale is true, the system default locale is used for translation.
 * - If no value for locale is specified, the number is returned unmodified.
 */
export function toLocaleString(number, locale, options) {
  let result = number;
  if (typeof locale === "string" || Array.isArray(locale)) {
    result = number.toLocaleString(locale, options);
  } else if (locale === true || options !== undefined) {
    result = number.toLocaleString(undefined, options);
  }
  return result;
}

/**
 * Convert bytes to a human readable string: `1337 → 1.34 kB`
 * Useful for displaying file sizes for humans.
 * Note that it uses base-10 (e.g. kilobyte).
 * @see https://web.archive.org/web/20150324153922/https://pacoup.com/2009/05/26/kb-kb-kib-whats-up-with-that/
 * @param {number} number
 * @param {Object} options
 * @param {boolean} options.signed Default: false. Include plus sign for positive numbers.
 * If the difference is exactly zero a space character will be prepended instead for better
 * alignment.
 * @param {boolean} options.bits Default: false. Format the number as bits instead of bytes.
 * This can be useful when, for example, referring to bit rate.
 * @param {boolean} options.binary Default: false. Format the number using the Binary Prefix
 * instead of the SI Prefix. This can be useful for presenting memory amounts. However, this
 * should not be used for presenting file sizes.
 * @param {boolean | string} options.locale Default: false (No localization). Important: Only
 * the number and decimal separator are localized. The unit title is not and will not be
 * localized.
 * - If true: Localize the output using the system/browser locale.
 * - If string: Expects a BCP 47 language tag (For example: en, de, …)
 * - If string[]: Expects a list of BCP 47 language tags (For example: en, de, …)
 * @param {number} options.minimumFractionDigits Default: undefined. The minimum number of
 * fraction digits to display. If neither minimumFractionDigits or maximumFractionDigits are
 * set, the default behavior is to round to 3 significant digits.
 * @param {number} options.maximumFractionDigits Default: undefined. The maximum number of
 * digits to display. If neither minimumFractionDigits or maximumFractionDigits are set, the
 * default behavior is to round to 3 significant digits.
 */
export function convertBytes(number, options) {
  if (!Number.isFinite(number))
    throw new TypeError(
      `Expected a finite number, got ${typeof number}: ${number}`
    );

  options = {
    bits: false,
    binary: false,
    ...options,
  };

  const UNITS = options.bits
    ? options.binary
      ? BIBIT_UNITS
      : BIT_UNITS
    : options.binary
    ? BIBYTE_UNITS
    : BYTE_UNITS;

  if (options.signed && number === 0) return ` 0 ${UNITS[0]}`;

  const isNegative = number < 0;
  const prefix = isNegative ? "-" : options.signed ? "+" : "";

  if (isNegative) number = -number;
  let localeOptions;
  if (options.minimumFractionDigits !== undefined)
    localeOptions = { minimumFractionDigits: options.minimumFractionDigits };

  if (options.maximumFractionDigits !== undefined)
    localeOptions = {
      maximumFractionDigits: options.maximumFractionDigits,
      ...localeOptions,
    };

  if (number < 1) {
    const numberString = toLocaleString(number, options.locale, localeOptions);
    return prefix + numberString + " " + UNITS[0];
  }

  const exponent = Math.min(
    Math.floor(
      options.binary
        ? Math.log(number) / Math.log(1024)
        : Math.log10(number) / 3
    ),
    UNITS.length - 1
  );
  number /= (options.binary ? 1024 : 1000) ** exponent;

  if (!localeOptions) number = number.toPrecision(3);

  const numberString = toLocaleString(
    Number(number),
    options.locale,
    localeOptions
  );

  const unit = UNITS[exponent];

  return prefix + numberString + " " + unit;
}
