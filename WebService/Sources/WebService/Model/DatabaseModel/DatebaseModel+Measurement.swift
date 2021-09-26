import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + Measurement
extension DatabaseModel {
    func createMeasurement(_ measurement: Measurement) async throws -> Measurement {
        guard let _ = try? await measurement.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return measurement
    }
    
    func readMeasurements() async -> [Measurement] {
        (try? await Measurement
            .query(on: database)
            .sort(\.$measuredAt, .descending)
            .all()) ?? []
    }
    
    func readMeasurementsWithData() async -> [Measurement] {
        (try? await Measurement
            .query(on: database)
            .sort(\.$measuredAt, .descending)
            .with(\.$measurementData)
            .all()) ?? []
    }
    
    func readMeasurement(_ measurementID: Measurement.IDValue) async -> Measurement? {
        try? await Measurement
            .find(measurementID, on: database)
    }
    
    func readMeasurementWithData(_ measurementID: Measurement.IDValue) async -> Measurement? {
        try? await Measurement
            .query(on: database)
            .filter(\.$id == measurementID)
            .with(\.$measurementData)
            .first()
    }
    
    func updateMeasurement(_ measurementID: Measurement.IDValue, with mediator: MeasurementMediator) async throws -> Measurement {
        guard let measurement = try? await Measurement.find(measurementID, on: database) else {
            throw DatabaseError.notFound
        }
        
        mediator.update(to: measurement)
        try await measurement.update(on: self.database)
        
        return measurement
    }
    
    func deleteMeasurement(_ measurementID: Measurement.IDValue) async throws -> Void {
        guard let measurement = try? await Measurement.find(measurementID, on: database) else {
            throw DatabaseError.notFound
        }
        
        try await measurement.delete(on: self.database)
    }
}
