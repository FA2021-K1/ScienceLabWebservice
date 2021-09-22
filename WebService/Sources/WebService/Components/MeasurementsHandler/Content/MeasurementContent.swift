import Apodini
import FluentKit
import Shared
import Foundation

struct MeasurementContent: Content, Decodable {
    public var buoyId: Int
    public var date: Date
    public var location: Coordinate
    public var measurements: [MeasurementDataContent]
}

struct MeasurementDataContent: Content, Decodable {
    public var sensorSlot: Int
    public var sensorType: SensorTypeContent
    public var measurement: Double
}

enum SensorTypeContent: Int, Content, Decodable {
    case temperaturSensor
    case conductivitySensor
    case phSensor
}
