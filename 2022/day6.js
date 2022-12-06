const fs = require('fs');

function partOne() {
  const input = fs.readFileSync('inputs/day6').toString().split("");
  let total = 0;
  input.pop();

  for (let i = 3; i < input.length; i++) {
    const set = new Set();
    set.add(input[i]);
    set.add(input[i-1]);
    set.add(input[i-2]);
    set.add(input[i-3]);
    if (set.size === 4) {
      console.log(i +1);
      break;
    }
  }
}

/****************************Part 2 **************************/

function partTwo() {
  const input = fs.readFileSync('inputs/day6').toString().split("");
  let total = 0;
  input.pop();

  for (let i = 3; i < input.length; i++) {

    const set = new Set();
    for (let j = 0; j < 14; j ++) {
      set.add(input[i-j]);
    }
    if (set.size === 14) {
      console.log(i +1);
      break;
    }
  }
}

partOne();
partTwo();
