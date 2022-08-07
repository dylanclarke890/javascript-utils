import { ImmutableLinkedOrderedMap } from "./ImmutableLinkedOrderedMap";

/**
 * Shortcut function to create an immutable linked ordered map.
 * @param {Object} options Options.
 * @return {ImmutableLinkedOrderedMap} A new immutable linked ordered map for the given options.
 */
export function map(options = {}) {
  return new ImmutableLinkedOrderedMap({
    ...options,
  });
}

/**
 * Shortcut function to create a lazy immutable linked ordered map.
 * @param {Object} options Options.
 * @return {ImmutableLinkedOrderedMap} A new lazy immutable linked ordered map for the given options.
 */
export const lazyMap = (options = {}) =>
  map({
    ...options,
    lazy: true,
  });

/**
 * Shortcut function returning a factory function to create a lazy map for a given key property name "keyPropName".
 * Example:
 * ```
 * const mapFactory = lazyMapFactory("item_id");
 * let map = mapFactory([{item_id: 1, prop: "a"}, {item_id: 2, prop: "b"}, {item_id: 3, prop: "c"}]);
 * map.get(1); // {item_id: 1, prop: "a"}
 * map = map.set({item_id: 4, prop: "d"}); // Append
 * //map = map.set({item_id: 4, prop: "d"}, true); // Prepend
 * map.get(4); // {item_id: 4, prop: "d"}
 * map.get(5); // undefined
 * map = map.unset(4);
 * map.get(4); // undefined
 * ```
 *
 * @param {string} keyPropName The key property name to use for the items in the map that will be created by the returned factory function.
 * @return {(initialItems: Array) => ImmutableLinkedOrderedMap} A factory function to create a lazy map for the given property name "keyPropName".
 */
export function lazyMapFactory(keyPropName = DEFAULT_KEY_PROP_NAME) {
  return (initialItems = []) =>
    lazyMap({
      keyPropName,
      initialItems,
    });
}
