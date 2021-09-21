import Apodini
import FluentKit
import Shared

struct CreateMeasurement: Handler {    
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var measurement: Measurement

    func handle() throws -> EventLoopFuture<Measurement> {
        databaseModel
            .createMeasurement(measurement)
    }
}
