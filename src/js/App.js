import React from "react"
import r6operators from "r6operators"
import Map from "./Map"
import fs from "fs"
import '../css/index.css'
import "../css/main.css"
import "../css/map.css"
import "../css/sidebar.css"
import "../css/annotate.css"
import "../css/r6props.css"

class App extends React.Component{
    constructor(){
        super();
        this.state={
            preference:''
        }
        // console.log(r6operators)
        this.fileHandler = this.fileHandler.bind(this)
    }

    componentDidMount() {
        // fs.readFile("../../usr/preference.txt",(err, data)=>{
        //     this.fileHandler(data)
        // })
    }

    fileHandler(data){
        this.setState({preference: data});
        console.log(this.state.preference);
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
