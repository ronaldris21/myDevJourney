import React from "react";



function CreateTask({onNewTask })
{

    const [newTaskValue, setNewTaskValue] = React.useState("");

    const onChangeNewTask = (event) =>{
        setNewTaskValue(event.target.value);
    }

    const  onClickButton = () =>{
        if(newTaskValue!= "")
        {
            onNewTask(newTaskValue);
            setNewTaskValue("");
        }
    }

    
    return(

        <section className="section-nuevatarea"> 
            <span >Task Name</span>
            <input
              type="text"
              name="todoitem"
              value={newTaskValue}
              placeholder="Lunch rocket to the moon"
              onChange={onChangeNewTask}
            />
            <button onClick={ () => {
                onClickButton(newTaskValue)
                }} >
                    Create task
                </button>
          </section>
        
    )

}

export {CreateTask}