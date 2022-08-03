import {
  clampLatitude,
  wrapLongitude,
  normalizeLatitude,
  normalizeLongitude,
} from "../../modules/maps/map-coordinates";
import CTypeError from "../../modules/errors/CTypeError";

describe("clampLatitude", () => {
  test("throws CTypeError if the passed value isn't a number", () => {
    const invalidArgs = ["1", () => null, ["test"], {}, null];
    for (let arg in invalidArgs)
      expect(() => clampLatitude(arg)).toThrowError(CTypeError);
  });

  test("returns -90 if the passed arg is lower than -90.", () => {
    expect(clampLatitude(-100)).toBe(-90);
  });

  test("returns 90 if the passed arg is higher than 90.", () => {
    expect(clampLatitude(100)).toBe(90);
  });

  test("returns the passed arg if it is higher than -90 and lower than 90.", () => {
    expect(clampLatitude(40)).toBe(40);
  });
});

describe("wrapLongitude", () => {
  test("throws CTypeError if the passed value isn't a number", () => {
    const invalidArgs = ["1", () => null, ["test"], {}, null];
    for (let arg in invalidArgs)
      expect(() => wrapLongitude(arg)).toThrowError(CTypeError);
  });

  test("returns 0 if the passed arg is 360.", () => {
    expect(wrapLongitude(360)).toBe(0);
  });

  test("returns 0 if the passed arg is -360.", () => {
    expect(wrapLongitude(-360)).toBe(0);
  });

  test("returns the passed arg if it is higher than -180 and lower than 180.", () => {
    expect(wrapLongitude(0)).toBe(0);
  });
});

test("normalizeLatitude returns expected value", () => {
  expect(normalizeLatitude(180)).toBe(0);
});
describe("normalizeLongitude", () => {
  expect(normalizeLongitude(360)).toBe(180);
});
