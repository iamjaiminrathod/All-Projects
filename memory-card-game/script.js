const cardsArray = ['🍎','🍌','🍒','🍇','🥝','🍍','🍑','🍉'];
let moves = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Duplicate cards for pairs
let cards = [...cardsArray, ...cardsArray];

// Shuffle cards
cards.sort(() => Math.random() - 0.5);

const gameBoard = document.getElementById('gameBoard');
const movesEl = document.getElementById('moves');

// Create card elements
cards.forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"></div>
            <div class="card-back">${symbol}</div>
        </div>
    `;
    card.addEventListener('click', () => flipCard(card));
    gameBoard.appendChild(card);
});

function flipCard(card){
    if(lockBoard || card.classList.contains('flipped')) return;

    card.classList.add('flipped');

    if(!firstCard){
        firstCard = card;
        return;
    }

    secondCard = card;
    moves++;
    movesEl.textContent = `Moves: ${moves}`;

    checkMatch();
}

function checkMatch(){
    const firstSymbol = firstCard.querySelector('.card-back').textContent;
    const secondSymbol = secondCard.querySelector('.card-back').textContent;

    if(firstSymbol === secondSymbol){
        firstCard = null;
        secondCard = null;
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard = null;
            secondCard = null;
            lockBoard = false;
        }, 1000);
    }
}
