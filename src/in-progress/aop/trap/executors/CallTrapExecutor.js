import TrapExecutor from "./TrapExecutor";
import { withFunctionTrapExecutor } from "./behaviours/withFunctionTrapExecutor";
import { shallowExtend } from "../../../object-handling/clone";
import { EFFECTIVE_TARGET_PROP } from "../../AOPProxy";

export default withFunctionTrapExecutor(
  class CallTrapExecutor extends TrapExecutor {
    getTrapArgsArgumentsListIndex() {
      return 4;
    }

    execute(
      [target, property, receiver, propertyValue],
      before,
      around,
      after
    ) {
      if (
        typeof propertyValue === "function" &&
        [before, around, after].some(
          (advices) => advices && advices.length !== 0
        )
      ) {
        const superExecute = (trapArgs) => {
          return super.execute(trapArgs, before, around, after);
        };
        const wrapperFn = function (...args) {
          let boundThis = this !== receiver ? this : target;
          const originalFn = propertyValue.bind(boundThis);
          const trapArgs = [target, property, receiver, originalFn, args];
          const returnValue = superExecute(trapArgs);
          return returnValue;
        };
        return wrapperFn;
      }
      return propertyValue;
    }

    executeBeforeAdvice(
      [target, property, receiver, , argumentsList],
      advice,
      rule
    ) {
      const context = {
        target,
        effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
        property,
        receiver,
        rule,
      };
      this.notWithinExecContext(() => {
        advice.fn.apply(context, argumentsList);
      });
    }

    executeAroundAdvice(
      [target, property, receiver, , argumentsList],
      advice,
      rule,
      proceed,
      context
    ) {
      shallowExtend(context, {
        target,
        effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
        property,
        receiver,
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
      [target, property, receiver, , argumentsList],
      advice,
      rule,
      returnValue
    ) {
      const context = {
        target,
        effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
        property,
        receiver,
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

    performUnderlyingOperation([target, , , originalFn, argumentsList]) {
      const returnValue = this.notWithinExecContext(
        () => {
          const returnValue = originalFn(...argumentsList);
          return returnValue;
        },
        { target, isPerformingUnderlyingOperation: true }
      );
      return returnValue;
    }

    executeProceedCallback(
      [target, property, receiver, , argumentsList],
      rule,
      returnValue,
      callback
    ) {
      const context = {
        target,
        effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
        property,
        receiver,
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
