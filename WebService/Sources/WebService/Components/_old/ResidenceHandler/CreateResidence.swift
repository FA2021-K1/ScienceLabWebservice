import Apodini
import FluentKit
import Shared

struct CreateResidence: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Parameter(.http(.body))
    var residence: Residence

    func handle() throws -> EventLoopFuture<Residence> {
        databaseModel
            .createResidence(residence)
    }
}
