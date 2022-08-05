import {
  chain,
  curry,
  noActionFunc,
  pick,
} from "../../modules/misc/functional";

test("curry returns a curried function", () => {
  const funcToCurry = jest.fn((arg1, arg2, arg3) => [arg1, arg2, arg3]);
  const curried = curry(funcToCurry);
  expect(typeof curried(1)).toBe("function");
  expect(typeof curried(1)(2)).toBe("function");
  expect(curried(1, 2, 3)).toStrictEqual([1, 2, 3]);
  expect(curried(1, 2)(3)).toStrictEqual([1, 2, 3]);
  expect(curried(1)(2)(3)).toStrictEqual([1, 2, 3]);
});

test("chain returns a chained function", () => {
  function is(x) {
    return {
      plus: (plus) => {
        return is(Number(x) + Number(plus));
      },
      minus: (minus) => {
        return is(Number(x) + Number(minus));
      },
      equalToTen: () => {
        return x === 10;
      },
      print: () => console.log(x),
    };
  }

  const chained = chain(is);
  expect(chained(5).plus(5).equalToTen()).toBe(true);
});

test("noActionFunc returns undefined", () => {
  expect(noActionFunc()).toBeUndefined();
});

test("pick returns a function that gets the expected properties from an object", () => {
  const props = ["first", "last", "age"];
  const obj = { first: "Test", last: "ing", age: 10, pet: "dog" };
  const picker = pick(...props);
  expect(picker(obj)).toStrictEqual({ first: "Test", last: "ing", age: 10 });
});
