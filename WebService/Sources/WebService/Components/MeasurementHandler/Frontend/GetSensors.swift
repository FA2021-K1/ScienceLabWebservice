import Apodini
import ApodiniDatabase
import FluentKit
import FluentPostgresDriver
import Shared
import Foundation

struct GetSensors: Handler {
    @Environment(\.database)
    var database: Database
    
    @Throws(.serverError, reason: "An error occured during reading the sensors")
    var readError: ApodiniError
    
    @Throws(.serverError, reason: "Please use a PostgreSQL database")
    var databaseError: ApodiniError
    
    func handle() async throws -> SensorsByBuoyContent {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        // buoyID, sensorTypeID
        let sensorsByBuoyContent = try? await (postgres
        .simpleQuery("""
        SELECT DISTINCT s."buoyID", s."sensorTypeID"
        FROM "sensors" s ORDER BY s."buoyID"
        """
        )
        .map { rows -> SensorsByBuoyContent in
            .init(sensorsByBuoy:
                rows.reduce(into: [Int: [Int]]()) { partialResult, row in
                    if let rawBuoyID = row.column("buoyID"),
                       let buoyID = rawBuoyID.int,
                       let rawSensorTypeID = row.column("sensorTypeID"),
                       let sensorTypeID = rawSensorTypeID.int {
                        
                        if partialResult.keys.contains(where: { dicKey in
                            dicKey == buoyID
                        }) {
                            partialResult[buoyID]?.append(sensorTypeID)
                        } else {
                            partialResult[buoyID] = [sensorTypeID]
                        }
                        
                    }
                }
            )
        })
        .get()
        
        guard let sensorsByBuoyContent = sensorsByBuoyContent else {
            throw readError
        }
        
        return sensorsByBuoyContent
   }
}
