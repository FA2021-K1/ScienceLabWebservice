import Apodini
import FluentKit
import Shared

struct CreateSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var sensorTypeContent: SensorType
    
    @Throws(.serverError, reason: "Sensor type couldn't be saved correctly")
    var serverError: ApodiniError

    func handle() async throws -> SensorType {
        guard let sensorType = try? await databaseModel.createSensorType(sensorTypeContent) else {
            throw serverError
        }

        return sensorType
    }
}
