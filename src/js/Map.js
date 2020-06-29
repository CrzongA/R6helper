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
            scale: 1,
            panels: 1,
            mapOffset: {x:-50,y:-50},
            mapPrevOffset: {x:-50, y:-50},
            annotateOffset:{x:0, y:0},
            annotateOn: false,
            annotateMode: "off",
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
        this.annotateSwitch = this.annotateSwitch.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
        this.changeTacticalMode = this.changeTacticalMode.bind(this)
        this.changeMovable = this.changeMovable.bind(this)
        this.changeMoving = this.changeMoving.bind(this)
        this.syncOffset = this.syncOffset.bind(this)


        // console.log(typeof Object.keys(mapEntries))
        // console.log(Object.keys(mapEntries)[0]=='bank')
        // console.log(mapEntries.find(it => it.location=="bank"))

    }

    scrollToZoom(e){
        e.preventDefault();
        let scale = this.state.scale
        scale += e.deltaY * -0.05
        scale = Math.min(Math.max(.5, scale), 2.5)

        this.setState( {scale: scale})
        console.log(this.state.scale, e.deltaY)
    }


    annotateSwitch = (e) =>{
        console.log("switch annotate")
        if (this.state.annotateOn){
            this.setState({annotateOn:false, annotateMode:"off",annotateDisplay: "none"})
        }
        else{
            this.setState({annotateOn:true, annotateMode:"on", annotateDisplay: "block"})
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
        console.log(position)
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
        // console.log(position)
        this.setState({annotateOffset: position})
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
                bounds={{top:-250, left:-500, right:500, down:250}}
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
                    <img draggable={false} className={"map-content"} src={pathname} />
                </div>
                </div>
            </Draggable>
        )
    }

    loadPanels(){
        let res;
        if (this.state.panels==1){
            res =
            <div className={"panel-wrapper"} >
            <div className={"map-wrapper onemap"} >
                    {this.loadMapImg(this.state.currentLevel)}
            </div>
            </div>

        }
        else if (this.state.panels==2){
            let leftLevel, rightLevel;
            if (this.state.currentLevel<this.state.minLevel+this.state.levelCount-1){
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
            changeMovable: this.changeMovable,
            changeMoving: this.changeMoving,
            movable: this.state.movable,
            moving: this.state.moving
        }
        let res =
            <div>
                <Annotate {...annotateArgs}/>
            </div>

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
                annotateHandler={this.annotateSwitch}
                annotateMode={this.state.annotateMode}
                tacticalModeHandler={this.changeTacticalMode}
                tactical={this.state.tactical}
                changeLevel={this.changeLevel}
                recenter={this.recenter}
                syncOffset={this.syncOffset}
                />
                {this.loadPanels()}
                {this.loadAnnotate()}
            </div>
        )
    }

}

export default Map
