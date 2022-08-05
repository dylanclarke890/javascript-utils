import { hashString } from "../maths/hash";
import { round } from "../maths/math";

/**
 * Get the luminance value of a color in HEX format.
 * @param {string} hexColor a colour in hex format. leading '#' will be removed if present.
 * @param {number} precision sig figs to round the result to.
 * @returns {number} the luminance.
 */
export function getLuminance(hexColor, precision = 2) {
  if (!hexColor) return 0;
  hexColor = hexColor.replace(/^#/, "");
  const c = parseInt(hexColor, 16);
  const r = (c & 0xff0000) >> 16;
  const g = (c & 0x00ff00) >> 8;
  const b = c & 0x0000ff;
  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  return round(luminance, precision);
}

/**
 * Convert a number to a HEX string that can be used as a color.
 * @param {number} i a number between 0 and Number.MAX_SAFE_INTEGER.
 * @returns {string} A valid HEX color.
 */
export function intToHex(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

/**
 * Convert a string to a HEX string that can be used as a color.
 * @param {string} str The string to convert.
 * @returns {string} A valid HEX color.
 */
export function colorFromString(str) {
  const hash = hashString(str);
  return intToHex(hash);
}

const hexCharacters = "a-f\\d";
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, "gi");
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, "i");

/**
 * Convert HEX color to RGBA.
 * @param {string} hex The color in HEX format. Leading # is optional.
 * @param {Object} options
 * @param {string} options.format possible values: 'object' | 'array' | 'css'. Defaults to
 * 'object'. The RGB output format. Note that when using the css format, the value of the alpha
 * channel is rounded to two decimal places.
 * @param {number} options.alpha Set the alpha of the color. This overrides any existing alpha
 * component in the Hex color string. For example, the 99 in #22222299. The number must be in
 * the range 0 to 1.
 * @returns {Object | Array | string} An object, array or string containing the RGBA values.
 */
export function hexToRgb(hex, options = {}) {
  if (
    typeof hex !== "string" ||
    nonHexChars.test(hex) ||
    !validHexSize.test(hex)
  )
    throw new TypeError("Expected a valid hex string");

  hex = hex.replace(/^#/, "");
  let alphaFromHex = 1;

  if (hex.length === 8) {
    alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
    hex = hex.slice(0, 6);
  }
  if (hex.length === 4) {
    alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
    hex = hex.slice(0, 3);
  }
  if (hex.length === 3)
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

  const number = Number.parseInt(hex, 16);
  const red = number >> 16;
  const green = (number >> 8) & 255;
  const blue = number & 255;
  const alpha =
    typeof options.alpha === "number" ? options.alpha : alphaFromHex;

  if (options.format === "array") return [red, green, blue, alpha];
  if (options.format === "css") {
    const alphaString =
      alpha === 1 ? "" : ` / ${Number((alpha * 100).toFixed(2))}%`;
    return `rgb(${red} ${green} ${blue}${alphaString})`;
  }
  return { red, green, blue, alpha };
}

/**
 * Convert RBG(A) colors to HEX format.
 * @param {number | string} red Either the full string in rgba format or a value for 'red'
 * between 0 and 255.
 * @param {number} green A value for 'green' between 0 and 255.
 * @param {number} blue A value for 'blue' between 0 and 255.
 * @param {number | string | undefined} alpha an optional alpha value as a number or percentage. 
 * @returns The HEX color.
 */
export function rgbToHex(red, green, blue, alpha = undefined) {
  const isPercent = (red + (alpha || "")).toString().includes("%");
  if (typeof red === "string") {
    [red, green, blue, alpha] = red
      .match(/(0?\.?\d{1,3})%?\b/g)
      .map((component) => Number(component));
  } else if (alpha !== undefined) alpha = Number.parseFloat(alpha);

  if (
    typeof red !== "number" ||
    typeof green !== "number" ||
    typeof blue !== "number" ||
    red > 255 ||
    green > 255 ||
    blue > 255
  )
    throw new TypeError("Expected three numbers below 256");

  if (typeof alpha === "number") {
    if (!isPercent && alpha >= 0 && alpha <= 1) alpha = Math.round(255 * alpha);
    else if (isPercent && alpha >= 0 && alpha <= 100)
      alpha = Math.round((255 * alpha) / 100);
    else
      throw new TypeError(
        `Expected alpha value (${alpha}) as a fraction or percentage`
      );

    alpha = (alpha | (1 << 8)).toString(16).slice(1);
  } else alpha = "";

  return (
    (blue | (green << 8) | (red << 16) | (1 << 24)).toString(16).slice(1) +
    alpha
  );
}
