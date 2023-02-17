"use strict";

const gameGrid = document.querySelector(".main__grid");
const gridItem = document.querySelector(".main__grid-item");
const resultDisplay = document.querySelector(".result");
const restartBtn = document.querySelector(".btn--restart");

const cardArray = [
  { name: "fries", img: "images/fries.jpg" },
  { name: "cheeseburger", img: "images/cheeseburger.jpg" },
  { name: "hotdog", img: "images/hotdog.jpg" },
  { name: "icecream", img: "images/icecream.jpg" },
  { name: "milkshake", img: "images/milkshake.jpg" },
  { name: "pizza", img: "images/pizza.jpg" },
  { name: "fries", img: "images/fries.jpg" },
  { name: "cheeseburger", img: "images/cheeseburger.jpg" },
  { name: "hotdog", img: "images/hotdog.jpg" },
  { name: "icecream", img: "images/icecream.jpg" },
  { name: "milkshake", img: "images/milkshake.jpg" },
  { name: "pizza", img: "images/pizza.jpg" },
];

let cardsClicked, cardsClickedIds, cardCorrect;

const checkMatch = function () {
  const cards = document.querySelectorAll(".main__grid-item");
  const optionOneId = cardsClickedIds[0];
  const optionTwoId = cardsClickedIds[1];

  if (optionOneId === optionTwoId) {
    cards[optionOneId].setAttribute("src", "images/blank.jpg");
    cards[optionTwoId].setAttribute("src", "images/blank.jpg");

    cards[optionOneId].classList.remove("border-black-chosen");
    cards[optionTwoId].classList.remove("border-black-chosen");

    alert("You chose the same box!");
  } else if (cardsClicked.at(0) === cardsClicked.at(1)) {
    cards[optionOneId].setAttribute("src", "images/white.jpg");
    cards[optionTwoId].setAttribute("src", "images/white.jpg");
    cards[optionOneId].removeEventListener("click", flipCard);
    cards[optionTwoId].removeEventListener("click", flipCard);

    cardCorrect.push(cardsClicked);

    resultDisplay.innerHTML = cardCorrect.length;

    alert("You got one!");
  } else {
    cards[optionOneId].setAttribute("src", "images/blank.jpg");
    cards[optionTwoId].setAttribute("src", "images/blank.jpg");

    cards[optionOneId].classList.remove("border-black-chosen");
    cards[optionTwoId].classList.remove("border-black-chosen");

    alert("Try again!");
  }

  cardsClicked.splice(0);
  cardsClickedIds.splice(0);

  if (cardCorrect.length === cardArray.length / 2) {
    resultDisplay.innerHTML = "Congrats you found them all!";
  }
};

const flipCard = function () {
  const cardId = this.dataset.id;
  cardsClicked.push(cardArray.at(cardId).name);
  cardsClickedIds.push(cardId);
  console.log(cardsClicked);
  console.log(cardsClickedIds);
  this.setAttribute("src", cardArray.at(cardId).img);
  this.classList.add("border-black-chosen");
  if (cardsClicked.length === 2) {
    setTimeout(checkMatch, 500);
  }
};

const createBoard = function () {
  cardArray.forEach(function (cardE, i) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/blank.jpg");
    card.setAttribute("data-id", i);
    card.classList.add("main__grid-item");
    card.addEventListener("click", flipCard);
    gameGrid.appendChild(card);
  });
};

const init = function () {
  cardsClicked = [];
  cardsClickedIds = [];
  cardCorrect = [];

  cardArray.sort(function () {
    return 0.5 - Math.random();
  });

  createBoard();
};

init();

restartBtn.addEventListener("click", function () {
  resultDisplay.innerHTML = 0;
  gameGrid.innerHTML = "";
  init();
});
