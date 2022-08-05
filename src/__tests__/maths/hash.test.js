import {
  hashArrayOfStrings,
  hashString,
  hashStringSinglePass,
  hashSumOfIntArray,
  md5Hex,
  revisionHash,
} from "../../modules/maths/hash";

test("revisionHash returns string", () => {
  expect(typeof revisionHash(Buffer.from("test"))).toBe("string");
});

test("hashArrayOfStrings returns number", () => {
  const source = ["test", "ing"];
  expect(typeof hashArrayOfStrings(source)).toBe("number");
});

test("hashString returns number", () => {
  const source = "testing";
  expect(typeof hashString(source)).toBe("number");
});

test("hashStringSinglePass returns number", () => {
  const source = "testing";
  expect(typeof hashStringSinglePass(source)).toBe("number");
});

test("hashSumOfIntArray returns number", () => {
  const source = [1, 2, 3, 4, 5, 6];
  expect(typeof hashSumOfIntArray(source)).toBe("number");
});

test("md5Hex returns string", () => {
  const source = "testing";
  expect(typeof md5Hex(source)).toBe("string");
});
