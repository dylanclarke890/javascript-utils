import CTypeError from "../../modules/errors/CTypeError";

const throwIfInvalid = (arg1, arg2) => {
  if (typeof arg1 !== "number") throw new CTypeError("number", arg1);
  if (typeof arg2 !== "number") throw new CTypeError("number", arg2);
};

/**
 * Turn the nth bit off in a number.
 * @param {number} num 
 * @param {number} nth 
 * @returns {number} The value with nth bit off. 
 */
export function turnNthBitOff(num, nth) {
  throwIfInvalid(num, nth);
  return num & ~(1 << (nth - 1));
}

/**
 * Turn the nth bit on in a number.
 * @param {number} num 
 * @param {number} nth 
 * @returns {number} The value with nth bit on. 
 */
export function turnNthBitOn(num, nth) {
  throwIfInvalid(num, nth);
  return num | (1 << (nth - 1));
}

/**
 * Toggle the nth bit in a number.
 * @param {number} num 
 * @param {number} nth 
 * @returns {number} The value with nth bit toggled. 
 */
export function toggleNthBit(num, nth) {
  throwIfInvalid(num, nth);
  return num ^ (1 << (nth - 1));
}

/**
 * Check the nth bit is on in a number.
 * @param {number} num 
 * @param {number} nth 
 * @returns {boolean} True if the bit is on. 
 */
export function checkNthBitOn(num, nth) {
  throwIfInvalid(num, nth);
  return num & (1 << (nth - 1));
}
