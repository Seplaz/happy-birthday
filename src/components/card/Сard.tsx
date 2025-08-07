import styles from "./Сard.module.css";
import { Button } from "../button/Button";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

type CardProps = {
  title: string;
  image?: string;
  text: string;
  price: string;
  index: number;
};

export const Card = ({ title, image, text, price, index }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentTextRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: index * 0.2 });

      tl.from(cardRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.out",
      });

      tl.from(
        imageRef.current,
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "<+=0.2"
      );
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  useLayoutEffect(() => {
    if (!isExpanded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        contentRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        }
      );

      tl.from(
        [contentTextRef.current, priceRef.current, buttonRef.current],
        {
          opacity: 0,
          y: -20,
          stagger: 0.1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1"
      );
    }, cardRef);

    return () => ctx.revert();
  }, [isExpanded]);

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  return (
    <div
      ref={cardRef}
      className={styles.card}
      onClick={handleCardClick}
      style={{ cursor: isExpanded ? "default" : "pointer" }}
    >
      <div className={styles.title_container}>
        <h2 ref={titleRef} className={styles.title}>
          {title}
        </h2>
        <img
          ref={imageRef}
          className={styles.image}
          src={import.meta.env.BASE_URL + image}
        />
      </div>

      {isExpanded && (
        <div ref={contentRef} className={styles.content}>
          <p ref={contentTextRef} className={styles.text}>
            {text}
          </p>
          <div className={styles.price_container}>
            <p ref={priceRef} className={styles.price}>
              {price}
            </p>
            <Button ref={buttonRef} title="Забрать" />
          </div>
        </div>
      )}
    </div>
  );
};
