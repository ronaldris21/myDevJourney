import React from "react";
import { TODO } from "../TODO/TODO";
import "./TODOList.css";

function TODOList(props) {
  

  return (
    // solo tiene que retornar un objeto
      <ul className="todoList">
        {/* codigo de JS SE PONE ENTRE LLAVES! */}
        {props.children}
        
      </ul>
  );
}

export { TODOList };
