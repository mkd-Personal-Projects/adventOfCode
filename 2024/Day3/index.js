const { readFile } = require("fs/promises");

const solution1 = async (path) => {
  const data = await readFile(path, "utf-8");
  const multRegex = /mul\(\d+,\d+\)/g;
  const matches = [...data.matchAll(multRegex)].map(([val]) => val);

  const sum = matches.reduce((acc, instruction) => {
    const numRegex = /\d+/g;
    const nums = [...instruction.matchAll(numRegex)].map(([val]) => +val);

    const numsTimes = nums.reduce((innerAcc, num) => innerAcc * num);

    return acc + numsTimes;
  }, 0);

  console.log(sum);
};

solution1(`${__dirname}/data.txt`);

const solution2 = async (path) => {
  const data = await readFile(path, "utf-8");
  const instructions = {};

  const addToInstructions = (match) => {
    const val = match[0];

    instructions[match.index] = val;
  };

  const multRegex = /mul\(\d+,\d+\)/g;
  const matches = [...data.matchAll(multRegex)];
  matches.forEach(addToInstructions);

  const doRegex = /do\(\)/g;
  const doMatches = [...data.matchAll(doRegex)];
  doMatches.forEach(addToInstructions);

  const dontRegex = /don\'t\(\)/g;
  const dontMatches = [...data.matchAll(dontRegex)];
  dontMatches.forEach(addToInstructions);

  const orderedInstructionKeys = Object.keys(instructions).sort(
    (a, b) => +a - +b
  );

  let doCalc = true;

  const sum = orderedInstructionKeys.reduce((acc, key) => {
    const instruction = instructions[key];

    if (instruction === "do()") {
      doCalc = true;
    } else if (instruction === "don't()") {
      doCalc = false;
    } else if (doCalc) {
      const numRegex = /\d+/g;
      const nums = [...instruction.matchAll(numRegex)].map(([val]) => +val);

      const result = nums.reduce((innerAcc, num) => innerAcc * num);
      return acc + result;
    }

    return acc;
  }, 0);

  console.log(sum);
};

solution2(`${__dirname}/data.txt`);
