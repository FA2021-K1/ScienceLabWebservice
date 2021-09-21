import FluentKit
import Foundation

// MARK: SensorAssignment
public final class SensorAssignment: Model {
    public static let schema = "sensorAssignments"
    
    @ID(key: "sensorAssignmentID")
    public var id: UUID?

    @Field(key: "sensorID")
    public var sensorID: Int?

    @Field(key: "buoyID")
    public var buoyID: Int?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?

    //@Parent(key: "sensorTypeID")
    //public var sensorType: SensorType
    
    @Children(for: \.$sensorAssignment)
    public var measurementsData: [MeasurementData]
    
    public init() { }
    
    public init(id: UUID? = nil, sensorID: Int? = nil, buoyID: Int? = nil) {
    //public init(id: UUID? = nil, sensorID: Int? = nil, buoyID: Int? = nil, sensorTypeID: SensorType.IDValue) {
        self.id = id
        self.sensorID = sensorID
        self.buoyID = buoyID
        //self.$sensorType.id = sensorTypeID
    }
}

// MARK: SensorAssignment: Equatable
extension SensorAssignment: Equatable {
    public static func == (lhs: SensorAssignment, rhs: SensorAssignment) -> Bool {
        lhs.sensorID == rhs.sensorID && lhs.buoyID == rhs.buoyID
    }
}

// MARK: SensorAssignment: Hashable
extension SensorAssignment: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(sensorID)
        hasher.combine(buoyID)
    }
}
