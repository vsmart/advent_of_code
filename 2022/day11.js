const fs = require('fs');

function parse() {
const input = fs.readFileSync('inputs/day11-ex').toString().split("\n\n");
  const monkeys = []
  input.forEach((monSection) => {
     let atts = monSection.split("\n");
     let monkey = {}

     let items = atts.find((s) => s.trim().startsWith("Starting items"));
     items = items.split(": ").pop()
     items = items.split(", ").map((e) => parseInt(e));
     monkey.items = items;

     let ops = atts.find((s) => s.trim().startsWith("Operation"));
     ops = ops.split("old ").pop();
     ops = ops.split(" ");
     monkey.ops = [ops[0], parseInt(ops[1]) || ops[1]]

     let test = atts.find((s) => s.trim().startsWith("Test"));
     monkey.test = parseInt(test.split("by ").pop());

     let truePath = atts.find((s) => s.trim().startsWith("If true"));
     monkey.trueP = parseInt(truePath.split("monkey ").pop());

     let falsePath = atts.find((s) => s.trim().startsWith("If false"));
     monkey.falseP = parseInt(falsePath.split("monkey ").pop());

     monkey.total = 0;

     monkeys.push(monkey);


    });

  return monkeys;

}

function applyOp(item, ops) {
  if (ops[1] === "old")
     return item * item
  if (ops[0] === '*')
    return item * ops[1]
  else if (ops[0] === '+')
    return item + ops[1]
  else
    console.log('ERROR with ', ops)
}

function partOne() {
  const monkeys = parse()
  for (let i = 0; i < 20; i++) {

    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        let newWorry = applyOp(item, monkey.ops);
        newWorry = Math.floor(newWorry / 3);

        if (newWorry % monkey.test === 0) {
          monkeys[monkey.trueP].items.push(newWorry);
        } else {
          monkeys[monkey.falseP].items.push(newWorry);
        }
        monkey.items = monkey.items.filter((e) => e!=item)

        monkey.total = monkey.total + 1;
      })
    });
    console.log('round ',i +1,': \n', monkeys);
  }

  const mi = monkeys.map((m) => m.total);
  mi.sort((a, b) => b - a);
  const mb = mi[0] * mi[1]

  console.log('monkey business: ' + mb);
}

/****************************Part 2 **************************/

function partTwo() {
  const monkeys = parse()
  for (let i = 0; i < 20; i++) {

    monkeys.forEach((monkey) => {
      monkey.items.forEach((item) => {
        let newWorry = applyOp(item, monkey.ops);

        if (newWorry % monkey.test === 0) {
          monkeys[monkey.trueP].items.push(newWorry);

        } else {
          monkeys[monkey.falseP].items.push(newWorry);
        }
        monkey.items = monkey.items.filter((e) => e!=item)

        monkey.total = monkey.total + 1;
      })
    });

  }

  const mi = monkeys.map((m) => m.total);
  mi.sort((a, b) => b - a);
  const mb = mi[0] * mi[1]
  console.log(monkeys);
  console.log('monkey business: ' + mb);
}

//partOne();
partTwo();
