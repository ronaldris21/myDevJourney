import React from "react";
import './TodoCounter.css';

function TodoCounter({cantCompleted, cantTotal})
{
    
    return(
        <section className="TodoCounter-section">
            <h2 className="TodoCounter">{cantCompleted} tareas de {cantTotal}</h2>
            <progress  value={cantCompleted} max={cantTotal}> {cantCompleted/cantTotal}45 %</progress>
        </section>
       
    );
}

export {TodoCounter} 