import Foundation

var jsonEncoder: JSONEncoder {
    let encoder = JSONEncoder()
    encoder.dataEncodingStrategy = .deferredToData
    encoder.outputFormatting = .prettyPrinted
    encoder.nonConformingFloatEncodingStrategy = .convertToString(positiveInfinity: "+inf", negativeInfinity: "-inf", nan: "NaN")
    return encoder
}
