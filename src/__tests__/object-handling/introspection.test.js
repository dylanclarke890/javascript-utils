import {
  allTruthy,
  hasCyclicReference,
  isArray,
  isCallable,
  isInt,
  isIntOrIntString,
  isIntString,
  isJSONString,
  isNullOrEmpty,
  isNullOrWhiteSpace,
  isObject,
  isObjectEmpty,
  isObjectLiteral,
  isPrimitiveType,
  isReferenceType,
  isTrue,
  isTruthy,
  isUndefined,
  safeHasOwnProperty,
} from "../../modules/object-handling/introspection";

test("isPrimitiveType returns expected boolean", () => {
  const primitives = [1, "2", false, null, undefined];
  primitives.forEach((val) => expect(isPrimitiveType(val)).toBe(true));

  const references = [[], {}, () => null];
  references.forEach((val) => expect(isPrimitiveType(val)).toBe(false));
});

test("isInt returns expected boolean", () => {
  const valid = 1;
  expect(isInt(valid)).toBe(true);
  const invalid = [new Date(), "1", [], {}, () => null];
  invalid.forEach((val) => expect(isInt(val)).toBe(false));
});

test("isIntString returns expected boolean", () => {
  const valid = "123";
  expect(isIntString(valid)).toBe(true);
  const invalid = "test";
  expect(isIntString(invalid)).toBe(false);
});

test("isIntOrIntString returns expected boolean", () => {
  const valid = ["123", 123];
  valid.forEach((val) => expect(isIntOrIntString(val)).toBe(true));
  const invalid = "test";
  expect(isIntOrIntString(invalid)).toBe(false);
});

test("isNullOrEmpty returns expected boolean", () => {
  const nullStr = null;
  expect(isNullOrEmpty(nullStr)).toBe(true);
  const undefStr = undefined;
  expect(isNullOrEmpty(undefStr)).toBe(true);
  const emptyStr = "";
  expect(isNullOrEmpty(emptyStr)).toBe(true);
  const nonEmptyStr = "test";
  expect(isNullOrEmpty(nonEmptyStr)).toBe(false);
});

test("isNullOrWhitespace returns expected boolean", () => {
  const nullStr = null;
  expect(isNullOrWhiteSpace(nullStr)).toBe(true);
  const undefStr = undefined;
  expect(isNullOrWhiteSpace(undefStr)).toBe(true);
  const whitespaceStr = " ";
  expect(isNullOrWhiteSpace(whitespaceStr)).toBe(true);
  const emptyStr = "";
  expect(isNullOrWhiteSpace(emptyStr)).toBe(false);
});

test("isJSONString returns expected boolean", () => {
  const valid = "1";
  expect(isJSONString(valid)).toBe(true);
  const invalid = "['test'";
  expect(isJSONString(invalid)).toBe(false);
});

test("isTrue returns expected boolean", () => {
  const valid = true;
  expect(isTrue(valid)).toBe(true);
  const invalid = false;
  expect(isTrue(invalid)).toBe(false);
  const num = 1;
  expect(isTrue(num)).toBe(false);
});

test("isTruthy returns expected boolean", () => {
  const valid = [1, "1", true, [], {}];
  valid.forEach((val) => expect(isTruthy(val)).toBe(true));
  const invalid = [0, "", false, null, undefined];
  invalid.forEach((val) => expect(isTruthy(val)).toBe(false));
});

test("allTruthy returns expected boolean", () => {
  const valid = [1, "1", true];
  expect(allTruthy(...valid)).toBe(true);
  const invalid = [0, "", false, null, undefined, [], {}];
  expect(allTruthy(...invalid)).toBe(false);
});

test("isUndefined returns expected boolean", () => {
  const valid = undefined;
  expect(isUndefined(valid)).toBe(true);
  const invalid = [1, "1", {}, [], new Date(), null];
  invalid.forEach((val) => expect(isUndefined(val)).toBe(false));
});

test("isReferenceType returns expected boolean", () => {
  const primitives = [1, "2", false, null, undefined];
  primitives.forEach((val) => expect(isReferenceType(val)).toBe(false));
  const references = [[], {}, () => null];
  references.forEach((val) => expect(isReferenceType(val)).toBe(true));
});

test("isObject returns expected boolean", () => {
  const valid = [{}, { name: "" }, { a: [] }];
  valid.forEach((val) => expect(isObject(val)).toBe(true));
  const invalid = [1, "2", false, null, undefined];
  invalid.forEach((val) => expect(isObject(val)).toBe(false));
});

test("isObjectLiteral returns expected boolean", () => {
  const valid = [{}, { name: "" }, { a: [] }];
  valid.forEach((val) => expect(isObjectLiteral(val)).toBe(true));
  const invalid = [1, "2", false, null, undefined];
  invalid.forEach((val) => expect(isObjectLiteral(val)).toBe(false));
});

test("isObjectEmpty returns expected boolean", () => {
  const valid = {};
  expect(isObjectEmpty(valid)).toBe(true);
  const invalid = { name: "" };
  expect(isObjectEmpty(invalid)).toBe(false);
});

test("isArray returns expected boolean", () => {
  const valid = [[], [12], ["test"], [[]]];
  valid.forEach((val) => expect(isArray(val)).toBe(true));
  const invalid = [{}, 12, "test", () => null];
  invalid.forEach((val) => expect(isArray(val)).toBe(false));
});

test("isCallable returns expected boolean", () => {
  const valid = () => null;
  expect(isCallable(valid)).toBe(true);
  const invalid = [{}, 12, "test", new Date(), []];
  invalid.forEach((val) => expect(isCallable(val)).toBe(false));
});

test("safeHasOwnProperty returns expected boolean", () => {
  const source = { name: "Test", age: 20, pet: "Dog" };
  expect(safeHasOwnProperty(source, "name")).toBe(true);
  expect(safeHasOwnProperty(source, "age")).toBe(true);
  expect(safeHasOwnProperty(source, "pet")).toBe(true);
  expect(safeHasOwnProperty(source, "address")).toBe(false);
});

test("hasCyclicReference returns expected boolean", () => {
  const nonCyclic = { a: 1, b: 3 };
  expect(hasCyclicReference(nonCyclic)).toBe(false);
  const cyclic = { otherData: 123 };
  cyclic.myself = cyclic;
  expect(hasCyclicReference(cyclic)).toBe(true);
});
