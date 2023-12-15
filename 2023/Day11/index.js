const { data } = require("./data");

const sampleData = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const getGalaxyDistances = (str, starDistances = 2) => {
  starDistances -= 1;
  const unformattedLines = str.split("\n");
  const lines = [];

  let count = 0;
  for (let i = 0; i < unformattedLines.length; i++) {
    const chars = unformattedLines[i].split("");

    while (chars.indexOf("#") !== -1) {
      count++;

      const hashIndex = chars.indexOf("#");
      chars[hashIndex] = count;
    }

    lines.push(chars);
  }

  const newLines = {
    horizontal: [],
    vertical: [],
  };

  lines.forEach((line, i) => {
    if (!/\d/g.test(line.join(""))) {
      newLines.horizontal.push(i);
    }

    const verticalLine = lines.map((line) => line[i]).join("");
    if (!/\d/g.test(verticalLine)) {
      newLines.vertical.push(i);
    }
  });

  const map = {};
  let newCount = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    while (line.indexOf(newCount) !== -1) {
      const numIndex = line.indexOf(newCount);
      map[newCount] = { lineIndex: i, numIndex: numIndex };
      newCount++;
    }
  }

  return Object.keys(map).reduce((accumulator, startNum) => {
    const { lineIndex: startLineIndex, numIndex: startNumIndex } =
      map[startNum];

    let sum = 0;

    for (let i = +startNum + 1; i < count + 1; i++) {
      const { lineIndex, numIndex } = map[i];

      const numIndexs = [numIndex, startNumIndex];
      const smallerNumIndex = Math.min(...numIndexs);
      const largerNumIndex = Math.max(...numIndexs);

      const verticalCrossSection = newLines.vertical.reduce(
        (accumulator, verticalVal) => {
          if (smallerNumIndex < verticalVal && largerNumIndex > verticalVal) {
            return accumulator + starDistances;
          }
          return accumulator;
        },
        0
      );

      const horizontalDistance =
        largerNumIndex - smallerNumIndex + verticalCrossSection;

      const smallerLineIndex = startLineIndex;
      const largerLineIndex = lineIndex;

      const horizontalCrossSection = newLines.horizontal.reduce(
        (accumulator, horizontalVal) => {
          if (
            smallerLineIndex < horizontalVal &&
            largerLineIndex > horizontalVal
          ) {
            return accumulator + starDistances;
          }
          return accumulator;
        },
        0
      );

      const verticalDistance =
        largerLineIndex - smallerLineIndex + horizontalCrossSection;

      const distance = verticalDistance + horizontalDistance;

      sum += distance;
    }
    return accumulator + sum;
  }, 0);
};

// part 1

const sampleOutputOne = getGalaxyDistances(sampleData);
console.log(sampleOutputOne); //374

const outputOne = getGalaxyDistances(data);
console.log(outputOne); //9605127

// part 2

const sampleOutputTwo = getGalaxyDistances(sampleData, 10);
console.log(sampleOutputTwo); // starDistances of 10 >> 1030

const sampleOutputThree = getGalaxyDistances(sampleData, 100);
console.log(sampleOutputThree); // starDistances of 100 >> 8410

const outputTest = getGalaxyDistances(data, 1000);
console.log(outputTest); // starDistances of 1000 >> 466871761

const outputTwo = getGalaxyDistances(data, 1000000);
console.log(outputTwo); // starDistances of 1000000 >> 458191688761
