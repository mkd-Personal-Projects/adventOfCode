const fs = require("fs");
const { caloriesCounter } = require("./caloriesCounter");
const { caloriesCounterTwo } = require("./caloriesCounterTwo");

const input = fs.readFileSync(`${__dirname}/data/fullDataSet1.txt`, "utf-8");
const input2 = fs.readFileSync(`${__dirname}/data/fullDataSet2.txt`, "utf-8");

console.log(caloriesCounter(input), "<---- task 1");
console.log(caloriesCounterTwo(input2), "<---- task 2");
