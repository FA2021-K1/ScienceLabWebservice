import Apodini
import ApodiniAuthorization
import ApodiniAuthorizationJWT
import FluentKit
import Shared

struct AuthGuardHandler: Guard {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Environment(\.connection)
    var connection
    
    @Environment(\.jwtSigners)
    var jwtSigners
    
    @Throws(
        .forbidden,
        reason: "The Authentication is not valid!"
    )
    var authError: ApodiniError
    
    func check() async throws {
        let bearerPrefix = "Bearer "
        guard let authorization = connection.information[httpHeader: "Authorization"],
              authorization.hasPrefix(bearerPrefix) else {
            throw authError
        }
        let token = String(authorization.dropFirst(bearerPrefix.count))
        
        let _ = try await databaseModel.verifyToken(token, signers: jwtSigners)
    }
}
