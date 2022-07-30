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
