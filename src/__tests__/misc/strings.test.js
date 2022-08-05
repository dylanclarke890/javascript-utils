import {
  getDigits,
  intSeparateThousands,
  pluralize,
  splitOnFirst,
  toDoubleQuotes,
  toSingleQuotes,
  trim,
  trimEnd,
  trimStart,
  typeToStr,
} from "../../modules/misc/strings";

test("getDigits returns only numbers in string form", () => {
  expect(getDigits("testing123")).toBe("123");
  expect(getDigits("753247532.asdas3/3g")).toBe("75324753233");
});

test("intSeparateThousands returns expected string", () => {
  expect(intSeparateThousands(100)).toBe("100");
  expect(intSeparateThousands(1000)).toBe("1,000");
  expect(intSeparateThousands(10000)).toBe("10,000");
  expect(intSeparateThousands(100000)).toBe("100,000");
  expect(intSeparateThousands(100000000)).toBe("100,000,000");
});

describe("trim", () => {
  test("returns a string trimmed on both sides by default", () => {
    const testString = " test ";
    expect(trim(testString)).toBe("test");
  });

  test("returns a string trimmed only at the end if specified", () => {
    const testString = " test ";
    expect(trim(testString, " ", { trimLeft: true, trimRight: false })).toBe(
      "test "
    );
  });

  test("returns a string trimmed only at the end if specified", () => {
    const testString = " test ";
    expect(trim(testString, " ", { trimLeft: false, trimRight: true })).toBe(
      " test"
    );
  });
});

test("trimStart returns expected string", () => {
  const testString = " test ";
  expect(trimStart(testString)).toBe("test ");
});

test("trimEnd returns expected string", () => {
  const testString = " test ";
  expect(trimEnd(testString)).toBe(" test");
});

test("pluralize returns expected string", () => {
  expect(pluralize("test", 1)).toBe("test");
  expect(pluralize("test", 2)).toBe("tests");
});

test("typeToStr returns expected strings", () => {
  expect(typeToStr(1)).toBe("[object Number]");
  expect(typeToStr([])).toBe("[object Array]");
  expect(
    typeToStr(() => {
      null;
    })
  ).toBe("[object Function]");
});

test("splitOnFirst returns the expected array", () => {
  const testWS = "testing splitting on whitespace";
  const testSlash = "testing/splitting/on/slash";
  expect(splitOnFirst(testWS, " ")).toStrictEqual([
    "testing",
    "splitting on whitespace",
  ]);
  expect(splitOnFirst(testWS, "/")).toStrictEqual([]);
  expect(splitOnFirst(testSlash, "/")).toStrictEqual([
    "testing",
    "splitting/on/slash",
  ]);
  expect(splitOnFirst(testSlash, " ")).toStrictEqual([]);
});

test("toSingleQuotes transforms singles to doubles", () => {
  const testString = `""Testing"" "Doubles to singles ""`;
  expect(toSingleQuotes(testString)).toBe(`''Testing'' 'Doubles to singles ''`);
});

test("toDoubleQuotes transforms singles to doubles", () => {
  const testString = `''Testing'' 'Doubles to singles ''`;
  expect(toDoubleQuotes(testString)).toBe(`""Testing"" "Doubles to singles ""`);
});
