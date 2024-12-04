const { data } = require("./data");

const lines = data.split("\n");

const linesLength = lines.length;
const lineLength = lines[0].length;

let numOfXmasAppearances = 0;
let numOfMasInAnXAppearances = 0;

const indexUpdater = (lineIndex, index, direction) => {
  if (direction.includes("North")) {
    lineIndex--;
  }
  if (direction.includes("East")) {
    index++;
  }
  if (direction.includes("South")) {
    lineIndex++;
  }
  if (direction.includes("West")) {
    index--;
  }

  return {
    updatedLineIndex: lineIndex,
    updatedIndex: index,
    char: lines[lineIndex][index],
  };
};

const checkXmasWord = (lineIndex, index, direction) => {
  const char = lines[lineIndex][index];

  if (char === "M") {
    const { updatedLineIndex, updatedIndex, char } = indexUpdater(
      lineIndex,
      index,
      direction
    );

    if (char === "A") {
      const { char } = indexUpdater(updatedLineIndex, updatedIndex, direction);

      if (char === "S") {
        numOfXmasAppearances++;
      }
    }
  }
};

lines.forEach((line, lineIndex) => {
  let canCheckNorth = false;
  let canCheckEast = false;
  let canCheckSouth = false;
  let canCheckWest = false;

  if (lineIndex > 2) canCheckNorth = true;
  if (lineIndex < linesLength - 3) canCheckSouth = true;

  const letters = line.split("");
  letters.forEach((letter, index) => {
    if (index > 2) canCheckWest = true;
    if (index < linesLength - 3) canCheckEast = true;

    const canCheckNorthEast = canCheckNorth && canCheckEast;
    const canCheckSouthEast = canCheckSouth && canCheckEast;
    const canCheckSouthWest = canCheckSouth && canCheckWest;
    const canCheckNorthWest = canCheckNorth && canCheckWest;

    if (letter === "X") {
      if (canCheckNorth) {
        checkXmasWord(lineIndex - 1, index, "North");
      }
      if (canCheckNorthEast) {
        checkXmasWord(lineIndex - 1, index + 1, "NorthEast");
      }
      if (canCheckEast) {
        checkXmasWord(lineIndex, index + 1, "East");
      }
      if (canCheckSouthEast) {
        checkXmasWord(lineIndex + 1, index + 1, "SouthEast");
      }
      if (canCheckSouth) {
        checkXmasWord(lineIndex + 1, index, "South");
      }
      if (canCheckSouthWest) {
        checkXmasWord(lineIndex + 1, index - 1, "SouthWest");
      }
      if (canCheckWest) {
        checkXmasWord(lineIndex, index - 1, "West");
      }
      if (canCheckNorthWest) {
        checkXmasWord(lineIndex - 1, index - 1, "NorthWest");
      }
    }

    if (letter === "A") {
      const canCheckInAnXShape =
        lineIndex > 0 &&
        lineIndex < linesLength - 1 &&
        index > 0 &&
        index < lineLength - 1;

      if (canCheckInAnXShape) {
        const validCharVariations = ["SSMM", "MMSS", "SMSM", "MSMS"];

        const topLeftValues = indexUpdater(lineIndex, index, "NorthWest");
        const charTopLeft = topLeftValues.char;

        const topRightValues = indexUpdater(lineIndex, index, "NorthEast");
        const charTopRight = topRightValues.char;

        const bottomLeftValues = indexUpdater(lineIndex, index, "SouthWest");
        const charBottomLeft = bottomLeftValues.char;

        const bottomRightValues = indexUpdater(lineIndex, index, "SouthEast");
        const charBottomRight = bottomRightValues.char;

        const charsToCheck =
          charTopLeft + charTopRight + charBottomLeft + charBottomRight;

        if (validCharVariations.includes(charsToCheck)) {
          numOfMasInAnXAppearances++;
        }
      }
    }
  });
});

console.log(numOfXmasAppearances, ": <-- part 1");
console.log(numOfMasInAnXAppearances, ": <-- part 2");
