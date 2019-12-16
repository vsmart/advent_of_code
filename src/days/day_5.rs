use std::fs::File;
use std::io::prelude::*;
use std::collections::HashMap;

fn read_input_day2() -> Vec<i32> {
    let mut file = File::open("./inputs/day_2").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let numbers: Vec<i32> = contents.trim().split(",").map(|s| s.parse().expect("Could not parse s")).collect();
    numbers
}


fn run_computer(mut nums: Vec<i32>, noun: i32, verb: i32) -> i32 {

    let len = nums.len() - 1;

    for i in 0..len {
        if (i % 4 != 0) { continue; }

        let operator = nums[i];


        match operator {
            99 => { break; }
            1 => {
                let store_val = nums[i + 3];
                let i1 = nums[i + 1] as usize;
                let i2 = nums[i + 2] as usize;
                nums[store_val as usize] = nums[i1] + nums[i2]
            }
            2 => {
                let store_val = nums[i + 3];
                let i1 = nums[i + 1] as usize;
                let i2 = nums[i + 2] as usize;
                nums[store_val as usize] = nums[i1] * nums[i2]
            }
            3 => {
                let store_val = nums[i + 1];
                nums[store_val as usize] = 999; // input
            }
            4 => {
                let param = nums[i + 1];
                println!("{:?}", param);
            }
            _ => panic!("Unknown operator: {}", operator)
        }

        };

        nums[0]
}

pub fn day_5_1(){
}
