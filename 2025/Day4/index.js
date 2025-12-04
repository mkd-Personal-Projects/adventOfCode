const { data } = require("./data.js");

function countAdjacentRolls(input, lineIndex, charIndex) {
  const lineLength = input[0].length;
  const lineCount = input.length;

  const indexesToCheck = [];

  if (lineIndex !== 0) {
    const topMiddle = (lineIndex - 1) * lineLength + charIndex;
    indexesToCheck.push(topMiddle);
  }

  if (charIndex !== 0) {
    const left = lineIndex * lineLength + charIndex - 1;
    indexesToCheck.push(left);
  }

  if (charIndex !== lineLength - 1) {
    const right = lineIndex * lineLength + charIndex + 1;
    indexesToCheck.push(right);
  }

  if (lineIndex !== lineCount - 1) {
    const bottomMiddle = (lineIndex + 1) * lineLength + charIndex;
    indexesToCheck.push(bottomMiddle);
  }

  if (lineIndex !== 0 && charIndex !== 0) {
    const topLeft = (lineIndex - 1) * lineLength + charIndex - 1;
    indexesToCheck.push(topLeft);
  }

  if (lineIndex !== 0 && charIndex !== lineLength - 1) {
    const topRight = (lineIndex - 1) * lineLength + charIndex + 1;
    indexesToCheck.push(topRight);
  }

  if (lineIndex !== lineCount - 1 && charIndex !== 0) {
    const bottomLeft = (lineIndex + 1) * lineLength + charIndex - 1;
    indexesToCheck.push(bottomLeft);
  }

  if (lineIndex !== lineCount - 1 && charIndex !== lineLength - 1) {
    const bottomRight = (lineIndex + 1) * lineLength + charIndex + 1;
    indexesToCheck.push(bottomRight);
  }

  let count = 0;

  const str = input.join("");

  for (i of indexesToCheck) {
    if (str[i] === "@") {
      count++;
    }
  }

  return count;
}

// console.log("\n", countAdjacentRolls(testData.split("\n"), 9, 9));

function calcAccessiblePaperRolls(lines) {
  let count = 0;

  const lineLength = lines[0].length;

  const rollIndexesToRemove = [];

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const currentLine = lines[lineIndex];

    for (let charIndex = 0; charIndex < lineLength; charIndex++) {
      const char = currentLine[charIndex];
      if (char === ".") continue;

      const adjacentRollsNo = countAdjacentRolls(lines, lineIndex, charIndex);

      if (adjacentRollsNo < 4) {
        rollIndexesToRemove.push(lineIndex * lineLength + charIndex);
        count++;
      }
    }
  }

  return { count, rollIndexesToRemove };
}

const testData = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

// console.log("\n", calcAccessiblePaperRolls(input.split("\n")));

function removeAllAdjacentRolls(input) {
  const lines = input.split("\n");

  let runningTotal = 0;
  let currentTotal = 0;

  const { count, rollIndexesToRemove } = calcAccessiblePaperRolls(lines);

  runningTotal += count;
  currentTotal += count;

  rollIndexesToRemove.forEach((i) => removeRoll(i, lines));

  while (currentTotal !== 0) {
    const { count, rollIndexesToRemove } = calcAccessiblePaperRolls(lines);
    currentTotal = count;

    if (currentTotal !== 0) {
      rollIndexesToRemove.forEach((i) => removeRoll(i, lines));
      runningTotal += count;
    }
  }

  return runningTotal;
}

function removeRoll(index, lines) {
  const lineCount = lines[0].length;
  const lineIndex = Math.floor(index / lineCount);
  const charIndex = index % lineCount;

  const line = lines[lineIndex];

  lines[lineIndex] = line.slice(0, charIndex) + "." + line.slice(charIndex + 1);
}

console.log("\n", removeAllAdjacentRolls(input));
