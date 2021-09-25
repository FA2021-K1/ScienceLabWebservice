import Apodini
import FluentKit
import Shared

struct GetSensorTypes: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    func handle() async throws -> [SensorType] {
        await databaseModel.readSensorTypes()
    }
}
