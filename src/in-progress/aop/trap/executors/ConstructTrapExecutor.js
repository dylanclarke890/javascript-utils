import TrapExecutor from "./TrapExecutor";
import { reflectConstruct } from "../reflect";
import { withFunctionTrapExecutor } from "./behaviours/withFunctionTrapExecutor";
import { shallowExtend } from "../../../object-handling/clone";
import { EFFECTIVE_TARGET_PROP } from "../../AOPProxy";

export default withFunctionTrapExecutor(
  class ConstructTrapExecutor extends TrapExecutor {
    getTrapArgsArgumentsListIndex() {
      return 1;
    }

    executeBeforeAdvice([target, argumentsList, newTarget], advice, rule) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        newTarget,
        rule,
      };
      this.notWithinExecContext(() => {
        advice.fn.apply(context, argumentsList);
      });
    }

    executeAroundAdvice(
      [target, argumentsList, newTarget],
      advice,
      rule,
      proceed,
      context
    ) {
      shallowExtend(context, {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        newTarget,
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
      [target, argumentsList, newTarget],
      advice,
      rule,
      instance
    ) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        newTarget,
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
        advice.fn.call(context, ...argumentsList).apply(context, [instance]);
      });
    }

    performUnderlyingOperation([target, argumentsList, newTarget]) {
      const instance = this.notWithinExecContext(
        () => {
          const instance = reflectConstruct(target, argumentsList, newTarget);
          return instance;
        },
        { target, isPerformingUnderlyingOperation: true }
      );
      return instance;
    }

    executeProceedCallback(
      [target, argumentsList, newTarget],
      rule,
      instance,
      callback
    ) {
      const context = {
        target,
        effectiveTarget: target[EFFECTIVE_TARGET_PROP] || target,
        newTarget,
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
        return callback.apply(context, [instance]);
      });
    }
  }
);
