const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d"); //what we draw on
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const startBtn = document.querySelector("#startBtn");
//variable to hold width and height of gameboard
const gameWidth = 500;
const gameHeight = 500;
const boardBg = "forestgreen";
const paddle1Color = "lightblue";
const paddle2Color = "red";
const paddleBorder = "black";
const ballColor = "yellow";
const ballBorderColor = "black";
const ballRadius = 12.5;
const paddleSpeed = 50;
let intervalID;
let ballSpeed = 1; //lowest speed
let ballX = gameWidth / 2;
let ballY = gameHeight / 2; // coordinates of ball initially at centre
let ballXDirection = 0;
let ballYDirection = 0;
let player1Score = 0;
let player2Score = 0;
let paddle1 = {
  width: 25,
  height: 100,
  x: 0,
  y: 0,
};
let paddle2 = {
  width: 25,
  height: 100,
  x: gameWidth - 25,
  y: gameWidth - 100,
};

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);
startBtn.addEventListener("click", gameStart);
function gameStart() {
  createBall();
  nextTick();
}
function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollision();
    nextTick();
  }, 10);
}
function clearBoard() {
  ctx.fillStyle = boardBg;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}
function drawPaddles() {
  ctx.strokeStyle = paddleBorder;
  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}
function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballX = gameWidth / 2;
  ballY = gameHeight / 2;
  drawBall(ballX, ballY);
}
function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}
function drawBall(ballX, ballY) {
  ctx.fillStyle = ballColor;
  ctx.strokeStyle = ballBorderColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.fill();
}
function checkCollision() {
  if (ballY <= 0 + ballRadius) {
    //ball touches top
    ballYDirection *= -1;
  }
  if (ballY >= gameHeight - ballRadius) {
    //ball touches bottom
    ballYDirection *= -1;
  }
  if (ballX <= 0) {
    //ball touches left border
    player2Score += 1;
    updateScore();
    createBall();
    return;
  }
  if (ballX >= gameWidth) {
    //ball touches right border
    player1Score += 1;
    updateScore();
    createBall();
    return;
  }
  //Bounce off the paddles:
  // 1. left paddle
  if (ballX <= paddle1.x + paddle1.width + ballRadius) {
    if (ballY > paddle1.y && ballY < paddle1.y + paddle1.height) {
      ballX = paddle1.x + paddle1.width + ballRadius; // if ball gets stuck
      ballXDirection *= -1; // change direction of ball
      ballSpeed += 1; //increase ball speed
    }
  }
  if (ballX >= paddle2.x - ballRadius) {
    if (ballY > paddle2.y && ballY < paddle2.y + paddle2.height) {
      ballX = paddle2.x - ballRadius; // if ball gets stuck
      ballXDirection *= -1; // change direction of ball
      ballSpeed += 1; //increase ball speed
    }
  }
}
function changeDirection(event) {
  const keyPressed = event.keyCode;
  console.log(keyPressed);
  // w-87, s-83, up-38, down -40
  const paddle1Up = 87;
  const paddle1Down = 83;
  const paddle2Up = 38;
  const paddle2Down = 40;

  switch (keyPressed) {
    case paddle1Up:
      if (paddle1.y > 0) paddle1.y -= paddleSpeed;
      break;
    case paddle1Down:
      if (paddle1.y < gameHeight - paddle1.height) paddle1.y += paddleSpeed;
      break;
    case paddle2Up:
      if (paddle2.y > 0) paddle2.y -= paddleSpeed;
      break;
    case paddle2Down:
      if (paddle2.y < gameHeight - paddle2.height) paddle2.y += paddleSpeed;
      break;
  }
}
function updateScore() {
  scoreText.textContent = `${player1Score}: ${player2Score}`;
}
function resetGame() {
  player1Score = 0;
  player2Score = 0;
  paddle1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0,
  };
  paddle2 = {
    width: 25,
    height: 100,
    x: gameWidth - 25,
    y: gameWidth - 100,
  };
  ballSpeed = 0;
  ballX = 0;
  ballY = 0;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
  gameStart();
}
