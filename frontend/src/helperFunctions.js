export function roundToOne(num) {
    return +(Math.round(num + "e+1") + "e-1")
}

export function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2")
}