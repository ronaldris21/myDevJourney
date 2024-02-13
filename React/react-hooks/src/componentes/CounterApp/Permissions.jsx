import React from 'react'

class Permissions extends React.Component {
    render() {
        console.log("Render Permissions")
        const { canEdit } = this.props;
 
        return (
            <form>
                <p>El usuario {canEdit ? "" : "no"} tiene permisos de editar...</p>
            </form>
        );
    }
}

export {Permissions}