import {
  mean,
  median,
  minDeviationFromExcluding,
} from "../../modules/maths/statistics";

test("mean returns the average of the numbers passed", () => {
  const source = [1, 3, 5];
  expect(mean(...source)).toBe(3);
});

test("median returns the middle value of the numbers passed", () => {
  const source = [1, 4, 5];
  expect(median(...source)).toBe(4);
});

test("closestTo returns the expected value", () => {
  expect(minDeviationFromExcluding(10)(1, 3, 9)).toBe(1);
  expect(minDeviationFromExcluding(10)(1, 3, 9, 10)).toBe(0);
});

test("closestToExcluding returns the expected value", () => {
  expect(minDeviationFromExcluding(10)(1, 3, 9, 10)).toBe(1);
});
