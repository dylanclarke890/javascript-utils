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

test("secsToTimeString returns expected string", () => {
  const secs = 123;
  const secsOnly = secsToTimeString(secs);
  const includeHrs = secsToTimeString(secs, true);
  expect(secsOnly).toBe("02:03");
  expect(includeHrs).toBe("00:02:03");
});

test("parseMilliseconds returns expected value", () => {
  const ms = 10000000;
  const res = parseMilliseconds(ms);
  expect(res).toStrictEqual({
    days: 0,
    hours: 2,
    microseconds: 0,
    milliseconds: 0,
    minutes: 46,
    nanoseconds: 0,
    seconds: 40,
  });
});

test("prettifyMilliseconds returns expected value", () => {
  const ms = 1337000000;
  expect(prettifyMilliseconds(ms)).toBe("15d 11h 23m 20s");
});

test("objToMilliseconds returns expected ms", () => {
  const source = {
    days: 15,
    hours: 11,
    minutes: 23,
    seconds: 20,
  };
  expect(objToMilliseconds(source)).toBe(1337000000);
});

test("timeZone returns expected string", () => {
  const date = new Date(2022, 0, 1);
  expect(timeZone(date)).toBe("-0");
});