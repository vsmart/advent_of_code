fn two_cons_nums(number: i32) -> bool {
    let stri = number.to_string();
    let (h, tail) = stri.split_at(1);
    let mut head = h.chars().nth(0).unwrap();
    for n in tail.chars() {
        if head == n { return true; }
        head = n;
    }
    false
}

fn only_two_cons_nums(number: i32) -> bool {
    let stri = number.to_string();
    let (h, tail) = stri.split_at(1);
    let mut head = h.chars().nth(0).unwrap();

    for (i, n) in tail.chars().enumerate() {
        if head == n {
            let next = tail.chars().nth(i + 1);
            let mut prev = None;
            if i >= 1 { prev = stri.chars().nth(i - 1); }

            match (next, prev) {
                (Some(next), Some(prev)) => { if next != n && prev != n { return true; } }
                (Some(next), None) => { if next != n  { return true; }}
                (None, Some(prev)) => { if prev != n  { return true; }}
                (None, None) => { return true; }
            }
        }
        head = n;
    }
    false
}


fn increasing_nums(number: i32) -> bool {
    let stri = number.to_string();
    let (h, tail) = stri.split_at(1);
    let mut head = h.chars().nth(0).unwrap();
    for n in tail.chars() {
        if n.to_digit(10) < head.to_digit(10) { return false }
        head = n;
    }
    true
}

pub fn day_4_1() {
    let start = 138241;
    let end = 674034;
    let mut passwords = vec![];

    for i in start..end {
        if increasing_nums(i as i32) && two_cons_nums(i as i32) {
            passwords.push(i as i32);
        }
    }
    println!("{:?}", passwords.len());
}

pub fn day_4_2() {
    let start = 138241;
    let end = 674034;
    let mut passwords = vec![];

    for i in start..end {
        if increasing_nums(i as i32) && only_two_cons_nums(i as i32) {
            passwords.push(i as i32);
        }
    }
    println!("{:?}", passwords.len());
}
