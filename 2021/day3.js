const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day3.txt').toString().split("\n");
  input.pop();
  return input;
}

// Part 1
function calc(input) {
  let gamma = '';
  let epsilon = '';

   // find number of 1s in all input[e][index]
  for (let i = 0; i < input[0].length; i++) {
    const all = input.map((e) => e[i])
    const ones = all.filter((e) => { return e === '1' })
    if (ones.length > (all.length / 2)) {
      gamma += '1';
      epsilon += '0';
    }
    else {
      gamma += '0'
      epsilon += '1'
    }
  };
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

// Part 2
function calc2(input) {
  let oxygen = input;
  let co2 = input;
  let i = 0;
  let j = 0;

  while (i < input[0].length && oxygen.length > 1) {
    const ones = oxygen.map((e) => e[i]).filter((e) =>  e === '1')
    let common = (ones.length >= (oxygen.length / 2)) ? '1' : '0';

    oxygen = oxygen.filter((e) => e[i] === common);
    i++
  };

  while (j < input[0].length && co2.length > 1) {
    const ones = co2.map((e) => e[j]).filter((e) =>  e === '1')
    let common = (ones.length >= (co2.length / 2)) ? '1' : '0';

    co2 = co2.filter((e) => e[j] !== common);
    j++
  };

  return parseInt(oxygen, 2) * parseInt(co2, 2);
}

const input = parseInput();
const res = calc2(input);

console.log(`Final result: ${res}`);
