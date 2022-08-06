import { bestZoomForBounds } from "../../modules/maps/google-maps";

describe("bestZoomForBounds", () => {
  test("should handle invalid args", () => {
    const invalidArgs = [[null, null], [1, 2], [["", ""]]];
    for (let [arg1, arg2] in invalidArgs)
      expect(bestZoomForBounds(arg1, arg2)).toBe(null);
  });
});
