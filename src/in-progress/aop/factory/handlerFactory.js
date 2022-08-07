import trapHandlerForRules from "../trap/trapHandlerForRules";

/**
 * Factory function to generate a new handler object for the given proxy rules.
 * @param {Object|Array} proxyRules The proxy rules.
 * @return {Object} The handler object for the given proxy rules.
 */
export default function handlerFactory(proxyRules) {
  const handler = trapHandlerForRules(proxyRules);
  return handler;
}
