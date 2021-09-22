import Foundation

var jsonEncoder: JSONEncoder {
    let encoder = JSONEncoder()
    encoder.dateEncodingStrategy = .iso8601
    encoder.dataEncodingStrategy = .deferredToData
    encoder.outputFormatting = .prettyPrinted
    encoder.nonConformingFloatEncodingStrategy = .convertToString(positiveInfinity: "+inf", negativeInfinity: "-inf", nan: "NaN")
    return encoder
}
