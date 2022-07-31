import Rule from "./Rule";

export default class ExactRule extends Rule {
  constructor(property) {
    super();
    this.property = property;
  }

  matches(effectiveProperty) {
    return this.property === effectiveProperty;
  }
}
