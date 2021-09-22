import FluentKit

public struct MeasurementMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Measurement.schema)
            .field("measurementID", .uuid, .identifier(auto: false))
            .field("measuredAt", .datetime, .required)
            .field("coordinate", .dictionary, .required)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Measurement.schema).delete()
    }
}
