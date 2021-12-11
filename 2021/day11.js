const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day11.txt').toString().split("\n");
  input.pop()
  const num = input.map((e) => { e = e.split('');
    return e.map((n) => parseInt(n))
  })
  return num
}

function update(input, x, y, flashes) {
  if (flashes.get(`${x},${y}`) !== 1) {
    input[x][y]++
  }
}

function calc(input) {

  let res = 0
  let flashes = new Map()
  let total = 0
  let steps = 0
  let found = false;

  while (!found) {
    steps++;

    // Increase by 1
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 10; y++) {
        input[x][y] ++;
      }
    }

    do {
      for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
          if (flashes.get(`${x},${y}`) !== 1) {
            if (input[x][y] > 9) {
              [x - 1, x, x + 1].forEach((x) => { if ((x >= 0 && x < 10) && (y - 1 >= 0)) { update(input, x, y - 1, flashes) }});
              [x - 1, x, x + 1].forEach((x) => { if (x >= 0 && x < 10) { update(input, x, y, flashes) }});
              [x - 1, x, x + 1].forEach((x) => { if ((x >= 0 && x < 10) && (y + 1 < 10)) { update(input, x, y + 1, flashes) }});

              input[x][y] = 0;
              flashes.set(`${x},${y}`, 1)

              if (flashes.size === 100) {
                found = true
                console.log(steps);
                console.log(input);
                break;
              }
            }
          }

        }
      }
    } while (input.find((e) => e.find((a) => (a > 9))));

    total += flashes.size
    flashes = new Map()
  }
  return steps
}


const input = parseInput();
const res = calc(input);

console.log(`Final result: ${res}`);
