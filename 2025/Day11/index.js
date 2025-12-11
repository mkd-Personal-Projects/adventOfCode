const { data } = require("./data");

function countAllPaths(pathLookup, device, startingPath = device) {
  const outputDevices = pathLookup[device];
  let count = 0;
  let paths = "";

  for (const device of outputDevices) {
    if (device === startingPath) continue;

    if (device === "out") {
      count++;
      paths += ", out";
      continue;
    }

    paths += ", " + device;

    const output = countAllPaths(pathLookup, device, startingPath);
    count += output.count;
    paths += ", " + output.paths;
  }

  return { count, paths };
}

function findAllPaths(input, startingPoint) {
  const lines = input.split("\n");

  const paths = {};

  for (const line of lines) {
    const [device, outputDevices] = line.split(":");
    paths[device] = outputDevices.trim().split(" ");
  }

  return countAllPaths(paths, startingPoint);
}

const testData = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

console.log("\n", findAllPaths(input, "you").count);

const testData2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`;

const input2 = run === "actual" ? data : testData2;

// const { paths } = findAllPaths(input2, "svr");

function countValidPaths(paths) {
  const formattedPaths = paths
    .join(",")
    .split(",out,")
    .map((path) => path.split(","));

  let validPaths = 0;

  let currentPath = [...formattedPaths[0]];

  const actualPaths = [];

  for (const path of formattedPaths) {
    const fullPath = [
      ...currentPath.slice(0, currentPath.length - path.length),
      ...path,
    ];

    actualPaths.push(fullPath);
    currentPath = fullPath;
  }

  for (const path of actualPaths) {
    if (path.includes("dac") && path.includes("fft")) {
      validPaths++;
    }
  }

  return validPaths;
}

// console.log("\n", countValidPaths(paths));

// console.log("\n", paths);

// js error for part two
