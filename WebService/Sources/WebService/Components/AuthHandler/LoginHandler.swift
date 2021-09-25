import Apodini
import FluentKit
import Shared

struct LoginHandler: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel

    @Throws(.notFound, reason: "The specified measurement could not be found")
    var notFound: ApodiniError

    func handle() async throws -> String {
        return ""
    }
}
