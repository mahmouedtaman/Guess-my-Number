"use strict";

let secretNumber = Math.trunc(Math.random() * 20) + 1; // its preferable to make the app store the number in code
let score = 20;
let highscore = 0;
let scoreprop = document.querySelector(".score"); // note we could make a document.querySelector(".score") directly instead of doing dry
// it must be that way else if we made document on left then scoreprop will be the one that stays and document will be reassigned

const displayMessage = function (message) {
  document.querySelector(".message").textContent = message;
}; // we made a const of a function the we call the function whenever we want the desplay message

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);

  // When there is no input
  if (!guess) {
    displayMessage("⛔️ No number!");

    // When player wins
  } else if (guess === secretNumber) {
    displayMessage("🎉 Correct Number!"); // we changed message parameter text content to "correct number"
    document.querySelector(".number").textContent = secretNumber; // we made ? the default from bottom and we made textcontent become secret number when ===

    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highscore) {
      highscore = score;
      document.querySelector(".highscore").textContent = highscore;
    }

    // When guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? "📈 Too high!" : "📉 Too low!");
      score--; // made a ternanry operator for bigger and smaller guess than secretNumber
      scoreprop.textContent = score;
    } else {
      displayMessage("💥 You lost the game!");
      scoreprop.textContent = 0;
    }
  }
});
// what happens when we press again
document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;

  displayMessage("Start guessing...");
  scoreprop.textContent = score;
  document.querySelector(".number").textContent = "?"; // we make number = ?
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".next-score").textContent = "🥇 Highest Score :";
  document.querySelector(".highscore").textContent = highscore;
});

const luf = {
  airline: `Luf`,
  iataCode: `LH`,
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight 
      ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

luf.book(239, `Mahmoued`);

const eurowings = {
  airline: `EgyptAir`,

  iataCode: `EW`,
  bookings: [],
};

const book = luf.book; // note we can use the func inside luf object but
//we cant call
//book(23, 'sarah)
//since it has this inside it and that turns
//it into a regular function where this is undefined

book.call(eurowings, 23, `Bassant`);
book.call(luf, 23, `Bassant2`);
console.log(eurowings);
console.log(luf);

const swiss = {
  airline: "Swiss Air Lines",
  iataCode: "LX",
  bookings: [],
};
book.call(swiss, 583, "Mary Cooper");
// Apply method
const flightData = [583, "George Cooper"];
book.apply(swiss, flightData);
console.log(swiss);
book.call(swiss, ...flightData);

// The bind Method

const bookEW = book.bind(eurowings);
const bookLH = book.bind(luf);
const bookSwiss = book.bind(swiss);
bookEW(23, `Bassant`);
bookLH(25, ` Mahmoud`);
bookSwiss(28, `Yousef`);

const bookEW2 = book.bind(eurowings, 111);
bookEW2(`mahmod`);
