const fs = require("node:fs");
const path = require("path");

fs.readFile(path.resolve(__dirname, "sample.txt"), "utf8", (_, input) => {
  const rows = input.trim().split("\n");
  const inputsPt1 = {};
  rows.forEach((r) => {
    const splitStr = r.split(/(\s+)/).filter((s) => s.trim().length);
    splitStr.forEach((n, index) => {
      const cell = n.trim();
      let existingProblem = inputsPt1[index];
      if (existingProblem) {
        inputsPt1[index] = [...existingProblem, cell];
      } else {
        inputsPt1[index] = [cell];
      }
    });
  });

  let grandTotal = 0;
  Object.values(inputsPt1).forEach((problem) => {
    let total = 0;
    const operand = problem[problem.length - 1];
    const values = problem.slice(0, problem.length - 1).map((x) => parseInt(x));
    if (operand === "+") {
      total = values.reduce((partial, a) => partial + a, 0);
    } else if (operand === "*") {
      total = values.reduce((partial, a) => partial * a, 1);
    }
    grandTotal += total;
  });
  console.log("part 1:", grandTotal);

  let part2Total = 0;
  rows.forEach((r) => {
    const splitStr = r.split(" ");
    const maximumDecimalPlaces = Math.max(...splitStr.map((x) => x.length));
    const problemValues = [];
    for (let col = rows.length - 1; col > 0; col -= 1) {
      for (let j = maximumDecimalPlaces - 1; j >= 0; j -= 1) {
        let newNum = "";
        for (let i = 0; i < rows.length; i += 1) {
          const digit = inputsPt1[col][i][j];
          if (digit == "+") {
            part2Total += problemValues.reduce((partial, a) => partial + a, 0);
          } else if (digit == "*") {
            part2Total += problemValues.reduce((partial, a) => partial * a, 1);
          } else if (digit) {
            newNum += inputsPt1[col][i][j];
          }
        }
        problemValues.push(newNum);
      }
    }
  });

  console.log("part 2:", part2Total);
});
