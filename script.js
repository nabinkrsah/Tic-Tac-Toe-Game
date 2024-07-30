let gameBoard = [];
let currentPlayer = "X";
let gameOver = false;

// Initialize game board
for (let i = 1; i <= 9; i++) {
  gameBoard.push(document.getElementById(`cell-${i}`));
}

// Add event listeners to cells
gameBoard.forEach((cell) => {
  cell.addEventListener("click", handleCellClick);
});

// Add event listener to reset button
document.getElementById("reset-button").addEventListener("click", resetGame);

function handleCellClick(event) {
  if (gameOver) return;
  const cell = event.target;
  if (cell.textContent === "") {
    cell.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    if (checkCondition(condition)) {
      gameOver = true;
      document.getElementById(
        "game-status"
      ).textContent = ` Congratulation Player ${
        gameBoard[condition[0]].textContent
      } wons the game! 🎉`;

      return;
    }
  }

  if (!gameBoard.some((cell) => cell.textContent === "")) {
    gameOver = true;
    document.getElementById("game-status").textContent = "It's a draw!";
  }
}

function checkCondition(condition) {
  return (
    gameBoard[condition[0]].textContent ===
      gameBoard[condition[1]].textContent &&
    gameBoard[condition[1]].textContent ===
      gameBoard[condition[2]].textContent &&
    gameBoard[condition[0]].textContent !== ""
  );
}

function resetGame() {
  gameBoard.forEach((cell) => {
    cell.textContent = "";
  });
  currentPlayer = "X";
  gameOver = false;
  document.getElementById("game-status").textContent = "Game in progress...";
}
