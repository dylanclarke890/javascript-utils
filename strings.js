export function isNullOrEmpty(str) {
  return str === undefined || str === "";
}

export function isNullOrWhiteSpace(str) {
  return str === undefined || str === " ";
}

export function getDigits(str) {
  const asArr = [...str];
  const res = [];
  asArr.forEach((v) => {
    if (isNaN(+v)) return;
    res.push(v);
  });
  return res.join("");
}

export class StringBuilder {
  #value = "";
  hasValue = this.#value.length > 0;
  length = this.#value.length;

  constructor(initialValue) {
    this.#value = initialValue;
  }

  /** Appends str to the current value.
   *  Returns the current instance so additional calls can be chained. */
  append(str) {
    this.#value = `${this.#value}${str}`;
    return this;
  }

  /** Prepends str to the current value.
   *  Returns the current instance so additional calls can be chained. */
  prepend(str) {
    this.#value = `${str}${this.#value}`;
    return this;
  }

  /** Appends str to the current value at the specified start index.
   *  Returns the current instance so additional calls can be chained. */
  insertAt(start, value) {
    this.#value =
      this.#value.substring(0, start) + value + this.value.substring(start);
    return this;
  }

  /** Using either a regular expression or a string, find and replace the specified value.
   * Returns the current instance so additional calls can be chained. */
  replace(match, replacement) {
    if (searchFor instanceof RegExp)
      this.#value = this.#value.replace(match, replacement);
    else this.#value = this.#value.split(match).join(replacement);
    return this;
  }

  /** Clears the current instance.
   *  Returns the current instance so additional calls can be chained. */
  clear() {
    this.#value = "";
    return this;
  }

  /** Returns a new StringBuilder instance with the current value */
  copy() {
    return new StringBuilder(this.#value);
  }

  /** Get the current value of this instance. */
  toString() {
    return this.#value;
  }
}
