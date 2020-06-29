import React from "react"
import ReactDOM from "react-dom"
import Konva from "konva"
import {Stage, Layer, Rect, Text, Path,} from 'react-konva'

class Annotate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
            panels: this.props.panels,
            cursorCoordinates: {lx: 0, ly: 0},
            path: [''],
            pathCount: 0,
            prevMoveXY:{x:0, y:0},
            prevOffset: {x:0,y:0},
            offset: {x:0,y:0},
            mode:"move",
            painting:false
        }
        this.draw = this.draw.bind(this)
        this.addPoint = this.addPoint.bind(this)
        this.closePath = this.closePath.bind(this)
        this.handleMouseDown = this.handleMouseDown.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleMouseMove = this.handleMouseMove.bind(this)
        this.handleMouseUp = this.handleMouseUp.bind(this)
        this.updateCursor = this.updateCursor.bind(this)
        this.clearPoints = this.clearPoints.bind(this)
        this.switchMode = this.switchMode.bind(this)
        this.loadPanels = this.loadPanels.bind(this)

    }

    componentDidMount() {
        this.setState({
            prevOffset: this.props.mapOffset,
            offset: this.props.mapOffset
        })
    }

    updateOffset(){
        this.setState({offset:this.props.offset})
    }

    updateCursor(e) {
        let ScursorX = e.evt.screenX
        let ScursorY = e.evt.screenY
        let PcursorX = e.evt.pageX
        let PcursorY = e.evt.pageY
        return {ScursorX, ScursorY, PcursorX, PcursorY}
    }

    draw() {
        let pathItem, allItems = [], i = 0;
        for (pathItem of this.state.path) {
            let pathProps = {
                data: pathItem,
                stroke: 'red',
                // fill: 'black',
                scale: {x: 1, y: 1},
                offsetX: this.props.annotateOffset.x,
                offsetY: this.props.annotateOffset.y
            }
            allItems.push(<Path key={i} {...pathProps}/>)
            i++
        }
        // console.log(allItems)
        return allItems
    }

    addPoint(x, y, start = false) {
        let pathItem
        if (start) {
            pathItem = 'M' + x + ' ' + y + ' '
        } else {
            pathItem = 'L' + x + ' ' + y + ' '
        }
        let existPath = this.state.path
        // console.log(this.state.path)
        existPath[this.state.pathCount] += (pathItem)
        this.setState({path: existPath})
    }

    switchMode = (e) => {
        if(!this.props.movable){
            console.log("move mode")
            this.setState({mode: 'move'})
            this.props.changeMovable()
        }
        else if (this.props.movable){
            console.log("draw mode")
            this.setState({mode: 'draw'})
            this.props.changeMovable()
        }
    }

    closePath() {
        let existPath = this.state.path
        // existPath[this.state.pathCount]+="z"
        this.setState({path: existPath})
    }

    handleMouseDown = (e) => {
        let cursorX = e.evt.layerX
        let cursorY = e.evt.layerY
        // console.log("click "+ cursorX + " "+ cursorY)
        // console.log(e.currentTarget, e.target.content.className)
        // console.log(e.evt.screenX, e.evt.screenY)
        if (!this.props.movable && this.state.mode=="draw") {
            this.setState({painting: true})
            this.addPoint(cursorX+this.props.annotateOffset.x, cursorY+this.props.annotateOffset.y, true)
        }
        else if (this.props.movable){
            this.setState({prevMoveXY:{x:cursorX, y:cursorY}})
            // this.props.dragHandler(null, {x:cursorX, y:cursorY})
            this.props.changeMoving(true)
        }

    }

    handleMouseMove = (e) => {
        let cursorX = e.evt.layerX
        let cursorY = e.evt.layerY
        console.log(e.evt.layerX, e.evt.layerY)

        if (this.state.painting) {
            this.addPoint(cursorX+this.props.annotateOffset.x, cursorY+this.props.annotateOffset.y)
        }
        else if (this.props.movable && this.props.moving){
            let origin = this.state.prevMoveXY
            let prevOffset = this.props.mapPrevOffset
            let MmoveX = cursorX - origin.x + prevOffset.x
            let MmoveY = cursorY - origin.y + prevOffset.y
            let DmoveX = origin.x - cursorX + prevOffset.x
            let DmoveY = origin.y - cursorY + prevOffset.y
            this.props.dragHandler(null, {x:MmoveX, y:MmoveY})
            this.props.changeAnnotateOffset({x:DmoveX, y:DmoveY})
        }
        this.setState({
            cursorCoordinates: {
                lx: cursorX,
                ly: cursorY
            }
        })
    }

    handleMouseUp = (e) => {
        let cursorX = e.evt.layerX
        let cursorY = e.evt.layerY
        if (this.state.painting) {
            this.setState({pathCount: this.state.pathCount + 1, painting:false})
        }
        else if (this.props.movable){
            this.setState({prevMoveXY:{x:0, y:0}, prevOffset:this.props.mapOffset})
            this.props.changeMapPrevOffset(this.props.mapOffset)
            // this.props.dragHandler()
            // this.props.dragHandler(null, {x:cursorX, y:cursorY})
            this.props.changeMoving(false)
        }
    }

    handleMouseLeave = (e) => {
        this.setState({painting: false, prevMoveXY:{x:0, y:0}, prevOffset:this.props.mapOffset})
        this.props.changeMapPrevOffset(this.props.mapOffset)
        this.props.changeMoving(false)
    }

    clearPoints = (e) => {
        console.log("clear paths")
        this.setState({path:[]})
    }

    loadPanels(){
        let ret =''
        for (let i=0; i<this.state.panels;i++){
            ret =
            <Stage
                width={this.props.width}
                height={this.props.height}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}
                onMouseLeave={this.handleMouseLeave}
            >
                <Layer>
                    {this.draw()}
                </Layer>
            </Stage>
        }
        return ret
    }

    render() {
        return (
            <div className={"annotate"} style={{display:this.props.display}}>
                <div className={"toolsWrapper"}>
                        <div className={"modeChooser cButton"} onClick={this.switchMode}>
                            <div>{this.state.mode}</div>
                        </div>
                    <div className={"clearPointsButton cButton"} onClick={this.clearPoints}>
                        <div>Clear</div>
                    </div>
                </div>
                <div className={"canvas"}>
                    {this.loadPanels()}
                </div>
            </div>
        )
    }
}

export default Annotate
