import Apodini
import FluentKit
import Shared

// MARK: - DatabaseModel + Measurement
extension DatabaseModel {
    func createMeasurement(_ measurement: Measurement) -> EventLoopFuture<Measurement> {
        measurement
            .save(on: database)
            .map { measurement }
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
    
    func deleteMeasurement(_ measurementID: Measurement.IDValue) -> EventLoopFuture<Void> {
        readMeasurement(measurementID)
            .unwrap(orError: DatabaseError.notFound)
            .flatMap { measurement in
                measurement
                    .delete(on: self.database)
            }
    }
}
