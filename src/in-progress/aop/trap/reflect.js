export function reflectApply(target, thisArg, argumentsList) {
  return Reflect.apply(target, thisArg, argumentsList);
}

export function reflectConstruct(target, argumentsList, newTarget) {
  return newTarget
    ? Reflect.construct(target, argumentsList, newTarget)
    : new target(...argumentsList);
}

export function reflectGet(target, property, receiver) {
  return Reflect.get(target, property, receiver);
}

export function reflectSet(target, property, value, receiver) {
  return Reflect.set(target, property, value, receiver);
}
