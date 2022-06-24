import React, { useEffect } from 'react';
import { useState } from "react";

import "./assets/styles/App.css";

import criaTabuleiro from "./tabuleiro";
import randomPalavras from "./randomPalavras";

import {
  ControlPanel,
  Footer,
  Header,
  GamePanel,
  GameOverModal,
} from "./components";

let allPalavras = ["ISEC","SCRIPT", "VUE", "REACT", "HTML", "CSS"];
let count = 0;
function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [letras, setLetras] = useState([]);
  const [palavras, setPalavras] = useState([]);
  const [timer, setTimer] = useState(0);
  const [points,setPoints] = useState(0);
  const [popupIsOpen,setPopupIsOpen] = useState(false)
  const [novasPalavras,setNovasPalavras] = useState([]);

  
 

  function updatePoints(tam){
    let totalPoints = points;
    let menos = 10;
    totalPoints += (timer * tam) + menos;
    
    setPoints(totalPoints)
  }
  
  useEffect(() =>{
    for(let i=0;i<novasPalavras.length;i++){
      localStorage.setItem('palavras',novasPalavras[i]);
    }

  },[novasPalavras])

  /**
  * When the game starts
  */
  const handleGameStart = () => {
    if (gameStarted) {
      console.log("Termina Jogo");
      setGameStarted(false);
      setPopupIsOpen(true);
    } else {
      console.log("Inicia Jogo");
      setGameStarted(true);
      setPopupIsOpen(false);
      setPoints(0);
    }
  };


  //}
  /**
   * When the user selects a new level,
   * this callback function is executed
   */
  
  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);

    let numPalavras;
    let numOfLetras;
    
    switch (value) {
      case '1':
        numOfLetras = 8;//linhas*colunas
        numPalavras = 3;
        setTimer(60);
        break;
      case '2':
        numOfLetras = 10;
        numPalavras = 4;
        setTimer(70);
        break;
      case '3':
        numOfLetras = 12;
        numPalavras = 5;
        setTimer(75);
        break;
      default:
        numOfLetras = 0;
        numPalavras = 0;
        break;
    }

    if(count === 0){
      allPalavras.push(localStorage.getItem("palavras"))
    }
    count++;
    
    console.table( allPalavras)
    tiraNull(allPalavras)
    console.table( allPalavras)
    const palavras = randomPalavras(allPalavras, numPalavras);
    setPalavras(palavras);
    const letrasTab = criaTabuleiro(palavras, numOfLetras);
    setLetras(letrasTab);
  }

  //retirar o null que fica no array quando uma palavra armazenada é apagada
  function tiraNull(allPalavras){
    let tam = allPalavras.length;
      if(allPalavras[tam - 1] === null)
      {
        allPalavras.pop();
      }
  }
  

  

  return (
    <div id="container">
      <GameOverModal
          isOpen={popupIsOpen}
          setPopupIsOpen={setPopupIsOpen}
          points={points}
        />   
      <Header />
      <main className="main-content">
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          onLevelChange={handleLevelChange}
          timer = {timer}
          setGameStarted = {setGameStarted}
          setTimer = {setTimer}
          points={points}
          updatePoints={updatePoints}
          setPopupIsOpen={setPopupIsOpen}
          novasPalavras={novasPalavras}
          setNovasPalavras={setNovasPalavras}

        />
        <GamePanel
          gameStarted={gameStarted}
          palavras = {palavras}
          letras = {letras}
          selectedLevel={selectedLevel}
          setGameStarted={setGameStarted}
          updatePoints={updatePoints}
          popupIsOpen={popupIsOpen}
          setPopupIsOpen={setPopupIsOpen}
        />
        
      </main>
      <Footer />
    </div>
  );
}

export default App;
// Esta linha também poderia ser eliminada
// e adefinição da funsão ser substituida 
// export default function App() 
