import React, {useState,useForm, useEffect} from "react";
import "./control-panel.css";

let timerId = undefined;
function ControlPanel(props) {
  const { gameStarted, selectedLevel, onGameStart, onLevelChange, timer ,setTimer,setGameStarted,setSelectedLevel,points,updatePoints,setPopupIsOpen,novasPalavras,setNovasPalavras} =
    props;
  const gameStartedClass = gameStarted ? " gameStarted" : "";
  const [novaPalavra,setNovaPalavra] = useState([])
  let Palavra;
  useEffect(() => { 
    if (gameStarted) { 
      timerId = setInterval(() => { 
        setTimer(timer-1); 

        let nextTimer = timer - 1; 
        if (nextTimer === 0) { 
          setGameStarted(false); 
          setPopupIsOpen(true);
        } 
      }, 1000); 
    }else if(timer !== 60 && selectedLevel === '1'){ 
      setTimer(60); 
    }else if(timer !== 70 && selectedLevel === '2'){
      setTimer(70); 
    }else if(timer !== 75 && selectedLevel === '3'){
      setTimer(75); 
    }
    return () => { 
      if (timerId) { 
        clearInterval(timerId); 
      } 
    }; 
  }, [gameStarted, timer]);

  
  function getPalavra(val){
    setNovaPalavra(val.target.value);
    console.log(val.target.value);
  } 


  return (
    <section id="panel-control">
      <h3 className="sr-only">Escolha do Nível</h3>
      <form className="form">
        <fieldset className="form-group">
          <label htmlFor="btLevel">Nível:</label>
          <select
            id="btLevel"
            defaultValue="0"
            onChange={onLevelChange} 
            disabled={gameStarted}
          >
            <option value="0">Seleccione...</option>
            <option value="1">Fácil (8x8)</option>
            <option value="2">Médio (10x10)</option>
            <option value="3">Difícil (12x12)</option>
          </select>
          <div className="adiciona">
            <button className="btnNovaPalavra" type="button" disabled={gameStarted} onClick={ () => {
              Palavra = novaPalavra.toUpperCase();
              console.log("ss->"+novaPalavra)
              if(novaPalavra.length > 2){
                setNovasPalavras(novasPalavras.concat(...[Palavra]));
              }
              
            }}>
              Adicionar
            </button>
            <input className="input" onChange={getPalavra} type="text" size="10" minLength="3" maxLength="8" placeholder="Adicionar palavra" >
            
            </input>
          </div>
        </fieldset>
        <button
          type="button"
          id="btPlay"
          disabled={selectedLevel === "0"}
          onClick={onGameStart}
        >
          {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
        </button>
      </form>
      <div className="form-metadata">
        <p id="message" role="alert" className="hide">
          Clique em Iniciar o Jogo!
        </p>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Tempo de Jogo:</dt>
          <dd id="gameTime">{timer}</dd>
        </dl>
        <dl className={`list-item left${gameStartedClass}`}>
          <dt>Pontuação:</dt>
          <dd id="points">{points}</dd>
        </dl>
      </div>
    </section>
  );
}

export default ControlPanel;
