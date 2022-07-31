import { chain } from "../../../misc/functional";
import { isArray } from "../../../object-handling/introspection";
import declarativeFactory from "../../../object-handling/declarative-factory";
import { isAOPProxy } from "../../isAOPProxy";
import {
  flatProceedAPIAroundAdviceFactory,
  proceedAPIAroundAdviceFactory,
} from "./factory/aroundAdviceFactory";
import NotImplementedError from "../../../errors/NotImplementedError";

export default class TrapExecutor {
  static isWithinExecContext = false;
  static ExecContextStack = [];
  static ExecContextID = -1;
  static ExecContextMap = {};

  execContextStack = [];
  execContextID = -1;
  /**
   * @static
   * @private
   */
  static newTransversalExecutionContext() {
    const context = {
      finalParams: void 0,
      hasEffectivelyPerformedUnderlyingOperation: false,
    };
    TrapExecutor.ExecContextStack.push(context);
    TrapExecutor.ExecContextID++;
    TrapExecutor.ExecContextMap[TrapExecutor.ExecContextID] = true;
  }

  /**
   * @static
   * @private
   */
  static cleanUpTransversalExecutionContext() {
    TrapExecutor.ExecContextStack.pop();
    const currId = TrapExecutor.ExecContextID;
    TrapExecutor.ExecContextID--;
    if (TrapExecutor.ExecContextMap[currId]) {
      delete TrapExecutor.ExecContextMap[currId];
      TrapExecutor.isWithinExecContext = false;
    }
  }

  static getTransversalExecContextStackData(key, defaultValue = void 0) {
    return TrapExecutor.ExecContextStack[TrapExecutor.ExecContextID]
      ? TrapExecutor.ExecContextStack[TrapExecutor.ExecContextID][key]
      : defaultValue;
  }

  execute(trapArgs, before, around, after) {
    const returnValue = this.withinExecContext(() => {
      this.newExecutionContext();
      this.startExecutionContext(trapArgs);
      this.beforePhase(trapArgs, before);
      const returnValue = this.aroundProceedPhase(trapArgs, around);
      this.afterPhase(trapArgs, after, returnValue);
      this.endExecutionContext(trapArgs);
      this.cleanUpExecutionContext();
      return returnValue;
    });
    return returnValue;
  }

  /**
   * @private
   */
  withinExecContext(callback) {
    let isNewContext = false;
    if (!TrapExecutor.isWithinExecContext) {
      isNewContext = true;
      TrapExecutor.isWithinExecContext = true;
      TrapExecutor.newTransversalExecutionContext();
    }
    const returnValue = callback();
    if (isNewContext) TrapExecutor.cleanUpTransversalExecutionContext();

    return returnValue;
  }

  notWithinExecContext(
    callback,
    { target = void 0, isPerformingUnderlyingOperation = false, proceed } = {}
  ) {
    const current = TrapExecutor.isWithinExecContext;
    const isTargetAOPProxy = target && target[isAOPProxy];
    if (isPerformingUnderlyingOperation && target && !isTargetAOPProxy) {
      TrapExecutor.ExecContextStack[
        TrapExecutor.ExecContextID
      ].hasEffectivelyPerformedUnderlyingOperation = true;
    }
    if (!isTargetAOPProxy) {
      TrapExecutor.isWithinExecContext = false;
    }
    const wrappedProceed = (...args) => {
      const snapshot = TrapExecutor.isWithinExecContext;
      TrapExecutor.isWithinExecContext = current;
      const returnValue = proceed(...args);
      TrapExecutor.isWithinExecContext = snapshot;
      return returnValue;
    };
    const returnValue = callback({ proceed: wrappedProceed });
    TrapExecutor.isWithinExecContext = current;
    return returnValue;
  }

  /**
   * @private
   */
  newExecutionContext() {
    const context = {
      finalParams: void 0,
      hasPerformedUnderlyingOperation: false,
    };
    this.execContextStack.push(context);
    this.execContextID++;
  }

  startExecutionContext(trapArgs) {}

  endExecutionContext(trapArgs) {}

  /**
   * @private
   */
  cleanUpExecutionContext() {
    this.execContextStack.pop();
    this.execContextID--;
  }

  /**
   * @private
   */
  unsupportedMultipleProceeds(advice, rule) {
    throw new Error(`Multiple proceeds for the same around advice are not supported,
    subsequent proceed has been ignored. advice: ${advice}, rule: ${rule}`);
  }

