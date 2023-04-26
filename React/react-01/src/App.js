import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { Counter } from "./componentes/Counter";
import { TODOList } from "./componentes/TODOList";
import { ComponenteChildren } from "./componentes/ComponenteChildren";

function App(props) {
  return (
    <React.Fragment>
      <Counter />

      {/* Search Bar */}
      <input type="text" name="search" value="" placeholder="Nueva tarea" />

      {/* ITEM */}

      {props.saludo}

      <TODOList>
        <h2>Tus tareas</h2>
      </TODOList>

      <ComponenteChildren>
        <p>parrafo hijo usando props children</p>
      </ComponenteChildren>
    </React.Fragment>
  );
}

export default App;
