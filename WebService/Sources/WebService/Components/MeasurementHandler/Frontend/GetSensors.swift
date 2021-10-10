import Apodini
import ApodiniDatabase
import ApodiniObserve
import ApodiniHTTPProtocol
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
    
    @ApodiniLogger
    var logger
    
    @ApodiniRecorder(label: "resulting_sensor_query_size")
    var querySizeRecorder
    
    @ApodiniTimer(label: "aggregation_sensor_query_duration")
    var aggregationQueryTimer
    
    @ApodiniTimer(label: "aggregation_singleRow_sensor_query_duration")
    var aggregationSingleRowTimer
    
    func handle() async throws -> Response<SensorsByBuoyContent> {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        // Instrumentation
        let startTime = DispatchTime.now()
        
        // buoyID, sensorTypeID
        let sensorsByBuoyContent = try? await (postgres
        .simpleQuery("""
        SELECT DISTINCT s."buoyID", s."sensorTypeID"
        FROM "sensors" s ORDER BY s."buoyID"
        """
        )
        .map { rows -> SensorsByBuoyContent in
            // Instrumentation
            aggregationQueryTimer.recordInterval(since: startTime)
            
            querySizeRecorder.record(rows.count)
            
            logger.info("Fetched \(rows.count) rows for the sensor query")
            
            return .init(sensorsByBuoy:
                rows.reduce(into: [Int: [Int]]()) { partialResult, row in
                    // Instrumentation
                    let startTime = DispatchTime.now()
                
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
                
                    // Instrumentation
                    aggregationSingleRowTimer.recordInterval(since: startTime)
                }
            )
        })
        .get()
        
        guard let sensorsByBuoyContent = sensorsByBuoyContent else {
            throw readError
        }
        
        return .final(
                    sensorsByBuoyContent,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
   }
}
