import {
  cloneArr,
  cloneDeep,
  cloneRegExp,
  deepObjectCloningExtend,
  deepObjectExtend,
  extend,
  extendDecorate,
  extendShallow,
} from "../../modules/object-handling/clone";

test("cloneArr returns expected item", () => {
  const source = [1, 2, 3];
  const clone = cloneArr(source);
  expect(clone).toStrictEqual(source);
  expect(clone === source).toBe(false); // different references
});

describe("cloneDeep", () => {
  test("returns expected object when using complex: false", () => {
    const source = [1, 2, 3];
    const clone = cloneDeep(source, { complex: false });
    expect(clone).toStrictEqual(source);
    expect(clone === source).toBe(false); // different references
  });

  test("returns expected object when using complex: true", () => {
    const source = [1, 2, 3];
    const clone = cloneDeep(source, { complex: true });
    expect(clone).toStrictEqual(source);
    expect(clone === source).toBe(false); // different references
  });
});

test("extend adds the expected properties to source", () => {
  const source = { first: "blah", last: "blah" };
  extend(source, { age: 20 }, { pet: "dog" });
  expect(source).toEqual({ age: 20, pet: "dog", first: "blah", last: "blah" });
  extend(source, { test: true });
  expect(source).toEqual({
    test: true,
    age: 20,
    pet: "dog",
    first: "blah",
    last: "blah",
  });
});

test("shallowExtend adds the expected properties to source", () => {
  const source = { a: { b: 1, c: 2 }, d: 4 };
  extendShallow(source, { a: { e: 5, f: 8 }, h: 12 });
  expect(source).toEqual({ a: { e: 5, f: 8 }, d: 4, h: 12 });
});

test("deepObjectExtend adds the expected properties to source", () => {
  const source = { a: { b: 1, c: 2 }, d: 4 };
  deepObjectExtend(source, { a: { e: 5, f: 8 }, h: 12 });
  expect(source).toEqual({ a: { b: 1, c: 2, e: 5, f: 8 }, d: 4, h: 12 });
});

test("deepObjectCloningExtend adds the expected properties to source", () => {
  const source = { a: { b: 1, c: 2 }, d: 4 };
  deepObjectCloningExtend(source, { a: { e: 5, f: 8 }, h: 12 });
  expect(source).toEqual({ a: { b: 1, c: 2, e: 5, f: 8 }, d: 4, h: 12 });
});

test("extendDecorate adds the expected properties to source", () => {
  const source = { a: { b: 1, c: 2 }, d: 4 };
  extendDecorate(source, { a: { e: 5, f: 8 }, h: 12 });
  expect(source).toEqual({ a: { b: 1, c: 2, e: 5, f: 8 }, d: 4, h: 12 });
});

test("cloneRegExp returns new instance with same value", () => {
  const source = new RegExp(/(\w|\d){2,4}/);
  const clone = cloneRegExp(source);
  expect(source.toString()).toBe(clone.toString());
  expect(clone === source).not.toBe(true);
});
