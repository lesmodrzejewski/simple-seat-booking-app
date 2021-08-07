/** @format */

const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const container = document.getElementById('container');
const seatsCount = document.getElementById('seatsCount');
const totalPrice = document.getElementById('totalPrice');
const movie = document.getElementById('movie');

showSelected();

function updateSeatsAndPrice() {
  const selectedSeats = document.querySelectorAll('.seat.selected');
  // console.log(selectedSeats);

  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem(
    'selectedSeatsIndex',
    JSON.stringify(selectedSeatsIndex)
  );

  const movieP = JSON.parse(localStorage.getItem('moviePrice'));

  const calculatedPrice = +movieP * selectedSeatsIndex.length;

  seatsCount.innerText = selectedSeatsIndex.length;
  totalPrice.innerText = calculatedPrice;
}

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

function storeMovieAndPrice(movieTitle, moviePrice) {
  localStorage.setItem('movieTitle', JSON.stringify(movieTitle));
  localStorage.setItem('moviePrice', JSON.stringify(moviePrice));
}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    e.target.classList.toggle('selected');
  }

  updateSeatsAndPrice();
});

movie.addEventListener('change', e => {
  storeMovieAndPrice(e.target.selectedItem, e.target.value);
  updateSeatsAndPrice();
});

updateSeatsAndPrice();
