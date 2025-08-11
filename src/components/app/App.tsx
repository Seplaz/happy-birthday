import "./App.css";
import React, { useState } from "react";
import { Data } from "../../data/Data";
import { Intro } from "../intro/Intro";
import { Card } from "../card/Сard";
import { Button } from "../button/Button";
import { Modal } from "../modal/Modal";

function App() {
  const [showCards, setShowCards] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleCardButtonClick = () => {
    if (count >= 2) return;

    setCount((count) => count + 1);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      {!showCards ? (
        <Intro handleButtonClick={handleShowCards} />
      ) : (
        <>
          {Data.map((item, index) =>
            index > 0 ? (
              <Card
                key={index}
                title={item.title}
                text={item.text}
                description={count >= 2 ? "Подарки выбраны." : item.description}
                image={item.image}
                button={count >= 2 ? null : <Button />}
                index={index}
                handleButtonClick={handleCardButtonClick}
              />
            ) : (
              <React.Fragment key={index}>
                <Card
                  key={index}
                  title={item.title}
                  text={item.text}
                  description={
                    count >= 2 ? "Подарки выбраны." : "Выбери два подарка."
                  }
                  image={item.image}
                  button={null}
                  index={index}
                  handleButtonClick={handleCardButtonClick}
                />
                <p className={"text"}>
                  {"Выбрано подарков: " + count + " из 2"}
                </p>
              </React.Fragment>
            ),
          )}

          <div>
            <p className={"text"}>
              {"* доступна рассрочка на 6 / 12 / 24 месяца или бессрочно."}
            </p>
          </div>
        </>
      )}
      {showModal && <Modal handleButtonClick={handleModalClose} />}
    </>
  );
}

export default App;
