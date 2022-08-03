import {
  isEven,
  isOdd,
  integerDivision,
  round,
  sum,
} from "../../modules/maths/math";

test("isEven returns expected value", () => {
  expect(isEven(2)).toBe(true);
  expect(isEven(13)).toBe(false);
});

test("isOdd returns expected value", () => {
  expect(isOdd(13)).toBe(true);
  expect(isOdd(2)).toBe(false);
});

test("round returns expected value", () => {
  expect(round(100.844)).toBe(101);
  expect(round(100.844, 2)).toBe(100.84);
  expect(round(100.844, 4)).toBe(100.844);
});

test("sum returns expected value", () => {
  expect(sum(100, 400)).toBe(500);
  expect(sum(100, 400, 300)).toBe(800);
  expect(sum(100, 400, 300, 200)).toBe(1000);
});

test("integerDivision returns expected value", () => {
  expect(integerDivision(12, 3)).toBe(4);
  expect(integerDivision(12, 7)).toBe(1);
  expect(integerDivision(20, 5)).toBe(4);
  expect(integerDivision(21, 5)).toBe(4);
});

// TODO: add test cases for `proportion()`.
