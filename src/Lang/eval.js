// Class to test out lang features
const {add,timer,get,id,pack,infix,cond,packF,lt,gt,sin,mul} =  require('./lang');

export default function EvalFunc(flang) {

    var js = JSON.parse(flang)
    Object.keys(js["entities"]).forEach(e => {
        Object.keys(js["entities"][e]).forEach(v => {
            js["entities"][e][v][0] = eval(eval(js["entities"][e][v][0]))
        })
    })
    Object.keys(js["events"]).forEach(e => {
        js["events"][e][0] = eval(eval(js["events"][e][0]))
    })
    console.log(js)
    return(js)
}
