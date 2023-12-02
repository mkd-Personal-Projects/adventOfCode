const { data } = require("./data");

const sampleData = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const validNums = {
  red: 12,
  green: 13,
  blue: 14,
};

const letsPlayAGameOne = (str, validNums) => {
  const games = str.split("\n");
  return games.reduce((accumulator, game) => {
    const regex = /Game (\d+): (.+)/;
    const regexOutput = game.match(regex);

    const gameNum = +regexOutput[1];
    const gameResults = regexOutput[2];

    const rounds = gameResults.split("; ");

    let isPossible = true;

    rounds.forEach((round) => {
      const turns = round.split(", ");

      turns.forEach((turn) => {
        const turnRegex = /(\d+) (\w+)/;
        const turnRegexOutput = turn.match(turnRegex);

        const val = +turnRegexOutput[1];
        const colour = turnRegexOutput[2];

        if (validNums[colour] < val) {
          isPossible = false;
        }
      });
    });

    return isPossible ? accumulator + gameNum : accumulator;
  }, 0);
};

const sampleOutputOne = letsPlayAGameOne(sampleData, validNums);
console.log(sampleOutputOne); // 8

const outputOne = letsPlayAGameOne(data, validNums);
console.log(outputOne); // 2476

const letsPlayAGameTwo = (str) => {
  const games = str.split("\n");
  return games.reduce((accumulator, game) => {
    const regex = /Game \d+: (.+)/;
    const regexOutput = game.match(regex);

    const gameResults = regexOutput[1];

    const rounds = gameResults.split("; ");

    const fewestNumOfCubeColours = {
      red: 0,
      green: 0,
      blue: 0,
    };

    rounds.forEach((round) => {
      const turns = round.split(", ");

      turns.forEach((turn) => {
        const turnRegex = /(\d+) (\w+)/;
        const turnRegexOutput = turn.match(turnRegex);

        const val = +turnRegexOutput[1];
        const colour = turnRegexOutput[2];

        if (fewestNumOfCubeColours[colour] < val) {
          fewestNumOfCubeColours[colour] = val;
        }
      });
    });

    const power =
      fewestNumOfCubeColours.red *
      fewestNumOfCubeColours.blue *
      fewestNumOfCubeColours.green;

    return accumulator + power;
  }, 0);
};

const sampleOutputTwp = letsPlayAGameTwo(sampleData);
console.log(sampleOutputTwp); // 2286

const outputTwo = letsPlayAGameTwo(data);
console.log(outputTwo); // 54911
