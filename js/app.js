
// Created a list that holds all of the cards.
 
const deck = Array.from(document.getElementsByClassName('card'));

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Shuffle function for the deck.
function shuffle(array) {

    //Created new array instance to avoid modifying the initial array and possible side effects.

    var newArray = array.concat();
    var currentIndex = newArray.length, 
        temporaryValue, 
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = newArray[currentIndex];
        newArray[currentIndex] = newArray[randomIndex];
        newArray[randomIndex] = temporaryValue;
    }

    return newArray;
}

//Create a shuffled desk to later use.
let shuffledDeck = shuffle(deck);

//Store HTML from Ul "deck" in variable.
let deckHTML = document.getElementsByClassName('deck').item(0);

//Populate function to remove current HTML in Ul "deck" and replace it with new shuffled HTML.
function setupNewDeckLayout(array) {

    deckHTML.innerHTML = ' ';

    array.forEach(function(element) {
        deckHTML.appendChild(element);
    })
};

setupNewDeckLayout(shuffledDeck);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

const flipCard = function(element) {
    element.classList.add('open', 'show');
};

const turnCard = function(element1, element2) {
    element1.classList.remove('open', 'show');
    element2.classList.remove('open', 'show');
};

const match = function(element1, element2) {
    element1.classList.add('match');
    element2.classList.add('match');
}

let openCards = [];

const delayMatch = 100;

const delayTurnOver = 1000;

let allCards = Array.from(document.getElementsByClassName('card'));
allCards.forEach(function(element) {

    element.addEventListener('click', function(){

    flipCard(element);
    openCards.push(element);

        if (openCards.length === 2) {
            if (openCards[0].children.item(0).classList.toString() === openCards[1].children.item(0).classList.toString()) {
                match(openCards[0], openCards[1]);
                openCards = [];

            }
        } else if (openCards.length === 3) {
            turnCard(openCards[0], openCards[1]);
            openCards.splice(0, 2);
        };
    });
});