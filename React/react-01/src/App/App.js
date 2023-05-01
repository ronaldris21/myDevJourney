import { AppUI } from "./AppUi";
import React from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useLocalStorageWithStatus } from "../utils/useLocalStorageWithStatus";

function App(props) {
  const defaultLista = [
    { tarea: "Comprar yogurt", estado: false },
    { tarea: "Comprar Canela", estado: false },
    { tarea: "Comprar Carne", estado: true },
    { tarea: "Comprar Lasaña", estado: true },
    { tarea: "Comprar yogurakajsnjadnsdnaalksmañkdña ñalsmlñaslñdalñ,lñ,lañs, lnsdaknsdka aslkdnalsjsnalkndsklansdt", estado: false },
  ];



  ///STATE MANAGEMENT
  const [todos,setTodos] = useLocalStorage("todos_v1",[]);
  const [searchValue, setSearchValue] = React.useState("");


  
  const cantCompleted = todos.filter(t=> t.estado).length;
  const cantTotal = todos.length;


  let searchedTodos = todos;
 
  // Lógica para filtrar
  if(searchValue.length>0)
  {
   
    let searchValueLowerCase = searchValue.toLowerCase();
    searchedTodos = todos.filter(t=>{
      return t.tarea.toLowerCase().includes(searchValueLowerCase);
    })
  }


  const onTodoDelete = (text) =>{
    var newTodos = [...todos];
    newTodos = newTodos.filter(t=> t.tarea !== text);
    setTodos(newTodos);  
    console.log("onDeleteTodo")
     ///Guardar
    //  localStorage.setItem("todos_v1",JSON.stringify(todos));
  }

  const onTodoStatusChange = (text) =>{
    var index = todos.findIndex(t=>t.tarea ===text);
    var newTodos = [...todos];
    newTodos[index].estado = !newTodos[index].estado;
    setTodos(newTodos);  
    console.log("onTodoStatusChange")

  }

  const onNewTask = (text) =>
  {
    var newTodos = [...todos];
    newTodos.unshift({tarea:text,estado:false});
    setTodos(newTodos);
    // localStorage.setItem("todos_v1",JSON.stringify(todos));
  }


  // ///En honor a PARACHANCHOMOL!!!!!!! @01/05/2023
  // React.useEffect(()=>{
  //   localStorage.setItem("todos_v1",JSON.stringify(todos));
  // }, [todos])



  return (
    <React.Fragment>
      <AppUI 
        error={false}
        loading={false}
        cantCompleted={cantCompleted}
        cantTotal={cantTotal}
        searchValue = {searchValue}
        setSearchValue = {setSearchValue}
        searchedTodos = {searchedTodos}
        todos ={todos}
        setTodos = {setTodos}
        onTodoStatusChange = {onTodoStatusChange}
        onTodoDelete = {onTodoDelete}
        onNewTask = {onNewTask}
      />
    </React.Fragment>
  );
}

export default App;
