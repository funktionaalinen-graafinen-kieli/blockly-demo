# FunkLang

A simplified language for making javascript more similar to Funkly's block-based language.
The language allows any standard JS to be mixed with it, since it is itself just a collection of curried functions.
This means that any future functionality does not need to use these functions.

However the engine requires that entities and their functions are a correctly formatted json.

All functions return a string which can be evaluated as JS.

Usage of this language is optional.
The special JSON string and function format described under the "Engine" section are necessary however.

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

## Engine

Entities and binds (variables not tied to entities) must be specified as a json string in the following format:

```
{
    "entities": {
        "ENTITY1_ID": {
            "name": [
                "packF(id)",
                "NAME1"
            ],
            "x": [
                "packF(id)",
                1
            ],
            ...
        },
        "ENTITY2_ID": {
            "name": [
                "(x,s) => x",
                "NAME2"
            ],
            "x": [
                "(x,s) => x+1",
                1
            ],
            ...
        },
    },
    "binds": {
        "frameTime": [
            "packF(id)",
            16
        ],
        "time": [
            "pack(add(get('time'))(get('frameTime')))",
            0
        ],
        ...
    }
```
Each entity variable and bind is a named pair of a function (which describes how to compute the next state) and the current state (this is passed to the function with the name `x`).

The functions must take 2 arguments. The first is the value of the variable, named `x`. The second is the map `s` containing the entire gamestate.
```
(x,s) => ...
```
