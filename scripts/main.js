let phrases = [
  { text: 'Какашка', image: 'images/kakashka.png' },
  { text: 'Арбузерша', image: 'images/arbuzersha.png' },
  { text: 'Милашка', image: 'images/milashka.png' },
  { text: 'Алкашка', image: 'images/beer.png' },
  { text: 'Красотка', image: 'images/krasotka.png' },
  { text: 'Всё, пока!', image: 'images/poka.png' }
];

let phrase = document.querySelector('.phrase');
let image = document.querySelector('.image');

for (let i = 0; i <= 5; i = i + 1) {
  smoothly(phrase, 'textContent', phrases[i].text);
  smoothly(image, 'src', phrases[i].image);
};