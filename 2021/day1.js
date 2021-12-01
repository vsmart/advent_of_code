const fs = require('fs');

function parseInput() {
  let input = fs.readFileSync('inputs/day1.txt').toString().split("\n");
  input = input.map((line) => parseInt(line))
  return input;
}

// Part 1
function calcIncreases(input) {
  let increases = 0;
  for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) { increases ++ }
  }
  return increases;
}

// Part 2
function calcIncreaseWindow(input) {
  let increases = 0;
  for (let i = 3; i < input.length; i++) {
    if (input[i] > input[i-3]) { increases ++ }
  }
  return increases;
}

const input = parseInput();
const res = calcIncreaseWindow(input);

console.log(`Final result: ${res}`);
