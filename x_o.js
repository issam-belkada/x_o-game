let cells = document.querySelectorAll(".cell");
let statustext = document.getElementById("status");
let button = document.getElementById("restartbtn");

let winnerModal = document.getElementById("winnerModal");
let modalText = document.getElementById("modalText");
let modalBtn = document.getElementById("modalBtn");

let currentplayer = "X";
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;

const wincondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

initialize();

function initialize() {
  cells.forEach(cell => cell.addEventListener("click", cellclicked));
  button.addEventListener("click", restartgame);
  modalBtn.addEventListener("click", closeModal);
  statustext.textContent =   `${currentplayer}'s turn`  ;
  running = true;
}

function cellclicked() {
  const cellIndex = this.getAttribute("cellindex");
  if (options[cellIndex] !== "" || !running) return;

  updatecell(this, cellIndex);
  checkwinner();
}

function updatecell(cell, index) {
  options[index] = currentplayer;
  cell.textContent = currentplayer;
}

function checkwinner() {
  let roundwon = false;

  for (let i = 0; i < wincondition.length; i++) {
    const [a, b, c] = wincondition[i];
    if (options[a] && options[a] === options[b] && options[b] === options[c]) {
      roundwon = true;
      break;
    }
  }

  if (roundwon) {
    showModal(`${currentplayer} WINS 🎉`);
    statustext.textContent = `${currentplayer} wins`;
    running = false;
  } else if (!options.includes("")) {
    showModal("It's a DRAW! 🤝");
    statustext.textContent = "It's a draw!";
    running = false;
  } else {
    changeplayer();
  }
}

function restartgame() {
  currentplayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statustext.textContent = `${currentplayer}'s turn`;
  cells.forEach(cell => (cell.textContent = ""));
  closeModal();
  running = true;
}

function changeplayer() {
  currentplayer = currentplayer === "X" ? "O" : "X";
  statustext.textContent = `${currentplayer}'s turn`;
}

function showModal(message) {
  modalText.textContent = message;
  winnerModal.classList.remove("hidden");
}

function closeModal() {
  winnerModal.classList.add("hidden");
}
