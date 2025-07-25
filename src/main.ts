import './normalize.css';
import './style.css';

import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Card } from './components/Card';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { data } from './data/data';
import { Modal } from './components/Modal';
import { Success } from './components/Success';

gsap.registerPlugin(SplitText);
const events = new EventEmitter;
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

page.title = 'С Днём Рождения, Кристина!';
page.text = 'Чтобы посмотреть витрину подарков, нажми кнопку ниже.';
page.button = 'Посмотреть';

const cardTemplate = ensureElement<HTMLTemplateElement>('#card');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const success = new Success(cloneTemplate(successTemplate), events);

events.on('button:click', () => {
  const cardsArray = data.map((item, index) => {
    const card = new Card(cloneTemplate(cardTemplate), events);
    
    const renderedCards = card.render({
      title: item.title,
      text: item.text,
      image: item.image,
      price: item.price
    });

    gsap.from(renderedCards, {
      opacity: 0,
      delay: index,
      scale: 0.5,
      duration: 0.6,
      ease: 'power3.out'
    });

    return renderedCards;
  });

  page.render({ catalog: cardsArray});
});

events.on('card:open', (data: { card: Card }) => {
  const card = data.card;
  card.toggleExpand();
});

events.on('button:buy', () => {
  modal.render({
    content: success.render()
  });
});

events.on('button:close', () => {
  modal.close();
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});