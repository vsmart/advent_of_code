use std::fs::File;
use std::io::prelude::*;
use std::collections::HashMap;

// 0 means start
// 1 means a simple cable
// 2 means a cross
fn map_cables_on_grid(cable: Vec<(char, i32)>, cable2: Vec<(char, i32)>) -> HashMap<(i32, i32), i32> {

    let mut start = (0, 0);

    // (x, y), (num, steps)
    let mut map = HashMap::new();
    map.insert((0, 0), (0, 0));
    let mut step_counter = 0;

    for (n, e) in cable.iter().enumerate() {
        let (x, y) = match e.0 {
            'R' => {
                    for i in 0..e.1 {
                      map.insert(( start.0 + i, start.1), (1, step_counter + i ));
                    }
                     (start.0 + e.1, start.1)
            },
            'L' => {
                    for i in 0..e.1 {
                      map.insert(( start.0 - i, start.1), (1, step_counter + i));
                    }
                     ( start.0 - e.1, start.1) },
            'U' => {
                    for i in 0..e.1 {
                      map.insert(( start.0, start.1 + i), (1, step_counter + i));
                    }
                    ( start.0, start.1 + e.1) },
            'D' => {
                    for i in 0..e.1 {
                      map.insert(( start.0, start.1 - i), (1, step_counter + i));
                    }
                    ( start.0, start.1 - e.1)
                    },
            _ => { panic!("Unexpected input"); }
        };



        step_counter += e.1;
        println!("steps: {}", step_counter);
        start = (x, y)
    }

    let mut intersections = HashMap::new();
    start = (0,0);
    step_counter = 0;

    for (n, e) in cable2.iter().enumerate() {
        let (x, y) = match e.0 {
            'R' => { for i in 0..e.1 {

                       let new_x = start.0 + i;
                       let new_y = start.1;


                       let exists = map.contains_key(&(new_x, new_y));

                       if exists {
                           let (_, steps) = map.get(&(new_x, new_y)).unwrap();
                           intersections.insert((new_x, new_y), steps + step_counter + i as i32);
//                           println!("intersection at: {},{} steps: {}");
                       }
                    }
                    (start.0 + e.1, start.1)
            },
            'L' => {
                for i in 0..e.1 {

                    let new_x = start.0 - i;
                    let new_y = start.1;


                    let exists = map.contains_key(&(new_x, new_y));

                       println!("L - {}, {}: {}", new_x, new_y, exists);
                    if exists {
                           let (_, steps) = map.get(&(new_x, new_y)).unwrap();
                           intersections.insert((new_x, new_y), steps + step_counter  + i as i32);
                    }
                }
                     ( start.0 - e.1, start.1) },
            'U' => {
                    for i in 0..e.1 {
                        let new_x = start.0;
                        let new_y = start.1 + i;


                    let exists = map.contains_key(&(new_x, new_y));

                       println!("U - {}, {}: {}", new_x, new_y, exists);

                    if exists {
                           let (_, steps) = map.get(&(new_x, new_y)).unwrap();
                           intersections.insert((new_x, new_y), steps + step_counter  + i as i32);
                    }
                    }
                    ( start.0, start.1 + e.1) },
            'D' => {
                    for i in 0..e.1 {
                        let new_x = start.0;
                        let new_y = start.1 - i;


                        let exists = map.contains_key(&(new_x, new_y));

                       println!("D - {}, {}: {}", new_x, new_y, exists);

                        if exists {
                           let (_, steps) = map.get(&(new_x, new_y)).unwrap();
                           intersections.insert((new_x, new_y), steps + step_counter + i as i32);
                        }

                    }
                    ( start.0, start.1 - e.1)
                    },
            _ => { panic!("Unexpected input"); }
        };

       step_counter += e.1;
       println!("steps: {}", step_counter);
       start = (x, y)
    }

    intersections
}

fn find_closest_point(set: &HashMap<(i32, i32), i32>) -> i32 {
    let mut shortest_distance = -1;
    for ((x, y), _) in set.iter() {
        let distance = x.abs() + y.abs();
        if (distance < shortest_distance || shortest_distance == -1) {
            shortest_distance = distance;
        }
    }
    shortest_distance
}

fn find_least_steps(set: &HashMap<(i32, i32), i32>) -> i32 {
    *set.values().min().expect("could not find smallest entry")
}

fn day_3_1_read_input() -> (Vec<(char, i32)>, Vec<(char, i32)>){
    let mut file = File::open("./inputs/day_3").expect("File could not be opened");
    let mut contents = String::new();
    file.read_to_string(&mut contents).expect("Can't read from file");

    let str = contents.lines().next().unwrap();
    let c1:Vec<(char, i32)> = str.trim().split(",").map(|s| (s.chars().next().unwrap() as char, s.split_at(1).1.parse::<i32>().expect("could not be parsed to int"))).collect();

    let str2 = contents.lines().nth(1).unwrap();
    let c2:Vec<(char, i32)> = str2.trim().split(",").map(|s| (s.chars().next().unwrap() as char, s.split_at(1).1.parse::<i32>().expect("could not be parsed to int"))).collect();

    (c1, c2)
}

fn day_3_1() {

    let input = day_3_1_read_input();
    let cables_1: Vec<(char, i32)> = input.0;
    let cables_2: Vec<(char, i32)> = input.1;
//    let cables_1 = vec![('R', 8) , ('U', 5), ('L', 5) , ('D', 3)];
//    let cables_2 = vec![('U', 7) , ('R', 6), ('D', 4) , ('L', 4)];

    println!("{:?}", cables_1);
    println!("{:?}", cables_2);

    let mut intersections = map_cables_on_grid(cables_1, cables_2);
    intersections.remove(&(0, 0));
    println!("intersections: {:?}", &intersections);

    let distance = find_closest_point(&intersections);
    println!("distance: {:?}", &distance);

    let steps = find_least_steps(&intersections);
    println!("steps: {:?}", &steps);

}
