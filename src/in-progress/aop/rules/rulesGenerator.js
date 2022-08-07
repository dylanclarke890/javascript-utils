import declarativeFactory from "../../object-handling/declarative-factory";
import { isArray } from "../../object-handling/introspection";

function* objectRulesGenerator(proxyRules) {
  const ruleKeys = Reflect.ownKeys(proxyRules);
  for (const ruleKey of ruleKeys) {
    const pointcut = proxyRules[ruleKey];
    yield { rule: ruleKey, pointcut };
  }
}

function* arrayRulesGenerator(proxyRules) {
  for (const proxyRule of proxyRules)
    if (isArray(proxyRule)) {
      const [rule, pointcut] = proxyRule;
      yield { rule, pointcut };
    } else yield* objectRulesGenerator(proxyRule);
}

/**
 * A generator for proxy rules.
 * @param {Object|Array} proxyRules An array of proxy rules or object with rules as keys.
 * @yields {Object} The next rule object, having two keys:
 * - rule: The rule, as-is (as given by the client code);
 * - pointcut: The pointcut associated with that rule.
 */
export default function* rulesGenerator(proxyRules) {
  const generator = declarativeFactory([
    [isArray(proxyRules), arrayRulesGenerator],
    objectRulesGenerator,
  ]);
  yield* generator(proxyRules);
}
