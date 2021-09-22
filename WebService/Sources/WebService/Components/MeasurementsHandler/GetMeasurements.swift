import Apodini
import FluentKit
import Shared

struct GetMeasurements: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.query))
    var withMeasurementData: Bool

    func handle() async throws -> [Measurement] {
        await withMeasurementData ?
            databaseModel.readMeasurementsWithData()
            : databaseModel.readMeasurements()
    }
}
