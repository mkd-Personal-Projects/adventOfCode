const { data } = require("./data");

const sampleData = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const checkNumber = (num) => !isNaN(+num);

const checkChar = (char) => (char ? /[^.\d]/.test(char) : false);

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

  const sumOfGears = stars.reduce((accumulator, star) => {
    const { index, lineIndex } = star;

    let totalAdjacentNums = 0;

    let sumGears = 0;
    let gearsCount = 0;

    const startIndex = index == 0 ? index : index - 1;
    const endIndex = index + 1 === lines.length - 1 ? index + 1 : index + 2;

    if (lineIndex > 0) {
      const aboveStr = lines[lineIndex - 1].slice(startIndex, endIndex);
      const result = aboveStr.match(/\d+/g);

      if (result) {
        totalAdjacentNums += result.length;

        const nums = numbers.filter((numObj) => {
          const { num, index, lineIndex: numLineIndex } = numObj;

          const isSameLine = numLineIndex === lineIndex - 1;
          const startsWithinCaptureGroup =
            index >= startIndex && index <= startIndex + 2;
          const endsWithinCaptureGroup =
            index + num.length - 1 >= startIndex &&
            index + num.length - 1 <= startIndex + 2;

          return (
            isSameLine && (startsWithinCaptureGroup || endsWithinCaptureGroup)
          );
        });

        if (nums.length) {
          gearsCount += nums.length;

          const numsTimes = nums.reduce(
            (accumulator, { num }) => accumulator * +num,
            1
          );

          sumGears = numsTimes;
        }
      }

      hasAboveNum = result;
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

    const nums = numbers.filter((numObj) => {
      const { num, index, lineIndex: numLineIndex } = numObj;

      const isSameLine = numLineIndex === lineIndex;
      const startsWithinCaptureGroup =
        index >= startIndex && index <= startIndex + 2;
      const endsWithinCaptureGroup =
        index + num.length - 1 >= startIndex &&
        index + num.length - 1 <= startIndex + 2;

      return isSameLine && (startsWithinCaptureGroup || endsWithinCaptureGroup);
    });

    if (nums.length) {
      gearsCount += nums.length;

      const numsTimes = nums.reduce(
        (accumulator, { num }) => accumulator * +num,
        1
      );

      if (!gearsCount) {
        sumGears = numsTimes;
      } else if (!sumGears) {
        sumGears += numsTimes;
      } else {
        sumGears *= numsTimes;
      }
    }

    if (lineIndex !== lines.length - 1) {
      const belowStr = lines[lineIndex + 1].slice(startIndex, endIndex);
      const result = belowStr.match(/\d+/g);

      if (result) {
        totalAdjacentNums += result.length;

        const nums = numbers.filter((numObj) => {
          const { num, index, lineIndex: numLineIndex } = numObj;

          const isSameLine = numLineIndex === lineIndex + 1;
          const startsWithinCaptureGroup =
            index >= startIndex && index <= startIndex + 2;
          const endsWithinCaptureGroup =
            index + num.length - 1 >= startIndex &&
            index + num.length - 1 <= startIndex + 2;

          return (
            isSameLine && (startsWithinCaptureGroup || endsWithinCaptureGroup)
          );
        });

        if (nums.length) {
          gearsCount += nums.length;

          const numsTimes = nums.reduce(
            (accumulator, { num }) => accumulator * +num,
            1
          );

          if (!gearsCount) {
            sumGears = numsTimes;
          } else if (!sumGears) {
            sumGears += numsTimes;
          } else {
            sumGears *= numsTimes;
          }
        }
      }
    }

    if (gearsCount >= 2 && sumGears === 0) {
      console.log(sumGears, lineIndex, index, currCharsToCheck);
    }

    return gearsCount >= 2 ? accumulator + sumGears : accumulator;
  }, 0);

  return { sumOfParts, sumOfGears };
};

const { sumOfGears, sumOfParts } = sumOfNumsOneVerTwo(sampleData);
console.log(sumOfParts); //4361
console.log(sumOfGears); //467835

const { sumOfGears: outputTwo, sumOfParts: outputOne } =
  sumOfNumsOneVerTwo(data);
console.log(outputOne); //549908
console.log(outputTwo); //81166799
