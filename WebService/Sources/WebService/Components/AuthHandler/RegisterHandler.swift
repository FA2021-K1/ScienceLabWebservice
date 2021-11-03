import Apodini
import ApodiniObserve
import FluentKit
import Shared

struct RegistrationHandler: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Parameter(.http(.body))
    var userMediator: UserMediator

    @Throws(.serverError, reason: "User couldn't be saved correctly")
    var serverError: ApodiniError

    @ApodiniLogger
    var logger
    
    @ApodiniCounter(label: "user_counter")
    var userCounter
    
    func handle() async throws -> User {
        let user = try await databaseModel.createUser(userMediator)
        
        // Instrumentation
        userCounter.increment()
        logger.info("User was created with username \(userMediator.username)", metadata: ["username": .string(userMediator.username),
                                                                                          "type": .string(userMediator.type.userTypeName)])
        
        return user
    }
}
