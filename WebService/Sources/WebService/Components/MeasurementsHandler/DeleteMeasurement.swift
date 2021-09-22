import Apodini
import FluentKit
import Shared

struct DeleteMeasurement: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var measurementId: Measurement.IDValue

    @Throws(.notFound, reason: "The specified measurement could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Status {
        do {
            try await databaseModel.deleteMeasurement(measurementId)
            return .ok
        } catch {
            throw notFound
        }
    }
}
