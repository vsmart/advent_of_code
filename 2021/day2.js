const fs = require('fs');

movements = {
   "forward": (pos, num) => { return { x: pos.x + num, y: pos.y + (pos.aim * num), aim: pos.aim}},
   "down": (pos, num) => { return Object.assign(pos, {aim: pos.aim + num})},
   "up": (pos, num) => { return Object.assign(pos, {aim: pos.aim - num})}
}

function parseInput() {
  let input = fs.readFileSync('inputs/day2.txt').toString().split("\n");
  input = input.map((line) => {
    split = line.split(" ")
    action = split[0];
    distance = parseInt(split[1]);
    return [action, distance]
  })
  input.pop();
  return input;
}

function calcPosition(input) {
  let pos = {x : 0, y: 0, aim: 0};

   input.forEach(([action, distance]) => {
    pos = movements[action](pos, distance)
  });
  return pos.x * pos.y;
}

const input = parseInput();
const res = calcPosition(input);

console.log(`Final result: ${res}`);
