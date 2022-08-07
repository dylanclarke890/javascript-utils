import NotImplementedError from "../../errors/NotImplementedError";

export const throwErrorIfDoesNotImplement = (
  context,
  methodName,
  constructorFn
) => {
  if (typeof context[methodName] !== "function")
    throw new NotImplementedError(constructorFn.name, methodName);
};
