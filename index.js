/** @format */

const container = document.getElementById('container');
const count = document.getElementsByClassName('count');
const price = document.getElementsByClassName('price');
const movieList = document.getElementById('movie-list');

let ticketPrice = parseInt(movieList.value);
console.log(ticketPrice);

function updateCountAndPrice() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  localStorage.setItem('selectedSeats', selectedSeats);

  const selectedSeatsCount = selectedSeats.length;
  console.log(selectedSeatsCount);

  console.log(selectedSeats);

  count.innerText = selectedSeats;
  price.innerText = selectedSeatsCount * ticketPrice;
}

function populate() {}

container.addEventListener('click', e => {
  if (
    e.target.classList.contains('seat') &&
    !e.target.classList.contains('occupied')
  ) {
    console.log(e.target);
    e.target.classList.toggle('selected');
  }
});

updateCountAndPrice();
