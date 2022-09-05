'use strict';

// selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// setting initial values
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

// implementing functions
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
//rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    // 2.display the dice roll
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    // 3.check if rolled 1 switch to next player
    if (dice !== 1) {
      // save dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1.add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2.check if player score is at least 100 then
    if (scores[activePlayer] >= 21) {
      // finish the game
      playing = false;
      diceEl.classList.add('hidden');
      activePlayer =
        activePlayer === 0
          ? player0El.classList.add('player--winner')
          : player1El.classList.add('player--winner');

      player0El.classList.remove('active--player');
      player1El.classList.remove('active--player');
    }
    // switch player
    else {
      switchPlayer();
    }
  }
});

// resetting the game
btnNew.addEventListener('click', function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
});
