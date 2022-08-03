/**
 * Rounds a number.
 * @param {number} number The number to round.
 * @param {number} precision The decimal precision (significant figures).
 * @return {number} The rounded number.
 */
export function round(number, precision = 0) {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
}

/**
 * Sums two or more numbers.
 * @param {...number} numbers The numbers to sum.
 * @return {number} The sum.
 */
export function sum(...numbers) {
  return numbers.reduce((carry, num) => carry + num);
}

/**
 * Integer division (without decimal part).
 * @param {number} number A number.
 * @param {number} divideBy The number to divide by.
 * @return {number} The result of the integer division.
 */
export function integerDivision(number, divideBy) {
  return Math.floor(number / divideBy);
}

/**
 * Check if a number is even.
 * @param {number} num A number.
 * @return {boolean} True if even, false if odd.
 */
export function isEven(num) {
  return num % 2 === 0;
}

/**
 * Check if a number is odd.
 * @param {number} num A number.
 * @return {boolean} True if odd, false if even.
 */
export function isOdd(num) {
  return !(num % 2 === 0);
}

/**
 * Converts a source value of a source range to a value that is proportional
 * in another destination range.
 * @param {number[]} sourceTuple The source range tuple.
 * This function assumes that both the starting and ending values are positive numbers
 * (the starting value can be 0).
 * @return {(destRange: number[]) => (sourceValue: number) => number}
 * A function receiving the destination range tuple as argument (having the same shape
 * as the source range) returning a function taking the source value as argument returning
 * the value proportional in the destination range.
 */
export function proportion([sourceFrom, sourceTo]) {
  return ([destFrom, destTo]) =>
    function (sourceValue) {
      return (
        (sourceValue - sourceFrom) *
          ((destTo - destFrom) / (sourceTo - sourceFrom)) +
        destFrom
      );
    };
}
