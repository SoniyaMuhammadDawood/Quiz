#!/usr/bin/env node
import inquirer from "inquirer";
import fetch from "node-fetch"; //import fetch if you're using node.js
import chalk from "chalk";
const asciiArt = [
    ".------..------..------..------..------..------.",
    "|S.--. ||O.--. ||N.--. ||I.--. ||Y.--. ||A.--. |",
    "| :/\\: || :/\\: || :(): || (\\/) || (\\/) || (\\/) |",
    "| :\\/: || :\\/: || ()() || :\\/: || :\\/: || :\\/: |",
    "| '--'S|| '--'O|| '--'N|| '--'I|| '--'Y|| '--'A|",
    "`------'`------'`------'`------'`------'`------'"
];
console.log(chalk.bold.magentaBright(asciiArt.join('\n')));
const apiLink = "https://opentdb.com/api.php?amount=7&category=17&difficulty=easy";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // Get user name
    let userName = await inquirer.prompt({
        type: "input",
        name: "name",
        message: chalk.bold.bgCyanBright("What is your name? 🙂 "),
    });
    console.log(chalk.yellowBright(`Hi ${userName.name} 😇⭐ !`));
    // Loop through each quiz question
    for (let i = 0; i < data.length; i++) {
        // Combine incorrect and correct answers
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        // Shuffle the answers array for randomness
        answers = answers.sort(() => Math.random() - 0.5);
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers,
        });
        if (ans.quiz === data[i].correct_answer) {
            // Corrected comparison and increment
            ++score;
            console.log(` ${chalk.bold.magentaBright("Correct")}`);
        }
        else {
            console.log(`Correct answer is ${chalk.bold.italic.yellowBright(data[i].correct_answer)}`);
        }
    }
    // Display the final score
    console.log(`Dear 😉 ${chalk.bold.redBright(userName.name)}, your score is ${chalk.bold.yellowBright(score)} out of ${chalk.bold.greenBright("7")}`);
};
startQuiz();
