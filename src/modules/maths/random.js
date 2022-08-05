/**
 * Get a random number between min and max.
 * @param {number} min The minimum.
 * @param {number} max The maximum.
 * @returns {number} The random number in the range.
 */
export function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random number up to num.
 * @param {number} num The maximum number.
 * @returns {number} The random number in the range of 0 - num.
 */
export function randomNumber(num) {
  return Math.floor(Math.random() * num);
}

/**
 * Get a random value from an array.
 * @param {Array} arr The arr to retrieve a value from.
 * @returns {*} A random value from any index of the array.
 */
export function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Shuffle the values of an array.
 * @param {Array} arr The arr to shuffle.
 * @returns {Array} The same array with it's values shuffled.
 */
export function shuffleArr(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

/**
 * Generate a random HSL color.
 * @param {number} saturation The desired saturation.
 * @param {number} brightness The desired brightness.
 * @returns {string} A HSL color in the format: `hsl('color', 'saturation'%, 'brightness'%)`.
 */
export function randomHSLColor(saturation = 100, brightness = 100) {
  return `hsl(${Math.floor(
    Math.random() * 360
  )}, ${saturation}%, ${brightness}%)`;
}

/**
 * Generate random numbers that are consecutively unique.
 * @param {number} minimum
 * @param {number} maximum
 * @returns {Function} a function, that when called, will return a random number that
 * is never the same as the previous (between minimum and maximum).
 */
export function uniqueRandom(minimum, maximum) {
  let previousValue;
  return function random() {
    const number = Math.floor(
      Math.random() * (maximum - minimum + 1) + minimum
    );
    previousValue =
      number === previousValue && minimum !== maximum ? random() : number;
    return previousValue;
  };
}

/**
 * Get consecutively unique elements from an array.
 * @param {Array} arr
 * @returns {Function} a function, that when called, will return a random element
 * that's never the same as the previous.
 */
export function uniqueRandomFromArr(arr) {
  const random = uniqueRandom(0, arr.length - 1);
  return () => arr[random()];
}
