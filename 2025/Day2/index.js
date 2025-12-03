const { data } = require("./data");

function getInvalidIdTotal(input) {
  const idRanges = input.split(",");

  let sum = 0;

  for (const idRange of idRanges) {
    const [startId, endId] = idRange.split("-").map((num) => +num);

    for (let currentId = startId; currentId <= endId; currentId++) {
      const num = currentId.toString();
      const isOddLength = num.length % 2 === 1;

      if (isOddLength) continue;

      const digits = num.split("");
      const middleIndex = digits.length / 2;

      const digitsEndHalf = digits.splice(middleIndex, middleIndex);

      let isInvalidID = true;

      for (let i = 0; i < digits.length; i++) {
        if (digits[i] !== digitsEndHalf[i]) {
          isInvalidID = false;
          break;
        }
      }

      if (isInvalidID) {
        sum += currentId;
      }
    }

    // console.log("\n");
  }

  return sum;
}

const testData = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862`;

let run = "actual";
run = "test";

const input = run === "actual" ? data : testData;

// console.log(`\n Sum:`, getInvalidIdTotal(input));

function hasSequence(sequence) {
  let isSequence = false;

  const digits = sequence.split("");

  if (digits.length & (2 === 0)) {
    //
  }

  for (let i = 0; i < digits.length; i++) {
    const num = digits[i];

    console.log(digits.indexOf(num));
  }

  return isSequence;
}

/*

Check every two digits if they are the same 

if even check middle same as original
if odd check by splitting in three ways and if all 3 are the same 

*/

console.log("\n", hasSequence("123123123"), "\n");
// console.log("\n", hasSequence("1188511885"))
// console.log("\n", hasSequence("1212121212"))
