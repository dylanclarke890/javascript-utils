import TrapExecutor from "./TrapExecutor";
import { reflectGet } from "../reflect";
import { shallowExtend } from "../../../object-handling/clone";
import { EFFECTIVE_TARGET_PROP } from "../../constants";

export default class GetTrapExecutor extends TrapExecutor {
  executeBeforeAdvice([target, property, receiver], advice, rule) {
    const context = {
      target,
      effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
      property,
      receiver,
      rule,
    };
    this.notWithinExecContext(() => {
      advice.fn.apply(context);
    });
  }

  executeAroundAdvice(
    [target, property, receiver],
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
        const returnValue = advice.fn.apply(context, [proceed]);
        return returnValue;
      },
      { proceed }
    );
    return returnValue;
  }

  executeAfterAdvice(
    [target, property, receiver],
    advice,
    rule,
    propertyValue
  ) {
    const context = {
      target,
      effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
      property,
      receiver,
      rule,
      hasPerformedUnderlyingOperation:
        this.execContextStack[this.execContextID]
          .hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation:
        TrapExecutor.getTransversalExecContextStackData(
          "hasEffectivelyPerformedUnderlyingOperation"
        ),
    };
    this.notWithinExecContext(() => {
      advice.fn.apply(context, [propertyValue]);
    });
  }

  performUnderlyingOperation([target, property, receiver]) {
    const propertyValue = this.notWithinExecContext(
      () => {
        const propertyValue = reflectGet(target, property, receiver);
        return propertyValue;
      },
      { target, isPerformingUnderlyingOperation: true }
    );
    return propertyValue;
  }

  executeProceedCallback(
    [target, property, receiver],
    rule,
    propertyValue,
    callback
  ) {
    const context = {
      target,
      effectiveTarget: receiver[EFFECTIVE_TARGET_PROP],
      property,
      receiver,
      rule,
      hasPerformedUnderlyingOperation:
        this.execContextStack[this.execContextID]
          .hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation:
        TrapExecutor.getTransversalExecContextStackData(
          "hasEffectivelyPerformedUnderlyingOperation"
        ),
    };
    return this.notWithinExecContext(() => {
      return callback.apply(context, [propertyValue]);
    });
  }
}
