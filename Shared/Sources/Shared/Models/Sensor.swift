import FluentKit
import Foundation

// MARK: Sensor
public final class Sensor: Model {
    public static let schema = "sensors"
    
    @ID(custom: .string("sensorID"))
    public var id: UUID?

    @Field(key: "sensorSlot")
    public var sensorSlot: Int?

    @Field(key: "buoyID")
    public var buoyID: Int?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?

    @Parent(key: "sensorTypeID")
    public var sensorType: SensorType
    
    @Children(for: \.$sensor)
    public var measurementsData: [MeasurementData]
    
    public init() { }
    
    public init(id: UUID? = nil, sensorSlot: Int? = nil, buoyID: Int? = nil, sensorTypeID: Int) {
        self.id = id
        self.sensorSlot = sensorSlot
        self.buoyID = buoyID
        self.$sensorType.id = sensorTypeID
    }
}

// MARK: Sensor: Equatable
extension Sensor: Equatable {
    public static func == (lhs: Sensor, rhs: Sensor) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: Sensor: Hashable
extension Sensor: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
