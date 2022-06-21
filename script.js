const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secundCard;
let lockBoard = false;

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secundCard = this;
    hasFlippedCard = false;
    checkForMath();
}

function checkForMath() {
    if(firstCard.dataset.card === secundCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secundCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards () {
    lockBoard = true;
    setTimeout(() => {
       firstCard.classList.remove('flip');
       secundCard.classList.remove('flip');

       resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secundCard] = [null, null]
}

(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});

