import Apodini
import Shared
import Foundation

struct MeasurementMediator: Decodable, Content {
    var measuredAt: Date?
    var coordinate: Coordinate?

    func update(to measurement: Shared.Measurement) {
        measuredAt.map {
            measurement.measuredAt = $0
        }
        coordinate.map {
            measurement.coordinate = $0
        }
    }
}
