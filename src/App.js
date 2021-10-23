import React from "react";
import "./App.css"
import Header from "./components/Header";
import Hangie from "./components/Hangie";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import { useState, useEffect } from "react";

const words = ['edin', 'edna', 'maja', 'marko']
let selectedWord = words[Math.floor(Math.random() * words.length)]







function App() {
  
  
  
  const [playable, setPlayable] = useState(true)
   const [correctLetters, setCorrectLetters] = useState([])
   const [wrongLetters, setWrongLetters] = useState([])

 useEffect (() => {
const handleKeyDown = event => {
  const {key, keyCode} = event;
  if ( playable && keyCode >= 65 && keyCode <= 90) {
    const letter = key.toLowerCase();
  
if (selectedWord.includes(letter)) {
  if (!correctLetters.includes(letter)) {
    setCorrectLetters(currentLeters => [...currentLeters, letter]);
  } else {
    // showNotification()
  } 
} else {
    if (!wrongLetters.includes(letter)) {
      setWrongLetters(currentLeters => [...currentLeters, letter])
    } else {
      // showNotification()
    }
  }
}


}
window.addEventListener('keydown', handleKeyDown);

return () => window.removeEventListener('keydown', handleKeyDown);

 }, [correctLetters, wrongLetters, playable]);






  return (
    <>
      <Header />
      <div className="game-container">
        <Hangie wrongLetters={wrongLetters}  />
        <WrongLetters wrongLetters={wrongLetters}/>
        <Word selectedWord={selectedWord} correctLetters={correctLetters} />
      </div>

    </>

  );
}

export default App;
