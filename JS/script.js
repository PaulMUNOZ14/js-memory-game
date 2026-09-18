const dimension = 150
const imgStart = Math.floor(Math.random() * 100) + 1

const images = []

for (let i = 0; i < 8; i++){
    const url = `https://picsum.photos/${dimension}?random=${imgStart + i}`;
    images.push(url);
}

let cards = [...images, ...images];

console.log(images);
console.log(cards);