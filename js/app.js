// Create a list that holds all of the cards.

const deck = Array.from(document.getElementsByClassName('card'));

let alreadySolvedDeck = Array.from(document.getElementsByClassName('match'));

document.getElementsByClassName('fa-repeat').item(0).addEventListener('click', () => {

    //Remove animation classes from cards and turn them over
    deck.forEach(element => element.classList.remove('open', 'show', 'match', 'infinite', 'bounce', 'animated'));

    //Empty the already solved cards from deck array
    alreadySolvedDeck = [];

    //Reset move counter
    document.getElementsByClassName('moves').item(0).innerHTML = 0;

    //Reshuffle deck and display
    setupNewDeckLayout(shuffle(deck));

    //Reset the stars
    while(document.querySelector('.stars').children.length < 3) {
        const newStar = starList.children.item(0).cloneNode(true);
        starList.appendChild(newStar);
    }
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
let moveCounter = document.getElementsByClassName('moves').item(0);

const updateMoveCounter = function () {
    moveCounter.innerHTML = Number(moveCounter.innerHTML) + 1;
};

const modal = document.getElementById('modal');

const closeButtonModal = document.getElementById('modal-close');

//A winning message alert function
let winningMessage = function () {
    modal.querySelector('#modal-text').innerHTML =
        `Congratulations! You win! You finished this in ${document.getElementsByClassName('moves').item(0).innerHTML} moves.
         Your score is ${document.querySelector('.stars').children.length} stars.`;
    modal.style.display = 'block';
};

//Close the model when clicking on X
let closeWinningMessage = function () {
    modal.style.display = 'none';
};

closeButtonModal.onclick = closeWinningMessage;

//Function to remove star from score
const starList = document.querySelector('.stars');

//Function to remove a star
const removeStar = () => {

    const starToRemove = starList.children.item(0);
    starList.removeChild(starToRemove);
}

//Add watcher for each card to do flip, turn over, match functions on click and to give winning message after all have matched.
let allCards = Array.from(document.getElementsByClassName('card'));
allCards.forEach(element => {

    element.addEventListener('click', function () {

        updateMoveCounter();
        if (Number(moveCounter.innerHTML) === 30) {
            removeStar();

        } else if (Number(moveCounter.innerHTML) === 40) {
            removeStar();
        };

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