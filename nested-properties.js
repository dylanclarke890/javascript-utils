/**
 * Gets a nested value of an object given an array of nested property names (keys).
 * @param {Object} data JS POJO object.
 * @param {Array} props Array of object nested keys.
 * @return {*} The leaf value.
 */
export function getNestedPropertyValue(data, props) {
  let root = data;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    root = root[prop];
  }
  return root;
}

/**
 * Checks if a nested value of an object given an array of nested property names (keys) exists.
 * @param {Object} data JS POJO object.
 * @param {Array} props Array of object nested keys.
 * @return {boolean} True if the nested key exists, false otherwise.
 */
export function hasNestedPropertyValue(data, props) {
  if (!props.length) return false;
  let root = data;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (!root[prop]) return false;
    root = root[prop];
  }
  return true;
}

/**
 * Sets a nested value of an object given an array of nested property names (keys).
 *
 * @param {Object} data JS POJO object.
 * @param {Array} props Array of object nested keys.
 * @param {*} value Leaf value.
 * @return {undefined}
 */
export function setNestedPropertyValue(data, props, value) {
  if (!props.length) {
    return;
  }
  let root = data;
  let prev = null;
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (typeof root[prop] !== "object") {
      root[prop] = {};
    }
    prev = root;
    root = root[prop];
  }
  if (prev) {
    prev[props[props.length - 1]] = value;
  }
}

/**
 * Sets a nested value on a nested map.
 *
 * @param {Map|WeakMap} map A map or weak map.
 * @param {Array} keys Array of keys to traverse. Each key will lead to a nested map.
 * @param {*} value The value to set at the inner key.
 * @return {undefined}
 */
export function nestedMapSet(map, keys, value) {
  let i = 0;
  let current = map;
  while (i < keys.length - 1) {
    const key = keys[i];
    const nested = current.get(key);
    if (nested instanceof Map || nested instanceof WeakMap) {
      current = nested;
    } else {
      const newMap = new Map();
      current.set(key, newMap);
      current = newMap;
    }
    i++;
  }
  current.set(keys[i], value);
}

/**
 * Tests if a map has the given nested keys.
 *
 * @param {Map|WeakMap} map A map or weak map.
 * @param {Array} keys Array of keys to check. Each key represents a nested map.
 * @return {boolean} "true" if all the nested keys exist, false otherwise.
 */
export function nestedMapHas(map, keys) {
  let current = map;
  let i = 0;
  const l = keys.length;
  while (
    (current instanceof Map || current instanceof WeakMap) &&
    current.has(keys[i]) &&
    i < l
  ) {
    current = current.get(keys[i]);
    i++;
  }
  return i == l;
}

/**
 * Gets a value from a nested map.
 * @param {Map|WeakMap} map A map or weak map.
 * @param {Array} keys Array of keys. Each key represents a nested map.
 * @return {*} The value of the map or "undefined" if there is no value for the given nested keys.
 */
export function nestedMapGet(map, keys) {
  let current = map;
  let i = 0;
  const l = keys.length;
  while (
    (current instanceof Map || current instanceof WeakMap) &&
    current.has(keys[i]) &&
    i < l
  ) {
    current = current.get(keys[i]);
    i++;
  }
  return i == l ? current : void 0;
}

/**
 * @type {Symbol}
 */
const treeMapSubtree = Symbol("treeMapSubtree");

/**
 * Sets a nested value on a nested tree map.
 *
 * @param {Map|WeakMap} rootMap A map or weak map to use as the root.
 * @param {Array} keys Array of keys to traverse. Each key will lead to a nested node of the tree map.
 * @param {*} value The value to set at the inner nested key.
 * @return {undefined}
 */
export function nestedTreeMapSet(rootMap, keys, value) {
  let i = 0;
  let current = rootMap;
  const MapConstructor = rootMap instanceof WeakMap ? WeakMap : Map;
  while (i < keys.length - 1) {
    const key = keys[i];
    const nested = current.get(key);
    if (nested) {
      current =
        nested[treeMapSubtree] ||
        (nested[treeMapSubtree] = new MapConstructor());
    } else {
      const newMap = new MapConstructor();
      const node = {
        [treeMapSubtree]: newMap,
        value: void 0,
      };
      current.set(key, node);
      current = newMap;
    }
    i++;
  }
  const key = keys[i];
  !current.has(key)
    ? current.set(key, {
        value,
      })
    : (current.get(key).value = value);
}

/**
 * Tests if a tree map has the given nested keys.
 * @param {Map|WeakMap} rootMap The root of the map or weak map.
 * @param {Array} keys Array of keys to check. Each key represents a nested node of the tree map.
 * @return {boolean} "true" if all the nested keys exist, false otherwise.
 */
export const nestedTreeMapHas = (rootMap, keys) => {
  let current = rootMap;
  let i = 0;
  const l = keys.length;
  while (
    (current instanceof Map || current instanceof WeakMap) &&
    current.has(keys[i]) &&
    i < l
  ) {
    current = current.get(keys[i])[treeMapSubtree];
    i++;
  }
  return i == l;
};

/**
 * Gets a value from a nested tree map.
 * @param {Map|WeakMap} rootMap The root of the map or weak map.
 * @param {Array} keys Array of keys. Each key represents a nested node of the tree map.
 * @return {*} The value of the tree map or "undefined" if there is no value for the given nested keys.
 */
export const nestedTreeMapGet = (rootMap, keys) => {
  let current = rootMap;
  let i = 0;
  const lastIndex = keys.length - 1;
  while (
    (current instanceof Map || current instanceof WeakMap) &&
    current.has(keys[i]) &&
    i < lastIndex
  ) {
    current = current.get(keys[i])[treeMapSubtree];
    i++;
  }
  if (i === lastIndex && current) {
    const lastKey = keys[i];
    if (current.has(lastKey)) {
      const nested = current.get(lastKey);
      return nested.value;
    }
  }
  return void 0;
};
