import Apodini
import ApodiniDatabase
import FluentKit
import FluentPostgresDriver
import Shared
import Foundation

extension Date: LosslessStringConvertible {
    public init?(_ description: String) {
        if let timeInterval = Double(description) {
            self.init(timeIntervalSince1970: timeInterval)
        }
        
        return nil
    }
}


struct GetAggregatedMeasurements: Handler {
    @Environment(\.databaseModel)
    var databaseModel: DatabaseModel
    
    @Environment(\.database)
    var database: Database
    
    @Parameter(.http(.query))
    var sensorTyp: String
    
    @Parameter(.http(.query))
    var buoyID: Int
    
    @Parameter(.http(.query))
    var aggregationLevel: Int
    
    @Parameter(.http(.query))
    var startDate: Date
    
    @Parameter(.http(.query))
    var endDate: Date
    
    @Throws(.serverError, reason: "Error")
    var error: ApodiniError
    
    //func handle() async throws -> [Shared.Measurement] {
    /*
    func handle() throws -> EventLoopFuture<[String]> {
        if let postgres = database as? PostgresDatabase {
            return postgres
            .simpleQuery("""
            SELECT * FROM measurements
            """)
            .map { rows in
                rows.map { row in
                    print(row.rowDescription)
                    return row.rowDescription.description
                }
            }
        }
        
        throw error
    }
    */
    
    func handle() async throws -> MeasurementFrontendContent {
        if let postgres = database as? PostgresDatabase {
            return try! await (postgres
            .simpleQuery("""
             With Values ("buoyID", "date", "value") as
             (
             SELECT s."buoyID",
             (TO_TIMESTAMP((cast(extract(epoch from TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS')) as integer) / \(aggregationLevel)) * \(aggregationLevel))) as date,
             avg(d."value")
             FROM "measurements" m
                 JOIN "measurementsData" d ON (m."measurementID" = d."measurementID")
                 JOIN "sensors" s             ON (d."sensorID" = s."sensorID")
                 JOIN "sensorTypes" t         ON (s."sensorTypeID" = t."sensorTypeID")
             WHERE t."name" = '\(sensorTyp)' AND s."buoyID" = \(buoyID) AND m."measuredAt" BETWEEN '\(startDate.ISO8601Format(.init(dateSeparator: .dash, dateTimeSeparator: .space, timeZone: .current)))' AND '\(endDate.ISO8601Format(.init(dateSeparator: .dash, dateTimeSeparator: .space, timeZone: .current)))'
             GROUP BY s."buoyID", date
             )
             SELECT v."buoyID", v."date", v."value",
             (
                 SELECT m."coordinate" FROM "measurements" m WHERE m."buoyID" = v."buoyID" AND TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS') >= v."date" ORDER BY m."measuredAt" ASC LIMIT 1
             ) as position
             FROM Values v;
            """)
            .map { rows in
                let jsonDecoder = JSONDecoder()
                let dateFormatter = ISO8601DateFormatter()
                dateFormatter.formatOptions = [.withDashSeparatorInDate, .withSpaceBetweenDateAndTime, .withColonSeparatorInTime, .withTimeZone, .withFullDate, .withFullTime]
                dateFormatter.timeZone = .current
                
                let measurementData = rows.compactMap { row -> MeasurementFrontendValueContent? in
                    print(row.rowDescription)
                    
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
                          let dateString = data["date"],
                          let date = dateFormatter.date(from: dateString),
                          let locationString = data["position"],
                          let locationData = locationString.data(using: .utf8),
                          let location = try? jsonDecoder.decode(Coordinate.self, from: locationData),
                          let valueData = data["value"],
                          let value = Double(valueData) else {
                        return nil
                    }
                    
                    return MeasurementFrontendValueContent(buoyId: buoyID,
                                                           date: date,
                                                           location: location,
                                                           value: value)
                }
                
                return MeasurementFrontendContent(measurements: measurementData)
            })
            .get()
        }
        
        throw error
    }
     
}
