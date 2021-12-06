const fs = require('fs');

function parseInput() {
  const input = fs.readFileSync('inputs/day5.txt').toString().split("\n");
  input.pop()
  const coords = input.map((e) => {
    let r = e.split(' -> ').map((f) => f.split(','))
    return {
      x1: parseInt(r[0][0]),
      y1: parseInt(r[0][1]),
      x2: parseInt(r[1][0]),
      y2: parseInt(r[1][1]) }
  })
  return coords;
}


function calc(input) {
  let points = new Map();
  input.forEach((v) => {
    let line = []

    // horizontal
    if (v.x1 === v.x2) {
      const [lowerY, higherY] = [v.y1, v.y2].sort((a, b) => a - b)
      line = Array(higherY - lowerY + 1).fill().map((element, i) => { return { x: v.x1, y: (i + lowerY)}})

    // vertical
    } else if (v.y1 === v.y2) {

      const [lowerX, higherX] = [v.x1, v.x2].sort((a, b) => a - b)
      line = Array(higherX - lowerX + 1).fill().map((element, i) => { return { x: (i + lowerX), y: v.y1}})

    // diagonal
    } else {

      const [lower, higher] = [{x: v.x1, y: v.y1}, {x: v.x2, y: v.y2}].sort((a, b) => a.x - b.x)

      if (lower.y < higher.y) {
        line = Array(higher.x - lower.x + 1).fill().map((element, i) => { return { x: (i + lower.x), y: (i + lower.y)}})
      } else {
        line = Array(higher.x - lower.x + 1).fill().map((element, i) => { return { x: (i + lower.x), y:  (lower.y - i)}})
      }

    }

    line.forEach((point) => {
      let count = points.get(JSON.stringify(point)) || 0
      points.set(JSON.stringify(point), count + 1);
    })
  })


  return Array.from(points.values()).filter((e) => e > 1).length
}

const input = parseInput();
const res = calc(input);

console.log(`Final result: ${res}`);
