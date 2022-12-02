const fs = require('fs');

const scores = {
  "X": 1,
  "Y": 2 ,
  "Z": 3,
  "A": 1, // Part 2
  "B": 2 , // Part 2
  "C": 3, // Part 2
}

function win(b) {
  return 6 + scores[b]
}

function draw(b) {
  return 3 + scores[b];
}

function lose(b) {
  return scores[b];
}

// A Rock, B Paper, C Scissor
// X Rock, Y Paper, Z Scissor
function partOne() {
  const input = fs.readFileSync('inputs/day2').toString().split("\n");
  let total = 0;
  input.forEach((line) => {
    let play = line.split(" ");
    let score = 0;

    if (play[0] == "A") {
      if (play[1] == "X") score = draw(play[1]);
      if (play[1] == "Y") score = win(play[1]);
      if (play[1] == "Z") score = lose(play[1]);
    }
    else if (play[0] == "B") {
      if (play[1] == "X") score = lose(play[1]);
      if (play[1] == "Y") score = draw(play[1]);
      if (play[1] == "Z") score = win(play[1]);
    }
    else if (play[0] == "C") {
      if (play[1] == "X") score = win(play[1]);
      if (play[1] == "Y") score = lose(play[1]);
      if (play[1] == "Z") score = draw(play[1]);
    }

    total += score;

 })
  console.log(total);
}

/////////////////////////////////////////Part 2 ///////////////////////////

// A Rock, B Paper, C Scissor
// X Lose, Y Draw, Z Win
function partTwo() {
  const input = fs.readFileSync('inputs/day2').toString().split("\n");
  let total = 0;
  input.forEach((line) => {
    let play = line.split(" ");
    let score = 0;

    if (play[0] == "A") {
      if (play[1] == "X") score = scores["C"]
      if (play[1] == "Y") score = 3 + scores["A"];
      if (play[1] == "Z") score = 6 + scores["B"];
    }
    else if (play[0] == "B") {
      if (play[1] == "X") score = scores["A"];
      if (play[1] == "Y") score = 3 + scores["B"];
      if (play[1] == "Z") score = 6 + scores["C"];
    }
    else if (play[0] == "C") {
      if (play[1] == "X") score = scores["B"];
      if (play[1] == "Y") score = 3 + scores["C"];
      if (play[1] == "Z") score = 6 + scores["A"];
    }

    total += score;

 })
  console.log(total);
}


partOne();
partTwo();
