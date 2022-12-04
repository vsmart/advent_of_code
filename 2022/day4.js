const fs = require('fs');

function partOne() {
  const input = fs.readFileSync('inputs/day4').toString().split("\n");
  let total = 0;
  input.pop();

  input.forEach((line) => {
    const sides = line.split(',');
    const nums = sides.map((side) => {
      side = side.split('-');
      return [parseInt(side[0]), parseInt(side[1])];
    })
    if (((nums[0][0] <= nums[1][0]) && (nums[0][1] >= nums[1][1]))
      || ((nums[1][0] <= nums[0][0]) && (nums[1][1] >= nums[0][1])))
    {
      total += 1;
    }

  })

  console.log(total);
}

/****************************Part 2 **************************/

function partTwo() {
  const input = fs.readFileSync('inputs/day4').toString().split("\n");
  let total = 0;
  input.pop();

  input.forEach((line) => {
    const sides = line.split(',');
    const nums = sides.map((side) => {
      side = side.split('-');
      return [parseInt(side[0]), parseInt(side[1])];
    })
    if (((nums[0][0] <= nums[1][0]) && (nums[0][1] >= nums[1][0]))
      || ((nums[0][0] >= nums[1][0]) && (nums[0][0] <= nums[1][1])))
    {
      total += 1;
    }

  })

  console.log(total);
}

partOne();
partTwo();
