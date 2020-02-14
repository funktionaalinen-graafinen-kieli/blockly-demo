import { langEval } from "./lang"

export default function evalFunc(sourceCode) {
    let js = JSON.parse(sourceCode)
    const entities = js["entities"]
    Object.keys(entities).forEach(key => {
        Object.keys(entities[key]).forEach(v => {
            const entity = entities[key][v]
            entity[0] = langEval(entity[0])
        })
    })
    const binds = js["binds"]
    Object.keys(binds).forEach(key => {
        const event = binds[key]
        event[0] = langEval(event[0])
    })
    // console.log(js)
    return(js)
}
