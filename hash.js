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

export function hashString(str) {
  let hash = 0,
    i,
    chr;
  if (str.length === 0) {
    return hash;
  }
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32 bit integer.
  }
  return hash;
}

export function hashStringSinglePass(str, startingHash = 0) {
  let hash = startingHash;
  let n = 0;
  for (let j = 0; j < str.length; j++) {
    n = (n * 251) ^ str.charCodeAt(j);
  }
  hash ^= n;
  return hash;
}

export function hashSumOfIntArray(seq) {
  const BIG_PRIME = 4503599627370449;
  let hash = 0;
  for (let i = 0; i < seq.length; i++) {
    const value = seq[i];
    hash = (hash % BIG_PRIME) + (value % BIG_PRIME);
  }
  return hash;
}
