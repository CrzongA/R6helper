import React from "react"
import Draggable from "react-draggable";
import Sidebar from "./Sidebar";
import Annotate from "./Annotate"
import mapEntries from "./mapEntries"

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebarPos: "top",
            location: this.props.location,
            currentLevel: 1,
            minLevel: mapEntries.find(i=>i.location==this.props.location).lowestLevel,
            levelCount:mapEntries.find(i=>i.location==this.props.location).levelCount,
            tMinLevel:mapEntries.find(i=>i.location==this.props.location).tacticalLowestLevel,
            tLevelCount:mapEntries.find(i=>i.location==this.props.location).tacticalLevelCount,
            scale: 1,
            panels: 1,
            mapOffset: {x:0,y:0},
            mapPrevOffset: {x:0, y:0},
            annotateOffset:{x:0, y:0},
            annotateOn: false,
            annotateState: "off",
            annotateMode:"move",
            annotateDisplay: "none",
            tactical: false,
            movable: true,
            moving: false
        }
        this.maps = mapEntries
        this.loadMapImg = this.loadMapImg.bind(this)
        this.loadPanels = this.loadPanels.bind(this)
        this.loadAnnotate = this.loadAnnotate.bind(this)
        this.scrollToZoom = this.scrollToZoom.bind(this)
        this.onControlledDrag = this.onControlledDrag.bind(this)
        this.changeMapPrevOffset = this.changeMapPrevOffset.bind(this)
        this.changeAnnotateOffset = this.changeAnnotateOffset.bind(this)
        this.annotateDisplaySwitch = this.annotateDisplaySwitch.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
        this.changeTacticalMode = this.changeTacticalMode.bind(this)
        this.changeMovable = this.changeMovable.bind(this)
        this.changeMoving = this.changeMoving.bind(this)
        this.syncOffset = this.syncOffset.bind(this)
        this.switchAnnotateMode = this.switchAnnotateMode.bind(this)
        this.setPanelNo = this.setPanelNo.bind(this)
    }

    scrollToZoom(e){
        e.preventDefault();
        let scale = this.state.scale
        scale += e.deltaY * -0.05
        scale = Math.min(Math.max(.5, scale), 2.5)

        this.setState( {scale: scale})
        console.log(this.state.scale, e.deltaY)
    }

    setPanelNo(NOPanel){
        this.setState({panels: NOPanel})
    }

    annotateDisplaySwitch(){
        console.log("switch annotate")
        if (this.state.annotateOn){
            this.setState({annotateOn:false, annotateState:"off",annotateDisplay: "none"})
        }
        else{
            this.setState({annotateOn:true, annotateState:"on", annotateDisplay: "block"})
        }
    }


    switchAnnotateMode(){
        if(!this.state.movable){
            console.log("move mode")
            this.setState({annotateMode: 'move'})
            this.changeMovable()
        }
        else if (this.state.movable){
            console.log("draw mode")
            this.setState({annotateMode: 'draw'})
            this.changeMovable()
        }
    }

    changeMovable(){
        if (this.state.movable) {
            this.setState({movable: false})
        }
        else{
            this.setState({movable: true})
        }
        console.log(this.state.movable)
    }

    changeMoving(state){
        this.setState({moving:state})
    }

    onControlledDrag = (e, position) => {
        // console.log(position)
        if (this.state.movable) {
            const {x, y} = position;
            this.setState({mapOffset: {x:x, y:y}})
        }
    }

    changeMapPrevOffset(position){
        this.setState({mapPrevOffset:position})
    }



    syncOffset(){

    }

    changeAnnotateOffset = (position)=>{
        console.log(position)
        this.setState({annotateOffset: position})
    }

    loadMapBg(){
        let pathname = "../../resources/maps/" + this.state.location + "/"
        return <img draggable={false} className={"map-content map-bg"} />
    }

    loadMapImg(level){
        let pathname
        if (this.state.tactical){
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + "-t" + ".jpg"
        }
        else{
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + ".jpg"
        }
        return(
            <Draggable
                bounds={{top:-250, left:-500, right:500, bottom:250}}
                onDrag={this.onControlledDrag}
                position={this.state.mapOffset}
                disabled={!this.state.movable}
            >
                <div>
                <div
                    style={{transform: 'scale('+ this.state.scale + ')'}}
                    onWheel={(e)=>{this.scrollToZoom(e)}}
                    className={"map"}
                >
                    {this.loadAnnotate()}
                    <img draggable={false} className={"map-content"} src={pathname} />
                </div>
                </div>
            </Draggable>
        )
    }

    loadPanels(){
        let res;
        let leftLevel, rightLevel;
        if (this.state.panels==1){
            res =
            <div className={"panel-wrapper"} >
            <div className={"map-wrapper onemap"} >
                    {this.loadMapImg(this.state.currentLevel)}
            </div>
            </div>

        }
        else if (this.state.panels==2){
            let leftLevel, rightLevel, minLevel, levels;
            if(this.state.tactical){
                levels=this.state.tLevelCount
                minLevel = this.state.tMinLevel
            }
            else{
                levels = this.state.levelCount
                minLevel = this.state.tMinLevel
            }
            if (this.state.currentLevel<minLevel+levels-1){
                leftLevel = this.state.currentLevel
                rightLevel = this.state.currentLevel+1
            }
            else{
                leftLevel = this.state.currentLevel-1
                rightLevel = this.state.currentLevel
            }
            res =
            <div className={"panel-wrapper"} >
            <div className={"map-wrapper twomaps"}>
                    {this.loadMapImg(leftLevel)}
            </div>
            <div className={"map-wrapper twomaps"}>
                    {this.loadMapImg(rightLevel)}
            </div>
            </div>

        }
        else if (this.state.panels==4){
            if (this.state.currentLevel<this.state.minLevel+this.state.levelCount-1){
                leftLevel = this.state.currentLevel
                rightLevel = this.state.currentLevel+1
            }
            else{
                leftLevel = this.state.currentLevel-1
                rightLevel = this.state.currentLevel
            }
            res =
                <div className={"panel-wrapper"}>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(this.state.currentLevel)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(this.state.level+1)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(this.state.level+2)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(this.state.level+3)}
                    </div>
                </div>
        }

        return res
    }

    loadAnnotate(){
        let width, height
        if (this.state.panels==1){
            width=window.innerWidth
            height = window.innerHeight
        }
        else if (this.state.panels==2){
            width=window.innerWidth*.5
            height = window.innerHeight
        }
        else if (this.state.panels==4){
            width = window.innerWidth*.5
            height = window.innerHeight*.5
        }
        let annotateArgs = {
            className:"",
            width:width,
            height:height,
            dragHandler: this.onControlledDrag,
            changeMapPrevOffset: this.changeMapPrevOffset,
            mapOffset:this.state.mapOffset,
            mapPrevOffset: this.state.mapPrevOffset,
            annotateOffset: this.state.annotateOffset,
            changeAnnotateOffset: this.changeAnnotateOffset,
            annotateMode:this.state.annotateMode,
            display:this.state.annotateDisplay,
            panels: this.state.panels,
            changeMoving: this.changeMoving,
            movable: this.state.movable,
            moving: this.state.moving,
            mode: this.state.annotateMode
        }
        let res =
                <Annotate {...annotateArgs}/>

        return res
    }

    recenter = (e) => {
        this.setState({mapOffset:{x:0, y:0}})
    }

    changeLevel(level){
        this.setState({currentLevel: level})
    }

    changeTacticalMode(){
        this.setState({tactical: !this.state.tactical})
        console.log(!this.state.tactical, this.state.tactical)
    }

    render() {
        let currentMapObj = mapEntries.find(item => item.location=="bank")
        return (
            <div>
                <Sidebar
                location={currentMapObj.location}
                levels={currentMapObj.levels}
                annotateDisplaySwitch={this.annotateDisplaySwitch}
                annotateMode={this.state.annotateMode}
                annotateDisplay={this.state.annotateDisplay}
                annotateState={this.state.annotateState}
                tacticalModeHandler={this.changeTacticalMode}
                tactical={this.state.tactical}
                movable={this.state.movable}
                changeMovable={this.changeMovable}
                changeLevel={this.changeLevel}
                recenter={this.recenter}
                syncOffset={this.syncOffset}
                switchAnnotateMode={this.switchAnnotateMode}
                panels={this.state.panels}
                panelHandler={this.setPanelNo}
                />
                {this.loadPanels()}
            </div>
        )
    }

}

export default Map
