const { data } = require("./data");

function checkHasSequence(num) {
  for (let i = 0; i < num.length / 2; i++) {
    const slicedNum = num.slice(0, i + 1);
    const regex = new RegExp(`^(${slicedNum})\\1+$`, "g");

    const hasSequence = num.match(regex) !== null;

    if (hasSequence) {
      return true;
    }
  }

  return false;
}

function getInvalidIdTotal(input) {
  const idRanges = input.split(",");

  let sum = 0;

  for (const idRange of idRanges) {
    const [startId, endId] = idRange.split("-").map((num) => +num);

    for (let currentId = startId; currentId <= endId; currentId++) {
      const num = currentId.toString();

      const isInvalidID = checkHasSequence(num);

      if (isInvalidID) {
        sum += currentId;
      }
    }
  }

  return sum;
}

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

console.log(`\n Sum:`, getInvalidIdTotal(input));
