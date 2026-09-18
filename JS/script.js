const dimension = 150
const imgStart = Math.floor(Math.random() * 100) + 1

const images = []

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