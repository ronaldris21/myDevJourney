import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider(props)
{
    const defaultLista = [
        { tarea: "Comprar yogurt", estado: false },
        { tarea: "Comprar Canela", estado: false },
        { tarea: "Comprar Carne", estado: true },
        { tarea: "Comprar Lasaña", estado: true },
        { tarea: "Comprar yogurakajsnjadnsdnaalksmañkdña ñalsmlñaslñdalñ,lñ,lañs, lnsdaknsdka aslkdnalsjsnalkndsklansdt", estado: false },
      ];
    

      ///TODO: Manejar estados en caso de hacer api calls async
      var error = false;
      var loading = false;

      //TODO: Comentar /eliminar luego
      localStorage.setItem("todos_v1",JSON.stringify(defaultLista));
    
    
      ///STATE MANAGEMENT
      const [todos,setTodos] = useLocalStorage("todos_v1",[]);
      const [searchValue, setSearchValue] = React.useState("");
      const [openModal, setOpenModal] = React.useState(false);
    
      
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
        <TodoContext.Provider value={{
            error,
            loading,
            cantCompleted,
            cantTotal,
            searchValue ,
            setSearchValue ,
            searchedTodos ,
            todos,
            setTodos ,
            onTodoStatusChange ,
            onTodoDelete ,
            onNewTask ,
            openModal, setOpenModal
        }} >
            {props.children}
        </TodoContext.Provider>
      );
}


export {TodoContext, TodoProvider}