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

fn main() {
    day_1_2();
}
