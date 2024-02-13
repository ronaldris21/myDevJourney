import React from "react";
import { useLocalStorage } from "../../TodoContext/useLocalStorage";

function Counter({name, initValue})
{
    if(!initValue)
        initValue=0;

    if(!name)
        name = "defaultCounter";
    
    const [counterValue, setCounterValue] = useLocalStorage(name,initValue);

    React.useEffect(()=>
    {
        document.title = `You clicked ${counterValue} times`;
    },[counterValue]);

    return(
        <div>
            <span>You clicked {counterValue} times</span>
            <button type="button" onClick={()=>setCounterValue(counterValue+1)}>Add {name}</button>
        </div>
    )

}

export {Counter}