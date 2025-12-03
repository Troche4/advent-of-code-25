const fs = require("node:fs");
const path = require("path");

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (_, input) => {
  const banks = input.trim().split("\n");
  const topVoltages = [];
  banks.forEach((battery) => {
    const voltages = battery.split("").map((i) => parseInt(i));
    const firstVoltage = Math.max(...voltages);
    const indexOfFirst = voltages.indexOf(firstVoltage);
    let highestVoltage = 0;
    voltages.forEach((second, i) => {
      let candidate = 0;
      if (i == indexOfFirst) {
      } else if (i < indexOfFirst) {
        candidate = parseInt(`${second}${firstVoltage}`);
      } else if (i > indexOfFirst) {
        candidate = parseInt(`${firstVoltage}${second}`);
      }

      highestVoltage = Math.max(highestVoltage, candidate);
    });
    topVoltages.push(highestVoltage);
  });
  const total = topVoltages.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );
  console.log(total);

  const removeLowest = (arr) => {
    let highestNumber = 0;
    arr.forEach((item, i) => {
      const candidate = [
        ...arr.slice(0, i),
        ...arr.slice(Math.min(arr.length, i + 1), arr.length),
      ];
      const number = parseInt(candidate.join(""));

      highestNumber = Math.max(highestNumber, number);
    });

    return highestNumber;
  };

  let part2 = 0;
  banks.forEach((battery) => {
    const voltages = battery.split("").map((i) => parseInt(i));
    const firstIteration = removeLowest(voltages);
    const secondIteration = removeLowest(
      firstIteration
        .toString()
        .split("")
        .map((i) => parseInt(i)),
    );
    const thirdIteration = removeLowest(
      secondIteration
        .toString()
        .split("")
        .map((i) => parseInt(i)),
    );
    part2 += thirdIteration;
  });

  console.log(part2);
});
