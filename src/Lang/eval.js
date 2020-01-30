// Class to test out lang features
const {add,timer,get,id} =  require('./lang');

export default function EvalFunc() {
    var test = `
            {
                "entities": {
                    "e1": {
                        "x": ["(x,s) => add(1)", 1],
                        "y": ["id", 1],
                        "img": ["id", "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/golden-retriever-dog-royalty-free-image-505534037-1565105327.jpg" ]
                    }
                },
                "events": {
                    "frameTime": ["id", 16],
                    "time": ["id", 0],
                    "everySecond": ["id", [false, 0, 1000]]
                }
            }
            
            `

    var t = JSON.parse(test)
    Object.keys(t["entities"]).forEach(e => {
        Object.keys(t["entities"][e]).forEach(v => {
            t["entities"][e][v][0] = eval(t["entities"][e][v][0])        
        })
    })
    Object.keys(t["events"]).forEach(e => {
        t["events"][e][0] = eval(t["events"][e][0])        
    })
    console.log(t)
    return(t)
}
