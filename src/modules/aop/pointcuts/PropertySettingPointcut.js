import Pointcut from "./Pointcut";
import BeforeAdvice from "../advices/BeforeAdvice";
import AfterAdvice from "../advices/AfterAdvice";
import AroundAdvice from "../advices/AroundAdvice";

export default class PropertySettingPointcut extends Pointcut {
  /**
   * Register a before advice for this pointcut.
   * @param {Function} adviceFunc The advice function. A function which receives the constructor parameters
   * of the underlying proxied object construction.
   * @return {PropertySettingPointcut} A reference to this instance.
   */
  before(adviceFunc) {
    this.advices.push(new BeforeAdvice(adviceFunc));
    return this;
  }

  /**
   * Register an after advice for this pointcut.
   * @param {Function} adviceFunc The advice function. A higher-order function which will receive
   * the parameters of the proxied method and MUST return a function
   * which will receive the return value of the underlying proxied function
   * as parameter.
   * @return {PropertySettingPointcut} A reference to this instance.
   */
  after(adviceFunc) {
    this.advices.push(new AfterAdvice(adviceFunc));
    return this;
  }

  /**
   * Register an around advice for this pointcut.
   * @param {Function} adviceFunc The advice function. A higher-order function which will receive
   * the "proceed" function as parameter and which MUST return a function which will receive the
   * parameters of the underlying proxied function.
   * When options.flat = true, if the advice proceeds, the return value to return to the caller
   * will be returned by the "proceed" function. The advice function may return another return
   * value instead of the one returned. Otherwise (if false), if the advice function proceeds,
   * the callback given to "proceed" will receive the return value to return to the caller
   * or may return another value instead of the current return value.
   * @param {Object} [options] An optional object with options.
   * @param {boolean} [options.flat=false] True to use the Flat Proceed API. Defaults to false.
   * @return {PropertySettingPointcut} A reference to this instance.
   */
  around(adviceFunc, { flat = false } = {}) {
    this.advices.push(new AroundAdvice(adviceFunc, { flat }));
    return this;
  }

  /**
   * This is a shorthand for "around(adviceFn, { flat: true })".
   * @param {Function} adviceFunc The advice function as in the "around" method.
   * @return {PropertySettingPointcut} A reference to this instance.
   */
  flatAround(adviceFunc) {
    return this.around(adviceFunc, {
      flat: true,
    });
  }
}
