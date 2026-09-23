const dimension = 150
const imgStart = Math.floor(Math.random() * 100) + 1
const images = []
const timerDisplay = document.getElementById('timerDisplay');
const result = document.querySelector('#result');
const restartButton = document.querySelector('#restart');

let firstCard = null
let secondCard = null
let lockBoard = false
let moves = 0
let matchedCount = 0
let seconds = 0
let timerInterval = null

for (let i = 0; i < 8; i++){
    const url = `https://picsum.photos/${dimension}?random=${imgStart + i}`;
    images.push(url);
}

let cards = [...images, ...images];

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i)
        array[i], array[j] = array[j], array[i]
    }
}

function handleCardClick(card){
    if (lockBoard || card === firstCard || card.classList.contains('matched')){
        return
    }

    card.innerHTML = `<img src="${card.dataset.value}">`

    if (firstCard === null){
        firstCard = card
        return
    }

    secondCard = card
    lockBoard = true
    moves++

    checkMatch()
}

function checkMatch(){
    if (firstCard.dataset.value === secondCard.dataset.value){
        firstCard.classList.add('matched')
        secondCard.classList.add('matched')

        matchedCount += 2

        firstCard = null
        secondCard = null
        lockBoard = false

        checkVictory()
    } else {
        setTimeout(() => {
            firstCard.innerHTML = ''
            secondCard.innerHTML = ''

            firstCard = null
            secondCard = null
            lockBoard = false
        }, 800)
    }
}

function formatTime(sec){
    const mm = String(Math.floor(sec / 60)).padStart(2, '0')
    const ss = String(sec % 60).padStart(2, '0')

    return `${mm}:${ss}`
}

function startTimer(){
    timerInterval = setInterval(() => {
        seconds++;
        timerDisplay.textContent = formatTime(seconds)
    }, 1000)
}

function checkVictory(){
    if (matchedCount === cards.length){
        clearInterval(timerInterval)

        result.textContent = `Bravo ! Vous avez trouvé toutes les paires en ${formatTime(seconds)} avec ${moves} coups`

        restartButton.style.display = 'block'
    }
}

function initGame(){
    clearInterval(timerInterval)

    firstCard = null
    secondCard = null
    lockBoard = false
    moves = 0
    matchedCount = 0
    seconds = 0
    timerInterval = null

    shuffle(cards);

    const gameBoard = document.querySelector('#game-board');

    timerDisplay.textContent = '00:00'
    gameBoard.innerHTML = ''
    result.textContent = ''

    cards.forEach(imgUrl => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.dataset.value = imgUrl

        card.setAttribute('role', 'button')
        card.setAttribute('tabindex', '0')

        card.addEventListener('click', () => handleCardClick(card));

        gameBoard.appendChild(card);
    })

    startTimer()
}

restartButton.addEventListener('click', initGame)

initGame()