import { langEval } from "./lang"

export default function evalFunc(sourceCode) {
    // let js = JSON.parse(sourceCode)
    let js = sourceCode
    const entities = js["entities"]
    Object.keys(entities).forEach(key => {
        Object.keys(entities[key]).forEach(v => {
            const entity = entities[key][v]
            entity[0] = langEval(entity[0])
        })
    })
    const binds = js["binds"]
    Object.keys(binds).forEach(key => {
        const bind = binds[key]
        bind[0] = langEval(bind[0])
    })
    return js
}
