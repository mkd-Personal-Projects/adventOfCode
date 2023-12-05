const { data } = require("./data");

const sampleData = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const getLocation = (str) => {
  const sections = str.split("\n\n");

  const seedRegex = /\d+/g;
  const seeds = sections[0].match(seedRegex);

  const seedToSoil = sections[1].split("\n");
  seedToSoil.shift();

  const soilToFertilizer = sections[2].split("\n");
  soilToFertilizer.shift();

  const fertilizerToWater = sections[3].split("\n");
  fertilizerToWater.shift();

  const waterToLight = sections[4].split("\n");
  waterToLight.shift();

  const lightToTemperature = sections[5].split("\n");
  lightToTemperature.shift();

  const temperatureToHumidity = sections[6].split("\n");
  temperatureToHumidity.shift();

  const humidityToLocation = sections[7].split("\n");
  humidityToLocation.shift();

  const lowestVal = seeds.reduce((lowestVal, seed) => {
    let val = +seed;

    const getDifference = (map) => {
      const [valToBe, currVal, range] = map.split(" ").map((num) => +num);

      if (val >= currVal && val <= currVal + range) {
        val += valToBe - currVal;

        return false;
      }
      return true;
    };

    seedToSoil.every(getDifference);

    soilToFertilizer.every(getDifference);

    fertilizerToWater.every(getDifference);

    waterToLight.every(getDifference);

    lightToTemperature.every(getDifference);

    temperatureToHumidity.every(getDifference);

    humidityToLocation.every(getDifference);

    return val < lowestVal ? val : lowestVal;
  }, Infinity);

  return lowestVal;
};

// const sampleOutputOne = getLocation(sampleData);
// console.log(sampleOutputOne); //35

// const outputOne = getLocation(data);
// console.log(outputOne); //177942185

const getLocationTwo = (str) => {
  const sections = str.split("\n\n");

  const seedRegex = /\d+/g;
  const seeds = sections[0].match(seedRegex);

  const seedToSoil = sections[1].split("\n");
  seedToSoil.shift();

  const soilToFertilizer = sections[2].split("\n");
  soilToFertilizer.shift();

  const fertilizerToWater = sections[3].split("\n");
  fertilizerToWater.shift();

  const waterToLight = sections[4].split("\n");
  waterToLight.shift();

  const lightToTemperature = sections[5].split("\n");
  lightToTemperature.shift();

  const temperatureToHumidity = sections[6].split("\n");
  temperatureToHumidity.shift();

  const humidityToLocation = sections[7].split("\n");
  humidityToLocation.shift();

  let seed;
  let lowestVal = Infinity;

  for (let i = 0; i < seeds.length; i += 2) {
    const startPoint = +seeds[i];
    const range = +seeds[i + 1];

    seed = startPoint;

    while (seed < startPoint + range) {
      let val = seed;

      const getDifference = (map) => {
        const [valToBe, currVal, range] = map.split(" ").map((num) => +num);

        if (val >= currVal && val <= currVal + range) {
          val += valToBe - currVal;

          return false;
        }
        return true;
      };

      seedToSoil.every(getDifference);

      soilToFertilizer.every(getDifference);

      fertilizerToWater.every(getDifference);

      waterToLight.every(getDifference);

      lightToTemperature.every(getDifference);

      temperatureToHumidity.every(getDifference);

      humidityToLocation.every(getDifference);

      lowestVal = val < lowestVal ? val : lowestVal;

      seed++;
    }
  }

  return lowestVal;
};

// const sampleOutputTwo = getLocationTwo(sampleData);
// console.log(sampleOutputTwo); //46

// const outputTwo = getLocationTwo(data);
// console.log(outputTwo); //
