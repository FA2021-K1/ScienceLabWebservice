import Apodini
import ApodiniDatabase
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
    
    func handle() async throws -> MeasurementBuoyFrontendContent {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        guard aggregationLevel > 0 else {
            throw aggregationLevelError
        }
        
        let dateFormatter = ISO8601DateFormatter()
        dateFormatter.formatOptions = [.withDashSeparatorInDate, .withSpaceBetweenDateAndTime, .withColonSeparatorInTime, .withTimeZone, .withFullDate, .withFullTime]
        dateFormatter.timeZone = .current
        
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
            .init(measurements:
                rows.compactMap { row -> MeasurementFrontendBuoyValueContent? in
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
        
        return measurementBuoyFrontendContent
    }
     
}
