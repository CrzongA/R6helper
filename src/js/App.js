import React from "react"
import Draggable from "react-draggable";
import "../css/main.css"

class App extends React.Component{
    constructor(){
        super();
        this.filepath="../../resources/maps/Bank/bank-1.jpg";
    }

    loadMapImg(){
        return(
            <Draggable draggable={false} id={"map"} >
            <img id={"map-content"} src={this.filepath} />
            </Draggable>
        )
    }

    render(){
        return(
        <div className={"canvas"}>
            {this.loadMapImg()}
            {/*{document.onload = ()=>{this.dragElement(document.getElementById("map"))}}*/}
        </div>
        )
    }
}

export default App
