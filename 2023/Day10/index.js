const { data } = require("./data");

const sampleData = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const findFarthestPoint = (str) => {
  const lines = str.split("\n");

  const lineWithS = lines.filter((line) => line.indexOf("S") !== -1)[0];
  const indexOfLineWithS = lines.indexOf(lineWithS);
  const strIndexOfS = lineWithS.length * indexOfLineWithS + indexOfLineWithS;

  const validTopChars = ["7", "F", "|"];
  const validRightChars = ["7", "J", "-"];
  const validBottomChars = ["L", "J", "|"];
  const validLeftChars = ["L", "F", "-"];

  const nextLocations = {
    top: {
      7: -lineWithS.length - 2,
      F: -lineWithS.length,
      "|": -lineWithS.length - 1,
    },

    right: { 7: lineWithS.length + 2, J: -lineWithS.length, "-": 1 },

    bottom: {
      L: lineWithS.length + 2,
      J: lineWithS.length,
      "|": lineWithS.length + 1,
    },

    left: { F: lineWithS.length, L: -lineWithS.length - 2, "-": -1 },
  };

  const checkIsValidTop = (i) =>
    validTopChars.includes(str[i + nextLocations.top["|"]]);

  const checkIsValidRight = (i) =>
    validRightChars.includes(str[i + nextLocations.right["-"]]);

  const checkIsValidBottom = (i) =>
    validBottomChars.includes(str[i + nextLocations.bottom["|"]]);

  const checkIsValidLeft = (i) =>
    validLeftChars.includes(str[i + nextLocations.left["-"]]);

  const checkS = (i) =>
    [
      str[i + nextLocations.top["|"]],
      str[i + nextLocations.right["-"]],
      str[i + nextLocations.bottom["|"]],
      str[i + nextLocations.left["-"]],
    ].some((val) => val === "S");

  const updateIndex = (direction) => {
    let key = direction === "top" || direction === "bottom" ? "|" : "-";
    return nextLocations[direction][
      str[[currIndex + nextLocations[direction][key]]]
    ];
  };

  let currIndex;
  let prevIndex;

  const obj = {};

  let furthestPipe;

  const populateObj = () => {
    let count = 0;

    while (currIndex !== strIndexOfS) {
      //   console.log(str[currIndex]);
      //   console.log(currIndex, " < before change");

      count++;

      if (obj[currIndex] && obj[currIndex].distance === count) {
        furthestPipe = count;
      }

      obj[currIndex] = { char: str[currIndex], distance: count };

      if (
        checkIsValidTop(currIndex) &&
        currIndex + updateIndex("top") !== prevIndex
      ) {
        prevIndex = currIndex;
        currIndex += updateIndex("top");

        // console.log(str[currIndex], currIndex, " top");
      } else if (
        checkIsValidRight(currIndex) &&
        currIndex + updateIndex("right") !== prevIndex
      ) {
        prevIndex = currIndex;
        currIndex += updateIndex("right");

        // console.log(str[currIndex], currIndex, " right");
      } else if (
        checkIsValidBottom(currIndex) &&
        currIndex + updateIndex("bottom") !== prevIndex
      ) {
        prevIndex = currIndex;
        currIndex += updateIndex("bottom");

        // console.log(str[currIndex], currIndex, " bottom");
      } else if (
        checkIsValidLeft(currIndex) &&
        currIndex + updateIndex("left") !== prevIndex
      ) {
        prevIndex = currIndex;
        currIndex += updateIndex("left");

        // console.log(str[currIndex], currIndex, " left");
      } else if (checkS(currIndex)) {
        currIndex = strIndexOfS;
      }

      //   console.log(" ");
    }
  };

  if (checkIsValidTop(strIndexOfS)) {
    let char = str[strIndexOfS + nextLocations.top["|"]];
    currIndex = strIndexOfS + nextLocations.top[char];

    populateObj();
  }

  if (checkIsValidRight(strIndexOfS)) {
    let char = str[strIndexOfS + nextLocations.right["-"]];
    currIndex = strIndexOfS + nextLocations.right[char];

    populateObj();
    console.log("true", obj);

    if (furthestPipe) {
      return furthestPipe;
    }
  }

  if (checkIsValidBottom(strIndexOfS)) {
    let char = str[strIndexOfS + nextLocations.bottom["|"]];
    currIndex = strIndexOfS + nextLocations.bottom[char];

    populateObj();
    console.log("true", obj);

    if (furthestPipe) {
      return furthestPipe;
    }
  }

  if (checkIsValidLeft(strIndexOfS)) {
    let char = str[strIndexOfS + nextLocations.left["-"]];
    currIndex = strIndexOfS + nextLocations.left[char];

    populateObj();
    if (furthestPipe) {
      return furthestPipe;
    }
  }

  console.log(furthestPipe);
};

const sampleOutput = findFarthestPoint(sampleData);
// console.log(sampleOutput) //8
