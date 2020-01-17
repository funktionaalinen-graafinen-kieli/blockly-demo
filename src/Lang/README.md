# Yksinkertainen funktionaalinen kieli
Tämän kielen on tarkoitus näyttää samankaltaiselta kuin haluttu palikkakieli.

Kielessä ei ole vielä tyyppejä. (eikä se vältämättä tarvitse niitä)

Kielen funktiot luovat merkkijonon jonka pystyy ajamaan JS:n funktiolla eval().

`node-repl lang.js` avaa koodin REPL:issa (vaatii että node-repl on asennettu)

## Globaalit muuttujat

Nämä toimivat tutulla tavalla.
```
var e = new Entity(0,0);
var t;
```
## Perus operaatiot
```
> eval(add(1)(2))
3
> eval(cond(true)(1)(2))
1
> eval(cond(false)(1)(2))
2
```

## Tilan muutos

```
> e.x
0
> eval(mutate("e.x")(4))
4
> e.x
4
```

Tämä tallentaa setInterval():in palauttaman Timeout olion muuttujaan t joka kasvattaa muuttujaa "e.x" yhdellä joka sekunti.
```
eval(timer("t")(mutate("e.x")(add("e.x")(1)))(1000))
```
