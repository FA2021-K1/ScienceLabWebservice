import FluentKit

public struct SensorTypeMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(SensorType.schema)
            .field("sensorTypeID", .int, .identifier(auto: false))
            .field("name", .string, .required)
            .field("unit", .string, .required)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(SensorType.schema).delete()
    }
}
