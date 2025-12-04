const fs = require("node:fs");
const path = require("path");

const removeAccessibleRolls = (rows) => {
  const outRows = [];
  let accessibleRolls = 0;
  for (let i = 0; i < rows.length; i += 1) {
    const outRow = [];
    for (let j = 0; j < rows[0].length; j += 1) {
      let adjacentRolls = 0;
      const maxRow = Math.min(i + 1, rows.length - 1);
      const minRow = Math.max(i - 1, 0);
      const maxCol = Math.min(j + 1, rows[0].length - 1);
      const minCol = Math.max(j - 1, 0);

      // Start from upper left diagonal from [i,j] and move clockwise
      if (rows[minRow][minCol] === "@" && minRow != i && minCol != j)
        adjacentRolls += 1;
      if (rows[minRow][j] === "@" && minRow != i) adjacentRolls += 1;
      if (rows[minRow][maxCol] === "@" && minRow != i && maxCol != j)
        adjacentRolls += 1;
      if (rows[i][minCol] === "@" && minCol != j) adjacentRolls += 1;
      if (rows[i][maxCol] === "@" && maxCol != j) adjacentRolls += 1;
      if (rows[maxRow][minCol] === "@" && maxRow != i && minCol != j)
        adjacentRolls += 1;
      if (rows[maxRow][j] === "@" && maxRow != i) adjacentRolls += 1;
      if (rows[maxRow][maxCol] === "@" && maxRow != i && maxCol != j)
        adjacentRolls += 1;

      if (adjacentRolls < 4 && rows[i][j] === "@") {
        accessibleRolls += 1;
        outRow.push("X");
      } else {
        outRow.push(rows[i][j]);
      }
    }
    outRows.push(outRow);
  }
  return [outRows, accessibleRolls];
};

fs.readFile(path.resolve(__dirname, "input.txt"), "utf8", (_, input) => {
  const rows = input.trim().split("\n");
  let accessibleRolls = 0;
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[0].length; j += 1) {
      let adjacentRolls = 0;
      const maxRow = Math.min(i + 1, rows.length - 1);
      const minRow = Math.max(i - 1, 0);
      const maxCol = Math.min(j + 1, rows[0].length - 1);
      const minCol = Math.max(j - 1, 0);

      // Start from upper left diagonal from [i,j] and move clockwise
      if (rows[minRow][minCol] === "@" && minRow != i && minCol != j)
        adjacentRolls += 1;
      if (rows[minRow][j] === "@" && minRow != i) adjacentRolls += 1;
      if (rows[minRow][maxCol] === "@" && minRow != i && maxCol != j)
        adjacentRolls += 1;
      if (rows[i][minCol] === "@" && minCol != j) adjacentRolls += 1;
      if (rows[i][maxCol] === "@" && maxCol != j) adjacentRolls += 1;
      if (rows[maxRow][minCol] === "@" && maxRow != i && minCol != j)
        adjacentRolls += 1;
      if (rows[maxRow][j] === "@" && maxRow != i) adjacentRolls += 1;
      if (rows[maxRow][maxCol] === "@" && maxRow != i && maxCol != j)
        adjacentRolls += 1;

      if (adjacentRolls < 4 && rows[i][j] === "@") {
        accessibleRolls += 1;
      } else {
      }
    }
  }

  console.log("part one:", accessibleRolls);

  let partTwoRemoved = 0;
  let wallState = rows;
  let exit = false;
  while (!exit) {
    const oldTotal = partTwoRemoved;
    [wallState, rollsRemoved] = removeAccessibleRolls(wallState);
    partTwoRemoved += rollsRemoved;
    exit = oldTotal === partTwoRemoved + rollsRemoved;
  }
  console.log("part two:", partTwoRemoved);
});
