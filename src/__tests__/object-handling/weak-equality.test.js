import {
  findIndex,
  includes,
} from "../../modules/object-handling/weak-equality";

test("includes returns expected boolean", () => {
  const source = ["1", 3, 5];
  expect(includes(source, 1)).toBe(true);
  expect(includes(source, "3")).toBe(true);
  expect(includes(source, 8)).toBe(false);
  expect(includes(source, "6")).toBe(false);
});

test("findIndex returns expected boolean", () => {
  const source = ["1", 3, 5];
  expect(findIndex(source, 8)).toBe(-1);
  expect(findIndex(source, 1)).toBe(0);
  expect(findIndex(source, "3")).toBe(1);
  expect(findIndex(source, "5")).toBe(2);
});
