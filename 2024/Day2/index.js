const { data } = require("./data");

const solution1 = (data) => {
  const reports = data.split("\n");

  const sum = reports.reduce((sum, report) => {
    const digits = report.split(" ").map((num) => +num);

    if (digits[0] > digits[digits.length - 1]) {
      digits.reverse();
    }

    let prevNum = digits[0];

    for (let i = 1; i < digits.length; i++) {
      const currNum = digits[i];
      const difference = Math.abs(prevNum - currNum);

      if (difference < 1 || difference > 3 || prevNum > currNum) {
        return sum;
      }

      prevNum = currNum;
    }

    return sum + 1;
  }, 0);

  return sum;
};

const ans1 = solution1(data);
// console.log(ans1);

const solution2 = (data) => {
  const reports = data.split("\n");

  const sum = reports.reduce((sum, report) => {
    const digits = report.split(" ").map((num) => +num);

    if (digits[0] > digits[digits.length - 1]) {
      digits.reverse();
    }

    const isWithinRangeCheck = (a, b) => {
      const difference = Math.abs(a - b);

      return difference >= 1 && difference <= 3;
    };

    let prevNum = digits[0];
    let toleranceLevel = 0;

    for (let i = 1; i < digits.length; i++) {
      const currNum = digits[i];
      const isWithinRange = isWithinRangeCheck(prevNum, currNum);

      if (isWithinRange && currNum > prevNum) {
        continue;
      }

      toleranceLevel++;

      if (currNum === digits[digits.length - 1]) {
        if (toleranceLevel >= 1) {
          return sum + 1;
        }

        return sum;
      }

      const isNextNumWithinRange = isWithinRangeCheck(currNum, digits[i + 1]);

      if (currNum < prevNum) {
        if (isNextNumWithinRange && digits[i + 1] > currNum) {
          prevNum = currNum;
        }

        continue;
      }

      if (isNextNumWithinRange) {
        prevNum = currNum;
      }

      // 8 7 9 11 15
      // 8 7 5 11 15
      // 8 9 6 11 15
    }

    return sum + 1;
  }, 0);

  return sum;
};

const ans2 = solution2(data);
console.log(ans2);
