import React, {useState} from "react";
import "./game-over-modal.css";
import "../../assets/styles/w3.css";
import { Footer } from "../index";

function GameOverModal({ isOpen,setPopupIsOpen, points, handleClose }) {
  return(isOpen) ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setPopupIsOpen(false)}>Fechar</button>
        <div className="info ">
          <p>O jogo terminou!</p>
          <br></br>
          <p>Pontuação: {points} pontos!</p>
        </div>
      </div>
    </div>
  ) : "";
}
  

export default GameOverModal;
