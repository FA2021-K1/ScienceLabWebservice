import FluentKit


public struct ContactMigration: Migration {
    public init() {}
    
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Contact.schema)
            .id()
            .field("createdAt", .datetime, .required)
            .field("name", .string, .required)
            .field("birthday", .date, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Contact.schema).delete()
    }
}

