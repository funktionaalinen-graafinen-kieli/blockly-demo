import {langEval} from "./lang"

export default function EvalFunc(sourceCode) {
    let js = JSON.parse(sourceCode)
    Object.keys(js["entities"]).forEach(key => {
        Object.keys(js["entities"][key]).forEach(v => {
            const entity = js["entities"][key][v]
            entity[0] = langEval(entity[0])
        })
    })
    Object.keys(js["events"]).forEach(key => {
        const event = js["events"][key]
        event[0] = langEval(event[0])
    })
    console.log(js)
    return(js)
}
