import {
  randomFromRange,
  randomHSLColor,
  randomNumber,
  randomValue,
  shuffleArr,
  uniqueRandom,
  uniqueRandomFromArr,
} from "../../modules/maths/random";

expect.extend({
  toBeInRange(recieved, expected = { from: 0, to: 0 }) {
    const { from, to } = expected;
    let pass = recieved >= from && recieved <= to;
    let message = () =>
      `Value should be in the range a minute of ${from} and ${to}. ` +
      `Received: ${recieved}`;
    return { pass, message };
  },
});

test("randomFromRange returns number in range", () => {
  expect(randomFromRange(1, 4)).toBeInRange({ from: 1, to: 4 });
});

test("randomNumber returns number in range", () => {
  expect(randomNumber(4)).toBeInRange({ from: 0, to: 4 });
});

test("randomValue returns a value from the array", () => {
  const source = [1, 3, 5, 8, 9];
  const res = randomValue(source);
  expect(source.some((v) => v === res)).toBe(true);
});

test("shuffleArr returns a shuffled array", () => {
  const source = [1, 3, 5, 8, 9];
  const orig = source.slice(0);
  const res = shuffleArr(source);
  expect(res.every((v) => orig.some((ov) => ov === v))).toBe(true);
  expect(res).not.toStrictEqual(orig);
});

test("randomHSLColor returns a string in the expected format", () => {
  // e.g hsl(100, 100%, 100%);
  const expected = new RegExp(/hsl\((\d{1,3}), (\d{1,3})%, (\d{1,3})%\)/g);
  const res = randomHSLColor(100, 100);
  expect(expected.test(res)).toBe(true);
});

test("uniqueRandom doesn't return the same number twice in a row", () => {
  const uniqRand = uniqueRandom(0, 10);
  let prev = uniqRand();
  for (let i = 0; i < 20; i++) {
    const curr = uniqRand();
    expect(curr).not.toBe(prev);
    prev = curr;
  }
});

test("uniqueRandomFromArray doesn't return the same value twice in a row", () => {
  const source = [1, 2, 3, 4, 5, 6];
  const uniqRand = uniqueRandomFromArr(source);
  let prev = uniqRand();
  for (let i = 0; i < 20; i++) {
    const curr = uniqRand();
    expect(curr).not.toBe(prev);
    prev = curr;
  }
});
