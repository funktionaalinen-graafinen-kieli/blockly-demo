import {langEval} from "./lang"

export default function EvalFunc(sourceCode) {
    let js = JSON.parse(sourceCode)
    const entities = js["entities"]
    Object.keys(entities).forEach(key => {
        Object.keys(entities[key]).forEach(v => {
            const entity = entities[key][v]
            entity[0] = langEval(entity[0])
        })
    })
    const events = js["events"]
    Object.keys(events).forEach(key => {
        const event = events[key]
        event[0] = langEval(event[0])
    })
    console.log(js)
    return(js)
}
