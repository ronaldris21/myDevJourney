import React from "react";
import './TodoSearch.css'


function TodoSearch({searchValue, setSearchValue})
{

    const onChangeTareaBuscada = (event) =>{
        console.log(event.target.value);
        setSearchValue(event.target.value);
    }

    return(

        <input 
        className="TodoSearch" 
        type="search" 
        name="search" 
        placeholder="Buscar tarea"
        value={searchValue}
        onChange={onChangeTareaBuscada}
        />
        
    )
}

export {TodoSearch}