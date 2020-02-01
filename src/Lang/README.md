# FunkLang
A simplified language for making javascript more similar to Funkly's block-based language.
The language allows any standard JS to be mixed with it, since it is itself just a collection of curried functions.

## Basic functions

```
> eval(add(1)(2))
3
> eval(cond(true)(1)(2))
1
> eval(cond(false)(1)(2))
2
```

## State
State is stored in the global map `s` in the GameEngine instance.
Values from this map can be read with the function `get`.
```
get('e1_x')
```
This gets the value of `x` in the entity `e1`.

Every key in the map corresponds to a tuple containing a function and a value.
The function is what calculates the next value for that variable.
If you wish for the value to be constant, use the function `id` for that variable.
