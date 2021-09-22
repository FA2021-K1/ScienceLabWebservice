import Apodini
import FluentKit
import Shared

struct GetMeasurement: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Binding
    var measurementId: Measurement.IDValue
    
    @Parameter(.http(.query))
    var withMeasurementData: Bool

    @Throws(.notFound, reason: "The measurement could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Measurement {
        if withMeasurementData {
            guard let measurementWithData = await databaseModel.readMeasurementWithData(measurementId) else {
                throw notFound
            }
            
            return measurementWithData
        } else {
            guard let measurement = await databaseModel.readMeasurement(measurementId) else {
                throw notFound
            }
            
            return measurement
        }
    }
}
