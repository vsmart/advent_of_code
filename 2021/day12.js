const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day12.txt').toString().split("\n");
  input.pop()
  let map = new Map();
  const num = input.forEach((e) => {
    [ k, v] = e.split('-');

    let key = map.get(k)
    let opts = key ? key.concat(v) : [v];
    map.set(k, opts)

    let val = map.get(v)
    let optv = val ? val.concat(k) : [k];
    map.set(v, optv)

  })
  return map
}


// Part 1
function step(map, all, path, current) {
  if (current === 'end') {
    all.push(path)
    return path;
  }

  let options = map.get(current) || [];

  if (options.length === 0 ) { console.log('dead end at ' + current) };

  options.forEach((option) => {
    // big cave or small one that hasn't been visited yet
    if ((option === option.toUpperCase()) || (!path.includes(option))) {
      step(map, all, path.concat(option) , option);
    }
  });
}

// Part 2
function step2(map, all, path, current) {
  if (current === 'end') {
    all.push(path)
    return path;
  }

  let options = map.get(current) || [];

  if (options.length === 0 ) { console.log('dead end at ' + current) };

  options.forEach((option) => {

    let noDuplicateSmallCave = (path) => {
      let smalls = path.filter((e) => (e === e.toLowerCase()));
      let s = new Set(smalls)
      return (s.size === smalls.length);
    }

    // no return to start, big cave or small one that hasn't been visited yet, or not a duplicate small cave
    if ((option !== 'start') &&  ((option === option.toUpperCase()) || (!path.includes(option)) || noDuplicateSmallCave(path))) {
      step2(map, all, path.concat(option) , option);
    }
  });
}

function calc(map) {
  let all = []
  step2(map, all, ['start'], 'start');

  return all;
}


const input = parseInput();
const res = calc(input);

console.log('Final result: ')
console.log(res.length);
