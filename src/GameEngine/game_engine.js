import React, {useEffect, useState} from "react"
import * as log from "loglevel"
import Entity from "./Entity.js"

const frameTime = 1000 / 60 // 60fps


export default class GameEngine extends React.Component { 
    constructor(props){
        super(props)
        this.state = {state:new Map()}
        this.id = (x, s) => x
        this.entity = new Entity("e", this.state.state, [[
            "x",
            [(x, s) => (s.get("everySecond")[1][0] ? x + 1 : x), 1]
        ],
        ["y", [this.id, 1]],
        ["img", [this.id, "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg"]]
        ])
    }
    getVal = name => this.state.state.get(name)[1]
    timer = (x,s) => {
        if(this.getVal("time") - x[1] >= x[2]){
            return [true,this.getVal("time"),x[2]]
        } else{
            return [false,x[1],x[2]]
        }
    }

    componentDidMount(){
        this.state.state.set("frameTime", [this.id,frameTime])
        this.state.state.set("time", [(x,s) => x+s.get("frameTime")[1],0])
        this.state.state.set("everySecond", [this.timer,[false,0,1000]])
        this.run()
    }

    updateState = (k,v) => {
        const nv = this.applyF(k,this.state.state)
        this.setState({state:this.state.state.set(k,[v[0],this.applyF(k,this.state.state)])})
    }
  
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
  
    applyF(key,state) {
        //store the pair
        let p = this.state.state.get(key)
  
        // apply the function to its value
        return p[0](p[1],this.state.state)
    }
  
    run = async () =>  {
        setInterval(()=>{
            for (let [key, value] of this.state.state) {
            //console.log(key + ' = ' + value[1]); // for testing
            // puts the new pair into nextState
                this.updateState(key,value)
            }
        },frameTime)
        // while (true) {
        //     this.setState({test:100})
        //     console.warn("test:",test)
        // setX(x+1)
        // console.warn("x:",x)
        // console.warn("x:",getVal(entity.x))
        // iterates through all key-value pairs in state
        // for (let [key, value] of state) {
        //     //console.log(key + ' = ' + value[1]); // for testing
        //     // puts the new pair into nextState
        //     this.updateState(key,value)
        // }
        // await sleep(frameTime)
        //await sleep(100); //for testing
    }
    render(){
    // console.warn("time:",state)
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
