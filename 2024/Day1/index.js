const { data } = require("./data");

const lines = data.split("\n");

const pairs1 = [];
const pairs2 = [];

lines.forEach((pair) => {
  const [_, pair1, pair2] = pair.match(/(\d+)\s+(\d+)/);
  pairs1.push(pair1);
  pairs2.push(pair2);
});

let sum = 0;

pairs1.sort((a, b) => a - b);
pairs2.sort((a, b) => a - b);

pairs1.forEach((pair1, i) => {
  const pair2 = pairs2[i];
  const tempSum = +pair1 - +pair2;

  if (tempSum > 0) {
    sum += tempSum;
  } else {
    sum += -tempSum;
  }
});

console.log(sum, " ans 1");

const occurrencesPairs2 = pairs2.reduce((occurrences, pair) => {
  if (occurrences[pair]) {
    return { ...occurrences, [pair]: occurrences[pair] + 1 };
  }

  return { ...occurrences, [pair]: 1 };
}, {});

let ans2Sum = 0;

pairs1.forEach((pair1, i) => {
  if (occurrencesPairs2[pair1]) {
    ans2Sum += pair1 * occurrencesPairs2[pair1];
  }
});

console.log(ans2Sum);
