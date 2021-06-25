import Apodini
import FluentKit
import Shared

struct GetResidence: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Binding
    var residenceId: Residence.IDValue

    @Throws(.notFound, reason: "The residence could not be found")
    var notFound: ApodiniError

    func handle() throws -> EventLoopFuture<Residence> {
        databaseModel
            .readResidence(residenceId)
            .unwrap(orError: notFound)
    }
}
