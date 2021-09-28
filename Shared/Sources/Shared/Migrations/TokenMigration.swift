import FluentKit

public struct TokenMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Token.schema)
            .field("tokenID", .uuid, .identifier(auto: false))
            .field("value", .string)
            .field("expirationRaw", .date, .required)
            .field("subjectRaw", .string, .required)
            .field("isAdmin", .bool, .required)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .field("userID", .uuid)
            .foreignKey("userID", references: User.schema, "userID", onDelete: .cascade)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Token.schema).delete()
    }
}
