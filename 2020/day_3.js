#! usr/env/node

const fs = require('fs');

function parseFile(path) {
  const file = fs.readFileSync(path, 'UTF-8');
  const linesRaw = file.split('\n');
  linesRaw.pop();
  return linesRaw;
}

function day3() {
  const linesRaw = parseFile('./inputs/day_3');
  let x = 0;
  let y = 0;
  let maxX = linesRaw[0].length;
  let maxY = linesRaw.length;
  let treeCounter = 0;
  while (y < maxY) {
    if (x >= maxX) { x = (x - maxX) };
    if (linesRaw[y][x] === '#') {
      treeCounter ++;
    }
    x = x + 3;
    y = y + 1;
  }

  console.log('Result: ' + treeCounter);
}

day3();
