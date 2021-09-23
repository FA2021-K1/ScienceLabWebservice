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
        if let postgres = database as? PostgresDatabase {
            return try! await (postgres
            .simpleQuery("""
            SELECT * FROM measurements
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
