import Apodini
import FluentKit
import Shared
import Foundation

struct CreateMeasurement: Handler {    
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var measurementContent: MeasurementContent
    
    @Throws(.serverError, reason: "Measurement couldn't be saved correctly")
    var serverError: ApodiniError

    func handle() async throws -> Shared.Measurement {
        let measurement = Measurement(measuredAt: measurementContent.date,
                                      coordinate: measurementContent.location)
        
        guard let measurement = try? await databaseModel.createMeasurement(measurement),
              let measurementID = measurement.id else {
            throw serverError
        }
        
        try await measurementContent
            .measurements
            .forEach { measurementDataContent in
                var sensorID: UUID
                
                // Check if sensor exists
                if await !databaseModel.isSensorConfigured(buoyID: measurementContent.buoyId,
                                                           sensorSlot: measurementDataContent.sensorSlot) {
                    // Create sensor
                    let sensor = Sensor(sensorSlot: measurementDataContent.sensorSlot,
                                        buoyID: measurementContent.buoyId,
                                        sensorTypeID: measurementDataContent.sensorType.rawValue)
                    
                    guard let _ = try? await databaseModel.createSensor(sensor),
                          let tempSensorID = sensor.id else {
                        throw serverError
                    }
                    
                    sensorID = tempSensorID
                } else {
                    // Get ID of existing sensor
                    guard let tempSensorID = await databaseModel.getSensorID(buoyID: measurementContent.buoyId,
                                                                             sensorSlot: measurementDataContent.sensorSlot) else {
                        throw serverError
                    }
                    
                    sensorID = tempSensorID
                }
                        
                guard let _ = try? await databaseModel
                            .createMeasurementData(
                                MeasurementData(
                                    value: measurementDataContent.measurement,
                                    sensorID: sensorID,
                                    measureID: measurementID
                                )
                            ) else {
                    throw serverError
                }
            }
        
        guard let measurementWithData = await databaseModel.readMeasurementWithData(measurementID) else {
            throw serverError
        }
        
        return measurementWithData
    }
}
