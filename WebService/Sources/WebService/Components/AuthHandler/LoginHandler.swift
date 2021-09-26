import Apodini
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

    func handle() async throws -> Token {
        guard let authorization = connection.information[httpHeader: "Authorization"],
              let basicString = authorization.removePrefix("Basic ").base64Decoded() else {
            throw tokenError
        }
        
        let basicStringSections = basicString.split(separator: ":")
        guard basicStringSections.count == 2,
              let name = basicStringSections.first,
              let password = basicStringSections.last else {
            throw tokenError
        }
        
        return try await databaseModel.loginUser(String(name), String(password), signer: jwtSigners, error: unauthenticatedError)
    }
}
