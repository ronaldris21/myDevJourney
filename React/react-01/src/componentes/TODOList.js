import React from "react";
import { TODO } from "./TODO";


function TODOList(props)
{
    const lista = [
        {tarea:'Comprar yogurt',estado:false},
        {tarea:'Comprar Canela',estado:false},
        {tarea:'Comprar Carne',estado:true},
        {tarea:'Comprar Lasaña',estado:true},
        {tarea:'Comprar yogurt',estado:false},
        {tarea:'Comprar Canela',estado:false},
        {tarea:'Comprar Carne',estado:true},
        {tarea:'Comprar Lasaña',estado:true},
                    ];

    return(
        // solo tiene que retornar un objeto
        <div>
            {/* codigo de JS SE PONE ENTRE LLAVES! */}
            {props.children}

            {lista.map(item=>{
                return <TODO tarea = {item.tarea} estado = {item.estado} />
            })}
            
        </div>

    );
}

export {TODOList}