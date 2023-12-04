const { data } = require("./data");

const sampleData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const getCardResults = (numsToCheck, winningNums) => {
  return numsToCheck.reduce(
    (accumulator, num) => {
      if (winningNums.includes(num)) {
        return {
          points: accumulator.points
            ? accumulator.points + accumulator.points
            : 1,
          numOfWins: accumulator.numOfWins + 1,
        };
      }
      return accumulator;
    },
    { points: 0, numOfWins: 0 }
  );
};

// part one

const getPoints = (str) => {
  const cards = str.split("\n");

  return cards.reduce((accumulator, card) => {
    const output = card.match(/.*: (.*) \| (.*)/);

    const winningNums = output[1].split(" ").filter((num) => num);
    const numsToCheck = output[2].split(" ").filter((num) => num);

    const { points } = getCardResults(winningNums, numsToCheck);

    return accumulator + points;
  }, 0);
};

const sampleOutputOne = getPoints(sampleData);
console.log(sampleOutputOne); //13

const outputOne = getPoints(data);
console.log(outputOne); //23678

// part two

const getMoreScratchcards = (str) => {
  const cards = str.split("\n");

  const formattedCards = cards.map((card) => {
    const output = card.match(/.*: (.*) \| (.*)/);

    const winningNums = output[1].split(" ").filter((num) => num);
    const numsToCheck = output[2].split(" ").filter((num) => num);

    return { winningNums, numsToCheck };
  });

  const numOfEachCard = [1];

  for (let i = 0; i < formattedCards.length; i++) {
    const card = formattedCards[i];
    const { winningNums, numsToCheck } = card;

    const { numOfWins } = getCardResults(winningNums, numsToCheck);

    if (!numOfEachCard[i]) {
      numOfEachCard.push(1);
    }

    for (let k = 0; k < numOfEachCard[i]; k++) {
      for (let j = 1; j < numOfWins + 1; j++) {
        index = j + i;

        numOfEachCard[index] = numOfEachCard[index]
          ? numOfEachCard[index] + 1
          : 2;
      }
    }
  }

  return numOfEachCard.reduce((accumulator, num) => accumulator + num);
};

const sampleOutputTwo = getMoreScratchcards(sampleData);
console.log(sampleOutputTwo); //30

const outputTwo = getMoreScratchcards(data);
console.log(outputTwo); //15455663
