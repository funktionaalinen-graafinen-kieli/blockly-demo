import React, {useEffect, useState} from "react"
import * as log from "loglevel"
import Entity from "./Entity.js"
import {id,frameTime} from "../utils"


export default class GameEngine extends React.Component { 
    constructor(props){
        super(props)

        this.state = {state: new Map()}
        
        this.entity = new Entity("e", this.state.state, props.entityList[0])
    }

    getVal = name => this.state.state.get(name)[1]

    timer = (x,s,time) => this.getVal("time") - x[1] >= x[2] ? [true,this.getVal("time"),x[2]] : [false,x[1],x[2]]

    componentDidMount(){
        this.props.addEvents(this.state.state,this.timer)
        this.run()
    }

    updateState = (k,v) => {
        this.setState({state:this.state.state.set(k,[v[0],this.applyF(k,this.state.state)])})
    }
  
    applyF(key,state) {
        let p = this.state.state.get(key)
        return p[0](p[1],this.state.state)
    }
  
    run = async () =>  {
        setInterval(()=>{
            for (let [key, value] of this.state.state) {
                this.updateState(key,value)
            }
        },frameTime)
    }

    render(){
        return (
            <div>
                <img style={{width: 500, height: 500, backgroundColor: "red", position:"absolute", left:0, top:0}}/>
                <img
                    style={{width: 20, height: 20, position:"absolute", left: this.getVal(this.entity.x), top: this.getVal(this.entity.y)}}
                    src={this.getVal(this.entity.img)}
                />
            </div>
        )}
}
