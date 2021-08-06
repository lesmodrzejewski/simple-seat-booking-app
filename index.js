/** @format */

const container = document.getElementById('container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementsByClassName('count');
const price = document.getElementsByClassName('price');
const movieList = document.getElementById('movie-list');

populate();

let ticketPrice = parseInt(movieList.value);

function updateCountAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  console.log(seats);
  console.log(selectedSeats);

  const selectedSeatsIndex = [...selectedSeats].map(seat =>
    [...seats].indexOf(seat)
  );

  console.log(selectedSeatsIndex);

  localStorage.setItem(
    'selectedSeatsIndex',
    JSON.stringify(selectedSeatsIndex)
  );
  const selectedSeatsCount = selectedSeatsIndex.length;

  count.innerText = selectedSeatsCount;
  price.innerText = selectedSeatsCount * ticketPrice;
}

function populate() {
  const selectedSeatsIndex = JSON.parse(
    localStorage.getItem('selectedSeatsIndex')
  );

  if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeatsIndex.includes(index) === true) {
        seat.classList.add('selected');
      }
    });
  }
}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    console.log(e.target);
    e.target.classList.toggle('selected');
  }

  updateCountAndPrice();
});

updateCountAndPrice();
