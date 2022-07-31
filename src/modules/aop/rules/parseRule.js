import declarativeFactory from "../../object-handling/declarative-factory";
import { isArray } from "../../object-handling/introspection";
import ORedRule from "./ORedRule";
import RegexRule from "./RegexRule";
import ExactRule from "./ExactRule";

const REG_STR_TOKEN = "/";

const regexRule = (regex) => new RegexRule(regex);
const exactRule = (property) => new ExactRule(property);

function parseSingle(ruleToParse) {
  let factoryParam = ruleToParse;
  const factory = declarativeFactory([
    [() => ruleToParse instanceof RegExp, regexRule],
    [
      () => {
        if (typeof ruleToParse !== "string") return false;
        const startOfRegEx = ruleToParse.indexOf(REG_STR_TOKEN);
        const endOfRegEx = ruleToParse.lastIndexOf(REG_STR_TOKEN);
        if (startOfRegEx === 0 && endOfRegEx > 0) {
          const stringLiteralRegex = ruleToParse.substring(1, endOfRegEx);
          const flags = ruleToParse.substring(endOfRegEx + 1) || void 0;
          factoryParam = new RegExp(stringLiteralRegex, flags);
          return true;
        }
        return false;
      },
      regexRule,
    ],
    exactRule,
  ]);
  return factory(factoryParam);
}

function parseMultiple(rulesToParse) {
  const rules = [];
  for (const rule of rulesToParse) rules.push(parseSingle(rule));
  return new ORedRule(rules);
}

export default function parseRule(rule) {
  const parse = declarativeFactory([
    [isArray(rule), parseMultiple],
    parseSingle,
  ]);
  return parse(rule);
}
