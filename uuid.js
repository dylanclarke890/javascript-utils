/**
 * Generates a new UUID.
 * @see https://github.com/tastejs/todomvc/blob/gh-pages/examples/react/js/utils.js
 * @return {string} The UUID.
 */
export function uuid() {
  let uuid = "";
  for (let i = 0; i < 32; i++) {
    let random = (Math.random() * 16) | 0;
    if (i === 8 || i === 12 || i === 16 || i === 20) {
      uuid += "-";
    }
    uuid += (i === 12 ? 4 : i === 16 ? (random & 3) | 8 : random).toString(16);
  }

  return uuid;
}

/**
 * Generates non-canonical UUIDs. Non-canonical UUIDs are standard
 * UUIDs with the current count suffixed. Wrapped in a class so that
 * separate instances can be created.
 */
export class NonCanonicalUUID {
  #count = 0;

  /** Generate a non-canonical UUID. */
  generate() {
    this.#count++;
    const UUID = uuid();
    return UUID + "-" + this.#count;
  }
}
