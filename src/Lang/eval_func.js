import * as log from "loglevel"
// Class to test out lang features
const {add,timer,get,id,pack,infix,cond,packF,lt,gt,sin,mul} =  require('./lang');

export default function EvalFunc(flang) {

    let js = JSON.parse(flang)
    Object.keys(js["entities"]).forEach(key => {
        Object.keys(js["entities"][key]).forEach(v => {
            const entity = js["entities"][key][v]
            entity[0] = eval(eval(entity[0]))
        })
    })
    Object.keys(js["events"]).forEach(key => {
        const event = js["events"][key]
        event[0] = eval(eval(event[0]))
    })
    console.log(js)
    return(js)
}
