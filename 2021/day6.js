const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day6.txt').toString().split(",");
  const fish = input.map((e) => parseInt(e))
  return fish
}

// Part 1
function calc(input, days) {
  let fish = input;
  for (let i = 0; i < days; i++) {
    let babies = 0;
    fish = fish.map((f) => {
      if (f === 0) {
        babies++
        return 6
      } else {
        return (f - 1)
      }
    })
    fish = fish.concat(new Array(babies).fill(8))
  }
  return fish.length
}

// Part 2
function calc2(input, days) {
  let meta = []
  let fish = new Map();
  fish.set(0, input.filter((e) => e === 0).length)
  fish.set(1, input.filter((e) => e === 1).length)
  fish.set(2, input.filter((e) => e === 2).length)
  fish.set(3, input.filter((e) => e === 3).length)
  fish.set(4, input.filter((e) => e === 4).length)
  fish.set(5, input.filter((e) => e === 5).length)
  fish.set(6, 0)
  fish.set(7, 0)
  fish.set(8, 0)

  for (let i = 0; i < days; i++) {
    const new8 = fish.get(0);

    for (let k = 1; k < 9; k++) {
       fish.set(k - 1, fish.get(k));
    }
    fish.set(8, new8);
    fish.set(6, new8 + fish.get(6));
  }

  let sum = 0
  for (const value of fish.values()) {
    sum += value
  }
  return sum
}

const input = parseInput();
const res = calc2(input, 256);

console.log(`Final result: ${res}`);
