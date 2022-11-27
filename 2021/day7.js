const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day7_test.txt').toString().split(",");
  const crabs = input.map((e) => parseInt(e))
  crabs.sort((a, b) => (a - b), 0)
  return crabs
}

function calcTotal(range, num) {
  console.log(range)
  let movements = range.reduce((total, current) => (total + Math.abs(num - current)), 0);
  return movements
}

function search(input, range, lowest, start, end) {
  console.log(`low: ${lowest}, range:`, start, end)
  if (start > end) {
    console.log('found lowest')
    return lowest;
  }

  let mid=Math.floor((start + end)/2);

  const leftTotal = calcTotal(input.slice(0, mid), mid)
  const rightTotal = calcTotal(input.slice(mid, input.length - 1), mid)


  // left side is bigger
  if(leftTotal > rightTotal) {
    console.log('left wins with ', leftTotal, 'vs ', rightTotal)
    if (lowest > rightTotal) lowest = rightTotal;
    return search(input, range, lowest, start, mid-1);

  // right side is bigger
  } else {
    console.log('right wins with ', rightTotal, 'vs ', leftTotal)
    if (lowest > leftTotal) lowest = leftTotal;
    return search(input, range, lowest, mid+1, end);
  }
}


// Part 1
function calc(input) {
  //let sum = input.reduce((total, current) => (total + current), 0);
  //const mean = Math.round(sum / input.length)
  //
  let r = [...Array(input[input.length - 1] - input[0] + 1).keys()];
  let range = r.map((e) => e + input[0])

  console.log(range)
  let randoTotal = calcTotal(input, Math.floor(input.length / 2))

  let res = search(input, range, randoTotal, 0, input.length - 1);

  return res
}


const input = parseInput();
const res = calc(input);

  console.log(`Final result: ${res}`);
