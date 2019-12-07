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
