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
    mass / 3 - 2
}

fn main() {
    println!("Hello, world!");
    let result = read_file();

    let sum = result.iter().fold(0, |acc, x| acc + calculate_fuel(x));
    println!("Sum: {}", sum);
}
