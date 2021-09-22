import FluentKit
import Foundation

// MARK: SensorType
public final class SensorType: Model {
    public static let schema = "sensorTypes"
    
    @ID(custom: .string("sensorTypeID"))
    public var id: Int?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?

    @Field(key: "name")
    public var name: String

    @Field(key: "unit")
    public var unit: String
    
    //@Children(for: \.$sensorType)
    //public var sensorAssignment: [SensorAssignment]
    
    public init() { }
    
    public init(id: Int? = nil, name: String, unit: String) {
        self.id = id
        self.name = name
        self.unit = unit
    }
}

// MARK: SensorType: Equatable
extension SensorType: Equatable {
    public static func == (lhs: SensorType, rhs: SensorType) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: SensorType: Hashable
extension SensorType: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
