const fs = require("node:fs");
const path = require("path");

const repeatsOnce = (str) => {
  const midpoint = str.length / 2;
  const left = str.slice(0, midpoint);
  const right = str.slice(midpoint);
  return left === right;
};

const substringRepeats = (str) => {
  let repeats = false;
  const midpoint = str.length / 2;
  for (let i = 1; i < midpoint; i++) {
    const substring = str.slice(0, i);
    if (str.split(substring).every((item) => item === "")) {
      repeats = true;
      break;
    }
  }
  return repeats;
};

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (_, input) => {
  const invalidIds = [];
  const ranges = input.trim().split(",");
  ranges.forEach((r) => {
    const [lower, upper] = r.split("-").map((x) => parseInt(x));
    let currentId = lower;
    while (currentId <= upper) {
      // Number cannot be invalid if it has an odd number of characters
      if (currentId.toString().length % 2 === 0) {
        if (repeatsOnce(currentId.toString())) {
          invalidIds.push(currentId);
        }
      }
      currentId += 1;
    }
  });

  const sum = invalidIds.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  console.log("part one:", sum);

  const invalidIds2 = [];
  ranges.forEach((r) => {
    const [lower, upper] = r.split("-").map((x) => parseInt(x));
    let currentId = lower;
    while (currentId <= upper) {
      if (
        repeatsOnce(currentId.toString()) ||
        substringRepeats(currentId.toString())
      ) {
        invalidIds2.push(currentId);
      }
      currentId += 1;
    }
  });
  const sum2 = invalidIds2.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  console.log("part two:", sum2);
});
