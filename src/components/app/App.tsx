import "./App.css";
import { useState } from "react";
import { Data } from "../../data/Data";
import { Intro } from "../intro/Intro";
import { Card } from "../card/Сard";
import { Modal } from "../modal/Modal";

function App() {
  const [showCards, setShowCards] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleShowCards = () => {
    setShowCards(true);
  };

  const handleModalShow = () => {
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
        Data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            price={item.price}
            image={item.image}
            index={index}
            handleButtonClick={handleModalShow}
          />
        ))
      )}
      {showModal && (<Modal handleButtonClick={handleModalClose} />)}
    </>
  );
}

export default App;
