import BaseError from "./BaseError";

export default class NotImplementedError extends BaseError {
  constructor(constructorName, methodName) {
    super(`${constructorName} does not implement ${methodName}.`);
  }
}
