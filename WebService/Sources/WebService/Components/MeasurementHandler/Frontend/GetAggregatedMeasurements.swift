import Apodini
import ApodiniDatabase
import ApodiniHTTPProtocol
import FluentKit
import FluentPostgresDriver
import Shared
import Foundation

struct GetAggregatedMeasurements: Handler {
    @Environment(\.database)
    var database: Database
    
    @Parameter(.http(.query))
    var sensorTyp: SensorTypeContent = .all
    
    @Parameter(.http(.query))
    var buoyID: Int = -1
    
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
    
    func handle() async throws -> Response<MeasurementFrontendContent> {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        guard aggregationLevel > 0 else {
            throw aggregationLevelError
        }
        
        let dateFormatter = ISO8601DateFormatter()
        dateFormatter.formatOptions = [.withDashSeparatorInDate, .withSpaceBetweenDateAndTime, .withColonSeparatorInTime, .withFullDate, .withFullTime, .withTimeZone]
        dateFormatter.timeZone = .current
        
        // buoyID, sensorTypeID, date, value, position
        let measurementFrontendContent = try? await (postgres
        .simpleQuery("""
         With Values ("buoyID", "sensorTypeID", "date", "value") as
         (
         SELECT s."buoyID", s."sensorTypeID",
         (TO_TIMESTAMP((cast(extract(epoch from TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS')) as integer) / \(aggregationLevel)) * \(aggregationLevel))) as date,
         avg(d."value")
         FROM "measurements" m
             JOIN "measurementsData" d ON (m."measurementID" = d."measurementID")
             JOIN "sensors" s             ON (d."sensorID" = s."sensorID")
         WHERE (\(sensorTyp) = -1 OR s."sensorTypeID" = \(sensorTyp))
            AND (\(buoyID) = -1 OR s."buoyID" = \(buoyID))
            AND m."measuredAt" BETWEEN '\(dateFormatter.string(from: startDate))' AND '\(dateFormatter.string(from: endDate))'
         GROUP BY s."buoyID", s."sensorTypeID", date
         )
         SELECT v."buoyID", v."sensorTypeID", v."date", v."value",
         (
             SELECT m."coordinate" FROM "measurements" m WHERE m."buoyID" = v."buoyID" AND TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS') >= v."date" ORDER BY m."measuredAt" ASC LIMIT 1
         ) as position
         FROM Values v
         ORDER BY v."buoyID" ASC, v."date" DESC, v."sensorTypeID" ASC;
        """)
        .map { rows -> MeasurementFrontendContent in
            return .init(measurements:
                rows.compactMap { row -> MeasurementFrontendValueContent? in
                    let data = row
                        .rowDescription
                        .fields
                        .reduce(into: [String: String](), { partialResult, field in
                            let columnName = field.name
                            if let rawResult = row.column(columnName) {
                                if let rawJSONResult = rawResult.jsonb {
                                    partialResult[columnName] = String(decoding: rawJSONResult, as: UTF8.self)
                                } else if let rawStringResult = rawResult.string {
                                    partialResult[columnName] = rawStringResult
                                }
                                
                            }
                        })
                    
                    guard let buoyIDString = data["buoyID"],
                          let buoyID = Int(buoyIDString),
                          let sensorTypeIDString = data["sensorTypeID"],
                          let sensorTypeID = Int(sensorTypeIDString),
                          let sensorTypeIDEnum = SensorTypeContent(rawValue: sensorTypeID),
                          let dateString = data["date"],
                          let date = dateFormatter.date(from: dateString),
                          let locationString = data["position"],
                          let locationData = locationString.data(using: .utf8),
                          let location = try? JSONDecoder().decode(Coordinate.self, from: locationData),
                          let valueData = data["value"],
                          let value = Double(valueData) else {
                        return nil
                    }
                    
                    return .init(buoyID: buoyID,
                                 sensorTypeID: sensorTypeIDEnum,
                                 date: date,
                                 location: location,
                                 value: value)
                }
            )
        })
        .get()
        
        guard let measurementFrontendContent = measurementFrontendContent else {
            throw aggregationError
        }
        
        return .final(
                    measurementFrontendContent,
                    information: AnyHTTPInformation(key: "Access-Control-Allow-Origin", rawValue: "*")
                )
    }
     
}
