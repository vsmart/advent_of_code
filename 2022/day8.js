const fs = require('fs');

function partOne() {
  const input = fs.readFileSync('inputs/day8').toString().split("\n");
  input.pop();
  let visible = 0;

  let nums = input.map((line) => line.split("").map((e) => parseInt(e)));

  const yLen = nums.length;
  const xLen = nums[0].length;

  for (let y = 0; y < yLen; y ++) {
    for (let x = 0; x < xLen; x ++) {
      const tree = nums[y][x];
      if (x === 0
        || y === 0
        || x === (xLen - 1)
        || y === (yLen - 1))
        visible ++;
      else {
        if (
          // left side
          nums[y].slice(0,x).every((n) => n < tree)
          // right side
        || nums[y].slice(x + 1,xLen).every((n) => n < tree)
          // top
        || nums.slice(0,y).map((row) => row[x]).every((n) => n < tree)
          // bottom
        || nums.slice(y + 1,yLen).map((row) => row[x]).every((n) => n < tree))
          visible ++;
      }
    }
  };
  console.log(visible);
}

/****************************Part 2 **************************/
function partTwo() {
  const input = fs.readFileSync('inputs/day8').toString().split("\n");
  input.pop();

  let nums = input.map((line) => line.split("").map((e) => parseInt(e)));
  const yLen = nums.length;
  const xLen = nums[0].length;
  let max = 0;

  for (let y = 1; y < (yLen - 1); y ++) {
    for (let x = 1; x < (xLen - 1); x ++) {

      const tree = nums[y][x];

      let localX = x;
      let localY = y;
      while (localX > 0)  {
        localX--;
        if (nums[localY][localX]  >= tree)
          break;
      }
      let left = x - localX;

      localX = x;
      localY = y;
      while (localX < (xLen -1)){
        localX++;
        if (nums[localY][localX] >= tree)
          break;
      }
      let right = (localX - x);

      localX = x;
      localY = y;
      while (localY > 0) {
        localY--;
        if (nums[localY][localX] >= tree)
          break;
      }
      let up = (y - localY);

      localX = x;
      localY = y;
      while (localY < (yLen -1)) {
        localY++;
        if (nums[localY][localX] >= tree)
          break;
      }
      let down = (localY - y);

      const score = up * down * left * right;
      if (score > max) max = score;
    }
  };
  console.log('Max scenic score: ', max);
}

partOne();
partTwo();
