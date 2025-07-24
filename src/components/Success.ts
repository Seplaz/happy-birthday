import { ensureElement } from "../utils/utils";
import { Component } from "./base/component";
import type { EventEmitter } from "./base/events";

interface ISuccess {
  image: string;
  title: string;
  text: string;
};

export class Success extends Component<ISuccess> {
  protected _image: HTMLImageElement;
  protected _title: HTMLElement;
  protected _text: HTMLElement;
  protected _button: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);

    this._image = ensureElement<HTMLImageElement>('.success__description_image', this.container);
    this._title = ensureElement<HTMLElement>('.success__description_title', this.container);
    this._text = ensureElement<HTMLElement>('.success__description_text', this.container);
    this._button = ensureElement<HTMLButtonElement>('.success__finish_button', this.container);

    this._button.addEventListener('click', (event: Event) => {
      event.stopPropagation();
      event.preventDefault();
      
      events.emit('modal:close', {
        success: this
      });
    });
  };
};