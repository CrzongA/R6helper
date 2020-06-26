import React from "react"
// import locations from "./mapEntries"

class Sidebar extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            position: "top",
            location: this.props.location,
            levels: this.props.levels,
            currentLevel: 1,
            selectedGameMode: 'all',
        }
        this.loadFloors.bind()
        this.selectFloor.bind()
        this.annotateSwitch = this.props.switchHandler
    }

    selectFloor=(e)=>{
        // console.log(e)
    }

    loadFloors(){
        let items=[]
        this.state.levels.forEach((it)=>{
            items.push(
                <div key={it.index} className={"levelButton"} onClick={this.selectFloor}>{it.name}</div>
            )
        })
        return items
    }

    annotateSwitch = (e) =>{
        if (this.props.annotateOn){
            this.setState({annotateOn:false, annotateMode:"off"})
        }
        else{
            this.setState({annotateOn:true, annotateMode:"on"})
        }
    }

    render(){
        return(
            <div className={"sidebar"}>
                <select className={"locationSelector dd-selector"} name={"location"}>
                    <option value={""}>placeholder</option>
                </select>
                <select className={"gameModeSelector dd-selector"} name={"gameMode"}>
                    <option value={""}>placeholder</option>
                </select>
                <div className={"levelSelector-wrapper"}>
                    {this.loadFloors()}
                </div>
                <div className={"annotateSwitch levelButton"} onClick={this.annotateSwitch}>
                    <div>Annotate {this.props.annotateMode}</div>
                </div>
            </div>
        )
    }
}

export default Sidebar