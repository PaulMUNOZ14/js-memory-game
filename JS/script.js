const dimension = 150
const imgStart = Math.floor(Math.random() * 100) + 1
const images = []

let firstCard = null
let secondCard = null
let lockBoard = false
let moves = 0
let matchedCount = 0

for (let i = 0; i < 8; i++){
    const url = `https://picsum.photos/${dimension}?random=${imgStart + i}`;
    images.push(url);
}

let cards = [...images, ...images];

function shuffle(array){
    for (let i = array.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * i)
        let temp = array[i]
        array[i] = array[j]
        array[j] = temp
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

function initGame(){
    shuffle(cards);

    const gameBoard = document.querySelector('#game-board');

    cards.forEach(imgUrl => {
        const card = document.createElement('div');
        card.classList.add('card');

        card.dataset.value = imgUrl

        card.setAttribute('role', 'button')
        card.setAttribute('tabindex', '0')

        card.addEventListener('click', () => handleCardClick(card));

        gameBoard.appendChild(card);
    })
}

initGame()