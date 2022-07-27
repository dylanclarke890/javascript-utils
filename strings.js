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
