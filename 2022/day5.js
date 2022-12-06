const fs = require('fs');

function partOne() {
  const input = fs.readFileSync('inputs/day5').toString().split("\n\n");

  const stacksTxt = input[0];
  const ops = input[1].split("\n");

  let txt = stacksTxt.split("\n");
  txt.pop();
  txt = txt.map((e) => e.split(""));
  const stacks = { 1: [], 2: [], 3: [], 4: [],
    5: [], 6: [], 7: [], 8: [], 9: [] }

  for (let y = 8; y > 0; y --) {
    for (let i = 1; i < 10; i++) {

        const char = txt[y - 1][i * 4 - 3];
        if (char && char !== " ") stacks[i].push(char)
    }
  }

  ops.pop();
  ops.forEach((op) => {
    const steps = parseInt(op.split(" from")[0].split(" ").pop());
    const from = op.split(" to")[0].split(" ").pop();
    const to = op.split(" to")[1].split(" ").pop();

    for (let i = 0; i < steps; i++){
      let toMove = stacks[from].pop();
      stacks[to].push(toMove);
    }
  });
  console.log(stacks)
}

/****************************Part 2 **************************/

function partTwo() {
  const input = fs.readFileSync('inputs/day5').toString().split("\n\n");

  const stacksTxt = input[0];
  const ops = input[1].split("\n");
  const total = 0;


  let txt = stacksTxt.split("\n");
  txt.pop();
  txt = txt.map((e) => e.split(""));
  const stacks = { 1: [], 2: [], 3: [], 4: [],
    5: [], 6: [], 7: [], 8: [], 9: [] }

  for (let y = 8; y > 0; y --) {
    for (let i = 1; i < 10; i++) {

        const char = txt[y - 1][i * 4 - 3];
        if (char && char !== " ") stacks[i].push(char)
    }
  }

  ops.pop();
  ops.forEach((op) => {
    const steps = parseInt(op.split(" from")[0].split(" ").pop());
    const from = op.split(" to")[0].split(" ").pop();
    const to = op.split(" to")[1].split(" ").pop();

    let moveStack = [];

    for (let i = 0; i < steps; i++){
      let toMove = stacks[from].pop();
      moveStack.push(toMove);
    }
    for (let i = 0; i < steps; i++){

      let toMove = moveStack.pop();
      stacks[to].push(toMove);
    }
  });
  console.log(stacks);
}


partOne();
partTwo();
