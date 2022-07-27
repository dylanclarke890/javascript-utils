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
