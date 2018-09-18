// Create a list that holds all of the cards.

const deck = Array.from(document.getElementsByClassName('card'));

let alreadySolvedDeck = Array.from(document.getElementsByClassName('match'));

document.getElementsByClassName('fa-repeat').item(0).addEventListener('click', () => {

    deck.forEach(element => element.classList.remove('open', 'show', 'match', 'infinite', 'bounce', 'animated'));
    alreadySolvedDeck = [];
    document.getElementsByClassName('moves').item(0).innerHTML = 0;

});


//Shuffle function for the deck.
function shuffle(array) {

    //Create a new array instance to avoid modifying the initial array and possible side effects.

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

    array.forEach(function (element) {
        deckHTML.appendChild(element);
    })
};

setupNewDeckLayout(shuffledDeck);

//Create flip function for cards
const flipCard = function (element) {
    element.classList.add('open', 'show');
};

//Create turn over functionality for cards
const turnCard = function (element1, element2) {
    element1.classList.remove('open', 'show');
    element2.classList.remove('open', 'show');
};

//Create match functionality for cards
const match = function (element1, element2) {
    element1.classList.add('match', 'bounce', 'animated');
    element2.classList.add('match', 'bounce', 'animated');
    alreadySolvedDeck.push(element1, element2);
}

let openCards = [];

const winningMessageTimer = new Timer();
const delayWinningMessageTime = 1;

//Updates the move counter
const updateMoveCounter = function () {
    document.getElementsByClassName('moves').item(0).innerHTML = Number(document.getElementsByClassName('moves').item(0).innerHTML) + 1;
};

//A winning message alert function
let winningMessage = function () {
    window.alert(`Congratulations! You win! Your final score was: ${document.getElementsByClassName('moves').item(0).innerHTML}!`);
};

//Add watcher for each card to do flip, turn over, match functions on click and to give winning message after all have matched.
let allCards = Array.from(document.getElementsByClassName('card'));
allCards.forEach(element => {

    element.addEventListener('click', function () {

        updateMoveCounter();

        flipCard(element);
        openCards.push(element);

        if (openCards.length === 2) {
            if (openCards[0].children.item(0).classList.toString() === openCards[1].children.item(0).classList.toString()) {
                match(openCards[0], openCards[1]);
                if (deck.length === alreadySolvedDeck.length) {
                    winningMessageTimer.start(delayWinningMessageTime).on('end', winningMessage);
                    deck.forEach(element => element.classList.add('infinite'));
                };
                openCards = [];

            }
        } else if (openCards.length === 3) {
            turnCard(openCards[0], openCards[1]);
            openCards.splice(0, 2);
        };


    });
});