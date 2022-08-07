/**
 * Create a hash for file revving. Creates an md5 hash from an input buffer or string,
 * and truncates it to 10 characters, which is unique enough for the purpose of file-revving.
 * @see https://blog.risingstack.com/automatic-cache-busting-for-your-css/
 * @param {Buffer | string} data
 * @returns {string} The truncated hash.
 */
// export function revisionHash(data) {
//   if (typeof data !== "string" && !Buffer.isBuffer(data))
//     throw new TypeError("Expected a Buffer or string");
//   return crypto.createHash("md5").update(data).digest("hex").slice(0, 10);
// }

/**
 * Computes a hash of an array of strings (the order of strings does not matter).
 * NOTE: An array with duplicate values given as parameter to this function
 * may yield to a hash which would collide with other hashes computed
 * on different arrays with this same function.
 * Therefore is on behalf of the caller to be sure that "array" contains
 * unique strings.
 * @param {string[]} array An array of strings.
 * @return {number} A number representing the hash code of the array.
 */
export function hashArrayOfStrings(arr) {
  let code = 0;
  for (let i = 0; i < arr.length; i++) {
    let n = 0,
      curr = arr[i];
    for (let j = 0; j < curr.length; j++) {
      n = (n * 251) ^ curr.charCodeAt(j);
    }
    code ^= n;
  }
  return code;
}

/**
 * Returns the hash of a string.
 * @see https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript#answer-7616484
 * @param {string} str The string.
 * @return {number} The hash code of the string, represented as a number.
 */
export function hashString(str) {
  let hash = 0;
  if (str.length === 0) return hash;

  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32 bit integer.
  }
  return hash;
}

/**
 * A one-pass algorithm to compute the hash of a series of unique strings incrementally.
 * NOTE: Duplicate values given as parameter to this function may yield to a hash which would
 * collide with other hashes computed on different string series with this same function.
 * Therefore is on behalf of the caller to be sure that the series of strings will be unique
 * while calling this function incrementally.
 * @param {string} str The string.
 * @param {number} [startingHash] The previous hash computed with this same function if this
 * call is the continuation of the unique string series.
 * @return {number} The next hash.
 */
export function hashStringSinglePass(str, startingHash = 0) {
  let hash = startingHash;
  let n = 0;
  for (let j = 0; j < str.length; j++) n = (n * 251) ^ str.charCodeAt(j);
  hash ^= n;
  return hash;
}

/**
 * Given a sequence of integers, computes the hash of their sum so that two different sequences
 * will have the same hash if the sum of their integers will be the same (the overall sum of the
 * sequences may be higher than `Number.MAX_SAFE_INTEGER`).
 * @see https://stackoverflow.com/questions/69749629/hash-function-that-returns-the-same-hash-for-a-sum-even-if-different-terms-lead/69749873
 * Example:
 * ```
 * hashSumOfIntArray([1, 2, 3, 4, 5, 6]); // 21
 * hashSumOfIntArray([1, 2, 3, 4, 5, 6]) === hashSumOfIntArray([2, 3, 1, 4, 6, 5]); // true
 * hashSumOfIntArray([1, 2, 3, 4, 5, 6]) === hashSumOfIntArray([5, 1, 10, 4, 1]); // true
 * hashSumOfIntArray([1, 2, 3, 4, 5, 6]) === hashSumOfIntArray([21]); // true
 * hashSumOfIntArray([1, 2, 3, 4, 5, 6]) === hashSumOfIntArray([7, 7, 7]); // true
 * ```
 * @param {number[]} seq A sequence of integers (an array).
 * @return {number} The hash of the sum of the sequence of integers.
 */
export function hashSumOfIntArray(seq) {
  const BIG_PRIME = 4503599627370449;
  let hash = 0;
  for (let i = 0; i < seq.length; i++) {
    const value = seq[i];
    hash = (hash % BIG_PRIME) + (value % BIG_PRIME);
  }
  return hash;
}

/**
 * Create a MD5 hash with hex encoding. Please don't use MD5 hashes for anything sensitive!
 * Works in the browser too, when used with a bundler like Webpack, Rollup, Browserify.
 * @param {Buffer | string | Array<Buffer | string>} data Prefer buffers as they're faster to hash, but strings can be useful for
 * small things. Pass an array instead of concatenating strings and/or buffers. The output
 * is the same, but arrays do not incur the overhead of concatenation.
 */
// export function md5Hex(data) {
//   const hash = crypto.createHash("md5");
//   const update = (buffer) => {
//     const inputEncoding = typeof buffer === "string" ? "utf8" : undefined;
//     hash.update(buffer, inputEncoding);
//   };
//   if (Array.isArray(data)) for (const element of data) update(element);
//   else update(data);
//   return hash.digest("hex");
// }
