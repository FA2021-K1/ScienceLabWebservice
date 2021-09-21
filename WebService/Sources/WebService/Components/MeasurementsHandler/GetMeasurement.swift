import Apodini
import FluentKit
import Shared

struct GetMeasurement: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Binding
    var measurementId: Measurement.IDValue

    @Throws(.notFound, reason: "The measurement could not be found")
    var notFound: ApodiniError

    func handle() throws -> EventLoopFuture<Measurement?> {
        databaseModel.readMeasurement(measurementId)
    }
}
