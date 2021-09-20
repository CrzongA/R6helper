import React from "react"
import ops from "r6operators";
import ops_json from "./operators.json"
import gadgets from "./gadgets.json"

class R6props extends React.Component{
    constructor() {
        super();
        this.state = {
            opsCoords: [],
            opsProps: [],
            maxOps: 27,
            gadTab: "att"
        }
        this.attGadgets=[]
        this.defGadgets=[]

        this.loadOps = this.loadOps.bind(this)
        this.selectOp = this.selectOp.bind(this)
        this.loadSelectedAtt = this.loadSelectedAtt.bind(this)
        this.loadSelectedDef = this.loadSelectedDef.bind(this)
        this.loadGadgets = this.loadGadgets.bind(this)
        this.switchGadTab = this.switchGadTab.bind(this)
    }

    componentDidMount() {
        // console.logds                 (gadgets)
        // console.log(ops)
    }

    componentDidUpdate(){
        this.loadOps()
        this.loadGadgets()
    }

    toSVG(op){
        let pathname = "resources/operators/"+op+".svg"
        return
    }

    loadOps(){
        let att=[], def=[]
        // console.log(ops)
        Object.keys(ops).forEach(item => {
            if (ops[item].role=="Attacker" ) {
                att.push(
                    <div
                        key={item}
                        className={"op-inMenu"}
                        style={{order:ops[item].index}}
                        onClick={(e)=>{this.selectOp(e, ops[item].id, ops[item].role)}}
                        dangerouslySetInnerHTML={{__html: ops[item].toSVG({class: "opSVG"})}}
                    />
                )
            } else if (ops[item].role=="Defender"){
                def.push(
                    <div
                        key={item}
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

    loadGadgets(){
        Object.keys(gadgets).forEach(item=>{
            if (gadgets[item].role=="attacker"){
                this.attGadgets.push(
                    <div
                        key={gadgets[item].id}
                        className={"gad-inMenu"}
                        onClick={e=>{this.addIcon()}}
                    >
                        <img src={gadgets[item].filepath}/>
                    </div>
                )
            }
            else if (gadgets[item].role=="defender"){
                this.defGadgets.push(
                    <div
                        key={gadgets[item].id}
                        className={"gad-inMenu"}
                        onClick={e=>{this.addIcon()}}
                    >
                        <img src={gadgets[item].filepath}/>
                    </div>
                )
            }
        })

        let gad = this.attGadgets
        // if (this.state.gadTab == "att") gad = attGadgets
        // else gad = defGadgets

        return(
            <div className={"gadTab-wrapper"}>
                <div className={"gadTab-selector"}>
                    <div className={"gadTab selected"}><p>Attacker</p></div>
                    <div className={"gadTab"}><p>Defender</p></div>
                </div>
                <div className={"gadTab-display"}>
                    {gad}
                </div>
            </div>
        )
    }

    switchGadTab(){
        if (this.state.gadTab == "att")
            this.setState({gadTab: "def"})
        else this.setState({gadTab: "att"})
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
                <div style={{display:this.props.opDisplay}} className={"opSelectMenu"}>
                    {this.loadOps()}
                </div>
                <div style={{display:this.props.gadgetSelectDisplay}} className={"gadgetSelectMenu"}>
                    {this.loadGadgets()}
                </div>
                {this.loadSelectedAtt()}
                {this.loadSelectedDef()}

            </div>
        )
    }
}

export default R6props
