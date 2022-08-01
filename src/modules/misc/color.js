import { hashString } from "../maths/hash";

export function getLuminance(color) {
  const c = parseInt(color, 16);
  const r = (c & 0xff0000) >> 16;
  const g = (c & 0x00ff00) >> 8;
  const b = c & 0x0000ff;
  return 0.299 * r + 0.587 * g + 0.114 * b;
}

export function intToRGBHexString(i) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return "00000".substring(0, 6 - c.length) + c;
}

export function colorFromString(str) {
  const hash = hashString(str);
  return intToRGBHexString(hash);
}

const hexCharacters = "a-f\\d";
const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
const nonHexChars = new RegExp(`[^#${hexCharacters}]`, "gi");
const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, "i");

/**
 * Convert HEX color to RGBA
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
export function hexToRGB(hex, options = {}) {
  if (
    typeof hex !== "string" ||
    nonHexChars.test(hex) ||
    !validHexSize.test(hex)
  ) {
    throw new TypeError("Expected a valid hex string");
  }

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
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

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
