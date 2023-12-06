const { data } = require("./data");

const sampleData = `Time:      7  15   30
Distance:  9  40  200`;

const getNumOfWins = (str) => {
  const [timeStr, distanceStr] = str.split("\n");

  const getNums = (str) => {
    return [...str.matchAll(regexNums)].map((time) => time[0]);
  };

  const regexNums = /\d+/g;

  const times = getNums(timeStr);
  const distances = getNums(distanceStr);

  return times.reduce((accumulator, timeStr, index) => {
    const distance = +distances[index];
    const time = +timeStr;

    let numOfWins = 0;

    for (let i = 1; i < time; i++) {
      const timeToTravel = time - i;
      const distanceTraveled = i * timeToTravel;
      if (distanceTraveled > distance) {
        numOfWins++;
      }
    }

    return accumulator * numOfWins;
  }, 1);
};

// const sampleOutputOne = getNumOfWins(sampleData);
// console.log(sampleOutputOne); //288

// const outputOne = getNumOfWins(data);
// console.log(outputOne); //

const getNumOfWinsTwo = (str) => {
  const [timeStr, distanceStr] = str.split("\n");

  const getNums = (str) => {
    return [...str.matchAll(regexNums)].map((time) => time[0]);
  };

  const regexNums = /\d+/g;

  const times = getNums(timeStr);
  const distances = getNums(distanceStr);

  const distance = +distances.join("");
  const time = +times.join("");

  let numOfWins = 0;

  for (let i = 1; i < time; i++) {
    const timeToTravel = time - i;
    const distanceTraveled = i * timeToTravel;
    if (distanceTraveled > distance) {
      numOfWins++;
    }
  }

  return numOfWins;
};

const sampleOutputTwo = getNumOfWinsTwo(sampleData);
console.log(sampleOutputTwo); //71503

const outputTwo = getNumOfWinsTwo(data);
console.log(outputTwo); //30077773
