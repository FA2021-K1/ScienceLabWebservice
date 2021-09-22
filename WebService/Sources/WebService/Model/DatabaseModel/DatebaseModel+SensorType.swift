import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + SensorType
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
