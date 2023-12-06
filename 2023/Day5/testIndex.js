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

const getLocationTwo = (str) => {
  const sections = str.split("\n\n");

  const sort = (a, b) => {
    const [aCurrVal] = a.split(" ").map((num) => +num);
    const [bCurrVal] = b.split(" ").map((num) => +num);
    return +aCurrVal - +bCurrVal;
  };

  const seedRegex = /\d+/g;
  const unsortedSeeds = sections[0].match(seedRegex);

  seeds = unsortedSeeds.sort(sort);

  const unsortedSeedToSoil = sections[1].split("\n");
  unsortedSeedToSoil.shift();

  seedToSoil = unsortedSeedToSoil.sort(sort);

  const unsortedSoilToFertilizer = sections[2].split("\n");
  unsortedSoilToFertilizer.shift();

  soilToFertilizer = unsortedSoilToFertilizer.sort(sort);

  const unsortedFertilizerToWater = sections[3].split("\n");
  unsortedFertilizerToWater.shift();

  fertilizerToWater = unsortedFertilizerToWater.sort(sort);

  const unsortedWaterToLight = sections[4].split("\n");
  unsortedWaterToLight.shift();

  waterToLight = unsortedWaterToLight.sort(sort);

  const unsortedLightToTemperature = sections[5].split("\n");
  unsortedLightToTemperature.shift();

  lightToTemperature = unsortedLightToTemperature.sort(sort);

  const unsortedTemperatureToHumidity = sections[6].split("\n");
  unsortedTemperatureToHumidity.shift();

  temperatureToHumidity = unsortedTemperatureToHumidity.sort(sort);

  const unsortedHumidityToLocation = sections[7].split("\n");
  unsortedHumidityToLocation.shift();

  humidityToLocation = unsortedHumidityToLocation.sort(sort);

  //   const lowestVal = seeds.reduce((lowestVal, seed) => {
  //     let val = +seed;

  //     const getDifference = (map) => {
  //       const [valToBe, currVal, range] = map.split(" ").map((num) => +num);

  //       if (val >= currVal && val <= currVal + range) {
  //         val += valToBe - currVal;

  //         return false;
  //       }
  //       return true;
  //     };

  //     seedToSoil.every(getDifference);

  //     soilToFertilizer.every(getDifference);

  //     fertilizerToWater.every(getDifference);

  //     waterToLight.every(getDifference);

  //     lightToTemperature.every(getDifference);

  //     temperatureToHumidity.every(getDifference);

  //     humidityToLocation.every(getDifference);

  //     return val < lowestVal ? val : lowestVal;
  //   }, Infinity);

  let lowestVal = 0;

  const isValid = (val) => {
    const getDifference = (map) => {
      const [currVal, valToBe, range] = map.split(" ").map((num) => +num);

      if (val >= currVal && val <= currVal + range) {
        val += valToBe - currVal;

        return false;
      }
      return true;
    };

    humidityToLocation.every(getDifference);

    temperatureToHumidity.every(getDifference);
    lightToTemperature.every(getDifference);
    waterToLight.every(getDifference);
    fertilizerToWater.every(getDifference);
    soilToFertilizer.every(getDifference);
    seedToSoil.every(getDifference);

    let check = false;

    for (let j = 0; j < seeds.length; j += 2) {
      const startVal = +seeds[j];
      const range = +seeds[j + 1];

      if (val >= startVal && val <= startVal + range) {
        check = true;
        break;
      }
    }

    return check;
  };

  for (let i = 0; i < humidityToLocation.length; i++) {
    const [currVal, valToBe, range] = humidityToLocation[i].split(" ");

    if (isValid(currVal) || isValid(currVal + range)) {
      console.log(isValid(currVal), +currVal);
      console.log(isValid(currVal + range), +currVal + range);
      break;
    }
  }

  //   for (let i = 1000000; i < Infinity; i++) {
  //     let val = i;

  //     const getDifference = (map) => {
  //       const [currVal, valToBe, range] = map.split(" ").map((num) => +num);

  //       if (val >= currVal && val <= currVal + range) {
  //         val += valToBe - currVal;

  //         return false;
  //       }
  //       return true;
  //     };

  //     humidityToLocation.every(getDifference);
  //     lowestVal = val;

  //     temperatureToHumidity.every(getDifference);
  //     lightToTemperature.every(getDifference);
  //     waterToLight.every(getDifference);
  //     fertilizerToWater.every(getDifference);
  //     soilToFertilizer.every(getDifference);
  //     seedToSoil.every(getDifference);

  //     // console.log(val, lowestVal);
  //     // console.log(" ");
  //     let check = false;

  //     for (let j = 0; j < seeds.length; j += 2) {
  //       const startVal = +seeds[j];
  //       const range = +seeds[j + 1];

  //       if (val >= startVal && val <= startVal + range) {
  //         check = true;
  //         break;
  //       }
  //     }

  //     if (i === 2000000) {
  //       console.log(2000000);
  //     }

  //     // safety below <<

  //     if (check) {
  //       break;
  //     }
  //   }

  //   for (let i = 1000000; i < Infinity; i++) {
  //     let val = i;

  //     const getDifference = (map) => {
  //       const [currVal, valToBe, range] = map.split(" ").map((num) => +num);

  //       if (val >= currVal && val <= currVal + range) {
  //         val += valToBe - currVal;

  //         return false;
  //       }
  //       return true;
  //     };

  //     humidityToLocation.every(getDifference);
  //     lowestVal = val;

  //     temperatureToHumidity.every(getDifference);
  //     lightToTemperature.every(getDifference);
  //     waterToLight.every(getDifference);
  //     fertilizerToWater.every(getDifference);
  //     soilToFertilizer.every(getDifference);
  //     seedToSoil.every(getDifference);

  //     // console.log(val, lowestVal);
  //     // console.log(" ");
  //     let check = false;

  //     for (let j = 0; j < seeds.length; j += 2) {
  //       const startVal = +seeds[j];
  //       const range = +seeds[j + 1];

  //       if (val >= startVal && val <= startVal + range) {
  //         check = true;
  //         break;
  //       }
  //     }

  //     if (i === 2000000) {
  //       console.log(2000000);
  //     }

  //     // safety below <<

  //     if (check) {
  //       break;
  //     }
  //   }

  return lowestVal;
};

// const sampleOutputTwo = getLocationTwo(sampleData);
// console.log(sampleOutputTwo); //46

const outputTwo = getLocationTwo(data);
console.log(outputTwo); //

// This cant work because the answer could fall outside of one of the ranges

// sort the locations array by smallest to largest
// check if the bottom can become a valid num for a seed
// if not check if the highest range of that smallest location can
// if not move onto the next range
// once it does check half way through the range
// if not check the top half of the half
// else check the bottom half of the half and so on ...
//
