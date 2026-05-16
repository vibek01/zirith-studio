const w = 220;
const h = 90;
const pad = 10;
const yMin = 0;
const yMax = 100;

function toSvgY(y) {
  return h - pad - ((y - yMin) / (yMax - yMin)) * (h - pad * 2);
}

console.log("Zirith End (82):", toSvgY(82));
console.log("Industry End (4):", toSvgY(4));
