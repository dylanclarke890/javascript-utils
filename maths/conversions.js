export function binaryToDecimal(x) {
  return parseInt(x, 2);
}

export function decimalToBinary(x) {
  return x.toString(2);
}

/**
 * Converts a type to its string representation.
 * @param {*} type
 * @return {string} The string representation of `type`.
 */
export function typeToStr(type) {
  return Object.prototype.toString.call(type);
}
