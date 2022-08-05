import { throttle, debounce, delay } from "../../modules/misc/callbacks";

jest.useFakeTimers();
jest.spyOn(global, "setTimeout");

test("waits 1 second before ending the game", () => {
  const funcToDelay = () => null;
  delay(funcToDelay, 1000);
  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
