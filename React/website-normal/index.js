import {createRoot } from 'react-dom/client'

function NavigationBar()
{
    return <h1>Barra de navegación</h1>
}


const domNode = document.getElementById("navigation");
const root = createRoot(domNode);
root.render(<NavigationBar/>);