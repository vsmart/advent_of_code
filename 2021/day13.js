const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day13.txt').toString().split("\n");
  input.pop()
  let map = new Map();
  let i = 0;
  while (input[i] !== '') {
    map.set(input[i], 1)
    i++
  }
  i++;

  let folds = [];
  while (i < input.length)  {
    let axis = input[i].split('=')[0].split('').pop();
    let num = parseInt(input[i].split('=')[1]);
    folds.push({ axis: axis, num: num});
    i++
  }
  return {map: map, folds: folds};
}


function calc(input) {
  let map = input.map;
  let folds = input.folds;

  folds.forEach((f) => {
    console.log('folding for ' + f.axis + f.num);

    let fold = f.num;
    let foldedMap = new Map();

    if (f.axis === 'x') {

      // Fold by x
      for (const [k, _v] of map) {
        let [x, y] = k.split(',').map((e) => parseInt(e));
        if (x < fold) {
          foldedMap.set(`${x},${y}`, 1);
        } else {
          let newX = fold - (x - fold);
          foldedMap.set(`${newX},${y}`, 1);
        }
      };

    } else {

      // Fold by y
      for (const [k, _v] of map) {
        let [x, y] = k.split(',').map((e) => parseInt(e));
        if (y < fold) {
          foldedMap.set(`${x},${y}`, 1);
        } else {
          let newY = fold - (y - fold);
          foldedMap.set(`${x},${newY}`, 1);
        }
      };
    }

    map = foldedMap;
  });


  // Draw to get the letters
  for (let y = 0; y < 6; y ++) {
    for (let x = 0; x < 40; x++) {
      let char = map.get(`${x},${y}`);
      if (char === 1) process.stdout.write('#')
      else process.stdout.write('.');
    }
    console.log();
  }


  return map.size;
}


const input = parseInput();
const res = calc(input);
