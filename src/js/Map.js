import React from "react"
import Draggable from "react-draggable";
import Sidebar from "./Sidebar";
import Annotate from "./Annotate"
import R6props from "./R6props"
import mapEntries from "./mapEntries"
import ops from "r6operators"

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
            bgOffset:{x:0, y:0},
            mapOffset: {x:0,y:0},
            mapPrevOffset: {x:0, y:0},
            annotateOffset:{x:0, y:0},
            annotateOn: false,
            annotateState: "off",
            annotateMode:"move",
            annotateDisplay: "none",
            tactical: false,
            movable: true,
            moving: false,
            annotateRef:'',
            annotateDimension:{w:0, h:0},
            opsMenuDisplay: "none",
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
        this.annotateClearPoints = this.annotateClearPoints.bind(this)
        this.changeLevel = this.changeLevel.bind(this)
        this.changeTacticalMode = this.changeTacticalMode.bind(this)
        this.changeMovable = this.changeMovable.bind(this)
        this.changeMoving = this.changeMoving.bind(this)
        this.bgOffset = this.bgOffset.bind(this)
        this.switchAnnotateMode = this.switchAnnotateMode.bind(this)
        this.setPanelNo = this.setPanelNo.bind(this)
        this.loadIconSVG = this.loadIconSVG.bind(this)
        this.setOpsMenuDisplay = this.setOpsMenuDisplay.bind(this)
        this.loadMapBg = this.loadMapBg.bind(this)
        this.loadMapTop = this.loadMapTop.bind(this)
    }

    componentDidMount() {
        this.bgOffset()

        // this.annotateRef = React.createRef()
        // let w_str = window.getComputedStyle(document.getElementById(`map-${this.state.currentLevel}`)).width,
        //     h_str = window.getComputedStyle(document.getElementById(`map-${this.state.currentLevel}`)).height
        // let w = parseInt(w_str.substring(0, w_str.length-2)),
        //     h = parseInt(h_str.substring(0, h_str.length-2))
        // console.log(w_str,h_str,w,h)
        // let w = parseInt(w_str), h = parseInt(h_str)
        // this.setState({annotateDimension: {w:w, h:h}})
        // console.log(window.getComputedStyle(document.getElementById(`map-${this.state.currentLevel}`)).getPropertyValue('height'))
        // console.log(document.getElementById("canvas"))
        // console.log(document.getElementById(`map-${this.state.currentLevel}`).style)
    }

    scrollToZoom(e){
        e.preventDefault();
        let scale = this.state.scale
        scale += e.deltaY * -0.05
        scale = Math.min(Math.max(.3, scale), 2.5)

        this.setState( {scale: scale})
        console.log(this.state.scale, e.deltaY)
    }

    setPanelNo(NOPanel){
        this.setState({panels: NOPanel})
    }

