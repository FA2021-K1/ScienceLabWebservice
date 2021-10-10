import Apodini
import ApodiniObserve
import ApodiniHTTPProtocol
import FluentKit
import Shared

struct CreateSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var sensorTypeContent: SensorType
    
    @Throws(.serverError, reason: "Sensor type couldn't be saved correctly")
    var serverError: ApodiniError
    
    @ApodiniLogger
    var logger
    
    @ApodiniCounter(label: "sensorType_counter")
    var sensorTypeCounter

    func handle() async throws -> Response<SensorType> {
        guard let sensorType = try? await databaseModel.createSensorType(sensorTypeContent) else {
            throw serverError
        }
        
        // Instrumentation
        logger.info("New sensor type with ID \(sensorTypeContent.id) created")
        
        sensorTypeCounter.increment()
        
        return .final(
                    sensorType,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
    }
}
