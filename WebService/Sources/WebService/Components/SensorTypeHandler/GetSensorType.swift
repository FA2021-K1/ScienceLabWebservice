import Apodini
import ApodiniHTTPProtocol
import FluentKit
import Shared

struct GetSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var sensorTypeID: SensorType.IDValue

    @Throws(.notFound, reason: "The sensor type could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Response<SensorType> {
        guard let sensorType = await databaseModel.readSensorType(sensorTypeID) else {
            throw notFound
        }
        
        return .final(
                    sensorType,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
    }
}
