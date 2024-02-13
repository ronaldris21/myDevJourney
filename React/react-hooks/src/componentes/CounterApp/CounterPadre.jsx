import React from "react";
import { Counter } from "./Counter";
import { Permissions } from "./Permissions";

class CounterPadre extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = { count: 1, canEdit: true };
      }
      
      render() {
          console.log("Render App");
  
          const toggleCanEdit = () => {
              console.log("Click al botón de toggleCanEdit");
              this.setState(({ canEdit: oldCanEdit }) => {
                return { canEdit: !oldCanEdit };
              });
          };
  
          const countPlusPlus = () => {
            console.log("Click al botón de counter");
            this.setState((prevState) => {
              return { count: prevState.count + 1 };
            });
          };
  
          return (
              <>
                <button onClick={countPlusPlus}>Counter +1</button>
                <Counter count={this.state.count} />
  
                <button onClick={toggleCanEdit}>Toggle Can Edit</button>
                <Permissions canEdit={this.state.canEdit} />
              </>
          );
      }
  }

export {CounterPadre}
