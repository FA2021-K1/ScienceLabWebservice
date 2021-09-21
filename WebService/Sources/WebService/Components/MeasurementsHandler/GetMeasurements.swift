import Apodini
import FluentKit
import Shared

struct GetMeasurements: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    func handle() throws -> EventLoopFuture<[Measurement]> {
        databaseModel.readMeasurements()
    }
}
