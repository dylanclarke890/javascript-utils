import Rule from "./Rule";

export default class RegexRule extends Rule {
  constructor(regex) {
    super();
    this.regex = new RegExp(regex);
  }

  matches(effectivePropertyName) {
    this.regex.lastIndex = 0;
    return (
      typeof effectivePropertyName !== "symbol" &&
      this.regex.test(effectivePropertyName)
    );
  }
}
