import React, {useEffect, useState} from "react"
import * as log from "loglevel"
import Entity from "./Entity.js"
import {id,frameTime} from "./utils"


export default class GameEngine extends React.Component { 
    constructor(props){
        super(props)

        this.state = {state: new Map(), entities: []}
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
                this.updateState(key,value)
            }
        },frameTime)
    }

    render(){
        this.props.setState(this.state.state)
        if (this.state.entities.length == 0) return null
        return (
            <div style={{backgroundColor: "green", width: "100%", height: "100%"}}
                ref={this.gameArea}
            >
                { this.state.entities.map((entity,key) =>  
                    <div key={key}>
                        <img
                            style={{width: 50, height: 50, position:"absolute", left: this.getVal(entity.x), top: this.getVal(entity.y)}}
                            src={this.getVal(entity.img)}
                        />
                    </div>
                )
                }
            </div>
        )}
}
