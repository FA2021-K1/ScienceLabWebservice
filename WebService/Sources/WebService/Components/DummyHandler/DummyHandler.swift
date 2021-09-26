import Foundation
import Apodini
import ApodiniDatabase
import FluentKit
import FluentPostgresDriver

struct DummyHandler: Handler {
    @Environment(\.database)
    var database: Database
    
    @Throws(.serverError, reason: "Please use a PostgreSQL database")
    var databaseError: ApodiniError
    
    func handle() async throws -> Bool {
        guard let postgres = database as? PostgresDatabase else {
            throw databaseError
        }
        
        // Delete old data from tables
        let _ = try? await (postgres
        .simpleQuery("""
        DELETE FROM "measurements";
        """))
        .get()
        let _ = try? await (postgres
        .simpleQuery("""
        DELETE FROM "measurementsData";
        """))
        .get()
        let _ = try? await (postgres
        .simpleQuery("""
        DELETE FROM "sensors";
        """))
        .get()
        let _ = try? await (postgres
        .simpleQuery("""
        DELETE FROM "sensorTypes";
        """))
        .get()
        
        // Insert new data
        let _ = try? await (postgres
        .simpleQuery("""
        INSERT INTO "sensorTypes" VALUES
        (0,'pH','mol/l','2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        (1,'dissolvedSolids','ppm','2021-09-19T08:00:00+00','2021-09-19T08:00:00+00');
        """))
        .get()
        let _ = try? await (postgres
        .simpleQuery("""
        INSERT INTO "sensors" VALUES
        ('7bda0573-7578-4a9c-93ac-f9f5c1ed2243',0,0,0,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        ('8b8b6589-ffa6-450d-9065-f382219275a1',1,0,1,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        ('42071707-3bed-41ab-911a-c310f4e870d4',0,1,0,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        ('846168d3-419a-4938-9e43-168ccbe447cc',1,1,1,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        ('0e810046-aab2-489a-897b-473c3dc3b36e',0,2,0,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00'),
        ('c86d1401-d105-41a5-9a37-a6beea3f273c',1,2,1,'2021-09-19T08:00:00+00','2021-09-19T08:00:00+00');
        """))
        .get()
        
        var fileUrl = URL(string: FileManager().currentDirectoryPath + "/query_measurements.sql")
        var fileContents = try String(contentsOfFile: fileUrl!.absoluteString, encoding: .utf8)
        
        let _ = try? await (postgres
        .simpleQuery(fileContents))
        .get()
        
        fileUrl = URL(string: FileManager().currentDirectoryPath + "/query_measurement_data.sql")
        fileContents = try String(contentsOfFile: fileUrl!.absoluteString, encoding: .utf8)
        
        let _ = try? await (postgres
        .simpleQuery(fileContents))
        .get()
        
        return true
    }
}
