const { data } = require("./data");

const sampleDataOne = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const sampleDataTwo = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const stepsToZ = (str) => {
  const [unFormattedDirections, unFormattedMap] = str.split("\n\n");

  const directions = unFormattedDirections
    .split("")
    .map((direction) => (direction === "R" ? 1 : 0));

  const map = unFormattedMap.split("\n").reduce((accumulator, mapContent) => {
    const formattedMap = mapContent.match(/[A-Z]+/g);

    accumulator[formattedMap.shift()] = formattedMap;
    return accumulator;
  }, {});

  let destination = "ZZZ";
  let currentLocation = Object.keys(map)[0];

  for (let step = 0; currentLocation !== destination; step++) {
    const direction = directions[step % directions.length];

    currentLocation = map[currentLocation][direction];

    // console.log(currentLocation);

    if (currentLocation === destination) {
      return step + 1;
    }
  }
};

const sampleOutputOne = stepsToZ(sampleDataOne);
console.log(sampleOutputOne); // 2

const sampleOutputTwo = stepsToZ(sampleDataTwo);
console.log(sampleOutputTwo); // 6

// const outputOne = stepsToZ(data);
// console.log(outputOne);
