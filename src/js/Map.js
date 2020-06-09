import React from "react"
import Draggable from "react-draggable";
// import styles from "../scss/map.scss"

class Map extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            level: this.props.level,
            scale: 1,
            panels: "2",
            mapPosition: {x:-50,y:-50}
        }
        this.loadMapImg.bind(this)
        this.loadLevelChooser.bind(this)
        this.loadPanels.bind(this)
        this.scrollToZoom.bind(this)
        this.onControlledDrag.bind(this)
    }

    scrollToZoom(e){
        e.preventDefault();
        this.setState( {scale: this.state.scale += e.deltaY * 0.01})
        console.log(e)
    }

    loadMapImg(level){
        let pathname = "../../resources/maps/" + this.state.title + "/" + this.state.title + "-" + level + ".jpg"
        let mapimg = new Image()
        mapimg.onload = () => {console.log(mapimg.width + " "+ mapimg.height)}
        mapimg.src=pathname
        return(
            <Draggable
                bounds={{top:-250, left:-500, right:500, down:250}}
                onDrag={()=>{this.onControlledDrag}}
            >
                <div onWheel={this.scrollToZoom} className={"map"}>
                <img draggable={false} className={"map-content"} src={pathname} />
                </div>
            </Draggable>
        )
    }

    onControlledDrag= (e, position)=>{
        const {x, y} = position;
        this.setState({mapPosition: {x, y}})
    }

    loadLevelChooser(){
        let content=[]
        for (let i=0; i<this.state.level; i++){
            content.push(
                <span><label htmlFor={`level${i+1}`}>{`Level ${i+1}`}</label><input type="radio" id={`level${i+1}`} name="level"/><br/></span>
            )}
        console.log(content)
        return content
    }

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
                {this.loadPanels()}
                <div className={"levelChooser"}>
                    {this.loadLevelChooser()}
                </div>
            </div>
        )
    }

}

export default Map
