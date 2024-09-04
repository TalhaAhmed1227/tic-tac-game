const cells = document.querySelectorAll('[data-cell]');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const checkWinner = () => {
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.includes('') ? null : 'Draw';
};

const handleClick = (event) => {
  const index = Array.from(cells).indexOf(event.target);
  if (board[index] || checkWinner()) return;

  board[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  const winner = checkWinner();
  if (winner) {
    statusElement.textContent = winner === 'Draw' ? "It's a draw!" : `${winner} wins!`;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const resetGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  cells.forEach(cell => cell.textContent = '');
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);

resetGame();  // Initialize game
