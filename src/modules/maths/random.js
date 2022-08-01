export function randomFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomNumber(num) {
  return Math.floor(Math.random() * num);
}

export function randomValue(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

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

export function randomHSLColor(saturation = 100, brightness = 100) {
  return `hsl(${Math.floor(
    Math.random() * 360
  )}, ${saturation}%, ${brightness}%})`;
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
