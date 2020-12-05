use std::fs::File;
use std::io::prelude::*;

fn read_file() -> Vec<i32> {
    let mut file = File::open("./inputs/day_1").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let numbers: Vec<i32> = contents.lines().map(|s| s.parse().unwrap()).collect();
    numbers
}

fn day_1(numbers: Vec<i32>, target: i32) -> i32 {
    let mut result = 0;
    for (i, v) in numbers.iter().enumerate() {
       for (j, w) in numbers.iter().enumerate() {
           if ((v + w) == target) && (i != j) {
             result = v * w;
           }
       }
    }
    result
}

fn main() {
    let numbers = read_file();
    let result = day_1(numbers, 2020);
    println!("{}", result);
}
