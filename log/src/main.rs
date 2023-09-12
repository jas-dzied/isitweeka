use chrono::Utc;
use colored::Colorize;
use std::env;

fn main() {
    let text = env::args().nth(1).unwrap();
    let now = Utc::now();
    println!(
        "{} {}",
        now.format("%H:%M:%S").to_string().truecolor(100, 100, 100),
        text.bold()
    );
}
