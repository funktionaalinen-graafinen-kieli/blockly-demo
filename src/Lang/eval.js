// Class to test out lang features
import {add} from './lang';

export default function EvalFunc() {
    var test = `
            {
                "e1": {
                    "x": ["(x, s) => (s.get('everySecond')[1][0] ? x + 1 : x)", 1],
                    "y": ["(x,s) => x", 1],
                    "img": ["(x,s) => x", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg" ]
                }
            }
            
            `

    var t = JSON.parse(test)
    var el = {}
    Object.keys(t).forEach(e => {
        el[e] = []
        Object.keys(t[e]).forEach(v => {
            console.log(t[e])
            el[e].push(v)
            t[e][v][0] = eval(t[e][v][0])        
        })
    })
    //console.log(t)
    return(t)
}
