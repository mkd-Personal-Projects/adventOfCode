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
run = "test";

const input = run === "actual" ? data : testData;

// console.log("\n", countTachyonSplits(input));

function countTachyonTimelineSplits(input) {
  const lines = input.split("\n");
  let splitCount = 0;

  const startingPoint = lines[0].indexOf("S");
  const tachyonBeamLocation = startingPoint;

  function traverseTree(lines, tachyonBeamLocation, direction) {
    let count = 0;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      if (line[tachyonBeamLocation] === ".") continue;

      console.log(
        line.slice(0, tachyonBeamLocation - 1) +
          "|^" +
          line.slice(tachyonBeamLocation + 1),
        tachyonBeamLocation
      );

      count += traverseTree(lines.slice(i + 1), tachyonBeamLocation - 1, -1);

      console.log(
        line.slice(0, tachyonBeamLocation) +
          "^|" +
          line.slice(tachyonBeamLocation + 2),
        tachyonBeamLocation
      );
      count += traverseTree(lines.slice(i + 1), tachyonBeamLocation + 1, 1);
      break;
    }

    console.log("\n");

    if (lines.length === 1) return 1 + count;
    return count;
  }

  const output = traverseTree(lines.slice(1), tachyonBeamLocation, -1);

  console.log(output);

  return splitCount;
}

console.log("\n", countTachyonTimelineSplits(input));
