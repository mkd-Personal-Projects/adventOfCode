// const { data } = require("./data");

const data = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const horizontalLines = data.split("\n");

const directionTable = {
  "^": "North",
  v: "South",
  ">": "East",
  "<": "West",
};

const getGuardPosition = (horizontalLines) => {
  const initialPos = horizontalLines.join("").match(/([^.#XO])/);
  const char = initialPos[1];

  const currentDirection = directionTable[char];
  const linePosition = initialPos.index % horizontalLines.length;
  const lineNumber = Math.floor(initialPos.index / horizontalLines.length);

  return { char, currentDirection, linePosition, lineNumber };
};

const getNextCharInfo = (
  { currentDirection, linePosition, lineNumber },
  horizontalLines
) => {
  if ("North" === currentDirection) {
    lineNumber--;
  }

  if ("South" === currentDirection) {
    lineNumber++;
  }

  if ("East" === currentDirection) {
    linePosition++;
  }

  if ("West" === currentDirection) {
    linePosition--;
  }

  let char = null;

  if (
    horizontalLines[lineNumber] &&
    horizontalLines[lineNumber][linePosition]
  ) {
    char = horizontalLines[lineNumber][linePosition];
  }

  return {
    char,
    lineNumber,
    linePosition,
    currentDirection,
  };
};

const updatePositionWith = (
  { linePosition, lineNumber },
  char,
  horizontalLines
) => {
  const line = horizontalLines[lineNumber].split("");
  line[linePosition] = char;
  horizontalLines[lineNumber] = line.join("");
};

const updateDirection = (
  { currentDirection, linePosition, lineNumber },
  horizontalLines
) => {
  const nextCharTable = {
    North: ">",
    South: "<",
    East: "v",
    West: "^",
  };

  const updatedChar = nextCharTable[currentDirection];
  const updatedDirection = directionTable[updatedChar];

  const nextCharInfo = getNextCharInfo(
    {
      currentDirection: updatedDirection,
      linePosition,
      lineNumber,
    },
    horizontalLines
  );

  updatePositionWith(nextCharInfo, updatedChar, horizontalLines);
};

const generateGuardPaths = (horizontalLines) => {
  let canKeepGoing = true;

  while (canKeepGoing) {
    const currPosition = getGuardPosition(horizontalLines);
    updatePositionWith(currPosition, "X", horizontalLines);

    const nextCharInfo = getNextCharInfo(currPosition);

    if (!nextCharInfo.char) {
      canKeepGoing = false;
    } else {
      if (nextCharInfo.char !== "#") {
        updatePositionWith(nextCharInfo, currPosition.char, horizontalLines);
      } else {
        updateDirection(currPosition, horizontalLines);
      }
    }
  }

  const allXs = [...horizontalLines.join("").matchAll(/X/g)].map(
    ([val]) => val
  );

  return allXs.length;
};

// const ans1 = generateGuardPaths([...horizontalLines]);
// console.log(ans1);

const findGuardPathsInfiniteLoops = (horizontalLines) => {
  let sum = 0;

  for (let i = 0; i < horizontalLines.length; i++) {
    const currLine = horizontalLines[i];
    for (let j = 0; j < currLine.length; j++) {
      const tempHorisontalLines = [...horizontalLines];

      const currChar = tempHorisontalLines[i][j];
      const invalidChars = [`#`, ">", "<", "^", "v"];
      if (invalidChars.includes(currChar)) {
        continue;
      }

      updatePositionWith(
        { linePosition: j, lineNumber: i },
        "#",
        tempHorisontalLines
      );

      console.log(tempHorisontalLines.join("\n"));
      console.log("");

      let numOfOccurances = 0;
      let tempLast4Positions = "";
      const last4Positions = [];

      let canKeepGoing = true;

      for (let count = 1; canKeepGoing; count++) {
        if (numOfOccurances === 3) {
          sum++;
          break;
        }

        const currPosition = getGuardPosition(tempHorisontalLines);
        updatePositionWith(currPosition, "X", tempHorisontalLines);

        const nextCharInfo = getNextCharInfo(currPosition, tempHorisontalLines);

        if (!nextCharInfo.char) {
          canKeepGoing = false;
          break;
        }

        // console.log(currPosition, tempHorisontalLines);

        if (nextCharInfo.char !== "#") {
          updatePositionWith(
            nextCharInfo,
            currPosition.char,
            tempHorisontalLines
          );
        } else {
          updateDirection(currPosition, tempHorisontalLines);
          last4Positions.push({
            x: currPosition.linePosition,
            y: currPosition.lineNumber,
          });

          if (last4Positions.length % 4 === 0) {
            const currLast4Positions = JSON.stringify(last4Positions);
            last4Positions.splice(0);
            // console.log(currLast4Positions);

            if (currLast4Positions === tempLast4Positions) {
              console.log(numOfOccurances);
              numOfOccurances++;
              break;
            }

            tempLast4Positions = currLast4Positions;
          }
        }
      }

      // console.log("");
      // console.log(tempHorisontalLines.join("\n"));
      // console.log(numOfOccurances);
    }
  }

  return sum;
};

const ans2 = findGuardPathsInfiniteLoops([...horizontalLines]);
console.log(ans2);
