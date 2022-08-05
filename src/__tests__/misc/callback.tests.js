import { throttle, debounce, delay } from "../../modules/misc/callbacks";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("delay waits one seconds before calling delayed func", () => {
  const funcToDelay = jest.fn();
  delay(funcToDelay, 1000);

  expect(funcToDelay).not.toBeCalled();
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

  jest.runAllTimers();
  expect(funcToDelay).toHaveBeenCalledTimes(1);
});

test("debounce returns a function with a delay", () => {
  const func = jest.fn();

  const debouncedFunc = debounce(func, 1000);
  expect(func).not.toBeCalled();
  expect(setTimeout).toBeCalled();

  debouncedFunc();
  expect(setTimeout).toBeCalled();
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  expect(func).not.toBeCalled();

  jest.runAllTimers();
  expect(func).toHaveBeenCalledTimes(1);
});

test("throttle limits the amount of calls a function receives", () => {
  Date.now = jest.fn(() => 3000);
  const func = jest.fn();
  const throttledFunc = throttle(func, 1000);
  for (let i = 0; i < 5; i++) throttledFunc();
  expect(func).not.toBeCalled();

  Date.now = jest.fn().mockImplementationOnce(() => 10000);
  throttledFunc();
  expect(func).toBeCalledTimes(1);
});
