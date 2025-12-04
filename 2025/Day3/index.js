const { data } = require("./data");

function getHighestValues(input) {
  const banks = input.split("\n");

  let sum = 0;

  for (let i = 0; i < banks.length; i++) {
    const batteries = banks[i].split("");

    let nums = "";

    const firstNum = Math.max(...batteries.slice(0, batteries.length - 12));
    let currentNumIndex = batteries.join("").indexOf(firstNum);
    console.log(currentNumIndex);

    for (let i = 11; i > 0; i--) {
      currentNumIndex++;
      const slicedBatteries = batteries.slice(currentNumIndex);

      const currentNum = Math.max(...slicedBatteries, batteries.length - i);

      currentNumIndex =
        slicedBatteries.join("").indexOf(currentNum) + currentNumIndex;
      console.log(currentNumIndex, currentNum);
      nums += currentNum;
    }

    // const firstNum = Math.max(...battries.slice(0, battries.length - 1));
    // const firstNumIndex = battries.join("").indexOf(firstNum);

    // const secondNum = Math.max(...battries.slice(firstNumIndex + 1));

    // const finalNum = +`${firstNum}${secondNum}`;

    console.log(nums);

    sum += +nums;
  }

  return sum;
}

const testData = `987654321111111
811111111111119
234234234234278
818181911112111`;

let run = "actual";
run = "test";

const input = run === "actual" ? data : testData;

console.log("\n", getHighestValues(input));
