const { data } = require("./data");

const sampleData = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const getHandValue = (input, ...rules) => {
  const [cards] = input.split(" ");

  const cardValues = {};

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    if (cardValues[card]) {
      cardValues[card] += 1;
    } else {
      cardValues[card] = 1;
    }
  }

  if (rules.includes("Joker Rule") && cardValues["J"]) {
    const jVal = cardValues["J"];
    delete cardValues["J"];

    const highestValueCard = Math.max(...Object.values(cardValues));
    const highestCardName = Object.keys(cardValues).filter(
      (card) => cardValues[card] === highestValueCard
    )[0];

    cardValues[highestCardName] += jVal;
  }

  const sortedValues = Object.values(cardValues).sort((a, b) => b - a);

  const handValues = {
    24: 6,
    23: 5,
    33: 4,
    32: 3,
    42: 2,
  };

  if (sortedValues.length > 1 && sortedValues.length < 5) {
    return handValues[`${sortedValues.length}${sortedValues[0]}`];
  } else {
    return sortedValues.length === 1 ? 7 : 1;
  }
};

const compareHands = (handOne, handTwo, ...rules) => {
  const cardValues = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A",
  ];

  if (rules.includes("Joker Rule")) {
    cardValues.splice(9, 1);
    cardValues.splice(0, 0, "J");
  }

  for (let i = 0; i < 5; i++) {
    const handOneCardValue = cardValues.indexOf(handOne[i]);
    const handTwoCardValue = cardValues.indexOf(handTwo[i]);

    if (handOneCardValue !== handTwoCardValue) {
      return handOneCardValue - handTwoCardValue;
    }
  }
};

const getTotalWinnings = (str) => {
  const hands = str.split("\n");

  const orderedHands = hands.sort((a, b) => {
    const value = getHandValue(a) - getHandValue(b);

    return value ? value : compareHands(a, b);
  });

  return orderedHands.reduce((accumulator, hand, index) => {
    const [card, betAmount] = hand.split(" ");

    return accumulator + +betAmount * (index + 1);
  }, 0);
};

const sampleOutputOne = getTotalWinnings(sampleData);
console.log(sampleOutputOne); //6440

const outputOne = getTotalWinnings(data);
console.log(outputOne); //248559379

const getTotalWinningsTwo = (str) => {
  const hands = str.split("\n");

  const orderedHands = hands.sort((a, b) => {
    const value = getHandValue(a, "Joker Rule") - getHandValue(b, "Joker Rule");

    return value ? value : compareHands(a, b, "Joker Rule");
  });

  return orderedHands.reduce((accumulator, hand, index) => {
    const [_, betAmount] = hand.split(" ");

    return accumulator + +betAmount * (index + 1);
  }, 0);
};

const sampleOutputTwo = getTotalWinningsTwo(sampleData);
console.log(sampleOutputTwo); //5905

const outputTwo = getTotalWinningsTwo(data);
console.log(outputTwo); //249631254
