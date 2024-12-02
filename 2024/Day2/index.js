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
console.log(ans1);

const solution2 = (data) => {
  const reports = data.split("\n");

  const sum = reports.reduce((sum, report) => {
    const digits = report.split(" ").map((num) => +num);

    const uniqueDigits = [...new Set(digits)];

    if (digits.length - uniqueDigits.length >= 2) {
      return sum;
    }

    if (digits[0] > digits[digits.length - 1]) {
      digits.reverse();
    }

    let prevNum = digits[0];
    let hasError = false;

    for (let i = 1; i < digits.length; i++) {
      const currNum = digits[i];
      const difference = Math.abs(prevNum - currNum);

      const isWithinRange = difference >= 1 && difference <= 3;

      if (isWithinRange && currNum > prevNum) {
        prevNum = currNum;
        continue;
      }

      hasError = true;
    }

    if (hasError) {
      for (let i = 0; i < digits.length; i++) {
        const updatedDigits = [...digits];
        updatedDigits.splice(i, 1);

        let prevNum = updatedDigits[0];
        let hasError = false;

        for (let i = 1; i < updatedDigits.length; i++) {
          const currNum = updatedDigits[i];
          const difference = Math.abs(prevNum - currNum);

          const isWithinRange = difference >= 1 && difference <= 3;

          if (isWithinRange && currNum > prevNum) {
            prevNum = currNum;
            continue;
          }

          hasError = true;
        }

        if (!hasError) {
          return sum + 1;
        }
      }

      return sum;
    }

    return sum + 1;
  }, 0);

  return sum;
};

const ans2 = solution2(data);
console.log(ans2);
