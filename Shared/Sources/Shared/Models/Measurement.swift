import FluentKit
import Foundation

// MARK: Measurement
public final class Measurement: Model {
    public static let schema = "measurements"
    
    @ID(custom: .string("measurementID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?

    @Field(key: "measuredAt")
    public var measuredAt: Date

    @Field(key: "coordinate")
    public var coordinate: Coordinate
    
    @Field(key: "buoyID")
    public var buoyID: Int?

    @Children(for: \.$measurement)
    public var measurementData: [MeasurementData]
    
    public init() { }
    
    public init(id: UUID? = nil, measuredAt: Date, coordinate: Coordinate, buoyID: Int) {
        self.id = id
        self.measuredAt = measuredAt
        self.coordinate = coordinate
        self.buoyID = buoyID
    }
}

// MARK: Measurement: Equatable
extension Measurement: Equatable {
    public static func == (lhs: Measurement, rhs: Measurement) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: Measurement: Comparable
extension Measurement: Comparable {
    public static func < (lhs: Measurement, rhs: Measurement) -> Bool {
        lhs.measuredAt < rhs.measuredAt
    }
}

// MARK: Measurement: Hashable
extension Measurement: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
