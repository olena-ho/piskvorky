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
};

// assigning eventListener to buttons in the 1st row

document
  .querySelector('button:nth-child(1)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(2)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(3)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(4)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(5)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(6)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(7)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(8)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(9)')
  .addEventListener('click', handleClick);

document
  .querySelector('button:nth-child(10)')
  .addEventListener('click', handleClick);

// preventing restart by accident

const restartIcon = document.querySelector('.icon--restart');

restartIcon.addEventListener('click', (event) => {
  const confirmRestart = confirm('Opravdu chcete restartovat hru?');
  if (confirmRestart === false) {
    event.preventDefault();
  }
});


//! don't review below this line - it's part of the solution for homework #4
/*
const cells = document.querySelectorAll('.cell');

cells.forEach((cell) => {
  cell.addEventListener('click', handleClick);
});
*/
