import {
  isSamePosition,
  makePositionObj,
} from "../../modules/maps/geolocation";

describe("isSamePosition", () => {
  test("handles invalid args", () => {
    const invalidArgs = [
      [null, null],
      ["invalid", "invalid"],
      [1, 3],
      [{}, {}],
      [{}, { coords: {} }],
    ];
    for (let [first, second] in invalidArgs)
      expect(isSamePosition(first, second)).toBe(false);
  });
  test("returns false for inequal objects", () => {
    const first = {
        coords: {
          latitude: 1,
        },
      },
      second = {
        coords: {
          latitude: 10,
        },
      };

    expect(isSamePosition(first, second)).toBe(false);
  });
  test("returns true for equal objects", () => {
    const first = {
        coords: {
          latitude: 1,
          longitude: 12,
          altitude: 14,
          accuracy: "78%",
          altitudeAccuracy: 12,
          heading: 12,
          speed: 12,
        },
      },
      second = first;
    expect(isSamePosition(first, second)).toBe(true);
  });
});

describe("makePositionObj", () => {
  test("handles invalid args", () => {
    const invalidArgs = [
      null,
      {
        latitude: 1,
        longitude: 12,
        altitude: 14,
        accuracy: "78%",
        altitudeAccuracy: 12,
        heading: 12,
        speed: 12,
      },
      1,
      "1",
      new Date(),
    ];
    for (let arg in invalidArgs) expect(makePositionObj(arg)).toBe(null);
  });
  test("returns expected obj", () => {
    const input = {
        timestamp: 12,
        coords: {
          latitude: 1,
          longitude: 12,
          altitude: 14,
          accuracy: "78%",
          altitudeAccuracy: 12,
          heading: 12,
          speed: 12,
        },
        extraData: { asd: "asd" },
      },
      output = {
        timestamp: 12,
        coords: {
          latitude: 1,
          longitude: 12,
          altitude: 14,
          accuracy: "78%",
          altitudeAccuracy: 12,
          heading: 12,
          speed: 12,
        },
      };
    expect(makePositionObj(input)).toStrictEqual(output);
  });
});
