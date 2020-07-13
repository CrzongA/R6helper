import React from "react"
import r6operators from "r6operators"
import ops from "r6operators";

class R6props extends React.Component{
    constructor() {
        super();
        this.state = {
            opsCoords: [],
            opsProps: [],
            maxOps: 27,

        }
        this.loadOps = this.loadOps.bind(this)
        this.selectOp = this.selectOp.bind(this)
        this.loadSelectedAtt = this.loadSelectedAtt.bind(this)
        this.loadSelectedDef = this.loadSelectedDef.bind(this)
    }


    loadOps(){
        let att=[], def=[]
        Object.keys(ops).forEach(item => {
            // console.log(ops[item].toSVG())
            if (ops[item].role=="Attacker" ) {
                att.push(
                        <div
                            key={ops[item].id}
                            className={"op-inMenu"}
                            style={{order:ops[item].index}}
                            onClick={(e)=>{this.selectOp(e, ops[item].id, ops[item].role)}}
                            dangerouslySetInnerHTML={{__html: ops[item].toSVG({class: "opSVG"})}}
                        />
                )
            }else if (ops[item].role=="Defender"){
                def.push(
                    <div
                        key={ops[item].id}
                        className={"op-inMenu"}
                        style={{order:ops[item].index}}
                        onClick={(e)=>{this.selectOp(e, ops[item].id, ops[item].role)}}
                        dangerouslySetInnerHTML={{__html: ops[item].toSVG({class: "opSVG"})}}
                    />
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

    selectOp(e, id, role){
        id.toLowerCase()
        let attackers = this.props.selectedOps.attack
        let defenders = this.props.selectedOps.defense
        if (attackers.includes(id)){

        }
        else if(defenders.includes(id)){

        }
        else{
            if(role=="Attacker"){
                if (!(attackers.length>=5))
                attackers.push(id)
                // console.log("selected "+id)
            }
            else if (role=="Defender"){
                if (!(defenders.length>=5))
                defenders.push(id)
                // console.log("selected "+id)
            }
        }
        this.props.setOps(attackers, defenders)
    }

    loadSelectedAtt(){
        let ret=[]
        this.props.selectedOps.attack.forEach(o => {
            let op={}
            Object.keys(ops).some(id => {
                if (id==o){
                    op=ops[id]
                    // console.log(op)
                }
            })
            ret.push(
                <div key={op.index} className={"op-inSelected"} dangerouslySetInnerHTML={{__html: op.toSVG({class: "opSVG"})}}/>
        )
        })
        // console.log("load att")
        return(
            <div className={"selectedOps selectedAtt"} >
                {ret}
            </div>
        )
    }

    loadSelectedDef(){
        let ret=[]
        this.props.selectedOps.defense.forEach(o => {
            let op = {}
            Object.keys(ops).some(id => {
                if (id == o) {
                    op = ops[id]
                    // console.log(op)
                }
            })
            // console.log("load def")
            ret.push(
                <div key={op.index} className={"op-inSelected"}
                     dangerouslySetInnerHTML={{__html: op.toSVG({class: "opSVG"})}}/>
            )
        })
        return(
            <div className={"selectedOps selectedDef"} >
                {ret}
            </div>
        )
    }

    render(){
        return(
            <div>
                <div style={{display:this.props.display}} className={"opSelectMenu"}>
                    {this.loadOps()}
                </div>
                {this.loadSelectedAtt()}
                {this.loadSelectedDef()}
            </div>
        )
    }
}

export default R6props
