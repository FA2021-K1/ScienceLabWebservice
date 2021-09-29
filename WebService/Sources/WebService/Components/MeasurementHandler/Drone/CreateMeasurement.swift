import Apodini
import FluentKit
import Shared
import Foundation

struct CreateMeasurement: Handler {    
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var measurementsContent: [MeasurementContent]
    
    @Throws(.serverError, reason: "Measurement couldn't be saved correctly")
    var serverError: ApodiniError
    
    @Throws(.serverError, reason: "Sensor type is not configured correctly")
    var sensorTypeNotConfigured: ApodiniError

    func handle() async throws -> [Shared.Measurement] {
        try await measurementsContent.map { measurementContent -> Shared.Measurement in
            let measurement = Measurement(measuredAt: measurementContent.date,
                                          coordinate: measurementContent.location,
                                          buoyID: measurementContent.buoyID)
            
            guard let measurement = try? await databaseModel.createMeasurement(measurement),
                  let measurementID = measurement.id else {
                throw serverError
            }
            
            try await measurementContent
                .measurements
                .forEach { measurementDataContent in
                    // Check if sensor type exists
                    if await !databaseModel.isSensorTypeConfigured(sensorType: measurementDataContent.sensorType) {
                        throw sensorTypeNotConfigured
                    }
                    
                    // Check if sensor exists
                    var sensorID: UUID
                    if await !databaseModel.isSensorConfigured(buoyID: measurementContent.buoyID,
                                                               sensorSlot: measurementDataContent.sensorID) {
                        // Create sensor
                        let sensor = Sensor(sensorSlot: measurementDataContent.sensorID,
                                            buoyID: measurementContent.buoyID,
                                            sensorTypeID: measurementDataContent.sensorType.rawValue)
                        
                        guard let _ = try? await databaseModel.createSensor(sensor),
                              let tempSensorID = sensor.id else {
                            throw serverError
                        }
                        
                        sensorID = tempSensorID
                    } else {
                        // Get ID of existing sensor
                        guard let tempSensorID = await databaseModel.getSensorID(buoyID: measurementContent.buoyID,
                                                                                 sensorSlot: measurementDataContent.sensorID) else {
                            throw serverError
                        }
                        
                        sensorID = tempSensorID
                    }
                        
                    // Create Measurement data
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
            
            // Get Measurement with respective data
            guard let measurementWithData = await databaseModel.readMeasurementWithData(measurementID) else {
                throw serverError
            }
            
            return measurementWithData
        }
    }
}
