import FunctionCallPointcut from "./FunctionCallPointcut";
import MethodCallPointcut from "./MethodCallPointcut";
import ObjectConstructionPointcut from "./ObjectConstructionPointcut";
import PropertyGettingPointcut from "./PropertyGettingPointcut";
import PropertySettingPointcut from "./PropertySettingPointcut";

/**
 * Returns a new function call pointcut.
 * @return {FunctionCallPointcut} A function call pointcut.
 */
export function apply() {
  return new FunctionCallPointcut();
}

/**
 * Returns a new method call pointcut.
 * @return {MethodCallPointcut} A method call pointcut.
 */
export function call() {
  return new MethodCallPointcut();
}

/**
 * Returns a new object construction pointcut.
 * @return {ObjectConstructionPointcut} An object construction pointcut.
 */
export function construct() {
  return new ObjectConstructionPointcut();
}

/**
 * Returns a new property getting pointcut.
 * @return {PropertyGettingPointcut} A property getting pointcut.
 */
export function get() {
  return new PropertyGettingPointcut();
}

/**
 * Returns a new property setting pointcut.
 * @return {PropertySettingPointcut} A property setting pointcut.
 */
export function set() {
  return new PropertySettingPointcut();
}
