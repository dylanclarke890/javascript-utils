export class StringBuilder {
  #value = "";

  get hasValue() {
    return this.#value.length > 0;
  }

  get length() {
    return this.#value.length;
  }

  constructor(initialValue) {
    this.#value = initialValue || ""; // in case null is passed
  }

  /** Append a string to the current instance.
   *  @param {string} str the string to append.
   *  @return {this} the current instance so additional calls can be chained. */
  append(str) {
    this.#value = `${this.#value}${str}`;
    return this;
  }

  /** Prepend a string to the current instance.
   *  @param {string} str the string to prepend.
   *  @return {this} the current instance so additional calls can be chained. */
  prepend(str) {
    this.#value = `${str}${this.#value}`;
    return this;
  }

  /** Append a string to the current instance at a specific index.
   *  @param {string} str the string to prepend.
   *  @return {this} the current instance so additional calls can be chained. */
  insertAt(start, value) {
    const _v = this.#value;
    this.#value = `${_v.substring(0, start)}${value}${_v.substring(start)}`;
    return this;
  }

  /** Find and replace text in the current instance using either a string
   *  value or RegExp.
   *  @param {string | RegExp} match the string or regexp to use for matches.
   *  @return {this} the current instance so additional calls can be chained. */
  replace(match, replacement) {
    if (match instanceof RegExp)
      this.#value = this.#value.replace(match, replacement);
    else this.#value = this.#value.split(match).join(replacement);
    return this;
  }

  /** Clears the current instance.
   *  @return the current instance so additional calls can be chained. */
  clear() {
    this.#value = "";
    return this;
  }

  /** Copy the current instance. */
  /** @return a new StringBuilder instance with the current value */
  copy() {
    return new StringBuilder(this.#value);
  }

  /** @return the current value of this instance. */
  toString() {
    return this.#value;
  }
}
