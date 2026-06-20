const modeSwitch = document.querySelector("#mode");

modeSwitch.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});

const boxes = document.querySelectorAll(".box");
const scoreDisplay = document.querySelector("#score");
const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#start-btn");
const restartButton = document.querySelector("#restart");

let score = 0;
let timeLeft = 30;
let activeBox = null;
let ratInterval = null;
let countDownInterval = null;

function startGame() {
    clearInterval(ratInterval);
    clearInterval(countDownInterval);

    boxes.forEach(box => box.classList.remove("rat"));

    score = 0;
    timeLeft = 30;
    activeBox = null;

    scoreDisplay.textContent = score;
    timerDisplay.textContent = timeLeft;

    startButton.disabled = true;

    randomRat();
    ratInterval = setInterval(randomRat, 1500);
    countDownInterval = setInterval(countDown, 1000);
}

function randomRat() {
    boxes.forEach(box => box.classList.remove("rat"));

    const randomIdx = Math.floor(Math.random() * boxes.length);
    activeBox = boxes[randomIdx];
    activeBox.classList.add("rat");
}

boxes.forEach(box => {
    box.addEventListener("click", () => {
        if (box === activeBox) {
            score++;
            scoreDisplay.textContent = score;

            activeBox.classList.remove("rat");
            activeBox = null;
        }
    });
});

function countDown() {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(ratInterval);
        clearInterval(countDownInterval);

        boxes.forEach(box => box.classList.remove("rat"));

        activeBox = null;
        startButton.disabled = false;

        alert(`Game Over! Your final score is: ${score}`);
    }
}

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", startGame);