  executeBeforeAdvice(trapArgs, advice, rule) {
    throw new NotImplementedError(this.constructor.name, "executeBeforeAdvice");
  }

  // eslint-disable-next-line no-unused-vars
  executeAroundAdvice(trapArgs, advice, rule, proceed, context) {
    throw new Error(
      `pigretto - ${this.constructor.name} trap executor does not implement "executeAroundAdvice".`
    );
  }

  // eslint-disable-next-line no-unused-vars
  executeAfterAdvice(trapArgs, advice, rule, returnValue) {
    throw new Error(
      `pigretto - ${this.constructor.name} trap executor does not implement "executeAfterAdvice".`
    );
  }

  // eslint-disable-next-line no-unused-vars
  performUnderlyingOperation(trapArgs) {
    throw new Error(
      `pigretto - ${this.constructor.name} trap executor does not implement "performUnderlyingOperation".`
    );
  }

  // eslint-disable-next-line no-unused-vars
  executeProceedCallback(trapArgs, rule, returnValue, callback) {
    throw new Error(
      `pigretto - ${this.constructor.name} trap executor does not implement "executeProceedCallback".`
    );
  }

  /**
   * @private
   */
  beforePhase(trapArgs, before) {
    for (const { rule, advice } of before) {
      this.executeBefore(trapArgs, advice, rule);
    }
  }

  /**
   * @private
   */
  executeBefore(trapArgs, advice, rule) {
    this.executeBeforeAdvice(trapArgs, advice, rule);
  }

  /**
   * @private
   */
  afterPhase(trapArgs, after, returnValue) {
    for (const { rule, advice } of after) {
      this.executeAfter(trapArgs, advice, rule, returnValue);
    }
  }

  /**
   * @private
   */
  executeAfter(trapArgs, advice, rule, returnValue) {
    this.executeAfterAdvice(trapArgs, advice, rule, returnValue);
  }

  /**
   * @private
   */
  aroundProceedPhase(trapArgs, around) {
    const aroundAdvicesMiddlewares = around.map(
      ({ advice, rule }) =>
        ([trapArgs], next) => {
          const aroundAdviceFactory = declarativeFactory([
            [advice.flat, flatProceedAPIAroundAdviceFactory],
            proceedAPIAroundAdviceFactory,
          ]);

          let proceedCallback = void 0;
          let proceedReturnValue = void 0;
          let hasProceeded = false;
          const context = {};
          const proceed = (params = void 0, func = void 0) => {
            if (hasProceeded) {
              this.unsupportedMultipleProceeds(advice, rule);
              return proceedReturnValue;
            }
            hasProceeded = true;
            let finalParams = void 0;
            let finalFunc = void 0;
            if (isArray(params)) {
              finalParams = params;
              finalFunc = typeof func === "function" ? func : void 0;
            } else if (typeof params === "function") finalFunc = params;
            proceedCallback = finalFunc;

            this.execContextStack[this.execContextID].finalParams =
              finalParams ||
              this.execContextStack[this.execContextID].finalParams;
            TrapExecutor.ExecContextStack[
              TrapExecutor.ExecContextID
            ].finalParams =
              this.execContextStack[this.execContextID].finalParams;

            this.onProceed(
              this.execContextStack[this.execContextID].finalParams
            );

            proceedReturnValue = aroundAdviceFactory.proceedWithinProceed({
              trapExecutor: this,
              trapArgs,
              next,
              context,
            });
            return proceedReturnValue;
          };
          const returnValue = this.executeAroundAdvice(
            trapArgs,
            advice,
            rule,
            proceed,
            context
          );
          return hasProceeded
            ? aroundAdviceFactory.proceedOutOfProceed({
                trapExecutor: this,
                trapArgs,
                rule,
                returnValue,
                proceedCallback,
                next,
              })
            : this.onNoProceed(returnValue);
        }
    );
    aroundAdvicesMiddlewares.push(([trapArgs]) => {
      this.execContextStack[
        this.execContextID
      ].hasPerformedUnderlyingOperation = true;
      return this.performUnderlyingOperation(trapArgs);
    });
    const aroundProceedChain = chain(aroundAdvicesMiddlewares);
    let returnValue = aroundProceedChain(trapArgs);
    return this.return(trapArgs, returnValue);
  }

  return(trapArgs, returnValue) {
    return returnValue;
  }

  mutateFlatProceedContext(trapArgs, context) {}

  onProceed(finalParams) {}

  onNoProceed(returnValue) {}
}
