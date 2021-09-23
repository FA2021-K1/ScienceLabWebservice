import Foundation

var jsonDecoder: JSONDecoder {
    let decoder = JSONDecoder()
    decoder.allowsJSON5 = .init(true)
    decoder.dateDecodingStrategy = .iso8601
    decoder.dataDecodingStrategy = .deferredToData
    decoder.nonConformingFloatDecodingStrategy = .convertFromString(positiveInfinity: "+inf", negativeInfinity: "-inf", nan: "NaN")
    return decoder
}
