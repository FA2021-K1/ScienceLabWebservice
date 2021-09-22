import Apodini
import FluentKit
import Shared
import Foundation

// MARK: - DatabaseModel + Sensor
extension DatabaseModel {
    func createSensor(_ sensor: Sensor) async throws -> Sensor {
        guard let _ = try? await sensor.save(on: database) else {
            throw DatabaseError.internalError
        }
        
        return sensor
    }
    
    func isSensorConfigured(buoyID: Int, sensorSlot: Int) async -> Bool {
        return (try? await Sensor
            .query(on: database)
            .filter(\.$buoyID == buoyID)
            .filter(\.$sensorSlot == sensorSlot)
            .first()) != nil
    }
    
    func getSensorID(buoyID: Int, sensorSlot: Int) async -> UUID? {
        return (try? await Sensor
            .query(on: database)
            .filter(\.$buoyID == buoyID)
            .filter(\.$sensorSlot == sensorSlot)
            .field(\.$id)
            .first()
            )?.id
    }
}
