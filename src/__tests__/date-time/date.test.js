import { isValidDate } from "../../modules/date-time/date";

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
