import {
  arrToObject,
  completeObjectAssign,
  defineProperty,
  getPrototypes,
  mapObject,
  prop,
  selectWhere,
} from "../../modules/object-handling/objects";

test("mapObject returns the expected object", () => {
  const source = { a: 4, b: 4, c: 0 };
  const mapFunc = (val, key, index) => (val = val * index + index);
  const res = mapObject(source, mapFunc);
  expect(res).toStrictEqual({
    a: 0,
    b: 5,
    c: 2,
  });
});

test("arrToObject returns expected object", () => {
  const source = [1, 2, 3, 4];
  const mapFunc = (val, index, arr) => [`key${index}`, `value${val}`];
  const res = arrToObject(source, mapFunc);
  expect(res).toStrictEqual({
    key0: "value1",
    key1: "value2",
    key2: "value3",
    key3: "value4",
  });
});

test("selectWhere returns expected properties", () => {
  const source = {
    name: "test",
    age: 20,
    num: 200,
  };
  const func = (val) => typeof val === "number";
  const res = selectWhere(source, func);
  expect(res).toStrictEqual({ age: 20, num: 200 });
});

test("getPrototypes returns expected array", () => {
  const source = {
    name: "test",
    age: 20,
    num: 200,
  };
  const expected = [
    "name",
    "age",
    "num",
    "constructor",
    "__defineGetter__",
    "__defineSetter__",
    "hasOwnProperty",
    "__lookupGetter__",
    "__lookupSetter__",
    "isPrototypeOf",
    "propertyIsEnumerable",
    "toString",
  ];
  expect(
    getPrototypes(source, { stopAt: "toString", includeStop: true })
  ).toStrictEqual(expected);
});

test("prop defines a property on a object with getter and setter", () => {
  const obj = {};
  prop(
    obj,
    "test",
    () => 1,
    (val) => val
  );
  obj.test = 4;
  expect(obj.test).toBe(1);
});

test("defineProperty works", () => {
  const obj = { name: "Test", age: 20 };
  defineProperty(obj, "altAge", {
    get: function () {
      return this.age;
    },
  });
  expect(obj.altAge).toBe(20);
});

test("completeObjectAssign", () => {
  const obj = { name: "Test" };
  const source = [{ age: 20 }, { pet: "dog" }];
  expect(completeObjectAssign(obj, ...source)).toStrictEqual({
    name: "Test",
    age: 20,
    pet: "dog",
  });
});
