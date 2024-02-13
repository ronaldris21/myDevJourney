import React from 'react'

class Counter extends React.Component {
    render() {
        console.log("Render Counter")
        const { count } = this.props;
 
        return (
            <form>
                <p>Counter: {count}</p>
            </form>
        );
    }
}

export {Counter}