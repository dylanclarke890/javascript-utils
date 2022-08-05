import {
  colorFromString,
  getLuminance,
  intToHex,
} from "../../modules/misc/color";

test("getLuminanceFromHex returns expected val", () => {
  const source = "#223F0C";
  expect(getLuminance(source)).toBe(48.51);
});

test("intToHex returns expected val", () => {
  expect(intToHex(1)).toBe("000001");
  expect(intToHex(256)).toBe("000100");
  expect(intToHex(1000)).toBe("0003E8");
  expect(intToHex(Number.MAX_SAFE_INTEGER)).toBe("FFFFFF");
});

test("colorFromString returns expected val", () => {
  expect(colorFromString("test")).toBe("364492");
});
