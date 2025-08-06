import "./App.css";
import { useState } from "react";
import { Card } from "../card/Сard";
import { Data } from "../../data/Data";
import { Intro } from "../intro/Intro";

function App() {
  const [showCards, setShowCards] = useState(false);

  const handleContinue = () => {
    setShowCards(true);
  };

  return (
    <>
      {!showCards ? (
        <Intro handleButtonClick={handleContinue} />
      ) : (
        Data.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            price={item.price}
            image={item.image}
            index={index}
          />
        ))
      )}
    </>
  );
}

export default App;
