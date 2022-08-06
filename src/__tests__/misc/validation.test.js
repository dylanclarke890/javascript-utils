import { validatePassword } from "../../modules/misc/validation";

describe("validatePassword", () => {
  test("returns true by default for a valid strong password", () => {
    const strongPassword = "HasCapNumNSym123!";
    const res = validatePassword(strongPassword);
    expect(res[0]).toBe(true);
    expect(res[1]).toStrictEqual({
      correctLength: true,
      hasLower: true,
      hasNumber: true,
      hasSpecial: true,
      hasUpper: true,
    });
  });

  test("returns false by default for a invalid strong password", () => {
    const strongPassword = "HasCapNumNSym";
    const res = validatePassword(strongPassword);
    expect(res[0]).toBe(false);
    expect(res[1]).toStrictEqual({
      correctLength: true,
      hasLower: true,
      hasNumber: false,
      hasSpecial: false,
      hasUpper: true,
    });
  });

  describe("skipping detailed check", () => {
    test("returns true for a strong password", () => {
      const strongPassword = "HasCapNumNSym123!";
      const res = validatePassword(strongPassword, { skipDetailedCheck: true });
      expect(res[0]).toBe(true);
      expect(res[1]).toStrictEqual({});
    });
    test("returns false for an invalid strong password", () => {
      const strongPassword = "HasCapNumNSym";
      const res = validatePassword(strongPassword, { skipDetailedCheck: true });
      expect(res[0]).toBe(false);
      expect(res[1]).toStrictEqual({});
    });
  });
});