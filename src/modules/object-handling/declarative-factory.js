import { isArray } from "../object-handling/introspection";

/**
 * A function to easily create interchangeable factories switching them
 * in a declarative way based on the given runtime parameters.
 * @param {Array<[Function, *]>} tuples An array of tuples, each tuple being an array of two elements:
 *  - testCondition: A boolean value or a function returning a boolean value which, if true,
 * instructs this function to return the factory bound to the test condition.
 * Note: the first factory for which the test condition is truthy will be returned and further
 * tuples will be ignored;
 * - factory: Anything. The value to return if testCondition is a truthy value
 * or a function returning a truthy value.
 * The last element of the returned tuples MAY not be a tuple array with two elements,
 * and in such case it will be treated as the default factory value to return if none
 * of the test conditions of the previous factories are satisfied.
 * If the last tuple is not a default value and none of the test conditions of the previous
 * factories are satisfied as well as for the factory of last tuple, then null
 * will be returned by this function.
 * @return {*|null} The first factory value for which the test is truthy or returns a truthy
 * value, a default factory value, or null.
 */
export default function declarativeFactory(tuples) {
  const isConditionMet = (condition) =>
    Boolean(
      typeof condition === "function" ? condition() : condition
    );
  const factoryValue = (() => {
    let i = 0;
    for (; i < tuples.length - 1; i++) { // handle all tuples except the last
      const tuple = tuples[i];
      const [condition, factoryVal] = tuple;
      if (isConditionMet(condition)) return factoryVal; // is condition satified?
    }
    const lastTuple = tuples[i];
    if (isArray(lastTuple) && lastTuple.length === 2) { // handle last
      const [condition, factoryVal] = lastTuple;
      if (isConditionMet(condition)) return factoryVal; // is last condition satified?
      return null; // No default and no factory value satisfying a test condition.
    } else return lastTuple; // Default factory value.
  })();
  return factoryValue;
}
