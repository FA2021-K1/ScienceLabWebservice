import Apodini
import ApodiniObserve
import FluentKit
import Shared

struct LoginHandler: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Environment(\.connection)
    var connection
    
    @Environment(\.jwtSigners)
    var jwtSigners
    
    @Throws(
        .badInput,
        reason: "The Authentication is no correct basic format"
    )
    var tokenError: ApodiniError
    
    @Throws(
        .unauthenticated,
        reason: "The credentials provided are not correct"
    )
    var unauthenticatedError: ApodiniError
    
    @ApodiniLogger
    var logger
    
    @ApodiniCounter(label: "loggedInUser_counter")
    var loggedInUserCounter
    
    @ApodiniCounter(label: "failedLogin_counter")
    var failedLoginsCounter

    func handle() async throws -> Token {
        guard let authorization = connection.information[httpHeader: "Authorization"],
              let basicString = authorization.removePrefix("Basic ").base64Decoded() else {
              // Instrumentation
            failedLoginsCounter.increment()
            logger.info("Error: Failed login!", metadata: ["authorizationHeader": .string(String(connection.information[httpHeader: "Authorization"] ?? "nil"))])
                              
            throw tokenError
        }
        
        let basicStringSections = basicString.split(separator: ":")
        guard basicStringSections.count == 2,
              let name = basicStringSections.first,
              let password = basicStringSections.last else {
            throw tokenError
        }
        
        // Instrumentation
        loggedInUserCounter.increment()
        logger.info("User was logged in with username \(name)", metadata: ["username": .string(String(name))])
        
        return try await databaseModel.loginUser(String(name), String(password), signer: jwtSigners, error: unauthenticatedError)
    }
}
