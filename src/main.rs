use std::fs::File;
use std::io::prelude::*;
use std::collections::HashMap;

fn read_file() -> Vec<i32> {
    let mut file = File::open("./inputs/day_1").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let numbers: Vec<i32> = contents.lines().map(|s| s.parse().unwrap()).collect();
    numbers
}

fn calculate_fuel(mass: &i32) -> i32 {
    println!("calculating fuel for {}", mass);
    mass / 3 - 2
}

fn day_1_1() {
    let result = read_file();

    let sum = result.iter().fold(0, |acc, x| acc + calculate_fuel(x));
    println!("Day 1 - 1: {}", sum);
}

fn calculate_fuels_fuel(init_fuel: i32, total_mass: i32) -> i32 {
    println!("loopn with {}, {}", init_fuel, total_mass);
    let newfuel = calculate_fuel(&init_fuel);
    if newfuel <= 0 { return total_mass }
    else {
        calculate_fuels_fuel(newfuel, (total_mass + newfuel))
    }
}

fn day_1_2() {
    let result = read_file();
    let sum = result.iter().fold(0, |acc, x| acc + calculate_fuels_fuel(*x, 0));
    println!("Day 1 - 2: {}", sum);
}

fn read_input_day2() -> Vec<i32> {
    let mut file = File::open("./inputs/day_2").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let numbers: Vec<i32> = contents.trim().split(",").map(|s| s.parse().expect("Could not parse s")).collect();
    numbers
}

fn consume_line(nums: &Vec<i32>, index: &usize) -> i32 {
    let operator = nums[*index];

    match operator {
        1 => {
            let i1 = nums[index + 1] as usize;
            let i2 = nums[index + 2] as usize;
            nums[i1] + nums[i2]
        }
        2 => {
            let i1 = nums[index + 1] as usize;
            let i2 = nums[index + 2] as usize;
            nums[i1] * nums[i2]
        }
        _ => panic!("Unknown operator: {}", operator)
    }
}

fn run_computer(mut nums: Vec<i32>, noun: i32, verb: i32) -> i32 {
    nums[1] = noun;
    nums[2] = verb;

    let len = nums.len() - 1;

    for i in 0..len {
        if (i % 4 != 0) { continue; }
        if nums[i] == 99 { break; }
        let store_val = nums[i + 3];

        nums[store_val as usize] = consume_line(&nums, &i);
    };

    nums[0]
}

fn day_2_1() {
    let mut nums = read_input_day2();
    let res = run_computer(nums, 12, 2);

    println!("final answer: {:?}", res);
}

fn day_2_2(){
    let nums = read_input_day2();

    for i in 0..99 {
        for k in 0..99 {
            let copy = nums.clone();
            let res = run_computer(copy, i, k);
            if res == 19690720 {
                let fin = 100 * i + k;

                println!("{} - {} - {},{} ", fin, res, i, k);
                break;
            };
        }
    }
}

// 0 means start
// 1 means a simple cable
// 2 means a cross
fn map_cables_on_grid(cable: Vec<(char, i32)>, cable2: Vec<(char, i32)>) -> HashMap<(i32, i32), i32> {

    let mut start = (0, 0);
    let mut map = HashMap::new();
    map.insert((0, 0), 0);

    for e in cable.iter() {
        let (x, y) = match e.0 {
            'R' => { ( start.0 + e.1, start.1) },
            'L' => { ( start.0 - e.1, start.1) },
            'U' => { ( start.0, start.1 + e.1) },
            'D' => { ( start.0, start.1 - e.1) },
            _ => { panic!("Unexpected input"); }
        };

        map.insert((x, y), 1);
        start = (x, y)
    }

    println!("{:?}", map);

    for e in cable2.iter() {
        let (x, y) = match e.0 {
            'R' => { ( start.0 + e.1, start.1) },
            'L' => { ( start.0 - e.1, start.1) },
            'U' => { ( start.0, start.1 + e.1) },
            'D' => { ( start.0, start.1 - e.1) },
            _ => { panic!("Unexpected input"); }
        };

        if map.contains_key(&(x,y)) {
            let k = map.get(&(x, y));
            if k == Some(&1) { map.insert((x, y), 2) }
            else { panic!("something weird happened"); }
        }
        else { map.insert((x, y), 1) };
        start = (x, y)
    }


    map
}


fn day_3_1() {
    let cables_1 = vec![('R', 8) , ('U', 5), ('L', 5) , ('D', 3)];
    let cables_2 = vec![('U', 7) , ('R', 6), ('D', 4) , ('L', 4)];

    let grid = map_cables_on_grid(cables_1, cables_2);

}


fn main() {
    day_3_1();
}
