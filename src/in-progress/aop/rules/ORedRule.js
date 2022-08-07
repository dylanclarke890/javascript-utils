import Rule from "./Rule";

export default class ORedRule extends Rule {
  constructor(rules) {
    super();
    this.rules = rules;
  }

  matches(effectivePropertyName) {
    for (const rule of this.rules)
      if (rule.matches(effectivePropertyName)) return true;
    return false;
  }
}
