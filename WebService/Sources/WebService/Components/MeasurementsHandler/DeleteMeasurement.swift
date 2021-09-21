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

    func handle() throws -> EventLoopFuture<Status> {
        databaseModel
            .deleteMeasurement(measurementId)
            .flatMapErrorThrowing { _ in
                throw notFound
            }
            .transform(to: .ok)
    }
}
