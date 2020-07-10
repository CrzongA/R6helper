import React from "react"
import r6operators from "r6operators"
import ops from "r6operators";

class R6props extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedOps: {attack: [], defense: []},
            opsCoords: [],
            opsProps: [],
        }
        this.loadOps = this.loadOps.bind(this)
    }


    loadOps(){
        let att=[], def=[]
        Object.keys(ops).forEach(item => {
            // console.log(ops[item].toSVG())
            if (ops[item].role=="Attacker" ) {
                att.push(
                    <div key={ops[item].id} className={"op"}>
                        <div dangerouslySetInnerHTML={{__html: ops[item].toSVG()}}/>
                    </div>
                )
            }else if (ops[item].role=="Defender"){
                def.push(
                    <div key={ops[item].id} className={"op"}>
                        <div dangerouslySetInnerHTML={{__html: ops[item].toSVG()}}/>
                    </div>
                )

            }
        })
        return(
            <div>
                <div className={"osm-sub divider"}>
                    <p>Attackers</p>
                    {att}
                </div>
                <div className={"osm-sub"}>
                    <p>Defenders</p>
                    {def}
                </div>
            </div>
        )
    }

    render(){
        let icons=[]
        Object.keys(ops).forEach(item => {
            // console.log(ops[item].toSVG())
            icons.push(
                <div key={ops[item].id} className={"op"}>
                    <div dangerouslySetInnerHTML={{__html:ops[item].toSVG()}}/>
                </div>
            )
        })
        return(
            <div style={{display:this.props.display}} className={"opSelectMenu"}>
                {this.loadOps()}
            </div>
        )
    }
}

export default R6props
