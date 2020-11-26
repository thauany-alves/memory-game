const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    // o toggle tem efeito add e retirar a classe conforme o click
    //this.classList.toggle('flip'); 
    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMath();
    checkIfAllFlippedAndReset();
}  

function checkForMath(){
    if(firstCard.dataset.card === secondCard.dataset.card){
        disableCards();
        return;
    }

    unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function hehabilitateCards(){
    //firstCard.AddEventListener('click', flipCard);
    cards.forEach((card) => {
        card.classList.remove('flip')
        card.addEventListener('click', flipCard);
    })

    resetBoard();
}

function unflipCards(){
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    },1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false,false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

cards.forEach((card) => {
    card.addEventListener('click', flipCard);
});

let arrayCards = Array.from(cards);

function checkIfAllFlippedAndReset(){
    let flag = arrayCards.every((card) => {
        return card.classList.contains('flip')
    });
    
    if(flag){
        setTimeout(() => {
            
            cards.forEach((card) => {
                let ramdomPosition = Math.floor(Math.random() * 12);
                card.style.order = ramdomPosition;
            })
            
            hehabilitateCards();
            
        },1500);
        
    }
}
   

