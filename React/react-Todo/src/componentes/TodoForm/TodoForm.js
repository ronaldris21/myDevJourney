import React from "react";
import { TodoContext } from "../../TodoContext/TodoContext";
import "./TodoForm.css"


function TodoForm()
{

    const {onNewTask, setOpenModal} = React.useContext(TodoContext);
    const[taskValue, setTaskValue] = React.useState("");

    const onSubmit = (event) =>{
        event.preventDefault();
        if(taskValue == "")
        return;
        onNewTask(taskValue);
        setOpenModal(false);
    }

    const onCancelar = ()=>
    {
        setOpenModal(false);
    }
    const onChange = (event) =>
    {
        setTaskValue(event.target.value);
    }





    return(
        <form onSubmit={onSubmit}>
            <label >Agrega un nueva tarea</label>
            <textarea name="todoName" cols="30" rows="10"
            autoFocus
            value={taskValue}
            onChange={onChange}>

            </textarea>
            <div className="TodoForm-buttonContainer">
            <button onClick={onCancelar} className="TodoForm-button TodoForm-button--cancel">Cancelar</button>
            <button type="submit" className="TodoForm-button TodoForm-button--add">Agregar</button>
            </div>
        </form>
    )

}

export {TodoForm}