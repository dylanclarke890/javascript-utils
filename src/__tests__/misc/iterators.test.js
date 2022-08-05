import { generateRange } from "../../modules/misc/iterators";

test("xRange to yield a range of numbers", () => {
  const generator = generateRange(0, 5);
  for (let i = 0; i < 5; i++)
    expect(generator.next()).toStrictEqual({ done: false, value: i });
  expect(generator.next()).toStrictEqual({ done: true, value: 5 });
});
