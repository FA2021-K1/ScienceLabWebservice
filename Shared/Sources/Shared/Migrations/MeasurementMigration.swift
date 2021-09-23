import FluentKit

public struct MeasurementMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Measurement.schema)
            .field("measurementID", .uuid, .identifier(auto: false))
            .field("measuredAt", .string, .required)
            .field("coordinate", .json, .required)
            .field("buoyID", .int, .required)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Measurement.schema).delete()
    }
}
