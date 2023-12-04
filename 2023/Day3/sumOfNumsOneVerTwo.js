const { checkNumber, checkChar } = require(".");

// const sampleOutputOne = sumOfNumsOne(sampleData);
// console.log(sampleOutputOne); //4361
// const outputOne = sumOfNumsOne(data);
// console.log(outputOne);
// 547476 -> too low?
const sumOfNumsOneVerTwo = (str) => {
  const lines = str.split("\n");
  const numbers = [];
  const stars = [];

  lines.forEach((line, lineIndex) => {
    let currNumStr = "";
    let startIndex = null;

    for (let i = 0; i <= line.length; i++) {
      const isNumber = checkNumber(line[i]);

      if (line[i] === "*") {
        stars.push({
          char: line[i],
          index: i,
          lineIndex: lineIndex,
        });
      }

      if (isNumber) {
        currNumStr += line[i];

        if (startIndex === null) {
          startIndex = i;
        }
      } else if (currNumStr !== "") {
        numbers.push({
          num: currNumStr,
          index: startIndex,
          lineIndex: lineIndex,
        });

        currNumStr = "";
        startIndex = null;
      }
    }
  });

  const sumOfParts = numbers.reduce((accumulator, numObj) => {
    const { num, index, lineIndex } = numObj;

    let hasAboveSymbol = false;
    let hasBelowSymbol = false;

    const startIndex = index == 0 ? index : index - 1;
    const endIndex =
      index + num.length === lines.length - 1
        ? index + num.length
        : index + num.length + 1;

    if (lineIndex > 0) {
      const aboveStr = lines[lineIndex - 1].slice(startIndex, endIndex);
      hasAboveSymbol = checkChar(aboveStr);
    }

    if (lineIndex !== lines.length - 1) {
      const belowStr = lines[lineIndex + 1].slice(startIndex, endIndex);

      hasBelowSymbol = checkChar(belowStr);
    }

    let currCharStartIndex = index;
    let currCharEndIndex = index + num.length;

    if (index > 0) {
      currCharStartIndex -= 1;
    }

    if (index < lines.length - 1) {
      currCharEndIndex += 1;
    }

    const currCharsToCheck = lines[lineIndex].slice(startIndex, endIndex);

    hasInLineSymbol = checkChar(currCharsToCheck);

    hasAdjacentSymbol = hasInLineSymbol || hasAboveSymbol || hasBelowSymbol;

    if (hasAdjacentSymbol) {
      return accumulator + +num;
    }
    return accumulator;
  }, 0);

  //   console.log(stars);
  //   console.log(numbers);
  const getIndexPositions = (accumulator, char, i) => {
    if (checkNumber(char)) {
      if (accumulator && accumulator[0] + 1 === i) {
        return [i - 1];
      } else {
        return [...accumulator, i - 1];
      }
    }
    return accumulator;
  };

  const sumOfGears = stars.reduce((accumulator, star) => {
    const { char, index, lineIndex } = star;

    let hasAboveNum = false;
    let hasBelowNum = false;
    let totalAdjacentNums = 0;

    const numsToFind = [];

    const startIndex = index == 0 ? index : index - 1;
    const endIndex = index + 1 === lines.length - 1 ? index + 1 : index + 2;

    if (lineIndex > 0) {
      const aboveStr = lines[lineIndex - 1].slice(startIndex, endIndex);
      const result = aboveStr.match(/\d+/g);

      if (result) {
        totalAdjacentNums += result.length;

        console.log(aboveStr);

        const numberPositions = aboveStr
          .split("")
          .reduce(getIndexPositions, []);

        console.log(numberPositions);

        // numsToFind.push()
      }

      hasAboveNum = result;
      //   console.log(aboveStr, hasAboveNum, totalAdjacentNums);
    }

    let currCharStartIndex = index;
    let currCharEndIndex = index + 1;

    if (index > 0) {
      currCharStartIndex -= 1;
    }

    if (index < lines.length - 1) {
      currCharEndIndex += 1;
    }

    const currCharsToCheck = lines[lineIndex].slice(startIndex, endIndex);

    hasInLineNum = currCharsToCheck.match(/\d+/);

    // console.log(belowStr, hasBelowNum, totalAdjacentNums)
    if (lineIndex !== lines.length - 1) {
      const belowStr = lines[lineIndex + 1].slice(startIndex, endIndex);
      const result = belowStr.match(/\d+/g);

      if (result) {
        totalAdjacentNums += result.length;
        // console.log(belowStr.match(/\d+/));
        // numsToFind.push()
        // console.log(belowStr);
        const numberPositions = belowStr
          .split("")
          .reduce(getIndexPositions, []);

        // console.log(numberPositions);
        // numsToFind.push()
      }

      hasBelowNum = result;
      //   console.log(belowStr, hasBelowNum, totalAdjacentNums);
    }

    hasAdjacentNum = hasInLineNum || hasAboveNum || hasBelowNum;

    // console.log(hasAdjacentNum, lines[lineIndex]);
  }, 0);

  return sumOfParts;
};
exports.sumOfNumsOneVerTwo = sumOfNumsOneVerTwo;
