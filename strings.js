export function getDigits(str) {
  const asArr = [...str];
  const res = [];
  asArr.forEach((v) => {
    if (isNaN(+v)) return;
    res.push(v);
  });
  return res.join("");
}

/**
 * Given an integer, returns a string containing the same integer with additional thousands separators.
 * @param {number} num An integer.
 * @param {string} [sep] The thousands separator to use.
 * @return {string} The same integer with thousands separators.
 */
export function intSeparateThousands(num, sep = ",") {
  return num
    .toString()
    .split("")
    .reverse()
    .map((d, i, a) =>
      (i + 1) % 3 === 0 && i !== a.length - 1 ? `${sep}${d}` : d
    )
    .reverse()
    .join("");
}

/**
 * Casts a value to a string.
 * @return {string} The string representation of the value.
 */
export function str(v) {
  return "" + v;
}

export class StringBuilder {
  #value = "";
  hasValue = this.#value.length > 0;
  length = this.#value.length;

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
    this.#value =
      this.#value.substring(0, start) + value + this.value.substring(start);
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
