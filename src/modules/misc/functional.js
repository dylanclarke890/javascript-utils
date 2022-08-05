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

const curryPlaceholderProp = "curryPlaceholderPropRPecoyYmCYqZ2lE";
/**
 * Curry function placeholder.
 *
 * @type {Object}
 */
export const _ = {
  [curryPlaceholderProp]: true,
};
const proceedCallingFnProp = "proceedCallingFnPropRBmGaAgOCgftF9t";
/**
 * Return value of "onFnCall" to call the curried function and return its value.
 *
 * @type {Object}
 */
export const proceedCallingFn = {
  [proceedCallingFnProp]: true,
};

/**
 * Curries a function.
 * @see https://medium.com/@kj_huang/implementation-of-lodash-curry-function-8b1024d71e3b
 * @param {Function} fn A function to curry in order to return the curried version of the
 * function.
 * @param {Object} [obj] An optional object with further properties to tweak the currying
 * behaviour and execute code while collecting the arguments of the curried function.
 * @param {number|undefined} [obj.arity] The arity of the function, i.e. its number of arguments.
 * If omitted, "fn.length" will be used.
 * @param {Function|undefined} [obj.onEffectiveArgAdded] An optional callback to execute whenever
 * a new effective argument (not a placeholder) is added to the curried function.
 * The callback will receive an object with the following properties as argument:
 * - addedArg: The effective argument added
 * - args: An array with all the previously arguments collected so far without considering "addedArg"
 * - fn: The function "fn";
 * - curriedFn: The current curried function
 * The return value of the function is ignored.
 * @param {Function|undefined} [obj.onPlaceholder] An optional callback to execute whenever a
 * new placeholder is added to the curried function. The callback will receive an object with
 * the following properties as argument:
 * - args: An array with all the previously arguments collected so far without considering "addedArg"
 * - fn: The function "fn"
 * - curriedFn: The current curried function
 * The return value of the function is ignored.
 * @param {Function|undefined} [obj.onFnCall] An optional callback to execute just before
 * calling the "fn" function (i.e. when the "fn" function is ready to be called and all its
 * arguments have been collected). The callback will receive an object with the following properties
 * as argument:
 * - args: The array of the effective arguments of the "fn" function;
 * - fn: The function "fn" which was initially passed to "curry";
 * - curriedFn: The current curried function;
 * This way, the code of the callback may decide what to do and may even call the function on
 * its own and prevent the call from the caller side (i.e. within the "curry" function).
 * The callback must explicitly tell "curry" to call the function by returing "proceedCallingFn".
 * If the callback returns any other value, then "fn" will not be called in "curry" and the
 * return value of this callback will be returned.
 * @param {Function|undefined} [obj.onCurriedFnFirstCall] An optional callback to execute only
 * the first time when the first curried function returned by "curry" is invoked for the very
 * first time with the very first argument or arguments. The callback will receive an object with
 * the following properties as argument:
 * - addedArgs: The arguments provided by the caller
 * - fn: The "fn" function
 * - curriedFn: The current curried function
 * @param {Function|undefined} [obj.onNewCurriedFn] An optional callback to execute initially
 * and each time a new curried function is going to be returned. The callback will an object
 * with the following properties as argument:
 * - curriedFn: The current curried function (same as "newCurriedFn" when this callback is invoked
 * for the very first time);
 * - newCurriedFn: The new curried function (will be the same as "curriedFn" when this callback
 * is invoked for the very first time);
 * @return {Function} The curried version of the function.
 */
