const { data } = require("./data");

function getHighestValues(input) {
  const banks = input.split("\n");

  let sum = 0;

  for (let i = 0; i < banks.length; i++) {
    const batteries = banks[i].split("");

    let nums = "";

    const firstNum = Math.max(...batteries.slice(0, batteries.length - 11));
    let currentNumIndex = batteries.join("").indexOf(firstNum);

    console.log(
      currentNumIndex,
      firstNum,
      batteries.slice(0, batteries.length - 12).join("")
    );

    nums += firstNum;

    for (let i = 10; i >= 0; i--) {
      currentNumIndex++;
      const slicedBatteries = batteries.slice(currentNumIndex);

      const currentNum = Math.max(
        ...slicedBatteries.slice(0, slicedBatteries.length - i)
      );

      currentNumIndex =
        slicedBatteries.join("").indexOf(currentNum) + currentNumIndex;

      console.log(
        currentNumIndex,
        currentNum,
        slicedBatteries.slice(0, slicedBatteries.length - i).join(""),
        i
      );

      nums += currentNum;
    }

    console.log(nums, "\n");

    sum += +nums;
  }

  return sum;
}

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

console.log("\n", getHighestValues(input));
