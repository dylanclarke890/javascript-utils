import { shallowExtend } from "../../../object-handling/clone";
import { isArray } from "../../../object-handling/introspection";
import { throwErrorIfDoesNotImplement } from "./throwErrorIfDoesNotImplement";
import NotImplementedError from "../../../errors/NotImplementedError";
import TrapExecutor from "../TrapExecutor";

export const withFunctionTrapExecutor = (superclass) => {
  const NewClass = class extends superclass {
    executedAtLeastOnce = false;
    finalTrapArgsMap = {};

    startExecutionContext(trapArgs) {
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "startExecutionContext",
          superclass
        );
      super.startExecutionContext(trapArgs);
      if (
        !this.executedAtLeastOnce &&
        !Object.prototype.hasOwnProperty.call(this, "execContextID")
      )
        throw new NotImplementedError(superclass.name, "execContextID");
    }

    endExecutionContext(trapArgs) {
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "endExecutionContext",
          superclass
        );
      super.endExecutionContext(trapArgs);
      this.executedAtLeastOnce = true;
    }

    getFinalTrapArgs(trapArgs) {
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          this,
          "getTrapArgsArgumentsListIndex",
          superclass
        );
      const argumentsListIndex = this.getTrapArgsArgumentsListIndex();
      if (
        !this.executedAtLeastOnce &&
        !Object.prototype.hasOwnProperty.call(this, "execContextStack")
      )
        throw new NotImplementedError(superclass.name, "execContextStack");
      const params = this.execContextStack[this.execContextID].finalParams;
      if (isArray(params)) {
        trapArgs = [...trapArgs];
        trapArgs[argumentsListIndex] = params;
      }
      return trapArgs;
    }

    executeAroundAdvice(trapArgs, advice, rule, proceed, context) {
      trapArgs = this.getFinalTrapArgs(trapArgs);
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "executeAroundAdvice",
          superclass
        );
      return super.executeAroundAdvice(
        trapArgs,
        advice,
        rule,
        proceed,
        context
      );
    }

    executeAfterAdvice(trapArgs, advice, rule, returnValue) {
      trapArgs = this.getFinalTrapArgs(trapArgs);
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "executeAfterAdvice",
          superclass
        );
      super.executeAfterAdvice(trapArgs, advice, rule, returnValue);
    }

    performUnderlyingOperation(trapArgs) {
      trapArgs = this.getFinalTrapArgs(trapArgs);
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "performUnderlyingOperation",
          superclass
        );
      return super.performUnderlyingOperation(trapArgs);
    }

    executeProceedCallback(trapArgs, rule, returnValue, callback) {
      trapArgs = this.getFinalTrapArgs(trapArgs);
      !this.executedAtLeastOnce &&
        throwErrorIfDoesNotImplement(
          superclass.prototype,
          "executeProceedCallback",
          superclass
        );
      return super.executeProceedCallback(
        trapArgs,
        rule,
        returnValue,
        callback
      );
    }

    mutateFlatProceedContext(trapArgs, context) {
      trapArgs = this.getFinalTrapArgs(trapArgs);
      const trapArgsArgumentsListIndex = this.getTrapArgsArgumentsListIndex();
      const argumentsList = trapArgs[trapArgsArgumentsListIndex];
      shallowExtend(context, {
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
      });
    }
  };
  Object.defineProperty(NewClass, "name", {
    value: `WithFunctionTrapExecutor(${superclass.name})`,
    configurable: true,
  });
  return NewClass;
};
