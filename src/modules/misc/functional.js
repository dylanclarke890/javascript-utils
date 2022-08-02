function chainLink(func, next) {
  return (args) => func(args, next && ((...args) => next(args)));
}

/**
 * A higher-order function to create a chain of functions following the Chain of
 * Responsibility design pattern.
 * @param {...Function|...Function[]} funcs A list of functions or higher-order functions
 * or arrays of functions (arrays will be flattened) to chain.
 * @return {Function} A function representing the chain of the given functions which, if called,
 * will return the result of the chain. Each function will receive the next function as its
 * last parameter.
 */
export function chain(...funcs) {
  return (...args) => {
    funcs = funcs.flat(1);
    const chainFunc = funcs.reduceRight(
      (nextChainLink, func) => chainLink(func, nextChainLink),
      void 0
    );
    return chainFunc(args);
  };
}

export function noActionFunc() {
  return void 0;
}

/**
 * Returns a function which lets picking the properties of an object.
 * @param {...string|...number} props The properties to pick.
 * @return {Function} A function which if called picks the "props" properties from its argument
 * object and returns a new object with the picked properties.
 */
export function pick(...props) {
  return (o) => props.reduce((a, e) => ({ ...a, [e]: o[e] }), {});
}
