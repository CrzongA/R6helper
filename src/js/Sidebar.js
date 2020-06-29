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
        this.annotateSwitch = this.props.annotateHandler
        this.changeLevel = this.props.changeLevel
        this.changeTacticalMode = this.props.tacticalModeHandler
        this.syncOffset = this.props.syncOffset
        this.tacticalMode = this.props.tactical
        this.loadFloorButtons = this.loadFloorButtons.bind(this)
        this.selectFloor = this.selectFloor.bind(this)
    }

    selectFloor=(e, ind)=>{
        // console.log(e, ind)
        this.changeLevel(ind)
    }

    loadFloorButtons(){
        let items=[]
        this.state.levels.forEach((it)=>{
            if (this.props.tactical){
                if (it.tactical){
                    items.push(
                        <div key={it.index} className={"lButton"} onClick={(e) =>{this.selectFloor(e, it.index);this.syncOffset()}}>{it.name}</div>
                    )
                }
            }
            else{
                items.push(
                    <div key={it.index} className={"lButton"} onClick={(e) =>this.selectFloor(e, it.index)}>{it.name}</div>
                )
            }
        })
        return items
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
                    {this.loadFloorButtons()}
                </div>
                <div className={"modeSwitches"}>
                    <div
                        className={"annotateSwitch lButton"}
                        onClick={this.annotateSwitch}>
                        <div>Annotate {this.props.annotateMode}</div>
                    </div>
                    <div className={"recenterButton lButton"} onClick={this.props.recenter}>
                        <div>Recenter</div>
                    </div>
                    <div className={"tModeButton lButton"} onClick={this.props.tacticalModeHandler}>
                        <div>Tactical</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar
