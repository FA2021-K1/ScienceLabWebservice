import Apodini
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

    func handle() async throws -> Response<SensorType> {
        guard let sensorType = try? await databaseModel.createSensorType(sensorTypeContent) else {
            throw serverError
        }
        
        return .final(
                    sensorType,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
    }
}
