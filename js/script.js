import wordList from "./words.js";

const answer = document.querySelector(".answer"),
    privewImg = document.querySelector(".img"),
    [hintContent, remainGuess, wrongLetter] =
        document.querySelectorAll(".content p span"),
    userInput = document.querySelector(".user-input"),
    btnReset = document.querySelector(".btn-reset");

let word, hint, correct, wrong, remain;

const render = () => {
    let image;
    ({ image, word, hint } =
        wordList[Math.floor(Math.random() * wordList.length)]);

    remain = word.length * 2;
    correct = [];
    wrong = [];

    privewImg.style.backgroundImage = `url("${image}")`;
    let htmls = "";
    for (let i = 0; i < word.length; i++) {
        htmls += `<input type="text" disabled/>`;
    }

    answer.innerHTML = htmls;

    hintContent.innerText = hint;
    remainGuess.innerText = word.length * 2;
    wrongLetter.innerText = wrong;
};

const playGame = () => {
    let key = userInput.value;
    userInput.value = "";
    userInput.focus();

    const inputBox = answer.querySelectorAll("input");

    if (/^[a-zA-Z]+$/.test(key)) {
        if (word.includes(key)) {
            if (!correct.includes(key)) {
                correct.push(key);
                for (let i in word) {
                    if (word[i] === key) {
                        inputBox[i].value = key;
                    }
                }
                if (correct.length === word.length) {
                    setTimeout(() => {
                        alert(`Congrats! You found the word ${word}`);
                        render();
                    }, 50);
                }
            }
        } else {
            if (!wrong.includes(` ${key}`)) {
                wrong.push(` ${key}`);
                remain -= 1;
                if (remain < 1) {
                    alert("Game over! You don't have remaining guesses.");
                    for (let i in word) {
                        inputBox[i].value = word[i];
                    }
                    return;
                }
                remainGuess.innerText = remain;
                wrongLetter.innerText = wrong;
            }
        }
    }
};

render();
document.body.addEventListener("keydown", () => userInput.focus());
userInput.addEventListener("input", playGame);
btnReset.addEventListener("click", () => render());
