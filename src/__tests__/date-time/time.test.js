import {
  now,
  time,
  msToTime,
  secsToTimeString,
  parseMilliseconds,
  prettifyMilliseconds,
  objToMilliseconds,
  timeZone,
} from "../../modules/date-time/time";

describe("now", () => {
  test("uses fallback if Date.now is not available", () => {
    Date.now = jest.fn(() => null);
    expect(now()).toBeGreaterThan(0);
  });
  // TODO: test cases for now
});

// TODO: test cases for time
// TODO: test cases for msToTime
// TODO: test cases for secsToTimeString
// TODO: test cases for parseMilliseconds
// TODO: test cases for prettifyMilliseconds
// TODO: test cases for objToMilliseconds
// TODO: test cases for timeZone
