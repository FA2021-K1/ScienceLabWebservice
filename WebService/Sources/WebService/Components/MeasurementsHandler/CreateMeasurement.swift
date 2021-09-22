import Apodini
import FluentKit
import Shared

struct CreateMeasurement: Handler {    
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var measurementContent: MeasurementContent
    
    @Throws(.serverError, reason: "Measurement couldn't be saved correctly")
    var serverError: ApodiniError

    func handle() async throws -> Measurement {
        var measurement = Measurement(measuredAt: measurementContent.date,
                                      coordinate: measurementContent.location)
        
        measurement = await databaseModel
                                .createMeasurement(measurement)
        
        guard let measurementID = measurement.id else {
            throw serverError
        }
        
        await measurementContent
            .measurements
            .forEach { measurementDataContent in
                if let sensorAssignmentID =
                    await databaseModel.getSensorAssignmentID(buoyID: measurementContent.buoyId,
                                                              sensorSlot: measurementDataContent.sensorSlot) {
                    _ = await databaseModel
                                .createMeasurementData(
                                    MeasurementData(
                                        value: measurementDataContent.measurement,
                                        sensorID: sensorAssignmentID,
                                        measureID: measurementID
                                    )
                                )
                }
            }
        
        return await databaseModel.readMeasurementWithData(measurementID)!
    }
}
