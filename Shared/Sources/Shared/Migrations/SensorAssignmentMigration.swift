import FluentKit

public struct SensorAssignmentMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(SensorAssignment.schema)
            .field("sensorAssignmentID", .uuid, .identifier(auto: false))
            .field("sensorID", .int, .required)
            .field("buoyID", .int, .required)
            //.field("sensorTypeID", .int)
            //.foreignKey("sensorTypeID", references: SensorType.schema, "sensorTypeID", onDelete: .cascade)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(SensorAssignment.schema).delete()
    }
}
