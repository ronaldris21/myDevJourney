import React from "react";

import "./TODO.css";
function TODO(props) {

  var estado = props.estado;

  return (
    <li className="TodoItem">
      <span
        className={`Icon Icon-check  ${estado && 'Icon-check--active'}`}
        onClick={props.onTodoStatusChange}
      >
        √
      </span>
      <p className={`TodoItem-p ${estado && 'TodoItem-p--complete'}`}>
        {props.tarea}
      </p>
      <span className="Icon Icon-delete"
        onClick={props.onTodoDelete}  
      >
        X
        </span>
      {/* <div class="round">
          <input type="checkbox"  id="checkbox" checked= {props.estado}/>
        </div> */}
    </li>
  );
}

export { TODO };
