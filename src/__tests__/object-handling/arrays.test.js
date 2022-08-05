import {
  arrayMoveImmutable,
  arrayMoveMutable,
  distinct,
  firstItem,
  firstNested,
  indexWrappedArray,
  isArrayOfNumber,
  lastItem,
  lastNested,
  maxOf,
  minOf,
  removeNulls,
  sortNums,
  sumOf,
  unshift,
} from "../../modules/object-handling/arrays";

test("distinct returns only unique elements", () => {
  const source = [1, 1, 1, 1, 2, 2, 2, 3, 3, 3, 4];
  expect(distinct(source)).toStrictEqual([1, 2, 3, 4]);
});

test("sumOf returns the expected total", () => {
  const source = [1, 3, 5, 7];
  expect(sumOf(source)).toBe(16);
});

test("isArrayOfNumber returns expected result", () => {
  const isNums = [1, 3, 5, 7];
  expect(isArrayOfNumber(isNums)).toBe(true);
  const isNot = ["tset", 1, 2, 3, 4];
  expect(isArrayOfNumber(isNot)).toBe(false);
});

test("firstItem returns expected item.", () => {
  const empty = [];
  expect(firstItem(empty)).toBeUndefined();
  const withVals = [1, 3, 4, 5];
  expect(firstItem(withVals)).toBe(1);
});

test("lastItem returns expected item.", () => {
  const empty = [];
  expect(lastItem(empty)).toBeUndefined();
  const withVals = [1, 3, 4, 5];
  expect(lastItem(withVals)).toBe(5);
});

test("firstNested returns expected item.", () => {
  const withoutNested = [1, 3, 4, 5];
  expect(firstNested(withoutNested)).toBeUndefined();
  const withNestedArr = [1, [4, 5, 6], [1, 2, 3], 5];
  expect(firstNested(withNestedArr)).toStrictEqual([4, 5, 6]);
  const withNestedObj = [1, { b: 3 }, { a: 4 }, 5];
  expect(firstNested(withNestedObj)).toStrictEqual({ b: 3 });
});

test("lastNested returns expected item.", () => {
  const withoutNested = [1, 3, 4, 5];
  expect(lastNested(withoutNested)).toBeUndefined();
  const withNestedArr = [1, [4, 5, 6], [1, 2, 3], 5];
  expect(lastNested(withNestedArr)).toStrictEqual([1, 2, 3]);
  const withNestedObj = [1, { b: 3 }, { a: 4 }, 5];
  expect(lastNested(withNestedObj)).toStrictEqual({ a: 4 });
});

test("minOf returns expected value", () => {
  const empty = [];
  expect(minOf(empty)).toBeUndefined();
  const numArray = [1, 2, 3, 4, 5, 6];
  expect(minOf(numArray)).toBe(1);
  const strArray = ["test", "ing"];
  expect(minOf(strArray)).toBe("ing");
});

test("maxOf returns expected value", () => {
  const empty = [];
  expect(maxOf(empty)).toBeUndefined();
  const numArray = [1, 2, 3, 4, 5, 6];
  expect(maxOf(numArray)).toBe(6);
  const strArray = ["test", "ing"];
  expect(maxOf(strArray)).toBe("test");
});

describe("sortNums", () => {
  test("sorts in ascending order", () => {
    expect(sortNums([1, 9, 6, 3, 2, 6], false)).toStrictEqual([
      1, 2, 3, 6, 6, 9,
    ]);
  });
  test("sorts in descending order", () => {
    expect(sortNums([1, 9, 6, 3, 2, 6], true)).toStrictEqual([
      9, 6, 6, 3, 2, 1,
    ]);
  });
});

test("removeNulls returns expected array", () => {
  const source = [null, undefined, null, 12, "test", {}, []];
  expect(removeNulls(source)).toStrictEqual([12, "test", {}, []]);
});

test("unshift prepends item to array", () => {
  const source = [2, 3, 4, 5];
  unshift(source, 1);
  expect(source[0]).toBe(1);
});

describe("indexWrappedArray", () => {
  test("returns expected item when wrapOverflow is true", () => {
    const proxyArray = indexWrappedArray([1, 2, 3, 4, 5]); // wrapOverflow true by default
    expect(proxyArray[-1]).toBe(5);
    expect(proxyArray[4]).toBe(5);
    expect(proxyArray[5]).toBe(1);
    expect(proxyArray[6]).toBe(2);
    expect(proxyArray[-6]).toBe(5);
  });

  test("returns expected item when wrapOverflow is false", () => {
    const proxyArray = indexWrappedArray([1, 2, 3, 4, 5], {
      wrapOverflow: false,
    });
    expect(proxyArray[-1]).toBe(5);
    expect(proxyArray[5]).toBeUndefined();
    expect(proxyArray[5]).toBeUndefined();
    expect(proxyArray[-6]).toBeUndefined();
  });
});

test("arrayMoveMutable shifts item in original list", () => {
  const source = [1, 2, 3];
  arrayMoveMutable(source, 0, 2);
  expect(source[0]).toBe(2);
  expect(source[1]).toBe(3);
  expect(source[2]).toBe(1);
});

test("arrayMoveImmutable returns new list with shifted item", () => {
  const source = [1, 2, 3];
  const res = arrayMoveImmutable(source, 0, 2);
  expect(source[0]).toBe(1);
  expect(source[1]).toBe(2);
  expect(source[2]).toBe(3);
  expect(res[0]).toBe(2);
  expect(res[1]).toBe(3);
  expect(res[2]).toBe(1);
});
