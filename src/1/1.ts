const fs = require("node:fs");
const path = require("path");

const turnDial = (current, direction) => {
  if (direction === "L") {
    if (current === 0) {
      return 99;
    } else {
      return current - 1;
    }
  } else {
    if (current === 99) {
      return 0;
    } else {
      return current + 1;
    }
  }
};

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (_, input) => {
  const lines = input.trim().split("\n");
  let dialValue = 50;
  let timesCrossedZero = 0;
  let timesLeftAtZero = 0;
  lines.forEach((l) => {
    const direction = l[0];
    const magnitude = parseInt(l.slice(1));
    let ticks = 0;
    while (ticks < magnitude) {
      dialValue = turnDial(dialValue, direction);
      ticks += 1;
      if (dialValue === 0) {
        timesCrossedZero += 1;
      }
    }
    if (dialValue === 0) {
      timesLeftAtZero += 1;
    }
  });
  console.log("part one:", timesLeftAtZero);
  console.log("part two:", timesCrossedZero);
});
