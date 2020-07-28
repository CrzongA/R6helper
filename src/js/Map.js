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
            selectedOps: {attack: [], defense: []},
            paths:{normal:[{level:"1",count:0,items:[]}],tactical:[{level:"1",count:0,items:[]}]}
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
        this.setMap = this.setMap.bind(this)
        this.loadIconSVG = this.loadIconSVG.bind(this)
        this.setOpsMenuDisplay = this.setOpsMenuDisplay.bind(this)
        this.loadMapBg = this.loadMapBg.bind(this)
        this.loadMapTop = this.loadMapTop.bind(this)
        this.updatePaths = this.updatePaths.bind(this)
        this.clearPaths = this.clearPaths.bind(this)
        this.updatePathCount = this.updatePathCount.bind(this)
        this.setSelectedOps = this.setSelectedOps.bind(this)
    }

    componentDidMount() {
        this.bgOffset()
        this.initPathsPlaceholder()
        this.annotateRef = React.createRef()
    }

    initPathsPlaceholder(){
        let pathsPlaceholder={normal:[],tactical:[]}
        for (let i=this.state.tMinLevel; i<this.state.tMinLevel+this.state.tLevelCount;i++) {
            pathsPlaceholder.tactical.push({level: i, count: 0, items: []})
        }
        for (let i=this.state.minLevel; i<this.state.minLevel+this.state.levelCount;i++){
            pathsPlaceholder.normal.push({level:i,count:0,items:[]})
        }
        this.setState({paths:pathsPlaceholder})
    }

    updatePaths(data, level){
            let existPath = this.state.paths
            if (this.state.tactical) {
                let currentLevelPath = existPath.tactical.find(i=>i.level==level)
                // if (!currentLevelPath){
                //     currentLevelPath={level:level,count:0,items:[]}
                //     existPath.tactical.push(currentLevelPath)
                // }
                currentLevelPath.items[currentLevelPath.count] += data
                this.setState({paths:existPath})
            }
            else {
                let currentLevelPath = existPath.normal.find(i=>i.level==level)
                // if (!currentLevelPath){
                //     currentLevelPath={level:level,count:0,items:[]}
                //     existPath.normal.push(currentLevelPath)
                // }
                currentLevelPath.items[currentLevelPath.count] += data
                this.setState({paths:existPath})
            }
    }

    updatePathCount(level){
        let currentLevelPath,existPaths
        if (this.state.tactical) {
            existPaths = this.state.paths
            currentLevelPath = existPaths.tactical.find(i => i.level == level)
        }
        else {
            existPaths = this.state.paths
            currentLevelPath = existPaths.normal.find(i => i.level == level)
        }
        currentLevelPath.count +=1
        this.setState({paths: existPaths})
    }

    clearPaths(){
        console.log("clear paths")
        this.initPathsPlaceholder()
    }



    presetSVGid(){
        return
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

    // Handler for changing the map to a different location
    setMap(map){
        this.initPathsPlaceholder()
        this.setState({
            location: map,
            minLevel: mapEntries.find(i=>i.location==map).lowestLevel,
            levelCount:mapEntries.find(i=>i.location==map).levelCount,
            tMinLevel:mapEntries.find(i=>i.location==map).tacticalLowestLevel,
            tLevelCount:mapEntries.find(i=>i.location==map).tacticalLevelCount,
            currentLevel: 1,
        })
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


    bgOffset(){
        let bgoffset = mapEntries.find(loc=>loc.location==this.state.location).bgOffset
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
        if (!this.state.tactical) {
            let loc = mapEntries.find(m => m.location == this.state.location).levels
            let bgLevel = loc.find(l => l.background==true).index
            let pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + bgLevel + ".jpg"
            return <img draggable={false} className={"map-content map-bg"} src={pathname}/>
        }
    }

    loadMapTop(pathname, level){
        let style
        if (!this.state.tactical && !mapEntries.find(m=>m.location==this.state.location).levels.find(l=>l.index==level).hasOwnProperty("background")){
            style = {transform: "translate("+this.state.bgOffset.x + "px," + this.state.bgOffset.y + "px)"}
        }
        return (
            <img id={`map-${level}`}
                 style={style}
                 draggable={false}
                 className={"map-content"}
                 src={pathname} />
        )
    }

    loadMapImg(level){
        let pathname, width, height, scale=1, minlevel, levelcount
        switch(this.state.panels){
            default: scale = 1; break;
            case '1': scale = 1; break;
            case '2': scale = 0.7; break;
            case '4': scale = 0.5; break;
        }

        if (this.state.tactical){ // normal img width + height
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + "-t.jpg"
            width = mapEntries.find(m => m.location == this.state.location).tacMapDimension.width
            height = mapEntries.find(m => m.location == this.state.location).tacMapDimension.height
            minlevel=this.state.tMinLevel
            levelcount=this.state.tLevelCount
        }
        else{ // background img width + height
            pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + ".jpg"
            width = mapEntries.find(m => m.location == this.state.location).bgMapDimension.width
            height = mapEntries.find(m => m.location == this.state.location).bgMapDimension.height
            minlevel=this.state.minLevel
            levelcount=this.state.levelCount
        }
        if (level===undefined||level==null||(level<minlevel||level>minlevel+levelcount)){
            return
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
                    {this.loadAnnotate(level)}
                    {this.loadMapTop(pathname, level)}
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
            let leftLevel, rightLevel, minLevel, levels;
            if(this.state.tactical){
                levels=this.state.tLevelCount
                minLevel = this.state.tMinLevel
            }
            else{
                levels = this.state.levelCount
                minLevel = this.state.minLevel
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
            let leftTop, rightTop, leftBottom, rightBottom, minLevel, levelcount;
            if(this.state.tactical){
                levelcount=this.state.tLevelCount
                minLevel = this.state.tMinLevel
            }
            else{
                levelcount = this.state.levelCount
                minLevel = this.state.minLevel
            }
            if (this.state.currentLevel+2<minLevel+levelcount-1){
                leftTop = this.state.currentLevel
                rightTop = this.state.currentLevel+1
                leftBottom = this.state.currentLevel+2
                rightBottom = this.state.currentLevel+3
            }
            else if (this.state.currentLevel+1<minLevel+levelcount-1){
                leftTop = this.state.currentLevel-1
                rightTop = this.state.currentLevel
                leftBottom = this.state.currentLevel+1
                rightBottom = this.state.currentLevel+2
            }
            else if (this.state.currentLevel<minLevel+levelcount-1){
                leftTop = this.state.currentLevel-2
                rightTop = this.state.currentLevel-1
                leftBottom = this.state.currentLevel
                rightBottom = this.state.currentLevel+1
            }
            else if (this.state.currentLevel-1<minLevel+levelcount-1){
                leftTop = this.state.currentLevel-3
                rightTop = this.state.currentLevel-2
                leftBottom = this.state.currentLevel-1
                rightBottom = this.state.currentLevel
            }
            console.log(leftTop, rightTop, leftBottom, rightBottom)
            res =
                <div className={"panel-wrapper"}>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(leftTop)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(rightTop)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(leftBottom)}
                    </div>
                    <div className={"map-wrapper fourmaps"}>
                        {this.loadMapImg(rightBottom)}
                    </div>
                </div>
        }

        return res
    }

    loadAnnotate(level){
        // let width=this.state.annotateDimension.w, height=this.state.annotateDimension.h
        let width,height,paths
        if (this.state.tactical){
            width = mapEntries.find(m => m.location == this.state.location).tacMapDimension.width
            height = mapEntries.find(m => m.location == this.state.location).tacMapDimension.height
            paths = this.state.paths.tactical.find(i => i.level==level)
        }
        else {
            width = mapEntries.find(m => m.location == this.state.location).bgMapDimension.width
            height = mapEntries.find(m => m.location == this.state.location).bgMapDimension.height
            paths = this.state.paths.normal.find(i => i.level==level)
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
            tactical: this.state.tactical,
            level: level,
            paths: paths,
            updatePaths: this.updatePaths,
            updatePathCount: this.updatePathCount,
            clearPaths: this.clearPaths
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
        let invalidLevel = (this.state.currentLevel>=this.state.tMinLevel+this.state.tLevelCount)
        if (!(this.state.tactical) && invalidLevel){
            this.setState({currentLevel: 1})
        }
        // console.log(!this.state.tactical, this.state.tactical)
    }

    setSelectedOps(atts, defs){
        this.setState({selectedOps:{attack:atts, defense:defs}})
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
                    handleClearPoints={this.clearPaths}
                    tacticalModeHandler={this.changeTacticalMode}
                    tactical={this.state.tactical}
                    movable={this.state.movable}
                    changeMovable={this.changeMovable}
                    changeLevel={this.changeLevel}
                    recenter={this.recenter}
                    switchAnnotateMode={this.switchAnnotateMode}
                    panels={this.state.panels}
                    panelHandler={this.setPanelNo}
                    mapHandler={this.setMap}
                    handleOps={this.setOpsMenuDisplay}
                />
                {this.loadPanels()}
                <R6props
                    display={this.state.opsMenuDisplay}
                    setOps={this.setSelectedOps}
                    selectedOps={this.state.selectedOps}
                />
            </div>
        )
    }

}

export default Map
