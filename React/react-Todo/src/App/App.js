import { AppUI } from "./AppUi";
import React from "react";
import {  TodoProvider } from "../TodoContext/TodoContext";


function App(props) {
  return (
    <React.Fragment>
      <TodoProvider>
        <AppUI />
      </TodoProvider>
    </React.Fragment>
  );
}

export default App;
