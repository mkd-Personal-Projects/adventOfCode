const fs = require("fs");
const { caloriesCounter } = require("./caloriesCounter");
const { caloriesCounterTwo } = require("./caloriesCounterTwo");

describe("CaloriesCounte()", () => {
  test("should 0 if provided an empty string", () => {
    expect(caloriesCounter("")).toBe(0);
  });

  test("should return the sum of the numbers when given 3 numbers in a row with no separation", () => {
    const input = fs.readFileSync(`${__dirname}/data/test1.txt`, "utf-8");

    expect(caloriesCounter(input)).toBe(6000);
  });

  test("should return the greatest sum of numbers when given 3 sets of numbers seperated by spaces", () => {
    const input = fs.readFileSync(`${__dirname}/data/test2.txt`, "utf-8");

    expect(caloriesCounter(input)).toBe(24000);
  });

  test("should return the greatest sum of numbers when given multiple sets of numbers seperated by spaces", () => {
    const input = fs.readFileSync(`${__dirname}/data/test3.txt`, "utf-8");

    expect(caloriesCounter(input)).toBe(34000);
  });
});

describe("CaloriesCounteTwo()", () => {
  test("should 0 if provided an empty string", () => {
    expect(caloriesCounterTwo("")).toBe(0);
  });

  test("should return the sum of the numbers when given 3 numbers in a row with no separation", () => {
    console.log(`${__dirname}/data/test1.txt`);
    const input = fs.readFileSync(`${__dirname}/data/test1.txt`, "utf-8");

    expect(caloriesCounterTwo(input)).toBe(6000);
  });

  test("should return the sum of the top 3 greatest sum of numbers when given 3 sets of numbers seperated by spaces", () => {
    const input = fs.readFileSync(`${__dirname}/data/test2.txt`, "utf-8");

    expect(caloriesCounterTwo(input)).toBe(45000);
  });

  test("should return the sum of the top 3 greatest sum of numbers when given 3 sets of numbers seperated by spaces", () => {
    const input = fs.readFileSync(`${__dirname}/data/test3.txt`, "utf-8");

    expect(caloriesCounterTwo(input)).toBe(73000);
  });
});
