#! usr/env/node

const fs = require('fs');

function parseFile(path) {
  const file = fs.readFileSync(path, 'UTF-8');
  const linesRaw = file.split('\n');
  linesRaw.pop();
  return linesRaw;
}


function passwordValid(range, char, password) {
  const numOfMatches = [...password.matchAll(char)].length;
  const isAMatch = (numOfMatches >= range[0] && numOfMatches <= range[1]);
  return isAMatch;
}

function day2() {
  const linesRaw = parseFile('./inputs/day_2');
  const lines  = linesRaw.map((line) => {
    return {
      range: line.split(' ')[0].split('-'),
      character: line.split(' ')[1].replace(':', ''),
      password: line.split(' ')[2]
  }})

  const total = lines.filter((line) => passwordValid(line.range, line.character, line.password)).length;
  console.log('Result: ' + total);
}


day2();


