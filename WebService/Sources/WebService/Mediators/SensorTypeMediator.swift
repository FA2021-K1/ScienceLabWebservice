import Apodini
import Shared
import Foundation

struct SensorTypeMediator: Decodable, Content {
    public var name: String?
    public var unit: String?

    func update(to sensorType: Shared.SensorType) {
        name.map {
            sensorType.name = $0
        }
        unit.map {
            sensorType.unit = $0
        }
    }
}
