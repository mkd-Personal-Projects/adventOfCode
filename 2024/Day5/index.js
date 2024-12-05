const { data } = require("./data");

const [rawRules, rawUpdates] = data.split("\n\n");

const convertElemToNum = (x) => +x;

const rules = rawRules
  .split("\n")
  .map((rule) => rule.split("|").map(convertElemToNum));

const updates = rawUpdates
  .split("\n")
  .map((updates) => updates.split(",").map(convertElemToNum));

const rulesTable = rules.reduce((rulesTable, rule) => {
  const [firstNum, secondNum] = rule;

  if (rulesTable.hasOwnProperty(firstNum)) {
    rulesTable[firstNum] = [...rulesTable[firstNum], secondNum];
  } else {
    rulesTable[firstNum] = [secondNum];
  }

  return rulesTable;
}, {});

const checkOrderedUpdateValues = (updateValues, func) => {
  for (let i = 0; i < updateValues.length; i++) {
    const currNum = updateValues[i];

    if (i > 0) {
      const prevValues = updateValues.slice(0, i);

      for (let j = 0; j < prevValues.length; j++) {
        const numToCheck = updateValues[j];

        if (rulesTable.hasOwnProperty(currNum)) {
          if (rulesTable[currNum].includes(numToCheck)) {
            return func(updateValues, numToCheck, i, j);
          }
        }
      }
    }
  }

  return true;
};

const incorrectlyOrderedUpdates = [];

const ans1 = updates.reduce((sum, updateValues) => {
  const addToIncorrectlyOrderUpdates = (updateValues) => {
    incorrectlyOrderedUpdates.push(updateValues);
    return false;
  };

  const isOrdered = checkOrderedUpdateValues(
    updateValues,
    addToIncorrectlyOrderUpdates
  );

  if (!isOrdered) return sum;

  const middleNum = updateValues[(updateValues.length - 1) / 2];
  return sum + middleNum;
}, 0);

const ans2 = incorrectlyOrderedUpdates.reduce((sum, updateValues) => {
  let isOrdered = false;

  const createUpdatedValues = (updateValues, numToCheck, i, j) => {
    const orderedUpdateValues = [];

    orderedUpdateValues.push(...updateValues.slice(0, j));
    orderedUpdateValues.push(...updateValues.slice(j + 1));
    orderedUpdateValues.splice(i, 0, numToCheck);

    return orderedUpdateValues;
  };

  while (!isOrdered) {
    updateValues = checkOrderedUpdateValues(updateValues, createUpdatedValues);
    isOrdered = checkOrderedUpdateValues(updateValues, () => false);
  }

  const middleNum = updateValues[(updateValues.length - 1) / 2];
  return sum + middleNum;
}, 0);

console.log(ans1, ": <-- part 1");
console.log(ans2, ": <-- part 2");
