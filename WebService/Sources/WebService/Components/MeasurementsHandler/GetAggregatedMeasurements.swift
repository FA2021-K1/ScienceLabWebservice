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
    
    func handle() async throws -> [String] {
        print("\(startDate.ISO8601Format(.init(dateSeparator: .dash, dateTimeSeparator: .space, timeZone: .current)))")
        
        if let postgres = database as? PostgresDatabase {
            return try! await (postgres
            .simpleQuery("""
            With Values ("buoyID", "date", "value") as
            (
            SELECT s."buoyID",
            (TO_TIMESTAMP((cast(extract(epoch from TO_TIMESTAMP(m."measuredAt",'YYYY-MM-DD HH24:MI:SS')) as integer) / \(aggregationLevel) * \(aggregationLevel)) as date,
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
                rows.map { row in
                    print(row.rowDescription)
                    return row.rowDescription.description
                }
            })
            .get()
        }
        
        throw error
    }
}
