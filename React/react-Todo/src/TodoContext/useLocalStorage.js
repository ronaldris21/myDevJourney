import React from "react";

function useLocalStorage(itemName, initialValue)
{
    let storageValue = localStorage.getItem(itemName);
    let parsedValue = initialValue;

    
    if(storageValue)
    {
        ///Valido valor del localStorage
        parsedValue = JSON.parse(storageValue);
    }
    else
    {
        //Asigno el valor inicial
        localStorage.setItem(itemName, JSON.stringify(initialValue));
    }

    var [item, setItem] = React.useState(parsedValue);

    ///Guardo tanto en el localstorage como en el setItem del React Use State
    const saveItemStorage = (value) =>
    {
        localStorage.setItem(itemName,JSON.stringify(value));
        setItem(value);
    }

    return [item, saveItemStorage];
}

export {useLocalStorage}