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
  let currentLocation = "AAA";

  for (let step = 0; currentLocation !== destination; step++) {
    const direction = directions[step % directions.length];

    currentLocation = map[currentLocation][direction];

    if (currentLocation === destination) {
      return step + 1;
    }
  }
};

// const sampleOutputOne = stepsToZ(sampleDataOne);
// console.log(sampleOutputOne); // 2

// const sampleOutputTwo = stepsToZ(sampleDataTwo);
// console.log(sampleOutputTwo); // 6

// const outputOne = stepsToZ(data);
// console.log(outputOne); //14429

const sampleDataThree = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const simultaneousStepsToZ = (str) => {
  const [unFormattedDirections, unFormattedMap] = str.split("\n\n");

  const directions = unFormattedDirections
    .split("")
    .map((direction) => (direction === "R" ? 1 : 0));

  const map = unFormattedMap.split("\n").reduce((accumulator, mapContent) => {
    const formattedMap = mapContent.match(/[A-Z1-9]+/g);

    accumulator[formattedMap.shift()] = formattedMap;
    return accumulator;
  }, {});

  let checkHasReachedDestination = (str) => str.endsWith("Z");

  let currentLocations = Object.keys(map).filter((eachMap) =>
    eachMap.endsWith("A")
  );

  let step = 0;

  console.log(
    currentLocations,
    Object.keys(map).filter((eachMap) => eachMap.endsWith("Z"))
  );

  while (!currentLocations.every(checkHasReachedDestination)) {
    const direction = directions[step % directions.length];

    currentLocations = currentLocations.map((location) => {
      return map[location][direction];
    });

    if (currentLocations.filter(checkHasReachedDestination).length > 3) {
      console.log(currentLocations);
    }

    step++;
  }

  return step;
};

// const sampleOutputThree = simultaneousStepsToZ(sampleDataThree);
// console.log(sampleOutputThree); // 6

const outputTwo = simultaneousStepsToZ(data);
console.log(outputTwo); //14429
