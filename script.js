document.addEventListener('DOMContentLoaded', function () {
    const AllCards = [
        {
          "Name": "AS",
          "Source": "assets/AS.png"
        },
        {
          "Name": "2S",
          "Source": "assets/2S.png"
        },
        {
          "Name": "3S",
          "Source": "assets/3S.png"
        },
        {
          "Name": "4S",
          "Source": "assets/4S.png"
        },
        {
          "Name": "5S",
          "Source": "assets/5S.png"
        },
        {
          "Name": "6S",
          "Source": "assets/6S.png"
        },
        {
          "Name": "7S",
          "Source": "assets/7S.png"
        },
        {
          "Name": "8S",
          "Source": "assets/8S.png"
        },
        {
          "Name": "9S",
          "Source": "assets/9S.png"
        },
        {
          "Name": "10S",
          "Source": "assets/10S.png"
        },
        {
          "Name": "JS",
          "Source": "assets/JS.png"
        },
        {
          "Name": "QS",
          "Source": "assets/QS.png"
        },
        {
          "Name": "KS",
          "Source": "assets/KS.png"
        },
        {
          "Name": "AC",
          "Source": "assets/AC.png"
        },
        {
          "Name": "2C",
          "Source": "assets/2C.png"
        },
        {
          "Name": "3C",
          "Source": "assets/3C.png"
        },
        {
          "Name": "4C",
          "Source": "assets/4C.png"
        },
        {
          "Name": "5C",
          "Source": "assets/5C.png"
        },
        {
          "Name": "6C",
          "Source": "assets/6C.png"
        },
        {
          "Name": "7C",
          "Source": "assets/7C.png"
        },
        {
          "Name": "8C",
          "Source": "assets/8C.png"
        },
        {
          "Name": "9C",
          "Source": "assets/9C.png"
        },
        {
          "Name": "10C",
          "Source": "assets/10C.png"
        },
        {
          "Name": "JC",
          "Source": "assets/JC.png"
        },
        {
          "Name": "QC",
          "Source": "assets/QC.png"
        },
        {
          "Name": "KC",
          "Source": "assets/KC.png"
        },
        {
          "Name": "AH",
          "Source": "assets/AH.png"
        },
        {
          "Name": "2H",
          "Source": "assets/2H.png"
        },
        {
          "Name": "3H",
          "Source": "assets/3H.png"
        },
        {
          "Name": "4H",
          "Source": "assets/4H.png"
        },
        {
          "Name": "5H",
          "Source": "assets/5H.png"
        },
        {
          "Name": "6H",
          "Source": "assets/6H.png"
        },
        {
          "Name": "7H",
          "Source": "assets/7H.png"
        },
        {
          "Name": "8H",
          "Source": "assets/8H.png"
        },
        {
          "Name": "9H",
          "Source": "assets/9H.png"
        },
        {
          "Name": "10H",
          "Source": "assets/10H.png"
        },
        {
          "Name": "JH",
          "Source": "assets/JH.png"
        },
        {
          "Name": "QH",
          "Source": "assets/QH.png"
        },
        {
          "Name": "KH",
          "Source": "assets/KH.png"
        },
        {
          "Name": "AD",
          "Source": "assets/AD.png"
        },
        {
          "Name": "2D",
          "Source": "assets/2D.png"
        },
        {
          "Name": "3D",
          "Source": "assets/3D.png"
        },
        {
          "Name": "4D",
          "Source": "assets/4D.png"
        },
        {
          "Name": "5D",
          "Source": "assets/5D.png"
        },
        {
          "Name": "6D",
          "Source": "assets/6D.png"
        },
        {
          "Name": "7D",
          "Source": "assets/7D.png"
        },
        {
          "Name": "8D",
          "Source": "assets/8D.png"
        },
        {
          "Name": "9D",
          "Source": "assets/9D.png"
        },
        {
          "Name": "10D",
          "Source": "assets/10D.png"
        },
        {
          "Name": "JD",
          "Source": "assets/JD.png"
        },
        {
          "Name": "QD",
          "Source": "assets/QD.png"
        },
        {
          "Name": "KD",
          "Source": "assets/KD.png"
        }
      ]

    console.log(AllCards.length);
    

    let GameDeck = [];
    let firstCard = null, secondCard = null;
    let lockBoard = false;
    let timerInterval;

    const GameBox = document.getElementById('game');
    const timerElement = document.getElementById('timer');
    const startGameBtn = document.getElementById('startGame');
    const difficultySelect = document.getElementById('difficulty');

    // Start game event
    startGameBtn.addEventListener('click', function () {
        const difficulty = difficultySelect.value;
        console.log(difficultySelect.value);
        let numPairs = 5; // default for easy

        if (difficulty === "Moderate") {
            numPairs = 10;
        } else if (difficulty === "Hard") {
            numPairs = 20;
        }
        
        if(numPairs==20){
        const gameBoard = document.getElementById('game');
        gameBoard.style.gridTemplateColumns = 'repeat(8, 120px)';
        gameBoard.style.width = '80%';
        }
        else{
            const gameBoard = document.getElementById('game');
            gameBoard.style.gridTemplateColumns = 'repeat(5, 120px)';
            gameBoard.style.width = '50%';
            }
        startGame(numPairs);
    });

    // Start the game
    function startGame(numPairs) {
        clearGameBoard();
        GameDeck = ShuffleCards(AllCards).slice(0, numPairs);
        GameDeck = GameDeck.flatMap(card => [card, card]);
        GameDeck = ShuffleCards(GameDeck);
        displayCards(GameDeck);
        startTimer();
    }

    // Shuffle cards
    function ShuffleCards(cards) {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    }

    // Display cards on the game board
    function displayCards(deck) {
        deck.forEach((card, i) => createCardElement(i, card));
    }

    // Create card elements dynamically
    function createCardElement(i, card) {
        const cardElement = document.createElement('div');
        cardElement.className = 'SingleCard';
        cardElement.dataset.name = card.Name;

        const front = document.createElement('img');
        front.className = 'MainCard';
        front.src = card.Source;

        const back = document.createElement('img');
        back.className = 'BackSide';
        back.src = 'assets/green_back.png';

        cardElement.appendChild(front);
        cardElement.appendChild(back);
        GameBox.appendChild(cardElement);

        cardElement.addEventListener('click', flipCard);
    }

    // Flip card with 3D effect
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

    // Check for a match between two flipped cards
    function checkMatch() {
        const isMatch = firstCard.dataset.name === secondCard.dataset.name;
        isMatch ? disableCards() : unflipCards();
    }

    // Disable cards if they match
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    // Unflip cards if they do not match
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }

    // Reset board state
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }

    // Clear game board for new game
    function clearGameBoard() {
        GameBox.innerHTML = '';
        resetTimer();
    }

    // Start the game timer
    function startTimer() {
        let seconds = 0;
        let minutes = 0;

        timerInterval = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                seconds = 0;
                minutes++;
            }

            const timeString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timerElement.textContent = `Time: ${timeString}`;
        }, 1000);
    }

    // Reset the timer when a new game is started
    function resetTimer() {
        clearInterval(timerInterval);
        timerElement.textContent = 'Time: 00:00';
    }


    
});
