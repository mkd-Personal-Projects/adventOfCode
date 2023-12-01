const { data } = require("./data");

const sampleDataOne = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

const combineCalibrationValueOne = (amendedDoc) => {
  const amendedDocLines = amendedDoc.split("\n");

  return amendedDocLines.reduce((accumulator, eachLine) => {
    let calibrationValueNum1 = "";
    let calibrationValueNum2 = "";

    for (let i = 0; i < eachLine.length; i++) {
      if (!calibrationValueNum1) {
        const currCharFront = eachLine[i];

        calibrationValueNum1 = isNaN(+currCharFront) ? "" : currCharFront;
      }

      if (!calibrationValueNum2) {
        const currCharBack = eachLine[eachLine.length - i - 1];

        calibrationValueNum2 = isNaN(+currCharBack) ? "" : currCharBack;
      }
    }
    const finalCalibrationValue = calibrationValueNum1 + calibrationValueNum2;

    return accumulator + +finalCalibrationValue;
  }, 0);
};

const sampleOutputOne = combineCalibrationValueOne(sampleDataOne);
console.log(sampleOutputOne); //142

const outputOne = combineCalibrationValueOne(data);
console.log(outputOne); // 54940

const sampleDataTwo = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

const combineCalibrationValueTwo = (amendedDoc) => {
  const amendedDocLines = amendedDoc.split("\n");

  return amendedDocLines.reduce((accumulator, eachLine) => {
    const numbers = [];

    for (let i = 0; i < eachLine.length; i++) {
      const currChar = eachLine[i];

      switch (true) {
        case eachLine.slice(i, i + 3) === "one":
          numbers.push("1");
          break;

        case eachLine.slice(i, i + 3) === "two":
          numbers.push("2");
          break;

        case eachLine.slice(i, i + 5) === "three":
          numbers.push("3");
          break;

        case eachLine.slice(i, i + 4) === "four":
          numbers.push("4");
          break;

        case eachLine.slice(i, i + 4) === "five":
          numbers.push("5");
          break;

        case eachLine.slice(i, i + 3) === "six":
          numbers.push("6");
          break;

        case eachLine.slice(i, i + 5) === "seven":
          numbers.push("7");
          break;

        case eachLine.slice(i, i + 5) === "eight":
          numbers.push("8");
          break;

        case eachLine.slice(i, i + 4) === "nine":
          numbers.push("9");
          break;

        case !isNaN(+currChar):
          numbers.push(currChar);
          break;
      }
    }

    const finalCalibrationValue = numbers[0] + numbers[numbers.length - 1];

    return accumulator + +finalCalibrationValue;
  }, 0);
};

const sampleOutputTwo = combineCalibrationValueTwo(sampleDataTwo);
console.log(sampleOutputTwo); //281

const outputTwo = combineCalibrationValueTwo(data);
console.log(outputTwo); // 54208
