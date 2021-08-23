/** @format */

const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.getElementById('container');
const seatsCount = document.getElementById('seats-count');
const totalPrice = document.getElementById('total-price');
const movie = document.getElementById('movie');
const resetButton = document.getElementById('reset-button');

showSelected();

// updates number of seats chosen and total price on the screen
// and stores selected seats index in the localStorage

function updateSeatsAndPrice() {
  const selectedSeats = document.querySelectorAll('.seat.selected');

  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem(
    'selectedSeatsIndex',
    JSON.stringify(selectedSeatsIndex)
  );

  const moviePrice = JSON.parse(localStorage.getItem('moviePrice'));

  const calculatedPrice = +moviePrice * selectedSeatsIndex.length;

  seatsCount.innerText = selectedSeatsIndex.length;
  totalPrice.innerText = calculatedPrice;
}

// shows selected seats after reloading

function showSelected() {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem('selectedSeatsIndex')
  );

  [...seats].map((seat, index) => {
    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
      if (selectedSeatsIndex.includes(index)) {
        seat.classList.add('selected');
      }
    }
  });
}

// stores movie title and movie price in localStorage
function storeMovieAndPrice(movieTitle, moviePrice) {
  localStorage.setItem('movieTitle', JSON.stringify(movieTitle));
  localStorage.setItem('moviePrice', JSON.stringify(moviePrice));
}

// select ot unselect clicking on seat + update

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updateSeatsAndPrice();
});

// store in localStorage movie title and movie price when changed + update

movie.addEventListener('change', e => {
  storeMovieAndPrice(e.target.selectedItem, e.target.value);
  updateSeatsAndPrice();
});

resetButton.addEventListener('click', e => {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem('selectedSeatsIndex')
  );

  [...seats].map((seat, index) => {
    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
      if (selectedSeatsIndex.includes(index)) {
        seat.classList.remove('selected');
      }
    }
  });
});

updateSeatsAndPrice();
