import React from "react"
import Draggable from "react-draggable";
import Map from "./Map"
import "../css/main.css"
import "../css/map.css"

class App extends React.Component{
    constructor(){
        super();
        this.filepath="../../resources/maps/Bank/bank-1.jpg";
    }



    render(){
        return(
        <div id={"canvas"}>
            <Map title={"bank"} level={1}/>
            {/*{document.onload = ()=>{this.dragElement(document.getElementById("map"))}}*/}
        </div>
        )
    }
}

export default App
