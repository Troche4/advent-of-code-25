const fs = require("node:fs");
const path = require("path");

fs.readFile(path.resolve(__dirname, "sample.txt"), "utf8", (_, input) => {
  let freshIngredientCounter = 0;
  const splitInput = input.trim().split("\n\n");
  const freshIngredientRanges = splitInput[0]?.split("\n");
  const freshIngredients = {};
  freshIngredientRanges.forEach((range) => {
    const characters = range.split("-");
    const lower = characters[0];
    const upper = parseInt(characters[1]);
    freshIngredients[lower] = upper;
  });

  console.log(freshIngredients);

  const ingredientIds = splitInput[1].split("\n");
  ingredientIds.forEach((id) => {
    let fresh = false;
    Object.entries(freshIngredients).forEach(([k, v]) => {
      if (id >= parseInt(k) && id <= v) {
        fresh = true;
      }
    });

    if (fresh) {
      freshIngredientCounter += 1;
    }
  });
  console.log(freshIngredientCounter);
});
