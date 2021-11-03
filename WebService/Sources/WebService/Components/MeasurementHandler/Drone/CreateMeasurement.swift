import Apodini
import ApodiniObserve
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
    
    @ApodiniLogger
    var logger
    
    @ApodiniCounter(label: "measurements_counter")
    var measurementsCounter
    
    @ApodiniCounter(label: "measurement_data_counter")
    var measurementDataCounter

    @ApodiniCounter(label: "sensortype_notconfigured_counter")
    var sensorTypeNotConfiguredCounter
    
    @ApodiniTimer(label: "insertion_single_measurement_data_duration")
    var insertionDurationTimer

    func handle() async throws -> [Shared.Measurement] {
        try await measurementsContent.map { measurementContent -> Shared.Measurement in
            // Instrumentation
            measurementsCounter.increment()
            
            logger.info("Measurement received with timestamp \(measurementContent.date.description)",
                        metadata: ["customMetadata":
                                        .dictionary([
                                            "measuredAt": .string(measurementContent.date.description),
                                            "coordinate": .dictionary([
                                                "latitude": .string(measurementContent.location.latitude.description),
                                                "longitude": .string(measurementContent.location.longitude.description)
                                            ]),
                                            "buoyID": .string(measurementContent.buoyID.description)
                                        ])
                                  ])
            
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
                        // Instrumentation
                        sensorTypeNotConfiguredCounter.increment()
                        
                        logger.info("Passed sensor type \(measurementDataContent.sensorType.description) doesn't exist",
                                    metadata: ["customMetadata":
                                                    .string(measurementDataContent.sensorType.description)
                                              ])
                        
                        throw sensorTypeNotConfigured
                    }
                    
                    // Check if sensor exists
                    var sensorID: UUID
                    if await !databaseModel.isSensorConfigured(buoyID: measurementContent.buoyID,
                                                               sensorSlot: measurementDataContent.sensorID) {
                        // Instrumentation
                        logger.info("Created new sensor with type \(measurementDataContent.sensorType.description) for buoy \(measurementContent.buoyID.description)",
                                    metadata: ["customMetadata":
                                                    .dictionary([
                                                        "sensorSlot": .string(measurementDataContent.sensorID.description),
                                                        "buoyID": .string(measurementContent.buoyID.description),
                                                        "sensorTypeID": .string(measurementDataContent.sensorType.description)
                                                    ])
                                              ])
                        
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
                        // Instrumentation
                        logger.info("Sensor already configured with type \(measurementDataContent.sensorType.description) for buoy \(measurementContent.buoyID.description)",
                                    metadata: ["customMetadata":
                                                    .dictionary([
                                                        "sensorSlot": .string(measurementDataContent.sensorID.description),
                                                        "buoyID": .string(measurementContent.buoyID.description),
                                                        "sensorTypeID": .string(measurementDataContent.sensorType.description)
                                                    ])
                                              ])
                        
                        // Get ID of existing sensor
                        guard let tempSensorID = await databaseModel.getSensorID(buoyID: measurementContent.buoyID,
                                                                                 sensorSlot: measurementDataContent.sensorID) else {
                            throw serverError
                        }
                        
                        sensorID = tempSensorID
                    }
                    
                    // Instrumentation
                    measurementDataCounter.increment()
                    
                    logger.info("Created Measurement Data for Measurement with ID \(measurementID.description)",
                                metadata: ["customMetadata":
                                                .dictionary([
                                                    "value": .string(measurementDataContent.measurement.description),
                                                    "sensorID": .string(sensorID.description),
                                                    "measureID": .string(measurementID.description)
                                                ])
                                          ])
                        
                    // Instrumentation
                    let startTime = DispatchTime.now()
                    
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
                    
                    insertionDurationTimer.recordInterval(since: startTime)
                }
            
            // Get Measurement with respective data
            guard let measurementWithData = await databaseModel.readMeasurementWithData(measurementID) else {
                throw serverError
            }
            
            return measurementWithData
        }
    }
}
