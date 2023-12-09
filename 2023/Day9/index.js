const { data } = require("./data");

const sampleDataOne = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const getSumOfNextNums = (str) => {
  const sequences = str.split("\n");

  return sequences.reduce((accumulator, sequence) => {
    const sequenceArr = sequence.split(" ");
    const differencesSequances = [sequenceArr.map(Number)];

    let count = 1;

    let hasZeroSequance =
      differencesSequances.length > 1 &&
      differencesSequances[count].every((num) => num === 0);

    while (!hasZeroSequance) {
      const arr = differencesSequances[count - 1];

      for (let i = 1; i < arr.length; i++) {
        const prevNum = +arr[i - 1];
        const num = +arr[i];

        if (!differencesSequances[count]) {
          differencesSequances[count] = [];
        }

        differencesSequances[count].push(num - prevNum);
      }
      hasZeroSequance = differencesSequances[count].every((num) => num === 0);

      count++;
    }

    const nums = differencesSequances.reverse();
    nums[0].push(0);

    for (let i = 1; i < nums.length; i++) {
      const prevArr = nums[i - 1];
      const prevEndNum = prevArr[prevArr.length - 1];

      const currentArr = nums[i];
      const currEndNum = currentArr[currentArr.length - 1];

      currentArr.push(currEndNum + prevEndNum);
    }

    const finalArr = nums[nums.length - 1];
    const finalEndNum = finalArr[finalArr.length - 1];

    // console.log(finalEndNum);

    return accumulator + finalEndNum;
  }, 0);
};

const sampleOutputOne = getSumOfNextNums(sampleDataOne);
console.log(sampleOutputOne); //114

const outputOne = getSumOfNextNums(data);
console.log(outputOne); //1581679977

const getSumOfPrevNums = (str) => {
  const sequences = str.split("\n");

  return sequences.reduce((accumulator, sequence) => {
    const sequenceArr = sequence.split(" ");
    const differencesSequances = [sequenceArr.map(Number)];

    let count = 1;

    let hasZeroSequance =
      differencesSequances.length > 1 &&
      differencesSequances[count].every((num) => num === 0);

    while (!hasZeroSequance) {
      const arr = differencesSequances[count - 1];

      for (let i = 1; i < arr.length; i++) {
        const prevNum = +arr[i - 1];
        const num = +arr[i];

        if (!differencesSequances[count]) {
          differencesSequances[count] = [];
        }

        differencesSequances[count].push(num - prevNum);
      }
      hasZeroSequance = differencesSequances[count].every((num) => num === 0);

      count++;
    }

    const nums = differencesSequances.reverse();
    nums[0].push(0);

    for (let i = 1; i < nums.length; i++) {
      const prevArr = nums[i - 1];
      const prevEndNum = prevArr[prevArr.length - 1];

      const currentArr = nums[i].reverse();
      const currEndNum = currentArr[currentArr.length - 1];

      currentArr.push(currEndNum - prevEndNum);
    }

    const finalArr = nums[nums.length - 1];
    const finalEndNum = finalArr[finalArr.length - 1];

    return accumulator + finalEndNum;
  }, 0);
};

const sampleOutputTwo = getSumOfPrevNums(sampleDataOne);
console.log(sampleOutputTwo); //2

const outputTwo = getSumOfPrevNums(data);
console.log(outputTwo); //889
