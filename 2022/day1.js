const fs = require('fs');

function parseInput() {
  let input = fs.readFileSync('inputs/day1').toString().split("\n\n");
  const main = []
  input = input.map((line) => {
    let nums = line.split("\n");
    let parsed = []
    nums.forEach((e) => { if (parseInt(e)) parsed.push(parseInt(e))});
    main.push(parsed);
  })
  return main;
}

const input = parseInput();

let sums = input.map((e) => {
  return e.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0);
  });

sums.sort((a, b) => b - a);
console.log(sums[0] + sums[1] + sums[2]);
