import {
  colorFromString,
  getLuminance,
  intToHex,
  rgbToHex,
  hexToRgb,
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

describe("hexToRBG", () => {
  test("returns expected object", () => {
    expect(hexToRgb("4183c4")).toStrictEqual({
      red: 65,
      green: 131,
      blue: 196,
      alpha: 1,
    });
    expect(hexToRgb("#fff")).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 1,
    });
    expect(hexToRgb("#22222299")).toStrictEqual({
      red: 34,
      green: 34,
      blue: 34,
      alpha: 0.6,
    });
    expect(hexToRgb("#0006")).toStrictEqual({
      red: 0,
      green: 0,
      blue: 0,
      alpha: 0.4,
    });
    expect(hexToRgb("#cd2222cc")).toStrictEqual({
      red: 205,
      green: 34,
      blue: 34,
      alpha: 0.8,
    });
    expect(hexToRgb("#22222299", { alpha: 1 })).toStrictEqual({
      red: 34,
      green: 34,
      blue: 34,
      alpha: 1,
    });
    expect(hexToRgb("#fff", { alpha: 0.5 })).toStrictEqual({
      red: 255,
      green: 255,
      blue: 255,
      alpha: 0.5,
    });
  });

  test("returns expected array or css", () => {
    expect(hexToRgb("#cd2222cc", { format: "array" })).toStrictEqual([
      205, 34, 34, 0.8,
    ]);
    expect(hexToRgb("#cd2222cc", { format: "css" })).toBe(
      "rgb(205 34 34 / 80%)"
    );
    expect(hexToRgb("#000", { format: "css" })).toBe("rgb(0 0 0)");
  });
});

describe("rgbToHex", () => {
  test("returns an expected value for an rgb(a) string", () => {
    expect(rgbToHex(65, 131, 196)).toBe("4183c4");
    expect(rgbToHex(65, 131, 196, 0.2)).toBe("4183c433");
    expect(rgbToHex(40, 42, 54, "75%")).toBe("282a36bf");
  });
  test("returns an expected value for number values", () => {
    expect(rgbToHex("rgb(40, 42, 54)")).toBe("282a36");
    expect(rgbToHex("rgba(40, 42, 54, 75%)")).toBe("282a36bf");
  });
});
