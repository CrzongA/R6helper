import React from "react"
import Draggable from "react-draggable";
// import styles from "../scss/map.scss"
import Sidebar from "./Sidebar";

import maps from "./mapEntries"

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            sidebarPos: "top",
            location: this.props.location,
            level: this.props.level,
            scale: 1,
            panels: "2",
            mapPosition: {x:-50,y:-50}
        }
        this.maps = maps
        this.loadMapImg.bind(this)
        // this.loadLevelChooser.bind(this)
        this.loadPanels.bind(this)
        this.scrollToZoom.bind(this)
        this.onControlledDrag.bind(this)
    }

    scrollToZoom(e){
        e.preventDefault();
        let scale = this.state.scale
        scale += e.deltaY * -0.05
        scale = Math.min(Math.max(.5, scale), 2.5)

        this.setState( {scale: scale})
        console.log(this.state.scale, e.deltaY)
    }

    onControlledDrag= (e, position)=>{
        const {x, y} = position;
        this.setState({mapPosition: {x, y}})
    }

    loadMapImg(level){
        let pathname = "../../resources/maps/" + this.state.location + "/" + this.state.location + "-" + level + ".jpg"
        return(
            <Draggable
                bounds={{top:-250, left:-500, right:500, down:250}}
                onDrag={this.onControlledDrag}
                position={this.state.mapPosition}
            >
                <div>
                <div style={{transform: 'scale('+ this.state.scale + ')'}}
                     onWheel={(e)=>{this.scrollToZoom(e)}}
                     className={"map"}>
                <img draggable={false} className={"map-content"} src={pathname} />
                </div>
                </div>
            </Draggable>
        )
    }

/*    loadLevelChooser(){
        let content=[]
        for (let i=0; i<this.state.level; i++){
            content.push(
                <span key={i}><label htmlFor={`level${i+1}`}>{`Level ${i+1}`}</label><input type="radio" id={`level${i+1}`} name="level"/><br/></span>
            )}
        // console.log(content)
        return content
    }*/

    loadPanels(){
        let res;
        if (this.state.panels=="1"){
            res =
            <div className={"panel-wrapper"} >
            <div className={"map-wrapper onemap"} >
                    {this.loadMapImg(this.state.level)}
            </div>
            </div>

        }
        else if (this.state.panels=="2"){
            res =
            <div className={"panel-wrapper"} >
            <div className={"map-wrapper twomaps"}>
                    {this.loadMapImg(this.state.level)}
            </div>
            <div className={"map-wrapper twomaps"}>
                    {this.loadMapImg(this.state.level+1)}
            </div>
            </div>

        }

        return res
    }

    render() {
        return (
            <div>
                <Sidebar location={this.maps.bank.location} levels={this.maps.bank.levels}/>
                {this.loadPanels()}
                <div className={"levelChooser"}>
                </div>
            </div>
        )
    }

}

export default Map
