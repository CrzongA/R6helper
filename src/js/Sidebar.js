import React from "react"
import mapEntries from "./mapEntries"
// import locations from "./mapEntries"

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position: "top",
            location: this.props.location,
            currentLevel: 1,
            selectedGameMode: 'all',
            panelsOptions:[1, 2, 4],
            mapOptions:[],
            confirmClear:false
        }
        this.changeLevel = this.props.changeLevel
        this.changeTacticalMode = this.props.tacticalModeHandler
        this.loadFloorButtons = this.loadFloorButtons.bind(this)
        this.selectFloor = this.selectFloor.bind(this)
        this.listPanelOptions = this.listPanelOptions.bind(this)
        this.listMapsOptions = this.listMapsOptions.bind(this)
        this.changePanel = this.changePanel.bind(this)
        this.changeMap = this.changeMap.bind(this)
        this.switchClearPath = this.switchClearPath.bind(this)
        this.confirmClearPath = this.confirmClearPath.bind(this)
    }

    componentDidMount() {
        let mapOptions = []
        mapEntries.forEach(loc => mapOptions.push(loc.location) )
        this.setState({mapOptions: mapOptions})
    }

    selectFloor = (e, ind) => {
        // console.log(e, ind)
        this.changeLevel(ind)
    }


    listPanelOptions(){
        let ret=[]
        this.state.panelsOptions.forEach((i)=> {
                ret.push(<option key={i} value={i}>{i}</option>)
            }
        )
        return ret
    }

    listMapsOptions(){
        let ret=[]
        this.state.mapOptions.forEach(m => {
            ret.push(<option key={m} value={m}>{m}</option>)
        })
        return ret
    }

    changePanel(e){
        this.props.panelHandler(e.target.value)
    }

    changeMap(e){
        this.props.mapHandler(e.target.value)
    }

    loadFloorButtons() {
        let items = []
        this.props.levels.forEach((it) => {
            if (this.props.tactical) {
                if (it.tactical) {
                    items.push(
                        <div key={it.index} className={"lButton"} onClick={(e) => {
                            this.selectFloor(e, it.index);
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

    switchClearPath(){
        this.setState({confirmClear: !(this.state.confirmClear)})
    }

    confirmClearPath(){
        let thisStyle={visibility:"hidden"}
        if (this.state.confirmClear){
            thisStyle={visibility: "visible",transform: "translate(0px,calc(-5vh - 10px))"}
        }
        return(
            <div
                style={thisStyle}
                className={"confirmButton"}
                onClick={()=>{this.props.handleClearPoints();this.switchClearPath()}}>
                Confirm?
            </div>
        )
    }

    render() {
        return (
            <div className={"sidebar"}>
                <div className={"sidebar-top sidebar-element"}>
                    <select className={"panelSelector dd-selector"}
                            name={"NOPanels"}
                            value={this.props.panels}
                            onChange={this.changePanel}
                    >
                        {this.listPanelOptions()}
                    </select>
                    <select
                        className={"locationSelector dd-selector"}
                        name={"location"}
                        onChange={this.changeMap}
                    >
                        {this.listMapsOptions()}
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
                <div className={"toolsWrapper sidebar-element"} style={{display: this.props.annotateDisplay}}>
                    <div className={"modeChooser cButton"} onClick={this.props.switchAnnotateMode}>
                        <div>{this.props.annotateMode}</div>
                    </div>
                    <div className={"clearButtonWrapper"}>
                        <div className={"clearButton"} onClick={this.switchClearPath}>
                            <div>Clear</div>
                        </div>
                        {this.confirmClearPath()}
                    </div>
                    <div className={"opsChooser cButton"} onClick={this.props.handleOps}>
                        Operators
                    </div>
                    <div className={"gadgetChooser cButton"} onClick={this.props.handleGadgets}>
                        Gadgets
                    </div>
                </div>
            </div>
        )
    }
}

export default Sidebar