export const curry = (
  fn,
  {
    arity = void 0,
    onEffectiveArgAdded = void 0,
    onPlaceholder = void 0,
    onFnCall = void 0,
    onCurriedFnFirstCall = void 0,
    onNewCurriedFn = void 0,
  } = {}
) => {
  let curriedFnFirstCall = true;

  const expectedNumberOfArgs = typeof arity !== "undefined" ? arity : fn.length;
  const nextParameterIndex = 0;
  const placeholdersIndices = [];

  const curriedInner = (
    expectedNumberOfArgs,
    nextParameterIndex,
    placeholdersIndices,
    ...args
  ) =>
    function curriedFn(...addedArgs) {
      let newExpectedNumberOfArgs = expectedNumberOfArgs;
      let newNextParameterIndex = nextParameterIndex;
      let newPlaceholdersIndices = null;
      let argsRequiredChange = false;
      curriedFnFirstCall &&
        ((onCurriedFnFirstCall &&
          onCurriedFnFirstCall({ addedArgs, fn, curriedFn })) ||
          true) &&
        (curriedFnFirstCall = false);
      let numberOfConsumablePlaceholders = placeholdersIndices.length;
      for (const addedArg of addedArgs) {
        !argsRequiredChange && (args = [...args]);
        argsRequiredChange = true;
        // "addedArg" may be either a placeholder or an effective argument.
        const isPlaceholder = addedArg
          ? addedArg[curryPlaceholderProp] === _[curryPlaceholderProp]
          : false;
        if (numberOfConsumablePlaceholders > 0 && !isPlaceholder) {
          // Argument is an effective argument consuming a previously set placeholder.
          onEffectiveArgAdded &&
            onEffectiveArgAdded({ addedArg, args, fn, curriedFn });
          let argIndex;
          if (newPlaceholdersIndices === null) {
            const [firstIndex, ...rest] = placeholdersIndices;
            argIndex = firstIndex;
            newPlaceholdersIndices = rest;
          } else argIndex = newPlaceholdersIndices.shift();

          args[argIndex] = addedArg;
          numberOfConsumablePlaceholders--;
          newExpectedNumberOfArgs--;
        } else {
          if (isPlaceholder) {
            // Argument is a new placeholder.
            if (newPlaceholdersIndices === null) {
              newPlaceholdersIndices = placeholdersIndices.concat(
                newNextParameterIndex
              );
            } else newPlaceholdersIndices.push(newNextParameterIndex);

            onPlaceholder && onPlaceholder({ args, fn, curriedFn });
          } else {
            // Argument is an effective argument.
            newExpectedNumberOfArgs--;
            onEffectiveArgAdded &&
              onEffectiveArgAdded({ addedArg, args, fn, curriedFn });
          }
          args[newNextParameterIndex] = addedArg;
          newNextParameterIndex++;
        }
      }
      return curried.call(
        null,
        curriedFn,
        newExpectedNumberOfArgs,
        newNextParameterIndex,
        newPlaceholdersIndices === null
          ? [...placeholdersIndices]
          : newPlaceholdersIndices,
        ...args
      );
    };

  const curried = (
    curriedFn,
    expectedNumberOfArgs,
    nextParameterIndex,
    placeholdersIndices,
    ...args
  ) => {
    if (expectedNumberOfArgs <= 0) {
      if (onFnCall) {
        const shouldCallCurriedFn = onFnCall({ args, fn, curriedFn });
        if (
          shouldCallCurriedFn &&
          shouldCallCurriedFn[proceedCallingFnProp] ===
            proceedCallingFn[proceedCallingFnProp]
        ) {
          return fn(...args);
        } else return shouldCallCurriedFn;
      } else return fn(...args);
    } else {
      const newCurried = curriedInner(
        expectedNumberOfArgs,
        nextParameterIndex,
        placeholdersIndices,
        ...args
      );
      onNewCurriedFn && onNewCurriedFn({ curriedFn, newCurriedFn: newCurried });
      return newCurried;
    }
  };

  const newCurried = curriedInner(
    expectedNumberOfArgs,
    nextParameterIndex,
    placeholdersIndices
  );
  onNewCurriedFn &&
    onNewCurriedFn({ curriedFn: newCurried, newCurriedFn: newCurried });
  return newCurried;
};
