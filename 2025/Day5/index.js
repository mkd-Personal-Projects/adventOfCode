const { data } = require("./data");

function formatInput(input) {
  const [freshIdRanges, ingredientsIds] = input
    .split("\n\n")
    .map((groups) => groups.split("\n"));

  freshIdRanges.sort((a, b) => {
    return +a.split("-")[0] - +b.split("-")[0];
  });

  return { freshIdRanges, ingredientsIds };
}

function findFreshIngredients(freshIdRanges, ingredientsIds) {
  let count = 0;

  for (const id of ingredientsIds) {
    for (const idRange of freshIdRanges) {
      const [rangeStart, rangeEnd] = idRange.split("-").map((num) => +num);

      if (id >= rangeStart && id <= rangeEnd) {
        count++;
        break;
      }
    }
  }

  return count;
}

function countFreshIngredients(freshIdRanges) {
  const idRanges = freshIdRanges.map((range) =>
    range.split("-").map((num) => +num)
  );

  let tempRangeStart = idRanges[0][0];
  let tempRangeEnd = idRanges[0][1];

  let count = 0;

  for (let i = 1; i < idRanges.length; i++) {
    const [rangeStart, rangeEnd] = idRanges[i];

    if (tempRangeEnd > rangeEnd) continue;

    if (tempRangeEnd < rangeStart) {
      count += tempRangeEnd - tempRangeStart + 1;

      tempRangeStart = rangeStart;
      tempRangeEnd = rangeEnd;

      continue;
    } else {
      tempRangeEnd = rangeEnd;
    }
  }

  count += tempRangeEnd - tempRangeStart + 1;

  return count;
}

const testData = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

const { freshIdRanges, ingredientsIds } = formatInput(input);

// console.log("\n", findFreshIngredients(freshIdRanges, ingredientsIds));
console.log("\n", countFreshIngredients(freshIdRanges));
