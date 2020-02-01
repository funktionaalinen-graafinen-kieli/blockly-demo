# funkly game engine
An example program:
```
{
"entities": {
    "e1": {
	"x": ["pack(cond(lt(get('e1_x'))(get('width')))(add(1)(get('e1_x')))(get('e1_x')))", 1],
	"y": ["packF(id)", 0],
	"img": ["packF(id)", "http://www.pngmart.com/files/11/Shiba-Inu-Doge-Meme-PNG-Image.png" ]
    },
    "e2": {
	"x": ["pack(cond(lt(get('e2_x'))(get('width')))(cond(gt(get('time'))(3000))(add(2)(get('e2_x')))(get('e2_x')))(get('e2_x')))", 1],
	"y": ["packF(id)", 60],
	"img": ["packF(id)", "https://www.pikpng.com/pngl/b/58-584318_doge-bread-clipart.png" ]
    },
    "e3": {
	"x": ["pack(cond(lt(get('e3_x'))(get('width')))(add(1)(get('e3_x')))(get('e3_x')))", 1],
	"y": ["pack(add(get('e3_y'))(mul(sin(mul(get('e3_x'))(0.02)))(1)))", 120],
	"img": ["packF(id)", "http://www.pngmart.com/files/11/Doge-Meme-PNG-Picture.png" ]
    }
},
"events": {
    "frameTime": ["packF(id)", 16],
    "time": ["pack(add(get('time'))(get('frameTime')))", 0],
    "everySecond": ["packF(timer)", [false, 0, 1000]],
    "width": ["packF(id)", 1080]
}
}

```
