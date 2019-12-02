use std::fs::File;
use std::io::prelude::*;

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

fn day_2_1() {
    let mut nums = read_input_day2();

    nums[1] = 12;
    nums[2] = 2;

    let len = nums.len() - 1;

    for i in 0..len {
        if (i % 4 != 0) { continue; }
        if nums[i] == 99 { break; }
        let store_val = nums[i + 3];

        nums[store_val as usize] = consume_line(&nums, &i);
    };

    println!("final answer: {:?}", nums[0]);
}

fn main() {
    day_2_1();
}
