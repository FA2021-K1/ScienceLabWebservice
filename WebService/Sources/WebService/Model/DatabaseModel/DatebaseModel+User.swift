import Apodini
import FluentKit
import Shared
import Foundation
import JWTKit

// MARK: - DatabaseModel + User
extension DatabaseModel {
    func createUser(_ userMediator: UserMediator) async throws -> User {
        guard userMediator.validate() else {
            throw ApodiniError(type: .badInput, reason: "Username/Password too short (must be at least 4 characters)")
        }
        
        if (try? await User
            .query(on: database)
            .filter(User.self, \User.$username == userMediator.username)
            .first()) != nil {
            throw ApodiniError(type: .badInput, reason: "Username is already in use")
        }
        
        let user = try User(username: userMediator.username, password: userMediator.password, userType: userMediator.type)
        
        guard let _ = try? await user.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return user
    }
    
    func loginUser(_ username: String, _ password: String, signer: JWTSigners, error: ApodiniError) async throws -> Token {
        guard let user = (try? await User
            .query(on: database)
            .filter(User.self, \User.$username == username)
            .first()) else {
            throw error
        }
        
        if let result = try? user.verify(password: password),
           !result {
            throw error
        }
        
        let token = try user.generateToken(signers: signer)
        
        guard let _ = try? await token.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return token
    }
    
    func verifyToken(_ token: String, signers: JWTSigners) async throws -> User {
        let token = try signers.verify(token, as: Token.self)
        guard let user = try? await User.find(token.user.id, on: database) else {
            throw ApodiniError(type: .badInput, reason: "Couldn't verify token")
        }
        return user
    }
}
