import React from "react";

function TODO(props) {
  return (
    <div>
      <span> {props.tarea}</span>
      <div>
        <input type="checkbox" name="borrar" checked={props.estado} />
        <a href="">
          <button>Borrar</button>
        </a>
      </div>
    </div>
  );
}

export {TODO};
