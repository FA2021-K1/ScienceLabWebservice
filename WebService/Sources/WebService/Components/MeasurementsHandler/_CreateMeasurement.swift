import Apodini
import FluentKit
import Shared

struct _CreateMeasurement: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var measurement: Measurement

    func handle() async throws -> Measurement {
        await databaseModel
            .createMeasurement(measurement)
    }
}
