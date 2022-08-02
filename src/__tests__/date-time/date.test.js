import { isValidDate, isValidDateTimeStr } from "../../modules/date-time/date";

describe("isValidDate", () => {
  test("handles undefined argument", () => {
    expect(isValidDate(undefined)).toBe(false);
  });

  test("returns false for invalid date", () => {
    const invalidArgs = [3, "t", [], {}, () => null, null, Symbol("t")];
    for (let invalid in invalidArgs) expect(isValidDate(invalid)).toBe(false);
  });

  test("returns true for valid date", () => {
    const date = new Date();
    expect(isValidDate(date)).toBe(true);
  });
});

describe("isValidDateTimeStr", () => {
  test("handles undefined argument", () => {
    expect(isValidDateTimeStr(undefined)).toBe(false);
  });
  test("returns false for invalid string", () => {
    expect(isValidDateTimeStr("NotADate")).toBe(false);
  });
  test("returns true for valid string", () => {
    const validStrings = [
      "2018-12-30",
      "2018-12-30T20:59",
      "2018-12-30T20:59:00",
      "2018-12-30T20:59:00.000Z",
      "2018-12-30T20:59:00.000+01:00",
      "2018-12-30T20:59:00.000-01:00",
    ];
    for (let valid in validStrings)
      expect(isValidDateTimeStr(valid)).toBe(true);
  });
});
