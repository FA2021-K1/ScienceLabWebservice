import FluentKit
import Foundation
import ApodiniAuthorization

struct User: Authenticatable: Model {
    public static let schema = "users"
    
    @ID(custom: .string("userID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?
    
    @Field(key: "username")
    public var username: String

    @Field(key: "password_hash")
    public var password_hash: String
    
    @Children(for: \.$user)
    var tokens: [Token]
    
    public init() { }
    
    public init(id: UUID? = nil, username: String, password: String) {
        self.id = id
        self.username = username
        self.password = password
    }
}
