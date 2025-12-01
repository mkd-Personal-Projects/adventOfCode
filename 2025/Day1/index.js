const { data } = require("./data");

const lines = data.split("\n");

function countZeros(input, position) {
  let zeros = 0;
  let cycles = 0;

  for (const line of input) {
    const direction = line.slice(0, 1);
    let rotation = +line.slice(1);
    let newPosition = position;

    const fullCycles = Math.floor(rotation / 100);
    rotation = rotation - fullCycles * 100;

    cycles += Math.floor(fullCycles);

    if (direction === "R") {
      newPosition += rotation;
    } else {
      newPosition -= rotation;
    }

    if (newPosition === 100) newPosition = 0;
    if (newPosition > 100) cycles++;

    newPosition = newPosition % 100;

    if (newPosition < 0) {
      newPosition += 100;
      if (position !== 0) cycles++;
    }

    if (newPosition === 0) zeros++;

    position = newPosition;
  }

  return { zeros, cycles };
}

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const position = 50;

let run = "test";
// run = "actual";

const input = run === "actual" ? lines : testInput.split("\n");

const output = countZeros(input, position);

console.log(output, "\n", "total:", output.zeros + output.cycles);
