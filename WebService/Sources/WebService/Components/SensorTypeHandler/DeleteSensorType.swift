import Apodini
import ApodiniHTTPProtocol
import FluentKit
import Shared

struct DeleteSensorType: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var sensorTypeID: SensorType.IDValue

    @Throws(.notFound, reason: "The specified sensor type could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Response<Status> {
        do {
            try await databaseModel.deleteSensorType(sensorTypeID)
            
            return Response.final(Status.ok, information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*"))
        } catch {
            throw notFound
        }
    }
}

extension Status: Encodable {
    public func encode(to encoder: Encoder) throws {}
}
