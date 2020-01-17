# Funkly Lang

`node-repl lang.js` to run interactively (requires node-repl to be installed)

## Variables

Variables are initialized like this
```
var e = new Entity(0,0);
var t;
```
## Basic operations
```
> eval(add(1)(2))
3
> eval(cond(true)(1)(2))
1
> eval(cond(false)(1)(2))
2
```

## Mutating state
Variables must always be referenced as strings.
Mutating a variable happens like this.
```
> eval(mutate("e.x")(4))
4
```

# Examples
The following stores a timer into `t` which increments `x` by one every `100ms` and sets x to 0 when !(x<100).
```
var x = 0;
var t;
eval(timer("t")(mutate("x")(cond(lt('x')(100))(add('x')(1))(0)))(100))
```
