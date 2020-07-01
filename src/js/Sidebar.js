import React from "react"

// import locations from "./mapEntries"

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "top",
            location: this.props.location,
            levels: this.props.levels,
            currentLevel: 1,
            selectedGameMode: 'all',
            panelsOption:[1, 2, 4]
        }
        this.changeLevel = this.props.changeLevel
        this.changeTacticalMode = this.props.tacticalModeHandler
        this.syncOffset = this.props.syncOffset
        this.loadFloorButtons = this.loadFloorButtons.bind(this)
        this.selectFloor = this.selectFloor.bind(this)
        this.listPanels = this.listPanels.bind(this)
        this.changePanel = this.changePanel.bind(this)
    }

    selectFloor = (e, ind) => {
        // console.log(e, ind)
        this.changeLevel(ind)
    }

    listPanels(){
        let ret=[]
        this.state.panelsOption.forEach((i)=> {
                ret.push(<option key={i} value={i}>{i}</option>)
            }
        )
        return ret
    }

    changePanel(e){
        this.props.panelHandler(e.target.value)
    }

    loadFloorButtons() {
        let items = []
        this.state.levels.forEach((it) => {
            if (this.props.tactical) {
                if (it.tactical) {
                    items.push(
                        <div key={it.index} className={"lButton"} onClick={(e) => {
                            this.selectFloor(e, it.index);
                            this.syncOffset()
                        }}>{it.name}</div>
                    )
                }
            } else {
                items.push(
                    <div key={it.index} className={"lButton"}
                         onClick={(e) => this.selectFloor(e, it.index)}>{it.name}</div>
                )
            }
        })
        return items
    }


    render() {
        return (
            <div className={"sidebar"}>
                <div className={"sidebar-top"}>
                    <select className={"panelSelector dd-selector"}
                            name={"NOPanels"}
                            value={this.props.panels}
                            onChange={this.changePanel}
                    >
                        {this.listPanels()}
                    </select>
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
                            onClick={this.props.annotateDisplaySwitch}>
                            <div>Annotate {this.props.annotateState}</div>
                        </div>
                        <div className={"recenterButton lButton"} onClick={this.props.recenter}>
                            <div>Recenter</div>
                        </div>
                        <div className={"tModeButton lButton"} onClick={this.props.tacticalModeHandler}>
                            <div>Tactical</div>
                        </div>
                    </div>
                </div>
                <div className={"toolsWrapper"} style={{display: this.props.annotateDisplay}}>
                    <div className={"modeChooser cButton"} onClick={this.props.switchAnnotateMode}>
                        <div>{this.props.annotateMode}</div>
                    </div>
                    <div className={"clearPointsButton cButton"} onClick={this.clearPoints}>
                        <div>Clear</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar
