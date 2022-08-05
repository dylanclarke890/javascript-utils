import {
  is,
  isArrEqualDeep,
  isEqualShallow,
  isObjEqualDeep,
  isObjPropEqual,
  objDiffShallow,
  partialShallowEqual,
} from "../../modules/object-handling/compare";

test("is returns expected boolean", () => {
  expect(is(1, 1)).toBe(true);
  expect(is(1, 2)).toBe(false);
  expect(is("asd", "asd")).toBe(true);
  expect(is("asd", "dsa")).toBe(false);
  expect(is([], [])).toBe(false); // shallow compare
  expect(is([], ["dsa"])).toBe(false);
});

test("isObjPropEqual returns expected boolean", () => {
  const objA = { a: 0, b: 6, c: 12 };
  const objB = { a: 0, b: 8, c: 12 };
  expect(isObjPropEqual(objA, objB, "a")).toBe(true);
  expect(isObjPropEqual(objA, objB, "b")).toBe(false);
  expect(isObjPropEqual(objA, objB, "a")).toBe(true);
});

test("isEqualShallow returns expected boolean", () => {
  const obj1 = { a: 0, b: 6, c: 12 };
  const obj2 = { a: 0, b: 8, c: 12 };
  expect(isEqualShallow(obj1, obj2)).toBe(false);
  const obj3 = { a: 0, b: 8, c: 12 };
  const obj4 = { a: 0, b: 8, c: 12 };
  expect(isEqualShallow(obj3, obj4)).toBe(true);
  const obj5 = { a: 0, b: { d: 5 }, c: 12 };
  const obj6 = { a: 0, b: { d: 5 }, c: 12 };
  expect(isEqualShallow(obj5, obj6)).toBe(false);
});

test("isArrayEqualDeep returns expected boolean", () => {
  const arr1 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  const arr2 = [
    [1, 2, 3],
    [4, 5, 6],
  ];
  expect(isArrEqualDeep(arr1, arr2)).toBe(true);
  const arr3 = [
    [4, 5, 6],
    [4, 5, 6],
  ];
  const arr4 = [
    [4, 2, 3],
    [4, 5, 6],
  ];
  expect(isArrEqualDeep(arr3, arr4)).toBe(false);
});

test("isObjEqualDeep returns expected boolean", () => {
  const obj1 = [
    {
      a: [1, 2, 3],
      b: [4, 5, 6],
    },
  ];
  const obj2 = [
    {
      a: [1, 2, 3],
      b: [4, 5, 6],
    },
  ];
  expect(isObjEqualDeep(obj1, obj2)).toBe(true);
  const obj3 = [
    {
      a: [1, 2, 3],
      b: [4, 5, 6],
    },
  ];
  const obj4 = [
    {
      a: [6, 5, 4],
      b: [1, 2, 3],
    },
  ];
  expect(isObjEqualDeep(obj3, obj4)).toBe(false);
});

test("partialShallowEqual returns expected boolean", () => {
  const source = {
    name: "Test",
    age: 20,
    pet: "dog",
  };
  expect(partialShallowEqual(source, { pet: "dog" })).toBe(true);
  expect(partialShallowEqual(source, { age: 20, pet: "dog" })).toBe(true);
  expect(partialShallowEqual(source, { phone: 78, age: 20, pet: "dog" })).toBe(
    false
  );
});

test("objDiffShallow returns expected value", () => {
  const objA = { name: "Test", age: 20, pet: "dog" };
  const objB = { name: "Test", pet: "cat" };
  expect(objDiffShallow(objA, objB)).toStrictEqual({
    a: { age: 20, pet: "dog" },
    b: { pet: "cat" },
  });
});
