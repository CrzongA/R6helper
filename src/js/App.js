import React from "react"
import r6operators from "r6operators"
import Map from "./Map"
import "../css/main.css"
import "../css/map.css"
import "../css/sidebar.css"
import "../css/annotate.css"
import "../css/operators.css"

class App extends React.Component{
    constructor(){
        super();
        this.filepath="../../resources/maps/Bank/bank-1.jpg";
        console.log(r6operators)
    }



    render(){
        return(
        <div id={"canvas"}>
            <Map location={"bank"} level={1}/>
        </div>
        )
    }
}

export default App