/*    handleAnnotateRef(r){
        // this.setState({annotateRef: r.current})
        this.annotateRef = r
    }*/

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


    bgOffset(){
        let bgoffset = mapEntries.find(loc=>loc.location==this.props.location).bgOffset
        this.setState({bgOffset: bgoffset})
    }

    changeAnnotateOffset = (position)=>{
        console.log(position)
        this.setState({annotateOffset: position})
    }

    annotateClearPoints(){
        this.annotateRef.current.clearPoints()
    }

    loadMapBg(){
<<<<<<< HEAD
        let pathname = "../../resources/maps/" + this.state.location + "/"
        return <img draggable={false} className={"map-content map-bg"} />
=======
        if (!this.state.tactical) {
            let loc = mapEntries.find(m => m.location == this.props.location).levels
            let bgLevel = loc.find(l => l.background==true).index
            let pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + bgLevel + ".jpg"
            return <img draggable={false} className={"map-content map-bg"} src={pathname}/>
        }
    }

    loadMapTop(pathname, level){
        let style
        if (!this.state.tactical && !mapEntries.find(m=>m.location==this.props.location).levels.find(l=>l.index==level).hasOwnProperty("background")){
            style = {transform: "translate("+this.state.bgOffset.x + "px," + this.state.bgOffset.y + "px)"}
        }
        return (
            <img id={`map-${level}`}
                 style={style}
                 draggable={false}
                 className={"map-content"}
                 src={pathname} />
        )
>>>>>>> master
    }

    loadMapImg(level){
        let pathname, width, height, scale=1
        switch(this.state.panels){
            default: scale = 1; break;
            case '1': scale = 1; break;
            case '2': scale = 0.7; break;
            case '4': scale = 0.5; break;
        }
        if (this.state.tactical){ // normal img width + height
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + "-t.jpg"
            width = mapEntries.find(m => m.location == this.props.location).tacMapDimension.width
            height = mapEntries.find(m => m.location == this.props.location).tacMapDimension.height
        }
        else{ // background img width + height
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + ".jpg"
            width = mapEntries.find(m => m.location == this.props.location).bgMapDimension.width
            height = mapEntries.find(m => m.location == this.props.location).bgMapDimension.height
        }
        return(
            <Draggable
                bounds={{top:-500, left:-500, right:500, bottom:500}}
                onDrag={this.onControlledDrag}
                position={this.state.mapOffset}
                disabled={!this.state.movable}
            >
                <div>

                <div
                    style={{width: width, height: height, transform: 'scale('+ this.state.scale*scale + ')'}}
                    onWheel={(e)=>{this.scrollToZoom(e)}}
                    className={"map"}
                >
                    {this.loadMapBg()}
                    {this.loadAnnotate()}
                    {this.loadMapTop(pathname, level)}
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
        // let width=this.state.annotateDimension.w, height=this.state.annotateDimension.h
        let width,height
        if (this.state.tactical){
            width = mapEntries.find(m => m.location == this.props.location).tacMapDimension.width
            height = mapEntries.find(m => m.location == this.props.location).tacMapDimension.height
        }
        else {
            width = mapEntries.find(m => m.location == this.props.location).orgMapDimension.width
            height = mapEntries.find(m => m.location == this.props.location).orgMapDimension.height
        }
        let annotateArgs = {
            ref: this.annotateRef,
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
            mode: this.state.annotateMode,
            tactical: this.state.tactical
        }
        let res =
                <Annotate {...annotateArgs}/>

        return res
    }

    loadIconSVG(ret){
        return {__html: ret}
    }

    setOpsMenuDisplay(){
        if (this.state.opsMenuDisplay == "none"){
            this.setState({opsMenuDisplay: "flex"})
        }else{
            this.setState({opsMenuDisplay: "none"})
        }
    }

    recenter = (e) => {
        this.setState({mapOffset:{x:0, y:0}})
    }

    changeLevel(level){
        this.setState({currentLevel: level})
        this.bgOffset()
    }

    changeTacticalMode(){
        this.setState({tactical: !this.state.tactical})
        // console.log(!this.state.tactical, this.state.tactical)
    }

    render() {
        let currentMapObj = mapEntries.find(item => item.location==this.state.location)
        return (
            <div>
                <Sidebar
                    location={currentMapObj.location}
                    levels={currentMapObj.levels}
                    annotateDisplaySwitch={this.annotateDisplaySwitch}
                    annotateMode={this.state.annotateMode}
                    annotateDisplay={this.state.annotateDisplay}
                    annotateState={this.state.annotateState}
                    handleClearPoints={this.annotateClearPoints}
                    tacticalModeHandler={this.changeTacticalMode}
                    tactical={this.state.tactical}
                    movable={this.state.movable}
                    changeMovable={this.changeMovable}
                    changeLevel={this.changeLevel}
                    recenter={this.recenter}
                    switchAnnotateMode={this.switchAnnotateMode}
                    panels={this.state.panels}
                    panelHandler={this.setPanelNo}
                    handleOps={this.setOpsMenuDisplay}
                />
                {this.loadPanels()}
                <R6props display={this.state.opsMenuDisplay}/>
            </div>
        )
    }

}

export default Map
