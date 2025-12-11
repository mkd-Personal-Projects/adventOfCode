const { data } = require("./data");

function getCoordinates(locationStr) {
  const coordinates = locationStr.split(",").map((num) => +num);
  return { x: coordinates[0], y: coordinates[1] };
}

function sortCoordinates(coordinateOne, coordinateTwo) {
  return [
    Math.min(coordinateOne, coordinateTwo),
    Math.max(coordinateOne, coordinateTwo),
  ];
}

function getLargestArea(input) {
  const redTiles = input.split("\n");

  let largestArea = 0;

  for (const tile of redTiles) {
    for (const tileTwo of redTiles) {
      if (tile === tileTwo) continue;

      const tileCoordinates = getCoordinates(tile);
      const tileTwoCoordinates = getCoordinates(tileTwo);

      const [x, x2] = sortCoordinates(tileCoordinates.x, tileTwoCoordinates.x);
      const [y, y2] = sortCoordinates(tileCoordinates.y, tileTwoCoordinates.y);

      const length = x2 - x + 1;
      const height = y2 - y + 1;

      const recArea = length * height;
      if (recArea > largestArea) {
        largestArea = recArea;
      }
    }
  }

  return largestArea;
}

const testData = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

console.log("\n", getLargestArea(input));
