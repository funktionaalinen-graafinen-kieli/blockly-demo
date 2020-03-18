export const id = (x, s) => x
export const clamp = (num, min, max) => (num <= min ? min : num >= max ? max : num)

export function download(filename, text) {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
    element.setAttribute("download", filename)

    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}

export class mapWithDefault extends Map {
    get(key) {
        if (!this.has(key)) return this.defaultvalue
        return super.get(key)
    }

    constructor(defaultvalue, entries) {
        super(entries)
        this.defaultvalue = defaultvalue
    }
}


