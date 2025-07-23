import { type ICard, Colors } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import type { EventEmitter } from "./base/events";
import { gsap } from 'gsap';

export class Card extends Component<ICard> {
  protected _button: HTMLButtonElement;
  protected _id: number;
  protected _title: HTMLElement;
  protected _image?: HTMLImageElement;
  protected _text: HTMLElement;
  private _isExpanded = false;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._button = this.container as HTMLButtonElement;
    this._title = ensureElement<HTMLElement>('.card__title', this.container);
    this._text = ensureElement<HTMLElement>('.card__text', this.container);

    this._button.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      
      events.emit('card:click', {
        id: this._id,
        card: this
      });
    });
  };

  set title(value: string) {
    this.setText(this._title, value);

    if (value in Colors) {
      this.container.classList.add(Colors[value as keyof typeof Colors]);
    };
  };

  set text(value: string) {
    this.setText(this._text, value);
    this.setHidden(this._text);
  };

  toggleTextVisibility(): void {
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
      opacity: 0
    }, {
      opacity: 1,
      delay: 0.2,
      duration: 0.4,
      ease: 'power2.out'
    });
    
    this.setVisible(this._text);
  };
};