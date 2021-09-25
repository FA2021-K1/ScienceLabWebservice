import FluentKit
import Foundation
import ApodiniAuthorization

struct Token: Authenticatable, Codable {
    public static let schema = "tokens"
    
    @ID(custom: .string("tokenID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?
    
    @Field(key: "value")
    let value: String
    
    @Field(key: "username")
    let username: String
    
    @Parent(key: "userID")
    var user: User

    public init() { }
    
    public init(id: UUID? = nil, value: String, username: String, userID: User.IDValue) {
        self.id = id
        self.value = value
        self.username = username
        self.$user.id = userID
    }
    
    func toJson() throws -> String {
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.withoutEscapingSlashes]
        let data = try encoder.encode(self)
        return String(data: data, encoding: .utf8) ?? "ERR"
    }
}
