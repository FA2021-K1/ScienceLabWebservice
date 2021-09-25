import FluentKit
import Foundation

// MARK: MeasurementData
public final class MeasurementData: Model {
    public static let schema = "measurementsData"
    
    @ID(custom: .string("measurementDataID"))
    public var id: UUID?
    
    @Timestamp(key: "createdAt", on: .create, format: .iso8601(withMilliseconds: true))
    public var createdAt: Date?
    
    @Timestamp(key: "updatedAt", on: .update, format: .iso8601(withMilliseconds: true))
    public var updatedAt: Date?

    @Field(key: "value")
    public var value: Double
    
    @Parent(key: "sensorID")
    public var sensor: Sensor

    @Parent(key: "measurementID")
    public var measurement: Measurement
    
    public init() { }
    
    public init(id: UUID? = nil, value: Double, sensorID: Sensor.IDValue, measureID: Measurement.IDValue) {
        self.id = id
        self.value = value
        self.$sensor.id = sensorID
        self.$measurement.id = measureID
    }
}

// MARK: MeasurementData: Equatable
extension MeasurementData: Equatable {
    public static func == (lhs: MeasurementData, rhs: MeasurementData) -> Bool {
        lhs.id == rhs.id
    }
}

// MARK: MeasurementData: Hashable
extension MeasurementData: Hashable {
    public func hash(into hasher: inout Hasher) {
        hasher.combine(id)
    }
}
