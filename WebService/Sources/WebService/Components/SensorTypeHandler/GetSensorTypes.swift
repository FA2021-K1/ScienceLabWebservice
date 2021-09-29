import Apodini
import ApodiniHTTPProtocol
import FluentKit
import Shared

struct GetSensorTypes: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    func handle() async throws -> Response<[SensorType]> {
        .final(
            await databaseModel.readSensorTypes(),
            information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
        )
    }
}
