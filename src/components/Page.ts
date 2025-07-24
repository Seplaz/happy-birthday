import { Component } from './base/component';
import { EventEmitter } from './base/events';
import { ensureElement } from '../utils/utils';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

interface IPage {
    catalog: HTMLElement[];
};

export class Page extends Component<IPage> {
    protected _intro: HTMLElement;
    protected _title: HTMLElement;
    protected _text: HTMLElement;
    protected _button: HTMLButtonElement;
    protected _catalog: HTMLElement;
    protected _wrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: EventEmitter) {
        super(container);

        this._intro = ensureElement<HTMLElement>('.intro', this.container);
        this._title = ensureElement<HTMLElement>('.intro__title', this.container);
        this._text = ensureElement<HTMLElement>('.intro__text', this.container);
        this._button = ensureElement<HTMLButtonElement>('.intro__button', this.container);
        this._catalog = ensureElement<HTMLElement>('.cards__catalog', this.container);
        this._wrapper = ensureElement<HTMLElement>('.app', this.container);

        this.setHidden(this._catalog);

        this._button.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            event.preventDefault();

            this.events.emit('button:click');
            this.setDisabled(this._button, true);
            this.setHidden(this._intro);
            this.setVisible(this._catalog);
            
            // gsap.from(this._catalog, {
            //     opacity: 0,
            //     y: 50,
            //     duration: 0.6,
            //     stagger: 0.05,
            //     ease: 'power1.out'
            // });
        });
    };

    set title(value: string) {
        this.setText(this._title, value);

        const split = new SplitText(this._title, { type: 'lines' });
        const words = split.lines;

        gsap.from(words, {
            opacity: 0,
            y: 50,
            duration: 0.6,
            stagger: 0.15,
            ease: 'power1.out'
        });
    }

    set text(value: string) {
        this.setText(this._text, value);

        const split = new SplitText(this._text, { type: 'words' });
        const words = split.words;

        gsap.from(words, {
            opacity: 0,
            delay: 0.3,
            y: 20,
            duration: 0.8,
            stagger: 0.10,
            ease: 'power2.out'
        });
    };

    set button(value: string) {
        this.setText(this._button, value);

        gsap.from(this._button, {
            opacity: 0,
            delay: 0.8,
            scale: 0.5,
            duration: 0.6,
            ease: 'power3.out'
        });
    };

    set catalog(items: HTMLElement[]) {
        this._catalog.replaceChildren(...items);
    };

    set locked(value: boolean) {
        if (value) {
            this._wrapper.classList.add('locked');
        } else {
            this._wrapper.classList.remove('locked');
        };
    };
};
