const { data } = require("./data");

function getSymbolsAndLines(input) {
  const lines = input.split("\n");
  const whiteSpaceRegex = /\s+/;

  const symbols = lines
    .splice(lines.length - 1)[0]
    .trim()
    .split(whiteSpaceRegex);

  return { symbols, lines };
}

function calcInput(symbols, lines) {
  const whiteSpaceRegex = /\s+/;

  const numRows = lines.map((line) => {
    return line.trim().split(whiteSpaceRegex);
  });

  let sum = 0;

  for (let i = 0; i < numRows[0].length; i++) {
    let stringToCalc = "";
    for (const row of numRows) {
      stringToCalc += row[i] + symbols[i];
    }
    sum += eval(stringToCalc.slice(0, -1));
  }

  return sum;
}

const testData = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;

let run = "actual";
// run = "test";

const input = run === "actual" ? data : testData;

const { symbols, lines } = getSymbolsAndLines(input);

console.log("\n", calcInput(symbols, lines));

function calcInput2(symbols, lines) {
  const toBeCalced = [];
  let strToCalc = "";

  for (let i = 0; i < lines[0].length; i++) {
    let str = "";

    for (const line of lines) {
      str += line[i];
    }

    if (str.trim().length === 0) {
      toBeCalced.push(strToCalc.trim());

      strToCalc = "";
    } else {
      strToCalc += str.trim() + " ";
    }
  }

  toBeCalced.push(strToCalc.trim());

  let sum = 0;

  for (let i = 0; i < toBeCalced.length; i++) {
    sum += eval(toBeCalced[i].replace(/\s/g, symbols[i]));
  }

  return sum;
}

console.log("\n", calcInput2(symbols, lines));
