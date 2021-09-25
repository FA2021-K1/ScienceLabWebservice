import Apodini
import FluentKit
import Shared
import Foundation

struct MeasurementFrontendContent: Content, Decodable {
    public var measurements: [MeasurementFrontendValueContent]
}

struct MeasurementFrontendValueContent: Content, Decodable {
    public var buoyId: Int
    public var date: Date
    public var location: Coordinate
    public var value: Double
}
