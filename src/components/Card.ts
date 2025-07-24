import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import { EventEmitter } from "./base/events";
import { gsap } from 'gsap';

interface ICard {
  title: string;
  image: string;
  text: string;
  price: string;
};

export class Card extends Component<ICard> {
  protected _cardButton: HTMLButtonElement;
  protected _title: HTMLElement;
  protected _image: HTMLImageElement;
  protected _text: HTMLElement;
  protected _cardPriceContainer: HTMLElement;
  protected _price: HTMLElement;
  protected _buyButton: HTMLButtonElement;
  private _isExpanded = false;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._cardButton = this.container as HTMLButtonElement;
    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._image = ensureElement<HTMLImageElement>('.card__image', this.container);
    this._text = ensureElement<HTMLElement>('.card__text', this.container);
    this._cardPriceContainer = ensureElement<HTMLElement>('.card__price_container', this.container);
    this._price = ensureElement<HTMLElement>('.card__price', this.container);
    this._buyButton = ensureElement<HTMLButtonElement>('.card__price_button', this.container);

    this.setHidden(this._cardPriceContainer);
    this.setHidden(this._buyButton);

    this._cardButton.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      
      events.emit('card:open', {
        card: this
      });
    });

    this._buyButton.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      event.preventDefault();

      events.emit('modal:open');
    })
  };

  set title(value: string) {
    this.setText(this._title, value);
  };

  set image(value: string) {
    this.setImage(this._image, value);
  };

  set text(value: string) {
    this.setText(this._text, value);
    this.setHidden(this._text);
  };

  set price(value: string) {
    this.setText(this._price, value);
    this.setHidden(this._price);
  };

  toggleExpand(): void {
    if (this._isExpanded) return;

    gsap.fromTo(this.container, {
      height: 'auto'
    }, {
      height: 'auto',
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        this._isExpanded = true;
      }
    });

    gsap.fromTo(this._text, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,
      delay: 0.2,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.fromTo(this._price, {
      opacity: 0,
      y: -20,
    }, {
      opacity: 1,
      y: 0,
      delay: 0.4,
      duration: 0.4,
      ease: 'power3.out'
    });

    gsap.fromTo(this._buyButton, {
      opacity: 0,
      y: -20
    }, {
      opacity: 1,
      y: 0,
      delay: 0.6,
      duration: 0.4,
      ease: 'power3.out'
    });
    
    this.setVisible(this._text);
    this.setVisible(this._cardPriceContainer);
    this.setVisible(this._price);
    this.setVisible(this._buyButton);
  };
};