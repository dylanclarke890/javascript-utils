import AOPProxy from "../AOPProxy";
import { get, set } from "../pointcuts/pointcuts";
import { typeToStr } from "../../misc/strings";
import { prototypeChainProperties } from "../../object-handling/objects";

/**
 * Builtin function using AOPProxy's API to throw an error when an unknown property is accessed on the given target
 * (both for read and write operations).
 * @param {Object} target The target object.
 * @param {Object} options Options.
 * @param {boolean} [options.dynamic] Whether or not to check against the current properties of
 * the target on each property access (dynamic, default). If set to false, then only the
 * properties of the target object at the time this builtin function is called will be
 * treated as known and used for the check when determining if a property is unknown.
 * @param {?Error|Function} [options.errorToThrow] The error to throw or null (default) or a
 * function returning an error instance to throw. If null, a default error will be thrown when
 * trying to access an unknown property. If a function is given, the function will receive an
 * object with the following properties as parameter:
 * - target (Object): The target object;
 * - propertyName (string): The name of the unknown property;
 * - targetTypeToStr (string): The type of the target (e.g. "[object Object]");
 * - defaultErrorMessage (string): A default error message which can be used for the custom
 * error;
 * @return {Proxy} A new proxy object for the given target which supports this builtin feature.
 */
export default function throwErrorForUnknownProperty(
  target,
  {
    dynamic = true,
    errorToThrow = null,
    ...prototypeChainPropertiesOptions
  } = {}
) {
  const regex = /.?/;
  let map = {};
  const mapProperties = () => {
    const props = prototypeChainProperties(
      target,
      prototypeChainPropertiesOptions
    );
    map = props.reduce((acc, prop) => !(acc[prop] = true) || acc, {});
  };
  !dynamic && mapProperties();
  const assertFn = function () {
    const propertyName = this.property;
    const targetTypeToStr = typeToStr(target);
    const defaultErrorMessage = `Accessing unknown property "${propertyName}" of object ${targetTypeToStr}.`;
    dynamic && mapProperties();
    if (!map[propertyName]) {
      errorToThrow = errorToThrow
        ? typeof errorToThrow === "function"
          ? errorToThrow({
              target,
              propertyName,
              targetTypeToStr,
              defaultErrorMessage,
            })
          : errorToThrow
        : new Error(defaultErrorMessage);
      throw errorToThrow;
    }
  };
  const proxyTarget = AOPProxy(target, [
    [regex, get().before(assertFn)],
    [regex, set().before(assertFn)],
  ]);
  return proxyTarget;
}
