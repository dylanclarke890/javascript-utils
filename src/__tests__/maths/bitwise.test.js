import {
  turnNthBitOff,
  turnNthBitOn,
  toggleNthBit,
  checkNthBitOn,
} from "../../modules/maths/bitwise";
import CTypeError from "../../modules/errors/CTypeError";

describe("turnNthBitOff", () => {
  test("throws CTypeError with invalid args", () => {
    const invalidArgs = [
      [null, null],
      ["invalid", "invalid"],
      [[], []],
      [{}, {}],
      [{}, { coords: {} }],
    ];
    for (let [arg1, arg2] in invalidArgs)
      expect(() => turnNthBitOff(arg1, arg2)).toThrowError(CTypeError);
  });
  test("returns expect value", () => {
    expect(turnNthBitOff(3, 1)).toBe(2);
  });
});

describe("turnNthBitOn", () => {
  test("throws CTypeError with invalid args", () => {
    const invalidArgs = [
      [null, null],
      ["invalid", "invalid"],
      [[], []],
      [{}, {}],
      [{}, { coords: {} }],
    ];
    for (let [arg1, arg2] in invalidArgs)
      expect(() => turnNthBitOn(arg1, arg2)).toThrowError(CTypeError);
  });
  test("returns expect value", () => {
    expect(turnNthBitOn(4, 1)).toBe(5);
  });
});

describe("toggleNthBit", () => {
  test("throws CTypeError with invalid args", () => {
    const invalidArgs = [
      [null, null],
      ["invalid", "invalid"],
      [[], []],
      [{}, {}],
      [{}, { coords: {} }],
    ];
    for (let [arg1, arg2] in invalidArgs)
      expect(() => toggleNthBit(arg1, arg2)).toThrowError(CTypeError);
  });
  test("returns expect value", () => {
    expect(toggleNthBit(4, 1)).toBe(5);
  });
});

describe("checkNthBitOn", () => {
  test("throws CTypeError with invalid args", () => {
    const invalidArgs = [
      [null, null],
      ["invalid", "invalid"],
      [[], []],
      [{}, {}],
      [{}, { coords: {} }],
    ];
    for (let [arg1, arg2] in invalidArgs)
      expect(() => checkNthBitOn(arg1, arg2)).toThrowError(CTypeError);
  });
  test("returns expect value", () => {
    expect(checkNthBitOn(4, 2)).toBe(0);
  });
});
