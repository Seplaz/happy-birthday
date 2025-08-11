import "./App.css";
import { useState } from "react";
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
                price={item.price}
                image={item.image}
                button={<Button />}
                index={index}
                handleButtonClick={handleCardButtonClick}
              />
            ) : (
              <Card
                key={index}
                title={item.title}
                text={item.text}
                price={""}
                image={item.image}
                button={null}
                index={index}
                handleButtonClick={handleCardButtonClick}
              />
            ),
          )}
          <div>
            <p className={"text"}>{"Выбрано подарков: " + count + " из 2"}</p>
            <p className={"text"}>{"* доступна рассрочка на 6 / 12 / 24 месяца."}</p>
          </div>
        </>
      )}
      {showModal && <Modal handleButtonClick={handleModalClose} />}
    </>
  );
}

export default App;
