export const frametime = () => 1000 / 60

// posFactor: multiplies x and y before clamp. used to scale position.
export const posFactor = () => 1/2000

export const imgSize = () => {
    return({
        width: 50,
        height: 50,
    })
}

export const gameboard = () => {
    return({
        size: {
            width: 500,
            height: 500,
        },
        containerStyle: {
            backgroundColor: "green",
            width: "100%",
            height: "100%",
        }
    })
}
