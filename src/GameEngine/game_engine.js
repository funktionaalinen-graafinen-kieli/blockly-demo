import React, {useEffect, useState} from "react"
import * as log from "loglevel"
import Entity from "./Entity.js"
import {id,frameTime} from "./utils"

class MapWithDefault extends Map {
  get(key) {
    if (!this.has(key)) return this.default();
    return super.get(key);
  }
  
  constructor(defaultFunction, entries) {
    super(entries);
    this.default = defaultFunction;
  }
}

export default class GameEngine extends React.Component { 
    constructor(props){
        super(props)

        this.state = {state: new MapWithDefault(()=> [(x,s)=>x,false]), entities: [], keymap: new Map()}
        console.log(this.props.objectList)
        this.gameArea = React.createRef()
    }

    getVal = name => this.state.state.get(name)[1]


    componentDidMount(){
        Object.keys(this.props.objectList["entities"]).forEach(entityName => {
            this.state.entities.push(new Entity(this.state.state, entityName, this.props.objectList["entities"][entityName]))
        })
        Object.keys(this.props.objectList["events"]).forEach(eventName => {
            this.state.state.set(eventName,this.props.objectList["events"][eventName])
        })
        //this.state.state.setDefault = key => [(x,s) => x,false]
        console.log(this.state.state.get("key_a"))
        //this.props.addEvents(this.state.state,this.timer)
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
                this.saveKeysToState()
                this.updateState(key,value)
            }
        },frameTime)
    }

    handleKeyDown = (e) =>
    {
        this.state.keymap.set(e.key,true)
        //console.log("down",e.key)
    }

    handleKeyUp = (e) =>
    {
        this.state.keymap.set(e.key,false)
        //console.log("up",e.key)
    }

    saveKeysToState = () =>
    {
        Array.from(this.state.keymap,([k,v]) => this.state.state.set("key_"+k,[(x,s) => x, v]))
        //console.log(this.state.state)
    }

    clamp = (num, min, max) => {
        return num <= min ? min : num >= max ? max : num
    }

    render(){
        this.props.setState(this.state.state)
        if (this.state.entities.length == 0) return null
        return (
            <div style={{backgroundColor: "green", width: "100%", height: "100%"}}
                ref={this.gameArea}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                tabIndex="0"
            >
                { this.state.entities.map((entity,key) =>  
                    <div key={key}>
                        <img
                            style={{width: 50, height: 50, position:"absolute", left: this.clamp(window.innerWidth*(this.getVal(entity.x)/1000),0,300), top: this.clamp(window.innerHeight*(this.getVal(entity.y)/1000),0,300)}}
                            src={this.getVal(entity.img)}
                        />
                    </div>
                )
                }
            </div>
        )}
}
