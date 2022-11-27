const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day13.txt').toString().split("\n");
  input.pop()
}


function calc(input) {
  let init = 'NNCB'
  let maps = new Map();

  maps.set('CH', 'B');
  maps.set('HH', 'N');
  maps.set('CB', 'H');
  maps.set('NH', 'C');
  maps.set('HB', 'C');
  maps.set('HC', 'B');
  maps.set('HN', 'C');
  maps.set('NN', 'C');
  maps.set('BH', 'H');
  maps.set('NC', 'B');
  maps.set('NB', 'B');
  maps.set('BN', 'B');
  maps.set('BB', 'N');
  maps.set('BC', 'B');
  maps.set('CC', 'N');
  maps.set('CN', 'C');

  let newString = '';
  for (let i = 0; i < (init.length - 1); i++) {
    let lookup = maps.get(init.slice(i, i + 2));
    if (lookup) {
      newString = newString.join(init[i] + lookup + init[i + 1]);
    }
    else {
      newString += init.slice(i, i+ 1);
    }

  }
  console.log(newString);

  return 0;
}


const input = parseInput();
const res = calc(input);
