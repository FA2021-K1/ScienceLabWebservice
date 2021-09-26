import Apodini
import FluentKit
import Shared

struct DeleteSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var sensorTypeID: SensorType.IDValue

    @Throws(.notFound, reason: "The specified sensor type could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Status {
        do {
            try await databaseModel.deleteSensorType(sensorTypeID)
            return .ok
        } catch {
            throw notFound
        }
    }
}
