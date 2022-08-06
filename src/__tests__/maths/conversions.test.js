import {
  binaryToDecimal,
  convertBytes,
  decimalToBinary,
} from "../../modules/maths/conversions";

test("binaryToDecimal returns expected value", () => {
  expect(binaryToDecimal("10")).toBe(2);
});

test("convertBytes returns expected value", () => {
  expect(convertBytes(1337)).toBe("1.34 kB");
});

test("decimalToBinary returns expected value", () => {
  expect(decimalToBinary(2)).toBe("10");
});

test.todo("toLocaleString()");