let phrases = [
  { text: 'Какашка', image: 'https://em-content.zobj.net/source/apple/391/pile-of-poo_1f4a9.png' },
  { text: 'Секси', image: 'https://em-content.zobj.net/source/apple/391/smiling-face-with-horns_1f608.png' },
  { text: 'Милашка', image: 'https://em-content.zobj.net/source/apple/391/smiling-face-with-halo_1f607.png' },
  { text: 'Алкашка', image: 'https://em-content.zobj.net/source/apple/391/clinking-beer-mugs_1f37b.png' },
  { text: 'Красотка', image: 'https://em-content.zobj.net/source/apple/391/smiling-face-with-heart-eyes_1f60d.png' },
  { text: 'Всё, пока!', image: 'https://em-content.zobj.net/source/apple/391/waving-hand_1f44b.png' }
];

let phrase = document.querySelector('.phrase');
let image = document.querySelector('.image');

for (let i = 0; i <= 5; i = i + 1) {
  smoothly(phrase, 'textContent', phrases[i].text);
  smoothly(image, 'src', phrases[i].image);
};