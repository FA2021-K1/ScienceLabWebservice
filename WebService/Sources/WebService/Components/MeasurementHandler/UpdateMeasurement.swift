import Apodini
import FluentKit
import Shared

struct UpdateMeasurement: Handler {    
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var mediator: MeasurementMediator
    
    @Binding
    var measurementId: Measurement.IDValue

    @Throws(.notFound, reason: "The measurement could not be found")
    var notFound: ApodiniError

    func handle() async throws -> Measurement {
        do {
            return try await databaseModel
                .updateMeasurement(measurementId, with: mediator)
        } catch {
            throw notFound
        }
    }
}
