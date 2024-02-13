import React from "react";
import * as ReactDOM from 'react-dom'
import "./Modal.css"

function Modal(props)
{

    return ReactDOM.createPortal(
        <div className="ModalBackground">
            {props.children}
        </div>,
        document.getElementById("modal")
        )

}

export {Modal}
