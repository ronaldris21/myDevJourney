import React from "react";
import "./AppUI.css";
import { TodoCounter } from "../componentes/TodoCounter/TodoCounter";
import { TODOList } from "../componentes/TODOList/TODOList";
import { TODO } from "../componentes/TODO/TODO";
import imagen from "../img/undraw_checklist.svg";
import { TodoSearch } from "../componentes/TodoSearch/TodoSearch";
import { CreateTask } from "../componentes/CreateTodo/CreateTodo";
import { Counter } from "../componentes/Counter/Counter";

function AppUI({ error, loading, cantCompleted,cantTotal,searchValue,setSearchValue,searchedTodos,todos,setTodos,onTodoStatusChange,onTodoDelete,onNewTask })
{

    return(
        <main>
          <section className="sectionIzquierda">
            <h1>Create new task</h1>
            <CreateTask onNewTask={onNewTask}/>
            <img src={imagen} alt="" />
          </section>

          <section className="sectionDerecha">
            <TodoCounter 
                    cantCompleted={cantCompleted}
                    cantTotal={cantTotal}
            />
            <TodoSearch 
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              />
            <TODOList>
              {error && <p>ERROR! {error}</p>}
              {loading && <p>Cargando los datos</p>}
              {(!loading && cantTotal==0) && <p>Agrega una tarea</p>}
              {searchedTodos.map(t=>{
                return <TODO  key={t.tarea}
                              estado={t.estado} 
                              tarea={t.tarea} 
                              todos={todos} 
                              setTodos={setTodos} 
                              onTodoStatusChange = {() => onTodoStatusChange(t.tarea)}
                              onTodoDelete={() => onTodoDelete(t.tarea)}
                                      />
              })}
            </TODOList>
            <Counter />
          </section>
      </main>
    )
}

export {AppUI}