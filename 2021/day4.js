const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day4.txt').toString().split("\n");
  const numbers = input.shift().split(',').map((e) => parseInt(e))
  const board = input;
  let boards = [];
  for (let i = 1; i < input.length; i+= 6) {
    let b = input.slice(i, i + 5);
    b = b.map((row) => {
      row = row.trim().split(/ +/)
      return row.map((n) => parseInt(n))
    })
    boards.push(b);
  }
  return {
    boards: boards,
    states: boards.map((board) => board.map((row) => [0,0,0,0,0])),
    numbers: numbers
    };
}

// Part 1
function calc(input) {
  let board;
  let states;
  let i = 0;
  let result;
  let boardwon = new Array(input.boards.length).fill(false)
  let found = false;

  do {
    for (let board = 0; board < input.boards.length; board ++) {
      for (let row = 0; row < 5; row ++) {
        for (let num = 0; num < 5; num ++) {

          if (found) break;
          if (input.boards[board][row][num] === input.numbers[i]) {
            input.states[board][row][num] = 1;

            if ((input.states[board][row].filter((e) => e === 1).length === 5)
              || (input.states[board].map((e) => e[num]).filter((e) => e === 1).length === 5 )){
              boardwon[board] = true

              if (boardwon.every((e) => e === true)) {
                found = true

                let sum = 0;
                for (let x = 0; x < 5; x++) {
                  for (let y = 0; y < 5; y++) {
                    if (input.states[board][x][y] === 0) {
                      sum += input.boards[board][x][y];
                    }
                  }
                }

                result = sum * input.numbers[i]
                console.log(`sum: ${sum}, number: ${input.numbers[i]}, res: ${result}`);

              }
            }
          }
        }
      }
    }

    i++
  } while (!found && i < input.numbers.length);

  return result;
}

const input = parseInput();
const res = calc(input);

console.log(`Final result: ${res}`);
