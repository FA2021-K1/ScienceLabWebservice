import Apodini
import FluentKit
import Shared
import Foundation

// MARK: - DatabaseModel + SensorAssignment
extension DatabaseModel {
    
    func getSensorAssignmentID(buoyID: Int, sensorSlot: Int) async -> UUID? {
        return try! await Sensor
            .query(on: database)
            .filter(\.$buoyID == buoyID)
            .filter(\.$sensorSlot == sensorSlot)
            .field(\.$id)
            .first()?
            .id
    }
}
