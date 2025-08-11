import styles from "./Intro.module.css";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { Button } from "../button/Button";
import { useRef, useLayoutEffect, forwardRef } from "react";

gsap.registerPlugin(SplitText);

type IntroProps = {
  handleButtonClick: () => void;
};

export const Intro = forwardRef<HTMLDivElement, IntroProps>(
  ({ handleButtonClick }, ref) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useLayoutEffect(() => {
      document.fonts.ready.then(() => {
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
      });

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
    }, []);

    return (
      <div ref={ref} className={styles.intro}>
        <h1 ref={titleRef} className={styles.title}>
          Привет, Кристина!
        </h1>
        <p ref={textRef} className={styles.text}>
          Нажми кнопку ниже, чтобы продолжить.
        </p>
        <Button
          ref={buttonRef}
          title={"Продолжить"}
          onClick={handleButtonClick}
        ></Button>
      </div>
    );
  },
);
