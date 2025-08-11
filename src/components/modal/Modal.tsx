import styles from "./Modal.module.css";
import { Button } from "../button/Button";
import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";

type ModalProps = {
  handleButtonClick: () => void;
};

export const Modal = ({ handleButtonClick }: ModalProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (imageRef.current) {
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0,
      });
      gsap.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        delay: 0.3,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
      });
      gsap.to(buttonRef.current, {
        opacity: 1,
        delay: 1,
        scale: 1,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    if (titleRef.current && textRef.current) {
      const titleSplit = new SplitText(titleRef.current, { type: "lines" });
      const titleLines = titleSplit.lines;

      gsap.set(titleLines, {
        opacity: 0,
        y: 50,
      });

      gsap.to(titleLines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "power1.out",
      });

      const textSplit = new SplitText(textRef.current, { type: "lines" });
      const textLines = textSplit.lines;

      gsap.set(textLines, {
        opacity: 0,
        y: 50,
      });

      gsap.to(textLines, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.4,
        ease: "power2.out",
      });
    }
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <img ref={imageRef} className={styles.image} src={import.meta.env.BASE_URL + '/success.webp'} />
        <div className={styles.description}>
          <h2 className={styles.title}>Поздравляю!</h2>
          <p className={styles.text}>Подарок успешно выбран.</p>
        </div>
        <div ref={buttonRef}>
          <Button title={"Спасибо!"} onClick={handleButtonClick}></Button>
        </div>
      </div>
    </div>
  );
};
