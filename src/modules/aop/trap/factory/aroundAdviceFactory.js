import { noActionFunc } from "../../../misc/functional";

/**
 * @type {Object}
 */
export const proceedAPIAroundAdviceFactory = {
  proceedWithinProceed: noActionFunc,
  proceedOutOfProceed: ({
    trapExecutor,
    trapArgs,
    rule,
    returnValue,
    proceedCallback,
    next,
  }) => {
    returnValue = next(trapArgs);
    if (typeof proceedCallback === "function") {
      returnValue = trapExecutor.executeProceedCallback(
        trapArgs,
        rule,
        returnValue,
        proceedCallback
      );
    }
    return returnValue;
  },
};

/**
 * @type {Object}
 */
export const flatProceedAPIAroundAdviceFactory = {
  proceedWithinProceed: ({ trapExecutor, trapArgs, next, context }) => {
    let returnValue;
    let hasMutatedContext = false;
    try {
      returnValue = next(trapArgs);
      trapExecutor.mutateFlatProceedContext(trapArgs, context);
      hasMutatedContext = true;
    } catch (e) {
      !hasMutatedContext &&
        trapExecutor.mutateFlatProceedContext(trapArgs, context);
      throw e;
    }
    return returnValue;
  },
  proceedOutOfProceed: ({ returnValue }) => returnValue,
};
