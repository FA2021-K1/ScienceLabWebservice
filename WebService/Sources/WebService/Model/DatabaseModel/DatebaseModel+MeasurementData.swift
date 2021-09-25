import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + MeasurementData
extension DatabaseModel {
    func createMeasurementData(_ measurementData: MeasurementData) async throws -> MeasurementData {
        guard let _ = try? await measurementData.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return measurementData
    }
}
