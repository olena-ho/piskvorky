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

const handleClick = (event) => {
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

  const returnWinner = () => {
    const winner = findWinner(gameField);
    if (winner === 'o') {
      alert('Vyhrálo kolečko!');
      location.reload();
    } else if (winner === 'x') {
      alert('Vyhrál křížek!');
      location.reload();
    } else if (winner === 'tie') {
      alert('Hra skončila nerozhodně.');
    }
  };
  returnWinner();
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
