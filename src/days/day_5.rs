use std::fs::File;
use std::io::prelude::*;
use std::collections::HashMap;

fn read_input_day5() -> Vec<i32> {
    let mut file = File::open("./inputs/day_5").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let numbers: Vec<i32> = contents.trim().split(",").map(|s| s.parse().expect("Could not parse s")).collect();
    numbers
}


fn run_computer(mut nums: Vec<i32>, input: i32) -> i32 {

    let len = nums.len() - 1;
    let mut next_i = 0;

    for i in 0..len {
        if (i != next_i) { continue; }

        let operator = nums[i];

        match operator {
            99 => { break; }
            1 => {
                let store_val = nums[i + 3];
                let i1 = nums[i + 1] as usize;
                let i2 = nums[i + 2] as usize;
                nums[store_val as usize] = nums[i1] + nums[i2];
                next_i += 4;
            }
            2 => {
                let store_val = nums[i + 3];
                let i1 = nums[i + 1] as usize;
                let i2 = nums[i + 2] as usize;
                nums[store_val as usize] = nums[i1] * nums[i2];
                next_i += 4;
            }
            3 => {
                let store_val = nums[i + 1];
                nums[store_val as usize] = input;
                next_i += 2;
            }
            4 => {
                let param = nums[i + 1];
                println!("{:?}", param);
                next_i += 2;
            }
            _ => panic!("Unknown operator: {}", operator)
        }

        };

        nums[0]
}

pub fn day_5_1(){

    let input = 1;
    let nums = read_input_day5();
    let output = run_computer(nums, input);
    println!("output: {:?}", output);
}
