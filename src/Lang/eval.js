// Class to test out lang features
const {add,timer,get,id,pack,infix} =  require('./lang');

export default function EvalFunc() {
    var test = `
            {
                "entities": {
                    "e1": {
                        "x": ["pack(add(1))", 1],
                        "y": ["pack(id)", 1],
                        "img": ["pack(id)", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg" ]
                    }
                },
                "events": {
                    "frameTime": ["pack(id)", 16],
                    "time": ["pack(id)", 0],
                    "everySecond": ["pack(id)", [false, 0, 1000]]
                }
            }
            
            `

    var t = JSON.parse(test)
    Object.keys(t["entities"]).forEach(e => {
        Object.keys(t["entities"][e]).forEach(v => {
            t["entities"][e][v][0] = eval(eval(t["entities"][e][v][0]))
        })
    })
    Object.keys(t["events"]).forEach(e => {
        t["events"][e][0] = eval(eval(t["events"][e][0]))
    })
    console.log(t)
    return(t)
}
