import styles from "./Сard.module.css";
import { Button } from "../button/Button";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

type CardProps = {
  title: string;
  image?: string;
  text: string;
  price: string;
  index: number;
};

export const Card = (props: CardProps) => {
  const { title, image, text, price, index } = props;
  const cardRef = useRef<HTMLDivElement>(null);
  const cardTitleRef = useRef<HTMLHeadingElement>(null);
  const cardImageRef = useRef<HTMLImageElement>(null);
  const cardContentRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLParagraphElement>(null);
  const contentPriceRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useLayoutEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        delay: index + 0.3,
        duration: 0.6,
        ease: "power3.out",
      });

      document.fonts.ready.then(() => {
        if (cardTitleRef.current) {
          const titleSplit = new SplitText(cardTitleRef.current, { type: 'words' });
          const titleWords = titleSplit.words;

          gsap.fromTo(titleWords, {
            opacity: 0,
            x: -10
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: index + 0.6,
            ease: 'power3.out'
          });
        };
      });

      gsap.fromTo(cardImageRef.current, {
        opacity: 0,
        scale: 0
      },
      {
        opacity: 1,
        scale: 1,
        delay: index + 1,
        ease: 'power3.out'
      });
    };
  }, [index]);

  const handleCardClick = () => {
    setIsExpanded(true);
  };

  useLayoutEffect(() => {
    if (cardContentRef.current && isExpanded) {
      gsap.fromTo(
        cardContentRef.current,
        {
          height: 0,
          opacity: 0,
        },
                 {
           height: "auto",
           opacity: 1,
           duration: 0.2,
           ease: "power1.out",
          onComplete: () => {
            if (cardRef.current) {
              cardRef.current.style.cursor = "default";
            }
          },
        }
      );

      gsap.fromTo(
        contentTextRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.2,
          duration: 0.4,
          ease: "power1.out",
        }
      );

      gsap.fromTo(
        contentPriceRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.4,
          duration: 0.4,
          ease: "power2.out",
        }
      );

      gsap.fromTo(
        buttonRef.current,
        {
          opacity: 0,
          y: -20,
        },
        {
          opacity: 1,
          y: 0,
          delay: 0.6,
          duration: 0.4,
          ease: "power3.out",
        }
      );
    }
  }, [isExpanded]);

  return (
    <div ref={cardRef} className={styles.card} onClick={handleCardClick}>
      <div className={styles.title_container}>
        <h2 ref={cardTitleRef} className={styles.title}>{title}</h2>
        <img ref={cardImageRef} className={styles.image} src={image} />
      </div>
      {isExpanded && (
        <div ref={cardContentRef} className={styles.content}>
          <p ref={contentTextRef} className={styles.text}>
            {text}
          </p>
          <div className={styles.price_container}>
            <p ref={contentPriceRef} className={styles.price}>
              {price}
            </p>
            <Button ref={buttonRef} title={"Забрать"}></Button>
          </div>
        </div>
      )}
    </div>
  );
};
