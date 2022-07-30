/** Deep freezes an object using recursion. */
export function deepFreeze(obj) {
  if (typeof obj !== "object") return obj;
  for (let key in obj) {
    const val = obj[key];
    if (val && typeof val === "object") deepFreeze(val);
  }
  return obj;
}
