const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");

let winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClick));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `${currPlayer}'s turn`;
  running = true;
}
function cellClick() {
  const cellIdx = this.getAttribute("id");
  if (options[cellIdx] != "" || !running) return;
  updateCell(this, cellIdx);
  chkWinner();
}
function updateCell(cell, index) {
  options[index] = currPlayer;
  cell.textContent = currPlayer;
}
function changePlayer() {
  currPlayer = currPlayer == "X" ? "O" : "X";
  statusText.textContent = `${currPlayer}'s turn`;
}
function chkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const cond = winConditions[i];
    const cellA = options[cond[0]];
    const cellB = options[cond[1]];
    const cellC = options[cond[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `${currPlayer} wins!`;
    running = false;
  } else if (!options.includes("")) {
    statusText.textContent = `Draw!`;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
}
