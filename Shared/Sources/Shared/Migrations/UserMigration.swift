import FluentKit

public struct MeasurementMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(User.schema)
            .field("userID", .uuid, .identifier(auto: false))
            .field("username", .string, .required)
            .field("password_hash", .string, .required)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(User.schema).delete()
    }
}
