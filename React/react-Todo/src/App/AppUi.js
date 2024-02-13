import React from "react";
import "./AppUI.css";
import { TodoCounter } from "../componentes/TodoCounter/TodoCounter";
import { TODOList } from "../componentes/TODOList/TODOList";
import { TODO } from "../componentes/TODO/TODO";
import imagen from "../img/undraw_checklist.svg";
import { TodoSearch } from "../componentes/TodoSearch/TodoSearch";
import { CreateTask } from "../componentes/CreateTodo/CreateTodo";
import { Counter } from "../componentes/Counter/Counter";
import { TodoContext } from "../TodoContext/TodoContext";
import { Modal } from "../componentes/Modal/Modal";
import { CreateTodoButton } from "../componentes/CreateTodoButton/CreateTodoButton";
import { TodoForm } from "../componentes/TodoForm/TodoForm";
import MyLoader from "../componentes/Loaders/loader";
import GithubProfileLoader from "../componentes/Loaders/GithubProfileLoader"

function AppUI() {
  const {
    error,
    loading,
    cantCompleted,
    cantTotal,
    searchValue,
    setSearchValue,
    searchedTodos,
    todos,
    setTodos,
    onTodoStatusChange,
    onTodoDelete,
    onNewTask,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext);

  return (
    <main>
      <section className="sectionIzquierda">
        <h1>Create new task</h1>
        <CreateTask onNewTask={onNewTask} />
        <MyLoader/>
        <GithubProfileLoader/>
        <img src={imagen} alt="" />
      </section>

      <section className="sectionDerecha">
        <TodoCounter />
        <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />
        <TODOList>
          {error && <p>ERROR! {error}</p>}
          {loading && <p>Cargando los datos</p>}
          {!loading && cantTotal == 0 && <p>Agrega una tarea</p>}
          {searchedTodos.map((t) => {
            return (
              <TODO
                key={t.tarea}
                estado={t.estado}
                tarea={t.tarea}
                todos={todos}
                setTodos={setTodos}
                onTodoStatusChange={() => onTodoStatusChange(t.tarea)}
                onTodoDelete={() => onTodoDelete(t.tarea)}
              />
            );
          })}
        </TODOList>
        <Counter name="comida" />
        <CreateTodoButton setOpenModal={setOpenModal} openModal={openModal}
          />

        {!!openModal && (
          <Modal>
            <TodoForm/>
          </Modal>
        )}
      </section>
    </main>
  );
}

export { AppUI };
