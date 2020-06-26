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
    }

    selectFloor=(e)=>{
        console.log(e)
    }

    loadFloors(){
        let items=[]
        this.state.levels.forEach((it)=>{
            items.push(
                <div key={it.index} className={"levelSelector"} onClick={this.selectFloor}>{it.name}</div>
            )
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
                    {this.loadFloors()}
                </div>
            </div>
        )
    }
}

export default Sidebar
