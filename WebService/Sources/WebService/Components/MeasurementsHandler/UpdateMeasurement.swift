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

    func handle() throws -> EventLoopFuture<Measurement> {
        databaseModel
            .updateMeasurement(measurementId, with: mediator)
            .flatMapErrorThrowing { _ in
                throw notFound
            }
    }
}
