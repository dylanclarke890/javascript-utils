import { deepFreeze } from "../../modules/object-handling/immutability";

test("deepFreeze throws error on property access", () => {
  const source = { a: { b: 1, c: 2 }, d: 3 };
  const frozen = deepFreeze(source);
  expect(() => (frozen.a.b = 3)).toThrowError(TypeError);
  expect(() => (frozen.a.c = 3)).toThrowError(TypeError);
  expect(() => (frozen.d = 4)).toThrowError(TypeError);
});
