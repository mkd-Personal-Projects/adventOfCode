const { data } = require("./data");

function countTachyonSplits(input) {
  const lines = input.split("\n");
  let splitCount = 0;

  const startingPoint = lines[0].indexOf("S");
  const tachyonBeamLocations = [startingPoint];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    let newLine = "";

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (char === ".") {
        if (tachyonBeamLocations.includes(j)) newLine += "|";
        else newLine += char;
        continue;
      }

      if (char === "^" && tachyonBeamLocations.includes(j)) {
        newLine = newLine.slice(0, j - 1) + "|^|";

        const tachyonBeamLocationsIndex = tachyonBeamLocations.indexOf(j);

        tachyonBeamLocations.splice(tachyonBeamLocationsIndex, 1);

        if (!tachyonBeamLocations.includes(j - 1)) {
          tachyonBeamLocations.push(j - 1);
        }
        if (!tachyonBeamLocations.includes(j + 1)) {
          tachyonBeamLocations.push(j + 1);
        }

        j++;
        splitCount++;
      } else {
        newLine += "^";
      }
    }
  }

  return splitCount;
}

const testData = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

console.log("\n", countTachyonSplits(input));

function countTachyonTimelineSplits(input) {
  const lines = input.split("\n");

  const startingPoint = lines[0].indexOf("S");

  const objectCache = {};
  const splitCount = traverseTree(lines.slice(1), startingPoint, objectCache);

  return splitCount;
}

function traverseTree(lines, tachyonBeamLocation, objectCache) {
  if (lines.length === 0) {
    return 1;
  }

  let count = 0;
  const line = lines[0];

  if (line[tachyonBeamLocation] === ".") {
    count += traverseTree(lines.slice(1), tachyonBeamLocation, objectCache);
  } else if (objectCache.hasOwnProperty(`${line}-${tachyonBeamLocation}`)) {
    count += objectCache[`${line}-${tachyonBeamLocation}`];
  } else {
    count += traverseTree(lines.slice(1), tachyonBeamLocation - 1, objectCache);

    count += traverseTree(lines.slice(1), tachyonBeamLocation + 1, objectCache);

    objectCache[`${line}-${tachyonBeamLocation}`] = count;
  }

  return count;
}

console.log("\n", countTachyonTimelineSplits(input));
