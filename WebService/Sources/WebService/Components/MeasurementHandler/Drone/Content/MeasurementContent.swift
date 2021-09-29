import Apodini
import FluentKit
import Shared
import Foundation

struct MeasurementContent: Content, Decodable {
    public var buoyID: Int
    public var date: Date
    public var location: Coordinate
    public var measurements: [MeasurementDataContent]
}

struct MeasurementDataContent: Content, Decodable {
    public var sensorID: Int
    public var sensorType: SensorTypeContent
    public var measurement: Double
}

enum SensorTypeContent: Int, Content, Decodable, LosslessStringConvertible {
    case all = -1
    case temperaturSensor
    case conductivitySensor
    case phSensor
    
    var description: String {
        String(self.rawValue)
    }
    
    init?(_ description: String) {
        guard let intDescription = Int(description) else {
            return nil
        }
        
        self.init(rawValue: intDescription)
    }
}
