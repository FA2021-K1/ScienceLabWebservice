import FluentKit
import BCrypt
import Foundation
import JWTKit

public final class User: Model {
    public static let schema = "users"
    
    @ID(custom: .string("userID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?
    
    @Field(key: "username")
    public var username: String

    @Field(key: "passwordHash")
    public var passwordHash: String
    
    @Field(key: "userType")
    public var userType: UserType
    
    @Children(for: \.$user)
    public var tokens: [Token]
    
    public init() { }
    
    public init(id: UUID? = nil, username: String, password: String, userType: UserType) throws {
        self.id = id
        self.username = username
        self.passwordHash = try BCrypt.Hash.make(message: password).makeString()
        self.userType = userType
    }
    
    public func generateToken(signers: JWTSigners) throws -> Token {
        let token = Token(
            expiration: .init(value: .init(timeIntervalSinceNow: 3600)),
            subject: .init(value: "apodini"),
            isAdmin: false,
            userID: try self.requireID()
        )
        let jwt = try signers.sign(token)
        token.value = jwt
        return token
    }
    
    public func verify(password: String) throws -> Bool {
        try BCrypt.Hash.verify(message: password, matches: self.passwordHash)
    }
}

public enum UserType: Int, Codable {
    case drone
    case frontend
}

