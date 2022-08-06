import {
  getNestedPropertyValue,
  hasNestedPropertyValue,
  nestedMapGet,
  nestedMapHas,
  nestedMapSet,
  nestedTreeMapHas,
  nestedTreeMapSet,
  setNestedPropertyValue,
} from "../../modules/object-handling/nested-properties";

test("getNestedPropertyValue returns expected object", () => {
  const source = { a: { b: { c: { d: 4 } } } };
  expect(getNestedPropertyValue(source, ["a", "b", "c", "d"])).toStrictEqual(4);
});

test("hasNestedPropertyValue returns expected bolean", () => {
  const source = { a: { b: { c: { d: 4 } } } };
  expect(hasNestedPropertyValue(source, ["a", "b", "c", "d"])).toBe(true);
  expect(hasNestedPropertyValue(source, ["e", "f"])).toBe(false);
});

test("setNestedPropertyValue sets expected value", () => {
  const source = { a: { b: { c: { d: 4 } } } };
  setNestedPropertyValue(source, ["a", "b", "c", "d"], 10);
  expect(source.a.b.c.d).toBe(10);
});

test("nestedMapSet sets expected value", () => {
  const mapA = new Map();
  const mapB = new Map();
  const mapC = new Map();
  const mapD = new Map();
  mapD.set("d", 4);
  mapC.set("c", mapD);
  mapB.set("b", mapC);
  mapA.set("a", mapB);
  nestedMapSet(mapA, ["a", "b", "c", "d"], 10);
  expect(mapD.get("d")).toBe(10);
});

test("nestedMapHas returns expected boolean", () => {
  const mapA = new Map();
  const mapB = new Map();
  const mapC = new Map();
  const mapD = new Map();
  mapD.set("d", 4);
  mapC.set("c", mapD);
  mapB.set("b", mapC);
  mapA.set("a", mapB);
  expect(nestedMapHas(mapA, ["a", "b", "c", "d"])).toBe(true);
});

test("nestedMapGet returns expected value", () => {
  const mapA = new Map();
  const mapB = new Map();
  const mapC = new Map();
  const mapD = new Map();
  mapD.set("d", 4);
  mapC.set("c", mapD);
  mapB.set("b", mapC);
  mapA.set("a", mapB);
  expect(nestedMapGet(mapA, ["a", "b", "c", "d"])).toBe(4);
});

test("nestedTreeMapHas returns expected boolean", () => {
  const map = new Map(
    new Map([
      ["whole numbers", [1, 2, 3, 4]],
      ["Decimal numbers", [1.1, 1.2, 1.3, 1.4]],
      ["negative numbers", [-1, -2, -3, -4]],
    ])
  );
  expect(nestedTreeMapHas(map, ["whole numbers"])).toBe(true);
});

test("nestedTreeMapSet", () => {
  const map = new Map(
    new Map([
      ["whole numbers", [0]],
      ["Decimal numbers", [1.1, 1.2, 1.3, 1.4]],
      ["negative numbers", [-1, -2, -3, -4]],
    ])
  );
  nestedTreeMapSet(map, ["whole numbers"], [1]);
  // expect(nestedMapGet(map, ["whole numbers"])).toStrictEqual([1]);
});

test("nestedTreeMapGet", () => {
  const map = new Map(
    new Map([
      ["whole numbers", [0]],
      ["Decimal numbers", [1.1, 1.2, 1.3, 1.4]],
      ["negative numbers", [-1, -2, -3, -4]],
    ])
  );
  expect(nestedMapGet(map, ["whole numbers"])).toStrictEqual([0]);
});
