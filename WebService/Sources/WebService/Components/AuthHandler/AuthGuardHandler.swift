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
    
    @Throws(
        .forbidden,
        reason: "The user type doesn't match!"
    )
    var userTypeError: ApodiniError
    
    var allowedUserTypes: [UserType]
    
    init(allowedUserTypes: UserType...) {
        self.allowedUserTypes = allowedUserTypes
    }
    
    func check() async throws {
        let bearerPrefix = "Bearer "
        guard let authorization = connection.information[httpHeader: "Authorization"],
              authorization.hasPrefix(bearerPrefix) else {
            throw authError
        }
        let token = String(authorization.dropFirst(bearerPrefix.count))
        
        let user = try await databaseModel.verifyToken(token, signers: jwtSigners)
        
        if !allowedUserTypes.contains(where: { $0 == user.userType }) {
            throw userTypeError
        }
    }
}
