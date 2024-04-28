import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

const cells = document.querySelectorAll('.cell');

const player = document.getElementById('icon__player');
let currentPlayer = 'circle';

const addCross = (event) => {
  event.target.classList.add('cell__icon--cross');
  event.target.disabled = true;
};

const addCircle = (event) => {
  event.target.classList.add('cell__icon--circle');
  event.target.disabled = true;
};

const handleClick = async (event) => {
  if (currentPlayer === 'circle') {
    addCircle(event);
    currentPlayer = 'cross';
    player.src = './img/cross.svg';
    player.alt = 'křížek';
  } else {
    addCross(event);
    currentPlayer = 'circle';
    player.src = './img/circle.svg';
    player.alt = 'kolečko';
  }

  // creating the array with 'x', 'o' or '_' for the cells

  const gameField = Array.from(cells).map(item => {
    if (item.classList.contains("cell__icon--circle")) {
      return 'o';
    } else if (item.classList.contains("cell__icon--cross")) {
      return 'x';
    } else {
      return '_';
    }
  });

//applying the findWinner function
const winner = findWinner(gameField);
console.log(winner);

const announceWinner = () => {
  alert(`Vyhrál hrač se symbolem ${winner}!`);
  location.reload();
  };
    
if (winner === 'o' || winner === 'x') {
  setTimeout(announceWinner, 200);
  } else if (winner === 'tie') {
    setTimeout(() => {
      alert('Hra skončila nerozhodně.');
      location.reload();
    }, 200);
  } else {
    if (currentPlayer === "cross") {
      // bonus 5 - blocking cells before AI making its move
      cells.forEach((cell) => {
        cell.disabled = true;
      });
      // calling API
      const response = await fetch(
        "https://piskvorky.czechitas-podklady.cz/api/suggest-next-move",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            board: gameField,
            player: "x",
          }),
        }
      );

      const data = await response.json();
      const { x, y } = data.position;
      const index = cells[x + y * 10];

      // bonus 5 - unlocking unplayed cells for players after the AI made its move
      cells.forEach((cell) => {
        if (
          cell.classList.contains("cell__icon--circle") ||
          cell.classList.contains("cell__icon--cross")
        ) {
          cell.disabled = true;
        } else {
          cell.disabled = false;
        }
      });

      // AI making its move
      index.click();
    }
  }
};

// event listener added

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick);
});

// preventing restart by accident

const restartIcon = document.querySelector('.icon--restart');

restartIcon.addEventListener('click', (event) => {
  const confirmRestart = confirm('Opravdu chcete restartovat hru?');
  if (confirmRestart === false) {
    event.preventDefault();
  }
});
