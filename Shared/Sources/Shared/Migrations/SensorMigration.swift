import FluentKit

public struct SensorMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Sensor.schema)
            .field("sensorID", .uuid, .identifier(auto: false))
            .field("sensorSlot", .int, .required)
            .field("buoyID", .int, .required)
            .field("sensorTypeID", .int)
            .foreignKey("sensorTypeID", references: SensorType.schema, "sensorTypeID", onDelete: .cascade)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(Sensor.schema).delete()
    }
}
