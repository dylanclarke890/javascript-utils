export function turnNthBitOff(num, nth) {
  return num & ~(1 << (nth - 1));
}

export function turnNthBitOn(num, nth) {
  return num | (1 << (nth - 1));
}

export function toggleNthBit(num, nth) {
  return num ^ (1 << (nth - 1));
}

export function checkNthBitOn(num, nth) {
  return num & (1 << (nth - 1));
}
