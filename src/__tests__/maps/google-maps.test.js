import { bestZoomForBounds } from "../../modules/maps/google-maps";

describe("bestZoomForBounds", () => {
  test("should handle invalid args", () => {
    const invalidArgs = [[null, null], [1, 2], [["", ""]]];
    for (let [arg1, arg2] in invalidArgs)
      expect(bestZoomForBounds(arg1, arg2)).toBe(null);
  });

  // TODO: implement a test to ensure it returns the expected value.
  // Needs to have access to LatLngBounds (a google maps object) or
  // to mock the relevant funcs.
});
