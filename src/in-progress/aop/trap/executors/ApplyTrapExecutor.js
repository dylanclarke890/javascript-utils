import TrapExecutor from "./TrapExecutor";
import { reflectApply } from "../reflect";
import { withFunctionTrapExecutor } from "./withFunctionTrapExecutor";
import { shallowExtend } from "../../../object-handling/clone";
import { EFFECTIVE_TARGET_PROP } from "../../AOPProxy";

export default withFunctionTrapExecutor(
  class ApplyTrapExecutor extends TrapExecutor {
    getTrapArgsArgumentsListIndex() {
      return 2;
    }

    executeBeforeAdvice([target, thisArg, argumentsList], advice, rule) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        thisArg,
        rule,
      };
      this.notWithinExecContext(() => {
        advice.fn.apply(context, argumentsList);
      });
    }

    executeAroundAdvice(
      [target, thisArg, argumentsList],
      advice,
      rule,
      proceed,
      context
    ) {
      shallowExtend(context, {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        thisArg,
        rule,
        flat: advice.flat,
      });
      const returnValue = this.notWithinExecContext(
        ({ proceed }) => {
          const returnValue = advice.fn
            .call(context, proceed)
            .apply(context, argumentsList);
          return returnValue;
        },
        { proceed }
      );
      return returnValue;
    }

    executeAfterAdvice(
      [target, thisArg, argumentsList],
      advice,
      rule,
      returnValue
    ) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        thisArg,
        rule,
        effectiveArgumentsList:
          TrapExecutor.getTransversalExecContextStackData(
            "finalParams",
            argumentsList
          ) || [],
        hasPerformedUnderlyingOperation:
          this.execContextStack[this.execContextID]
            .hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation:
          TrapExecutor.getTransversalExecContextStackData(
            "hasEffectivelyPerformedUnderlyingOperation"
          ),
      };
      this.notWithinExecContext(() => {
        advice.fn.call(context, ...argumentsList).apply(context, [returnValue]);
      });
    }

    performUnderlyingOperation([target, thisArg, argumentsList]) {
      const returnValue = this.notWithinExecContext(
        () => {
          const returnValue = reflectApply(target, thisArg, argumentsList);
          return returnValue;
        },
        { target, isPerformingUnderlyingOperation: true }
      );
      return returnValue;
    }

    executeProceedCallback(
      [target, thisArg, argumentsList],
      rule,
      returnValue,
      callback
    ) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        thisArg,
        rule,
        argumentsList,
        effectiveArgumentsList:
          TrapExecutor.getTransversalExecContextStackData(
            "finalParams",
            argumentsList
          ) || [],
        hasPerformedUnderlyingOperation:
          this.execContextStack[this.execContextID]
            .hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation:
          TrapExecutor.getTransversalExecContextStackData(
            "hasEffectivelyPerformedUnderlyingOperation"
          ),
      };
      return this.notWithinExecContext(() => {
        return callback.apply(context, [returnValue]);
      });
    }
  }
);
