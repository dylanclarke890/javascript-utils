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

test("now uses fallback if Date.now is not available ", () => {
  Date.now = jest.fn(() => null);
  expect(now()).toBeGreaterThan(0);
});

test("time returns expected number of seconds", () => {
  Date.now = jest.fn(() => 10000);
  expect(time()).toBe(10);
});

test("msToTime returns expected string", () => {
  Date.now = jest.fn(() => 100001);
  expect(msToTime()).toBe("01:01:40.001");
});

// TODO: test cases for secsToTimeString
// TODO: test cases for parseMilliseconds
// TODO: test cases for prettifyMilliseconds
// TODO: test cases for objToMilliseconds
// TODO: test cases for timeZone
