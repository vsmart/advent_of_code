#! usr/env/node

const fs = require('fs');

function parseFile(path) {
  const file = fs.readFileSync(path, 'UTF-8');
  const linesRaw = file.split('\n\n');
  return linesRaw;
}

// pass FBFBBFF RLR, rows 0-127
function passToID(pass) {
  let chars = pass.slice(0,6);
  let lower = 0;
  let middle = 63;
  let higher = 127;

  [...chars].forEach((char) => {
    if (char === 'F') { // Lower half
      higher = middle;
    }
    else if (char === 'B') { // Upper half
      lower = middle;
    }
    middle = Math.floor((lower + higher ) / 2);
    console.log(char, '- New range: ', lower, ',', middle, ',', higher);
  });

  console.log('Final row:', middle);
  const row = middle;

  chars = pass.slice(7,9);
  lower = 0;
  middle = 3;
  higher = 7;

  [...chars].forEach((char) => {
    if (char === 'L') { // Lower half
      higher = middle;
    }
    else if (char === 'R') { // Upper half
      lower = middle;
    }
    middle = Math.floor((lower + higher ) / 2);
    console.log(char, '- New range: ', lower, ',', middle, ',', higher);
  });

  console.log('Final seat:', middle);
  const seat = middle;

  const id = (row * 8) + seat;
  console.log(id);

  return id;
}

function day4() {
  const passes = parseFile('./inputs/day_5_test');
  let maxId = passToID('FBFBBFFRLR');

  /**
  passes.forEach((pass) => {
    const id = passToID(pass);
    if (id >= maxId) { maxId = id; }
  });

**/
  console.log('Highest id:' + maxId);
}

day4();
