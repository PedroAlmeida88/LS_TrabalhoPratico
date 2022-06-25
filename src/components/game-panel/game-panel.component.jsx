import React, { useState, useSyncExternalStore } from "react";
import "./game-panel.css";
import {Letra} from "../index"
import {GameOverModal} from "../index"

let letrasDois = [];

let class1;
let classFound = false;
function GamePanel({ selectedLevel, letras, palavras,gameStarted,setGameStarted,updatePoints,popupIsOpen,setPopupIsOpen}) {
  const [letraSelecionadas,setLetraSelecionadas] = useState([]);

  const gameClass =
    selectedLevel === "1"
      ? ""
      : selectedLevel === "2"
      ? "intermedio"
      : "avancado";


    if(!gameStarted){
      class1=" hide"
      //selectedLevel = '0'
    }else{
      class1=""
    }


    const handleClickLetra= (letra) => {
      if(gameStarted)
        setLetraSelecionadas([...letraSelecionadas, letra]);
        console.log("siuuu");
    }





    function verificaLetras(index) {
      let pal = false
      letrasDois.push(letras[index]);
      letrasDois[0].clicked = true;
  
  
      
      if(letrasDois.length === 2){
        letrasDois[1].clicked = true;
        //linha
        if(letrasDois[0].posLin === letrasDois[1].posLin && letrasDois[0].posCol !== letrasDois[1].posCol){
          let tam = Math.abs(letrasDois[0].posCol - letrasDois[1].posCol) + 1;
          for(let i = 0; i < palavras.length; i++){
            if(tam === palavras[i].palavra.length){
                if(letrasDois[0].letra === palavras[i].palavra.charAt(0) && letrasDois[1].letra === palavras[i].palavra.charAt(tam - 1) ||
                   letrasDois[1].letra === palavras[i].palavra.charAt(0) && letrasDois[0].letra === palavras[i].palavra.charAt(tam - 1)){
                  console.log(palavras[i].palavra);
                  pal = true
                  palavras[i].encontrado = true;
                  updatePoints(tam);
                  //pintar espaços no meio
                  if(letrasDois[0].posCol < letrasDois[1].posCol){
                    for(let l = 0; l < tam; l++){  
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posCol === letrasDois[0].posCol + l && letras[j].posLin === letrasDois[0].posLin){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
                  if(letrasDois[1].posCol < letrasDois[0].posCol){
                    for(let l = 0; l < tam; l++){  
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posCol === letrasDois[1].posCol + l && letras[j].posLin === letrasDois[1].posLin){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
                }
            }
          }
        }
        
        //coluna
        if(letrasDois[0].posCol === letrasDois[1].posCol && letrasDois[0].posLin !== letrasDois[1].posLin){
          let tam = Math.abs(letrasDois[0].posLin - letrasDois[1].posLin) + 1;
          for(let i = 0; i < palavras.length; i++){
            if(tam === palavras[i].palavra.length){
              if(letrasDois[0].letra === palavras[i].palavra.charAt(0) && letrasDois[1].letra === palavras[i].palavra.charAt(tam - 1) ||
                 letrasDois[1].letra === palavras[i].palavra.charAt(0) && letrasDois[0].letra === palavras[i].palavra.charAt(tam - 1)){
                console.log(palavras[i].palavra);
                pal = true
                palavras[i].encontrado = true;
                updatePoints(tam);
                if(letrasDois[0].posLin < letrasDois[1].posLin){
                  for(let l = 0; l < tam; l++){  
                    for(let j = 0; j < letras.length; j++){
                      if(letras[j].posLin === letrasDois[0].posLin + l && letras[j].posCol === letrasDois[0].posCol){
                        letras[j].clicked = true;
                      }
                    }
                  }
                }
                if(letrasDois[1].posLin < letrasDois[0].posLin){
                  for(let l = 0; l < tam; l++){  
                    for(let j = 0; j < letras.length; j++){
                      if(letras[j].posLin === letrasDois[1].posLin + l && letras[j].posCol === letrasDois[1].posCol){
                        letras[j].clicked = true;
                      }
                    }
                  }
                }
              }
            }
          }
        }
  
        //diagonais
        if(letrasDois[0].posCol !== letrasDois[1].posCol && letrasDois[0].posLin !== letrasDois[1].posLin){
          let tamLin = Math.abs(letrasDois[0].posLin - letrasDois[1].posLin) + 1;
          let tamCol = Math.abs(letrasDois[0].posCol - letrasDois[1].posCol) + 1;
          if(tamCol === tamLin){
            for(let i = 0; i < palavras.length; i++){
              if(tamCol === palavras[i].palavra.length){
                if(letrasDois[0].letra === palavras[i].palavra.charAt(0) && letrasDois[1].letra === palavras[i].palavra.charAt(tamCol - 1) ||
                   letrasDois[1].letra === palavras[i].palavra.charAt(0) && letrasDois[0].letra === palavras[i].palavra.charAt(tamCol - 1)){
                  console.log(palavras[i].palavra);
                  pal = true
                  palavras[i].encontrado = true;
                  updatePoints(tamCol);

                  //Diagonal1 
                  if(letrasDois[0].posLin < letrasDois[1].posLin && letrasDois[0].posCol < letrasDois[1].posCol){
                    for(let l = 0; l < tamCol; l++){  
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posLin === letrasDois[0].posLin + l && letras[j].posCol === letrasDois[0].posCol + l){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
                  //Diagonal1 - invertida
                  if(letrasDois[1].posLin < letrasDois[0].posLin && letrasDois[1].posCol < letrasDois[0].posCol){
                    for(let l = 0; l < tamCol; l++){  
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posLin === letrasDois[1].posLin + l && letras[j].posCol === letrasDois[1].posCol + l){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
                  //Diagonal2
                  if(letrasDois[0].posLin < letrasDois[1].posLin && letrasDois[0].posCol > letrasDois[1].posCol){
                    for(let l = 0; l < tamCol; l++){
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posLin === letrasDois[0].posLin + l && letras[j].posCol === letrasDois[0].posCol - l){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
                  //Diagonal2 - invertida
                  if(letrasDois[0].posLin > letrasDois[1].posLin && letrasDois[0].posCol < letrasDois[1].posCol){
                    for(let l = 0; l < tamCol; l++){
                      for(let j = 0; j < letras.length; j++){
                        if(letras[j].posLin === letrasDois[1].posLin + l && letras[j].posCol === letrasDois[1].posCol - l){
                          letras[j].clicked = true;
                        }
                      }
                    }
                  }
  
                }
              }
            }
          }
        }
  
        if(!pal){
          letrasDois[0].clicked=false;
          letrasDois[1].clicked=false;
  
        }
  
  
        letrasDois.splice(0,2);
  
      }
  
  
    }

  function finalizaJogo(){
    let count=0
    for(let i=0;i<palavras.length;i++){
      if(palavras[i].encontrado === true)
        count++;
    }
    if(count === palavras.length){
      setGameStarted(false);
      setPopupIsOpen(true);
    }
  }


  //limpar as letras
  function resetTabuleiro(letras){
    for(let i=0;i<letras.length;i++){
      letras[i].clicked = false;
    }

  }

  //limpas as palavras
  function resetPalavras(palavras){
    for(let i=0;i<palavras.length;i++){
      palavras[i].encontrado = false;
    }

  }

  if(!gameStarted){
    resetTabuleiro(letras);
    resetPalavras(palavras);
  }

  return (
    <section className="game-panel">
      <h3 className="sr-only">Peças do Jogo</h3>
      <div id="game" className={gameClass + class1}>
        {letras.map((letras, i) => (
          <div onClick = {() => {verificaLetras(i) ; finalizaJogo()}}>
            <Letra 
              letra={letras.letra}
              onClickLetra = {handleClickLetra}
              clicked = {letras.clicked}
              letrasDois={letrasDois}
            />
          </div>
        ))}
      </div>
      <div className={"palavras " + class1}>
        {palavras.map((palavras) => (
          <div className={"palavra " + palavras.encontrado}>
            <p>{palavras.palavra}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default GamePanel;
