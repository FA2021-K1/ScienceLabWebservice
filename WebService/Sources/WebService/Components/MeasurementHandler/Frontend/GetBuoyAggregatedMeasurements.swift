import Apodini
import ApodiniDatabase
import ApodiniObserve
import ApodiniHTTPProtocol
import FluentKit
import FluentPostgresDriver
import Shared
import Foundation

struct GetBuoyAggregatedMeasurements: Handler {
    @Environment(\.database)
    var database: Database
    
    @Parameter(.http(.query))
    var sensorTyp: SensorTypeContent = .all
    
    @Parameter(.http(.query))
    var aggregationLevel: Int = 1
    
    @Parameter(.http(.query))
    var startDate: Date
    
    @Parameter(.http(.query))
    var endDate: Date
    
    @Throws(.serverError, reason: "An error occured during the aggregation of the data points")
    var aggregationError: ApodiniError
    
    @Throws(.serverError, reason: "Please choose an aggregation level larger than 0 (represents seconds)")
    var aggregationLevelError: ApodiniError
    
    @Throws(.serverError, reason: "Please use a PostgreSQL database")
    var databaseError: ApodiniError
    
    @ApodiniLogger
    var logger
    
    @ApodiniRecorder(label: "resulting_aggregationBuoy_query_size")
    var querySizeRecorder
    
    @ApodiniRecorder(label: "aggregationBuoy_level")
    var aggregationLevelRecorder
    
    @ApodiniTimer(label: "aggregationBuoy_query_duration")
    var aggregationQueryTimer
    
    @ApodiniTimer(label: "aggregationBuoy_singleRow_duration")
    var aggregationSingleRowTimer
    
    func handle() async throws -> Response<MeasurementBuoyFrontendContent> {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        // Instrumentation
        aggregationLevelRecorder.record(aggregationLevel)
        
        guard aggregationLevel > 0 else {
            throw aggregationLevelError
        }
        
        let dateFormatter = ISO8601DateFormatter()
        dateFormatter.formatOptions = [.withDashSeparatorInDate, .withSpaceBetweenDateAndTime, .withColonSeparatorInTime, .withTimeZone, .withFullDate, .withFullTime]
        dateFormatter.timeZone = .current
        
        // Instrumentation
        let startTime = DispatchTime.now()
        
        // sensorTypeID, date, value
        let measurementBuoyFrontendContent = try? await (postgres
        .simpleQuery("""
         With Values ("sensorTypeID", "date", "value") as
          (
              SELECT s."sensorTypeID",
              (TO_TIMESTAMP((cast(extract(epoch from TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS')) as integer) / \(aggregationLevel)) * \(aggregationLevel))) as date,
              avg(d."value")
              FROM "measurements" m
                  JOIN "measurementsData" d ON (m."measurementID" = d."measurementID")
                  JOIN "sensors" s             ON (d."sensorID" = s."sensorID")
              WHERE (\(sensorTyp) = -1 OR s."sensorTypeID" = \(sensorTyp))
                 AND m."measuredAt" BETWEEN '\(dateFormatter.string(from: startDate))' AND '\(dateFormatter.string(from: endDate))'
              GROUP BY s."sensorTypeID", date
          )
          SELECT v."sensorTypeID", v."date", v."value"
          FROM Values v
          ORDER BY v."sensorTypeID" ASC, v."date" DESC;
        """)
        .map { rows -> MeasurementBuoyFrontendContent in
            // Instrumentation
            aggregationQueryTimer.recordInterval(since: startTime)
            
            querySizeRecorder.record(rows.count)
            
            logger.info("Fetched \(rows.count) rows for the aggregation buoy query with aggregation level \(aggregationLevel.description)")
            
            return .init(measurements:
                rows.compactMap { row -> MeasurementFrontendBuoyValueContent? in
                    // Instrumentation
                    let startTime = DispatchTime.now()
                
                    let data = row
                        .rowDescription
                        .fields
                        .reduce(into: [String: String](), { partialResult, field in
                            let columnName = field.name
                            if let rawResult = row.column(columnName) {
                                if let rawStringResult = rawResult.string {
                                    partialResult[columnName] = rawStringResult
                                }
                                
                            }
                        })
                    
                    guard let sensorTypeIDString = data["sensorTypeID"],
                          let sensorTypeID = Int(sensorTypeIDString),
                          let sensorTypeIDEnum = SensorTypeContent(rawValue: sensorTypeID),
                          let dateString = data["date"],
                          let date = dateFormatter.date(from: dateString),
                          let valueData = data["value"],
                          let value = Double(valueData) else {
                        return nil
                    }
                
                    // Instrumentation
                    aggregationSingleRowTimer.recordInterval(since: startTime)
                    
                    return .init(sensorTypeID: sensorTypeIDEnum,
                                 date: date,
                                 value: value)
                }
            )
        })
        .get()
        
        guard let measurementBuoyFrontendContent = measurementBuoyFrontendContent else {
            throw aggregationError
        }
        
        return .final(
                    measurementBuoyFrontendContent,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
    }
     
}
