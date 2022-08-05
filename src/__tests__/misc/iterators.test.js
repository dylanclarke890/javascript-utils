import { generateRange, mapYield } from "../../modules/misc/iterators";

test("xRange to yield a range of numbers", () => {
  const generator = generateRange(0, 5);
  for (let i = 0; i < 5; i++)
    expect(generator.next()).toStrictEqual({ done: false, value: i });
  expect(generator.next()).toStrictEqual({ done: true, value: 5 });
});

test("mapYield to yield mapped items", () => {
  const source = [1, 2, 3];
  const res = 1;
  const func = (val, _, _) => res + val;
  const generator = mapYield(source, func);
  expect(generator.next()).toStrictEqual({ done: false, value: 2 });
  expect(generator.next()).toStrictEqual({ done: false, value: 3 });
  expect(generator.next()).toStrictEqual({ done: false, value: 4 });
  expect(generator.next()).toStrictEqual({ done: true, value: undefined });
});
