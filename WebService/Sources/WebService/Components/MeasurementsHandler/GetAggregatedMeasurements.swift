import Apodini
import FluentKit
import Shared

struct GetAggregatedMeasurements: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var sensorTyp: String
    
    

    func handle() async throws -> [Measurement] {
        await withMeasurementData ?
            databaseModel.readMeasurementsWithData()
            : databaseModel.readMeasurements()
    }
}
