import Apodini
import FluentKit
import Shared

struct RegistrationHandler: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var userMediator: UserMediator

    @Throws(.serverError, reason: "User couldn't be saved correctly")
    var serverError: ApodiniError

    func handle() async throws -> User {
        try await databaseModel.createUser(userMediator)
    }
}
