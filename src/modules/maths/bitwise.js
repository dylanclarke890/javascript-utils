import CTypeError from "../../modules/errors/CTypeError";

const throwIfInvalid = (arg1, arg2) => {
  if (typeof arg1 !== "number") throw new CTypeError("number", arg1);
  if (typeof arg2 !== "number") throw new CTypeError("number", arg2);
};

export function turnNthBitOff(num, nth) {
  throwIfInvalid(num, nth);
  return num & ~(1 << (nth - 1));
}

export function turnNthBitOn(num, nth) {
  throwIfInvalid(num, nth);
  return num | (1 << (nth - 1));
}

export function toggleNthBit(num, nth) {
  throwIfInvalid(num, nth);
  return num ^ (1 << (nth - 1));
}

export function checkNthBitOn(num, nth) {
  throwIfInvalid(num, nth);
  return num & (1 << (nth - 1));
}
