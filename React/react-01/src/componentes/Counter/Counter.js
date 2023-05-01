import React from "react";

function Counter({initValue})
{
    if(!initValue)
        initValue=0;

    const [counterValue, setCounterValue] = React.useState(initValue);

    React.useEffect(()=>
    {
        document.title = `You clicked ${counterValue} times`;
    },[counterValue]);

    return(
        <div>
            <span>You clicked {counterValue} times</span>
            <button type="button" onClick={()=>setCounterValue(counterValue+1)}>Add</button>
        </div>
    )

}

export {Counter}