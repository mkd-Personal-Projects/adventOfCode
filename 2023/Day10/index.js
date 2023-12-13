const { data } = require("./data");

const sampleData = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const findFarthestPoint = (str) => {
  const lines = str.split("\n");

  const lineLength = lines[0].length;
  const strIndexOfS = str.indexOf("S");

  const validChars = {
    top: ["7", "F", "|"],
    right: ["7", "J", "-"],
    bottom: ["L", "J", "|"],
    left: ["L", "F", "-"],
  };

  const nextLocations = {
    top: {
      7: -1,
      F: 1,
      "|": -lineLength - 1,
    },

    right: { 7: lineLength + 1, J: -lineLength - 1, "-": 1 },

    bottom: {
      L: 1,
      J: -1,
      "|": lineLength + 1,
    },

    left: { F: lineLength + 1, L: -lineLength - 1, "-": -1 },
  };

  const checkIsValid = (i, direction) => {
    const key = direction === "top" || direction === "bottom" ? "|" : "-";

    return validChars[direction].includes(
      str[i + nextLocations[direction][key]]
    );
  };

  const updateDirection = (direction, currChar) => {
    if (direction === "top") {
      if (currChar === "7") {
        direction = "left";
      } else if (currChar === "F") {
        direction = "right";
      } else if (currChar === "|") {
        direction = "top";
      }
    } else if (direction === "right") {
      if (currChar === "7") {
        direction = "bottom";
      } else if (currChar === "J") {
        direction = "top";
      } else if (currChar === "-") {
        direction = "right";
      }
    } else if (direction === "bottom") {
      if (currChar === "L") {
        direction = "right";
      } else if (currChar === "J") {
        direction = "left";
      } else if (currChar === "|") {
        direction = "bottom";
      }
    } else if (direction === "left") {
      if (currChar === "F") {
        direction = "bottom";
      } else if (currChar === "L") {
        direction = "top";
      } else if (currChar === "-") {
        direction = "left";
      }
    }

    return direction;
  };

  let currIndex = strIndexOfS;

  const path = {};

  let furthestPipe;

  const populatePath = (direction) => {
    let count = 0;

    let currChar = str[currIndex];

    while (currIndex !== strIndexOfS) {
      count++;

      if (path[count] && path[count].index === currIndex) {
        furthestPipe = count;
      }

      path[count] = { char: str[currIndex], index: currIndex };

      const newIndex = currIndex + nextLocations[direction][currChar];
      const newChar = str[newIndex];

      direction = updateDirection(direction, currChar);

      currIndex = newIndex;
      currChar = newChar;
    }
  };

  if (checkIsValid(strIndexOfS, "top")) {
    currIndex += nextLocations.top["|"];

    populatePath("top");
  }

  if (checkIsValid(strIndexOfS, "right")) {
    currIndex += nextLocations.right["-"];

    populatePath("right");

    if (furthestPipe) {
      return { furthestPipe, path };
    }
  }

  if (checkIsValid(strIndexOfS, "bottom")) {
    currIndex += nextLocations.bottom["|"];

    populatePath("bottom");

    if (furthestPipe) {
      return { furthestPipe, path };
    }
  }

  if (checkIsValid(strIndexOfS, "left")) {
    currIndex += nextLocations.left["-"];

    populatePath("left");

    if (furthestPipe) {
      return { furthestPipe, path };
    }
  }
};

// const { furthestPipe: sampleOutput, path } = findFarthestPoint(sampleData);
// console.log(sampleOutput); //8

const { furthestPipe: outputOne, path } = findFarthestPoint(data);
console.log(outputOne); //6701

const indexs = Object.values(path).map(({ index }) => index);

// const lineLength = 6;
const lineLength = 140;

let top = Math.floor(Math.min(...indexs) / lineLength);
let left = Infinity;

let bottom = Math.floor(Math.max(...indexs) / lineLength);
let right = -Infinity;

indexs.forEach((i) => {
  const line = i % lineLength;
  // const indexAtLine = line

  if (line < left) {
    left = line;
  }
  if (line > right) {
    right = line;
  }
});

console.log(top, right, bottom, left);
console.log(data[bottom]);
