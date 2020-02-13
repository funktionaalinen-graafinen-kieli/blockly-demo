interface BlocklyWsOptions {
    readOnly: boolean,
    trashcan: boolean
    move: {
        scrollbars: boolean,
        drag: boolean,
        wheel: boolean
    },
    initialXml: string,
    renderer: string
}


const brokenDogeXml = `
        <xml xmlns="http://www.w3.org/1999/xhtml">
            <block type="funkly_entity">
                id: e1
                x: ["pack(add(1)(get('e1_x')))", 1],
                y: ["packF(id)", 0],
                img: ["packF(id)", "http://www.pngmart.com/files/11/Shiba-Inu-Doge-Meme-PNG-Image.png" ]
            </block>
            <block type="funkly_entity">
                id: e2
                "x": ["pack(cond(gt(get('time'))(3000))(add(2)(get('e2_x')))(get('e2_x')))", 1],
                "y": ["packF(id)", 60],
                "img": ["packF(id)", "https://www.pikpng.com/pngl/b/58-584318_doge-bread-clipart.png" ]
            </block>
            <block type="funkly_entity">
                id: e3
                "x": ["pack(add(1)(get('e3_x')))", 1],
                "y": ["pack(add(get('e3_y'))(mul(sin(mul(get('e3_x'))(0.02)))(1)))", 120],
                "img": ["packF(id)", "http://www.pngmart.com/files/11/Doge-Meme-PNG-Picture.png" ]
            </block>
            <block type="funkly_entity">
                id: e4
                "x": ["pack(cond(get('key_d'))(add(2)(get('e4_x')))(cond(get('key_a'))(add(-2)(get('e4_x')))(get('e4_x'))))", 1],
                "y": ["pack(cond(get('key_s'))(add(2)(get('e4_y')))(cond(get('key_w'))(add(-2)(get('e4_y')))(get('e4_y'))))", 180],
                "img": ["packF(id)", "http://www.pngmart.com/files/11/Doge-Meme-PNG-Picture.png" ]
            </block>
        </xml>`

export const BLOCKLYCONFIG: BlocklyWsOptions = {
    readOnly: false,
    trashcan: true,
    renderer: "funkly_renderer",
    move: {scrollbars: true, drag: false, wheel: true},
    initialXml: brokenDogeXml
}
