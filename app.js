const board = document.querySelector("#board");
const blackStone = "black";
const whiteStone = "white";

let currentPlayer = blackStone;

function getStonePosition() {
  const x = Math.floor(Math.random() * 19);
  const y = Math.floor(Math.random() * 19);
  return [x, y];
}

function placeStone(x, y) {
  const stone = document.createElement("div");
  stone.className = currentPlayer;
  stone.style.top = x * 20 + "px";
  stone.style.left = y * 20 + "px";
  board.appendChild(stone);
}

function checkWinner() {
  for (let x = 0; x < 19; x++) {
    for (let y = 0; y < 19; y++) {
      if (checkLine(x, y, 1) || checkLine(x, y, -1) || checkLine(x, y, 9) || checkLine(x, y, -9) || checkLine(x, y, 7) || checkLine(x, y, -7)) {
        return currentPlayer;
      }
    }
  }
  return null;
}

function checkLine(x, y, direction) {
  let count = 1;
  for (let i = 1; i <= 5; i++) {
    const nextX = x + i * direction;
    const nextY = y;
    if (nextX < 0 || nextX >= 19 || nextY < 0 || nextY >= 19) {
      return false;
    }
    if (board.querySelector(`.${currentPlayer}`).querySelector(`[style*="top"]:nth-child(${i + 1})`)) {
      count++;
    } else {
      break;
    }
  }
  return count >= 5;
}

function startGame() {
  for (let x = 0; x < 19; x++) {
    for (let y = 0; y < 19; y++) {
      board.querySelector(`[style*="top"]:nth-child(${x + 1})`).remove();
    }
  }
  currentPlayer = blackStone;
}

startGame();

setInterval(() => {
  const x = getStonePosition();
  placeStone(x[0], x[1]);
  const winner = checkWinner();
  if (winner) {
    alert(`승자는 ${winner}입니다.`);
    startGame();
  }
}, 1000);
