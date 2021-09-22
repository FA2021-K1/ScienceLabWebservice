import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + MeasurementData
extension DatabaseModel {
    func createMeasurementData(_ measurementData: MeasurementData) async -> MeasurementData {
        try! await measurementData.save(on: database)
        return measurementData
    }
}
