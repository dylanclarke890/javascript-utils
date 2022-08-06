import declarativeFactory from "../../modules/object-handling/declarative-factory";

describe("declarativeFactory", () => {
  test("returns a factory if func condition is met", () => {
    const factory = new declarativeFactory([[() => true, () => true]]);
    expect(factory()).toBe(true);
  });

  test("returns default if func condition is not met", () => {
    const factory = new declarativeFactory([
      [() => false, () => true],
      () => 5,
    ]);
    expect(factory()).toBe(5);
  });
});
