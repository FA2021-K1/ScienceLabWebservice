import FluentKit

public struct ResidenceMigration: Migration {
    public init() {}
    
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Residence.schema)
            .id()
            .field("createdAt", .datetime, .required)
            .field("address", .string, .required)
            .field("postalCode", .string, .required)
            .field("country", .string, .required)
            .field("contact_id", .uuid)
            .foreignKey("contact_id", references: Contact.schema, .id, onDelete: .cascade)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Residence.schema).delete()
    }
}
