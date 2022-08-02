import { StringBuilder } from "../../modules/data-types/StringBuilder";

const expectSbValToBe = (sb, val) => expect(sb.toString()).toBe(val);

test("Creating new instance with data sets that data as the initial value.", () => {
  const testData = "some data";
  const sb = new StringBuilder(testData);
  expectSbValToBe(sb, testData);
});

test("length property returns the correct value when read.", () => {
  const sb = new StringBuilder();
  expect(sb.length).toBe(0);
  sb.append("aaaaa");
  expect(sb.length).toBe(5);
});

test("hasValue property returns the correct value when read.", () => {
  const sb = new StringBuilder();
  expect(sb.hasValue).toBe(false);
  sb.append("aaaaa");
  expect(sb.hasValue).toBe(true);
});

test("appending a value then reading returns expected string.", () => {
  const sb = new StringBuilder("test");
  expect(sb.toString()).toBe("test");
  expectSbValToBe(sb.append("ing"), "testing");
});

test("prepending a value then reading returns expected string.", () => {
  const sb = new StringBuilder("ing");
  expect(sb.toString()).toBe("ing");
  expectSbValToBe(sb.prepend("test"), "testing");
});

test("inserting a value then reading returns expected string.", () => {
  const sb = new StringBuilder("tst");
  expect(sb.toString()).toBe("tst");
  expectSbValToBe(sb.insertAt(1, "e"), "test");
});
