import Apodini
import ApodiniHTTPProtocol
import FluentKit
import Shared

struct UpdateSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var sensorTypeID: SensorType.IDValue

    @Parameter(.http(.body))
    var mediator: SensorTypeMediator

    @Throws(.notFound, reason: "The sensor type could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Response<SensorType> {
        do {
            return .final(
                        try await databaseModel
                            .updateSensorType(sensorTypeID, with: mediator),
                        information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                    )
        } catch {
            throw notFound
        }
    }
}
