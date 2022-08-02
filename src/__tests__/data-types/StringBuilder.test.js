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
  expectSbValToBe(sb, "test");
  expectSbValToBe(sb.append("ing"), "testing");
});

test("prepending a value then reading returns expected string.", () => {
  const sb = new StringBuilder("ing");
  expectSbValToBe(sb, "ing");
  expectSbValToBe(sb.prepend("test"), "testing");
});

test("inserting a value then reading returns expected string.", () => {
  const sb = new StringBuilder("tst");
  expectSbValToBe(sb, "tst");
  expectSbValToBe(sb.insertAt(1, "e"), "test");
});

describe("replacing a value", () => {
  test("using a string as parameter then reading returns expected string", () => {
    const sb = new StringBuilder("testing");
    expectSbValToBe(sb, "testing");
    expectSbValToBe(sb.replace("ing", "ed"), "tested");
  });
  test("using a RegExp as parameter then reading returns expected string", () => {
    const sb = new StringBuilder("testing");
    expectSbValToBe(sb, "testing");
    const regEx = new RegExp(/ing/i);
    expectSbValToBe(sb.replace(regEx, "ed"), "tested");
  });
});
