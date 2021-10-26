import React from "react";
import "./App.css";
import Header from "./components/Header";
import Hangie from "./components/Hangie";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import { useState, useEffect } from "react";
import { showNotification as show } from "./helpers/Helpers";
import Popup from "./components/Popup";
import Notifications from "./components/Notifications";
import axios from "axios";


function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  const getWord = () => {
    axios.get("https://random-words-api.vercel.app/word").then((response) => {
      setSelectedWord(response.data[0].word.toLowerCase());
    });
  };

  useEffect(() => {
    getWord();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();

        if (selectedWord.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLeters) => [...currentLeters, letter]);
          } else {
            show(setShowNotification);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLeters) => [...currentLeters, letter]);
          } else {
            show(setShowNotification);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    setCorrectLetters([]);
    setWrongLetters([]);

    getWord();
  }

  return (
    <>
      <Header />
      <div className="game-container">
        <Hangie wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>
      <Popup
        correctLetters={correctLetters}
        wrongLetters={wrongLetters}
        selectedWord={selectedWord}
        setPlayable={setPlayable}
        playAgain={playAgain}
      />
      <Notifications showNotification={showNotification} />
    </>
  );
}

export default App;
