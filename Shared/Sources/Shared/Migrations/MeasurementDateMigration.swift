import FluentKit

public struct MeasurementDataMigration: Migration {
    public init() {}
    
    public func prepare(on database: Database) -> EventLoopFuture<Void> {
        database.schema(MeasurementData.schema)
            .field("measurementDataID", .uuid, .identifier(auto: false))
            .field("value", .double, .required)
            .field("sensorID", .uuid)
            .foreignKey("sensorID", references: Sensor.schema, "sensorID", onDelete: .cascade)
            .field("measurementID", .uuid)
            .foreignKey("measurementID", references: Measurement.schema, "measurementID", onDelete: .cascade)
            .field("createdAt", .string, .required)
            .field("updatedAt", .string, .required)
            .create()
    }
    
    public func revert(on database: Database) -> EventLoopFuture<Void> {
        database.schema(MeasurementData.schema).delete()
    }
}
