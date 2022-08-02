import { StringBuilder } from "../../modules/data-types/StringBuilder";

test("Creating new instance with data sets that data as the initial value.", () => {
  const testData = "some data";
  const sb = new StringBuilder(testData);
  expect(sb.toString()).toBe(testData);
});

test("The length property returns the correct value when read.", () => {
  const sb = new StringBuilder();
  expect(sb.length).toBe(0);
  sb.append("aaaaa");
  expect(sb.length).toBe(5);
});
