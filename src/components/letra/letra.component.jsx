import React from "react";
import "./letra.css"
function Letra({ letra, letrasDois,clicked }) {
    //selected->array max de 2 letras(as selecionadas)
    let selected = clicked ? " clicked" : "";



    return (

      <div className={"letra " + selected}>
        {letra}
      </div>
    );
  }

  export default Letra;