document.addEventListener('DOMContentLoaded', function () {
    const AllCards = [
        { "Name": "AS", "Source": "assets/AS.png" }, { "Name": "2S", "Source": "assets/2S.png" }, 
        { "Name": "3S", "Source": "assets/3S.png" }, { "Name": "4S", "Source": "assets/4S.png" }, 
        { "Name": "5S", "Source": "assets/5S.png" }, { "Name": "6S", "Source": "assets/6S.png" }, 
        { "Name": "7S", "Source": "assets/7S.png" }, { "Name": "8S", "Source": "assets/8S.png" }, 
        { "Name": "9S", "Source": "assets/9S.png" }, { "Name": "10S", "Source": "assets/10S.png" },
        { "Name": "JS", "Source": "assets/JS.png" }, { "Name": "QS", "Source": "assets/QS.png" }, 
        { "Name": "KS", "Source": "assets/KS.png" }, { "Name": "AC", "Source": "assets/AC.png" }, 
        { "Name": "2C", "Source": "assets/2C.png" }, { "Name": "3C", "Source": "assets/3C.png" }, 
        { "Name": "4C", "Source": "assets/4C.png" }, { "Name": "5C", "Source": "assets/5C.png" }
    ];
    
    const Shuffled = ShuffleCards(AllCards).slice(0, 9);
    let GameDeck = Shuffled.flatMap(value => [value, value]);
    GameDeck = ShuffleCards(GameDeck);

    const GameBox = document.getElementById('game');
    let firstCard = null, secondCard = null;
    let lockBoard = false;

    function ShuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    function DisplayFunction() {
        for (let i = 0; i < GameDeck.length; i++) {
            createCardElement(i);
        }
    }

    function createCardElement(i) {
        const card = document.createElement('div');
        card.className = 'SingleCard';
        card.dataset.name = GameDeck[i].Name;

        const front = document.createElement('img');
        front.className = 'MainCard';
        front.src = GameDeck[i].Source;

        const back = document.createElement('img');
        back.className = 'BackSide';
        back.src = 'assets/yellow_back.png';

        card.appendChild(front);
        card.appendChild(back);

        GameBox.appendChild(card);

        card.addEventListener('click', flipCard);
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        checkMatch();
    }

    function checkMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;

        isMatch ? disableCards() : unflipCards();
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    DisplayFunction();
});
