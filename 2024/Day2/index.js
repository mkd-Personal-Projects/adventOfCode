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

// const solution2 = (data) => {
//   const reports = data.split("\n");

//   const sum = reports.reduce((sum, report) => {
//     const digits = report.split(" ").map((num) => +num);

//     if (digits[0] > digits[digits.length - 1]) {
//       digits.reverse();
//     }

//     const isWithinRangeCheck = (a, b) => {
//       const difference = Math.abs(a - b);

//       return difference >= 1 && difference <= 3;
//     };

//     let prevNum = digits[0];
//     let toleranceLevel = 0;

//     for (let i = 1; i < digits.length; i++) {
//       const currNum = digits[i];
//       const isWithinRange = isWithinRangeCheck(prevNum, currNum);

//       if (isWithinRange && currNum > prevNum) {
//         prevNum = currNum;
//         continue;
//       }

//       toleranceLevel++;

//       if (toleranceLevel >= 2) {
//         return sum;
//       }

//       if (i === digits.length - 1) {
//         continue;
//       }

//       const nextNum = digits[i + 1];
//       const isNextNumWithinRange = isWithinRangeCheck(currNum, nextNum);

//       if (isNextNumWithinRange && nextNum > currNum) {
//         prevNum = nextNum;
//         i++;
//         continue;
//       }
//     }

//     return sum + 1;
//   }, 0);

//   return sum;
// };

// const ans2 = solution2(data);
// console.log(ans2);

const solution2 = (data) => {
  const reports = data.split("\n");

  const sum = reports.reduce((sum, report) => {
    const digits = report.split(" ").map((num) => +num);

    let toleranceLevel = 0;

    const uniqueDigits = [...new Set(digits)];

    if (digits.length - uniqueDigits.length >= 2) {
      return sum;
    }

    if (digits[0] > digits[digits.length - 1]) {
      digits.reverse();
    }

    const isWithinRangeCheck = (a, b) => {
      const difference = Math.abs(a - b);

      return difference >= 1 && difference <= 3;
    };

    let prevNum = digits[0];

    for (let i = 1; i < digits.length; i++) {
      const currNum = digits[i];
      const isWithinRange = isWithinRangeCheck(prevNum, currNum);

      if (isWithinRange && currNum > prevNum) {
        prevNum = currNum;
        continue;
      }

      toleranceLevel++;

      if (toleranceLevel >= 2) {
        return sum;
      }

      if (!isWithinRange && i > 1 && prevNum !== currNum) {
        const nextNum = digits[i + 1];

        if (isWithinRangeCheck(prevNum, nextNum) && nextNum > prevNum) {
          prevNum = nextNum;
          i++;
          continue;
        }

        return sum;
      }

      prevNum = currNum;

      // 1 5 6 7 8
    }

    return sum + 1;
  }, 0);

  return sum;
};

const ans2 = solution2(data);
console.log(ans2);

const testData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
const test = solution2(testData);
console.log(test, ": To Be -> 4");
