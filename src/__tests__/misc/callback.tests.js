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
  const funcToDelay = jest.fn();

  const debounced = debounce(funcToDelay, 1000);
  expect(funcToDelay).not.toBeCalled();
  expect(setTimeout).toBeCalled();

  debounced();
  expect(setTimeout).toBeCalled();
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  expect(funcToDelay).not.toBeCalled();

  jest.runAllTimers();
  expect(funcToDelay).toHaveBeenCalledTimes(1);
});
