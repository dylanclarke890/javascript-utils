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

  /** Appends str to the current value.
   *  @return the current instance so additional calls can be chained. */
  append(str) {
    this.#value = `${this.#value}${str}`;
    return this;
  }

  /** Prepends str to the current value.
   *  @return the current instance so additional calls can be chained. */
  prepend(str) {
    this.#value = `${str}${this.#value}`;
    return this;
  }

  /** Appends str to the current value at the specified start index.
   *  @return the current instance so additional calls can be chained. */
  insertAt(start, value) {
    const _v = this.#value;
    this.#value = `${_v.substring(0, start)}${value}${_v.substring(start)}`;
    return this;
  }

  /** Using either a regular expression or a string, find and replace the specified value.
   * @return the current instance so additional calls can be chained. */
  replace(match, replacement) {
    if (searchFor instanceof RegExp)
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

  /** @return a new StringBuilder instance with the current value */
  copy() {
    return new StringBuilder(this.#value);
  }

  /** @return the current value of this instance. */
  toString() {
    return this.#value;
  }
}
