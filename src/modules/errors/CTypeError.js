/**
 * Small wrapper for the TypeError class.
 */
export default class CTypeError extends TypeError {
  /**
   * @constructor
   * @param {'number' | 'string' | 'object' | 'bigint' | 'boolean' | 'function' | 'symbol' |
   * 'undefined'} expected The expected type.
   * @param {*} received The received value.
   */
  constructor(expected, received) {
    super(`expected ${expected}, received ${typeof received}`);
  }
}
