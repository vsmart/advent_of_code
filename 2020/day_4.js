#! usr/env/node

const fs = require('fs');

function parseFile(path) {
  const file = fs.readFileSync(path, 'UTF-8');
  const linesRaw = file.split('\n\n');
  return linesRaw;
}

function isValid(passport) {
  const reqFields = ['byr','iyr', 'eyr', 'hgt','hcl','ecl','pid'];
  const optFields = 'cid';

  const ids = passport.split(/\s+/); //.map((p) => return { p.split(':')[0], p.split(':')[1] });
  let isValid = true;
  reqFields.forEach((f) => {
    const any = ids.filter((id) => {
      const key = id.split(':')[0];
      return (key === f);
    });
    if (any.length === 0) {
      console.log('Invalid passport found - missing required field ', f);
      isValid = false;
    }
  })

  return isValid;
}

function day4() {
  const passports = parseFile('./inputs/day_4');
  const res = passports.filter((passport) => isValid(passport)).length;
  console.log('Total valid: ' + res);
}

day4();
