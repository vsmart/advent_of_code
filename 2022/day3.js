const fs = require('fs');

function priorities(n){
  const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z', 'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  const sum = letters.indexOf(n) + 1;
  return sum;
}

function partOne() {
  const input = fs.readFileSync('inputs/day3').toString().split("\n");
  let total = 0;

  input.forEach((line) => {
    let items = new Set();

    const len = line.length;
    for (let i = 0; i < (len / 2); i ++) {
      items.add(line[i]);
    }
    for (let i = len / 2; i < len; i ++) {
      if (items.has(line[i])) {
          total += priorities(line[i]);
          break;
      }
    }
  })

  console.log(total);
}

/****************************Part 2 ***************/

function partTwo() {
  const input = fs.readFileSync('inputs/day3').toString().split("\n");
  let total = 0;

  for (let j = 0; j < (input.length - 2); j += 3) {

    let oneMatch = new Set();
    let twoMatches = new Set();

    // first line
    let line = input[j];
    for (let i = 0; i < line.length; i ++) {
      oneMatch.add(line[i]);
    }

    // second line
    line = input[j + 1];
    for (let i = 0; i < line.length; i ++) {
      if (oneMatch.has(line[i])) {
        twoMatches.add(line[i]);
      }
    }

    // third line
    line = input[j + 2];
    for (let i = 0; i < line.length; i ++) {
       if (twoMatches.has(line[i])) {
          total += priorities(line[i]);
          break;
        }
      }

    }
  console.log(total);
}


partOne();
partTwo();
