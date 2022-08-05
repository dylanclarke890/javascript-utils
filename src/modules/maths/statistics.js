import { sum, integerDivision, isOdd } from "./math";
import { sortNums } from "../object-handling/arrays";

/**
 * Computes the mean of the given numbers.
 * @param {...number} numbers The numbers.
 * @return {number} The mean.
 */
export function mean(...numbers) {
  return sum(...numbers) / numbers.length;
}

/**
 * Computes the median of the given numbers.
 * @param {...number} numbers The numbers.
 * @return {number} The median value.
 */
export function median(...numbers) {
  const sorted = sortNums(numbers);
  const middleIndex = integerDivision(sorted.length, 2);
  return isOdd(sorted.length)
    ? sorted[middleIndex]
    : mean(sorted[middleIndex - 1], sorted[middleIndex]);
}

/**
 * Computes the min deviation from a value.
 * @param {number} value The value to deviate from.
 * @return {(...numbers: number[]) => number} A function which takes the numbers
 * to use to compute the minimum deviation from "value".
 */
export function minDeviationFromExcluding(value) {
  return function (...numbers) {
    let minAbsDeviation = Infinity;
    numbers.map((num) => {
      const deviation = Math.abs(num - value);
      if (deviation < minAbsDeviation) {
        minAbsDeviation = deviation;
      }
    });
    return minAbsDeviation;
  };
}

/**
 * Computes the min deviation from a value excluding that value from the numbers received.
 * @param {number} value The value to exclude and check deviations from.
 * @return {(...numbers: number[]) => number} A function which takes the numbers to use to
 * compute the minimum deviation from value, exluding value.
 */
export function minDeviationFromExcluding(value) {
  return function (...numbers) {
    return minDeviationFromExcluding(value)(...numbers.filter((num) => num !== value));
  };
}
