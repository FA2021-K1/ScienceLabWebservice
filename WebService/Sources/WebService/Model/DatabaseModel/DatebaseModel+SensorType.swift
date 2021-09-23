import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + SensorType
extension DatabaseModel {
    func createSensorType(_ sensorType: SensorType) async throws -> SensorType {
        guard let _ = try? await sensorType.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return sensorType
    }
    
    func readSensorTypes() async -> [SensorType] {
        (try? await SensorType
            .query(on: database)
            .sort(\.$id, .ascending)
            .all()) ?? []
    }
    
    func readSensorType(_ sensorTypeID: SensorType.IDValue) async -> SensorType? {
        try? await SensorType
            .find(sensorTypeID, on: database)
    }
    
    func updateSensorType(_ sensorTypeID: SensorType.IDValue, with mediator: SensorTypeMediator) async throws -> SensorType {
        guard let sensorType = try? await SensorType.find(sensorTypeID, on: database) else {
            throw DatabaseError.notFound
        }
        
        mediator.update(to: sensorType)
        try await sensorType.update(on: self.database)
        
        return sensorType
    }
    
    func deleteSensorType(_ sensorTypeID: SensorType.IDValue) async throws -> Void {
        guard let sensorType = try? await SensorType.find(sensorTypeID, on: database) else {
            throw DatabaseError.notFound
        }
        
        try await sensorType.delete(on: self.database)
    }
}

/*
extension DatabaseModel {
    func createMeasurement(_ measurement: Measurement) async -> Measurement {
        try! await measurement.save(on: database)
        return measurement
    }
    
    func readMeasurements() -> EventLoopFuture<[Measurement]> {
        Measurement
            .query(on: database)
            .sort(\.$measuredAt, .descending)
            .all()
    }
    
    func readMeasurement(_ measurementID: Measurement.IDValue) -> EventLoopFuture<Measurement?> {
        Measurement
            .find(measurementID, on: database)
    }
    
    func updateMeasurement(_ measurementID: Measurement.IDValue, with mediator: MeasurementMediator) -> EventLoopFuture<Measurement> {
        Measurement
            .find(measurementID, on: database)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { measurement in
                mediator.update(to: measurement)
                return measurement
                    .update(on: self.database)
                    .transform(to: measurement)
            }
    }
    
    func deleteMeasurement(_ measurementID: Measurement.IDValue) -> EventLoopFuture<Void> {
        readMeasurement(measurementID)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { measurement in
                measurement
                    .delete(on: self.database)
            }
    }
}
*/
