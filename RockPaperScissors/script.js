const playerText = document.querySelector("#player");
const compText = document.querySelector("#comp");
const res = document.querySelector("#res");
const choiceBtn = document.querySelectorAll(".btn");

let player, computer, result;
choiceBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    player = btn.textContent;
    playerText.textContent = `Player: ${player}`;
    compChoice();
    compText.textContent = `Computer: ${computer}`;
    res.textContent = checkWinner();
  })
);

function compChoice() {
  randomValue = Math.floor(Math.random() * 3) + 1;
  switch (randomValue) {
    case 1:
      computer = "ROCK";
      break;
    case 2:
      computer = "PAPER";
      break;
    case 3:
      computer = "SCISSORS";
  }
}
function checkWinner() {
  if (player == computer) return "DRAW!";
  else if (computer == "ROCK") {
    return player == "PAPER" ? "Hurray..You WIN!" : "Oops..You LOSE!";
  } else if (computer == "PAPER") {
    return player == "SCISSORS" ? "Hurray..You WIN!" : "Oops..You LOSE!";
  } else if (computer == "SCISSORS") {
    return player == "ROCK" ? "Hurray..You WIN!" : "Oops..You LOSE!";
  }
}
